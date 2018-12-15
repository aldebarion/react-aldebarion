import React, { Component } from 'react'
import { Route, withRouter, Switch } from 'react-router-dom'
import { AdBoard } from 'react-aldebarion'
import PropTypes from 'prop-types'

import Guide from './components/Guide'
import Welcome from './components/Welcome'
import Components from './components/Components'
import Header from './components/Header'
import Footer from './components/Footer'
import Examples from './components/Examples'

import style from './App.style'

class App extends Component {
  componentDidUpdate(prevProps) {
    const { location } = this.props
    if (location !== prevProps.location) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    return (
      <AdBoard className={style.App} theme="moon-light" ref={(e) => { this.app = e }}>
        <Header className={style.header} />
        <div className={style.main}>
          <Switch>
            <Route exact path="/" component={Welcome} />
            <Route path="/components" component={Components} />
            <Route path="/guide" component={Guide} />
            <Route path="/examples" component={Examples} />
          </Switch>
          <div className={style.margin} />
          <Footer className={style.footer} />
        </div>
        <div id="root-modal" className={style.rootModal} />
      </AdBoard>
    )
  }
}

App.propTypes = {
  location: PropTypes.object.isRequired, // eslint-disable-line
}


export default withRouter(App)
