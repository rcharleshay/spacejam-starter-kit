import Immutable from 'immutable'
import { combineReducers } from 'redux'
import * as A from 'src/ui/redux/actions'

const defaultState = Immutable.fromJS({
  status: 'UNINIT',
  data: {}
})

const appReducer = (state = defaultState, action) => {
  switch (action.type) {
    case A.INITIALIZE_APP_FROM_SERVER:
      return state.withMutations((st) => {
        st.set('status', 'SUCCESS')
        st.set('data', Immutable.fromJS(action.value))
      })
    default:
      return state
  }
}

export default combineReducers({
  app: appReducer
})
