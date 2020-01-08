import React from 'react'
import types from 'prop-types'
import { withRouter } from 'react-router'
import queryString from 'qs'
import PageSpinner from 'src/ui/components/Universal/PageSpinner'

const Redirect = ({ location }) => {
  const { search } = location
  const { rd = '/my-telus/overview' } = queryString.parse(search.substr(1))
  window.location.replace(rd)
  return <PageSpinner loading={true}>{rd}</PageSpinner>
}

Redirect.propTypes = {
  location: types.object.isRequired
}

export default withRouter(Redirect)
