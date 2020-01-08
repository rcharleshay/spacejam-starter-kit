import React, { Fragment } from 'react'
import types from 'prop-types'
import Pagination from '@tds/community-pagination'
import { withLocale } from '@telus/isomorphic-core'
import DecorativeIcon from '@tds/core-decorative-icon'
import TdsHeading from '@tds/core-heading'
import translations from 'src/config/translations'
import * as S from './CardSelector.style'

const CardSelector = ({ cards, lang, searchCards, searchStatus, contextType, isLoading, isLargeSub, onClick }) => {
  const { orSelectASubscriberFromTheListBelow, orSelectAnAccountFromTheListBelow, nameNotAvailable } = translations(lang)

  const headingTitle = () => {
    if (searchStatus) return ''
    if (contextType === 'account') return orSelectAnAccountFromTheListBelow
    return orSelectASubscriberFromTheListBelow
  }

  const displayCards = () => {
    if (searchStatus === 'SUCCESS') return searchCards || cards
    if (searchStatus === 'FAILURE') return []
    return cards
  }

  const groupList = (n, items) => {
    return items.reduce((list, item, i) => {
      i % n === 0 ? list.push([item]) : list[list.length - 1].push(item)
      return list
    }, [])
  }

  const paginate = (items) => {
    return items.length > 10 / 2 ? (
      <Pagination copy={lang}>
        {groupList(10 / 2, items).map((panelContent, i) => (
          <Pagination.Panel key={`accounts-panel-${i}`}>
            <S.CardBox>{panelContent}</S.CardBox>
          </Pagination.Panel>
        ))}
      </Pagination>
    ) : (
      items
    )
  }

  const renderCard = (content, productInstanceId = '', encryptedSub = '', fullName = '') => {
    const displayName = () => {
      if (contextType === 'subscriber') {
        const nameLength = fullName.length
        if (nameLength === 0) return nameNotAvailable
        else if (nameLength > 0 && nameLength <= 14) return fullName
        else return `${fullName.substr(0, 14)}...`
      }
      return ''
    }

    return (
      <S.CardSelectorContainer
        data-test="card-selector-container"
        onClick={() => onClick(content, encryptedSub, fullName, productInstanceId, cards.length)}
      >
        <S.CardBox inset={2}>
          {content && (
            <S.CardBox>
              <S.Text size="medium" data-di-mask="true">
                {displayName()}
              </S.Text>
              <S.Text size="medium" data-di-mask="true">
                {content}
              </S.Text>
            </S.CardBox>
          )}
          <S.CardSelectorIconContainer>
            <DecorativeIcon symbol="chevron" variant="secondary" />
          </S.CardSelectorIconContainer>
        </S.CardBox>
      </S.CardSelectorContainer>
    )
  }

  const showCards = displayCards()
  const smallAccount = !isLargeSub && searchStatus === '' && showCards.length > 0
  const apiSearch = isLargeSub && searchStatus === 'SUCCESS' && showCards.length > 0
  const localSearch = !isLargeSub && showCards.length > 0
  const heading = headingTitle()
  return (
    !isLoading &&
    (smallAccount || apiSearch || localSearch) && (
      <Fragment>
        {heading && (
          <S.CardBox between={3} vertical={3}>
            <TdsHeading data-test={`card-selector-${contextType}-title`} level="h3">
              {heading}
            </TdsHeading>
          </S.CardBox>
        )}
        {paginate(
          groupList(2, showCards).map((pair, i) => (
            <S.Row key={`account-${i}`}>
              {pair.map(({ title, content, productInstanceId, encryptedSub, fullName }, j) => (
                <S.Col key={`account-${i}-${j}`} md={6} xs={12} lg={5} xl={4}>
                  <S.PaddedDiv rightPad={j % 2 === 0} leftPad={j % 2 === 1}>
                    {renderCard(content, productInstanceId, encryptedSub, fullName)}
                  </S.PaddedDiv>
                </S.Col>
              ))}
            </S.Row>
          ))
        )}
      </Fragment>
    )
  )
}

CardSelector.defaultProps = {
  onClick: () => ({}),
  searchStatus: '',
  searchCards: [],
  isLargeSub: false
}

CardSelector.propTypes = {
  cards: types.array.isRequired,
  searchCards: types.array,
  onClick: types.func,
  lang: types.string.isRequired,
  searchStatus: types.string,
  contextType: types.string.isRequired,
  isLoading: types.bool.isRequired,
  isLargeSub: types.bool
}

export default withLocale(CardSelector)
