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

/* Account selector page */
  selectAccountHeader: {selector: 'h1[data-test-id="heading-account"]'},
  selectedServiceTab: {selector: 'span[data-test="selected-tab-Mobility"]'},
  findYourAccountTitle: {selector: 'label[for="account-search"]'},
  findYourAccountToolTip: {selector: 'div[data-test="find-your-account-tooltip"]'},
  findYourAccountHintText: {selector: 'p[id="account-search_hint"]'},
  /* Search Box */
  inputSearchBox: {selector: 'input[name="search-input"]'},
  searchButtonEnabled: {selector: 'button[data-test="search-button-enabled"]'},
  searchButtonDisabled: {selector: 'button[data-test="search-button-disabled"]'},
  accountFound: {selector: 'h3[data-test="account-found"]'},

  /* Card selector section */
  titleAccountCardSelector: {selector: 'h3[data-test="card-selector-account-title"]'},
  cardSelectorContainer: {selector: 'button[data-test="card-selector-container"]'},

/* Subscriber Selector page */
  selectSubHeader: {selector: 'h1[data-test-id="heading-sub"]'},
  currentSelectedAccountText: {selector: 'span[data-test="current-selected-account-text"]'},
  accountNumberSection: {selector: 'h3[data-test="account-number"]'},
  changeAccountLink: {selector: 'a[data-test="change-account-link"]'},
  selectedService: {selector: 'span[data-test="selected-Mobility"]'},
  selectedServiceTab: {selector: 'span[data-test="selected-tab-Mobility"]'},
  findYourSubTitle: {selector: 'label[for="account-search"]'},
  findYourSubToolTip: {selector: 'div[data-test="find-your-subscriber-tooltip"]'},
  findYourSubHintText: {selector: 'p[id="account-search_hint"]'},
  subFound: {selector: 'h3[data-test="subscriber-found"]'},

  /* Card selector section */
  titleSubCardSelector: {selector: 'h3[data-test="card-selector-subscriber-title"]'},


// large subs selector

  /* accounts count and subscribers count */
  countAccounts: {selector: 'span[data-test="accounts-count"]'},
  countSubscribers: {selector: 'span[data-test="subscribers-count"]'},
  /* find a subscriber search box */
  labelFindSub: {selector: 'label[for="find-a-subscriber"]'},
  labelselectAnotherSubscriber: {selector: 'label[for="or-select-another-subscriber"]'},
  helperFindSub: {selector: 'div[id="find-a-subscriber_helper"]'},
  helperSelectAnotherSubscriber: {selector: 'div[id="or-select-another-subscriber_helper"]'},
  findSubsearchBox: {selector: 'input[id="find-a-subscriber"]'},
  findSelectAnotherSubsearchBox: {selector: 'input[id="or-select-another-subscriber"]'},
  searchIconEnabled: {selector: 'i[data-test="search-icon-enabled"]'},
  searchIconDisabled: {selector: 'i[data-test="search-icon-disabled"]'},
  /* Current selection Banner */
  currentSelectionBanner: {selector: 'div[data-test="current-selection-large-subs"]'},

  //Search Results
  searchResultCard: {selector: 'div[data-test="search-result-account-card"]'},

  // Clear Search Results
  ButtonClearSearch: {selector: 'span[data-test="clear-search"]'},

  // Search Again Link
  searchAgainLink: {selector: 'a[data-test="search-again-link"]'},

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

    validateAccountSelectorPage() {
      return this
        .waitForElementNotPresent('@ButtonClearSearch', timeout)
        .assert.elementNotPresent('@searchResultCard')
    },

    validateLargeBanSelector(timeout = 10000) {
        this.waitForElementPresent('@selectAccountHeader', timeout)
        this.expect.element('@selectedServiceTab').to.be.visible
        this.expect.element('@findYourAccountTitle',).to.be.visible
        this.expect.element('@findYourAccountToolTip').to.be.visible
        this.expect.element('@findYourAccountHintText').to.be.visible
        this.expect.element('@inputSearchBox').to.be.visible
        this.expect.element('@searchButtonDisabled').to.be.visible
        this.expect.element('@titleAccountCardSelector').to.be.visible
        this.expect.element('@cardSelectorContainer').to.be.visible
        return this
    },

    validateLargeSubSelector(timeout = 10000) {
      this.waitForElementPresent('@selectAccountHeader', timeout)
      this.expect.element('@selectSubHeader').to.be.visible
      this.expect.element('@currentSelectedAccountText').to.be.visible
      this.expect.element('@accountNumberSection',).to.be.visible
      this.expect.element('@changeAccountLink').to.be.visible
      this.expect.element('@selectedService').to.be.visible
      this.expect.element('@selectedServiceTab').to.be.visible
      this.expect.element('@findYourSubTitle').to.be.visible
      this.expect.element('@findYourSubToolTip').to.be.visible
      this.expect.element('@findYourSubHintText').to.be.visible
      this.expect.element('@titleSubCardSelector').to.be.visible
      this.expect.element('@findYourSubHintText').to.be.visible
      this.expect.element('@searchButtonDisabled').to.be.visible

      return this
  },

  }]
}

