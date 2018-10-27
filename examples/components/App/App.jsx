import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { AdBoard } from 'react-aldebarion'

import Guide from './components/Guide'
import Welcome from './components/Welcome'
import Components from './components/Components'
import Header from './components/Header'
import Footer from './components/Footer'

import style from './App.style'

export default () => (
  <AdBoard className={style.App} theme="moon-light">
    <Header className={style.header} />
    <div className={style.main}>
      <Switch>
        <Route exact path="/" component={Welcome} />
        <Route path="/components" component={Components} />
        <Route path="/guide" component={Guide} />
      </Switch>
      <div className={style.margin} />
      <Footer className={style.footer} />
    </div>
  </AdBoard>
)
