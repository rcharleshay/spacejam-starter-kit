#!/bin/sh
set -o nounset -o errexit
cd `dirname $0`

# Pulls the latest changes from the starter kit into your cloned project

STARTER_KIT="telus-isomorphic"

git remote remove starter-kit || true
git remote add --fetch --no-tags -m master -t master starter-kit "git@github.com:telus/${STARTER_KIT}-starter-kit.git"
git log $(git rev-parse --abbrev-ref HEAD)..starter-kit/master --oneline
git merge starter-kit/master
