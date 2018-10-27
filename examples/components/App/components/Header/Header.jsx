import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { AnimatedGroup, AnimatedItem } from 'react-progressive-entrance'

import { ALDEBARION, contexts } from 'react-aldebarion'

import style from './Header.style'

const routes = [
  {
    route: '/guide',
    label: 'Guide',
  },
  {
    route: '/components',
    label: 'Components',
  },
  // {
  //   route: '/examples',
  //   label: 'Examples',
  // },
]

const Header = ({ className }) => (
  <contexts.Theme.Consumer>
    {({ theme }) => (
      <header className={`${style.Header} ${style[theme]} ${className}`}>
        <AnimatedGroup animation="fadeInTop" interval={50} maxIndex={200}>
          <div className={style.left}>
            <h1 className={style.title}>
              <AnimatedItem animationIndex={1}>
                <NavLink className={style.titleLink} to="/">
                  { ALDEBARION }
                </NavLink>
              </AnimatedItem>
            </h1>
          </div>
          <div className={style.right}>
            {routes.map((route, index) => (
              <AnimatedItem key={`index-${6 + index}`}  animationIndex={6 + index * 5}>
                <NavLink key={route.route} className={`${style.link} ${style[theme]}`} activeClassName={style.active} to={route.route}>{route.label}</NavLink>
              </AnimatedItem>
            ))}
          </div>
        </AnimatedGroup>
      </header>
    )}
  </contexts.Theme.Consumer>
)

Header.propTypes = {
  className: PropTypes.string,
}

Header.defaultProps = {
  className: '',
}

export default Header
