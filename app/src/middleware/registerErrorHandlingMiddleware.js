import expressWinston from 'express-winston'
import logger from '../backend/logger'

const registerErrorHandlingMiddleware = (app) => {
  app.use(expressWinston.errorLogger({ winstonInstance: logger }))
  app.use((err, req, res) => {
    res.status(500).send('Server error')
  })
  return app
}

export default registerErrorHandlingMiddleware
