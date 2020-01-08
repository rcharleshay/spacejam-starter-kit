import React from 'react'
import { withLocale } from '@telus/isomorphic-core'
import { withRouter } from 'react-router'
import TdsHeading from '@tds/core-heading'
import types from 'prop-types'
import translations from 'src/config/translations'
import * as S from 'src/ui/assets/style'

const Header = ({ lang, accountType }) => {
  const { selectASubscriber, selectAnAccount } = translations(lang)
  const title = accountType === 'account' ? selectAnAccount : selectASubscriber
  return (
    <S.Box between={2}>
      <TdsHeading data-test-id={`heading-${accountType}`} level="h1">
        {title}
      </TdsHeading>
    </S.Box>
  )
}

Header.propTypes = {
  lang: types.string.isRequired,
  accountType: types.string.isRequired
}

export default withRouter(withLocale(Header))
