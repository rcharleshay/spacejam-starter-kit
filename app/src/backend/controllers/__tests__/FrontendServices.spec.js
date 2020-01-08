/* eslint-disable const/first */
import sinon from 'sinon'
import MockExpressRequest from 'mock-express-request'
import MockExpressResponse from 'mock-express-response'
import FrontendServices from '../FrontendServices'

jest.useFakeTimers()

let sandbox

beforeEach(() => {
  sandbox = sinon.createSandbox()
})

afterEach(() => {
  sandbox.restore()
})

const oneSubData = { encryptedSub: '-VmqKVRTZaoqjBF0FYWNqg', content: '905-626-6037', title: '', fullName: '' }
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

describe('FrontendServices', () => {
  it('placeholder', () => expect(true).toBe(true))
})
