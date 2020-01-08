/* eslint-disable const/first */
import sinon from 'sinon'
import MockExpressRequest from 'mock-express-request'
import MockExpressResponse from 'mock-express-response'
import configureStore from 'redux-mock-store'
import account from '../account'
import BackendServices from '../../../controllers/BackendServices'
import { multiAccountResponseMock, multiAccountStoreMock, singleAccountResponseMock } from '../../../../ui/__mocks__/data/_responseData'

jest.useFakeTimers()

let sandbox

beforeEach(() => {
  sandbox = sinon.createSandbox()
})

afterEach(() => {
  sandbox.restore()
})

const mockMultiLocalStoreData = {
  loading: true,
  context: 'account',
  category: 'mobility',
  filter: 'account',
  numberOfAccounts: 2,
  ...multiAccountStoreMock
}

describe('Mobility Account Filter', () => {
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

  it('should call for setMultiAccountStoreObject', async () => {
    sandbox.stub(BackendServices, 'getAccounts').callsFake(() => {
      return Promise.resolve({ ...multiAccountResponseMock })
    })

    await account(reqMock, resMock, next)
    expect(reqMock.app.locals.store.value).toEqual(mockMultiLocalStoreData)
    expect(next.mock.calls.length).toEqual(1)
  })

  it('should call for handleSingleAccount', async () => {
    sandbox.stub(BackendServices, 'getAccounts').callsFake(() => {
      return Promise.resolve({ ...singleAccountResponseMock })
    })

    sandbox.stub(BackendServices, 'putSession').callsFake(() => {
      return Promise.resolve({ ...singleAccountResponseMock })
    })

    reqMock.query = { rd: 'http://www.telus.com/my-telus/overview' }
    await account(reqMock, resMock, next)
    reqMock.query = {}
    await account(reqMock, resMock, next)
  })

  it('should call to set error object if getAccounts failed', async () => {
    sandbox.stub(BackendServices, 'getAccounts').callsFake(() => {
      return Promise.reject()
    })
    await account(reqMock, resMock, next)
  })

  it('should call to set error object if putSession failed', async () => {
    sandbox.stub(BackendServices, 'getAccounts').callsFake(() => {
      return Promise.resolve({
        firstName: 'testF',
        lastName: 'testL',
        email: 'test@test.com',
        bans: [
          {
            type: 'wireline',
            ban: '121212',
            products: 4,
            typeCd: 'B',
            subTypeCd: 'X',
            encryptedBan: 'n_ACegVw1uUEVlcB3AKw7A'
          }
        ]
      })
    })
    await account(reqMock, resMock, next)
    expect(reqMock.app.locals.store.value).toEqual({
      context: 'error',
      errMsg: 'Filter Mobility Account - There are no active accounts.',
      loading: true
    })
    expect(next.mock.calls.length).toEqual(4)
  })
})
