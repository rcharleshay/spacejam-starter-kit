import { connect } from 'react-redux'
import { compose, mapImmutablePropsToPlainProps, withLocale } from '@telus/isomorphic-core'
import { withRouter } from 'react-router'
import TabSelector from './TabSelector.component'

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  mapImmutablePropsToPlainProps
)(withLocale(withRouter(TabSelector)))
