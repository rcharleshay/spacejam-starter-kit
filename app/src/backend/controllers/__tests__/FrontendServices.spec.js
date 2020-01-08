/* eslint-disable const/first */
import sinon from 'sinon'
import MockExpressRequest from 'mock-express-request'
import MockExpressResponse from 'mock-express-response'
import BackendServices from '../BackendServices'

import FrontendServices from '../FrontendServices'

jest.useFakeTimers()

let sandbox

beforeEach(() => {
  sandbox = sinon.createSandbox()
})

afterEach(() => {
  sandbox.restore()
})

const oneSubData = {encryptedSub:'-VmqKVRTZaoqjBF0FYWNqg',content:'905-626-6037',title:'',fullName:''}
const oneSubSessionResponse = {
  mobility: {
    account: '25925528',
    ...oneSubData
  }
}

let reqMock
let resMock

const tokens = {
  oauth: 'mock-oauth',
  session: 'mock-session'
}


beforeEach(() => {
  reqMock = new MockExpressRequest({ tokens })
  resMock = new MockExpressResponse()
  resMock.sendStatus = jest.fn()
  reqMock.params = {}
  reqMock.lang = 'en'
})



describe('FrontendServices - postAccountInSession', () => {

  it('should call for postAccountInSession', async() => {
    sandbox.stub(BackendServices, 'getSession').callsFake(() => {
      return Promise.resolve({})
    })

    sandbox.stub(BackendServices, 'putSession').callsFake(() => {
      return Promise.resolve({ mobility: {account: '232323'}})
    })

    reqMock.params = { category: 'mobility' }
    reqMock.body = { account : '1234561' }
    await FrontendServices.postAccountInSession(reqMock, resMock)
  })

  it('should call for postAccountInSession - mobility session', async() => {
    sandbox.stub(BackendServices, 'getSession').callsFake(() => {
      return Promise.resolve({ mobility: {account: '11111'}})
    })

    sandbox.stub(BackendServices, 'putSession').callsFake(() => {
      return Promise.resolve({ mobility: {account: '232323'}})
    })

    reqMock.params = { category: 'mobility' }
    reqMock.body = { account : '1234561' }
    await FrontendServices.postAccountInSession(reqMock, resMock)
  })


  it('should call for postAccountInSession - businessWireline', async() => {
    sandbox.stub(BackendServices, 'getSession').callsFake(() => {
      return Promise.resolve({ mobility: {account : '232323'}})
    })

    sandbox.stub(BackendServices, 'putSession').callsFake(() => {
      return Promise.resolve({ mobility: {account : '232323'}, businessWireline: {account: '11111'}})
    })

    reqMock.params = { category: 'businessWireline' }
    reqMock.body = { account : '11111' }
    await FrontendServices.postAccountInSession(reqMock, resMock)
  })

  it('should call for postAccountInSession - businessWireline phone', async() => {
    sandbox.stub(BackendServices, 'getSession').callsFake(() => {
      return Promise.resolve({
        businessWireline: { account : '232323', internet: { productInstanceId : '2323' } }
      })
    })

    sandbox.stub(BackendServices, 'putSession').callsFake(() => {
      return Promise.resolve({
        businessWireline: {
          account : '232323',
          internet: { productInstanceId : '2323' },
          phone: { productInstanceId : '1212122222' }
        }
      })
    })

    reqMock.params = { category: 'businessWireline' }
    reqMock.body = { account : '232323',  phone: { productInstanceId : '1212122222' } }
    await FrontendServices.postAccountInSession(reqMock, resMock)
  })

  it('should error for putSession - mobility session', () => {
    sandbox.stub(BackendServices, 'getSession').callsFake(() => {
      return Promise.resolve({ mobility: {account: '11111'}})
    })

    sandbox.stub(BackendServices, 'putSession').callsFake(() => {
      return Promise.reject()
    })

    reqMock.params = { category: 'mobility' }
    reqMock.body = { account : '1234561' }
    FrontendServices.postAccountInSession(reqMock, resMock)
  })

  it('should call for postAccountInSession - businessWireline putSession', () => {
    sandbox.stub(BackendServices, 'getSession').callsFake(() => {
      return Promise.resolve({
        businessWireline: { account : '232323', internet: { productInstanceId : '2323' } }
      })
    })

    sandbox.stub(BackendServices, 'putSession').callsFake(() => {
      return Promise.reject()
    })

    reqMock.params = { category: 'businessWireline' }
    reqMock.body = { account : '232323',  phone: { productInstanceId : '1212122222' } }
    FrontendServices.postAccountInSession(reqMock, resMock)
  })

  it('should error for putSession - businessWireline', () => {
    sandbox.stub(BackendServices, 'getSession').callsFake(() => {
      return Promise.resolve({})
    })

    sandbox.stub(BackendServices, 'putSession').callsFake(() => {
      return Promise.reject()
    })

    reqMock.params = { category: 'businessWireline' }
    reqMock.body = { account : '11111' }
    FrontendServices.postAccountInSession(reqMock, resMock)
  })
})

describe('FrontendServices - postSubscriberInSession', () => {

  it('should call for postSubscriberInSession', async() => {
    sandbox.stub(BackendServices, 'getSession').callsFake(() => {
      return Promise.resolve({ mobility: { account: '444444'}})
    })

    sandbox.stub(BackendServices, 'putSession').callsFake(() => {
      return Promise.resolve({ mobility: { account: '444444', subscriber: '1234561'}})
    })

    reqMock.params = { category: 'mobility' }
    reqMock.body = { subscriber : '1234561' }
    await FrontendServices.postSubscriberInSession(reqMock, resMock)
  })

  it('should error for putSession - postSubscriberInSession', () => {
    sandbox.stub(BackendServices, 'getSession').callsFake(() => {
      return Promise.resolve({ mobility: { account: '444444'}})
    })

    sandbox.stub(BackendServices, 'putSession').callsFake(() => {
      return Promise.reject()
    })

    reqMock.params = { category: 'mobility' }
    reqMock.body = { subscriber : '1234561' }
    FrontendServices.postSubscriberInSession(reqMock, resMock)
  })

})

describe('FrontendServices - postSubscribers', () => {

  it('should call for postSubscribers', async() => {
    sandbox.stub(BackendServices, 'getSession').callsFake(() => {
      return Promise.resolve({ mobility: { account: '25925528'}})
    })

    sandbox.stub(BackendServices, 'getSubscribers').callsFake(() => {
      return Promise.resolve([
        {
          statusCd: 'A',
          name: '9056266037',
          subscriberName: {
            firstName: 'test 1',
            lastName: 'test 2'
          }
        },
        {
          statusCd: 'A',
          name: '8077078519'
        }
      ])
    })

    reqMock.params = { category: 'mobility', account: '25925528' }
    reqMock.body = { email: 'test@test.com' }
    await FrontendServices.postSubscribers(reqMock, resMock)
  })

  it('should error for getSubscribers- postSubscribers', () => {
    sandbox.stub(BackendServices, 'getSubscribers').callsFake(() => {
      return Promise.reject()
    })

    reqMock.params = { category: 'mobility', account: '25925528' }
    reqMock.body = { email: 'test@test.com' }
    FrontendServices.postSubscribers(reqMock, resMock)
  })

  it('should call for postSubscribers for one subscriber', async() => {


    sandbox.stub(BackendServices, 'getSubscribers').callsFake(() => {
      return Promise.resolve([{name:'9056266037',type: 'wireless', statusCd: 'A'}])
    })

    sandbox.stub(BackendServices, 'getSession').callsFake(() => {
      return Promise.resolve({mobility: {account: '25925528'}})
    })

    sandbox.stub(BackendServices, 'putSession').callsFake(() => {
      return Promise.resolve(oneSubSessionResponse)
    })

    reqMock.params = { category: 'mobility', account: '25925528' }
    reqMock.body = { email: 'test@test.com' }
    await FrontendServices.postSubscribers(reqMock, resMock)
  })

  it('should error for putSession- postSubscribers', () => {

    sandbox.stub(BackendServices, 'getSubscribers').callsFake(() => {
      return Promise.resolve([{name:'9056266037',type: 'wireless', statusCd: 'A'}])
    })

    sandbox.stub(BackendServices, 'getSession').callsFake(() => {
      return Promise.resolve({mobility: {account: '444444'}})
    })
    sandbox.stub(BackendServices, 'putSession').callsFake(() => {
      return Promise.reject()
    })

    reqMock.params = { category: 'mobility', account: '25925528' }
    reqMock.body = { email: 'test@test.com' }
    FrontendServices.postSubscribers(reqMock, resMock)
  })

})

describe('FrontendServices - searchSubscriber', () => {

  it('should call for searchSubscriber', async() => {
    sandbox.stub(BackendServices, 'getSession').callsFake(() => {
      return Promise.resolve({mobility: {account: '14032604'}})
    })
    sandbox.stub(BackendServices, 'getSubscriber').callsFake(() => {
      return Promise.resolve({
        name: { firstName: 'test 1', lastName: 'test 2' },
        typeCd: 'B', subTypeCd: 'O', phone: '5142936153',
        billingAccountNum: '14032604', email: 'multi_ban@telusinternal.com'})
    })

    reqMock.params = { subscriber: '5142936153', category: 'mobility' }
    await FrontendServices.searchSubscriber(reqMock, resMock)
  })


  it('should error for getSubscribers- searchSubscriber', () => {
    sandbox.stub(BackendServices, 'getSession').callsFake(() => {
      return Promise.resolve({mobility: {account: '14032604'}})
    })
    sandbox.stub(BackendServices, 'getSubscriber').callsFake(() => {
      return Promise.reject()
    })

    reqMock.params = { subscriber: '5142936153' }
    FrontendServices.searchSubscriber(reqMock, resMock)
  })

})
