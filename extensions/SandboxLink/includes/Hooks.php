<?php

namespace MediaWiki\Extension\SandboxLink;

use Config;
use MediaWiki\Hook\SkinPreloadExistenceHook;
use MediaWiki\Hook\SkinTemplateNavigation__UniversalHook;
use Skin;
use Title;

/**
 * Add a link to user's personal sandbox to personal tools menu.
 *
 * https://www.mediawiki.org/wiki/Extension:SandboxLink
 *
 * @file
 * @license MIT
 */
class Hooks implements
	SkinPreloadExistenceHook,
	SkinTemplateNavigation__UniversalHook
{
	/** @var bool */
	private $disableAnon;

	/**
	 * @param Config $mainConfig
	 */
	public function __construct( Config $mainConfig ) {
		$this->disableAnon = $mainConfig->get( 'SandboxLinkDisableAnon' );
	}

	/**
	 * Return a Title for the page where the current user's sandbox is.
	 *
	 * @param Skin $skin For context
	 * @return Title|null
	 */
	private function getSandboxTitle( Skin $skin ) {
		$subpageMsg = $skin->msg( 'sandboxlink-subpage-name' )->inContentLanguage();
		if ( $subpageMsg->isDisabled() ) {
			return null;
		}
		$username = $skin->getUser()->getName();
		return Title::makeTitleSafe( NS_USER, $username . '/' . $subpageMsg->plain() );
	}

	/**
	 * Return a link descriptor for the page where the current user's sandbox is,
	 * relative to current title and in current language.
	 *
	 * @param Skin $skin For context
	 * @return array|null Link descriptor in a format accepted by PersonalUrls hook
	 */
	private function makeSandboxLink( Skin $skin ) {
		$currentTitle = $skin->getTitle();

		$title = $this->getSandboxTitle( $skin );
		if ( !$title ) {
			return null;
		}

		if ( $title->exists() && $title->isRedirect() ) {
			$href = $title->getLocalURL( [ 'redirect' => 'no' ] );
		} elseif ( $title->exists() ) {
			$href = $title->getLocalURL();
		} else {
			$query = [ 'action' => 'edit', 'redlink' => '1' ];

			$editintroMsg = $skin->msg( 'sandboxlink-editintro-pagename' )->inContentLanguage();
			if ( !$editintroMsg->isDisabled() ) {
				$query['editintro'] = $editintroMsg->plain();
			}

			$preloadMsg = $skin->msg( 'sandboxlink-preload-pagename' )->inContentLanguage();
			if ( !$preloadMsg->isDisabled() ) {
				$query['preload'] = $preloadMsg->plain();
			}

			$href = $title->getLocalURL( $query );
		}

		return [
			'id' => 'pt-sandbox',
			'text' => $skin->msg( 'sandboxlink-portlet-label' )->text(),
			'href' => $href,
			'class' => $title->exists() ? false : 'new',
			'icon' => 'sandbox',
			'exists' => $title->exists(),
			'active' => $title->equals( $currentTitle ),
		];
	}

	/**
	 * SkinPreloadExistence hook handler.
	 *
	 * Add the title of the page where the current user's sandbox is to link existence cache.
	 *
	 * @param Title[] &$titles
	 * @param Skin $skin
	 * @return bool true
	 */
	public function onSkinPreloadExistence( &$titles, $skin ) {
		$title = $this->getSandboxTitle( $skin );
		if ( $title ) {
			$titles[] = $title;
		}
		return true;
	}

	/**
	 * PersonalUrls hook handler.
	 *
	 * Possibly add a link to the page where the current user's sandbox is to personal tools menu.
	 *
	 * @param Skin $skin
	 * @param array &$links
	 * @phpcs:disable MediaWiki.NamingConventions.LowerCamelFunctionsName.FunctionName
	 */
	public function onSkinTemplateNavigation__Universal( $skin, &$links ): void {
		// phpcs:enable MediaWiki.NamingConventions.LowerCamelFunctionsName.FunctionName
		// using // phpcs:ignore after docblock doesn't work, it shows
		// MediaWiki.Commenting.FunctionComment.MissingDocumentationPublic
		if ( $this->disableAnon && $skin->getUser()->isAnon() ) {
			return;
		}

		$link = $this->makeSandboxLink( $skin );
		if ( !$link ) {
			return;
		}

		$newPersonalUrls = [];
		$personalUrls = $links['user-menu'] ?? [];
		// Insert our link before the link to user preferences.
		// If the link to preferences is missing, insert at the end.
		foreach ( $personalUrls as $key => $value ) {
			if ( $key === 'preferences' ) {
				$newPersonalUrls['sandbox'] = $link;
			}
			$newPersonalUrls[$key] = $value;
		}
		if ( !array_key_exists( 'sandbox', $newPersonalUrls ) ) {
			$newPersonalUrls['sandbox'] = $link;
		}

		$links['user-menu'] = $newPersonalUrls;
	}
}
