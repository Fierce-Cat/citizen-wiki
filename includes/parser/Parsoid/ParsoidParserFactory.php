<?php

namespace MediaWiki\Parser\Parsoid;

use MediaWiki\Languages\LanguageConverterFactory;
use MediaWiki\Parser\Parsoid\Config\PageConfigFactory;
use ParserFactory;
use Wikimedia\Parsoid\Config\DataAccess;
use Wikimedia\Parsoid\Config\SiteConfig;

/**
 * ParserFactory which uses a ParsoidParser.
 *
 * This is similar to \ParserFactory, but simplified since we don't need
 * to try to reuse parser objects.  Eventually we'll be able to simplify
 * \ParserFactory the same way.
 *
 * @since 1.41
 * @internal May be combined with \ParserFactory or otherwise refactored
 *
 * @file
 * @ingroup Parser
 */
class ParsoidParserFactory /* eventually this may extend \ParserFactory */ {

	/** @var SiteConfig */
	private $siteConfig;

	/** @var DataAccess */
	private $dataAccess;

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
		$this->siteConfig = $siteConfig;
		$this->dataAccess = $dataAccess;
		$this->pageConfigFactory = $pageConfigFactory;
		$this->languageConverterFactory = $languageConverterFactory;
		$this->legacyParserFactory = $legacyParserFactory;
	}

	/**
	 * Creates a new Parsoid parser.
	 * @return ParsoidParser
	 * @since 1.41
	 * @unstable
	 */
	public function create(): ParsoidParser {
		return new ParsoidParser(
			$this->siteConfig,
			$this->dataAccess,
			$this->pageConfigFactory,
			$this->languageConverterFactory,
			$this->legacyParserFactory
		);
	}
}
