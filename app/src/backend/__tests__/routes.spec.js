import sinon from 'sinon'
import request from 'supertest'
import express from 'express'
import bodyParser from 'body-parser'
import backendRoutes from '../routes'

jest.useFakeTimers()

let sandbox

beforeEach(() => {
  sandbox = sinon.createSandbox()
})

afterEach(() => {
  sandbox.restore()
})

describe('Backend Routes', () => {
  const app = express()
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(backendRoutes)

  it('Placeholder', () => expect(true).toBe(true))
})
