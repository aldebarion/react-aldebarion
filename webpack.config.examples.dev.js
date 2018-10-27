const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const ROOT_PATH = '/'

module.exports = {
  entry: ['react-hot-loader/patch', path.resolve(__dirname, 'examples/index.jsx')],
  output: {
    publicPath: ROOT_PATH,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        // enforce: 'pre',
        exclude: [path.resolve(__dirname, 'node_modules')],
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: { minimize: true },
        },
      },
      {
        test: /\.ttf$/,
        use: {
          loader: 'file-loader',
          options: {
            limit: 50000,
            name: '[name].[ext]',
            outputPath: 'fonts/',
          },
        },
      },
      {
        oneOf: [
          {
            exclude: [/\.(js|jsx)$/, /\.html$/, /\.scss$/, /\.json$/],
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.scss', '*'],
    modules: ['node_modules', path.resolve(__dirname, 'src')],
    alias: {
      'react-aldebarion': path.resolve(__dirname, 'src/index.js'),
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      ROOT_PATH: `"${ROOT_PATH}"`,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './examples/index.html'),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    port: 9000,
    publicPath: '/',
    hot: true,
    host: '0.0.0.0',
    historyApiFallback: true,
  },
}

//
// // On ajoute notre react-hot-loader/patch au point d'entrée
// if (process.env.NODE_ENV !== 'production') {
//   config.plugins.push(new webpack.NamedModulesPlugin())
//   config.entry = ['react-hot-loader/patch', config.entry]
// }
//
//  = config
