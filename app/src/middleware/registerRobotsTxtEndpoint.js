const registerRobotsTxtEndpoint = (app) => {
  app.route('/robots.txt').get((req, res) => {
    res.type('text/plain')
    res.send('User-agent: *\nDisallow: /')
  })
  return app
}

export default registerRobotsTxtEndpoint
