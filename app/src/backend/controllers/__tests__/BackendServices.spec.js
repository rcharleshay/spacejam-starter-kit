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
  it('should call for getAccounts', () => {
    const request = buildRequest(tokens)
    mockFetch = jest.fn(() => Promise.resolve(mockApiResponse))
    fetch.mockImplementation(mockFetch)

    return BackendServices.getAccounts(request)
      .then((result) => {
        expect(result).toEqual({ data: true })
      })
  })

  it('should throw error for getAccounts', () => {
    const request = buildRequest(tokens)
    mockFetch = jest.fn(() => Promise.reject(mockErrorResponse))
    fetch.mockImplementation(mockFetch)

    return BackendServices.getAccounts(request)
      .then((result) => {
        expect(result).toEqual(undefined)
      })
  })

  it('should throw error for getSubscribers', () => {
    const request = buildRequest(tokens)
    mockFetch = jest.fn(() => Promise.reject(mockErrorResponse))
    fetch.mockImplementation(mockFetch)

    return BackendServices.getSubscribers(request, '123456')
      .then((result) => {
        expect(result).toEqual(undefined)
      })
  })
  it('should call for getSubscribers', () => {
    const request = buildRequest(tokens)
    mockFetch = jest.fn(() => Promise.resolve(mockApiResponse))
    fetch.mockImplementation(mockFetch)

    return BackendServices.getSubscribers(request, '123456')
      .then((result) => {
        expect(result).toEqual({ data: true })
      })
  })

  it('should call for getSession', () => {
    const request = buildRequest(tokens)
    mockFetch = jest.fn(() => Promise.resolve(mockApiResponse))
    fetch.mockImplementation(mockFetch)

    return BackendServices.getSession(request)
      .then((result) => {
        expect(result).toEqual({ data: true })
      })
  })

  it('should throw error for getSession', () => {
    const request = buildRequest(tokens)
    mockFetch = jest.fn(() => Promise.reject(mockErrorResponse))
    fetch.mockImplementation(mockFetch)

    return BackendServices.getSession(request)
      .then((result) => {
        expect(result).toEqual(undefined)
      })
  })

  it('should call for putSession', () => {
    const request = buildRequest(tokens)
    mockFetch = jest.fn(() => Promise.resolve(mockApiResponse))
    fetch.mockImplementation(mockFetch)

    return BackendServices.putSession(request, { account: 'xxxxx'})
      .then((result) => {
        expect(result).toEqual({ data: true })
      })
  })

  it('should throw error for putSession', () => {
    const request = buildRequest(tokens)
    mockFetch = jest.fn(() => Promise.reject(mockErrorResponse))
    fetch.mockImplementation(mockFetch)

    return BackendServices.putSession(request, { account: 'xxxxx'})
      .then((result) => {
        expect(result).toEqual(undefined)
      })
  })

  it('should throw error for getSubscriber', () => {
    const request = buildRequest(tokens)
    mockFetch = jest.fn(() => Promise.reject(mockErrorResponse))
    fetch.mockImplementation(mockFetch)

    return BackendServices.getSubscriber(request, '1234567890')
      .then((result) => {
        expect(result).toEqual(undefined)
      })
  })
  it('should call for getSubscriber', () => {
    const request = buildRequest(tokens)
    mockFetch = jest.fn(() => Promise.resolve(mockApiResponse))
    fetch.mockImplementation(mockFetch)

    return BackendServices.getSubscriber(request, '1234567890')
      .then((result) => {
        expect(result).toEqual({ data: true })
      })
  })
})