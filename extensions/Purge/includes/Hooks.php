<?php

namespace MediaWiki\Extension\Purge;

use SkinTemplate;

class Hooks implements \MediaWiki\Hook\SkinTemplateNavigation__UniversalHook {

	/**
	 * @link https://www.mediawiki.org/wiki/Manual:Hooks/SkinTemplateNavigation
	 * @param SkinTemplate $sktemplate The skin template object.
	 * @param array &$links The existing structured navigation links.
	 */
	public function onSkinTemplateNavigation__Universal( $sktemplate, &$links ): void {
		// Use getRelevantTitle if present so that this will work on some special pages
		$title = method_exists( $sktemplate, 'getRelevantTitle' )
			? $sktemplate->getRelevantTitle()
			: $sktemplate->getTitle();
		if ( $title->getNamespace() !== NS_SPECIAL && $sktemplate->getUser()->isAllowed( 'purge' ) ) {
			$sktemplate->getOutput()->addModules( 'ext.purge' );
			$action = $sktemplate->getRequest()->getText( 'action' );

			$links['actions']['purge'] = [
				'class' => $action === 'purge' ? 'selected' : false,
				'text' => $sktemplate->msg( 'purge' )->text(),
				'href' => '#'
			];
		}
	}
}
