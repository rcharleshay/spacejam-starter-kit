import { connect } from 'react-redux'
import { compose, mapImmutablePropsToPlainProps } from '@telus/isomorphic-core'
import {} from 'src/ui/redux/actions'
import Header from './Header.component'

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  mapImmutablePropsToPlainProps
)(Header)
