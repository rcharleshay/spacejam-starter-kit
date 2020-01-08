const client = {
  base: 'http://local.telus.com:3000',
  protocol: 'http',
  host: 'local.telus.com',
  port: 3000,
  credentials: 'include'
}

const server = {
  protocol: 'http',
  host: 'localhost',
  port: 3000,
  credentials: 'include'
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
  }
}

const bodyParser = {
  limit: '100kb'
}

const locale = {
  cookieDomain: '.telus.com'
}

const tagManager = ''

const globalElementsApi = {
  base: 'https://staging.cdn.telus.digital/global/elements/v2',
  queries: 'header=personal&footer=personal&style-elements=true'
}

const errors = {
  displayMessage: true,
  displayStackTrace: true
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
    sampleConfig
  }
}
