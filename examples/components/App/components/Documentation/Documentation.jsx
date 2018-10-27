import React, { Fragment } from 'react'
// import PropTypes from 'prop-types'
import { Route, Switch, NavLink } from 'react-router-dom'

import Login from './components/Login'
import Components from './components/Components'

import style from './Documentation.style'

export default () => (
  <Fragment>
    <div className={style.nav}>
      <h1>&aring;LDEBARIØN</h1>

      <h2>Components</h2>
      <div className={style.section}>
        <NavLink to="/docs/components/input">Input</NavLink>
      </div>
      <h2>Examples</h2>
      <div className={style.section}>
        <NavLink to="/docs/examples/login">Login</NavLink>
      </div>
    </div>
    <div className={style.main}>
      {/* location.pathname.indexOf('/projects/') === -1 ? <Nav /> : null */}
      <Switch>
        <Route
          path="/docs/components"
          component={Components}
        />
        <Route exact path="/docs/examples/login" component={Login} />
      </Switch>
    </div>
  </Fragment>
)
