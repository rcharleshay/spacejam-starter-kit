import React from 'react'
import types from 'prop-types'
import useAnalytics from 'src/ui/utils/useAnalytics'
import Account from 'src/ui/components/Selector/Account'
import Subscriber from 'src/ui/components/Selector/Subscriber'
import Error from 'src/ui/components/Universal/Error'
import Redirect from 'src/ui/components/Universal/Redirect'

const Selector = ({ category, context, filter, prov, lang }) => {
  useAnalytics(category, filter, prov, lang)

  switch (context) {
    case 'redirect':
      return <Redirect />
    case 'error':
      return <Error />
    case 'subscriber':
      return <Subscriber />
    default:
      return <Account />
  }
}

Selector.defaultProps = {
  filter: undefined,
  category: '',
}

Selector.propTypes = {
  context: types.string.isRequired,
  category: types.string,
  filter: types.oneOfType([types.string, types.bool]),
  prov: types.string.isRequired,
  lang: types.string.isRequired
}

export default Selector
