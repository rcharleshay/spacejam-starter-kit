#!/bin/sh
set -o errexit

BASE_URL=${1}

SAUCELABS_ACCESS_KEY=$(shippy get secret saucelabs --common --field=token) \
SAUCELABS_USERNAME=$(shippy get secret saucelabs --common --field=user) \
npm run e2e:sl
