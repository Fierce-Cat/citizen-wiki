
What it does: it stores images in Cloudflare R2 instead of the local directory.


# Installation


1\) Download the extension: `git clone --depth 1 harugon/mediawiki-cloudflare-r2 AWS`

2\) Move the AWS directory to the "extensions" directory of your MediaWiki, e.g. `/var/www/html/w/extensions` __(assuming MediaWiki is in `/var/www/html/w`)__.

3\) Create the file `/var/www/html/w/composer.local.json` with the following contents:
```json
{
	"extra": {
		"merge-plugin": {
			"include": [
				"extensions/AWS/composer.json"
			]
		}
	}
}
```

4\) Run `composer update` from `/var/www/html/w` (to download dependencies). If you don't have Composer installed, see https://www.mediawiki.org/wiki/Composer for how to install it.

5\) ) Modify LocalSettings.php (see below).

Currently, you have to use the S3 API PutBucketCors to configure CORS for your bucket.

# Configuration in LocalSettings.php

```php
wfLoadExtension( 'AWS' );

//Public Bucket URL
$wgAWSBucketDomain = ***.r2.dev';
//The S3 endpoint is available via https://<ACCOUNT_ID>.r2.cloudflarestorage.com endpoint. 
$wgFileBackends['s3']['endpoint'] = 'https://***.r2.cloudflarestorage.com';

$wgAWSCredentials = [
	'key' => '',//Access Key ID
	'secret' => '',//Secret Access Key
	'token' => false
];

$wgAWSRegion = 'auto';
//name
$wgAWSBucketName = "";

// if your images are stored in directory called "some_prefix"
// you can specify an optional prefix
//$wgAWSBucketTopSubdirectory="/some_prefix";

```


# Migrating images

By default the extension stores all images in the top-level directory of the bucket.

If you are migrating an existing `images` folder, MediaWiki uses a hashed directory structure. You will need to add this to your `LocalSettings.php` for the image paths to be generated correctly.

```php
$wgAWSRepoHashLevels = '2'; # Default 0
# 2 means that S3 objects will be named a/ab/Filename.png (same as when MediaWiki stores files in local directories)

$wgAWSRepoDeletedHashLevels = '3'; # Default 0
# 3 for naming a/ab/abc/Filename.png (same as when MediaWiki stores deleted files in local directories)
```

If your `images` folder previously was serving multiple wikis split into different subdirectories, you need to set `$wgAWSBucketTopSubdirectory`. This setting is not recommended for new wikis.

```php
$wgAWSBucketTopSubdirectory = '/something';
# images will be in **.r2.dev/something/File.png instead of bucketname.s3.amazonaws.com/File.png.
```
