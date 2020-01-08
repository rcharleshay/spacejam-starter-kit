import transformAccountData from 'src/ui/utils/transformAccountData'
import { postAccountInSession, getProduct, postCustomers, postSubscriberInSession } from 'src/ui/services/backendClient'

export const INITIALIZE_APP_FROM_SERVER = 'INITIALIZE_APP_FROM_SERVER'
export const POST_ACCOUNT_IN_SESSION = 'POST_ACCOUNT_IN_SESSION'
export const POST_SUBSCRIBER_IN_SESSION = 'POST_SUBSCRIBER_IN_SESSION'
export const RESELECT_ACCOUNT = 'RESELECT_ACCOUNT'
export const LOCAL_SEARCH = 'LOCAL_SEARCH'
export const API_SEARCH = 'API_SEARCH'
export const CLEAR_SEARCH = 'CLEAR_SEARCH'
export const STOP_LOADING = 'STOP_LOADING'
export const POST_SUBSCRIBERS = 'POST_SUBSCRIBERS'
export const SET_SUBSCRIBERS_FETCHED = 'SET_SUBSCRIBERS_FETCHED'
export const CHANGE_CONTEXT = 'CHANGE_CONTEXT'

export const postAccountInSessionAction = (category, filter, accountData, numberOfAccounts) => ({
  type: POST_ACCOUNT_IN_SESSION,
  promise: postAccountInSession(category, transformAccountData(category, filter, accountData, numberOfAccounts))
})

export const postSubscriberInSessionAction = (category, subscriberData) => ({
  type: POST_SUBSCRIBER_IN_SESSION,
  promise: postSubscriberInSession(category, subscriberData)
})

export const postSubscribersAction = (account, category, userData) => ({
  type: POST_SUBSCRIBERS,
  promise: postCustomers(account, category, userData)
})

export const reselectAccountAction = () => ({
  type: RESELECT_ACCOUNT
})

export const localSearchAction = (searchValue) => ({
  type: LOCAL_SEARCH,
  searchValue
})

export const apiSearchAction = (sub, category) => ({
  type: API_SEARCH,
  promise: getProduct(sub, category)
})

export const clearSearchAction = () => ({
  type: CLEAR_SEARCH
})

export const stopLoadingAction = () => ({
  type: STOP_LOADING
})

export const setSubscribersFetchedAction = () => ({
  type: SET_SUBSCRIBERS_FETCHED
})

export const changeContextAction = (context) => ({
  type: CHANGE_CONTEXT,
  context
})
