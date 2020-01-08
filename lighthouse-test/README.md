# Lighthouse Test

Runs Lighthouse tests on the app with [Telus Lighthouse](https://github.com/telus/telus-lighthouse).

This test is run as part of the build pipeline, to test staging, before the build goes to production.

## Local development in Node

We recommend that developers build and test using the [Docker](https://github.com/telus/my-telus-spacejam/blob/master/DOCKER.md) environment. This ensures that your environment is set up the same as other developers and production environments. "Works for me" should mean "works for everyone". Developing with local Node is possible, but your environment may differ from other people.

If you want to develop locally, to enable advanced features such as Node debugging, or to view the test live in your browser, you can install Node manually, and work with the project as a standard JS app. At this time we recommend installing Node v8, to match the Docker container. Node can be installed with `brew` on OSX and `apt-get` on Linux.

To test locally you'll have to
1. Update the `appName`, `baseUrl` and `pages` in the *telus.yaml* file to your desired environment and match the _ui/telus.yaml_ `pages`.
2. Run:
   ```
   npm install
   npm start
   ```

This will test against your base url, using Node directly on your OS.
