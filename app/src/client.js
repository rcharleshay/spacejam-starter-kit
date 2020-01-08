/* eslint-disable */
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import { createHistory, useBasename } from 'history'

import {
  configureStore,
  immutifyState,
  LocaleProvider,
  fetchMiddleware
} from '@telus/isomorphic-core'

import getUIRoutes from './ui/routes'
import { UI_BASENAME } from './config/constants'
import rootReducer from './ui/redux/reducers'

const locale = {
  lang: window.__LOCALE__.lang || 'en',
  prov: window.__LOCALE__.prov || 'bc'
}

const rootEl = document.getElementById('app')

const initialState = window.__INITIAL_STATE__ ? immutifyState(window.__INITIAL_STATE__) : {}

if (process.env.APP_ENV === 'development') {
  console.info('INIT STATE:', initialState)
}

/*
configureStore takes 3 args, the root reducer, init store state, and additional middlewares
by default, configureStore comes with redux-logger middleware. Here we
registering our fetchMiddleware
*/
const store = configureStore(rootReducer, initialState, [fetchMiddleware()])

const history = useBasename(createHistory)({
  basename: UI_BASENAME
})

ReactDOM.hydrate(
  <Provider store={store}>
    <LocaleProvider locale={locale}>
      <Router history={history} routes={getUIRoutes()} />
    </LocaleProvider>
  </Provider>,
  rootEl
)
