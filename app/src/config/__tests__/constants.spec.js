import constants from '../constants'

describe('constants', () => {
  it('should expose UI basename', () => {
    expect(constants.UI_BASENAME).toBeTruthy()
  })

  it('should expose backend basename', () => {
    expect(constants.BACKEND_BASENAME).toBeTruthy()
  })
})
