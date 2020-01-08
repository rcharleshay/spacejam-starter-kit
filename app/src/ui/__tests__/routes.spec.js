import { createRoutes } from 'react-router'
import matchRoutes from 'react-router/lib/matchRoutes'
import getUIRoutes from '../routes'

const { createLocation } = require('history/lib/LocationUtils')

describe('UI routes', () => {
  const routes = createRoutes(getUIRoutes())

  it('does not render a route', (done) => {
    matchRoutes(routes, createLocation('/'), (error, match) => {
      expect(match).toBeTruthy()
      done()
    })
  })
  it('renders the mobility route', (done) => {
    matchRoutes(routes, createLocation('/mobility'), (error, match) => {
      expect(match).toBeTruthy()
      done()
    })
  })
})
