let envConfig
if (process.env.BROWSER) {
  envConfig = window.__APP_CONFIG__
} else {
  const env = process.env.APP_ENV || 'development'
  envConfig = require(`./${env}`).default.ui
}

export default envConfig
