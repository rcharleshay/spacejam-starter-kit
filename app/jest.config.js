const path = require('path')

module.exports = {
  rootDir: './src',
  collectCoverage: true,
  coverageDirectory: '<rootDir>/../coverage',
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0
    }
  },
  collectCoverageFrom: ['**/*.{js,jsx}'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  },
  setupFiles: ['<rootDir>/ui/__mocks__/requestAnimationFrame.js', path.resolve('jest/setupEnzyme.js'), path.resolve('jest/setupGlobals.js')],
  coveragePathIgnorePatterns: ['/node_modules/', '/coverage/', 'client.js', '/middleware/', '/server'],
  moduleNameMapper: {
    '\\.(css|less|scss)$': '<rootDir>/ui/__mocks__/styleMock.js',
    '\\.(jpg|jpeg|png|gif)$': '<rootDir>/ui/__mocks__/fileMock.js',
    'src/(.*)': '<rootDir>/$1'
  },
  testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)(spec|test).js?(x)']
}
