import analyticsScripts from '@telus/analytics-scripts'

const client = {
  base: 'https://www.wcstage.telus.com',
  protocol: 'https',
  host: 'www.wcstage.telus.com',
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
  base: 'https://api.stage.digital.telus.com',
  headerNames: {
    oauth: 't-oauth2-token',
    session: 't-session-token'
  },
  cookieNames: {
    oauth: 'OAuth2TokenStage',
    session: 'SessionTokenStage'
  },
  returnHost: 'https://www.wcstage.telus.com',
  env: 'staging'
}

const locale = {
  cookieDomain: '.telus.com',
  forceUriLocalePriority: false,
  matchUriToLocale: false
}

const tagManager = "//assets.adobedtm.com/launch-ENdd4142b4bbfc4721982dd14bc0f2c424-staging.min.js"

const globalElementsApi = {
  base: 'https://staging.cdn.telus.digital/global/elements/v2',
  queries: 'header=personal&footer=personal&style-elements=true'
}

const myAccountNavConfigs = {
  withLibs: false
}

const bodyParser = {
  limit: '100kb'
}

const errors = {
  displayMessage: true,
  displayStackTrace: false
}

const sampleConfig = {
  message: `This message is loading from a configuration file in ${process.env.APP_ENV}.js`
}

export default {
  // any non public facing config goes in backend - only available server-side
  backend: {
    locale,
    tagManager,
    bodyParser,
    globalElementsApi,
    authorizationProxy,
    errors
  },
  // public facing config goes in ui - available on both UI and server
  ui: {
    client,
    server,
    authorizationProxy,
    sampleConfig,
    myAccountNavConfigs
  }
}
