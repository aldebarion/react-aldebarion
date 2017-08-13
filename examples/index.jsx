import React from 'react'
import { render } from 'react-dom'
// import { Provider } from 'react-redux'

import 'isomorphic-fetch'
/* eslint import/no-extraneous-dependencies: 0 import/no-unresolved: 0 */
import 'file?name=[name].[ext]!./index.html'
import './global.scss'

import App from './components/App'

/* eslint-env browser */

render(
  <App />
  , document.getElementById('index')
)
