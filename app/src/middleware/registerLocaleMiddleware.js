import Locale from '@telus/express-locale'
import config from '../config/backend'

const locale = new Locale(config.locale)

const registerLocaleMiddleware = (app) => {
  app.use(locale.langProvMiddleware)
  return app
}

export default registerLocaleMiddleware
