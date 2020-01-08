const env = process.env.APP_ENV || 'development'
const envConfig = require(`./${env}`).default.backend // eslint-disable-line import/no-dynamic-require

if (process.env.BROWSER && JSON.parse(process.env.BROWSER) === true) {
  throw new Error('Backend config should NEVER be running in the browser')
}

export default envConfig
