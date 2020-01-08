import React, { Fragment } from 'react'
import Box from '@tds/core-box'
import Spinner from '@tds/core-spinner'
import types from 'prop-types'

const PageSpinner = ({ loading, children }) => {
  const spinnerStyle = {
    display: loading ? 'flex' : 'none',
    position: 'fixed',
    top: 'calc(50% - 50px)',
    left: 'calc(50% - 50px)'
  }
  const pageStyle = { display: loading ? 'none' : 'block' }

  return (
    <Fragment>
      <Box style={spinnerStyle}>
        <Spinner spinning={true} label="" />
      </Box>
      <Box style={pageStyle}>{children}</Box>
    </Fragment>
  )
}

PageSpinner.propTypes = {
  loading: types.bool.isRequired,
  children: types.node.isRequired
}

export default PageSpinner
