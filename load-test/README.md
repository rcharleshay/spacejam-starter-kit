# load-test

Load tests your app with [Artillery](https://artillery.io/)

This test is run as part of the build pipeline, to test staging, before the build goes to production.

## Local development in Node

### 1. Using Docker

We recommend that developers build and test using the [Docker](https://github.com/telus/my-telus-spacejam/blob/master/DOCKER.md) environment. This ensures that your environment is set up the same as other developers and production environments. "Works for me" should mean "works for everyone". Developing with local Node is possible, but your environment may differ from other people.

To run a load test locally with Docker, you can run (from the root directory):
```
docker-compose run load
```

### 2. Using Host OS Node

If you want to develop locally, to enable advanced features such as Node debugging, or to view the test live in your browser, you can install Node manually, and work with the project as a standard JS app. At this time we recommend installing Node v8, to match the Docker container. Node can be installed with `brew` on OSX and `apt-get` on Linux.

To test locally you'll have to run:
```
npm install
BASE_URL=http://local.telus.com:3000 npm start
```

This will test the React UI against `https://local.telus.com:3000`, using Node directly on your OS.
