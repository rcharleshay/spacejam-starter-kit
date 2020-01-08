import React from 'react'
import types from 'prop-types'
import Box from '@tds/core-box'
import DecorativeIcon from '@tds/core-decorative-icon'
import ChevronLink from '@tds/core-chevron-link'
import { withLocale } from '@telus/isomorphic-core'
import translations from 'src/config/translations'
import * as S from 'src/ui/assets/style'

const errorStyle = {
  height: '70vh',
  width: '100vw',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  padding: `0 1rem`
}

const ErrorComponent = ({ lang, account, category, filter, reselectAccountAction, postAccountInSessionAction, noMatch }) => {
  const { somethingWentWrong, accountInformation, backToOverview, change } = translations(lang)
  const handleChangeAccount = (accountNum) => {
    reselectAccountAction()
    return postAccountInSessionAction(category, filter, { ...account.find(({ content }) => content === accountNum) })
  }

  return (
    <Box style={errorStyle}>
      <S.Heading level="h1">{somethingWentWrong}</S.Heading>
      <S.Text size="large" style={{ marginTop: '1rem' }}>
        {accountInformation}
      </S.Text>
      <S.Box vertical={4}>
        {!noMatch && account.length > 1 ? (
          <S.ChangeAccountChevronLink data-test="change-account-link" onClick={handleChangeAccount}>
            <S.StyledChevron direction="left">
              <DecorativeIcon symbol="leftChevron" size={16} />
            </S.StyledChevron>
            {` ${change}`}
          </S.ChangeAccountChevronLink>
        ) : (
          <ChevronLink direction="left" variant="secondary" href="/my-telus/overview">
            {backToOverview}
          </ChevronLink>
        )}
      </S.Box>
    </Box>
  )
}

ErrorComponent.defaultProps = {
  account: [],
  category: '',
  filter: '',
  noMatch: false
}

ErrorComponent.propTypes = {
  lang: types.string.isRequired,
  reselectAccountAction: types.func.isRequired,
  postAccountInSessionAction: types.func.isRequired,
  account: types.array,
  category: types.string,
  filter: types.string,
  noMatch: types.bool
}

export default withLocale(ErrorComponent)
