/* eslint-disable no-console */
const path = require('path')
const chromedriver = require('chromedriver')

const SCREENSHOT_PATH = './test/failure-screenshots/'

const getFileName = (testName) => {
  return path.resolve(`${SCREENSHOT_PATH}${testName.replace(/ /g, '_')}.png`)
}

module.exports = {
  before (done) {
    chromedriver.start()
    done()
  },

  after (done) {
    chromedriver.stop()
    done()
  },

  afterEach: (client, done) => {
    const weHaveFailures = client.currentTest.results.errors > 0
      || client.currentTest.results.failed > 0
    if (weHaveFailures) {
      if (!client.sessionId) {
        done()
        return
      }

      const testName = client.currentTest.module
      const time = client.currentTest.results.time // eslint-disable-line prefer-destructuring
      const fileName = getFileName(`${testName}${time}`)
      client.saveScreenshot(fileName, (result) => {
        if (!result || result.status !== 0) {
        }
      })
    }
    client.end(done)
  }
}
