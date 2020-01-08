const config = require('./config')

const common = {
  login(browser, username) {
    browser
      .waitForElementVisible('input#idtoken1', 20000)
      .setValue('input#idtoken1', config.users[username].username)
      .setValue(
        'input#idtoken2',
        config.users[username].password || config.password
      )
      .click('.large-view button[data-id=login]')
  },
  getUrl(browser, encryptedBan, encryptedSub) {
    browser.url(`${config.baseUrl}`)
  },
  subSelectorPageUrl(browser) {
    browser.url(`${config.subSelectorPageUrl}`)
  },

  logout(browser) {
    if (config.env === 'local' || 'test') {
      let logoutLink = ''
      browser.waitForElementPresent('a[data-test=logoutLink]', 40000)
      browser
        .getAttribute('a[data-test=logoutLink]', 'href', (result) => {
          logoutLink = result.value
        })
        .perform((client, done) => {
          client.url(logoutLink.replace('www', 'digital:notwebchannel@www'))
          done()
        })
    }
  },

  async asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index += 1) {
      await callback(array[index], index, array) // eslint-disable-line no-await-in-loop
    }
  }
}

module.exports = common
