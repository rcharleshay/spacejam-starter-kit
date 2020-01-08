# my-telus-session

TELUS account selecor page enables customer to select their account and service as desired.

Once a selection is made, this page will call session API to temporary store the selected account information,
and users will be redirected back to the page they come from.

## Access

New developers will need to go through [delivery onboarding][delivery-wiki].

Once onboarded, you can clone this repository locally, and run the initialization script:

```bash
git clone git@github.com:telus/my-telus-session.git
cd my-telus-session
./init.sh
```


## Run

Locally, this application is exposed on:
mobility: http://local.telus.com:3000/my-telus-session/mobility
wireline: http://local.telus.com:3000/my-telus-session/business-wireline
solutions: http://local.telus.com:3000/my-telus-session/home-solutions

Node.js development environment with hot reloading (see [package.json][package.json]):

```bash
cd app
npm run development
```

Docker production environment (see [docker-compose.yml][docker-compose]):

```bash
docker-compose build
docker-compose up app
```

## Test

For the most accurate test results, we recommend testing the production container.

Linting and unit tests:

```bash
docker-compose run app test
```

End to End functional testing:

```bash
docker-compose run e2e
```

Lighthouse compliance testing:

```bash
docker-compose run lighthouse
```

Load testing:

```bash
docker-compose run load
```

## Deploy

This application can be deployed to OpenShift, using the [shippy][shippy] CLI.

Select your environment:

```bash
shippy environment
```

Select an existing project:

```bash
shippy project project-name
```

Or create a new one:

```bash
shippy create project project-name
```

To create a pipeline for this app in the selected project & environment:

```bash
shippy create pipeline my-telus-session
```

This pipeline will be automatically executed in OpenShift. You should see your repository deployed within a few minutes.

To modify your build pipeline, edit the [Jenkinsfile][jenkinsfile].

Finally, to set up a GitHub webhook so that all commits will trigger the pipeline:

```bash
shippy create webhook my-telus-session
```

_Advanced_: power users can perform [manual OpenShift installation][openshift].

## Session Middleware Implementation

Step 1: Install my-telus-client-utils into your app

```
npm i --save @telus/my-telus-client-utils
```

Step 2: Import session middleware into registerServerSideMiddleware.js

```
import sessionMiddleware from '@telus/my-telus-client-utils/lib/sessionMiddleware'
```

Step 3: Use session middleware in app and handle logic using callback.

The callback receives 6 arguments:
**err**: If the session api call fails, err will return an object with message field describing error.
**req**: The Express request object.
**res**: The Express response object.
**next**: The Express middleware next function.
**session**: The object returned from the session api.
**base**: The base url. (Used to redirect the user to the account selector based on environment.)

Example Implementation:

```
  app.use(sessionMiddleware(({ err, req, res, next, session, base }) => {
   // Handle errors
    if(err) return logger.error(err.message)

    // Using Ramda, we get the subscriber from session (Mobility)
    if(pathOr(false, ['mobility', 'subscriber'])(session)) {
      store.dispatch({type: 'SET_SESSION', value: session })
      return next()
    }

    // If no subscriber is found, we redirect to the my-telus-session.
    return res.redirect(`${base}/mobility`)
  }))
```

## Clone

To clone your own GitHub repository from the starter kits:

```bash
shippy create repo my-repo-name
```

We recommend periodically pulling starter kit updates, to get the latest and greatest configuration:

```bash
./pull-starter-kit.sh
```

## Release

This repository is configured for automated version management and release tags creation, using [semantic-release][semantic-release] and [Github Actions][gh-actions] (see [workflow][iso-sk-main-workflow]]).
There are two scripts available in the root-level package, both requiring a **write-access** Github token available as an environment variable(either `GITHUB_TOKEN` or `GH_TOKEN`):

- `npm run release:dryrun`: configured inside our Github Action to run on all branches every time a commit is pushed; dry-run mode means `semantic-release` is simulating and outputing what kind of tag, release & release notes it would create based on the commit messages without actually doing it. This can be run locally to preview what would happen, but please make sure you have your token set up as an env variable.
- `npm run release`: configured inside our Github Action to run on `master` only; please refrain from running this locally.

[reference-architecture]: https://github.com/telus/reference-architecture/
[isomorphic]: https://github.com/telus/reference-architecture/blob/master/development/isomorphic.md
[react]: https://github.com/telus/reference-architecture/blob/master/development/react.md
[redux]: https://github.com/telus/reference-architecture/blob/master/development/redux.md
[tds]: http://tds.telus.com/
[authorization-proxy]: https://github.com/telus/authorization-proxy
[shippy]: https://www.npmjs.com/package/@telus/shippy-cli
[delivery-wiki]: https://github.com/telus/delivery
[openshift]: ./openshift/README.md
[package.json]: ./package.json
[docker-compose]: ./docker-compose.yml
[jenkinsfile]: ./Jenkinsfile
[semantic-release]: https://github.com/telus/guides/blob/master/semantic-release.md
[iso-sk-main-workflow]: https://github.com/telus/telus-isomorphic-starter-kit/edit/master/.github/main.workflow
[gh-actions]: https://github.com/features/actions
