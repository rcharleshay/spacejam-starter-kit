import { connect } from 'react-redux'
import { compose, mapImmutablePropsToPlainProps } from '@telus/isomorphic-core'
import { postAccountInSessionAction, clearSearchAction } from 'src/ui/redux/actions'
import Account from './Account.component'

const mapStateToProps = (state) => {
  return {
    isLoading: state.app.get('status') !== 'SUCCESS',
    accounts: state.app.getIn(['data', 'account']),
    activeAccount: state.app.getIn(['data', 'activeAccount']),
    category: state.app.getIn(['data', 'category']),
    filter: state.app.getIn(['data', 'filter']),
    numberOfAccounts: state.app.getIn(['data', 'numberOfAccounts'])
  }
}

const mapDispatchToProps = {
  postAccountInSessionAction,
  clearSearchAction
}

export default compose(connect(mapStateToProps, mapDispatchToProps), mapImmutablePropsToPlainProps)(Account)
