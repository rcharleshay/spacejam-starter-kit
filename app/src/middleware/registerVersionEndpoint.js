import pjson from '../../package.json'

const registerVersionEndpoint = (app) => {
  const { version } = pjson
  // readiness probe endpoint
  app.route('/version').get((req, res) => {
    res.json({ version })
  })
  return app
}

export default registerVersionEndpoint
