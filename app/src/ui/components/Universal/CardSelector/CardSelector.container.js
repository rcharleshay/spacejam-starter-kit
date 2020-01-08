import { connect } from 'react-redux'
import { compose, mapImmutablePropsToPlainProps } from '@telus/isomorphic-core'
import { formatPhoneNumber } from 'src/ui/utils/format'
import CardSelector from './CardSelector.component'

const mapStateToProps = (state) => {
  const isLoading = state.app.get('status') !== 'SUCCESS'
  const searchData = state.app.getIn(['data', 'search'])
  const contextType = state.app.getIn(['data', 'context'])
  let searchCards = []
  const searchStatus = (searchData ? searchData.toJS().searchStatus : '')
  const searchValue = (searchData ? searchData.toJS().searchValue : [])
  if(searchStatus === 'SUCCESS' && searchValue.length > 0) {
    searchCards = contextType === 'subscriber' ?
      searchValue.map((s) => ({ content: formatPhoneNumber(s.content),  encryptedSub: s.encryptedSub, fullName: s.fullName || s.title })) : searchValue
  }
  return {
    searchCards,
    searchStatus,
    contextType,
    isLoading
  }
}

const mapDispatchToProps = {}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  mapImmutablePropsToPlainProps
)(CardSelector)
