import config from 'src/config/ui'

const handleRedirectMiddleware =  (app) => {
  app.use(/^((?!\/backend\/).)*$/, (req, res, next) => {
    const { rd } = req.query
    if(!rd)
      return res.redirect(`${config.client.base}/my-telus/overview`)

    return next()
  })
  return app
}

export default handleRedirectMiddleware
