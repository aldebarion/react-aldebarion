/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
const path = require('path')
const webpack = require('webpack')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const libraryName = 'react-aldebarion'

// minify or not
// entry sources (examples or src)
const dev = (process.env.NODE_ENV !== 'production')
const useCompiledAldebarion = (process.env.LIB === 'from_dist')


const AUTOPREFIXER_BROWSERS = [
  'Android 2.3',
  'Android >= 4',
  'Chrome >= 35',
  'Firefox >= 31',
  'Explorer >= 9',
  'iOS >= 7',
  'Opera >= 12',
  'Safari >= 7.1',
]

console.log(`MODE=${dev ? 'dev' : 'production'}`)

module.exports = {
  devtool: dev ? 'inline-source-map' : 'cheap-module-source-map',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]',
    library: dev ? undefined : libraryName,
    libraryTarget: dev ? 'var' : 'umd',
  },
  entry: (() => {
    const sources = {}
    // if (dev) {
    //   sources.push('webpack-dev-server/client?http://localhost:3000')
    //   sources.push('webpack/hot/only-dev-server')
    //   // sources.push('react-hot-loader/patch')
    // }
    if (dev) {
      sources['index.js'] = path.join(__dirname, './examples/index.jsx')
    } else {
      sources['index.js'] = path.join(__dirname, './src/index.js')
      // sources['style.css'] = './style/style.scss'
    }


    return sources
  })(),
  devServer: {
    port: 3000,
    contentBase: path.join(__dirname, './examples'),
    hot: dev,
  },
  context: (() => {
    if (dev) {
      return path.join(__dirname, 'examples')
    }
    return path.join(__dirname, 'src')
  })(),
  resolve: {
    extensions: ['*', '.js', '.jsx', '.scss', '.jpg', '.png', '.gif'],
    modules: ['node_modules'],
    alias: (() => {
      if (dev) {
        if (useCompiledAldebarion) {
          return {
            'react-aldebarion': path.join(__dirname, './dist'),
            'react-aldebarion/dist/reactAldebarion.css': path.join(__dirname, './dist/reactAldebarion.css'),
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
      loaders: ['react-hot-loader', 'babel-loader?presets[]=react,presets[]=es2015,presets[]=es2017,presets[]=stage-0'],
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
      loaders: ['style-loader', 'css-loader?modules', /* 'postcss-loader',*/ 'sass-loader'],
    }, {
      test: /\.scss$/,
      exclude: [/node_modules/, /global\.scss/],
      loaders: ['style-loader', 'css-loader?modules', /* 'postcss-loader',*/ 'sass-loader'],
    }],
  },
  plugins: (() => {
    const plugins = []
    if (dev) {
      plugins.push(new webpack.HotModuleReplacementPlugin())
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
