import {
  formatPhone,
  formatName
} from '../format'


describe('formatPhoneNumber', () => {
  it('should format phone number', () => {
    const number = '123456789'
    expect(formatPhone(number)).toEqual('123-456-789')
  })
})

describe('formatName', () => {
  it('should return name when <18 chars', () => {
    const longName = 'tom'
    const formatttedName = 'tom'

    expect(formatName(longName)).toEqual(formatttedName)
  })

  it('should format name when >=18 chars', () => {
    const longName = '1234567890123456789'
    const formatttedName = '12345678901234567...'

    expect(formatName(longName)).toEqual(formatttedName)
  })

  it('should return false', () => {
    expect(formatName('')).toEqual(false)
  })
})
