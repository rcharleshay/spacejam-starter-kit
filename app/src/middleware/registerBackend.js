import bodyParser from 'body-parser'
import expressErrorHandlers from '@telus/express-error-handlers'
import config from '../config/backend'
import { BACKEND_BASENAME } from '../config/constants'
import backendRouter from '../backend/routes'

const registerBackend = (app) => {
  // body parser
  app.use(bodyParser.json(config.bodyParser))

  // error handlers
  const errorHandlers = expressErrorHandlers.handlers(config.errors)
  backendRouter.use(BACKEND_BASENAME, errorHandlers.notFoundHandler)
  backendRouter.use(BACKEND_BASENAME, errorHandlers.defaultHandler)

  app.use(BACKEND_BASENAME, backendRouter)

  return app
}

export default registerBackend
