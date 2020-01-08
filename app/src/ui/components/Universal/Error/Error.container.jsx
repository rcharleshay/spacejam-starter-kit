import { connect } from 'react-redux'
import { compose, mapImmutablePropsToPlainProps } from '@telus/isomorphic-core'
import { reselectAccountAction, postAccountInSessionAction } from 'src/ui/redux/actions'
import Error from './Error.component'

const mapStateToProps = (state) => {
  return {
    account: state.app.getIn(['data', 'account']),
    category: state.app.getIn(['data', 'category']),
    filter: state.app.getIn(['data', 'filter'])
  }
}

const mapDispatchToProps = {
  reselectAccountAction,
  postAccountInSessionAction
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  mapImmutablePropsToPlainProps
)(Error)
