import React from 'react'
import PropTypes from 'prop-types'
import ThemeContext from 'contexts/Theme'
import style from './AdLoader.style'

import loaderGif from './assets/loader.gif'
import loaderGifCrop from './assets/loader-crop.gif'
// import loaderGifFast from './assets/loader-fast.gif'
import loaderGifVeryFast from './assets/loader-very-very-very-fast.gif'

const AdLoader = ({ className, fast }) => (
  <ThemeContext.Consumer>
    {({ theme }) => (
      <span className={`${style.AdLoader} ${style[theme]} ${className}`}>
        <img className={style.loader} src={fast ? loaderGifVeryFast : loaderGifCrop} alt="loader2" />
      </span>
    )}
  </ThemeContext.Consumer>
)

AdLoader.propTypes = {
  className: PropTypes.string,
  fast: PropTypes.bool,
}

AdLoader.defaultProps = {
  className: '',
  fast: false,
}


export default AdLoader
