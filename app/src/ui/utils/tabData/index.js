import { Internet, Mobility } from '@tds/core-decorative-icon'

const tabData = (pathname) => {
  switch (pathname) {
    case '/business-wireline/internet':
      return { Icon: Internet, text: 'officeInternet' }
    case '/mobility/account': case '/mobility/subscriber':
      return { Icon: Mobility, text: 'mobility' }
    default:
      return { Icon: Mobility, text: 'accountTitle' }
  }
}

export default tabData
