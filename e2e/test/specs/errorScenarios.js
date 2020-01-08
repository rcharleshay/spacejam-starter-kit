const common = require('../common')
const config = require('../config')

module.exports = {
//'@tags': ['Test'],

'Validate Error scenarios for Large sub selector account': (browser) => {

  const subSelector = browser.page.subSelector()

  browser.url(common.getUrl(browser, config.users['largeSubAccount'], config.users['largeSubAccount']))
  common.login(browser, 'largeSubAccount',20000)
      
  subSelector
    .waitForElementPresent('@findSubsearchBox', 10000)
    .click('@findSubsearchBox')
    .setValue('@findSubsearchBox',"000")
    .assert.elementPresent('@searchIconEnabled') 
    .click('@searchIconEnabled')
    .validateErrorBannerInvalidNumber()
    .validateClearSearch()
    .click('@ButtonClearSearch')
  subSelector
    .click('@findSubsearchBox')
    .setValue('@findSubsearchBox',"6781110001")
    .assert.elementPresent('@searchIconEnabled') 
    .click('@searchIconEnabled')
    .validateErrorBannerSubNotFound() 
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