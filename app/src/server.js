import 'ignore-styles'
import newrelic from 'newrelic'
import express from 'express'
import { applyMiddleware, createStore } from 'redux'
import { fetchMiddleware, compose } from '@telus/isomorphic-core'
import registerAuthMiddleware from '@telus/my-telus-api-utils/lib/middleware/registerAuth'
import registerVersionEndpoint from './middleware/registerVersionEndpoint'
import registerBackend from './middleware/registerBackend'
import registerRobotsTxtEndpoint from './middleware/registerRobotsTxtEndpoint'
import registerCommonMiddleware from './middleware/registerCommonMiddleware'
import registerLocaleMiddleware from './middleware/registerLocaleMiddleware'
import registerServerSideRenderMiddleware from './middleware/registerServerSideRenderMiddleware'
import registerErrorHandlingMiddleware from './middleware/registerErrorHandlingMiddleware'
import registerFaviconEndpoint from './middleware/registerFaviconEndpoint'
import startApp from './middleware/startApplication'
import config from './config/ui'

const finalCreateStore = applyMiddleware(fetchMiddleware())(createStore)
const { authorizationProxy } = config
const authMiddlewareProps = {
  authProxyReturnHost: authorizationProxy.returnHost,
  authProxyEnvironment: authorizationProxy.env
}

compose(
  startApp,
  registerErrorHandlingMiddleware,
  registerServerSideRenderMiddleware(finalCreateStore, newrelic),
  registerLocaleMiddleware,
  // handleRedirectMiddleware,
  registerAuthMiddleware(authMiddlewareProps),
  registerRobotsTxtEndpoint,
  registerFaviconEndpoint,
  registerVersionEndpoint,
  registerBackend,
  registerCommonMiddleware
)(express())
