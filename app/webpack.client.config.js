const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const AssetsPlugin = require('assets-webpack-plugin')
const { UI_BASENAME } = require('./src/config/constants')
const webpackDevConfig = require('./webpack.dev.client.config')
const webpackProdConfig = require('./webpack.prod.client.config')

process.noDeprecation = true

let webpackConfig = {
  entry: {
    bundle: './src/client.js',
    vendor: [
      'react',
      'react-router',
      'react-dom',
      'redux',
      'immutable',
      'react-redux',
      'react-helmet',
      'prop-types',
      'isomorphic-fetch',
      'history',
      '@telus/isomorphic-core'
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: (process.env.NODE_ENV === 'development') ? '[name].js' : '[name]_[chunkhash].js',
    publicPath: `${UI_BASENAME}/static/`
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    alias: {
      src: path.resolve(__dirname, './src')
    }
  },
  plugins: [
    new AssetsPlugin({ filename: 'bundleInfo.json' }),
    new webpack.LoaderOptionsPlugin({
      options: {
        context: __dirname
      }
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          name: 'vendor',
          test: 'vendor',
          enforce: true
        }
      }
    }
  }
}

if (process.env.NODE_ENV === 'production') {
  webpackConfig = merge(webpackConfig, webpackProdConfig)
} else {
  webpackConfig = merge(webpackConfig, webpackDevConfig)
}

module.exports = webpackConfig
