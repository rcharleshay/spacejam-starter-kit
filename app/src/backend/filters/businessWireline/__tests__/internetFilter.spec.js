/* eslint-disable const/first */
import sinon from 'sinon'
import MockExpressRequest from 'mock-express-request'
import MockExpressResponse from 'mock-express-response'
import configureStore from 'redux-mock-store'
import internet from '../internet'
import BackendServices from '../../../controllers/BackendServices'
import {
  singleCanResponseMock,
  multiCanResponseMock,
  consolidatedCanResponseMock
} from '../../../../ui/__mocks__/data/_cansResponseData'


jest.useFakeTimers()

let sandbox

beforeEach(() => {
  sandbox = sinon.createSandbox()
})

afterEach(() => {
  sandbox.restore()
})


describe('internet Account Filter', () => {

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
    reqMock = new MockExpressRequest({ tokens })
    resMock = new MockExpressResponse()
    resMock.sendStatus = jest.fn()
    reqMock.app.locals = { store }
    reqMock.params = {}
    reqMock.lang = 'en'
  })

  const next = jest.fn()

  it('should call for single Can',  async() => {
    sandbox.stub(BackendServices, 'getAccounts').callsFake(() => {
      return Promise.resolve({cans: singleCanResponseMock})
    })

    sandbox.stub(BackendServices, 'getSession').callsFake(() => {
      return Promise.resolve({})
    })

    sandbox.stub(BackendServices, 'putSession').callsFake(() => {
      return Promise.resolve({})
    })

    reqMock.query = { rd: 'http://www.telus.com/my-telus/overview'}
    await internet(reqMock, resMock, next)
    reqMock.query = {}
    await internet(reqMock, resMock, next)
  })

  it('should call for multi Can',  async() => {
    sandbox.stub(BackendServices, 'getAccounts').callsFake(() => {
      return Promise.resolve({cans: multiCanResponseMock})
    })

    sandbox.stub(BackendServices, 'getSession').callsFake(() => {
      return Promise.resolve({})
    })

    sandbox.stub(BackendServices, 'putSession').callsFake(() => {
      return Promise.resolve({})
    })

    await internet(reqMock, resMock, next)
  })

  it('should call for no active Can',  async() => {
    sandbox.stub(BackendServices, 'getAccounts').callsFake(() => {
      return Promise.resolve({cans: []})
    })

    sandbox.stub(BackendServices, 'getSession').callsFake(() => {
      return Promise.resolve({})
    })

    sandbox.stub(BackendServices, 'putSession').callsFake(() => {
      return Promise.resolve({})
    })

    await internet(reqMock, resMock, next)
  })

  it('should call for consolidated Can',  async() => {
    sandbox.stub(BackendServices, 'getAccounts').callsFake(() => {
      return Promise.resolve({cans: consolidatedCanResponseMock})
    })

    sandbox.stub(BackendServices, 'getSession').callsFake(() => {
      return Promise.resolve({})
    })

    sandbox.stub(BackendServices, 'putSession').callsFake(() => {
      return Promise.resolve({})
    })

    await internet(reqMock, resMock, next)
  })
})
