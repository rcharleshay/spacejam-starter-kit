#!/bin/sh
set -o nounset -o errexit
cd `dirname $0`

# Installs the build pipeline for a given branch (default: master) in your currently selected OpenShift project
# See: README.md

BRANCH=${1:-master}

# Synchronize OpenShift project with shippy
oc project $(shippy status --project)

# Copy secrets into the OpenShift project
shippy get secret github --common --field=ssh-key > id_rsa \
  && oc create secret generic github-secret --from-file=ssh-privatekey=id_rsa --dry-run -o yaml | oc apply -f - \
  && rm id_rsa
oc create secret generic newrelic-license-secret --from-literal=newrelic-license=$(shippy get secret newrelic --common --field=license-key) --dry-run -o yaml | oc apply -f -
oc create secret generic npmrc-secret --from-literal=.npmrc=$(shippy get secret npm --common --field=npmrc) --dry-run -o yaml | oc apply -f -
oc create secret generic sonarqube-token-secret --from-literal=sonar.login=$(shippy get secret sonarqube --common --field=sonar_token) --dry-run -o yaml | oc apply -f -

oc create secret generic "e2e-password-secret" \
  --from-literal="preview=$(shippy get secret e2e-password-secret --field preview)" \
  --from-literal="test=$(shippy get secret e2e-password-secret --field test)" \
  --from-literal="staging=$(shippy get secret e2e-password-secret --field staging)" \
  --from-literal="production=$(shippy get secret e2e-password-secret --field production)" \
  --dry-run -o yaml | oc apply -f -

# Apply and execute the OpenShift template
oc apply -f openshift-template.yml
oc process my-telus-session-pipeline BRANCH=${BRANCH} | oc apply -f -
oc start-build my-telus-session-pipeline
