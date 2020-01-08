import {
  formatPhoneNumber,
  formatName,
  formatString
} from '..'


describe('formatPhoneNumber', () => {
  it('should format phone number', () => {
    const number = '123456789'
    expect(formatPhoneNumber(number)).toEqual('123-456-789')
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

describe('formatString', () => {
  it('formats string with key and value supplied', () => {
    expect(formatString('Happy formatting {{$$$}}', '$$$', 'test')).toEqual('Happy formatting test')
  })

  it('returns the value if string is empty', () => {
    expect(formatString(undefined, '$$$', 'test')).toEqual('test')
  })
})

