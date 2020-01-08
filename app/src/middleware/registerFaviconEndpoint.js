const registerFaviconEndpoint = (app) => {
  app.get('/favicon.ico', (req, res) => {
    res.status(204).end()
  })
  return app
}

export default registerFaviconEndpoint
