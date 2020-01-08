export const postAccountInSessionMock = {
  mobility: {
    content: '28986434',
    numberOfSubs: 5,
    typeCd: 'B',
    subTypeCd: 'X',
    email: 'multi_ban@telusinternal.com',
    formattedName: 'UAT TESTER',
    encryptedBan: 'n_ACegVw1uUEVlcB3AKw7A'
  },
  category: 'mobility'
}

export const postAccountInSessionResponseMock = {
  category: 'mobility',
  session: {
    mobility: {
      content: '28986434',
      numberOfSubs: 5,
      typeCd: 'B',
      subTypeCd: 'X',
      email: 'multi_ban@telusinternal.com',
      formattedName: 'UAT TESTER',
      encryptedBan: 'n_ACegVw1uUEVlcB3AKw7A'
    },
    category: 'mobility'
  },
  context: 'subscriber'
}

export const postSubscriberInSessionMock = {
  mobility: {
    subscriber: '9056265089'
  },
  category: 'mobility'
}

export const postCustomerMock = {
  subscribers: [
    {
      encryptedSub: '0mWO4TO3Uh1P3XO7zVvz0g',
      content: '905-626-6871',
      fullName: ''
    },
    {
      encryptedSub: 'DL2391RX2F_USN-u4Eabog',
      content: '905-626-3527',
      fullName: ''
    }
  ]
}

export const postCustomerResponseMock = {
  category: 'mobility',
  loading: false,
  subscriber: [
    {
      encryptedSub: '0mWO4TO3Uh1P3XO7zVvz0g',
      content: '905-626-6871',
      fullName: ''
    },
    {
      encryptedSub: 'DL2391RX2F_USN-u4Eabog',
      content: '905-626-3527',
      fullName: ''
    }
  ],
  subscribersFetched: true,
  search: {},
  context: 'subscriber'
}

export const localSearchResponseMock = {
  context: 'account',
  category: 'mobility',
  account: [
    {
      content: '28986434',
      numberOfSubs: 5,
      typeCd: 'B',
      subTypeCd: 'X',
      email: 'multi_ban@telusinternal.com',
      formattedName: 'UAT TESTER',
      encryptedBan: 'n_ACegVw1uUEVlcB3AKw7A'
    }
  ],
  search: {
    searchValue: [
      {
        content: '28986434',
        numberOfSubs: 5,
        typeCd: 'B',
        subTypeCd: 'X',
        email: 'multi_ban@telusinternal.com',
        formattedName: 'UAT TESTER',
        encryptedBan: 'n_ACegVw1uUEVlcB3AKw7A'
      }
    ],
    searchStatus: 'SUCCESS'
  }
}

export const multiAccountResponseMock = {
  firstName: 'testF',
  lastName: 'testL',
  email: 'test@test.com',
  bans: [
    {
      type: 'wireless',
      ban: '121212',
      products: 4,
      typeCd: 'B',
      subTypeCd: 'X',
      encryptedBan: 'n_ACegVw1uUEVlcB3AKw7A'
    },
    {
      type: 'wireless',
      ban: '33333',
      products: 1,
      typeCd: 'B',
      subTypeCd: 'X',
      encryptedBan: 'n_ACegVw1uUEVlcB3AKDE'
    },
    {
      type: 'wireline',
      ban: '555555',
      products: 1,
      typeCd: 'B',
      subTypeCd: 'X',
      encryptedBan: 'n_ACegVw1uUEVlcB3AQWA'
    }
  ]
}

export const multiAccountStoreMock = {
  account: [
    {
      content: '121212',
      numberOfSubs: 4,
      typeCd: 'B',
      subTypeCd: 'X',
      email: 'test@test.com',
      formattedName: 'testF testL',
      encryptedBan: 'n_ACegVw1uUEVlcB3AKw7A'
    },
    {
      content: '33333',
      numberOfSubs: 1,
      typeCd: 'B',
      subTypeCd: 'X',
      email: 'test@test.com',
      formattedName: 'testF testL',
      encryptedBan: 'n_ACegVw1uUEVlcB3AKDE'
    }
  ]
}

export const singleAccountResponseMock = {
  firstName: 'testF',
  lastName: 'testL',
  email: 'test@test.com',
  bans: [
    {
      type: 'wireless',
      ban: '121212',
      products: 4,
      typeCd: 'B',
      subTypeCd: 'X',
      encryptedBan: 'n_ACegVw1uUEVlcB3AKw7A'
    }
  ]
}

export const singleAccountLargeSubResponseMock = {
  firstName: 'testF',
  lastName: 'testL',
  email: 'test@test.com',
  bans: [
    {
      type: 'wireless',
      ban: '121212',
      products: 45,
      typeCd: 'B',
      subTypeCd: 'X',
      encryptedBan: 'n_ACegVw1uUEVlcB3AKw7A'
    }
  ]
}

export const singleAccountSingleSubResponseMock = {
  firstName: 'testF',
  lastName: 'testL',
  email: 'test@test.com',
  bans: [
    {
      type: 'wireless',
      ban: '121212',
      products: 1,
      typeCd: 'B',
      subTypeCd: 'X',
      encryptedBan: 'n_ACegVw1uUEVlcB3AKw7A'
    }
  ]
}

export const singleAccountStoreMock = {
  account: [
    {
      content: '121212',
      title: false,
      numberOfSubs: 4,
      typeCd: 'B',
      subTypeCd: 'X',
      email: 'test@test.com',
      formattedName: 'testF testL',
      encryptedBan: 'n_ACegVw1uUEVlcB3AKw7A'
    }
  ]
}

export default postAccountInSessionMock
