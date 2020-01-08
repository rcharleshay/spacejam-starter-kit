describe('backendClient', () => {
  beforeEach(() => {
    jest.resetModules()
  })
  it('returns baseUrl and loads config from window', () => {
    process.env.BROWSER = true
    const config = {
      client: {
        protocol: 'http',
        host: 'local.telus.com',
        port: 4000,
        basename: ''
      },
      authorizationProxy: {
        headerNames: {
          session: ''
        },
        cookieNames: {
          oauth: ''
        }
      }
    }
    global.window.__APP_CONFIG__ = config
    const { getBaseUrl } = require('../backendClient')
    expect(getBaseUrl()).toMatch(/https?:\/\/.+/)
  })

  it('returns baseUrl and loads config from sever', () => {
    process.env.BROWSER = false
    const { getBaseUrl } = require('../backendClient')
    expect(getBaseUrl()).toMatch(/https?:\/\/.+/)
  })

  it('returns a request to postCustomers', () => {
    const { postCustomers } = require('../backendClient')
    expect(postCustomers()).toBeInstanceOf(Promise)
  })

  it('returns a request to getProduct', () => {
    const { getProduct } = require('../backendClient')
    expect(getProduct()).toBeInstanceOf(Promise)
  })

  it('returns a request to postSubscriberInSession', () => {
    const { postSubscriberInSession } = require('../backendClient')
    expect(postSubscriberInSession()).toBeInstanceOf(Promise)
  })

  it('returns a request to postAccountInSession', () => {
    const { postAccountInSession } = require('../backendClient')
    expect(postAccountInSession()).toBeInstanceOf(Promise)
  })

})
