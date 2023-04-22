<?php

/**
 * Class DisplayTitleLuaLibrary
 *
 * Implements lua integration for Extension:DisplayTitle
 *
 * @since 1.2
 * @author Tobias Oetterer < oetterer@uni-paderborn.de >
 */
class DisplayTitleLuaLibrary extends Scribunto_LuaLibraryBase {
	/**
	 * Called to register the library.
	 *
	 * This should do any necessary setup and then call $this->getEngine()->registerInterface().
	 * The value returned by that call should be returned from this function,
	 * and must be for 'deferLoad' libraries to work right.
	 *
	 * @return array Lua package
	 */
	public function register() {
		$lib = [
			'get'   => [ $this, 'getDisplayTitle' ],
			'set'   => [ $this, 'setDisplayTitle' ],
		];

		return $this->getEngine()->registerInterface( __DIR__ . '/' . 'displaytitle.lua',	$lib, [] );
	}

	/**
	 * Returns the display title for a given page.
	 *
	 * Mirrors the functionality of parser function #getdisplaytitle, using the same code base.
	 * @uses \DisplayTitleHooks::getdisplaytitleParserFunction, \DisplayTitleLuaLibrary::toLua
	 * @param string $pageName the name of the page, the display title should be received for
	 * @return string[]
	 */
	public function getDisplayTitle( $pageName ) {
		if ( is_string( $pageName ) && strlen( $pageName ) ) {
			return $this->toLua( DisplayTitleHooks::getdisplaytitleParserFunction(
				$this->getParser(),
				$pageName
			) );
		} else {
			return [ '' ];
		}
	}

	/**
	 * Sets the display title for the current page.
	 *
	 * Mirrors the functionality of the magic word DISPLAYTITLE.
	 * @uses \CoreParserFunctions::displaytitle, \DisplayTitleLuaLibrary::toLua
	 * @param string $newDisplayTitle the new display title for the current page
	 * @return string[]
	 */
	public function setDisplayTitle( $newDisplayTitle ) {
		if ( is_string( $newDisplayTitle ) && strlen( $newDisplayTitle ) ) {
			return $this->toLua( CoreParserFunctions::displaytitle(
				$this->getParser(),
				$newDisplayTitle
			) );
		} else {
			return [ '' ];
		}
	}

	/**
	 * This takes any value and makes sure, that it can be used inside lua.
	 * I.e. converts php arrays to lua tables, dumps objects and functions, etc.
	 * E.g. A resulting table has its numerical indices start with 1
	 * @uses \Scribunto_LuaLibraryBase::getLuaType
	 * @param mixed $valueToConvert
	 * @return mixed
	 */
	private function convertToLuaValue( $valueToConvert ) {
		$type = $this->getLuaType( $valueToConvert );
		if ( $type == 'nil'
			|| $type == 'function'
			|| preg_match( '/^PHP .*/', $valueToConvert )
		) {
			return null;
		}
		if ( is_array( $valueToConvert ) ) {
			foreach ( $valueToConvert as $key => $value ) {
				$valueToConvert[$key] = $this->convertToLuaValue( $value );
			}
			array_unshift( $valueToConvert, '' );
			unset( $valueToConvert[0] );
		}
		return $valueToConvert;
	}

	/**
	 * This makes sure that you can return any given value directly to lua.
	 * Does all your type checking and conversion for you. Also wraps in 'array()'.
	 * @param mixed $val
	 * @return array
	 */
	private function toLua( $val ) {
		return [ $this->convertToLuaValue( $val ) ];
	}
}
