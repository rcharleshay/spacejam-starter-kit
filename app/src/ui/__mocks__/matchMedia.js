const mediaQuery = require('css-mediaquery') // eslint-disable-line

const doesQueryMatch = (query, viewportSize) => {
  if (!viewportSize) {
    return true
  }

  return mediaQuery.match(query, {
    type: 'screen',
    width: `${viewportSize}px`
  })
}

module.exports = (viewportSize) => {
  const matchMedia = jest.fn()
  matchMedia.mockImplementation((query) => {
    const matches = doesQueryMatch(query, viewportSize)

    return {
      matches,
      addListener: () => {},
      removeListener: () => {}
    }
  })

  global.matchMedia = matchMedia
}
