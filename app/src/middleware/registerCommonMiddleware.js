import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import cookieMiddleware from 'universal-cookie-express'
import cookieParser from 'cookie-parser'
import expressWinston from 'express-winston'
import logger from '../backend/logger'
import { UI_BASENAME } from '../config/constants'

const registerCommonMiddleware = (app) => {
  app.use(cors())
  app.use(helmet({
    hsts: false
  }))
  app.use(compression())
  // cache static assets in browser for one year on production only.
  // This is invalidated by the asset hash
  app.use(
    `${UI_BASENAME}/static`,
    express.static(
      'dist',
      process.env.NODE_ENV === 'development' ? {} : { maxAge: '365d' }
    )
  )
  app.use(cookieMiddleware())
  app.use(cookieParser())

  app.use(
    expressWinston.logger({
      winstonInstance: logger,
      ignoredRoutes: ['/version']
    })
  )
  return app
}

export default registerCommonMiddleware
