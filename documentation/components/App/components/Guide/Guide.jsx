import React from 'react'
import {
  Route,
  Switch,
  NavLink,
  Redirect,
} from 'react-router-dom'

import { contexts } from 'react-aldebarion'
import { AnimatedGroup, AnimatedItem } from 'react-progressive-entrance'

import style from './Guide.style'

import Introduction from './components/Introduction'
// import Story from './components/Story'
import Inspirations from './components/Inspirations'
import Minimalism from './components/Minimalism'
import Consistency from './components/Consistency'
import Animations from './components/Animations'

const routes = [
  {
    route: '/guide/introduction',
    label: 'Introduction',
    component: Introduction,
  },
  {
    title: 'Guidelines',
  },
  {
    route: '/guide/minimalism',
    label: 'Minimalism',
    component: Minimalism,
  },
  {
    route: '/guide/consistency',
    label: 'Consistency',
    component: Consistency,
  },
  {
    route: '/guide/animations',
    label: 'Animations',
    component: Animations,
  },
  {
    title: 'Design',
  },
  {
    route: '/guide/inspirations',
    label: 'Inspirations',
    component: Inspirations,
  },
]


export default () => (
  <contexts.Theme.Consumer>
    {({ theme }) => (
      <div className={`${style.Guide} ${style[theme]}`}>
        <div className={style.left}>
          <AnimatedGroup animation="fadeIn" interval={50} maxIndex={200}>
            <ul className={style.list}>
              {
                routes.map((route, index) => (
                  <AnimatedItem animationIndex={index + 1} key={route.route || route.title}>
                    {
                      route.title ? (
                        <li className={`${style.subtitle} ${style[theme]}`}>{route.title}</li>
                      ) : (
                        <li key={route.route} className={style.item}>
                          <NavLink className={`${style.link} ${style[theme]}`} activeClassName={style.active} to={route.route}>{route.label}</NavLink>
                        </li>
                      )
                    }
                  </AnimatedItem>

                ))
              }
            </ul>
          </AnimatedGroup>
        </div>
        <div className={style.main}>
          <Switch>
            {
              routes.map(route => (
                route.route
                  ? (
                    <Route key={route.route} path={route.route} component={route.component} />
                  ) : null
              ))
            }
            <Redirect from="/guide/" to="/guide/introduction" />
          </Switch>
        </div>
      </div>
    )}
  </contexts.Theme.Consumer>
)
