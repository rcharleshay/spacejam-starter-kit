import pjson from '../../package.json'
import logger from '../backend/logger'
import { UI_BASENAME } from '../config/constants'

const startApplication = (app) => {
  const projectName = pjson.name.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')

  app.listen(3000, () => {
    logger.info(`${projectName} listening on port 3000`)
    if (process.env.APP_ENV === 'development') {
      logger.info(`App Started on: http://local.telus.com:3000`)
    }
  })
}

export default startApplication
