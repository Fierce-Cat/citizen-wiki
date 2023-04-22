<?php

use MediaWiki\MediaWikiServices;

/**
 * @covers DisplayTitleHooks::onHtmlPageLinkRendererBegin
 * @covers DisplayTitleHooks::onSelfLinkBegin
 * @group Database
 */
class DisplayTitleTest extends MediaWikiIntegrationTestCase {

	public function setUp(): void {
		parent::setUp();
		$this->setMwGlobals( 'wgAllowDisplayTitle', true );
		$this->setMwGlobals( 'wgRestrictDisplayTitle', false );
	}

	/**
	 * @dataProvider provideTestData
	 */
	public function testParse( $testName, $pageName, $linkText, $testPages ) {
		$testPage = $testPages[0];
		Title::clearCaches();

		for ( end( $testPages ); key( $testPages ) !== null; prev( $testPages ) ) {
			$page = current( $testPages );
			if ( !$page['selfLink'] ) {
				$name = $page['name'];
				$redirectName = $page['redirectName'];
				$displaytitle = $page['displaytitle'];
				$this->createTestPage( $name, $redirectName, $displaytitle );
			}
		}

		$expectedHtml = $this->getExpectedHtml( $pageName, $linkText, $testPages );

		$this->hideDeprecated( 'AbstractContent::getParserOutput' );
		$actualHtml = $this->getActualHtml(
			$testPage['selfLink'] ? $testPage['name'] : 'Test Page', $pageName,
			$linkText );

		$this->assertStringContainsString( $expectedHtml, $actualHtml, $testName );
	}

	/**
	 * Create a test page.
	 * @param string $name The page name
	 * @param string|null $redirectName The page name of the page this page is
	 *	redirecting to
	 * @param string|null $displaytitle The page displaytitle (ignored if page
	 *	is a redirect)
	 */
	private function createTestPage( $name, $redirectName, $displaytitle ) {
		$title = Title::newFromText( $name );
		if ( method_exists( MediaWikiServices::class, 'getWikiPageFactory' ) ) {
			// MW 1.36+
			$page = MediaWikiServices::getInstance()->getWikiPageFactory()->newFromTitle( $title );
		} else {
			$page = new WikiPage( $title );
		}
		if ( $redirectName !== null ) {
			$wikitext = '#REDIRECT [[' . $redirectName . ']]';
		} else {
			$wikitext = 'This is a test';
			if ( $displaytitle !== null ) {
				$wikitext .= "{{DISPLAYTITLE:$displaytitle}}";
			}
		}
		$updater = $page->newPageUpdater( $this->getTestSysop()->getUser() );
		$updater->setContent( 'main', new WikitextContent( $wikitext ) );
		$updater->saveRevision(
			CommentStoreComment::newUnsavedComment( 'new test page' ),
			EDIT_AUTOSUMMARY
		);
	}

	/**
	 * Get expected HTML for test.
	 * @param string $pageName The name of the page in the test
	 * @param string|null $linkText The link text
	 * @param array $testPages The array of information about the test pages
	 * @return string
	 */
	private function getExpectedHtml( $pageName, $linkText, $testPages ) {
		$parts = explode( '#', $pageName, 2 );
		$fragment = $parts[1] ?? null;
		if ( $parts[0] === '' ) {
			$html = "<a href=\"#$fragment\">#$fragment</a>";
		} else {
			$name = $testPages[0]['name'];
			if ( $testPages[0]['selfLink'] && $fragment === null ) {
				$displaytitle = $testPages[0]['displaytitle'];
				if ( $linkText === null || $linkText === $name ||
					( $displaytitle !== null && str_replace( '_', ' ', $linkText ) === $name ) ) {
					if ( $pageName === $this->lcfirstPageName( $name ) &&
						$linkText === null ) {
						$linkText = $pageName;
					} elseif ( $displaytitle !== null ) {
						$linkText = $displaytitle;
					} elseif ( $linkText === null ) {
						$linkText = $name;
					}
				}
				$html = <<<EOT
<a class="mw-selflink selflink">$linkText</a>
EOT;
			} else {
				$isRedirect = $testPages[0]['redirectName'] !== null;
				$title = Title::newFromText( $name );
				if ( $fragment ) {
					$title->setFragment( '#' . $fragment );
				}
				$url = $title->getLinkURL();
				if ( $linkText === null || $linkText === $name ||
					str_replace( '_', ' ', $linkText ) === $name ) {
					if ( $pageName === $this->lcfirstPageName( $name ) &&
						$linkText === null && !$this->isCategory( $pageName ) ) {
						// Override display title if first letter is lowercase
						// unless its a category, because categories correct
						// their cases before they make a linkrender request.
						$linkText = $pageName;
					} else {
						if ( $isRedirect ) {
							$displaytitle = $testPages[1]['displaytitle'];
						} else {
							$displaytitle = $testPages[0]['displaytitle'];
						}
						if ( $displaytitle === null ) {
							if ( $isRedirect ) {
								$linkText = $testPages[1]['name'];
							} elseif ( $linkText === null ) {
								$linkText = $name;
							}
							if ( $this->isCategory( $pageName ) ) {
								// Category links are not namespace prefixed
								$linkText = substr( $name, strlen( 'Category:' ) );
							}
						} else {
							$linkText = $displaytitle;
						}
					}
				}
				if ( $isRedirect ) {
					$redirectClass = ' class="mw-redirect"';
				} else {
					$redirectClass = '';
				}
				$html = <<<EOT
<a href="$url"$redirectClass title="$name">$linkText</a>
EOT;
			}
		}
		return $html;
	}

	/**
	 * Get actual HTML for test.
	 * @param string $testPageName The name of the test page
	 * @param string $pageName The name of the page in the test
	 * @param string|null $linkText The link text
	 * @return string
	 */
	private function getActualHtml( $testPageName, $pageName, $linkText ) {
		$wikitext = '[[';
		if ( $pageName === null ) {
			$wikitext .= $testPageName;
		} else {
			$wikitext .= $pageName;
		}
		if ( $linkText !== null && !$this->isCategory( $pageName ) ) {
			$wikitext .= '|' . $linkText;
		}
		$wikitext .= ']]';
		$title = Title::newFromText( $testPageName );
		if ( !$this->isCategory( $pageName ) ) {
			// get html for rendered link
			$content = new WikitextContent( $wikitext );
			$parserOptions = new ParserOptions( $this->getTestUser()->getUser() );
			$parserOptions->setRemoveComments( true );
			$parserOutput = $content->getParserOutput( $title, null, $parserOptions );
			$html = $parserOutput->getText();
		} else {
			// get html for category link
			if ( method_exists( MediaWikiServices::class, 'getWikiPageFactory' ) ) {
				// MW 1.36+
				$page = MediaWikiServices::getInstance()->getWikiPageFactory()->newFromTitle( $title );
			} else {
				$page = WikiPage::factory( $title );
			}
			$context = new RequestContext();
			$context->setTitle( $title );
			$context->setUser( $this->getTestUser()->getUser() );
			$output = $context->getOutput();
			$output->addWikiTextAsContent( $wikitext );
			$links = $output->getCategoryLinks();
			// there is only one link in these cases, but it's wrapped up in a 2d array
			$html = array_values( array_values( $links )[0] )[0];
		}

		return $html;
	}

	/** @var array[] */
	public $tests = [];

	public function provideTestData() {
		$pageWithoutDisplaytitle = [
			'name' => 'Page without displaytitle',
			'redirectName' => null,
			'displaytitle' => null,
			'selfLink' => false
		];

		$pageWithDisplaytitle = [
			'name' => 'Page with displaytitle',
			'redirectName' => null,
			'displaytitle' => 'My displaytitle',
			'selfLink' => false
		];

		$redirectToPageWithoutDisplaytitle = [
			'name' => 'Redirect to page without displaytitle',
			'redirectName' => 'Page without displaytitle',
			'displaytitle' => null,
			'selfLink' => false
		];

		$redirectToPageWithDisplaytitle = [
			'name' => 'Redirect to page with displaytitle',
			'redirectName' => 'Page with displaytitle',
			'displaytitle' => null,
			'selfLink' => false
		];

		$pageWithoutDisplaytitleWithSelfLink = [
			'name' => 'Page without displaytitle',
			'redirectName' => null,
			'displaytitle' => null,
			'selfLink' => true
		];

		$pageWithDisplaytitleWithSelfLink = [
			'name' => 'Page with displaytitle',
			'redirectName' => null,
			'displaytitle' => 'My displaytitle',
			'selfLink' => true
		];

		$userPageWithoutDisplaytitle = [
			'name' => 'User:Page without displaytitle',
			'redirectName' => null,
			'displaytitle' => null,
			'selfLink' => false
		];

		$userPageWithDisplaytitle = [
			'name' => 'User:Page with displaytitle',
			'redirectName' => null,
			'displaytitle' => 'My displaytitle',
			'selfLink' => false
		];

		$categoryPageWithoutDisplaytitle = [
			'name' => 'Category:Category without displaytitle',
			'redirectName' => null,
			'displaytitle' => null,
			'selfLink' => false
		];

		$categoryPageWithDisplaytitle = [
			'name' => 'Category:Category with displaytitle',
			'redirectName' => null,
			'displaytitle' => 'My displaytitle',
			'selfLink' => false
		];

		$this->addTests( [
			$pageWithoutDisplaytitle
			] );
		$this->addTests( [
			$pageWithDisplaytitle
			] );
		$this->addTests( [
			$redirectToPageWithoutDisplaytitle,
			$pageWithoutDisplaytitle
			] );
		$this->addTests( [
			$redirectToPageWithDisplaytitle,
			$pageWithDisplaytitle
			] );
		$this->addTests( [
			$pageWithoutDisplaytitleWithSelfLink
			] );
		$this->addTests( [
			$pageWithDisplaytitleWithSelfLink
			] );
		$this->addTests( [
			$userPageWithoutDisplaytitle
			] );
		$this->addTests( [
			$userPageWithDisplaytitle
			] );
		$this->addTests( [
			$categoryPageWithoutDisplaytitle
			] );
		$this->addTests( [
			$categoryPageWithDisplaytitle
			] );

		return $this->tests;
	}

	private function isCategory( $pageName ) {
		return substr( $pageName, 0, strlen( 'Category:' ) ) === 'Category:';
	}

	private function lcfirstPageName( $name ) {
		$pieces = explode( ':', $name );
		if ( count( $pieces ) > 1 ) {
			return $pieces[0] . ':' . lcfirst( $pieces[1] );
		} else {
			return lcfirst( $name );
		}
	}

	/**
	 * Add tests for a given test page to the array of tests.
	 * @param array $testPages The array of test pages
	 */
	private function addTests( $testPages ) {
		$name = $testPages[0]['name'];
		$lcname = $this->lcfirstPageName( $name );
		$uname = str_replace( ' ', '_', $name );

		$test = [];
		$test['testName'] = "Link to $name, no link text";
		$test['pageName'] = $name;
		$test['linkText'] = null;
		$test['testPages'] = $testPages;
		$this->tests[] = $test;

		$test = [];
		$test['testName'] = "Link to $name, lcfirst page name, no link text";
		$test['pageName'] = $lcname;
		$test['linkText'] = null;
		$test['testPages'] = $testPages;
		$this->tests[] = $test;

		// Categories use sorting keys instead of link text and don't use fragments
		if ( !$this->isCategory( $name ) ) {
			$test = [];
			$test['testName'] = "Link to $name with fragment, no link text";
			$test['pageName'] = $name . "#fragment";
			$test['linkText'] = null;
			$test['testPages'] = $testPages;
			$this->tests[] = $test;

			if ( $testPages[0]['redirectName'] === null ) {
				$test = [];
				$test['testName'] = "Link to $name, fragment only, no link text";
				$test['pageName'] = "#fragment";
				$test['linkText'] = null;
				$test['testPages'] = $testPages;
				$this->tests[] = $test;
			}

			$test = [];
			$test['testName'] = "Link to $name, page name link text";
			$test['pageName'] = $name;
			$test['linkText'] = $name;
			$test['testPages'] = $testPages;
			$this->tests[] = $test;

			$test = [];
			$test['testName'] = "Link to $name, page name with underscores link text";
			$test['pageName'] = $name;
			$test['linkText'] = $uname;
			$test['testPages'] = $testPages;
			$this->tests[] = $test;

			$test = [];
			$test['testName'] = "Link to $name, lcfirst page name, page name link text";
			$test['pageName'] = $lcname;
			$test['linkText'] = $name;
			$test['testPages'] = $testPages;
			$this->tests[] = $test;

			$test = [];
			$test['testName'] = "Link to $name, lcfirst page name link text";
			$test['pageName'] = $name;
			$test['linkText'] = $lcname;
			$test['testPages'] = $testPages;
			$this->tests[] = $test;

			$test = [];
			$test['testName'] =
				"Link to $name, lcfirst page name, lcfirst page name link text";
			$test['pageName'] = $lcname;
			$test['linkText'] = $lcname;
			$test['testPages'] = $testPages;
			$this->tests[] = $test;

			$test = [];
			$test['testName'] = "Link to $name, link text";
			$test['pageName'] = $name;
			$test['linkText'] = 'abc';
			$test['testPages'] = $testPages;
			$this->tests[] = $test;

			$test = [];
			$test['testName'] = "Link to $name, lcfirst page name, link text";
			$test['pageName'] = $lcname;
			$test['linkText'] = 'abc';
			$test['testPages'] = $testPages;
			$this->tests[] = $test;
		}
	}
}
