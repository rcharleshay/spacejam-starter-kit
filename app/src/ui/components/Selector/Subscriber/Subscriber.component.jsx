import React, { useEffect } from 'react'
import types from 'prop-types'
import TdsHairlineDivider from '@tds/core-hairline-divider'
import { Internet } from '@tds/core-decorative-icon'
import translations from 'src/config/translations'
import { LARGE_ACCOUNT_LIMIT } from 'src/config/constants'
import Header from 'src/ui/components/Universal/Header'
import PageSpinner from 'src/ui/components/Universal/PageSpinner'
import NotificationBanner from 'src/ui/components/Universal/NotificationBanner'
import SearchBox from 'src/ui/components/Universal/SearchBox'
import CardSelector from 'src/ui/components/Universal/CardSelector'
import TabSelector from 'src/ui/components/Universal/TabSelector'
import SelectedAccount from 'src/ui/components/Universal/SelectedAccount'
import * as S from 'src/ui/assets/style'

const tabs = [{ icon: <Internet /> }]

const Subscriber = ({
  isLoading,
  lang,
  activeAccountObject,
  isLargeSub,
  cards,
  postSubscriberInSessionAction,
  setSubscribersFetchedAction,
  changeContextAction,
  subscribersFetched,
  fetchSubs,
  postSubscribersAction,
  category,
  email
}) => {
  const { overTwentySubsNotification } = translations(lang)
  const { content, numberOfSubs } = activeAccountObject
  const addSubscriberToSession = (number, encryptedSub, fullName, _,  cardsLength) => {
    return postSubscriberInSessionAction(category, { formattedPhoneNumber: number, fullName, encryptedSub, subscriber: number.split('-').join(''), numberOfSubs: isLargeSub ? numberOfSubs : cardsLength })
  }

  useEffect(() => {
    if (fetchSubs) postSubscribersAction(content, category, { email })
    else setSubscribersFetchedAction()
  }, [])

  useEffect(() => {
    if (subscribersFetched && numberOfSubs < LARGE_ACCOUNT_LIMIT && numberOfSubs > 0 && !cards.length) {
      changeContextAction('error')
    }
  }, [subscribersFetched])

  const notificationBanner = () => {
    return <NotificationBanner variant="warning">{overTwentySubsNotification}</NotificationBanner>
  }

  return (
    <PageSpinner loading={isLoading}>
      <S.Box horizontal={4}>
        <Header accountType="sub" />
        <SelectedAccount account={content} numberOfSubs={cards.length ? cards.length : numberOfSubs} />
        <TabSelector tabs={tabs} />
        <TdsHairlineDivider />
        <S.FlexGrid limitWidth={false} gutter={false}>
          {isLargeSub && (
            <S.Row>
              <S.Col>
                <S.Box style={{ marginTop: 29, maxWidth: 570 }}>{notificationBanner()}</S.Box>
              </S.Col>
            </S.Row>
          )}
          <S.Row>
            <S.Col md={6} lg={5} xl={3}>
              <SearchBox />
            </S.Col>
          </S.Row>
          <S.Row>
            <S.Col md={12} lg={12} xl={9}>
              <CardSelector isLargeSub={isLargeSub} cards={cards} onClick={addSubscriberToSession} />
            </S.Col>
          </S.Row>
        </S.FlexGrid>
      </S.Box>
    </PageSpinner>
  )
}

Subscriber.defaultProps = {
  subscribersFetched: false
}

Subscriber.propTypes = {
  subscribersFetched: types.bool,
  lang: types.string.isRequired,
  activeAccountObject: types.object.isRequired,
  isLargeSub: types.bool.isRequired,
  cards: types.array.isRequired,
  isLoading: types.bool.isRequired,
  postSubscriberInSessionAction: types.func.isRequired,
  setSubscribersFetchedAction: types.func.isRequired,
  changeContextAction: types.func.isRequired,
  fetchSubs: types.bool.isRequired,
  postSubscribersAction: types.func.isRequired,
  category: types.string.isRequired,
  email: types.string.isRequired
}

export default Subscriber
