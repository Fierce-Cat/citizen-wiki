# 星际公民中文百科

这里是星际公民中文百科的项目地址，基于 Mediawiki 运行。

生产环境（main 分支）地址：https://citizenwiki.cn/

# 部署

该项目部署在 [Railway.app](https://railway.app/) 上，以下是 nixpacks 未交付前临时使用的 Build & Start 命令。

Build: 
````
cd /app/extensions/TemplateStyles &&  composer update --no-dev &&  cd /app/extensions/AWS &&  composer update --no-dev
````
Start:
````
sudo chmod -R 755 /app/extensions && perl /assets/prestart.pl /app/nginx.template.conf /nginx.conf && (php-fpm -y /assets/php-fpm.conf & nginx -c /nginx.conf)
````

## 服务变量
所有服务变量都需要在项目部署前于 Railway / 本地 .env 文件填写（php_debug_config & wiki_debug_config 定义后可留空）。**删除所有 # 注释。**
````
DbName=example 
#Database name

DbPassword=example
#Database password

DbServer=address:port
#Database address with port

DbType=mysql
#Database type

DbUser=root
#Database username

SecretKey=example
#Mediawiki generated secret Key

Server=https://${{RAILWAY_STATIC_URL}}
#Site public address

SiteName=星际公民中文百科
#Site name

UpgradeKey=example
#Mediawiki generated upgrade Key

S3Key=example
#AWS Plugin S3 bucket key

S3Secret=example
#AWS Plugin S3 bucket secret

S3Region=auto
#AWS Plugin S3 bucket region

S3BucketName=citizen-wiki-data
#AWS Plugin S3 bucket name

S3BucketDomain=https://files.citizenwiki.cn
#AWS Plugin S3 bucket domain

S3Endpoint=https://faa2b62743f9b25377c56a98ec6da7e0.r2.cloudflarestorage.com
#AWS Plugin S3 bucket endpoint

php_debug_config= #自定义
wiki_debug_config= #自定义
````