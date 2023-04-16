<?php

namespace MediaWiki\Extension\DynamicPageList;

use DateFormatter;
use ExtensionRegistry;
use ImageGalleryBase;
use MediaWiki\MediaWikiServices;
use MWException;
use PageImages\PageImages;
use Parser;
use ParserOptions;
use PoolCounterWorkViaCallback;
use Title;
use WANObjectCache;
use WikiMap;
use Wikimedia\Rdbms\Database;
use Wikimedia\Rdbms\IDatabase;

class Hooks {

	/**
	 * Set up the <DynamicPageList> tag.
	 * @param Parser $parser
	 * @return bool true
	 */
	public static function onParserFirstCallInit( Parser $parser ) {
		$parser->setHook( 'DynamicPageList', [ self::class, 'renderDynamicPageList' ] );
		return true;
	}

	/**
	 * The callback function for converting the input text to HTML output
	 * @param string $input
	 * @param array $args
	 * @param Parser $mwParser
	 * @return string
	 */
	public static function renderDynamicPageList( $input, $args, $mwParser ) {
		global $wgDLPmaxCategories, $wgDLPMaxResultCount, $wgDLPMaxCacheTime,
			$wgDLPAllowUnlimitedResults, $wgDLPAllowUnlimitedCategories;

		if ( $wgDLPMaxCacheTime !== false ) {
			$mwParser->getOutput()->updateCacheExpiry( $wgDLPMaxCacheTime );
		}
		$mwParser->addTrackingCategory( 'intersection-category' );

		$countSet = false;
		$count = 0;

		$startList = '<ul>';
		$endList = '</ul>';
		$startItem = '<li>';
		$endItem = '</li>';
		$inlineMode = false;

		$useGallery = false;
		$pageImagesEnabled = ExtensionRegistry::getInstance()->isLoaded( 'PageImages' );
		$galleryFileSize = false;
		$galleryFileName = true;
		$galleryImageHeight = 0;
		$galleryImageWidth = 0;
		$galleryNumbRows = 0;
		$galleryCaption = '';
		$gallery = null;

		$orderMethod = 'categoryadd';
		$order = 'descending';
		$redirects = 'exclude';
		$stable = 'include';
		$quality = 'include';
		$flaggedRevs = false;

		$namespaceFiltering = false;
		$namespaceIndex = 0;

		$offset = 0;

		$googleHack = false;

		$suppressErrors = false;
		$suppressPCErrors = false;
		$showNamespace = true;
		$addFirstCategoryDate = false;
		$ignoreSubpages = false;
		$dateFormat = '';
		$stripYear = false;

		$linkOptions = [];
		$categories = [];
		$excludeCategories = [];

		$services = MediaWikiServices::getInstance();
		$parser = $services->getParserFactory()->create();
		$parser->setPage( $mwParser->getPage() );
		$poptions = new ParserOptions( $mwParser->getUserIdentity() );

		$contLang = $services->getContentLanguage();

		$parameters = explode( "\n", $input );
		foreach ( $parameters as $parameter ) {
			$paramField = explode( '=', $parameter, 2 );
			if ( count( $paramField ) < 2 ) {
				continue;
			}
			$type = trim( $paramField[0] );
			$arg = trim( $paramField[1] );
			switch ( $type ) {
				case 'category':
					$title = Title::makeTitleSafe(
						NS_CATEGORY,
						$parser->transformMsg( $arg, $poptions, $mwParser->getTitle() )
					);
					if ( $title !== null ) {
						$categories[] = $title;
					}
					break;
				case 'notcategory':
					$title = Title::makeTitleSafe(
						NS_CATEGORY,
						$parser->transformMsg( $arg, $poptions, $mwParser->getTitle() )
					);
					if ( $title !== null ) {
						$excludeCategories[] = $title;
					}
					break;
				case 'namespace':
					$ns = $contLang->getNsIndex( $arg );
					if ( $ns !== null ) {
						$namespaceIndex = $ns;
						$namespaceFiltering = true;
					} else {
						// Note, since intval("some string") = 0
						// this considers pretty much anything
						// invalid here as the main namespace.
						// This was probably originally a bug,
						// but is now depended upon by people
						// writing things like namespace=main
						// so be careful when changing this code.
						$namespaceIndex = intval( $arg );
						$namespaceFiltering = ( $namespaceIndex >= 0 );
					}
					break;
				case 'count':
					// ensure that $count is a number;
					$count = intval( $arg );
					$countSet = true;
					break;
				case 'offset':
					$offset = intval( $arg );
					break;
				case 'imagewidth':
					$galleryImageWidth = intval( $arg );
					break;
				case 'imageheight':
					$galleryImageHeight = intval( $arg );
					break;
				case 'imagesperrow':
					$galleryNumbRows = intval( $arg );
					break;
				case 'mode':
					switch ( $arg ) {
						case 'gallery':
							$useGallery = true;
							$gallery = ImageGalleryBase::factory();
							$gallery->setParser( $mwParser );
							$startList = '';
							$endList = '';
							$startItem = '';
							$endItem = '';
							break;
						case 'none':
							$startList = '';
							$endList = '';
							$startItem = '';
							$endItem = '<br />';
							$inlineMode = false;
							break;
						case 'ordered':
							$startList = '<ol>';
							$endList = '</ol>';
							$startItem = '<li>';
							$endItem = '</li>';
							$inlineMode = false;
							break;
						case 'inline':
							// aka comma separated list
							$startList = '';
							$endList = '';
							$startItem = '';
							$endItem = '';
							$inlineMode = true;
							break;
						case 'unordered':
						default:
							$startList = '<ul>';
							$endList = '</ul>';
							$startItem = '<li>';
							$endItem = '</li>';
							$inlineMode = false;
							break;
					}
					break;
				case 'gallerycaption':
					// Should perhaps actually parse caption instead
					// as links and what not in caption might be useful.
					$galleryCaption = $parser->transformMsg( $arg, $poptions, $mwParser->getTitle() );
					break;
				case 'galleryshowfilesize':
					if ( $arg == 'no' || $arg == 'false' ) {
						$galleryFileSize = false;
					} else {
						$galleryFileSize = true;
					}
					break;
				case 'galleryshowfilename':
					if ( $arg == 'no' || $arg == 'false' ) {
						$galleryFileName = false;
					} else {
						$galleryFileName = true;
					}
					break;
				case 'order':
					if ( $arg == 'ascending' ) {
						$order = 'ascending';
					} else {
						$order = 'descending';
					}
					break;
				case 'ordermethod':
					switch ( $arg ) {
						case 'lastedit':
							$orderMethod = 'lastedit';
							break;
						case 'length':
							$orderMethod = 'length';
							break;
						case 'created':
							$orderMethod = 'created';
							break;
						case 'sortkey':
						case 'categorysortkey':
							$orderMethod = 'categorysortkey';
							break;
						case 'popularity':
							$orderMethod = 'categoryadd'; // no HitCounters since MW1.25
							break;
						case 'categoryadd':
						default:
							$orderMethod = 'categoryadd';
							break;
					}
					break;
				case 'redirects':
					switch ( $arg ) {
						case 'include':
							$redirects = 'include';
							break;
						case 'only':
							$redirects = 'only';
							break;
						case 'exclude':
						default:
							$redirects = 'exclude';
							break;
					}
					break;
				case 'stablepages':
					switch ( $arg ) {
						case 'include':
							$stable = 'include';
							break;
						case 'only':
							$flaggedRevs = true;
							$stable = 'only';
							break;
						case 'exclude':
						default:
							$flaggedRevs = true;
							$stable = 'exclude';
							break;
					}
					break;
				case 'qualitypages':
					switch ( $arg ) {
						case 'include':
							$quality = 'include';
							break;
						case 'only':
							$flaggedRevs = true;
							$quality = 'only';
							break;
						case 'exclude':
						default:
							$flaggedRevs = true;
							$quality = 'exclude';
							break;
					}
					break;
				case 'suppresserrors':
					if ( $arg == 'true' || $arg === 'all' ) {
						$suppressErrors = true;
						if ( $arg === 'all' ) {
							$suppressPCErrors = true;
						}
					} else {
						$suppressErrors = false;
					}
					break;
				case 'addfirstcategorydate':
					if ( $arg === 'true' ) {
						$addFirstCategoryDate = true;
					} elseif ( preg_match( '/^(?:[ymd]{2,3}|ISO 8601)$/', $arg ) ) {
						// if it more or less is valid dateformat.
						$addFirstCategoryDate = true;
						$dateFormat = $arg;
						if ( strlen( $dateFormat ) == 2 ) {
							$dateFormat .= 'y'; # DateFormatter does not support no year. work around
							$stripYear = true;
						}
					} else {
						$addFirstCategoryDate = false;
					}
					break;
				case 'shownamespace':
					$showNamespace = $arg !== 'false';
					break;
				case 'ignoresubpages':
					$ignoreSubpages = ( $arg === 'true' );
					break;
				case 'googlehack':
					$googleHack = $arg !== 'false';
					break;
				case 'nofollow': # bug 6658
					if ( $arg !== 'false' ) {
						$linkOptions['rel'] = 'nofollow';
					}
					break;
			} // end main switch()
		} // end foreach()

		$catCount = count( $categories );
		$excludeCatCount = count( $excludeCategories );
		$totalCatCount = $catCount + $excludeCatCount;

		if ( $catCount < 1 && !$namespaceFiltering ) {
			if ( $suppressErrors ) {
				return '';
			}

			// "!!no included categories!!"
			return wfMessage( 'intersection_noincludecats' )->inContentLanguage()->escaped();
		}

		if ( $totalCatCount > $wgDLPmaxCategories && !$wgDLPAllowUnlimitedCategories ) {
			if ( $suppressErrors ) {
				return '';
			}

			// "!!too many categories!!"
			return wfMessage( 'intersection_toomanycats' )->inContentLanguage()->escaped();
		}

		if ( $countSet ) {
			if ( $count < 1 ) {
				$count = 1;
			}
			if ( $count > $wgDLPMaxResultCount ) {
				$count = $wgDLPMaxResultCount;
			}
		} elseif ( !$wgDLPAllowUnlimitedResults ) {
			$count = $wgDLPMaxResultCount;
			$countSet = true;
		}

		// disallow showing date if the query doesn't have an inclusion category parameter
		if ( $catCount < 1 ) {
			$addFirstCategoryDate = false;
			// don't sort by fields relating to categories if there are no categories.
			if ( $orderMethod === 'categoryadd' || $orderMethod === 'categorysortkey' ) {
				$orderMethod = 'created';
			}
		}

		// build the SQL query
		$dbr = wfGetDB( DB_REPLICA, 'vslow' );
		$tables = [ 'page' ];
		$fields = [ 'page_namespace', 'page_title' ];
		$where = [];
		$join = [];
		$options = [];

		if ( $googleHack ) {
			$fields[] = 'page_id';
		}

		if ( $addFirstCategoryDate ) {
			$fields[] = 'c1.cl_timestamp';
		}

		if ( $namespaceFiltering ) {
			$where['page_namespace'] = $namespaceIndex;
		}

		// Bug 14943 - Allow filtering based on FlaggedRevs stability.
		// Check if the extension actually exists before changing the query...
		if ( $flaggedRevs && ExtensionRegistry::getInstance()->isLoaded( 'FlaggedRevs' ) ) {
			$tables[] = 'flaggedpages';
			$join['flaggedpages'] = [ 'LEFT JOIN', 'page_id = fp_page_id' ];

			if ( $stable == 'only' ) {
				$where[] = 'fp_stable IS NOT NULL';
			} elseif ( $stable == 'exclude' ) {
				$where['fp_stable'] = null;
			}

			if ( $quality == 'only' ) {
				$where[] = 'fp_quality >= 1';
			} elseif ( $quality == 'exclude' ) {
				$where[] = 'fp_quality = 0 OR fp_quality IS NULL';
			}
		}

		if ( $redirects == 'only' ) {
			$where['page_is_redirect'] = 1;
		} elseif ( $redirects == 'exclude' ) {
			$where['page_is_redirect'] = 0;
		}

		if ( $ignoreSubpages ) {
			$where[] = "page_title NOT " .
				$dbr->buildLike( $dbr->anyString(), '/', $dbr->anyString() );
		}

		if ( $useGallery && $pageImagesEnabled ) {
			$tables['pp1'] = 'page_props';
			$join['pp1'] = [
				'LEFT JOIN',
				[
					'pp1.pp_propname' => PageImages::PROP_NAME_FREE,
					'page_id = pp1.pp_page'
				]
			];
			$fields['pageimage_free'] = 'pp1.pp_value';

			$tables['pp2'] = 'page_props';
			$join['pp2'] = [
				'LEFT JOIN',
				[
					'pp2.pp_propname' => PageImages::PROP_NAME,
					'page_id = pp2.pp_page'
				]
			];
			$fields['pageimage_nonfree'] = 'pp2.pp_value';
		}

		// Alias each category as c1, c2, etc.
		$currentTableNumber = 1;
		$categorylinks = 'categorylinks';
		foreach ( $categories as $cat ) {
			$join["c$currentTableNumber"] = [
				'INNER JOIN',
				[
					"page_id = c{$currentTableNumber}.cl_from",
					"c{$currentTableNumber}.cl_to={$dbr->addQuotes( $cat->getDBKey() )}"
				]
			];
			$tables["c$currentTableNumber"] = $categorylinks;

			$currentTableNumber++;
		}

		foreach ( $excludeCategories as $cat ) {
			$join["c$currentTableNumber"] = [
				'LEFT OUTER JOIN',
				[
					"page_id = c{$currentTableNumber}.cl_from",
					"c{$currentTableNumber}.cl_to={$dbr->addQuotes( $cat->getDBKey() )}"
				]
			];
			$tables["c$currentTableNumber"] = $categorylinks;
			$where["c{$currentTableNumber}.cl_to"] = null;
			$currentTableNumber++;
		}

		if ( $order === 'descending' ) {
			$sqlOrder = 'DESC';
		} else {
			$sqlOrder = 'ASC';
		}

		switch ( $orderMethod ) {
			case 'lastedit':
				$sqlSort = 'page_touched';
				break;
			case 'length':
				$sqlSort = 'page_len';
				break;
			case 'created':
				$sqlSort = 'page_id'; // Since they're never reused and increasing
				break;
			case 'categorysortkey':
				$sqlSort = "c1.cl_type $sqlOrder, c1.cl_sortkey";
				break;
			case 'categoryadd':
				$sqlSort = 'c1.cl_timestamp';
				break;
			default:
				// Should never reach here
				throw new MWException( "Invalid ordermethod $orderMethod" );
		}

		$options['ORDER BY'] = "$sqlSort $sqlOrder";

		if ( $countSet ) {
			$options['LIMIT'] = $count;
		}
		if ( $offset > 0 ) {
			$options['OFFSET'] = $offset;
		}

		// To track down what page offending queries are on.
		// For some reason, $fname doesn't get escaped by our code?!
		$pageName = str_replace( [ '*', '/' ], '-', $mwParser->getTitle()->getPrefixedDBkey() );
		$rows = self::processQuery( $pageName, $dbr, $tables, $fields, $where, $options, $join );
		if ( $rows === false ) {
			// This error path is very fast (We exit immediately if poolcounter is full)
			// Thus it should be safe to try again in ~5 minutes.
			$mwParser->getOutput()->updateCacheExpiry( 4 * 60 + mt_rand( 0, 120 ) );
			// Pool counter all threads in use.
			if ( $suppressPCErrors ) {
				return '';
			}
			return wfMessage( 'intersection_pcerror' )->inContentLanguage()->escaped();
		}
		if ( count( $rows ) == 0 ) {
			if ( $suppressErrors ) {
				return '';
			}

			return wfMessage( 'intersection_noresults' )->inContentLanguage()->escaped();
		}

		$df = null;
		if ( $dateFormat !== '' && $addFirstCategoryDate ) {
			$df = DateFormatter::getInstance();
		}

		// process results of query, outputing equivalent of <li>[[Article]]</li>
		// for each result, or something similar if the list uses other
		// startlist/endlist
		$articleList = [];
		$linkRenderer = $services->getLinkRenderer();
		foreach ( $rows as $row ) {
			$title = Title::makeTitle( $row->page_namespace, $row->page_title );
			$categoryDate = '';
			if ( $addFirstCategoryDate ) {
				if ( $dateFormat !== '' ) {
					// this is a tad ugly
					// use DateFormatter, and support discarding year.
					$categoryDate = wfTimestamp( TS_ISO_8601, $row->cl_timestamp );
					if ( $stripYear ) {
						$categoryDate = $contLang->getMonthName( (int)substr( $categoryDate, 5, 2 ) )
							. ' ' . substr( $categoryDate, 8, 2 );
					} else {
						$categoryDate = substr( $categoryDate, 0, 10 );
					}
					$categoryDate = $df->reformat( $dateFormat, $categoryDate, [ 'match-whole' ] );
				} else {
					$categoryDate = $contLang->date( wfTimestamp( TS_MW, $row->cl_timestamp ) );
				}
				if ( $useGallery ) {
					$categoryDate .= ' ';
				} else {
					$categoryDate .= wfMessage( 'colon-separator' )->text();
				}
			}

			$query = [];
			if ( $googleHack ) {
				$query['dpl_id'] = intval( $row->page_id );
			}

			if ( $showNamespace ) {
				$titleText = $title->getPrefixedText();
			} else {
				$titleText = $title->getText();
			}

			if ( $useGallery ) {
				$link = '';
				if ( $galleryFileName ) {
					$link = $linkRenderer->makeKnownLink(
						$title,
						$titleText,
						[ 'class' => 'galleryfilename galleryfilename-truncate' ]
					) . "\n";
				}

				$file = null;
				if ( $title->getNamespace() !== NS_FILE && $pageImagesEnabled ) {
					$file = $row->pageimage_free ?: $row->pageimage_nonfree;
				}

				// Note, $categoryDate is treated as raw html
				// this is safe since the only html present
				// would come from the dateformatter <span>.
				if ( $file !== null ) {
					$gallery->add(
						Title::makeTitle( NS_FILE, $file ),
						$link . $categoryDate,
						$file,
						$title->getLinkURL()
					);
				} else {
					$gallery->add(
						$title,
						$link . $categoryDate,
						$title->getText()
					);
				}
			} else {
				// FIXME: per T17739 and T22818, forcearticlepath
				// was used, this may be unnecessary nowadays
				// depending on a full rollout of GoogleNewsSitemap
				$articleList[] = htmlspecialchars( $categoryDate ) .
					MediaWikiServices::getInstance()->getLinkRendererFactory()
						->createFromLegacyOptions( [ 'forcearticlepath' ] )->makeKnownLink(
							$title,
							$titleText,
							$linkOptions,
							$query
					);
			}
		}

		if ( $useGallery ) {
			$gallery->setHideBadImages();
			$gallery->setShowFilename( false );
			$gallery->setShowBytes( $galleryFileSize );
			if ( $galleryImageHeight > 0 ) {
				$gallery->setHeights( (string)$galleryImageHeight );
			}
			if ( $galleryImageWidth > 0 ) {
				$gallery->setWidths( (string)$galleryImageWidth );
			}
			if ( $galleryNumbRows > 0 ) {
				$gallery->setPerRow( $galleryNumbRows );
			}
			if ( $galleryCaption !== '' ) {
				$gallery->setCaption( $galleryCaption ); // gallery class escapes string
			}
			return $gallery->toHtml();
		}

		// start unordered list
		$output = $startList . "\n" . $startItem;
		if ( $inlineMode ) {
			$output .= $contLang->commaList( $articleList );
		} else {
			$output .= implode( "$endItem \n$startItem", $articleList );
		}
		$output .= $endItem . $endList . "\n";
		// end unordered list

		return $output;
	}

	/**
	 * @param string $pageName Name of page (for logging purposes)
	 * @param IDatabase $dbr
	 * @param array $tables
	 * @param array $fields
	 * @param array $where
	 * @param array $options
	 * @param array $join
	 * @return array|bool List of stdObj's or false on poolcounter being full
	 */
	public static function processQuery(
		string $pageName,
		IDatabase $dbr,
		array $tables,
		array $fields,
		array $where,
		array $options,
		array $join
	) {
		global $wgDLPQueryCacheTime, $wgDLPMaxQueryTime;
		$qname = __METHOD__ . ' - ' . $pageName;
		if ( $wgDLPMaxQueryTime ) {
			$options['MAX_EXECUTION_TIME'] = $wgDLPMaxQueryTime;
		}

		$doQuery = static function () use ( $qname, $dbr, $tables, $fields, $where, $options, $join ) {
			$res = $dbr->select( $tables, $fields, $where, $qname, $options, $join );
			// Serializing a ResultWrapper doesn't work.
			return iterator_to_array( $res );
		};

		// We're probably already inside a pool-counter lock due to parse, so nowait.
		$poolCounterKey = "nowait:dpl-query:" . WikiMap::getCurrentWikiId();
		// The goal here is to have an emergency shutoff break to prevent a query
		// pile-up if a large number of slow DPL queries are run at once.
		// This is meant to be in total across the wiki. The WANObjectCache stuff below this
		// is meant to make the somewhat common case of the same DPL query being run multiple
		// times due to template usage fast, where this is not meant to speed things up, but
		// to have an emergency stop before things get out of hand.
		// Recommended config is probably something like 15 workers normally and
		// 5 workers if DB seems to have excessive load.
		$worker = new PoolCounterWorkViaCallback( 'DPL', $poolCounterKey, [
			'doWork' => $doQuery,
		] );

		if ( $wgDLPQueryCacheTime <= 0 ) {
			return $worker->execute();
		}

		// This is meant to guard against the case where a lot of pages get parsed at once
		// all with the same query. See T262240. This should be a short cache, e.g. 120 seconds.
		$cache = MediaWikiServices::getInstance()->getMainWANObjectCache();
		// Don't use actual input as hash, because some per-page parsing can happen to options.
		$query = $dbr->selectSQLText( $tables, $fields, $where, '', $options, $join );
		return $cache->getWithSetCallback(
			$cache->makeKey( "DPLQuery", hash( "sha256", $query ) ),
			$wgDLPQueryCacheTime,
			static function ( $oldVal, &$ttl, &$setOpts ) use ( $worker, $dbr ){
				// TODO: Maybe could do something like check max(cl_timestamp) in
				// category and the count in category.cat_pages, and invalidate if
				// it appears like someone added or removed something from the category.
				$setOpts += Database::getCacheSetOptions( $dbr );
				$res = $worker->execute();
				if ( $res === false ) {
					// Do not cache errors.
					$ttl = WANObjectCache::TTL_UNCACHEABLE;
					// If we have oldVal, prefer it to error
					if ( is_array( $oldVal ) ) {
						return $oldVal;
					}
				}
				return $res;
			},
			[
				'lowTTL' => min( $cache::TTL_MINUTE, floor( $wgDLPQueryCacheTime * 0.75 ) ),
				'pcTTL' => min( $cache::TTL_PROC_LONG, $wgDLPQueryCacheTime )
			]
		);
	}
}
