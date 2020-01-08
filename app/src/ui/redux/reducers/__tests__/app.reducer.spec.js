import Immutable, { fromJS } from 'immutable'
import {
  POST_ACCOUNT_IN_SESSION,
  POST_SUBSCRIBER_IN_SESSION,
  POST_SUBSCRIBERS,
  API_SEARCH,
  INITIALIZE_ACCOUNT_FROM_SERVER,
  RESELECT_ACCOUNT,
  CLEAR_SEARCH,
  STOP_LOADING,
  LOCAL_SEARCH
} from 'src/ui/redux/actions/app.action'
import reducer from 'src/ui/redux/reducers/app.reducer'

const initialState = Immutable.fromJS({
  status: 'UNINIT',
  data: {}
})

const previousStateData = {
  subscriber: [
    {
      encryptedSub: '0mWO4TO3Uh1P3XO7zVvz0g',
      content: '905-626-6871',
      title: '',
      fullName: ''
    },
    {
      encryptedSub: 'DL2391RX2F_USN-u4Eabog',
      content: '905-626-3527',
      title: '',
      fullName: ''
    }
  ],
  account: [
    {
      content: '28986434',
      title: false,
      numberOfSubs: 5,
      typeCd: 'B',
      subTypeCd: 'X',
      email: 'multi_ban@telusinternal.com',
      formattedName: 'UAT TESTER',
      encryptedBan: 'n_ACegVw1uUEVlcB3AKw7A'
    },
    {
      content: '25925528',
      title: false,
      numberOfSubs: 11,
      typeCd: 'B',
      subTypeCd: 'R',
      email: 'multi_ban@telusinternal.com',
      formattedName: 'UAT TESTER',
      encryptedBan: 'v1-TnK2QwIEng7JpR6C9_A'
    }
  ]
}

const accountSearchResult = {
  searchValue: [
    {
      content: '28986434',
      title: false,
      numberOfSubs: 5,
      typeCd: 'B',
      subTypeCd: 'X',
      email: 'multi_ban@telusinternal.com',
      formattedName: 'UAT TESTER',
      encryptedBan: 'n_ACegVw1uUEVlcB3AKw7A'
    }
  ],
  searchStatus: 'SUCCESS'
}

const subscriberSearchResult = {
  searchValue: [
    {
      encryptedSub: '0mWO4TO3Uh1P3XO7zVvz0g',
      content: '905-626-6871',
      title: '',
      fullName: ''
    }
  ],
  searchStatus: 'SUCCESS'
}

describe('accountReducer', () => {
  beforeEach(() => {
    jest.resetModules()
  })
  it('returns default state', () => {
    const newState = reducer(initialState, {})
    expect(newState).toEqual(initialState)
  })

  it('returns default state', () => {
    const newState = reducer(undefined, {})
    expect(newState).toEqual(initialState)
  })

  it('updates POST_SUBSCRIBER_IN_SESSION state to pending', () => {
    const newState = reducer(initialState, {
      type: `${POST_SUBSCRIBER_IN_SESSION}_REQUEST`
    })
    expect(newState.get('status')).toEqual('PENDING')
  })

  it('updates POST_ACCOUNT_IN_SESSION state to pending', () => {
    const newState = reducer(initialState, {
      type: `${POST_ACCOUNT_IN_SESSION}_REQUEST`
    })
    expect(newState.get('status')).toEqual('PENDING')
  })

  it('updates POST_SUBSCRIBERS loading to true', () => {
    const newState = reducer(initialState, {
      type: `${POST_SUBSCRIBERS}_REQUEST`
    })
    expect(newState.get('data').toJS()).toEqual({ loading: true })
  })

  it('updates API_SEARCH loading to true', () => {
    const newState = reducer(initialState, {
      type: `${API_SEARCH}_REQUEST`
    })
    expect(newState.get('data').toJS()).toEqual({ loading: true })
  })

  it('updates POST_ACCOUNT_IN_SESSION status to failure', () => {
    const newState = reducer(initialState, {
      type: `${POST_ACCOUNT_IN_SESSION}_FAILURE`
    })
    expect(newState.get('status')).toEqual('FAILURE')
  })

  it('updates POST_SUBSCRIBERS loading status to failure', () => {
    const newState = reducer(initialState, {
      type: `${POST_SUBSCRIBERS}_FAILURE`
    })
    expect(newState.get('status')).toEqual('FAILURE')
  })

  it('updates POST_SUBSCRIBER_IN_SESSION loading status to failure', () => {
    const newState = reducer(initialState, {
      type: `${POST_SUBSCRIBER_IN_SESSION}_FAILURE`
    })
    expect(newState.get('status')).toEqual('FAILURE')
  })

  it('updates API_SEARCH status to failure', () => {
    const newState = reducer(initialState, {
      type: `${API_SEARCH}_FAILURE`
    })
    expect(newState.get('data').toJS()).toEqual({ loading: false, search: { searchValue: [], searchStatus: 'FAILURE' } })
  })

  it('sets values for INITIALIZE_ACCOUNT_FROM_SERVER', () => {
    const newState = reducer(initialState, {
      type: INITIALIZE_ACCOUNT_FROM_SERVER,
      value: { loading: true, context: 'account' }
    })
    expect(newState.get('data').toJS()).toEqual({ loading: true, context: 'account' })
  })

  it('sets values for RESELECT_ACCOUNT', () => {
    const newState = reducer(initialState, {
      type: RESELECT_ACCOUNT
    })
    expect(newState.get('data').toJS()).toEqual({ context: 'account', subscriber: [], search: {}, subscribersFetched: false })
  })

  it('clear search values for CLEAR_SEARCH', () => {
    const newState = reducer(initialState, {
      type: CLEAR_SEARCH
    })
    expect(newState.get('data').toJS()).toEqual({ search: {} })
  })

  it('stops loading for STOP_LOADING', () => {
    const newState = reducer(initialState, {
      type: STOP_LOADING
    })
    expect(newState.get('data').toJS()).toEqual({ loading: false })
  })

  it('local account search for LOCAL_SEARCH', () => {
    const previousState = {
      status: 'SUCCESS',
      data: fromJS({ ...previousStateData, context: 'account' })
    }
    // search found
    const newState = reducer(fromJS(previousState), {
      type: LOCAL_SEARCH,
      searchValue: 28986434
    })
    expect(newState.get('data').toJS()).toEqual({ ...previousStateData, context: 'account', search: accountSearchResult })

    // search not found
    const newStateInvalid = reducer(fromJS(previousState), {
      type: LOCAL_SEARCH,
      searchValue: 289864341
    })
    expect(newStateInvalid.get('data').toJS()).toEqual({
      ...previousStateData,
      context: 'account',
      search: { searchValue: [], searchStatus: 'FAILURE' }
    })
  })

  it('local subscriber search for LOCAL_SEARCH', () => {
    const previousState = {
      status: 'SUCCESS',
      data: fromJS({ ...previousStateData, context: 'subscriber' })
    }
    // search found
    const newState = reducer(fromJS(previousState), {
      type: LOCAL_SEARCH,
      searchValue: '905-626-6871'
    })
    expect(newState.get('data').toJS()).toEqual({
      ...previousStateData,
      context: 'subscriber',
      search: subscriberSearchResult
    })

    // search not found
    const newStateInvalid = reducer(fromJS(previousState), {
      type: LOCAL_SEARCH,
      searchValue: '905-626-6872'
    })
    expect(newStateInvalid.get('data').toJS()).toEqual({
      ...previousStateData,
      context: 'subscriber',
      search: { searchValue: [], searchStatus: 'FAILURE' }
    })
  })

  it('default state if subs are empty for LOCAL_SEARCH', () => {
    const previousState = {
      status: 'SUCCESS',
      data: fromJS({ account: [] })
    }
    const newState = reducer(fromJS(previousState), {
      type: LOCAL_SEARCH,
      searchValue: ''
    })
    expect(newState.get('data').toJS()).toEqual({ account: [], search: { searchValue: [], searchStatus: 'UNINIT' } })
  })

  it('updates POST_SUBSCRIBERS state to success', () => {
    const newState = reducer(initialState, {
      type: `${POST_SUBSCRIBERS}_SUCCESS`,
      res: {
        subscribers: ['123-456-7891', '123-121-7891']
      }
    })
    expect(newState.get('status')).toEqual('SUCCESS')

    const newStateOneSub = reducer(initialState, {
      type: `${POST_SUBSCRIBERS}_SUCCESS`,
      res: {
        subscribers: ['123-456-7891']
      }
    })
    expect(newStateOneSub.get('status')).toEqual('SUCCESS')
  })

  it('updates POST_ACCOUNT_IN_SESSION state to success', () => {
    const resultData = (category) => {
      return {
        [category]: { content: 'xxx' },
        session: { [category]: { ban: 'xxxxxx' } }
      }
    }
    // mobility category
    const previousState = { status: 'SUCCESS', data: fromJS({ category: 'mobility' }) }
    const newState = reducer(fromJS(previousState), {
      type: `${POST_ACCOUNT_IN_SESSION}_SUCCESS`,
      res: { ...resultData('mobility') }
    })
    expect(newState.get('status')).toEqual('SUCCESS')

    // subscriber category
    const previousStateBusiness = { status: 'SUCCESS', data: fromJS({ category: 'business-wireline' }) }
    const newStateBusiness = reducer(fromJS(previousStateBusiness), {
      type: `${POST_ACCOUNT_IN_SESSION}_SUCCESS`,
      res: { ...resultData('business-wireline') }
    })
    expect(newStateBusiness.get('status')).toEqual('SUCCESS')
  })

  it('updates API_SEARCH state to success', () => {
    const newState = reducer(initialState, {
      type: `${API_SEARCH}_SUCCESS`,
      res: [{ title: 'xxx', content: '123-456-7891' }]
    })
    expect(newState.get('status')).toEqual('SUCCESS')

    // no search found
    const newStateNoResult = reducer(initialState, {
      type: `${API_SEARCH}_SUCCESS`,
      res: []
    })
    expect(newStateNoResult.get('data').toJS()).toEqual({ loading: false, search: { searchValue: [], searchStatus: 'FAILURE' } })
  })

  it('updates POST_SUBSCRIBER_IN_SESSION state to success', () => {
    const newState = reducer(initialState, {
      type: `${POST_SUBSCRIBER_IN_SESSION}_SUCCESS`,
      res: [{ title: 'xxx', content: '123-456-7891' }]
    })
    expect(newState.get('status')).toEqual('SUCCESS')
  })
})
