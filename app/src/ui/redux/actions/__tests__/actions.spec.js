import sinon from 'sinon'
import { applyMiddleware, createStore } from 'redux'
import { fetchMiddleware } from '@telus/isomorphic-core'
import accountReducer from '../../reducers/app.reducer'
import * as backendClient from '../../../services/backendClient'
import {
  postAccountInSessionAction,
  postSubscriberInSessionAction,
  postSubscribersAction,
  reselectAccountAction,
  clearSearchAction,
  stopLoadingAction,
  apiSearchAction,
  localSearchAction
} from '../app.action'
import {
  postAccountInSessionMock,
  postAccountInSessionResponseMock,
  postSubscriberInSessionMock,
  postCustomerMock,
  postCustomerResponseMock,
  localSearchResponseMock
} from '../../../__mocks__/data/_responseData'

jest.useFakeTimers()

let sandbox

beforeEach(() => {
  sandbox = sinon.createSandbox()
})

afterEach(() => {
  sandbox.restore()
})

describe('postAccountInSessionAction', () => {
  const createFetchStore = applyMiddleware(fetchMiddleware())(createStore)
  const testAccountRequestData = { content: '28986434' }

  it('should set status as PENDING when action request dispatched', () => {
    sandbox.stub(backendClient, 'postAccountInSession').callsFake(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(postAccountInSessionMock)
        })
      })
    })

    const store = createFetchStore(accountReducer)
    store.dispatch(postAccountInSessionAction('mobility', 'account', testAccountRequestData))

    const state = store.getState().toJS()
    expect(state.status).toEqual('PENDING')
    expect(state.data).toEqual({})
  })

  it('should set status as SUCCESS when action completes successfully', async () => {
    sandbox.stub(backendClient, 'postAccountInSession').callsFake(() => {
      return Promise.resolve(postAccountInSessionMock)
    })

    const store = createFetchStore(accountReducer)
    await store.dispatch({ type: 'INITIALIZE_ACCOUNT_FROM_SERVER', value: { category: 'mobility' } })
    await store.dispatch(postAccountInSessionAction('mobility', 'account', testAccountRequestData, '28986434'))

    const state = store.getState().toJS()
    expect(state.status).toEqual('SUCCESS')
    expect(state.data).toEqual(postAccountInSessionResponseMock)
  })

  it('should set status as FAILURE when action fails', async () => {
    sandbox.stub(backendClient, 'postAccountInSession').callsFake(() => {
      return Promise.reject()
    })

    const store = createFetchStore(accountReducer)
    await store.dispatch(postAccountInSessionAction('mobility', 'account', testAccountRequestData))

    const state = store.getState().toJS()
    expect(state.status).toEqual('FAILURE')
  })
})

describe('postSubscriberInSessionAction', () => {
  const createFetchStore = applyMiddleware(fetchMiddleware())(createStore)
  const testSubscriberRequestData = { subscriber: '9056265089' }

  it('should set status as PENDING when action request dispatched', () => {
    sandbox.stub(backendClient, 'postSubscriberInSession').callsFake(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(postSubscriberInSessionMock)
        })
      })
    })

    const store = createFetchStore(accountReducer)
    store.dispatch(postSubscriberInSessionAction('mobility', testSubscriberRequestData))

    const state = store.getState().toJS()
    expect(state.status).toEqual('PENDING')
    expect(state.data).toEqual({})
  })

  it('should set status as SUCCESS when action completes successfully', async () => {
    sandbox.stub(backendClient, 'postSubscriberInSession').callsFake(() => {
      return Promise.resolve(postSubscriberInSessionMock)
    })

    const store = createFetchStore(accountReducer)
    await store.dispatch({ type: 'INITIALIZE_ACCOUNT_FROM_SERVER', value: { category: 'mobility' } })
    await store.dispatch(postSubscriberInSessionAction('mobility', testSubscriberRequestData))

    const state = store.getState().toJS()
    expect(state.status).toEqual('SUCCESS')
    expect(state.data).toEqual({ category: 'mobility', context: 'redirect' })
  })

  it('should set status as FAILURE when action fails', async () => {
    sandbox.stub(backendClient, 'postSubscriberInSession').callsFake(() => {
      return Promise.reject()
    })

    const store = createFetchStore(accountReducer)
    await store.dispatch(postSubscriberInSessionAction('mobility', testSubscriberRequestData))

    const state = store.getState().toJS()
    expect(state.status).toEqual('FAILURE')
  })
})

describe('postSubscribersAction', () => {
  const createFetchStore = applyMiddleware(fetchMiddleware())(createStore)
  const testSubscriberRequestData = { email: 'multi_ban@telusinternal.com' }

  it('should set status as PENDING when action request dispatched', () => {
    sandbox.stub(backendClient, 'postCustomers').callsFake(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(postSubscriberInSessionMock)
        })
      })
    })

    const store = createFetchStore(accountReducer)
    store.dispatch(postSubscribersAction('28986434', 'mobility', testSubscriberRequestData))

    const state = store.getState().toJS()
    expect(state.data).toEqual({ loading: true })
  })

  it('should set status as SUCCESS when action completes successfully', async () => {
    sandbox.stub(backendClient, 'postCustomers').callsFake(() => {
      return Promise.resolve(postCustomerMock)
    })

    const store = createFetchStore(accountReducer)
    await store.dispatch({ type: 'INITIALIZE_ACCOUNT_FROM_SERVER', value: { category: 'mobility' } })
    await store.dispatch(postSubscribersAction('28986434', 'mobility', testSubscriberRequestData))

    const state = store.getState().toJS()
    expect(state.status).toEqual('SUCCESS')
    expect(state.data).toEqual(postCustomerResponseMock)
  })

  it('should set status as FAILURE when action fails', async () => {
    sandbox.stub(backendClient, 'postCustomers').callsFake(() => {
      return Promise.reject()
    })

    const store = createFetchStore(accountReducer)
    await store.dispatch(postSubscribersAction('28986434', 'mobility', testSubscriberRequestData))

    const state = store.getState().toJS()
    expect(state.status).toEqual('FAILURE')
  })
})

describe('reselectAccountAction', () => {
  const createFetchStore = applyMiddleware(fetchMiddleware())(createStore)

  it('should reselect account', () => {
    const store = createFetchStore(accountReducer)
    store.dispatch(reselectAccountAction())

    const state = store.getState().toJS()
    expect(state.data).toEqual({ context: 'account', subscriber: [], search: {}, subscribersFetched: false })
  })
})

describe('clearSearchAction', () => {
  const createFetchStore = applyMiddleware(fetchMiddleware())(createStore)

  it('should clear search', () => {
    const store = createFetchStore(accountReducer)
    store.dispatch(clearSearchAction())

    const state = store.getState().toJS()
    expect(state.data).toEqual({ search: {} })
  })
})

describe('stopLoadingAction', () => {
  const createFetchStore = applyMiddleware(fetchMiddleware())(createStore)

  it('should stop loading', () => {
    const store = createFetchStore(accountReducer)
    store.dispatch(stopLoadingAction())

    const state = store.getState().toJS()
    expect(state.data).toEqual({ loading: false })
  })
})

describe('apiSearchAction', () => {
  const createFetchStore = applyMiddleware(fetchMiddleware())(createStore)

  it('should set status as PENDING when action request dispatched', () => {
    sandbox.stub(backendClient, 'getProduct').callsFake(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(postSubscriberInSessionMock)
        })
      })
    })

    const store = createFetchStore(accountReducer)
    store.dispatch(apiSearchAction('1234567891'))

    const state = store.getState().toJS()
    expect(state.data).toEqual({ loading: true })
  })

  it('should set status as SUCCESS when action completes successfully', async () => {
    sandbox.stub(backendClient, 'getProduct').callsFake(() => {
      return Promise.resolve([{ encryptedSub: '0mWO4TO3Uh1P3XO7zVvz0g', content: '905-626-6871', title: 'xxx', fullName: 'xxx yyy' }])
    })

    const store = createFetchStore(accountReducer)
    await store.dispatch({ type: 'INITIALIZE_ACCOUNT_FROM_SERVER', value: { category: 'mobility' } })
    await store.dispatch(apiSearchAction('9056266871'))

    const state = store.getState().toJS()
    expect(state.status).toEqual('SUCCESS')
    expect(state.data).toEqual({
      category: 'mobility',
      loading: false,
      search: {
        searchValue: [{ encryptedSub: '0mWO4TO3Uh1P3XO7zVvz0g', content: '905-626-6871', title: 'xxx', fullName: 'xxx yyy' }],
        searchStatus: 'SUCCESS'
      }
    })
  })

  it('should set status as FAILURE when action fails', async () => {
    sandbox.stub(backendClient, 'getProduct').callsFake(() => {
      return Promise.reject()
    })

    const store = createFetchStore(accountReducer)
    await store.dispatch(apiSearchAction('1234567891'))

    const state = store.getState().toJS()
    expect(state.data).toEqual({ loading: false, search: { searchValue: [], searchStatus: 'FAILURE' } })
  })
})

describe('localSearchAction', () => {
  const createFetchStore = applyMiddleware(fetchMiddleware())(createStore)

  it('should local search', () => {
    const store = createFetchStore(accountReducer)
    store.dispatch({
      type: 'INITIALIZE_ACCOUNT_FROM_SERVER',
      value: {
        context: 'account',
        category: 'mobility',
        account: [
          {
            content: '28986434',
            numberOfSubs: 5,
            typeCd: 'B',
            subTypeCd: 'X',
            email: 'multi_ban@telusinternal.com',
            formattedName: 'UAT TESTER',
            encryptedBan: 'n_ACegVw1uUEVlcB3AKw7A'
          }
        ]
      }
    })
    store.dispatch(localSearchAction('28986434'))

    const state = store.getState().toJS()
    expect(state.data).toEqual(localSearchResponseMock)
  })
})
