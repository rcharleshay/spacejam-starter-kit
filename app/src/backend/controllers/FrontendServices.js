import { pathOr } from 'ramda'
import { cryptography } from '@telus/prime-cryptography'
import filterMobilityActiveSubs from 'src/backend/utils/filterMobilityActiveSubs'
import BackendServices from './BackendServices'

class FrontendServices {
  postAccountInSession(req, res) {
    const { category } = req.params
    const accountData = req.body
    return BackendServices.getSession(req)
      .then((getSession) => {
        if (category === 'mobility' || pathOr(false, [category, 'account'])(getSession) !== accountData.account) {
          return BackendServices.putSession(req, { ...getSession, [category]: accountData })
            .then((putSession) => res.status(200).send(putSession))
            .catch((err) => res.sendStatus(500).json(err))
        }
        return BackendServices.putSession(req, { ...getSession, [category]: { ...getSession[category], ...accountData } })
          .then((putSession) => res.status(200).send(putSession))
          .catch((err) => res.sendStatus(500).json(err))
      })
      .catch((err) => res.sendStatus(500).json(err))
  }

  postSubscriberInSession(req, res) {
    const { category } = req.params
    const subscriberData = req.body
    return BackendServices.getSession(req)
      .then((getSession) => {
        return BackendServices.putSession(req, { ...getSession, [category]: { ...getSession[category], ...subscriberData } })
          .then((putSession) => res.status(200).send(putSession))
          .catch((err) => res.sendStatus(500).json(err))
      })
      .catch((err) => res.sendStatus(500).json(err))
  }

  postSubscribers(req, res) {
    const { account, category } = req.params
    const { email } = req.body
    return BackendServices.getSubscribers(req, account)
      .then((result) => {
        const filteredSubs = filterMobilityActiveSubs(result, email)
        if (filteredSubs && filteredSubs.length === 1) {
          const subscriber = {
            formattedPhoneNumber: filteredSubs[0].content,
            fullName: filteredSubs[0].fullName,
            encryptedSub: filteredSubs[0].encryptedSub,
            subscriber: filteredSubs[0].content.split('-').join(''),
            numberOfSubs: filteredSubs.length
          }
          return BackendServices.getSession(req)
            .then((getSession) => {
              return BackendServices.putSession(req, { ...getSession, [category]: { ...getSession[category], ...subscriber } })
                .then((putSession) => res.status(200).send({ subscribers: filteredSubs, session: putSession }))
                .catch((err) => res.sendStatus(500).json(err))
            })
            .catch((err) => res.sendStatus(500).json(err))
        }
        return res.status(200).send({ subscribers: filteredSubs })
      })
      .catch((err) => res.sendStatus(500).json(err))
  }

  searchSubscriber(req, res) {
    const { subscriber, category } = req.params
    let subs = []
    return BackendServices.getSession(req)
      .then((getSession) => {
        const { account } = getSession[category]
        return BackendServices.getSubscriber(req, subscriber)
          .then((result) => {
            if(result.billingAccountNum === account) {
              const firstName = pathOr('', ['name', 'firstName'])(result)
              const lastName = pathOr('', ['name', 'lastName'])(result)
              subs = [
                {
                  fullName: `${firstName} ${lastName}`,
                  content: result.phone,
                  encryptedSub: cryptography.encrypt('sub', result.phone, result.email)
                }
              ]
              return res.status(200).send(subs)
            }
            return res.status(400).send('Subscriber not found.')
          })
        .catch(() => res.status(400).send('Subscriber not found.'))
      })
      .catch((err) => res.sendStatus(500).json(err))
  }
}

export default new FrontendServices()
