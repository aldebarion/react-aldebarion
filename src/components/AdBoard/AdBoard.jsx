import React from 'react'
import PropTypes from 'prop-types'
import ThemeContext, { defaultTheme } from 'contexts/Theme'
import FluidityContext, { defaultFluidity } from 'contexts/Fluidity'

import style from './AdBoard.style'

const AdBoard = ({
  className,
  children,
  theme,
  fluidity,
}) => (
  <ThemeContext.Provider value={{ theme }}>
    <FluidityContext.Provider value={{ fluidity }}>
      <div className={`${style.AdBoard} ${style[theme]} ${className}`}>
        {children}
      </div>
    </FluidityContext.Provider>
  </ThemeContext.Provider>
)

AdBoard.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  theme: PropTypes.string,
  fluidity: PropTypes.string,
}

AdBoard.defaultProps = {
  className: '',
  children: [],
  theme: defaultTheme,
  fluidity: defaultFluidity,
}


export default AdBoard
