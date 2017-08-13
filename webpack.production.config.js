/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
const path = require('path')
// const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')
// const HtmlWebpackPlugin = require('html-webpack-plugin')

const dev = false

console.log(`MODE=${dev ? 'dev' : 'production'}`)

function getEntrySources(sources) {
  return sources
}

function getLoaders(loaders) {
  if (dev) loaders.push('react-hot')
  loaders.push('babel')

  return loaders
}

function getPlugins(plugins) {
  // plugins.push(new HtmlWebpackPlugin({
  //   template: 'examples/index.html',
  //   inject: true,
  //   hash: true,
  // }))
  //
  // if (dev) plugins.push(new webpack.HotModuleReplacementPlugin())
  plugins.push(new ExtractTextPlugin('[name].css'))

  return plugins
}

function getRawCssLoaders(module, inject) {
  const loaders = []
  if (inject) loaders.push('style')
  loaders.push(`css${module ? '?modules&localIdentName=[path]_[local]__[hash:base64:5]' : ''}`)
  if (!dev) loaders.push('postcss')
  loaders.push('sass')

  return loaders
}

function getImageCssLoaders(module, inject) {
  const loaders = []
  if (inject) loaders.push('file-loader?emitFile=false!')
  // loaders.push(`css${module ? '?modules&localIdentName=[path]_[local]__[hash:base64:5]' : ''}`)
  return loaders
}

module.exports = {
  devtool: dev ? 'eval' : '',
  entry: {
    reactAldebarion: getEntrySources([
      './src',
    ]),
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/',
  },
  resolve: {
    root: [path.resolve('./src')],
    extensions: ['', '.js', '.jsx', '.scss', '.jpg', '.png'],
  },
  plugins: getPlugins([]),
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: getLoaders([]),
      exclude: /node_modules/,
    }, {
      test: /\.(jpg|png)$/,
      loaders: getImageCssLoaders(false, true),
      exclude: /node_modules/,
    }, {
      test: /global\.scss/,
      loaders: dev ? getRawCssLoaders(false, true) : [],
      loader: dev ? '' : ExtractTextPlugin.extract(getRawCssLoaders(false)),
    }, {
      test: /\.s?css$/,
      exclude: [/node_modules/, /global\.scss/],
      loaders: dev ? getRawCssLoaders(true, true) : [],
      loader: dev ? '' : ExtractTextPlugin.extract(getRawCssLoaders(true)),
    }],
  },
  postcss: () => [autoprefixer],
}
