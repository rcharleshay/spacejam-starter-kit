import tabData from '..'


describe('tabData', () => {
  it('should return mobility data', () => {
    const mobility = tabData('/mobility')
    expect(mobility).toBeTruthy()
  })
  it('should return default mobility data', () => {
    const data = tabData('/')
    expect(data).toBeTruthy()
  })
  it('should return default mobility data', () => {
    const officeInternet = tabData('/business-wireline/internet')
    expect(officeInternet).toBeTruthy()
  })
})

