import { formatPhone } from 'src/backend/utils/format'
import { cryptography } from '@telus/prime-cryptography'

const filterMobilityActiveSubs = (products, email) => {
  const subs = products
    .filter((p) => ['A'].includes(p.statusCd))
    .map((response) => {
      const { subscriberName, name } = response
      return subscriberName
        ? {
            encryptedSub: cryptography.encrypt('sub', name, email),
            content: formatPhone(name),
            fullName: `${`${subscriberName.firstName} ` || ''}${subscriberName.lastName || ''}`
          }
        : { encryptedSub: cryptography.encrypt('sub', name, email), content: formatPhone(name), fullName: '' }
    })
  return subs
}

export default filterMobilityActiveSubs
