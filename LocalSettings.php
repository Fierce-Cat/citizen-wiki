<?php
# This file was automatically generated by the MediaWiki 1.39.3
# installer. If you make manual changes, please keep track in case you
# need to recreate them later.
#
# See docs/Configuration.md for all configurable settings
# and their default values, but don't forget to make changes in _this_
# file, not there.
#
# Further documentation for configuration settings may be found at:
# https://www.mediawiki.org/wiki/Manual:Configuration_settings
# php debugging
$_ENV["php_debug_config"];

# Protect against web entry

if ( !defined( 'MEDIAWIKI' ) ) {
	exit;
}


## Uncomment this to disable output compression
# $wgDisableOutputCompression = true;

$wgSitename = $_ENV["SiteName"];

## The URL base path to the directory containing the wiki;
## defaults for all runtime URL paths are based off of this.
## For more information on customizing the URLs
## (like /w/index.php/Page_title to /wiki/Page_title) please see:
## https://www.mediawiki.org/wiki/Manual:Short_URL
$wgScriptPath = "";
$wgArticlePath = "/$1";
$wgUsePathInfo = true;

## The protocol and server name to use in fully-qualified URLs
$wgServer = $_ENV["Server"];

## The URL path to static resources (images, scripts, etc.)
$wgResourceBasePath = $wgScriptPath;

## The URL paths to the logo.  Make sure you change this from the default,
## or else you'll overwrite your logo when you upgrade!
$wgLogos = [
	'1x' => "$wgResourceBasePath/resources/assets/sitelogoo.svg",
	'icon' => "$wgResourceBasePath/resources/assets/sitelogo.svg",
];

$wgFavicon = "$wgResourceBasePath/resources/assets/favicon.ico";

## UPO means: this is also a user preference option

$wgEnableEmail = false;
$wgEnableUserEmail = true; # UPO

$wgEmergencyContact = "";
$wgPasswordSender = "";

$wgEnotifUserTalk = false; # UPO
$wgEnotifWatchlist = false; # UPO
$wgEmailAuthentication = true;

## Database settings
$wgDBtype = $_ENV["DbType"];
$wgDBserver = $_ENV["DbServer"];
$wgDBname = $_ENV["DbName"];
$wgDBuser = $_ENV["DbUser"];
$wgDBpassword = $_ENV["DbPassword"];

# MySQL specific settings
$wgDBprefix = "cnwiki_";

# MySQL table options to use during installation or update
$wgDBTableOptions = "ENGINE=InnoDB, DEFAULT CHARSET=binary";

# Shared database table
# This has no effect unless $wgSharedDB is also set.
$wgSharedTables[] = "actor";


## Shared memory settings
$wgMainCacheType = 'redis';
$wgSessionCacheType = 'redis';
$wgMemCachedServers = [];

$wgObjectCaches['redis'] = [
    'class'                => 'RedisBagOStuff',
    'servers'              => [ $_ENV["RedisAddress"] ],
    'connectTimeout'    => 30,
    'persistent'        => false,
    'password'          => $_ENV["RedisPassword"],
    'automaticFailOver' => true,
];

$wgJobTypeConf['default'] = [
	'class' => 'JobQueueRedis',
	'order' => 'fifo',
	'redisServer' => $_ENV["RedisAddress"],
	'checkDelay' => true,
	'daemonized' => true
];

$wgJobQueueAggregator = [
	'class'       => 'JobQueueAggregatorRedis',
	'redisServer' => $_ENV["RedisAddress"],
];

$wgMessageCacheType = CACHE_ACCEL;

$wgUseFileCache = false; /* default: false */
$wgFileCacheDirectory = "$IP/cache";
$wgShowIPinHeader = false; 

## To enable image uploads, make sure the 'images' directory
## is writable, then set this to true:
$wgEnableUploads = true;
#$wgUseImageMagick = true;
#$wgImageMagickConvertCommand = "/usr/bin/convert";

# InstantCommons allows wiki to use images from https://commons.wikimedia.org


# Periodically send a pingback to https://www.mediawiki.org/ with basic data
# about this MediaWiki instance. The Wikimedia Foundation shares this data
# with MediaWiki developers to help guide future development efforts.
$wgPingback = true;

# Site language code, should be one of the list in ./includes/languages/data/Names.php
$wgLanguageCode = "zh-cn";

# Time zone
$wgLocaltimezone = "PRC";

## Set $wgCacheDirectory to a writable directory on the web server
## to make your wiki go slightly faster. The directory should not
## be publicly accessible from the web.
#$wgCacheDirectory = "$IP/cache";

$wgSecretKey = $_ENV["SecretKey"];

# Changing this will log out all existing sessions.
$wgAuthenticationTokenVersion = "1";

# Site upgrade key. Must be set to a string (default provided) to turn on the
# web installer while LocalSettings.php is in place
$wgUpgradeKey = $_ENV["UpgradeKey"];

## For attaching licensing metadata to pages, and displaying an
## appropriate copyright notice / icon. GNU Free Documentation
## License and Creative Commons licenses are supported so far.
$wgRightsPage = ""; # Set to the title of a wiki page that describes your license/copyright
$wgRightsUrl = "https://creativecommons.org/licenses/by-sa/4.0/";
$wgRightsText = "知识共享署名-相同方式共享";
$wgRightsIcon = "$wgResourceBasePath/resources/assets/licenses/cc-by-sa.png";

# Path to the GNU diff3 utility. Used for conflict resolution.
$wgDiff3 = "/usr/bin/diff3";

# The following permissions were set based on your choice in the installer
$wgGroupPermissions['*']['createaccount'] = true;
$wgGroupPermissions['*']['edit'] = false;

## Default skin: you can change the default skin. Use the internal symbolic
## names, e.g. 'vector' or 'monobook':
$wgDefaultSkin = "citizen";

# Enabled skins.
# The following skins were automatically enabled:
wfLoadSkin( 'Citizen' );


# Enabled extensions. Most of the extensions are enabled by adding
# wfLoadExtension( 'ExtensionName' );
# to LocalSettings.php. Check specific extension documentation for more details.
# The following extensions were automatically enabled:
wfLoadExtension( 'AbuseFilter' );
wfLoadExtension( 'AWS' );
wfLoadExtension( 'Babel' );
wfLoadExtension( 'CategoryTree' );
// wfLoadExtension( 'CirrusSearch' );
wfLoadExtension( 'Cite' );
wfLoadExtension( 'CiteThisPage' );
wfLoadExtension( 'CodeEditor' );
wfLoadExtension( 'CodeMirror' );
wfLoadExtension( 'ConfirmEdit' );
wfLoadExtension( 'DynamicPageList3' );
wfLoadExtension( 'DisplayTitle' );
// wfLoadExtension( 'Elastica' );
wfLoadExtension( 'Gadgets' );
wfLoadExtension( 'ImageMap' );
wfLoadExtension( 'InputBox' );
wfLoadExtension( 'intersection' );
wfLoadExtension( 'Interwiki' );
wfLoadExtension( 'Loops' );
wfLoadExtension( 'Math' );
wfLoadExtension( 'MultimediaViewer' );
wfLoadExtension( 'Nuke' );
wfLoadExtension( 'OATHAuth' );
wfLoadExtension( 'PageImages' );
wfLoadExtension( 'ParserFunctions' );
wfLoadExtension( 'PdfHandler' );
wfLoadExtension( 'Poem' );
wfLoadExtension( 'Purge' );
wfLoadExtension( 'Renameuser' );
wfLoadExtension( 'ReplaceText' );
wfLoadExtension( 'SandboxLink' );
wfLoadExtension( 'Scribunto' );
$wgScribuntoDefaultEngine = 'luastandalone';
wfLoadExtension( 'SecureLinkFixer' );
wfLoadExtension( 'ShortDescription' );
wfLoadExtension( 'SpamBlacklist' );
wfLoadExtension( 'SyntaxHighlight_GeSHi' );
wfLoadExtension( 'TemplateData' );
wfLoadExtension( 'TemplateSandbox' );
wfLoadExtension( 'TemplateStyles' );
wfLoadExtension( 'TemplateStylesExtender' );
wfLoadExtension( 'TextExtracts' );
wfLoadExtension( 'TitleBlacklist' );
wfLoadExtension( 'UserGroups' );
wfLoadExtension( 'VisualEditor' );
wfLoadExtension( 'WikiEditor' );
wfLoadExtension( 'WikiSeo' );
wfLoadExtension( 'Variables' );
$wgDeprecationReleaseLimit = "1.34.0";
#关闭Variables的警告
wfLoadExtension( 'TabberNeue' );
wfLoadExtension( 'SimpleBatchUpload' );
wfLoadExtension( 'NativeSvgHandler' );

# End of automatically generated settings.
# Add more configuration options below.

$wgFileExtensions[] = 'svg'; // 允许上传svg文件
$wgDefaultUserOptions['usebetatoolbar'] = 1; // user option provided by WikiEditor extension
$wgGroupPermissions['*']['edit'] = false;
unset( $wgGroupPermissions['user'] );
# End of automatically generated settings.
# Add more configuration options below.
$wgGroupPermissions['确认用户']['browsearchive'] = true;
$wgGroupPermissions['确认用户']['createpage'] = true;
$wgGroupPermissions['确认用户']['createtalk'] = true;
$wgGroupPermissions['确认用户']['delete'] = true;
$wgGroupPermissions['确认用户']['deletedhistory'] = true;
$wgGroupPermissions['确认用户']['deletedtext'] = true;
$wgGroupPermissions['确认用户']['deleterevision'] = true;
$wgGroupPermissions['确认用户']['import'] = true;
$wgGroupPermissions['确认用户']['importupload'] = true;
$wgGroupPermissions['确认用户']['managechangetags'] = true;
$wgGroupPermissions['确认用户']['mergehistory'] = true;
$wgGroupPermissions['确认用户']['minoredit'] = true;
$wgGroupPermissions['确认用户']['move'] = true;
$wgGroupPermissions['确认用户']['move-categorypages'] = true;
$wgGroupPermissions['确认用户']['move-subpages'] = true;
$wgGroupPermissions['确认用户']['movefile'] = true;
$wgGroupPermissions['确认用户']['noratelimit'] = true;
$wgGroupPermissions['确认用户']['read'] = true;
$wgGroupPermissions['确认用户']['reupload'] = true;
$wgGroupPermissions['确认用户']['rollback'] = true;
$wgGroupPermissions['确认用户']['writeapi'] = true;
$wgGroupPermissions['确认用户']['edit'] = true;
$wgGroupPermissions['确认用户']['editinterface'] = true;
$wgGroupPermissions['确认用户']['editmyoptions'] = true;
$wgGroupPermissions['确认用户']['editmyprivateinfo'] = true;
$wgGroupPermissions['确认用户']['editmywatchlist'] = true;
# 启用VisualEditor的Wikitext
$wgVisualEditorEnableWikitext = true;
# 启用编辑模式选择列表
$wgVisualEditorUseSingleEditTab = true;
# 关闭默认编辑完毕监视页面
$wgDefaultUserOptions['watchdefault'] = 0;
# 将首页设置为根目录
$wgMainPageIsDomainRoot = true;
# 启用链接展示重定向后页面标题
$wgDisplayTitleFollowRedirects = true;
#添加Railway标志
$wgFooterIcons['poweredby']['railway'] = [
	"src" => "$wgResourceBasePath/resources/assets/powered_by_railway.png",
	"url" => "http://railway.app/",
	"alt" => "Power by Railway",
];

# Interwiki settings https://www.mediawiki.org/wiki/Extension:Interwiki
$wgGroupPermissions['sysop']['interwiki'] = true;


#Debugging
$_ENV["wiki_debug_config"];

#调用英文站图片
// $wgForeignFileRepos[] = [
// 	'class' => ForeignAPIRepo::class,
// 	'name' => 'StarCitizenTools', // Must be a distinct name
// 	'apibase' => 'https://starcitizen.tools/api.php',
// 	'hashLevels' => 2,
// 	'fetchDescription' => false, // Optional
// 	'apiThumbCacheExpiry' => 86400, // 24 hours, optional, but required for local thumb caching
// ];

#AWS插件 | Cloudflare R2 储存桶配置
$wgAWSCredentials = [
	'key' => $_ENV["S3Key"],
	'secret' => $_ENV["S3Secret"],
	'token' => false
];

$wgAWSRegion = $_ENV["S3Region"]; # Northern Virginia

// Replace <something> with the name of your S3 bucket, e.g. wonderfulbali234.
$wgAWSBucketName = $_ENV["S3BucketName"];
$wgAWSBucketDomain = $_ENV["S3BucketDomain"];
$wgFileBackends['s3']['endpoint'] = $_ENV["S3Endpoint"];
$wgAWSRepoHashLevels = '2';

// If you anticipate using several hundred buckets, one per wiki, then it's probably better to use one bucket
// with the top level subdirectory as the wiki's name, and permissions properly configured of course.
// While there are no more performance losses by using such a scheme, it might make things messy. Hence, it's
// still a good idea to use one bucket per wiki unless you are approaching your 1,000 bucket per account limit.
$wgAWSBucketTopSubdirectory = ""; # leading slash is required
$wgResponsiveImages = false;
