import config from 'src/config/ui'
import BackendServices from 'src/backend/controllers/BackendServices'
import getMobilitySessionObject from 'src/backend/utils/getMobilitySessionObject'
import filterMobilityActiveSubs from 'src/backend/utils/filterMobilityActiveSubs'
import filterMobilityActiveAccounts from 'src/backend/utils/filterMobilityActiveAccounts'
import transformAccountData from 'src/ui/utils/transformAccountData'
import { LARGE_ACCOUNT_LIMIT } from 'src/config/constants'
import {
  setErrorStoreObject,
  setMultiAccountStoreObject,
  setLargeMultiSubStoreObject,
  setSmallMultiSubStoreObject,
  setCancelledOrSuspendedError
} from 'src/backend/utils/setStoreObjects'

const getActiveMobilityAccounts = async (req) => filterMobilityActiveAccounts(await BackendServices.getAccounts(req))
const getActiveMobilitySubscribers = async (req, account, email) =>
  filterMobilityActiveSubs(await BackendServices.getSubscribers(req, account), email)

const handleSingleOrSelectedAccount = async (req, res, next, activeAccounts, activeAccount) => {
  const numberOfSubs = activeAccount.numberOfSubs
  const email = activeAccount.email
  const sessionAccount = transformAccountData('mobility', 'subscriber', activeAccount, activeAccounts.length)
  const accountSession = await BackendServices.putSession(req, { mobility: { ...sessionAccount } })

  if (numberOfSubs > LARGE_ACCOUNT_LIMIT) {
    setLargeMultiSubStoreObject(req.app.locals, activeAccounts, 'mobility', accountSession, activeAccount.content)
    return next()
  } else {
    const activeSubs = await getActiveMobilitySubscribers(req, activeAccount.content, email)
    const subSize = activeSubs.length

    if (subSize > 1) {
      setSmallMultiSubStoreObject(req.app.locals, activeAccounts, activeSubs, 'mobility', accountSession, activeAccount.content)
      return next()
    }

    if (subSize === 1) {
      const { rd } = req.query
      const subscriberSessionObject = {
        formattedPhoneNumber: activeSubs[0].content,
        fullName: activeSubs[0].fullName,
        encryptedSub: activeSubs[0].encryptedSub,
        subscriber: activeSubs[0].content.split('-').join(''),
        numberOfSubs: subSize
      }
      const newData = transformAccountData('mobility', 'subscriber', activeAccount, activeAccounts.length)
      await BackendServices.putSession(req, { mobility: { ...newData, ...subscriberSessionObject } })
      return res.redirect(rd ? decodeURIComponent(rd) : `${config.client.base}/my-telus/overview`)
    }

    setCancelledOrSuspendedError(req.app.locals, activeAccounts, 'mobility', 'subscriber')
    return next()
  }
}

const subscriber = async (req, res, next) => {
  try {
    const [activeAccounts, mobilitySession] = await Promise.all([getActiveMobilityAccounts(req), getMobilitySessionObject(req)])
    const accountSize = activeAccounts.length

    if (activeAccounts.some(({ content }) => content === mobilitySession.content) && accountSize > 1) {
      const activeAccount = activeAccounts.find(({ content }) => content === mobilitySession.content)
      return await handleSingleOrSelectedAccount(req, res, next, activeAccounts, activeAccount)
    }

    if (accountSize > 1) {
      setMultiAccountStoreObject(req.app.locals, activeAccounts, 'mobility', 'subscriber')
      return next()
    }

    if (accountSize === 1) {
      return await handleSingleOrSelectedAccount(req, res, next, activeAccounts, activeAccounts[0])
    }

    setErrorStoreObject(req.app.locals, 'There are no active accounts.')
    return next()
  } catch (err) {
    setErrorStoreObject(req.app.locals, `Filter Mobility - Initialization Error: ${err}`)
    return next()
  }
}

export default subscriber
