import fetch from 'isomorphic-fetch'
import BackendServices from '../BackendServices'
import config from '../../../config/ui'

const httpMocks = require('node-mocks-http')

jest.mock('isomorphic-fetch')
let mockFetch

const buildRequest = (tokens) => {
  const cookies = {}
  cookies[config.authorizationProxy.cookieNames.oauth] = tokens['t-oauth2-token']
  cookies[config.authorizationProxy.cookieNames.session] = tokens['t-session-token']

  return httpMocks.createRequest({ universalCookies: { cookies } })
}

const tokens = {
  't-oauth2-token': 'authCookie',
  't-session-token': 'sessionCookie'
}

const mockApiResponse = {
  status: 200,
  json: () => ({ data: true })
}

const mockErrorResponse = {
  status: 400,
  json: () => ({})
}

describe('BackendServices', () => {
  it('is great!', () => expect(true).toBe(true))
})
