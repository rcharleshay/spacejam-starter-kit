# End-to-End

End to end browser functional test, using [Nightwatch](http://nightwatchjs.org/)

This test is run as part of the build pipeline, to smoke test each environment after it is deployed.

Included assertions:
- [Functional][Functional]
- [Accessibility][Accessibility]
- [Analytics][Analytics]
- [Visual Regression][Visual Regression]

## Local development in Node

We recommend that developers build and test using the [Docker](https://github.com/telus/reference-architecture/blob/master/delivery/docker.md) environment. This ensures that your environment is set up the same as other developers and production environments. "Works for me" should mean "works for everyone". Developing with local Node is possible, but your environment may differ from other people.

If you want to develop locally, to enable advanced features such as Node debugging, or to view the test live in your browser, you can install Node manually, and work with the project as a standard JS app. At this time we recommend installing Node v8, to match the Docker container. Node can be installed with `brew` on OSX and `apt-get` on Linux.

To test locally you'll have to run:

```
npm install
npm test
```

This will test the React app against `https://local.telus.com:3000`, using Node and Chrome directly on your OS.

[Functional]: https://github.com/telus/reference-architecture/blob/master/testing/functional/e2e.md
[Accessibility]: https://github.com/telus/reference-architecture/blob/master/testing/nonfunctional/accessibility.md
[Analytics]: https://github.com/telus/reference-architecture/blob/master/testing/nonfunctional/analytics.md
[Visual Regression]: https://github.com/telus/reference-architecture/blob/master/testing/functional/visual-regression.md

# Running E2E test with Docker

## Commands to run from your local
### Default commands
Build the E2E

```
docker-compose build e2e
```

Run the defaulted E2E test

```
docker-compose run e2e
```

Kill the docker component

```
docker-compose down
```

You can make a combination of commands in a same line using the separator &&. It will run each command sequentially, e.g.

```
docker-compose build e2e && docker-compose run e2e && docker-compose down
```

*Note*: if a first command is failing, the next commands will not be executed.

### Custom commands
Full syntax

```
docker-compose run -e APP_ENV={development/staging/production} e2e run {script} -- --tag {tag}
```

 Where

* `script` is defined in package.json, e.g.

```
"e2e:headless": "nightwatch -c ./nightwatch.conf.js --env headless"
```

* `tag` is defined in test.js, e.g.

```
'@tags': ['ci', 'sl:ci']
```

## Commands to run from SauceLabs
### Import SauceLabs credentials
Either run the following commands in your console or add into your .bash_profile

```
export SAUCELABS_ACCESS_KEY=$(shippy get secret saucelabs --field=token) \
export SAUCELABS_USERNAME=$(shippy get secret saucelabs --field=user) \
```

### Default command
* Full syntax

```
docker-compose run -e APP_ENV={development/staging/production} e2e run {script} -- -e {browser} --tag {tag}
```

Where

* `browser` is defined in nightwatch.saucelabs.conf.js, e.g.

```
 ie11: {
   desiredCapabilities: {
   browserName: 'internet explorer',
   version: '11.103',
   platform: 'windows 10',
   avoidProxy: true
   }
 },
 ```
