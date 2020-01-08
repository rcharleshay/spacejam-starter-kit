import { pathOr } from 'ramda'
import BackendServices from 'src/backend/controllers/BackendServices'

const getMobilitySessionObject = async (req) => {
  const { mobility } = await BackendServices.getSession(req).catch(() => {
    throw 'Error fetching session.'
  })
  if (pathOr(false, ['account'])(mobility)) {
    const newMobility = { ...mobility }
    delete Object.assign(newMobility, { content: newMobility.account }).account
    return newMobility
  }
  if (pathOr(false, ['content'])(mobility)) {
    return mobility
  }
  return { content: false }
}

export default getMobilitySessionObject
