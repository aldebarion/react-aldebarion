import React from 'react'
import PropTypes from 'prop-types'

import { contexts } from 'react-aldebarion'

import style from './Palette.style'

const Palette = ({ className, title, colors }) => (
  <contexts.Theme.Consumer>
    {({ theme }) => (
      <div className={`${style.Palette} ${className}`}>
        <div className={`${style.title} ${style[theme]}`}>{title}</div>
        <div className={`${style.container} ${style[theme]}`}>
          {colors.map(({ color, label, foreground }) => (
            <div key={color} className={`${style.item} ${style[theme]}`} style={{ background: color, color: foreground }}>
              <div className={style.label}>{label}</div>
              <div className={style.color}>{color}</div>
            </div>
          ))}
        </div>
      </div>
    )}
  </contexts.Theme.Consumer>
)

Palette.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  colors: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    color: PropTypes.string,
    foreground: PropTypes.string,
  })),
}

Palette.defaultProps = {
  className: '',
  title: '',
  colors: [],
}

export default Palette
