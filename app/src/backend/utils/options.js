import config from 'src/config/ui'

const options = (req, target, more) => ({
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
    't-target': target,
    't-oauth2-token': req.universalCookies.cookies[config.authorizationProxy.cookieNames.oauth],
    't-session-token': req.universalCookies.cookies[config.authorizationProxy.cookieNames.session]
  },
  ...more
})

export default options
