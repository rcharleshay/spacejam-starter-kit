const config = require('../config')

const headerComponent = 'div#my-account-nav'
const mainApp = 'main#app'
const mainHeader = 'div#ge-header'

module.exports = {
  elements: {
    root: {
      selector: 'main#app'
    },

  mainHeader: {selector: 'header[id="ge-header"]'},

  // small subs selector

  /* Heading to Select a Subsciber */
  headerSelectSubscriber: {selector: 'h2[data-test="select-a-subscriber"]'},
  /* Current selection Container */
  labelCurrentSelection: {selector: 'h4[data-test="current-selection"]'},
  currentSelectionCard: {selector: 'div[data-test="current-selection-account-card"]'},
  /* Select a subscriber below section */
  labelSelectSubscriber: {selector: 'h3[data-test="select-a-subscriber"]'},
  listSelectSubscriber: {selector: 'div[data-test="select-a-subscriber-list"]'},

  // large subs selector

  /* accounts count and subscribers count */
  countAccounts: {selector: 'span[data-test="accounts-count"]'},
  countSubscribers: {selector: 'span[data-test="subscribers-count"]'},
  /* find a subscriber search box */
  labelFindSubscriber: {selector: 'label[  for="find-a-subscriber"]'},
  labelselectAnotherSubscriber: {selector: 'label[for="or-select-another-subscriber"]'},
  helperFindSubscriber: {selector: 'div[id="find-a-subscriber_helper"]'},
  helperselectAnotherSubscriber: {selector: 'div[id="or-select-another-subscriber_helper"]'},
  findSubsearchBox: {selector: 'input[id="find-a-subscriber"]'},
  findselectAnotherSubsearchBox: {selector: 'input[id="or-select-another-subscriber"]'},
  searchIconEnabled: {selector: 'i[data-test="search-icon-enabled"]'},
  searchIconDisabled: {selector: 'i[data-test="search-icon-disabled"]'},
  /* Current selection Banner */
  currentSelectionBanner: {selector: 'div[data-test="current-selection-large-subs"]'},

  //Search Results
  searchResultCard: {selector: 'div[data-test="search-result-account-card"]'},

  // Clear Search Results
  ButtonClearSearch: {selector: 'span[data-test="clear-search"]'},

  // error warnings for searchbox
  errorInputInvalid: {selector: 'div[id="find-a-subscriber_error-message"]'},

  },

  commands: [{

    validateSmallSubSelectorPageWithoutCurrentSelection(timeout = 10000) {
      return this
        .waitForElementPresent('@headerSelectSubscriber', timeout)
        .assert.elementPresent('@labelSelectSubscriber')
        .assert.elementPresent('@listSelectSubscriber')
        .assert.elementPresent('@mainHeader')
        .assert.elementNotPresent('@findSubsearchBox')
        .assert.elementNotPresent('@labelCurrentSelection')
        .assert.elementNotPresent('@currentSelectionCard')
    },

    validateSmallSubSelectorPageWithCurrentSelection(timeout = 10000) {
      return this
        .waitForElementPresent('@headerSelectSubscriber', timeout)
        .assert.elementPresent('@labelSelectSubscriber')
        .assert.elementPresent('@listSelectSubscriber')
        .assert.elementPresent('@mainHeader')
        .assert.elementPresent('@labelCurrentSelection')
        .assert.elementPresent('@currentSelectionCard')
        .assert.elementNotPresent('@findSubsearchBox')
    },

    validateLargeSubSelectorPageWithoutCurrentSelection(timeout = 10000) {
      return this
        .waitForElementPresent('@headerSelectSubscriber', timeout)
        .assert.elementPresent('@mainHeader')
        .assert.elementPresent('@countAccounts')
        .assert.elementPresent('@countSubscribers')
        .assert.elementPresent('@labelFindSubscriber')
        .assert.elementPresent('@helperFindSubscriber')
        .assert.elementPresent('@searchIconDisabled')
        .assert.elementNotPresent('@labelSelectSubscriber')
        .assert.elementNotPresent('@listSelectSubscriber')
        .assert.elementNotPresent('@labelCurrentSelection')
        .assert.elementNotPresent('@currentSelectionCard')
        .assert.elementNotPresent('@searchResultCard')
        .assert.elementNotPresent('@searchIconEnabled')
        .assert.elementNotPresent('@currentSelectionBanner')
    },

    validateLargeSubSelectorPageWithCurrentSelection(timeout = 10000) {
      return this
        .waitForElementPresent('@headerSelectSubscriber', timeout)
        .assert.elementPresent('@mainHeader')
        .assert.elementPresent('@countAccounts')
        .assert.elementPresent('@countSubscribers')
        .assert.elementPresent('@labelselectAnotherSubscriber')
        .assert.elementPresent('@helperselectAnotherSubscriber')
        .assert.elementPresent('@findselectAnotherSubsearchBox')
        .assert.elementPresent('@searchIconDisabled')
        .assert.elementPresent('@currentSelectionBanner')
        .assert.elementNotPresent('@labelSelectSubscriber')
        .assert.elementNotPresent('@listSelectSubscriber')
        .assert.elementNotPresent('@labelCurrentSelection')
        .assert.elementNotPresent('@currentSelectionCard')
        .assert.elementNotPresent('@searchResultCard')
        .assert.elementNotPresent('@searchIconEnabled')
    },

    validateErrorBannerInvalidNumber(timeout = 10000) {
      return this
        .waitForElementPresent('@errorInputInvalid', timeout)
        .assert.containsText('@errorInputInvalid', "Phone number invalid. Please enter a valid 10-digit phone number.")
    },
    validateErrorBannerSubNotFound(timeout = 10000) {
      return this
        .waitForElementPresent('@errorInputInvalid', timeout)
        .assert.containsText('@errorInputInvalid', "Subscriber not found. Please enter a valid phone number.")
    },
    validateClearSearch(timeout = 10000) {
      return this
        .waitForElementPresent('@ButtonClearSearch', timeout)
    },
    validateSearchCardPresent(timeout = 10000) {
      return this
        .waitForElementPresent('@ButtonClearSearch', timeout)
        .assert.elementPresent('@searchResultCard')
    },
    validateSearchCardNotPresent(timeout = 10000) {
      return this
        .waitForElementNotPresent('@ButtonClearSearch', timeout)
        .assert.elementNotPresent('@searchResultCard')
    },

  }]
}

