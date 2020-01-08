export const singleCanResponseMock = [
  {
    billingAccountNum: 230925634,
    accountName: 'DEAF CHILDREN\'S SOCIETY OF BC',
    address: '7355 CANADA WAY, BURNABY, BC',
    typeCd: 'X',
    subTypeCd: 'X',
    products: [
      {
        productId: '9145265217313911304',
        productInstanceId: '9149551558113880409',
        productName: 'Office Phone',
        planName: 'Single Line',
        category: 'Collaboration',
        isBundle: false,
        products: []
      },
      {
        productId: '9143210725313949381',
        productInstanceId: '9149551558113880405',
        productName: 'Office Internet',
        planName: 'Office Internet Basic',
        productTypes: [ 'HSIA' ],
        category: 'Network',
        isBundle: true,
        selfServePortalUrl: '/my-telus/office-internet',
        selfServePortalText: 'Manage Internet',
        planDetails:
          [ 'Up to 15 Mbps download speed',
            'Up to 1 Mbps upload speed',
            'Unlimited data usage',
            '2 dynamic IPs',
            '5 telus.net email addresses' ],
        icon: { title: 'wifi icon', file: [Object] },
        products: [
          {
            productInstanceId: '9149551558113880406',
            accountName: 'DEAF CHILDREN\'S SOCIETY OF BC',
            billingAccountNum: 230925634,
            parentProductInstanceId: '9149551558113880405',
            productId: '9143949070513681297',
            productName: 'Email (telus.net) - 5 included',
            planName: '',
            productTypes: [ 'EMAIL-TELUS' ],
            category: 'Add-on',
            isBundle: false,
            selfServePortalUrl: 'https://reg1.telus.net/selfcare/SelfCareApp',
            selfServePortalText: 'Add telus.net email accounts',
            selfServePortalTarget: '_blank'
          },
          {
            productInstanceId: '9149551558113880407',
            accountName: 'DEAF CHILDREN\'S SOCIETY OF BC',
            billingAccountNum: 230925634,
            parentProductInstanceId: '9149551558113880405',
            productId: '9143210930013949436',
            productName: 'Norton Security - 2 included',
            planName: '',
            category: 'Add-on',
            isBundle: false
          }
        ]
      }
    ]
  }
]

export const multiCanResponseMock = [
  {
    billingAccountNum: 230925634,
    accountName: 'DEAF CHILDREN\'S SOCIETY OF BC',
    address: '7355 CANADA WAY, BURNABY, BC',
    typeCd: 'X',
    subTypeCd: 'X',
    products: [
      {
        productId: '9145265217313911304',
        productInstanceId: '9149551558113880409',
        productName: 'Office Phone',
        planName: 'Single Line',
        category: 'Collaboration',
        isBundle: false,
        products: []
      },
      {
        productId: '9143210725313949381',
        productInstanceId: '9149551558113880405',
        productName: 'Office Internet',
        planName: 'Office Internet Basic',
        productTypes: [ 'HSIA' ],
        category: 'Network',
        isBundle: true,
        selfServePortalUrl: '/my-telus/office-internet',
        selfServePortalText: 'Manage Internet',
        planDetails:
          [ 'Up to 15 Mbps download speed',
            'Up to 1 Mbps upload speed',
            'Unlimited data usage',
            '2 dynamic IPs',
            '5 telus.net email addresses' ],
        icon: { title: 'wifi icon', file: [Object] },
        products: [
          {
            productInstanceId: '9149551558113880406',
            accountName: 'DEAF CHILDREN\'S SOCIETY OF BC',
            billingAccountNum: 230925634,
            parentProductInstanceId: '9149551558113880405',
            productId: '9143949070513681297',
            productName: 'Email (telus.net) - 5 included',
            planName: '',
            productTypes: [ 'EMAIL-TELUS' ],
            category: 'Add-on',
            isBundle: false,
            selfServePortalUrl: 'https://reg1.telus.net/selfcare/SelfCareApp',
            selfServePortalText: 'Add telus.net email accounts',
            selfServePortalTarget: '_blank'
          },
          {
            productInstanceId: '9149551558113880407',
            accountName: 'DEAF CHILDREN\'S SOCIETY OF BC',
            billingAccountNum: 230925634,
            parentProductInstanceId: '9149551558113880405',
            productId: '9143210930013949436',
            productName: 'Norton Security - 2 included',
            planName: '',
            category: 'Add-on',
            isBundle: false
          }
        ]
      }
    ]
  },
  {
    billingAccountNum: 233640465,
    accountName: 'MONTESSORI TRAINING CENTRE SOCIETY OF BRITISH COLUMBIA O/A',
    address: '8555 CAMBIE ST SUITE 200, VANCOUVER, BC',
    typeCd: 'X',
    subTypeCd: 'X',
    products: [
      {
        productInstanceId: '9149905137713736392',
        accountName: 'MONTESSORI TRAINING CENTRE SOCIETY OF BRITISH COLUMBIA O/A',
        billingAccountNum: 233640465,
        parentProductInstanceId: undefined,
        productId: '9147865616513062360',
        productName: 'Office Internet',
        planName: 'Fibre Internet 50',
        productTypes: [ 'HSIA' ],
        category: 'Network',
        isBundle: true,
        selfServePortalUrl: 'https://www.telus.com/my-telus/office-internet',
        selfServePortalText: 'Manage Internet',
        planDetails:
          [ 'Up to 50 Mbps download and upload speeds',
            'Unlimited data usage',
            '2 dynamic IPs',
            '10 telus.net email addresses' ],
        icon: { title: 'wifi icon', file: [Object]}
      },
      {
        productInstanceId: '9149905137713736396',
        accountName: 'MONTESSORI TRAINING CENTRE SOCIETY OF BRITISH COLUMBIA O/A',
        billingAccountNum: 233640465,
        parentProductInstanceId: '9149905137713736392',
        productId: '9145604819113128381',
        productName: '5 Static IPs',
        planName: '',
        productTypes: [ 'STATIC-IP' ],
        category: 'Add-on',
        isBundle: false
      },
      {
        productInstanceId: '9149905137713736394',
        accountName: 'MONTESSORI TRAINING CENTRE SOCIETY OF BRITISH COLUMBIA O/A',
        billingAccountNum: 233640465,
        parentProductInstanceId: '9149905137713736392',
        productId: '9143210930013949436',
        productName: 'Norton Security - 2 included',
        planName: '',
        category: 'Add-on',
        isBundle: false
      },
      {
        productInstanceId: '9149905137713736393',
        accountName: 'MONTESSORI TRAINING CENTRE SOCIETY OF BRITISH COLUMBIA O/A',
        billingAccountNum: 233640465,
        parentProductInstanceId: '9149905137713736392',
        productId: '9145875902113220187',
        productName: 'Email (telus.net) - 10 included',
        planName: '',
        productTypes: [ 'EMAIL-TELUS' ],
        category: 'Add-on',
        isBundle: false,
        selfServePortalUrl: 'https://reg1.telus.net/selfcare/SelfCareApp',
        selfServePortalText: 'Add telus.net email accounts',
        selfServePortalTarget: '_blank'
      }
    ]
  }
]

export const consolidatedCanResponseMock = [
  {
    billingAccountNum: 230925634,
    accountName: 'DEAF CHILDREN\'S SOCIETY OF BC',
    address: '7355 CANADA WAY, BURNABY, BC',
    typeCd: 'X',
    subTypeCd: 'X',
    products: [
      {
        productId: '9145265217313911304',
        productInstanceId: '9149551558113880409',
        productName: 'Office Phone',
        planName: 'Single Line',
        category: 'Collaboration',
        isBundle: false,
        productTypes: [ 'HSIA' ],
        products: [
          {
            productInstanceId: '9149551558113880466',
            accountName: 'DEAF CHILDREN\'S SOCIETY OF BC',
            billingAccountNum: 230925634,
            parentProductInstanceId: '9149551558113880405',
            productId: '9143949070513681297',
            productName: 'Email (telus.net) - 5 included',
            planName: '',
            productTypes: [ 'EMAIL-TELUS' ],
            category: 'Add-on',
            isBundle: false,
            selfServePortalUrl: 'https://reg1.telus.net/selfcare/SelfCareApp',
            selfServePortalText: 'Add telus.net email accounts',
            selfServePortalTarget: '_blank'
          },
          {
            productInstanceId: '9149551558113880477',
            accountName: 'DEAF CHILDREN\'S SOCIETY OF BC',
            billingAccountNum: 230925634,
            parentProductInstanceId: '9149551558113880405',
            productId: '9143210930013949436',
            productName: 'Norton Security - 2 included',
            planName: '',
            category: 'Add-on',
            isBundle: false
          }
        ]
      },
      {
        productId: '9143210725313949381',
        productInstanceId: '9149551558113880405',
        productName: 'Office Internet',
        planName: 'Office Internet Basic',
        productTypes: [ 'HSIA' ],
        category: 'Network',
        isBundle: true,
        selfServePortalUrl: '/my-telus/office-internet',
        selfServePortalText: 'Manage Internet',
        planDetails:
          [ 'Up to 15 Mbps download speed',
            'Up to 1 Mbps upload speed',
            'Unlimited data usage',
            '2 dynamic IPs',
            '5 telus.net email addresses' ],
        icon: { title: 'wifi icon', file: [Object] },
        products: [
          {
            productInstanceId: '9149551558113880406',
            accountName: 'DEAF CHILDREN\'S SOCIETY OF BC',
            billingAccountNum: 230925634,
            parentProductInstanceId: '9149551558113880405',
            productId: '9143949070513681297',
            productName: 'Email (telus.net) - 5 included',
            planName: '',
            productTypes: [ 'EMAIL-TELUS' ],
            category: 'Add-on',
            isBundle: false,
            selfServePortalUrl: 'https://reg1.telus.net/selfcare/SelfCareApp',
            selfServePortalText: 'Add telus.net email accounts',
            selfServePortalTarget: '_blank'
          },
          {
            productInstanceId: '9149551558113880407',
            accountName: 'DEAF CHILDREN\'S SOCIETY OF BC',
            billingAccountNum: 230925634,
            parentProductInstanceId: '9149551558113880405',
            productId: '9143210930013949436',
            productName: 'Norton Security - 2 included',
            planName: '',
            category: 'Add-on',
            isBundle: false
          }
        ]
      }
    ]
  }
]


export default singleCanResponseMock