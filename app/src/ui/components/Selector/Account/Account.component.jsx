import React from 'react'
import types from 'prop-types'
import Header from 'src/ui/components/Universal/Header'
import PageSpinner from 'src/ui/components/Universal/PageSpinner'
import SearchBox from 'src/ui/components/Universal/SearchBox'
import CardSelector from 'src/ui/components/Universal/CardSelector'
import TabSelector from 'src/ui/components/Universal/TabSelector'
import SelectedAccount from 'src/ui/components/Universal/SelectedAccount'
import * as S from 'src/ui/assets/style'

const Account = ({ accounts, postAccountInSessionAction, filter, category, isLoading, clearSearchAction, numberOfAccounts }) => {
  const addAccountToSession = (accountNum) => {
    clearSearchAction()
    return postAccountInSessionAction(category, filter, accounts.find(({ content }) => content === accountNum), numberOfAccounts)
  }

  return (
    <PageSpinner loading={isLoading}>
      <S.Box horizontal={4}>
        <Header accountType="account" />
        <SelectedAccount />
        <TabSelector />
        <S.HairlineDivider />
        <S.FlexGrid limitWidth={false} gutter={false}>
          <S.Row>
            <S.Col md={6} lg={5} xl={3}>
              <SearchBox />
            </S.Col>
          </S.Row>
          <S.Row>
            <S.Col md={12} lg={12} xl={9}>
              <CardSelector cards={accounts} onClick={addAccountToSession} />
            </S.Col>
          </S.Row>
        </S.FlexGrid>
      </S.Box>
    </PageSpinner>
  )
}

Account.defaultProps = {
  filter: undefined
}

Account.propTypes = {
  clearSearchAction: types.func.isRequired,
  postAccountInSessionAction: types.func.isRequired,
  accounts: types.arrayOf(types.object).isRequired,
  category: types.string.isRequired,
  filter: types.oneOfType([types.string, types.bool]),
  isLoading: types.bool.isRequired,
  numberOfAccounts: types.number.isRequired
}

export default Account
