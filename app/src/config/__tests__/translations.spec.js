import translations from '../translations'

describe('translations', () => {
  it('should expose en mobility', () => {
    const enObj = translations('en')
    expect(enObj.mobility).toBeTruthy()
  })
  it('should expose fr mobility', () => {
    const frObj = translations('fr')
    expect(frObj.mobility).toBeTruthy()
  })
})
