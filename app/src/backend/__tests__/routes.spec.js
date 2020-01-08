import sinon from 'sinon'
import request from 'supertest'
import express from 'express'
import bodyParser from 'body-parser'
import backendRoutes from '../routes'
import FrontendServices from '../controllers/FrontendServices'
import BackendServices from '../controllers/BackendServices'

jest.useFakeTimers()

let sandbox

beforeEach(() => {
  sandbox = sinon.createSandbox()
})

afterEach(() => {
  sandbox.restore()
})

describe('Backend routes', () => {
  const app = express()
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(backendRoutes)

  it('returns post account session', (done) => {
    sandbox.stub(BackendServices, 'getSession').callsFake(() => {
      return Promise.resolve({})
    })
    sandbox.stub(BackendServices, 'putSession').callsFake(() => {
      return Promise.resolve({mobility: { account: '1212121'}})
    })


    request(app)
      .post('/session/account/mobility')
      .send({ account: '1212121' })
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .then((res) => {
        expect(res.body).toEqual({mobility: { account: '1212121'}})
        done()
      })
      .catch(err => done.fail(err))
  })
})
