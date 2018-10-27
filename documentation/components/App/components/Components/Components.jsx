import React, { Fragment, Component } from 'react'
import {
  Route,
  Switch,
  NavLink,
  Redirect,
} from 'react-router-dom'

import { contexts } from 'react-aldebarion'
import { AnimatedGroup, AnimatedItem } from 'react-progressive-entrance'

import style from './Components.style'

import Loader from './components/Loader'
import Input from './components/Input'
import Icon from './components/Icon'
import Button from './components/Button'
import Typography from './components/Typography'
import Radio from './components/Radio'
import Checkbox from './components/Checkbox'
import Color from './components/Color'
import Switch2 from './components/Switch'
import QuickStart from './components/QuickStart'
import Dice from './components/Dice'
import Slider from './components/Slider'

const routes = [
  {
    title: 'Development',
    routes: [
      {
        route: '/components/quick-start',
        label: 'Quick start',
        component: QuickStart,
      },
    ],
  },
  {
    title: 'Basic',
    routes: [
      {
        route: '/components/color',
        label: 'Color',
        component: Color,
      },
      {
        route: '/components/typography',
        label: 'Typography',
        component: Typography,
      },
      {
        route: '/components/icon',
        label: 'Icon',
        component: Icon,
      },
      {
        route: '/components/button',
        label: 'Button',
        component: Button,
      },
      {
        route: '/components/loader',
        label: 'Loader',
        component: Loader,
      },
    ],
  },
  {
    title: 'Form',
    routes: [
      {
        route: '/components/switch',
        label: 'Switch',
        component: Switch2,
      },
      {
        route: '/components/radio',
        label: 'Radio',
        component: Radio,
      },
      {
        route: '/components/checkbox',
        label: 'Checkbox',
        component: Checkbox,
      },
      {
        route: '/components/input',
        label: 'Input',
        component: Input,
      },
    ],
  },
  {
    title: 'Animations',
    routes: [
      {
        route: '/components/dice',
        label: 'Dice',
        component: Dice,
      },
      {
        route: '/components/slider',
        label: 'Slider',
        component: Slider,
      },
    ],
  },
]

let totalIndex = 0

routes.forEach((route, index) => {
  routes[index].index = 1 + totalIndex
  totalIndex = 1 + routes[index].routes.length
})

export default class Components extends Component {
  render() {
    return (
      <contexts.Theme.Consumer>
        {({ theme }) => (
          <div className={style.Components}>
            <div className={style.left} ref={(e) => { this.app = e }}>
              <AnimatedGroup animation="fadeIn" interval={50} maxIndex={200}>
                <ul className={style.list}>
                  {
                    routes.map(section => (
                      <Fragment key={section.title}>
                        <AnimatedItem animationIndex={section.index}>
                          <li className={`${style.subtitle} ${style[theme]}`}>{section.title}</li>
                        </AnimatedItem>
                        {section.routes.map((route, index) => (
                          <AnimatedItem key={route.route} animationIndex={section.index + index}>
                            <li className={style.item}>
                              <NavLink className={`${style.link} ${style[theme]}`} activeClassName={style.active} to={route.route}>{route.label}</NavLink>
                            </li>
                          </AnimatedItem>
                        ))}
                      </Fragment>
                    ))
                  }
                </ul>
              </AnimatedGroup>
            </div>
            <div className={style.main}>
              <Switch>
                {
                  routes.map(section => (
                    section.routes.map(route => (
                      <Route key={route.route} path={route.route} component={route.component} />
                    ))))
                }
                <Redirect from="/components/" to="/components/quick-start" />
              </Switch>
            </div>
          </div>
        )}
      </contexts.Theme.Consumer>
    )
  }
}
