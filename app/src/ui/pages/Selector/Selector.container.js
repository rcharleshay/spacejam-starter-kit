import { connect } from 'react-redux'
import { compose, mapImmutablePropsToPlainProps, withLocale } from '@telus/isomorphic-core'
import Selector from './Selector.component'

export const mapStateToProps = (state) => {
  return {
    category: state.app.getIn(['data', 'category']),
    context: state.app.getIn(['data', 'context']),
    filter: state.app.getIn(['data', 'filter'])
  }
}

export const mapDispatchToProps = {}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  mapImmutablePropsToPlainProps
)(withLocale(Selector))
