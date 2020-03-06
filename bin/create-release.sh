#!/usr/bin/env bash

set -e

if [ $# -lt 1 ]; then
	echo "usage: $0 <version>"
	exit 1
fi

version=$1

sed -i '' -e "s/^ \* Version: .*/ * Version: ${version}/g" index.php;
sed -i '' -e "s/^ \* @version .*/ * @version ${version}/g" index.php;

rsync -a --exclude-from=.distignore ./ ./distribution/
cd distribution
zip -r ../form-field-blocks.zip ./
cd ../
rm -rf distribution
