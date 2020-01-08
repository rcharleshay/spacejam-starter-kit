#!/bin/sh
set -o nounset -o errexit

# Run lighthouse test container against a deployed OpenShift environment. Used by the lighthouse testing stage of the Jenkinsfile.
# Usage: ./run-lighthouse-test.sh staging latest

ENVIRONMENT=${1:-staging}
VERSION=${2:-latest}
IMAGESTREAM=`oc get imagestream my-telus-session-lighthouse -o='jsonpath={.status.dockerImageRepository}'`
BASE_URL="https://`oc get route my-telus-session-${ENVIRONMENT} -o='jsonpath={.spec.host}'`"

oc run my-telus-session-lighthouse-${ENVIRONMENT}-${VERSION} \
  --image=${IMAGESTREAM}:${VERSION} \
  --rm=true \
  --attach=true \
  --restart=Never \
  --overrides='
  { "apiVersion":"v1",
    "spec":{
      "containers":[{
        "name": "my-telus-session-lighthouse-'${ENVIRONMENT}'-'${VERSION}'",
        "image": "'${IMAGESTREAM}':'${VERSION}'",
        "env":[{
          "name":"BASE_URL",
          "value":"'${BASE_URL}'"
        }]
      }]
    }
  }'
