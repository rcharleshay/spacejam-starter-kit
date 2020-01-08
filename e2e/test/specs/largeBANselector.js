const common = require('../common')
const config = require('../config')

module.exports = {
'@tags': ['Test'],

'Navigate to Large BAN selector page': (browser) => {

  const accountSelector = browser.page.accountSelector()

  browser.url(common.getUrl(browser, config.users['largeSubAccount'], config.users['largeSubAccount']))
  common.login(browser, 'largeSubAccount',20000)

  accountSelector
    .validateLargeBanSelector()
  accountSelector
    .click('@inputSearchBox')
    .setValue('@inputSearchBox',"000")
    .assert.elementPresent('@searchButtonEnabled')
    .click('@searchButtonEnabled')
    .click('@searchAgainLink')
    .setValue('@inputSearchBox',"25925528")
  accountSelector
    .click('@searchButtonEnabled')
  accountSelector
    .assert.elementPresent('@accountFound')
    .click('@cardSelectorContainer')
},

'Navigate to Large SUB selector page': (browser) => {

  const accountSelector = browser.page.accountSelector()

  browser.url(common.subSelectorPageUrl(browser, config.users['largeSubAccount'], config.users['largeSubAccount']))
  common.login(browser, 'largeSubAccount',20000)
  browser.pause(3000)

  accountSelector
    .click('@cardSelectorContainer')
  accountSelector
    .validateLargeSubSelector()
  accountSelector
    .click('@inputSearchBox')
    .setValue('@inputSearchBox',"000")
    .assert.elementPresent('@searchButtonEnabled')
    .click('@searchButtonEnabled')
    .click('@searchAgainLink')
    .setValue('@inputSearchBox',"9056219827")
  accountSelector
    .click('@searchButtonEnabled')
  accountSelector
    .assert.elementPresent('@subFound')
    .click('@cardSelectorContainer')
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