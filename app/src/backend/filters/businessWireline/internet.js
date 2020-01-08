import config from 'src/config/ui'
import BackendServices from 'src/backend/controllers/BackendServices'
import filterOfficeInternetActiveAccounts from 'src/backend/utils/filterOfficeInternetActiveAccounts'
import { setErrorStoreObject, setMultiAccountStoreObject } from 'src/backend/utils/setStoreObjects'

const internet = async (req, res, next) => {
  try {
    const accounts = filterOfficeInternetActiveAccounts(await BackendServices.getAccounts(req))
    const accountSize = accounts.length

    if (accountSize > 1) {
      setMultiAccountStoreObject(req.app.locals, accounts, 'business-wireline', 'internet')
      return next()
    }

    if (accountSize === 1) {
      const { rd } = req.query
      const { productInstanceId } = accounts[0]
      const session = BackendServices.getSession(req)
      BackendServices.putSession(req, { ...session, ['business-wireline']: { account: accounts[0], 'internet': { productInstanceId }, numberOfAccounts: accountSize } })
      return res.redirect(rd ? decodeURIComponent(rd) : `${config.client.base}/my-telus/overview`)
    }

    setErrorStoreObject(req.app.locals, 'No active office internet accounts')
    return next()
  } catch (err) {
    setErrorStoreObject(req.app.locals, `Filter Office Internet - Initialization Error: ${err}`)
    return next()
  }
}

export default internet
