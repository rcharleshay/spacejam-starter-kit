const users = require('./users.js')
const allUsers = Object.assign({}, users.prod)

const configuration = {
  production: {
    baseUrl: 'https://www.telus.com/my-telus/spacejam/mobility?rd=https://www.telus.com/my-telus/spacejam',
    apiEndpoint: 'https://api.digital.telus.com',
    username: 'ssredesign13@telusinternal.com',
    password: process.env.E2E_PASSWORD,
    users: allUsers
  },
  staging: {
    baseUrl: 'https://digital:notwebchannel@www.wcstage.telus.com/my-telus/spacejam',
    apiEndpoint: 'https://api.stage.digital.telus.com',
    username: 'ssredesign13@telusinternal.com',
    password: process.env.E2E_PASSWORD,
    users: allUsers
  },

  local: {
    baseUrl: 'http://local.telus.com:3000/my-telus/spacejam',
    planPageUrl: 'https://local.telus.com:3000/my-account/mobility/plans-and-devices/plan',
    apiEndpoint: 'https://api.stage.digital.telus.com',
    password: process.env.E2E_PASSWORD,
    users: allUsers
  }
}

const config = configuration[process.env.ENVIRONMENT]
config.env = process.env.ENVIRONMENT

module.exports = config
