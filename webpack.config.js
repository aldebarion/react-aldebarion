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

console.log(`MODE=${dev ? 'dev' : 'production'}`)

module.exports = {
  devtool: dev ? 'inline-source-map' : 'cheap-module-source-map',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
    library: dev ? undefined : libraryName,
    libraryTarget: dev ? 'var' : 'umd',
  },
  entry: (() => {
    const sources = []
    if (dev) {
      sources.push('webpack-dev-server/client?http://localhost:3000')
      sources.push('webpack/hot/only-dev-server')
      // sources.push('react-hot-loader/patch')
      sources.push(path.resolve('./examples/index.jsx'))
      if (process.env.LIB === 'from_dist') {
        sources.push(path.resolve('./examples/style.js'))
      }
    } else {
      sources.push(path.resolve('./src/index.js'))
    }

    return sources
  })(),
  devServer: {
    port: 3000,
    contentBase: './examples',
    hot: dev,
  },
  context: (() => {
    if (dev) {
      return path.resolve('examples')
    }
    return path.resolve('src')
  })(),
  resolve: {
    extensions: ['*', '.js', '.jsx', '.scss', '.jpg', '.png'],
    modules: ['./node_modules'],
    alias: (() => {
      if (dev) {
        if (process.env.LIB === 'from_dist') {
          return {
            'react-aldebarion': path.resolve('./dist'),
            'react-aldebarion/dist/reactAldebarion.css': path.resolve('./dist/reactAldebarion.css'),
          }
        }
        return {
          'react-aldebarion': path.resolve('./src'),
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
      loaders: ['style-loader', 'css-loader?modules', 'sass-loader'],
    }, {
      test: /\.scss$/,
      exclude: [/node_modules/, /global\.scss/, /reactAldebarion\.css$/],
      loaders: ['style-loader', 'css-loader?modules', 'sass-loader'],
    }, {
      test: /reactAldebarion\.css$/,
      loaders: ['style-loader', 'css-loader', 'css-loader?modules'],
    }, /* {
      test: /\.html$/,
      loaders: ['html-loader'],
    }*/],
  },
  plugins: (() => {
    if (dev) {
      return [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
          template: 'index.html',
        }),
      ]
    }
    return []
  })(),
  performance: {
    hints: false,
  },
}
