import React, { Fragment, useState } from 'react'
import renderHtml from 'react-render-html'
import DecorativeIcon from '@tds/core-decorative-icon'
import { withLocale } from '@telus/isomorphic-core'
import { formatString } from 'src/ui/utils/format'
import { LARGE_ACCOUNT_LIMIT } from 'src/config/constants'
import types from 'prop-types'
import translations from 'src/config/translations'
import tabData from 'src/ui/utils/tabData'

import * as S from 'src/ui/assets/style'

const SearchBox = ({ lang, localSearchAction, searchType, searchStatus, clearSearchAction, apiSearchAction, subscriberCount, location, category }) => {
  const {
    searchForAnAccount,
    searchForASubscriber,
    searchForASubscriberHint,
    validAccountNumber,
    validSubscriberNumber,
    accountFound,
    subscriberFound,
    searchAgain,
    cantFindYourAccount,
    searchForAnAccountHint,
    noSubscriberFound,
    cantFindYourSubscriber
  } = translations(lang)

  const { pathname } = location
  const { text } = tabData(pathname)
  const serviceTitle = translations(lang)[text]

  const [inputValue, setInputValue] = useState('')
  const [hasError, setError] = useState(false)

  const isSearchEnabled = inputValue.length > 0

  const setInput = (value) => {
    setInputValue(value)
  }

  const handleInputUpdate = ({ target: { value } }) => setInput(value)
  const handleClearSearch = () => {
    setError(false)
    setInput('')
    clearSearchAction()
  }
  let headingTitle = ''
  const searchTitle = searchType === 'account' ? searchForAnAccount : searchForASubscriber

  const validAccountNumberMessage = validAccountNumber.split('$$$')
  const validAccountNumberLink = `${validAccountNumberMessage[0]} <a style="color:#2a2c2e" target="_blank" href="https://www.telus.com/my-account/profile/link">${validAccountNumberMessage[1]}</a>`

  const subscriberTooltip = cantFindYourSubscriber.split('$$$')
  const subscriberTooltipText = `${subscriberTooltip[0]} <a style="color:#2a2c2e" target="_blank" href="https://www.telus.com/support/article/locate-your-telus-account-number#business">${subscriberTooltip[1]}</a>${subscriberTooltip[2]}`

  const accountTooltip = cantFindYourAccount.split('$$$')
  const accountTooltipText = `${accountTooltip[0]} <a style="color:#2a2c2e" target="_blank" href="https://www.telus.com/support/article/locate-your-telus-account-number#business">${accountTooltip[1]}</a>${accountTooltip[2]}`

  const validateData = () => {
    const regex = searchType === 'subscriber' ? /^(1\s?)?((\([0-9]{3}\))|[0-9]{3})[\s\-]?[\0-9]{3}[\s\-]?[0-9]{4}$/ : /^[-./0-9]*$/ // eslint-disable-line

    const validData = regex.test(inputValue)
    if(!validData) {
      setError(searchType === 'account' ? validAccountNumberLink : validSubscriberNumber)
      return false
    }
    return true
  }

  if (searchStatus === 'SUCCESS') {
    headingTitle = searchType === 'account' ? accountFound : subscriberFound
  }
  const hintText = searchType === 'account' ? formatString(searchForAnAccountHint, 'serviceName', serviceTitle) : searchForASubscriberHint


  const handleSubmit = (event) => {
    event.preventDefault()
    setError(false)
    clearSearchAction()
    const isValid = validateData()
    if(isValid) {
      if (searchType === 'subscriber' && subscriberCount > LARGE_ACCOUNT_LIMIT) {
        apiSearchAction(inputValue.replace(/\D+/g, ''), category)
      } else {
        localSearchAction(inputValue.replace(/\D+/g, ''))
      }
    }
  }

  let noFoundError = ''
  if (searchStatus === 'FAILURE')
    noFoundError = (searchType === 'account' ? validAccountNumberLink : noSubscriberFound)

  let error = ''
  if(hasError)
    error = hasError

  return (
    <Fragment>
      <S.Box>
        <S.SearchForm onSubmit={handleSubmit}>
          <S.SearchContainer>
            <S.Input
              id="account-search"
              name="search-input"
              value={inputValue}
              label={searchTitle}
              onChange={handleInputUpdate}
              tooltip={
                <S.Tooltip data-test={`find-your-${searchType}-tooltip`} copy={lang}>
                  {searchType === 'account' ? renderHtml(accountTooltipText) : renderHtml(subscriberTooltipText)}
                </S.Tooltip>
              }
              hintPosition="below"
              hint={hintText}
              error={renderHtml(error) || renderHtml(noFoundError)}
              data-di-mask
            />
            <S.SearchIconContainerEnabled type="submit" data-test="search-button-enabled" style={{ display: isSearchEnabled ? 'block' : 'none' }}>
              <DecorativeIcon symbol="spyglass" size={32} variant="inverted" />
            </S.SearchIconContainerEnabled>

            <S.SearchIconContainerDisabled type="submit" aria-label="disabled search button" data-test="search-button-disabled" style={{ display: isSearchEnabled ? 'none' : 'block' }}>
              <DecorativeIcon symbol="spyglass" size={32} variant="secondary" />
            </S.SearchIconContainerDisabled>
          </S.SearchContainer>
        </S.SearchForm>
        <S.Box horizontal={2} vertical={3} style={{ display: searchStatus ? 'block' : 'none', paddingLeft: 0 }}>
          <S.Box inline between={2}>
            {headingTitle && <S.Heading data-test={`${searchType}-found`} level="h3">{headingTitle}</S.Heading>}
            <div style={{ marginTop: 3 }}>
              <S.CoreLink data-test="search-again-link" href="#" onClick={handleClearSearch}>
                {searchAgain}
              </S.CoreLink>
            </div>
          </S.Box>
        </S.Box>
      </S.Box>
    </Fragment>
  )
}

SearchBox.defaultProps = {
  localSearchAction: () => ({}),
  clearSearchAction: () => ({}),
  apiSearchAction: () => ({}),
  searchType: '',
  searchStatus: '',
  subscriberCount: 0,
  category: 'mobility'
}

SearchBox.propTypes = {
  lang: types.string.isRequired,
  localSearchAction: types.func,
  clearSearchAction: types.func,
  apiSearchAction: types.func,
  searchType: types.string,
  searchStatus: types.string,
  subscriberCount: types.number,
  location: types.shape({
    pathname: types.string.isRequired
  }).isRequired,
  category: types.string
}

export default withLocale(SearchBox)
