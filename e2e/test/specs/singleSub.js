const common = require('../common')
const config = require('../config')

module.exports = {
//'@tags': ['Test'],

'Login with Single sub selector account direct url to sub-selector page': (browser) => {

  const subSelector = browser.page.subSelector()

  browser.url(common.getUrl(browser, config.users['singleSubConsumer'], config.users['singleSubConsumer']))
  common.login(browser, 'singleSubConsumer',20000)

  if (config.env === 'staging') {
    browser.assert.urlEquals("https://www.wcstage.telus.com/overview")
    browser.url("https://www.wcstage.telus.com/session/mobility")
    browser.assert.urlEquals("https://www.wcstage.telus.com/overview")
  } else {
    browser.assert.urlEquals("https://www.telus.com/overview")
    browser.url("https://www.telus.com/session/mobility")
    browser.assert.urlEquals("https://www.telus.com/overview")
  }
  //browser.assert.urlEquals("https://www.wcstage.telus.com/overview")
  //browser.url("https://www.wcstage.telus.com/session/mobility")
  //browser.assert.urlEquals("https://www.wcstage.telus.com/overview")

},

'Login with Single sub selector account to Plans Page': (browser) => {

  const subSelector = browser.page.subSelector()

  browser.url(common.planPageUrl(browser, config.users['singleSubConsumer'], config.users['singleSubConsumer']))
  common.login(browser, 'singleSubConsumer',20000)

  if (config.env === 'staging') {
    browser.assert.urlEquals("https://www.wcstage.telus.com/my-account/mobility/plans-and-devices/plan")
    browser.url("https://www.wcstage.telus.com/session/mobility")
    browser.assert.urlEquals("https://www.wcstage.telus.com/overview")
  } else {
    browser.assert.urlEquals("https://www.telus.com/my-account/mobility/plans-and-devices/plan")
    browser.url("https://www.telus.com/session/mobility")
    browser.assert.urlEquals("https://www.telus.com/overview")
  }
  //browser.assert.urlEquals("https://www.wcstage.telus.com/my-account/mobility/plans-and-devices/plan")
  //browser.url("https://www.wcstage.telus.com/session/mobility")
  //browser.assert.urlEquals("https://www.wcstage.telus.com/overview")

},


beforeEach: (browser) => {
  browser.resizeWindow(1280, 843)
},
afterEach: (browser, done) => {
  if (browser.globals.isSauceLabs) {
    browser.customSauceEnd(done)
  } else {
    browser.end(done)
  }
}

}