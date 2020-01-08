import { fetchWrapper } from '@telus/isomorphic-core'
import fetch from 'isomorphic-fetch'
import envConfig from '../../config/ui'
import { BACKEND_BASENAME } from '../../config/constants'

const enhancedFetch = fetchWrapper(fetch)

const backendConfig = process.env.BROWSER ? envConfig.client : envConfig.server

export const getBaseUrl = () => `${backendConfig.protocol}://${backendConfig.host}:${backendConfig.port}${BACKEND_BASENAME}`

export const postAccountInSession = (category, accountData) =>
  enhancedFetch(`${getBaseUrl()}/session/account/${category}`, {
    method: 'POST',
    body: JSON.stringify(accountData),
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' }
  })

export const postSubscriberInSession = (category, subscriberData) =>
  enhancedFetch(`${getBaseUrl()}/session/sub/${category}`, {
    method: 'POST',
    body: JSON.stringify(subscriberData),
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' }
  })

export const postCustomers = (account, category, userData) =>
  enhancedFetch(`${getBaseUrl()}/customer/${account}/${category}`, {
    method: 'POST',
    body: JSON.stringify(userData),
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' }
  })

export const getProduct = (sub, category) =>
  enhancedFetch(`${getBaseUrl()}/search/customer/${sub}/${category}`, {
    method: 'GET',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' }
  })
