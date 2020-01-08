const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
require("babel-polyfill")

process.noDeprecation = true

const webpackConfig = {
  entry: ['babel-polyfill', './src/server'],

  mode: 'none', // Use custom mode. Production mode enables ModuleConcatenation and Uglify Plugins, which we don't want

  target: 'node', // Ignore built-in modules like path, fs, etc.
  externals: [nodeExternals()], // Ignore all modules in node_modules folder

  output: {
    path: path.join(__dirname, 'server-dist'),
    filename: 'server.js'
  },

  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    alias: {
      src: path.resolve(__dirname, './src')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ],
        include: path.join(__dirname, 'src'),
        exclude: [
          /node_modules/,
          path.join(__dirname, 'node_modules')
        ]
      },
      {
        test: /\.(css|scss|sass)$/,
        use: [
          'isomorphic-style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.BROWSER': JSON.stringify(false)
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        context: __dirname
      }
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.IgnorePlugin(/__tests__/),
    new webpack.IgnorePlugin(/__mocks__/)

  ],
  optimization: {
    minimize: false
  }
}

module.exports = webpackConfig
