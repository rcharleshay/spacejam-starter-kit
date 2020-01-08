import config from 'src/config/ui'
import transformAccountData from 'src/ui/utils/transformAccountData'
import BackendServices from 'src/backend/controllers/BackendServices'
import filterMobilityActiveAccounts from 'src/backend/utils/filterMobilityActiveAccounts'
import { setErrorStoreObject, setMultiAccountStoreObject } from 'src/backend/utils/setStoreObjects'

const getActiveMobilityAccounts = async (req) => filterMobilityActiveAccounts(await BackendServices.getAccounts(req))

const handleSingleAccount = async (req, res, next, activeAccounts) => {
  try {
    const newData = transformAccountData('mobility', 'account', activeAccounts[0], activeAccounts.length)
    await BackendServices.putSession(req, { mobility: { ...newData } })
    const { rd } = req.query
    return res.redirect(rd ? decodeURIComponent(rd) : `${config.client.base}/my-telus/overview`)
  } catch (err) {
    setErrorStoreObject(req.app.locals, `Filter Mobility Account - Put Ban In Session Error: ${err}`)
    return next()
  }
}

const account = async (req, res, next) => {
  try {
    const activeAccounts = await getActiveMobilityAccounts(req)
    const accountSize = activeAccounts.length

    if (accountSize > 1) {
      setMultiAccountStoreObject(req.app.locals, activeAccounts, 'mobility', 'account')
      return next()
    }

    if (accountSize === 1) {
      return await handleSingleAccount(req, res, next, activeAccounts)
    }

    setErrorStoreObject(req.app.locals, 'Filter Mobility Account - There are no active accounts.')
    return next()
  } catch (err) {
    setErrorStoreObject(req.app.locals, `Filter Mobility Account - Initialization Error: ${err}`)
    return next()
  }
}

export default account
