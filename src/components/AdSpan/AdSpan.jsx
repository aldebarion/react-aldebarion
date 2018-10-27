import React from 'react'
import PropTypes from 'prop-types'
import ThemeContext from 'contexts/Theme'
import style from './AdSpan.style'

const AdSpan = ({ className, children, discreet }) => (
  <ThemeContext.Consumer>
    {({ theme }) => (
      <span className={`${style.AdSpan} ${style[theme]} ${discreet ? style.discreet : ''} ${className}`}>
        {children}
      </span>
    )}
  </ThemeContext.Consumer>
)

AdSpan.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  discreet: PropTypes.bool,
}

AdSpan.defaultProps = {
  className: '',
  children: [],
  discreet: false,
}


export default AdSpan
