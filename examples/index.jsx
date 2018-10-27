import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader'

import 'react-aldebarion'

import './index.style'
import App from './components/App'

const renderApp = () => {
  ReactDOM.render(
    <AppContainer>
      <Router basename={ROOT_PATH}>
        <App />
      </Router>
    </AppContainer>,
    document.getElementById('root'),
  )
}

if (module.hot) {
  module.hot.accept('./components/App', renderApp)
}
renderApp()
