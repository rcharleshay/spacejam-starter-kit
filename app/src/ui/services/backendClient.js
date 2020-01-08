import { fetchWrapper } from '@telus/isomorphic-core'
import fetch from 'isomorphic-fetch'
import envConfig from '../../config/ui'
import { BACKEND_BASENAME } from '../../config/constants'

const enhancedFetch = fetchWrapper(fetch)
const backendConfig = process.env.BROWSER ? envConfig.client : envConfig.server

export const getBaseUrl = () => `${backendConfig.protocol}://${backendConfig.host}:${backendConfig.port}${BACKEND_BASENAME}`
