const baseUrl = process.env.BASE_URL || 'http://local.telus.com:3000'

module.exports = {
  url: `${baseUrl}/en/on/hello-world/backend-version`,
  elements: {
    title: {
      selector: 'h1'
    },
    gotoHelloWorldLink: {
      selector: 'a[href="/my-telus/spacejam"]'
    }
  },
  commands: [
    {
      clickGotoHelloWorldLink (timeout) {
        return this.waitForElementVisible('@gotoHelloWorldLink', timeout)
          .click('@gotoHelloWorldLink')
      }
    }
  ]
}
