const webpack = require('webpack')
const path = require('path')

const webpackDevConfig = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.join(__dirname, 'src'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: ['url-loader?limit=8192']
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        use: ['file-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      /**
       * The modules below expose styled components, react and react-dom globally
       */
      {
        test: /\.*styled-components.*$/,
        use: [
          {
            loader: 'expose-loader',
            options: 'styled'
          }
        ]
      },
      {
        test: require.resolve('react'),
        use: [
          {
            loader: 'expose-loader',
            options: 'React'
          }
        ]
      },
      {
        test: require.resolve('react-dom'),
        use: [
          {
            loader: 'expose-loader',
            options: 'ReactDom'
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      // adjust this path as needed depending on where your webpack config is
      'styled-components': path.resolve('./node_modules/styled-components')
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.BROWSER': JSON.stringify(true)
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}
module.exports = webpackDevConfig
