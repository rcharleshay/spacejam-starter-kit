module.exports = (api) => {
  // When env changes, cache will be invalidated.  I think this is ok for now?
  api.cache(() => process.env.NODE_ENV)

  const config = {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false
        }
      ],
      '@babel/preset-react'
    ],
    plugins: [
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      '@babel/plugin-proposal-function-sent',
      '@babel/plugin-proposal-export-namespace-from',
      '@babel/plugin-proposal-numeric-separator',
      '@babel/plugin-proposal-throw-expressions',
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-transform-runtime',
      'babel-plugin-styled-components'
    ],
    env: {
      production: {
        presets: []
      },
      node: {
        presets: [['@babel/preset-env']],
        plugins: [['dynamic-import-node']]
      },
      test: {
        presets: [['@babel/preset-env']],
        plugins: [['dynamic-import-node']]
      }
    }
  }

  return config
}
