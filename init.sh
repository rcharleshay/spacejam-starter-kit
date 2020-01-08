#!/bin/sh
set -o nounset -o errexit
cd `dirname $0`

# Download and initialize shippy
if ! which shippy > /dev/null 2>&1
then
  npm i -g @telus/shippy-cli
fi
shippy init
shippy login --silent

mkdir -p app/contrast

# Copy shared .npmrc read token for pulling TelusDigital NPM libraries.
if test -e ./.npmrc
then
  exit 0
fi
shippy get secret npmrc-dev --common --field=npmrc > app/.npmrc
shippy get secret npmrc-dev --common --field=npmrc > e2e/.npmrc
shippy get secret npmrc-dev --common --field=npmrc > lighthouse-test/.npmrc
shippy get secret contrast --common --field=dev-assess > app/contrast/contrast.yaml

# Install our standard development tools. For more details see:
# https://github.com/telus/build-essential#build-essential
npm install --global @telus/build-essential

# Install our standard development tools. For more details see:
# https://github.com/telus/build-essential#build-essential
npm install --global @telus/build-essential

# Install packages
npm install

echo '### Install app dependencies'
cd app
npm install
npm install --no-save @telus/node_contrast

echo '### Install e2e dependencies'
cd ../e2e
npm install

echo '### Install load test dependencies'
cd ../load-test
npm install

echo '### Install lighthouse test dependencies'
cd ../lighthouse-test
npm install
