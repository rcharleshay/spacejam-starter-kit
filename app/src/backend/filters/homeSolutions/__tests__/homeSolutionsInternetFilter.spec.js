/* eslint-disable const/first */
import sinon from 'sinon'
import MockExpressRequest from 'mock-express-request'
import MockExpressResponse from 'mock-express-response'
import configureStore from 'redux-mock-store'
import internet from '../internet'


jest.useFakeTimers()

let sandbox

beforeEach(() => {
  sandbox = sinon.createSandbox()
})

afterEach(() => {
  sandbox.restore()
})


describe('home solutions internet Account Filter', () => {

  let mockStore
  let store
  let reqMock
  let resMock

  const tokens = {
    oauth: 'mock-oauth',
    session: 'mock-session'
  }

  mockStore = configureStore()
  const initialState = {}
  store = mockStore(initialState)

  beforeEach(() => {
    reqMock = new MockExpressRequest({tokens})
    resMock = new MockExpressResponse()
    resMock.sendStatus = jest.fn()
    reqMock.app.locals = {store}
    reqMock.params = {}
    reqMock.lang = 'en'
  })

  const next = jest.fn()

  it('should call internet filter', async () => {
    await internet(reqMock, resMock, next)
    expect(next.mock.calls.length).toEqual(1)
  })
})
