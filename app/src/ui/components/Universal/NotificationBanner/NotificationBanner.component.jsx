import React from "react"
import types from 'prop-types'
import * as S from "./NotificationBanner.style"

const NotificationBanner = ({ children, variant }) => (
  <S.NotificationBanner variant={variant}>
    {children}
  </S.NotificationBanner>
)

NotificationBanner.defaultProps = {}
NotificationBanner.propTypes = {
  children: types.node.isRequired,
  variant: types.string.isRequired
}

export default NotificationBanner
