const common = require('../common')
const config = require('../config')

module.exports = {
//'@tags': ['Test'],

'Login with Large sub selector account direct url to sub-selector page': (browser) => {

  const subSelector = browser.page.subSelector()

  browser.url(common.getUrl(browser, config.users['largeSubAccount'], config.users['largeSubAccount']))
  common.login(browser, 'largeSubAccount',20000)

  subSelector
    .validateLargeSubSelectorPageWithoutCurrentSelection()
    .click('@findSubsearchBox')
    .setValue('@findSubsearchBox',"000")
    .assert.elementPresent('@searchIconEnabled')
    .click('@searchIconEnabled')
    .validateErrorBannerInvalidNumber()
    .validateClearSearch()
    .click('@ButtonClearSearch')
  subSelector
    .click('@findSubsearchBox')
    .setValue('@findSubsearchBox',"6048160324")
    .click('@searchIconEnabled')
    browser.pause(10000)
  subSelector
    .validateSearchCardPresent()
  subSelector
    .click('@ButtonClearSearch')
    .validateSearchCardNotPresent()

  subSelector
    .click('@findSubsearchBox')
    .setValue('@findSubsearchBox',"6048160324")
    .click('@searchIconEnabled')
  browser.pause(10000)
  subSelector
    .click('@searchResultCard')
  browser.pause(5000)

  if (config.env === 'staging') {
    browser.assert.urlEquals("https://www.wcstage.telus.com/overview")
    browser.url("https://www.wcstage.telus.com/session/mobility")
  } else {
    browser.assert.urlEquals("https://www.telus.com/overview")
    browser.url("https://www.telus.com/session/mobility")
  }
  //browser.assert.urlEquals("https://www.wcstage.telus.com/overview")
  //browser.url("https://www.wcstage.telus.com/session/mobility")
  subSelector
  .validateLargeSubSelectorPageWithCurrentSelection()
},

'Login with Large sub selector account to Plans Page': (browser) => {

  const subSelector = browser.page.subSelector()

  browser.url(common.planPageUrl(browser, config.users['largeSubAccount'], config.users['largeSubAccount']))
  common.login(browser, 'largeSubAccount',20000)


  if (config.env === 'staging') {
    subSelector
    .validateLargeSubSelectorPageWithoutCurrentSelection()
    .click('@findSubsearchBox')
    .setValue('@findSubsearchBox',"000")
    .assert.elementPresent('@searchIconEnabled')
    .click('@searchIconEnabled')
    .validateErrorBannerInvalidNumber()
    .validateClearSearch()
    .click('@ButtonClearSearch')
  subSelector
    .click('@findSubsearchBox')
    .setValue('@findSubsearchBox',"6048160324")
    .click('@searchIconEnabled')
    .validateSearchCardPresent()
  subSelector
    .click('@ButtonClearSearch')
    .validateSearchCardNotPresent()

  subSelector
    .click('@findSubsearchBox')
    .setValue('@findSubsearchBox',"6048160324")
    .click('@searchIconEnabled')
  browser.pause(10000)
  subSelector
    .click('@searchResultCard')
  browser.pause(5000)

    browser.assert.urlEquals("https://www.wcstage.telus.com/my-account/mobility/plans-and-devices/plan")
    browser.url("https://www.wcstage.telus.com/session/mobility")

  //subSelector
  //.validateLargeSubSelectorPageWithCurrentSelection()
  } else {
    browser.assert.urlEquals("https://www.telus.com/session/mobility?rd=https%3A%2F%2Fwww.telus.com%2Fmy-account%2Fmobility%2Fplans-and-devices%2Fplan")
    browser.url("https://www.telus.com/session/mobility")
  }
  //browser.assert.urlEquals("https://www.wcstage.telus.com/my-account/mobility/plans-and-devices/plan")
  //browser.url("https://www.wcstage.telus.com/session/mobility")

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