import filterMobilityActiveAccounts from '../filterMobilityActiveAccounts'
import {
  multiAccountResponseMock,
  multiAccountStoreMock
} from '../../../ui/__mocks__/data/_responseData'

describe('filterMobilityActiveAccounts', () => {
  it('should filter active accounts', () => {
    const responseData = multiAccountStoreMock.account
    const response = filterMobilityActiveAccounts(multiAccountResponseMock)
    expect(response).toEqual(responseData)
  })
})