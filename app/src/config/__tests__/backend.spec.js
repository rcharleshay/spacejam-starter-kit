describe('backend config', () => {
  process.env.BROWSER = false
  beforeEach(() => {
    jest.resetModules()
  })

  it('loads development config by default', () => {
    delete process.env.APP_ENV
    const config = require('../backend').default
    const development = require('../development').default

    expect(config).toEqual(development.backend)
  })

  it('loads development config', () => {
    const env = 'development'
    process.env.APP_ENV = env
    const config = require('../backend').default
    const development = require('../development').default

    expect(config).toEqual(development.backend)
  })

  it('loads contrast config', () => {
    const env = 'contrast'
    process.env.APP_ENV = env
    const config = require('../backend').default
    const contrast = require('../contrast').default
    expect(config).toEqual(contrast.backend)
  })

  it('loads staging config', () => {
    const env = 'staging'
    process.env.APP_ENV = env
    const config = require('../backend').default
    const staging = require('../staging').default

    expect(config).toEqual(staging.backend)
  })

  it('loads production config', () => {
    const env = 'production'
    process.env.APP_ENV = env
    const config = require('../backend').default
    const production = require('../production').default

    expect(config).toEqual(production.backend)
  })

  it('should throw error if backend config is loaded in the browser', () => {
    const env = 'production'
    process.env.APP_ENV = env
    process.env.BROWSER = JSON.stringify(true)

    expect(() => {
      const config = require('../backend').default // eslint-disable-line
    }).toThrow()
  })
})
