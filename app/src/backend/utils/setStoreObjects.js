import { INITIALIZE_ACCOUNT_FROM_SERVER } from 'src/ui/redux/actions/app.action'

export const setCancelledOrSuspendedError = (locals, account, category, filter) => {
  locals.store = {
    type: INITIALIZE_ACCOUNT_FROM_SERVER,
    value: {
      loading: true,
      context: 'error',
      account,
      numberOfAccounts: account.length,
      category,
      filter
    }
  }
}

export const setErrorStoreObject = (locals, errMsg) => {
  locals.store = {
    type: INITIALIZE_ACCOUNT_FROM_SERVER,
    value: {
      loading: true,
      context: 'error',
      errMsg
    }
  }
}

export const setMultiAccountStoreObject = (locals, account, category, filter) => {
  locals.store = {
    type: INITIALIZE_ACCOUNT_FROM_SERVER,
    value: {
      loading: true,
      account,
      numberOfAccounts: account.length,
      context: 'account',
      category,
      filter
    }
  }
}

export const setLargeMultiSubStoreObject = (locals, account, category, session, content) => {
  const activeAccount = content || account[0].content
  locals.store = {
    type: INITIALIZE_ACCOUNT_FROM_SERVER,
    value: {
      loading: true,
      numberOfAccounts: account.length,
      account,
      activeAccount,
      session,
      context: 'subscriber',
      category,
      isLargeSub: true,
      filter: 'subscriber'
    }
  }
}

export const setSmallMultiSubStoreObject = (locals, account, subscriber, category, session, content) => {
  const activeAccount = content || account[0].content
  locals.store = {
    type: INITIALIZE_ACCOUNT_FROM_SERVER,
    value: {
      loading: true,
      numberOfAccounts: account.length,
      account,
      activeAccount,
      session,
      context: 'subscriber',
      category,
      isLargeSub: false,
      filter: 'subscriber',
      subscriber
    }
  }
}
