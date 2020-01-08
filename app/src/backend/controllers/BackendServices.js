import fetch from 'isomorphic-fetch'
import config from 'src/config/ui'
import options from 'src/backend/utils/options'

class BackendServices {
  getAccounts(req) {
    return fetch(`${config.authorizationProxy.base}/api/v2/customer`, options(req, 'overview'))
      .then((result) => result.json())
      .catch(() => console.log('Error fetching accounts from overview api.'))
  }

  getSubscribers(req, account) {
    return fetch(`${config.authorizationProxy.base}/api/v2/customer/bans/${account}/products`, options(req, 'customer'))
      .then((result) => result.json())
      .catch(() => console.log('Error fetching subscribers from customer api.'))
  }

  getSubscriber(req, phone) {
    return fetch(`${config.authorizationProxy.base}/api/subscriber?phone=${phone}`, options(req, 'hub'))
      .then((result) => result.json())
      .catch(() => console.log('Error fetching subscriber from hub api.'))
  }

  getSession(req) {
    return fetch(`${config.authorizationProxy.base}/api/session`, options(req, 'session'))
      .then((result) => result.json())
      .catch(() => console.log('Error getting response from session api.'))
  }

  putSession(req, object) {
    return fetch(`${config.authorizationProxy.base}/api/v1/session`, options(req, 'session', { method: 'PUT', body: JSON.stringify(object) }))
      .then((result) => result.json())
      .catch(() => console.log('Error putting object in session api.'))
  }
}

export default new BackendServices()
