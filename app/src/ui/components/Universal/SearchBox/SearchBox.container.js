import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { compose, mapImmutablePropsToPlainProps, withLocale } from '@telus/isomorphic-core'
import { localSearchAction, clearSearchAction, apiSearchAction } from 'src/ui/redux/actions'
import SearchBox from './SearchBox.component'

const mapStateToProps = (state) => {
  const searchData = state.app.getIn(['data', 'search'])
  const searchType = state.app.getIn(['data', 'context'])
  const category = state.app.getIn(['data', 'category'])
  const searchStatus = searchData ? searchData.toJS().searchStatus : ''
  const activeAccountNumber = state.app.getIn(['data', 'activeAccount']) || ''
  const accounts = state.app.getIn(['data', 'account'])
  const activeAccountObject = accounts.toJS().filter((x) => x.content === activeAccountNumber)
  const subscriberCount = activeAccountObject.length > 0 ? activeAccountObject[0].numberOfSubs : 0

  return {
    searchType,
    searchStatus,
    subscriberCount,
    category
  }
}

const mapDispatchToProps = {
  localSearchAction,
  clearSearchAction,
  apiSearchAction
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  mapImmutablePropsToPlainProps
)(withLocale(withRouter(SearchBox)))
