import Immutable from 'immutable'
import {
  POST_ACCOUNT_IN_SESSION,
  POST_SUBSCRIBER_IN_SESSION,
  INITIALIZE_APP_FROM_SERVER,
  RESELECT_ACCOUNT,
  LOCAL_SEARCH,
  API_SEARCH,
  CLEAR_SEARCH,
  STOP_LOADING,
  POST_SUBSCRIBERS,
  SET_SUBSCRIBERS_FETCHED,
  CHANGE_CONTEXT
} from 'src/ui/redux/actions/app.action'

const defaultState = Immutable.fromJS({
  status: 'UNINIT',
  data: {}
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case `${POST_ACCOUNT_IN_SESSION}_REQUEST`:
      return state.withMutations((st) => {
        st.set('status', 'PENDING')
      })

    case `${POST_SUBSCRIBER_IN_SESSION}_REQUEST`:
      return state.withMutations((st) => {
        st.set('status', 'PENDING')
      })

    case `${POST_SUBSCRIBERS}_REQUEST`:
      return state.withMutations((st) => {
        const previousState = st.get('data').toJS()
        st.set('data', Immutable.fromJS({ ...previousState, loading: true }))
      })

    case `${API_SEARCH}_REQUEST`:
      return state.withMutations((st) => {
        const previousState = st.get('data').toJS()
        st.set('data', Immutable.fromJS({ ...previousState, loading: true }))
      })

    case `${POST_ACCOUNT_IN_SESSION}_FAILURE`:
      return state.withMutations((st) => {
        const previousState = st.get('data').toJS()
        st.set('status', 'FAILURE')
        st.set('data', Immutable.fromJS({ ...previousState, context: 'error' }))
      })

    case `${POST_SUBSCRIBERS}_FAILURE`:
      return state.withMutations((st) => {
        const previousState = st.get('data').toJS()
        st.set('status', 'FAILURE')
        st.set('data', Immutable.fromJS({ ...previousState, context: 'error' }))
      })

    case `${POST_SUBSCRIBER_IN_SESSION}_FAILURE`:
      return state.withMutations((st) => {
        const previousState = st.get('data').toJS()
        st.set('status', 'FAILURE')
        st.set('data', Immutable.fromJS({ ...previousState, context: 'error' }))
      })

    case `${API_SEARCH}_FAILURE`:
      return state.withMutations((st) => {
        const previousState = st.get('data').toJS()
        st.set('status', 'SUCCESS')
        st.set('data', Immutable.fromJS({ ...previousState, loading: false, search: { searchValue: [], searchStatus: 'FAILURE' } }))
      })

    case `${POST_SUBSCRIBERS}_SUCCESS`:
      return state.withMutations((st) => {
        const previousState = st.get('data').toJS()
        const context = action.res.subscribers.length === 1 ? 'redirect' : 'subscriber'
        st.set('status', 'SUCCESS')
        st.set(
          'data',
          Immutable.fromJS({ ...previousState, subscriber: action.res.subscribers, loading: false, search: {}, context, subscribersFetched: true })
        )
      })

    case `${POST_ACCOUNT_IN_SESSION}_SUCCESS`:
      return state.withMutations((st) => {
        const previousState = st.get('data').toJS()
        const category = previousState.category
        const filter = previousState.filter
        st.set('status', 'SUCCESS')
        if (category === 'mobility' && filter !== 'account')
          if (Object.keys(action.res[category]).length === 0)
            st.set('data', Immutable.fromJS({ ...previousState, activeAccount: '', session: action.res, context: 'account' }))
          else if (action.res[category].numberOfSubs > 0)
            st.set(
              'data',
              Immutable.fromJS({ ...previousState, activeAccount: action.res[category].account, session: action.res, context: 'subscriber' })
            )
          else
            st.set('data', Immutable.fromJS({ ...previousState, activeAccount: action.res[category].account, session: action.res, context: 'error' }))
        else
          st.set(
            'data',
            Immutable.fromJS({ ...previousState, activeAccount: action.res[category].account, session: action.res, context: 'redirect' })
          )
      })

    case `${API_SEARCH}_SUCCESS`:
      return state.withMutations((st) => {
        const previousState = st.get('data').toJS()
        st.set('status', 'SUCCESS')
        const searchStatus = action.res.length > 0 ? 'SUCCESS' : 'FAILURE'
        st.set('data', Immutable.fromJS({ ...previousState, loading: false, search: { searchValue: action.res, searchStatus } }))
      })

    case `${POST_SUBSCRIBER_IN_SESSION}_SUCCESS`:
      return state.withMutations((st) => {
        const previousState = st.get('data').toJS()
        st.set('status', 'SUCCESS')
        st.set('data', Immutable.fromJS({ ...previousState, context: 'redirect' }))
      })

    case INITIALIZE_APP_FROM_SERVER:
      return state.withMutations((st) => {
        st.set('status', 'SUCCESS')
        st.set('data', Immutable.fromJS(action.value))
      })

    case RESELECT_ACCOUNT:
      return state.withMutations((st) => {
        const previousState = st.get('data').toJS()
        st.set('status', 'SUCCESS')
        st.set('data', Immutable.fromJS({ ...previousState, context: 'account', subscriber: [], search: {}, subscribersFetched: false }))
      })

    case CLEAR_SEARCH:
      return state.withMutations((st) => {
        const previousState = st.get('data').toJS()
        st.set('status', 'SUCCESS')
        st.set('data', Immutable.fromJS({ ...previousState, search: {} }))
      })

    case STOP_LOADING:
      return state.withMutations((st) => {
        const previousState = st.get('data').toJS()
        st.set('status', 'SUCCESS')
        st.set('data', Immutable.fromJS({ ...previousState, loading: false }))
      })

    case LOCAL_SEARCH: {
      return state.withMutations((st) => {
        const previousState = st.get('data').toJS()
        const subs = previousState.subscriber || []
        const accountFound = previousState.account.filter((b) => b.content === +action.searchValue || b.content === action.searchValue.toString())
        const searchType = previousState.context
        const subFound =
          searchType &&
          searchType !== 'account' &&
          subs.filter((s) => s.content === action.searchValue || s.content.split('-').join('') === action.searchValue.split('-').join(''))
        const previousSearch = {
          searchValue: [],
          searchStatus: 'UNINIT'
        }
        switch (searchType) {
          case 'account':
            if (accountFound && accountFound.length > 0) {
              const search = { ...previousSearch, searchValue: accountFound, searchStatus: 'SUCCESS' }
              st.set('data', Immutable.fromJS({ ...previousState, search }))
            } else {
              const search = { ...previousSearch, searchValue: [], searchStatus: 'FAILURE' }
              st.set('data', Immutable.fromJS({ ...previousState, search }))
            }
            break

          case 'subscriber':
            if (subFound && subFound.length > 0 && subs.length > 0) {
              const search = { ...previousSearch, searchValue: subFound, searchStatus: 'SUCCESS' }
              st.set('data', Immutable.fromJS({ ...previousState, search }))
            } else {
              const search = { ...previousSearch, searchValue: [], searchStatus: 'FAILURE' }
              st.set('data', Immutable.fromJS({ ...previousState, search }))
            }
            break

          default:
            st.set('data', Immutable.fromJS({ ...previousState, search: previousSearch }))
        }
      })
    }

    case SET_SUBSCRIBERS_FETCHED:
      return state.withMutations((st) => {
        const previousState = st.get('data').toJS()
        st.set('status', 'SUCCESS')
        st.set('data', Immutable.fromJS({ ...previousState, subscribersFetched: true }))
      })

    case CHANGE_CONTEXT:
      return state.withMutations((st) => {
        const previousState = st.get('data').toJS()
        st.set('status', 'SUCCESS')
        st.set('data', Immutable.fromJS({ ...previousState, context: action.context }))
      })

    default:
      return state
  }
}
