<?php

namespace MediaWiki\Parser\Parsoid;

use MediaWiki\Languages\LanguageConverterFactory;
use MediaWiki\Page\PageReference;
use MediaWiki\Parser\Parsoid\Config\PageConfigFactory;
use MediaWiki\Revision\MutableRevisionRecord;
use MediaWiki\Revision\SlotRecord;
use MediaWiki\Title\Title;
use ParserFactory;
use ParserOptions;
use ParserOutput;
use Wikimedia\Assert\Assert;
use Wikimedia\Parsoid\Config\DataAccess;
use Wikimedia\Parsoid\Config\SiteConfig;
use Wikimedia\Parsoid\Parsoid;
use WikitextContent;

/**
 * Parser implementation which uses Parsoid.
 *
 * Currently incomplete; see T236809 for the long-term plan.
 *
 * @since 1.41
 * @unstable since 1.41; see T236809 for plan.
 */
class ParsoidParser /* eventually this will extend \Parser */ {

	/** @var Parsoid */
	private $parsoid;

	/** @var PageConfigFactory */
	private $pageConfigFactory;

	/** @var LanguageConverterFactory */
	private $languageConverterFactory;

	/** @var ParserFactory */
	private $legacyParserFactory;

	/**
	 * @param SiteConfig $siteConfig
	 * @param DataAccess $dataAccess
	 * @param PageConfigFactory $pageConfigFactory
	 * @param LanguageConverterFactory $languageConverterFactory
	 * @param ParserFactory $legacyParserFactory
	 */
	public function __construct(
		SiteConfig $siteConfig,
		DataAccess $dataAccess,
		PageConfigFactory $pageConfigFactory,
		LanguageConverterFactory $languageConverterFactory,
		ParserFactory $legacyParserFactory
	) {
		$this->parsoid = new Parsoid( $siteConfig, $dataAccess );
		$this->pageConfigFactory = $pageConfigFactory;
		$this->languageConverterFactory = $languageConverterFactory;
		$this->legacyParserFactory = $legacyParserFactory;
	}

	/**
	 * Convert wikitext to HTML
	 * Do not call this function recursively.
	 *
	 * @param string $text Text we want to parse
	 * @param-taint $text escapes_htmlnoent
	 * @param PageReference $page
	 * @param ParserOptions $options
	 * @param bool $linestart
	 * @param bool $clearState
	 * @param int|null $revId ID of the revision being rendered. This is used to render
	 *  REVISION* magic words. 0 means that any current revision will be used. Null means
	 *  that {{REVISIONID}}/{{REVISIONUSER}} will be empty and {{REVISIONTIMESTAMP}} will
	 *  use the current timestamp.
	 * @return ParserOutput
	 * @return-taint escaped
	 * @unstable since 1.41
	 */
	public function parse(
		string $text, PageReference $page, ParserOptions $options,
		bool $linestart = true, bool $clearState = true, ?int $revId = null
	): ParserOutput {
		Assert::invariant( $linestart, '$linestart=false is not yet supported' );
		Assert::invariant( $clearState, '$clearState=false is not yet supported' );
		$title = Title::castFromPageReference( $page ) ??
			// ::castFromPageReference() never actually returns null here
			Title::makeTitle( NS_SPECIAL, 'Badtitle/Parser' );
		$lang = $options->getTargetLanguage();
		if ( $lang === null ) {
			if ( $options->getInterfaceMessage() ) {
				$lang = $options->getUserLangObj();
			} else {
				$lang = $title->getPageLanguage();
			}
		}
		$langConv = $this->languageConverterFactory->getLanguageConverter(
			$lang
		);
		$pageConfig = $revId === null ? null : $this->pageConfigFactory->create(
			$title,
			$options->getUserIdentity(),
			$revId,
			null, // unused
			$lang
		);
		if ( !( $pageConfig && $pageConfig->getPageMainContent() === $text ) ) {
			// This is a bit awkward! But we really need to parse $text, which
			// may or may not correspond to the $revId provided!
			// T332928 suggests one solution: splitting the "have revid"
			// callers from the "bare text, no associated revision" callers.
			$revisionRecord = new MutableRevisionRecord( $title );
			if ( $revId !== null ) {
				$revisionRecord->setId( $revId );
			}
			$revisionRecord->setSlot(
				SlotRecord::newUnsaved(
					SlotRecord::MAIN,
					new WikitextContent( $text )
				)
			);
			$pageConfig = $this->pageConfigFactory->create(
				$title,
				$options->getUserIdentity(),
				$revisionRecord,
				null, // unused
				$lang
			);
		}
		$parserOutput = new ParserOutput();
		// T331148: This should be checked to be consistent with the
		// REST interfaces for Parsoid output
		$pageBundle = $this->parsoid->wikitext2html( $pageConfig, [
			'pageBundle' => true,
			'wrapSections' => true,
			'htmlVariantLanguage' => $langConv->getPreferredVariant(),
			'outputContentVersion' => Parsoid::defaultHTMLVersion(),
		], $headers, $parserOutput );
		$parserOutput = PageBundleParserOutputConverter::parserOutputFromPageBundle( $pageBundle, $parserOutput );
		$this->makeLimitReport( $options, $parserOutput );

		return $parserOutput;
	}

	/**
	 * Set the limit report data in the current ParserOutput.
	 * This is ported from Parser::makeLimitReport() and should eventually
	 * use the method from the superclass directly.
	 */
	protected function makeLimitReport(
		ParserOptions $parserOptions, ParserOutput $parserOutput
	) {
		$maxIncludeSize = $parserOptions->getMaxIncludeSize();

		$cpuTime = $parserOutput->getTimeSinceStart( 'cpu' );
		if ( $cpuTime !== null ) {
			$parserOutput->setLimitReportData( 'limitreport-cputime',
				sprintf( "%.3f", $cpuTime )
			);
		}

		$wallTime = $parserOutput->getTimeSinceStart( 'wall' );
		$parserOutput->setLimitReportData( 'limitreport-walltime',
			sprintf( "%.3f", $wallTime )
		);

		$parserOutput->setLimitReportData( 'limitreport-timingprofile', [ 'not yet supported' ] );

		// Add other cache related metadata
		$parserOutput->setLimitReportData( 'cachereport-timestamp',
			$parserOutput->getCacheTime() );
		$parserOutput->setLimitReportData( 'cachereport-ttl',
			$parserOutput->getCacheExpiry() );
		$parserOutput->setLimitReportData( 'cachereport-transientcontent',
			$parserOutput->hasReducedExpiry() );
	}

}
