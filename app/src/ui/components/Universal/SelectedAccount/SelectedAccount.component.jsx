import React, { Fragment } from 'react'
import types from 'prop-types'
import Box from '@tds/core-box'
import Responsive from '@tds/core-responsive'
import { withLocale } from '@telus/isomorphic-core'
import translations from 'src/config/translations'
import tabData from 'src/ui/utils/tabData'
import * as S from 'src/ui/assets/style'

const SelectedAccount = ({
  category,
  filter,
  lang,
  account,
  numberOfSubs,
  reselectAccountAction,
  postAccountInSessionAction,
  accounts,
  location
}) => {
  const { accountTitle, change, currentSelectedAccountTitle, subscribers } = translations(lang)
  const multiAccount = accounts.length > 1
  const { pathname } = location
  const { text } = tabData(pathname)
  const serviceTitle = translations(lang)[text]

  const renderAccountDetails = () => {
    const handleChangeAccount = (accountNum) => {
      reselectAccountAction()
      return postAccountInSessionAction(category, filter, { ...accounts.find(({ content }) => content === accountNum) })
    }

    return (
      <Fragment>
        <S.Heading data-test="account-number" aria-label="account number container" level="h3" data-di-mask="true">
          {account && `${accountTitle} #${account}`}
        </S.Heading>
        <Box style={{ marginTop: 3, display: account ? 'block' : 'none' }}>
          {multiAccount && (
            <Fragment>
              <Responsive minWidth="md" render={() => <Fragment>{` | `}</Fragment>} />
              <S.ChangeAccountLink data-test="change-account-link" onClick={handleChangeAccount}>
                {`  ${change}`}
              </S.ChangeAccountLink>
            </Fragment>
          )}
        </Box>
      </Fragment>
    )
  }

  return (
    <S.Box horizontal={2} vertical={3}>
      <S.Box style={{ paddingBottom: '0.5rem' }}>
        <S.Text data-test="current-selected-account-text" size="small">
          {account && `${currentSelectedAccountTitle}`}
        </S.Text>
      </S.Box>
      <Responsive minWidth="md">
        {(matches) =>
          matches ? (
            <S.Box inline between={2}>
              {renderAccountDetails(account, multiAccount, accountTitle, reselectAccountAction, change)}
            </S.Box>
          ) : (
            <S.Box between={2}>{renderAccountDetails(account, multiAccount, accountTitle, reselectAccountAction, change)}</S.Box>
          )
        }
      </Responsive>
      <S.Box vertical={2}>
        <S.Text data-test={`selected-${serviceTitle}`} size="medium">
          {numberOfSubs > 0 && `${serviceTitle} | ${numberOfSubs} ${subscribers}`}
        </S.Text>
      </S.Box>
    </S.Box>
  )
}

SelectedAccount.defaultProps = {
  account: '',
  numberOfSubs: 0
}

SelectedAccount.propTypes = {
  category: types.string.isRequired,
  filter: types.string.isRequired,
  lang: types.string.isRequired,
  account: types.string,
  accounts: types.array.isRequired,
  numberOfSubs: types.number,
  reselectAccountAction: types.func.isRequired,
  postAccountInSessionAction: types.func.isRequired,
  location: types.shape({
    pathname: types.string.isRequired
  }).isRequired
}

export default withLocale(SelectedAccount)
