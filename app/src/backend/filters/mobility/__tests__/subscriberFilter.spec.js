/* eslint-disable const/first */
import sinon from 'sinon'
import MockExpressRequest from 'mock-express-request'
import MockExpressResponse from 'mock-express-response'
import configureStore from 'redux-mock-store'
import subscriber from '../subscriber'
import BackendServices from '../../../controllers/BackendServices'
import {
  multiAccountResponseMock,
  multiAccountStoreMock,
  singleAccountResponseMock,
  singleAccountLargeSubResponseMock,
  singleAccountSingleSubResponseMock
} from '../../../../ui/__mocks__/data/_responseData'
import account from '../account'

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
  filter: 'subscriber',
  numberOfAccounts: 2,
  ...multiAccountStoreMock
}


const getSubscribersMockResponse = [
  {
    statusCd: 'A',
    name: '9056266037',
    subscriberName: {
      firstName: 'test 1',
      lastName: 'test 2'
    }
  },
  {
    statusCd: 'A',
    name: '8077078519'
  }
]

const getSingleSubscriberMockResponse = [
  {
    statusCd: 'A',
    name: '9056266037',
    subscriberName: {
      firstName: 'test 1',
      lastName: 'test 2'
    }
  }
]

const noActiveSubsMockResponse = [
  {
    statusCd: 'S',
    name: '9056266037',
    subscriberName: {
      firstName: 'test 1',
      lastName: 'test 2'
    }
  }
]

const noActiveBansMockResponse = {
  firstName: 'testFirsttttttt',
  lastName: 'testL',
  email: 'test@test.com',
  bans: [
    {
      type: 'wireline',
      ban: '121212',
      products: 1,
      typeCd: 'B',
      subTypeCd: 'X',
      encryptedBan: 'n_ACegVw1uUEVlcB3AKw7A'
    }
  ]
}

describe('Subscriber Account Filter', () => {
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
    sandbox.stub(BackendServices, 'getSession').callsFake(() => {
      return Promise.resolve({})
    })
    sandbox.stub(BackendServices, 'getAccounts').callsFake(() => {
      return Promise.resolve({ ...multiAccountResponseMock })
    })

    await subscriber(reqMock, resMock, next)
    expect(reqMock.app.locals.store.value).toEqual(mockMultiLocalStoreData)
    expect(next.mock.calls.length).toEqual(1)
  })

  it('should call for no active bans', async () => {
    sandbox.stub(BackendServices, 'getSession').callsFake(() => {
      return Promise.resolve({})
    })
    sandbox.stub(BackendServices, 'getAccounts').callsFake(() => {
      return Promise.resolve(noActiveBansMockResponse)
    })

    sandbox.stub(BackendServices, 'putSession').callsFake(() => {
      return Promise.resolve({})
    })
    await subscriber(reqMock, resMock, next)
  })

  it('should call for no active subs', async () => {
    sandbox.stub(BackendServices, 'getSession').callsFake(() => {
      return Promise.resolve({})
    })
    sandbox.stub(BackendServices, 'getAccounts').callsFake(() => {
      return Promise.resolve({ ...singleAccountResponseMock })
    })

    sandbox.stub(BackendServices, 'putSession').callsFake(() => {
      return Promise.resolve({})
    })

    sandbox.stub(BackendServices, 'getSubscribers').callsFake(() => {
      return Promise.resolve(noActiveSubsMockResponse)
    })
    await subscriber(reqMock, resMock, next)
  })

  it('should call for handleSingleAccount', async () => {
    sandbox.stub(BackendServices, 'getSession').callsFake(() => {
      return Promise.resolve({})
    })

    sandbox.stub(BackendServices, 'getAccounts').callsFake(() => {
      return Promise.resolve({ ...singleAccountResponseMock })
    })

    sandbox.stub(BackendServices, 'putSession').callsFake(() => {
      return Promise.resolve({ ...singleAccountResponseMock })
    })

    sandbox.stub(BackendServices, 'getSubscribers').callsFake(() => {
      return Promise.resolve(getSubscribersMockResponse)
    })

    await subscriber(reqMock, resMock, next)
  })

  it('should call to set error object if getAccounts failed', async () => {
    sandbox.stub(BackendServices, 'getAccounts').callsFake(() => {
      return Promise.reject()
    })
    await subscriber(reqMock, resMock, next)
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
    await subscriber(reqMock, resMock, next)
    expect(reqMock.app.locals.store.value).toEqual({
      context: 'error',
      errMsg: "Filter Mobility - Initialization Error: TypeError: Cannot read property 'cookies' of undefined",
      loading: true
    })
  })

  it('should call for handleSingleAccount LargeSubs', async () => {

    sandbox.stub(BackendServices, 'getSession').callsFake(() => {
      return Promise.resolve({})
    })

    sandbox.stub(BackendServices, 'getAccounts').callsFake(() => {
      return Promise.resolve({ ...singleAccountLargeSubResponseMock })
    })

    sandbox.stub(BackendServices, 'putSession').callsFake(() => {
      return Promise.resolve({ ...singleAccountLargeSubResponseMock })
    })

    await subscriber(reqMock, resMock, next)
  })

  it('should call for handleSingleAccount Single Sub', async () => {
    sandbox.stub(BackendServices, 'getSession').callsFake(() => {
      return Promise.resolve({})
    })

    sandbox.stub(BackendServices, 'getAccounts').callsFake(() => {
      return Promise.resolve({ ...singleAccountSingleSubResponseMock })
    })

    sandbox.stub(BackendServices, 'putSession').callsFake(() => {
      return Promise.resolve({ ...singleAccountSingleSubResponseMock })
    })

    sandbox.stub(BackendServices, 'getSubscribers').callsFake(() => {
      return Promise.resolve(getSingleSubscriberMockResponse)
    })
    reqMock.query = { rd: 'http://www.telus.com/my-telus/overview' }
    await subscriber(reqMock, resMock, next)
    reqMock.query = {}
    await subscriber(reqMock, resMock, next)
  })

  it('should call for handleSingleAccount Single Sub with selected mobility session', async () => {
    sandbox.stub(BackendServices, 'getSession').callsFake(() => {
      return Promise.resolve({
        mobility: {
          content: '121212'
        }
      })
    })

    sandbox.stub(BackendServices, 'getAccounts').callsFake(() => {
      return Promise.resolve({ ...multiAccountResponseMock })
    })

    sandbox.stub(BackendServices, 'putSession').callsFake(() => {
      return Promise.resolve({})
    })

    sandbox.stub(BackendServices, 'getSubscribers').callsFake(() => {
      return Promise.resolve({})
    })
    await subscriber(reqMock, resMock, next)
  })

  it('should handle error for mobility session', async () => {
    sandbox.stub(BackendServices, 'getSession').callsFake(() => {
      return Promise.reject()
    })
    await subscriber(reqMock, resMock, next)
  })

  it('should call for handleSingleAccount Single Sub with selected different mobility session', async () => {
    sandbox.stub(BackendServices, 'getSession').callsFake(() => {
      return Promise.resolve({
        mobility: {
          account: '2323232'
        }
      })
    })

    sandbox.stub(BackendServices, 'getAccounts').callsFake(() => {
      return Promise.resolve({ ...multiAccountResponseMock })
    })

    sandbox.stub(BackendServices, 'putSession').callsFake(() => {
      return Promise.resolve({})
    })

    sandbox.stub(BackendServices, 'getSubscribers').callsFake(() => {
      return Promise.resolve({})
    })
    await subscriber(reqMock, resMock, next)
  })

})
