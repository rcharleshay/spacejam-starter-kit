import React from 'react'
import { RouterContext, match } from 'react-router'
import { LocaleProvider, fetchComponentData, Html } from '@telus/isomorphic-core'
import fetchTopNavWithCookie from '@telus/my-telus-client-utils/lib/fetchTopNavWithCookie'
import { INITIALIZE_APP_FROM_SERVER } from '../ui/redux/actions/app.action'
import { fonts } from '@tds/core-css-reset'
import fetch from 'isomorphic-fetch'
import Helmet from 'react-helmet'
import ReactDOMServer from 'react-dom/server'
import { Provider } from 'react-redux'
import { ServerStyleSheet } from 'styled-components'
import { UI_BASENAME } from '../config/constants'
import getUIRoutes from '../ui/routes'
import logger from '../ui/logger'
import combinedReducers from '../ui/redux/reducers'
import uiConfig from '../config/ui'
import backendConfig from '../config/backend'

const registerServerSideRenderMiddleware = (createStore, newrelic) => (app) => {
  const bundleInfo =
    process.env.NODE_ENV === 'development'
      ? {
          bundle: { js: `${UI_BASENAME}/static/bundle.js` },
          vendor: { js: `${UI_BASENAME}/static/vendor.js` }
        }
      : require('../../bundleInfo.json') // eslint-disable-line import/no-unresolved
  // Log a warning if the Server Side Render exceeds acceptable threshold (> 100ms)
  app.use((req, res, next) => {
    const t = new Date().getTime()
    res.on('finish', () => {
      const ssrTime = new Date().getTime() - t
      if (ssrTime > 100) {
        logger.log('warn', `Server side render to ${req.url} took ${ssrTime}ms which is longer than the required 100ms threshold`)
      }
    })
    next()
  })

  app.use((req, res) => {
    const { cookie } = req.headers
    const telusLocale = {
      lang: req.lang || 'en',
      prov: req.prov || 'bc'
    }

    const fullBaseName = `${UI_BASENAME}`
    const routes = getUIRoutes()
    match(
      {
        routes,
        location: req.url.replace(`${UI_BASENAME}`, '') || '/',
        basename: fullBaseName
      },
      (error, redirectLocation, renderProps) => {
        if (error) {
          return res.status(500).send(error.message)
        }

        if (redirectLocation) {
          logger.info(`redirecting to: ${fullBaseName}${redirectLocation.pathname}${redirectLocation.search}`)
          return res.redirect(301, fullBaseName + redirectLocation.pathname + redirectLocation.search)
        }

        if (renderProps == null) {
          return res.status(404).send('Not found')
        }
        const globalElementsEndpoint = `${backendConfig.globalElementsApi.base}/${telusLocale.lang}/${telusLocale.prov}?${backendConfig.globalElementsApi.queries}`
        const store = createStore(combinedReducers)
        if (!req.app.locals.store) req.app.locals.store = {}
        store.dispatch({ type: INITIALIZE_APP_FROM_SERVER, value: req.app.locals.store })
        const globalElementsPromise = fetch(globalElementsEndpoint)
          .then((response) => {
            if (response.status === 200) return response.json()
            throw new Error('Unable to fetch global-elements-api')
          })
          .catch((err) => logger.log('error', err.message))
        const fetchComponentDataPromise = fetchComponentData(store.dispatch, renderProps.components, renderProps.params)

        const getFontPreloads = () => {
          // all browsers that support preload also support .woff2
          return fonts
            .filter((fontUrl) => fontUrl.endsWith('.woff2'))
            .map((woff2Font) => ({
              type: 'font/woff2',
              rel: 'preload',
              as: 'font',
              link: woff2Font
            }))
        }

        return Promise.all([
          globalElementsPromise,
          fetchTopNavWithCookie(cookie, telusLocale.lang, telusLocale.prov, {
            styleOverrides: {
              display: 'none'
            },
            ...uiConfig.myAccountNavConfigs
          }).catch((navError) => {
            logger.log('error', `my-account-elements-api MY TELUS top nav failed to load; error: ${navError}`)
            return Promise.resolve(undefined)
          }),
          fetchComponentDataPromise
        ])
          .then(([globalElements, nav]) => {
            const childComponent = (
              <Provider store={store}>
                <LocaleProvider locale={telusLocale}>
                  <RouterContext {...renderProps} />
                </LocaleProvider>
              </Provider>
            )
            const children = ReactDOMServer.renderToString(childComponent)

            let resourceHints = [
              {
                type: 'hint',
                rel: 'preload',
                as: 'style',
                link: process.env.NODE_ENV !== 'development' ? bundleInfo.styles.css : ''
              },
              {
                type: 'hint',
                rel: 'preload',
                as: 'script',
                link: bundleInfo.vendor.js
              },
              {
                type: 'hint',
                rel: 'preload',
                as: 'script',
                link: bundleInfo.bundle.js
              },
              {
                type: 'hint',
                rel: 'preload',
                as: 'script',
                link: 'https://cdn.polyfill.io/v2/polyfill.min.js?features=es6,Set,Array.prototype.includes'
              }
            ]

            resourceHints = resourceHints.concat(getFontPreloads())

            const additionalHeadResources = [
              {
                type: 'css',
                link: process.env.NODE_ENV !== 'development' ? bundleInfo.vendor.css : ''
              },
              {
                type: 'css',
                link: process.env.NODE_ENV !== 'development' ? bundleInfo.styles.css : ''
              },
              {
                type: 'js',
                async: 'async',
                link: backendConfig.tagManager
              }
            ]

            const additionalBodyResources = [
              {
                type: 'js',
                link: 'https://cdn.polyfill.io/v2/polyfill.min.js?features=es6,Set,Array.prototype.includes'
              },
              {
                type: 'js',
                link: bundleInfo.vendor.js
              },
              {
                type: 'js',
                link: bundleInfo.bundle.js
              }
            ]

            if (process.env.NODE_ENV === 'production') {
              additionalBodyResources.push({
                type: 'js',
                link: bundleInfo.styles.js
              })
            }
            if (nav) {
              additionalBodyResources.push(...nav.additionalBodyResources)
            }
            if (globalElements) {
              additionalBodyResources.push({
                type: 'js',
                link: globalElements.js
              })
            }
            const htmlProps = {
              state: store.getState(),
              head: Helmet.rewind(),
              localeInfo: { lang: telusLocale.lang, prov: telusLocale.prov },
              config: uiConfig,
              children,
              resourceHints,
              additionalHeadResources,
              additionalBodyResources,
              newrelic,
              header: globalElements ? globalElements.header : null,
              footer: globalElements ? globalElements.footer : null
            }

            const styleSheet = new ServerStyleSheet()
            const styled = <Html {...htmlProps} />
            const stream = styleSheet.interleaveWithNodeStream(ReactDOMServer.renderToNodeStream(styled))

            /* const stream = ReactDOMServer.renderToStaticNodeStream(
              <Html {...htmlProps} />
            ) */
            res.writeHead(200, {
              'Content-Type': 'text/html',
              'Transfer-Encoding': 'chunked'
            })
            res.write('<!doctype html>')
            stream.pipe(res, { end: false })
            stream.on('end', res.end)
          })
          .catch((err) => {
            logger.error(err)
            res.end(err.message)
          })
      }
    )
  })
  return app
}

export default registerServerSideRenderMiddleware
