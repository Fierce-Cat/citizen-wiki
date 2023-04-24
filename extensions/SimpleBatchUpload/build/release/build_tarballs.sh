#! /bin/bash

# Utility adapted from the tool for creating SMW tarballs
# By Jeroen De Dauw < jeroendedauw@gmail.com >
#
# This script is not currently used. It is kept in case Composer-managed
# dependencies are added again.
#
# @copyright (C) 2016-2019, Stephan Gambke
# @license   GNU General Public License, version 2 (or any later version)
#
# This software is free software; you can redistribute it and/or
# modify it under the terms of the GNU General Public License
# as published by the Free Software Foundation; either version 2
# of the License, or (at your option) any later version.
# This software is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
# You should have received a copy of the GNU General Public License
# along with this program; if not, see <http://www.gnu.org/licenses/>.

# Parameters:
# $1: version used for cloning and in the tarball name

VERSION="$1"
if [ "$VERSION" == "" ]; then
	VERSION="master"
fi

NAME="SimpleBatchUpload.$VERSION.with.dependencies"
DIR="SimpleBatchUpload"

BUILD_DIR="build-$VERSION"

rm -rf "$BUILD_DIR"
mkdir "$BUILD_DIR"
cd "$BUILD_DIR"

# composer create-project mediawiki/simple-batch-upload $DIR $COMPOSER_VERSION --stability dev --prefer-dist --no-dev --ignore-platform-reqs --no-install
git clone https://github.com/ProfessionalWiki/SimpleBatchUpload.git "$DIR"
git checkout "$VERSION"

cd $DIR
mv composer.json composer.json.orig
sed s/\"mediawiki\\/mediawiki\":\ \"\>=1...\",//g composer.json.orig > composer.json
composer install --prefer-dist --no-dev --ignore-platform-reqs --optimize-autoloader
mv composer.json.orig composer.json
rm -rf .git
cd -

zip -qro9 "$NAME.zip" $DIR
tar -czf "$NAME.tar.gz" $DIR

cd ..
set -x
ls -lap "$BUILD_DIR"
