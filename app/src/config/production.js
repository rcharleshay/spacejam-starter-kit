import analyticsScripts from '@telus/analytics-scripts'

const client = {
  base: 'https://www.telus.com',
  protocol: 'https',
  host: 'www.telus.com',
  port: 443,
  credentials: 'same-origin'
}

const server = {
  protocol: 'http',
  host: 'localhost',
  port: 3000,
  credentials: 'same-origin'
}

const authorizationProxy = {
  base: 'https://api.digital.telus.com',
  headerNames: {
    oauth: 't-oauth2-token',
    session: 't-session-token'
  },
  cookieNames: {
    oauth: 'OAuth2Token',
    session: 'SessionToken'
  },
  returnHost: 'https://www.telus.com',
  env: 'production'
}

const locale = {
  cookieDomain: '.telus.com',
  forceUriLocalePriority: false,
  matchUriToLocale: false
}

const tagManager = '//assets.adobedtm.com/launch-EN65f579f00cb04596bfa8bad1911ad8fa.min.js'

const globalElementsApi = {
  base: 'https://cdn.telus.digital/global/elements/v2',
  queries: 'header=personal&footer=personal&style-elements=true'
}

const myAccountNavConfigs = {
  withLibs: false
}

const bodyParser = {
  limit: '100kb'
}

const errors = {
  displayMessage: false,
  displayStackTrace: false
}

const sampleConfig = {
  message: `This message is loading from a configuration file in ${process.env.APP_ENV}.js`
}

export default {
  backend: {
    locale,
    tagManager,
    bodyParser,
    globalElementsApi,
    authorizationProxy,
    errors
  },
  ui: {
    client,
    server,
    authorizationProxy,
    sampleConfig,
    myAccountNavConfigs
  }
}
