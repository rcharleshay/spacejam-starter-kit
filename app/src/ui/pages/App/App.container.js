import { connect } from 'react-redux'
import { compose, mapImmutablePropsToPlainProps, withLocale } from '@telus/isomorphic-core'
import { stopLoadingAction } from 'src/ui/redux/actions'
import App from './App.component'

export const mapStateToProps = (state) => ({
  loading: state.app.getIn(['data', 'loading'])
})

export const mapDispatchToProps = {
  stopLoadingAction
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  mapImmutablePropsToPlainProps
)(withLocale(App))
