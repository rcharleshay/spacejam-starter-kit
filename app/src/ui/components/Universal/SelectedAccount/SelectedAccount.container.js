import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { compose, mapImmutablePropsToPlainProps, withLocale } from '@telus/isomorphic-core'
import { reselectAccountAction, postAccountInSessionAction } from 'src/ui/redux/actions'
import SelectedAccount from './SelectedAccount.component'

const mapStateToProps = (state) => ({
  accounts: state.app.getIn(['data', 'account']),
  category: state.app.getIn(['data', 'category']),
  filter: state.app.getIn(['data', 'filter'])
})

const mapDispatchToProps = {
  reselectAccountAction,
  postAccountInSessionAction,
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  mapImmutablePropsToPlainProps
)(withLocale(withRouter(SelectedAccount)))
