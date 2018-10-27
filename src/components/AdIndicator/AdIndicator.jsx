import React from 'react'
import PropTypes from 'prop-types'
// import ThemeContext from 'contexts/Theme'
import AdIcon from 'components/AdIcon'

import style from './AdIndicator.style'

const AdIndicator = ({ className, icons, currentIconIndex }) => (
  <div className={`${style.AdIndicator} ${className}`}>
    <div className={style.container} style={{ top: `-${100 * currentIconIndex}%`, height: `${100 * icons.length}%` }}>
      {icons.map(icon => (
        <div key={icon} className={style.icon} style={{ flex: `0 0 ${100 / icons.length}%` }}>
          <AdIcon icon={icon} />
        </div>
      ))}
    </div>
  </div>
)

AdIndicator.propTypes = {
  className: PropTypes.string,
  icons: PropTypes.arrayOf(PropTypes.string),
  currentIconIndex: PropTypes.number,
}

AdIndicator.defaultProps = {
  className: '',
  icons: [],
  currentIconIndex: 0,
}


export default AdIndicator
