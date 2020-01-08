import { connect } from 'react-redux'
import { compose, withLocale, mapImmutablePropsToPlainProps } from '@telus/isomorphic-core'
import { postSubscriberInSessionAction, postSubscribersAction, setSubscribersFetchedAction, changeContextAction } from 'src/ui/redux/actions'
import { LARGE_ACCOUNT_LIMIT } from 'src/config/constants'
import Subscriber from './Subscriber.component'

export const mapStateToProps = (state) => {
  const category = state.app.getIn(['data', 'category'])
  const isLoading = state.app.get('status') !== 'SUCCESS'
  const activeAccount = state.app.getIn(['data', 'activeAccount'])
  const accounts = state.app.getIn(['data', 'account'])
  const filteredSubs = state.app.getIn(['data', 'subscriber'])
  const subscribersFetched = state.app.getIn(['data', 'subscribersFetched'])
  const activeAccountObject = accounts ? accounts.toJS().find(({ content }) => content === activeAccount) : []
  const { numberOfSubs, email } = activeAccountObject
  const isLargeSub = numberOfSubs > LARGE_ACCOUNT_LIMIT
  const cards = filteredSubs ? filteredSubs.toJS().map((s) => ({ content: s.content, encryptedSub: s.encryptedSub, fullName: s.fullName })) : []
  const fetchSubs = !isLargeSub

  return {
    isLargeSub,
    cards,
    activeAccountObject,
    isLoading,
    fetchSubs,
    category,
    email,
    subscribersFetched
  }
}

export const mapDispatchToProps = {
  postSubscriberInSessionAction,
  setSubscribersFetchedAction,
  postSubscribersAction,
  changeContextAction
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  mapImmutablePropsToPlainProps
)(withLocale(Subscriber))
