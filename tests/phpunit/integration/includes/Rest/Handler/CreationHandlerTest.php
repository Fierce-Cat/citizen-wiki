<?php

namespace MediaWiki\Tests\Rest\Handler;

use ApiUsageException;
use HashConfig;
use MediaWiki\Rest\Handler\CreationHandler;
use MediaWiki\Rest\LocalizedHttpException;
use MediaWiki\Rest\RequestData;
use MediaWiki\Revision\MutableRevisionRecord;
use MediaWiki\Revision\RevisionLookup;
use MediaWiki\Revision\SlotRecord;
use MediaWiki\Tests\Unit\DummyServicesTrait;
use MediaWikiIntegrationTestCase;
use MockTitleTrait;
use PHPUnit\Framework\MockObject\MockObject;
use Status;
use Wikimedia\Message\MessageValue;
use Wikimedia\Message\ParamType;
use Wikimedia\Message\ScalarParam;
use WikitextContent;

/**
 * @covers \MediaWiki\Rest\Handler\CreationHandler
 */
class CreationHandlerTest extends MediaWikiIntegrationTestCase {
	use ActionModuleBasedHandlerTestTrait;
	use DummyServicesTrait;
	use MockTitleTrait;

	private function newHandler( $resultData, $throwException = null, $csrfSafe = false ) {
		$config = new HashConfig( [
			'RightsUrl' => 'https://creativecommons.org/licenses/by-sa/4.0/',
			'RightsText' => 'CC-BY-SA 4.0'
		] );

		// Claims that wikitext and plaintext are defined, but trying to get the actual
		// content handlers would break
		$contentHandlerFactory = $this->getDummyContentHandlerFactory( [
			CONTENT_MODEL_WIKITEXT => true,
			CONTENT_MODEL_TEXT => true,
		] );

		// DummyServicesTrait::getDummyMediaWikiTitleCodec
		$titleCodec = $this->getDummyMediaWikiTitleCodec();

		/** @var RevisionLookup|MockObject $revisionLookup */
		$revisionLookup = $this->createNoOpMock( RevisionLookup::class, [ 'getRevisionById' ] );
		$revisionLookup->method( 'getRevisionById' )
			->willReturnCallback( function ( $id ) {
				$title = $this->makeMockTitle( __CLASS__ );
				$rev = new MutableRevisionRecord( $title );
				$rev->setId( $id );
				$rev->setContent( SlotRecord::MAIN, new WikitextContent( "Content of revision $id" ) );
				return $rev;
			} );

		$handler = new CreationHandler(
			$config,
			$contentHandlerFactory,
			$titleCodec,
			$titleCodec,
			$revisionLookup
		);

		$apiMain = $this->getApiMain( $csrfSafe );
		$dummyModule = $this->getDummyApiModule( $apiMain, 'edit', $resultData, $throwException );

		$handler->setApiMain( $apiMain );
		$handler->overrideActionModule(
			'edit',
			'action',
			$dummyModule
		);

		return $handler;
	}

	public static function provideExecute() {
		// NOTE: Prefix hard coded in a fake for Router::getRouteUrl() in HandlerTestTrait
		$baseUrl = 'https://wiki.example.com/rest/v1/page/';

		yield "create with token" => [
			[ // Request data received by CreationHandler
				'method' => 'POST',
				'headers' => [
					'Content-Type' => 'application/json',
				],
				'bodyContents' => json_encode( [
					'token' => 'TOKEN',
					'title' => 'Foo',
					'source' => 'Lorem Ipsum',
					'comment' => 'Testing'
				] ),
			],
			[ // Fake request expected to be passed into ApiEditPage
				'title' => 'Foo',
				'text' => 'Lorem Ipsum',
				'summary' => 'Testing',
				'createonly' => '1',
			],
			[ // Mock response returned by ApiEditPage
				"edit" => [
					"new" => true,
					"result" => "Success",
					"pageid" => 94542,
					"title" => "Foo",
					"contentmodel" => "wikitext",
					"oldrevid" => 0,
					"newrevid" => 371707,
					"newtimestamp" => "2018-12-18T16:59:42Z",
				]
			],
			[ // Response expected to be generated by CreationHandler
				'id' => 94542,
				'title' => 'Foo',
				'key' => 'Foo',
				'content_model' => 'wikitext',
				'latest' => [
					'id' => 371707,
					'timestamp' => "2018-12-18T16:59:42Z"
				],
				'license' => [
					'url' => 'https://creativecommons.org/licenses/by-sa/4.0/',
					'title' => 'CC-BY-SA 4.0'
				],
				'source' => 'Content of revision 371707'
			],
			$baseUrl . 'Foo',
			false
		];

		yield "create with model" => [
			[ // Request data received by CreationHandler
				'method' => 'POST',
				'headers' => [
					'Content-Type' => 'application/json',
				],
				'bodyContents' => json_encode( [
					'title' => 'Talk:Foo',
					'source' => 'Lorem Ipsum',
					'comment' => 'Testing',
					'content_model' => CONTENT_MODEL_TEXT,
				] ),
			],
			[ // Fake request expected to be passed into ApiEditPage
				'title' => 'Talk:Foo',
				'text' => 'Lorem Ipsum',
				'summary' => 'Testing',
				'contentmodel' => CONTENT_MODEL_TEXT,
				'createonly' => '1',
				'token' => '+\\',
			],
			[ // Mock response returned by ApiEditPage
				"edit" => [
					"new" => true,
					"result" => "Success",
					"pageid" => 94542,
					"title" => "Talk:Foo",
					"contentmodel" => CONTENT_MODEL_TEXT,
					"oldrevid" => 0,
					"newrevid" => 371707,
					"newtimestamp" => "2018-12-18T16:59:42Z",
				]
			],
			[ // Response expected to be generated by CreationHandler
				'id' => 94542,
				'title' => 'Talk:Foo',
				'key' => 'Talk:Foo',
				'content_model' => CONTENT_MODEL_TEXT,
				'latest' => [
					'id' => 371707,
					'timestamp' => "2018-12-18T16:59:42Z"
				],
				'license' => [
					'url' => 'https://creativecommons.org/licenses/by-sa/4.0/',
					'title' => 'CC-BY-SA 4.0'
				],
				'source' => 'Content of revision 371707'
			],
			$baseUrl . 'Talk:Foo',
			true
		];

		yield "create without token" => [
			[ // Request data received by CreationHandler
				'method' => 'POST',
				'headers' => [
					'Content-Type' => 'application/json',
				],
				'bodyContents' => json_encode( [
					'title' => 'foo/bar',
					'source' => 'Lorem Ipsum',
					'comment' => 'Testing',
					'content_model' => CONTENT_MODEL_WIKITEXT,
				] ),
			],
			[ // Fake request expected to be passed into ApiEditPage
				'title' => 'foo/bar',
				'text' => 'Lorem Ipsum',
				'summary' => 'Testing',
				'contentmodel' => 'wikitext',
				'createonly' => '1',
				'token' => '+\\', // use known-good token for current user (anon)
			],
			[ // Mock response returned by ApiEditPage
				"edit" => [
					"new" => true,
					"result" => "Success",
					"pageid" => 94542,
					"title" => "Foo/bar",
					"contentmodel" => "wikitext",
					"oldrevid" => 0,
					"newrevid" => 371707,
					"newtimestamp" => "2018-12-18T16:59:42Z",
				]
			],
			[ // Response expected to be generated by CreationHandler
				'id' => 94542,
				'title' => 'Foo/bar',
				'key' => 'Foo/bar',
				'content_model' => 'wikitext',
				'latest' => [
					'id' => 371707,
					'timestamp' => "2018-12-18T16:59:42Z"
				],
				'license' => [
					'url' => 'https://creativecommons.org/licenses/by-sa/4.0/',
					'title' => 'CC-BY-SA 4.0'
				],
				'source' => 'Content of revision 371707'
			],
			$baseUrl . 'Foo%2Fbar',
			true
		];

		yield "create with space" => [
			[ // Request data received by CreationHandler
				'method' => 'POST',
				'headers' => [
					'Content-Type' => 'application/json',
				],
				'bodyContents' => json_encode( [
					'title' => 'foo (ba+r)',
					'source' => 'Lorem Ipsum',
					'comment' => 'Testing'
				] ),
			],
			[ // Fake request expected to be passed into ApiEditPage
				'title' => 'foo (ba+r)',
				'text' => 'Lorem Ipsum',
				'summary' => 'Testing',
				'createonly' => '1',
				'token' => '+\\', // use known-good token for current user (anon)
			],
			[ // Mock response returned by ApiEditPage
				"edit" => [
					"new" => true,
					"result" => "Success",
					"pageid" => 94542,
					"title" => "Foo (ba+r)",
					"contentmodel" => "wikitext",
					"oldrevid" => 0,
					"newrevid" => 371707,
					"newtimestamp" => "2018-12-18T16:59:42Z",
				]
			],
			[ // Response expected to be generated by CreationHandler
				'id' => 94542,
				'title' => 'Foo (ba+r)',
				'key' => 'Foo_(ba+r)',
				'content_model' => 'wikitext',
				'latest' => [
					'id' => 371707,
					'timestamp' => "2018-12-18T16:59:42Z"
				],
				'license' => [
					'url' => 'https://creativecommons.org/licenses/by-sa/4.0/',
					'title' => 'CC-BY-SA 4.0'
				],
				'source' => 'Content of revision 371707'
			],
			$baseUrl . 'Foo_(ba%2Br)',
			true
		];
	}

	/**
	 * @dataProvider provideExecute
	 */
	public function testExecute(
		$requestData,
		$expectedActionParams,
		$actionResult,
		$expectedResponse,
		$expectedRedirect,
		$csrfSafe
	) {
		$request = new RequestData( $requestData );

		$handler = $this->newHandler( $actionResult, null, $csrfSafe );

		$response = $this->executeHandler( $handler, $request, [], [], [], [], null, $this->getSession( $csrfSafe ) );

		$this->assertSame( 201, $response->getStatusCode() );
		$this->assertSame(
			$expectedRedirect,
			$response->getHeaderLine( 'Location' )
		);
		$this->assertSame( 'application/json', $response->getHeaderLine( 'Content-Type' ) );

		$responseData = json_decode( $response->getBody(), true );
		$this->assertIsArray( $responseData, 'Body must be a JSON array' );

		// Check parameters passed to ApiEditPage by CreationHandler based on $requestData
		foreach ( $expectedActionParams as $key => $value ) {
			$this->assertSame(
				$value,
				$handler->getApiMain()->getVal( $key ),
				"ApiEditPage param: $key"
			);
		}

		// Check response that CreationHandler created after receiving $actionResult from ApiEditPage
		foreach ( $expectedResponse as $key => $value ) {
			$this->assertArrayHasKey( $key, $responseData );
			$this->assertSame(
				$value,
				$responseData[ $key ],
				"CreationHandler response field: $key"
			);
		}
	}

	public static function provideBodyValidation() {
		yield "missing source field" => [
			[ // Request data received by CreationHandler
				'method' => 'POST',
				'headers' => [
					'Content-Type' => 'application/json',
				],
				'bodyContents' => json_encode( [
					'token' => 'TOKEN',
					'title' => 'Foo',
					'comment' => 'Testing',
					'content_model' => CONTENT_MODEL_WIKITEXT,
				] ),
			],
			new MessageValue( 'rest-missing-body-field', [ 'source' ] ),
		];
		yield "missing comment field" => [
			[ // Request data received by CreationHandler
				'method' => 'POST',
				'headers' => [
					'Content-Type' => 'application/json',
				],
				'bodyContents' => json_encode( [
					'token' => 'TOKEN',
					'title' => 'Foo',
					'source' => 'Lorem Ipsum',
					'content_model' => CONTENT_MODEL_WIKITEXT,
				] ),
			],
			new MessageValue( 'rest-missing-body-field', [ 'comment' ] ),
		];
		yield "missing title field" => [
			[ // Request data received by CreationHandler
				'method' => 'POST',
				'headers' => [
					'Content-Type' => 'application/json',
				],
				'bodyContents' => json_encode( [
					'token' => 'TOKEN',
					'comment' => 'Testing',
					'source' => 'Lorem Ipsum',
					'content_model' => CONTENT_MODEL_WIKITEXT,
				] ),
			],
			new MessageValue( 'rest-missing-body-field', [ 'title' ] ),
		];
	}

	/**
	 * @dataProvider provideBodyValidation
	 */
	public function testBodyValidation( array $requestData, MessageValue $expectedMessage ) {
		$request = new RequestData( $requestData );

		$handler = $this->newHandler( [] );

		$exception = $this->executeHandlerAndGetHttpException( $handler, $request );

		$this->assertSame( 400, $exception->getCode(), 'HTTP status' );
		$this->assertInstanceOf( LocalizedHttpException::class, $exception );

		/** @var LocalizedHttpException $exception */
		$this->assertEquals( $expectedMessage, $exception->getMessageValue() );
	}

	public static function provideHeaderValidation() {
		yield "bad content type" => [
			[ // Request data received by CreationHandler
				'method' => 'POST',
				'headers' => [
					'Content-Type' => 'text/plain',
				],
				'bodyContents' => json_encode( [
					'title' => 'Foo',
					'source' => 'Lorem Ipsum',
					'comment' => 'Testing',
					'content_model' => CONTENT_MODEL_WIKITEXT,
				] ),
			],
			415
		];
	}

	/**
	 * @dataProvider provideHeaderValidation
	 */
	public function testHeaderValidation( array $requestData, $expectedStatus ) {
		$request = new RequestData( $requestData );

		$handler = $this->newHandler( [] );

		$exception = $this->executeHandlerAndGetHttpException( $handler, $request );

		$this->assertSame( $expectedStatus, $exception->getCode(), 'HTTP status' );
	}

	/*
	 * FIXME: Status::newFatal invokes MediaWikiServices, which is not allowed in a dataProvider.
	 */
	public static function provideErrorMapping() {
		yield "missingtitle" => [
			new ApiUsageException( null, Status::newFatal( 'apierror-missingtitle' ) ),
			new LocalizedHttpException( new MessageValue( 'apierror-missingtitle' ), 404 ),
		];
		yield "protectedpage" => [
			new ApiUsageException( null, Status::newFatal( 'apierror-protectedpage' ) ),
			new LocalizedHttpException( new MessageValue( 'apierror-protectedpage' ), 403 ),
		];
		yield "articleexists" => [
			new ApiUsageException( null, Status::newFatal( 'apierror-articleexists' ) ),
			new LocalizedHttpException( new MessageValue( 'apierror-articleexists' ), 409 ),
		];
		yield "editconflict" => [
			new ApiUsageException( null, Status::newFatal( 'apierror-editconflict' ) ),
			new LocalizedHttpException( new MessageValue( 'apierror-editconflict' ), 409 ),
		];
		yield "ratelimited" => [
			new ApiUsageException( null, Status::newFatal( 'apierror-ratelimited' ) ),
			new LocalizedHttpException( new MessageValue( 'apierror-ratelimited' ), 429 ),
		];
		yield "badtoken" => [
			new ApiUsageException(
				null,
				Status::newFatal( 'apierror-badtoken', [ 'plaintext' => 'BAD' ] )
			),
			new LocalizedHttpException(
				new MessageValue(
					'apierror-badtoken',
					[ new ScalarParam( ParamType::PLAINTEXT, 'BAD' ) ]
				), 403
			),
		];

		// Unmapped errors should be passed through with a status 400.
		yield "no-direct-editing" => [
			new ApiUsageException( null, Status::newFatal( 'apierror-no-direct-editing' ) ),
			new LocalizedHttpException( new MessageValue( 'apierror-no-direct-editing' ), 400 ),
		];
		yield "badformat" => [
			new ApiUsageException( null, Status::newFatal( 'apierror-badformat' ) ),
			new LocalizedHttpException( new MessageValue( 'apierror-badformat' ), 400 ),
		];
		yield "emptypage" => [
			new ApiUsageException( null, Status::newFatal( 'apierror-emptypage' ) ),
			new LocalizedHttpException( new MessageValue( 'apierror-emptypage' ), 400 ),
		];
	}

	public function testErrorMapping() {
		$provideErrorMapping = $this->provideErrorMapping();
		foreach ( $provideErrorMapping as $expected ) {
			$apiUsageException = $expected[0];
			$expectedHttpException = $expected[1];
			$requestData = [ // Request data received by CreationHandler
				'method' => 'POST',
				'headers' => [
					'Content-Type' => 'application/json',
				],
				'bodyContents' => json_encode( [
					'title' => 'Foo',
					'source' => 'Lorem Ipsum',
					'comment' => 'Testing',
					'content_model' => CONTENT_MODEL_WIKITEXT,
				] ),
			];
			$request = new RequestData( $requestData );

			$handler = $this->newHandler( [], $apiUsageException );

			$exception = $this->executeHandlerAndGetHttpException( $handler, $request );

			$this->assertSame( $expectedHttpException->getMessage(), $exception->getMessage() );
			$this->assertSame( $expectedHttpException->getCode(), $exception->getCode(), 'HTTP status' );

			$errorData = $exception->getErrorData();
			if ( $expectedHttpException->getErrorData() ) {
				foreach ( $expectedHttpException->getErrorData() as $key => $value ) {
					$this->assertSame( $value, $errorData[$key], 'Error data key $key' );
				}
			}

			if ( $expectedHttpException instanceof LocalizedHttpException ) {
				/** @var LocalizedHttpException $exception */
				$this->assertEquals(
					$expectedHttpException->getMessageValue(),
					$exception->getMessageValue()
				);
			}
		}
	}

}
