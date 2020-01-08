const DATA_MAP = {
  'https://api.digital.telus.com/api/v1/customer/profile': require('./data/_customerApi').default
}


const fetch = jest.fn((url) => {
  if (DATA_MAP[url]) {
    return Promise.resolve({
      status: 200,
      json() {
        return DATA_MAP[url]
      }
    })
  }
  return Promise.resolve({
    status: 200,
    json() {
      return {}
    }
  })
})

export default fetch
