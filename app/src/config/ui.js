let envConfig // eslint-disable-line import/no-mutable-exports
// process.env.BROWSER is added to the client side via Webpack
if (process.env.BROWSER) {
  envConfig = window.__APP_CONFIG__
} else {
  // This will only happen on the server side
  const env = process.env.APP_ENV || 'development'
  envConfig = require(`./${env}`).default.ui // eslint-disable-line import/no-dynamic-require
}

export default envConfig
