# MediaWiki Purge Extension

The Purge extension adds a purge tab on all normal pages, allowing for quick purging of the cache.

## Installation

* Download from the [release page](https://github.com/AlPha5130/mediawiki-extensions-Purge/releases), extract the archive and place the files in a directory called `Purge` in your `extensions/` folder.
* Add the following code at the bottom of your `LocalSettings.php`:

``` php
wfLoadExtension( 'Purge' );
```

* Done - Navigate to Special:Version on your wiki to verify that this extension is successfully installed.

## Notice

This is the fork of the [original repository](https://github.com/Hutchy68/Purge), because of lacking maintenace.

Should you find any bugs, please submit an issue. Any pull request is welcome.

## License

The source code of this extension is licensed under GNU General Public License; either version 2.0 or later is applicable.
