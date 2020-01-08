#!/bin/sh
set -o nounset -o errexit

# Run E2E container against a deployed OpenShift environment. Used by the E2E stage of the Jenkinsfile.
# Usage: ./run-e2e.sh staging latest

ENVIRONMENT=${1:-staging}
VERSION=${2:-latest}
IMAGESTREAM=`oc get imagestream my-telus-session-e2e -o='jsonpath={.status.dockerImageRepository}'`
BASE_URL="https://`oc get route my-telus-session-${ENVIRONMENT} -o='jsonpath={.spec.host}'`"

oc run my-telus-session-e2e-${ENVIRONMENT}-${VERSION} \
  --image=${IMAGESTREAM}:${VERSION} \
  --rm=true \
  --attach=true \
  --restart=Never \
  --overrides='
  { "apiVersion":"v1",
    "spec":{
      "containers":[{
        "name": "my-telus-session-e2e-'${ENVIRONMENT}'-'${VERSION}'",
        "image": "'${IMAGESTREAM}':'${VERSION}'",
        "env":[{
          "name":"BASE_URL",
          "value":"'${BASE_URL}'"
        },{
          "name":"E2E_RETRIES",
          "value":"2"
        },{
          "name":"ENVIRONMENT",
          "value":"'${ENVIRONMENT}'"
        },{
          "name": "E2E_PASSWORD",
          "valueFrom": {
            "secretKeyRef": {
              "name": "e2e-password-secret",
              "key": "'${ENVIRONMENT}'"
            }
          }
        }]
      }]
    }
  }'
