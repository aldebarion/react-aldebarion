import React from 'react'
import PropTypes from 'prop-types'

import { contexts } from 'react-aldebarion'

import style from './Example.style'

const Example = ({ className, children }) => (
  <contexts.Theme.Consumer>
    {({ theme }) => (
      <div className={`${style.Example} ${style[theme]} ${className}`}>
        {children}
      </div>
    )}
  </contexts.Theme.Consumer>
)

Example.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
}

Example.defaultProps = {
  className: '',
  children: [],
}

export default Example
