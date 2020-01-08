import logger from '../logger'

describe('Logger', () => {
  it('should expose a logger instance', () => {
    expect(logger.log).toBeInstanceOf(Function)
    expect(logger.debug).toBeInstanceOf(Function)
    expect(logger.info).toBeInstanceOf(Function)
  })
})
