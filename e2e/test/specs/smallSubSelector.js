const common = require('../common')
const config = require('../config')

module.exports = {
//'@tags': ['Test'],

'Login with Small sub selector account direct url to sub-selector page': (browser) => {

  const subSelector = browser.page.subSelector()

  browser.url(common.getUrl(browser, config.users['smallSubBusiness'], config.users['smallSubBusiness']))
  common.login(browser, 'smallSubBusiness',20000)

  subSelector
  .validateSmallSubSelectorPageWithoutCurrentSelection()
  .click('@listSelectSubscriber')

    if (config.env === 'staging') {
      browser.assert.urlEquals("https://www.wcstage.telus.com/overview")
      browser.url("https://www.wcstage.telus.com/session/phone-number")

    } else {
      browser.assert.urlEquals("https://www.telus.com/overview")
      browser.url("https://www.telus.com/session/phone-number")
    }

  //browser.assert.urlEquals("https://www.wcstage.telus.com/overview")
  //browser.url("https://www.wcstage.telus.com/session/phone-number")
  subSelector
  .validateSmallSubSelectorPageWithCurrentSelection()
},

'Login with Small sub selector account to Plans Page': (browser) => {

  const subSelector = browser.page.subSelector()

  browser.url(common.planPageUrl(browser, config.users['smallSubBusiness'], config.users['smallSubBusiness']))
  common.login(browser, 'smallSubBusiness',20000)


    if (config.env === 'staging') {
      subSelector
      .validateSmallSubSelectorPageWithoutCurrentSelection()
      .click('@listSelectSubscriber')
      browser.assert.urlEquals("https://www.wcstage.telus.com/my-account/mobility/plans-and-devices/plan")
      browser.url("https://www.wcstage.telus.com/session/phone-number")
      subSelector
      .validateSmallSubSelectorPageWithCurrentSelection()
    } else {
      browser.assert.urlEquals("https://www.telus.com/session/phone-number?rd=https%3A%2F%2Fwww.telus.com%2Fmy-account%2Fmobility%2Fplans-and-devices%2Fplan")
      browser.url("https://www.telus.com/session/phone-number")
    }

  //browser.assert.urlEquals("https://www.wcstage.telus.com/my-account/mobility/plans-and-devices/plan")
  //browser.url("https://www.wcstage.telus.com/session/phone-number")
},

'Login with Consumer Small sub selector account direct url to sub-selector page': (browser) => {

  const subSelector = browser.page.subSelector()

  browser.url(common.getUrl(browser, config.users['smallSubConsumer'], config.users['smallSubConsumer']))
  common.login(browser, 'smallSubConsumer',20000)

  subSelector
    .validateSmallSubSelectorPageWithoutCurrentSelection()
    .click('@listSelectSubscriber')
    if (config.env === 'staging') {
      browser.assert.urlEquals("https://www.wcstage.telus.com/overview")
      browser.url("https://www.wcstage.telus.com/session/phone-number")
    } else {
      browser.assert.urlEquals("https://www.telus.com/overview")
      browser.url("https://www.telus.com/session/phone-number")
    }

  //browser.assert.urlEquals("https://www.wcstage.telus.com/overview")
  //browser.url("https://www.wcstage.telus.com/session/phone-number")

  subSelector
  .validateSmallSubSelectorPageWithCurrentSelection()
},

'Login with Consumer Small sub selector account to Plans Page': (browser) => {

  const subSelector = browser.page.subSelector()

  browser.url(common.planPageUrl(browser, config.users['smallSubConsumer'], config.users['smallSubConsumer']))
  common.login(browser, 'smallSubConsumer',20000)


  if (config.env === 'staging') {
    subSelector
    .validateSmallSubSelectorPageWithoutCurrentSelection()
    .click('@listSelectSubscriber')
    browser.pause(5000)

    browser.assert.urlEquals("https://www.wcstage.telus.com/my-account/mobility/plans-and-devices/plan")
    browser.url("https://www.wcstage.telus.com/session/phone-number")
    subSelector
    .validateSmallSubSelectorPageWithCurrentSelection()
  } else {
    browser.assert.urlEquals("https://www.telus.com/session/phone-number?rd=https%3A%2F%2Fwww.telus.com%2Fmy-account%2Fmobility%2Fplans-and-devices%2Fplan")
    browser.url("https://www.telus.com/session/phone-number")
  }
  //browser.assert.urlEquals("https://www.wcstage.telus.com/my-account/mobility/plans-and-devices/plan")
  //browser.url("https://www.wcstage.telus.com/session/phone-number")
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