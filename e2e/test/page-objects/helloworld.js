const baseUrl = process.env.BASE_URL || 'http://local.telus.com:3000'

module.exports = {
  url: `${baseUrl}/en/on/hello-world`,
  elements: {
    root: {
      selector: '#app'
    },
    title: {
      selector: 'h1'
    },
    checkBackendVersionLink: {
      selector: 'a[href="/en/on/hello-world/backend-version"]'
    }
  },
  commands: [
    {
      clickCheckBackendVersionLink (timeout) {
        return this.waitForElementVisible('@checkBackendVersionLink', timeout)
          .click('@checkBackendVersionLink')
      }
    }
  ]
}
