#!/bin/sh
set -o nounset -o errexit

# Run load test container against a deployed OpenShift environment. Used by the Load testing stage of the Jenkinsfile.
# Usage: ./run-load-test.sh staging latest

ENVIRONMENT=${1:-staging}
VERSION=${2:-latest}
IMAGESTREAM=`oc get imagestream my-telus-spacejam-load -o='jsonpath={.status.dockerImageRepository}'`

oc run my-telus-spacejam-load-${ENVIRONMENT}-${VERSION} \
  --image=${IMAGESTREAM}:${VERSION} \
  --rm=true \
  --attach=true \
  --restart=Never \
  --overrides='
  { "apiVersion":"v1",
    "spec":{
      "containers":[{
        "name": "my-telus-spacejam-load-'${ENVIRONMENT}'-'${VERSION}'",
        "image": "'${IMAGESTREAM}':'${VERSION}'",
        "env":[{
          "name":"APP_ENV",
          "value":"'${ENVIRONMENT}'"
        }]
      }]
    }
  }'
