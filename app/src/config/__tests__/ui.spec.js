describe('UI Config', () => {
  beforeEach(() => {
    jest.resetModules()
  })

  it('loads development config by default', () => {
    delete process.env.APP_ENV
    const config = require('../ui').default
    const development = require('../development').default

    expect(config).toEqual(development.ui)
  })


  it('loads development config', () => {
    const env = 'development'
    process.env.APP_ENV = env
    const config = require('../ui').default
    const development = require('../development').default.ui
    expect(config).toEqual(development)
  })

  it('loads staging config', () => {
    const env = 'staging'
    process.env.APP_ENV = env
    const config = require('../ui').default
    const staging = require('../staging').default.ui
    expect(config).toEqual(staging)
  })

  it('loads production config', () => {
    const env = 'production'
    process.env.APP_ENV = env
    const config = require('../ui').default
    const production = require('../production').default.ui

    expect(config).toEqual(production)
  })

  it('loads contrast config', () => {
    const env = 'contrast'
    process.env.APP_ENV = env
    const config = require('../ui').default
    const contrast = require('../contrast').default
    expect(config).toEqual(contrast.ui)
  })

  it('loads from window.__APP_ENV__ on the browser', () => {
    const sampleConfig = { test: 'test' }
    global.window.__APP_CONFIG__ = sampleConfig

    process.env.BROWSER = true
    const config = require('../ui')

    expect(config.default).toEqual(sampleConfig)
  })
})
