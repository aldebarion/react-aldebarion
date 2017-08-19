/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
const path = require('path')
const webpack = require('webpack')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const libraryName = 'react-aldebarion'

// minify or not
// entry sources (examples or src)
const dev = (process.env.NODE_ENV !== 'production')
const useCompiledAldebarion = (process.env.LIB === 'from_dist')
const buildExamples = (process.env.BUILD === 'examples')

// const AUTOPREFIXER_BROWSERS = [
//   'Android 2.3',
//   'Android >= 4',
//   'Chrome >= 35',
//   'Firefox >= 31',
//   'Explorer >= 9',
//   'iOS >= 7',
//   'Opera >= 12',
//   'Safari >= 7.1',
// ]

console.log(`MODE=${dev ? 'dev' : 'production'}`)

module.exports = {
  devtool: dev ? 'inline-source-map' : 'cheap-module-source-map',
  output: {
    path: buildExamples ? path.join(__dirname, '.') : path.join(__dirname, 'dist'),
    filename: '[name]',
    library: dev && !buildExamples ? undefined : libraryName,
    libraryTarget: dev && !buildExamples ? 'var' : 'umd',
    publicPath: '/',
  },
  entry: (() => {
    const sources = []
    if (dev) {
      // sources.push('webpack-dev-server/client?http://localhost:3000')
      sources.push('webpack/hot/only-dev-server')
      // sources.push('react-hot-loader/patch')
    }
    if (buildExamples) {
      if (dev) {
        sources.push(path.join(__dirname, './examples/index.jsx'))
      } else {
        return { 'index.js': path.join(__dirname, './examples/index.jsx') }
      }
    } else {
      sources.push(path.join(__dirname, './src/index.js'))
      // sources['style.css'] = './style/style.scss'
    }


    return sources
  })(),
  devServer: {
    port: 3000,
    contentBase: path.join(__dirname, './examples'),
    hot: false,
    historyApiFallback: true,
  },
  context: (() => {
    if (buildExamples) {
      return path.join(__dirname, 'examples')
    }
    return path.join(__dirname, 'src')
  })(),
  resolve: {
    extensions: ['*', '.js', '.jsx', '.scss', '.jpg', '.png', '.gif'],
    modules: ['node_modules'],
    alias: (() => {
      if (buildExamples) {
        if (useCompiledAldebarion) {
          return {
            'react-aldebarion': path.join(__dirname, './dist'),
          }
        }
        return {
          'react-aldebarion': path.join(__dirname, './src'),
        }
      }
      return {}
    })(),
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      loaders: (() => {
        const loaders = []
        if (dev) {
          loaders.push('react-hot-loader')
        }
        loaders.push('babel-loader?presets[]=react,presets[]=es2015,presets[]=es2017,presets[]=stage-0')
        return loaders
      })(),
      exclude: /node_modules/,
    }, {
      test: /\.(jpg|png|gif)$/,
      loaders: [
        'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
        'image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false',
      ],
      exclude: /node_modules/,
    }, {
      test: /global\.scss/,
      loaders: ['style-loader', 'css-loader?modules', /* 'postcss-loader', */ 'sass-loader'],
    }, {
      test: /\.scss$/,
      exclude: [/node_modules/, /global\.scss/],
      loaders: ['style-loader', 'css-loader?modules', /* 'postcss-loader', */ 'sass-loader'],
    }],
  },
  plugins: (() => {
    const plugins = []
    if (dev) {
      plugins.push(new webpack.HotModuleReplacementPlugin())
    }

    if (buildExamples) {
      plugins.push(new HtmlWebpackPlugin({
        template: 'index.html',
      }))
    }

    return plugins
  })(),
  performance: {
    hints: false,
  },
}
