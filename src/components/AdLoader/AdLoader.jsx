import React from 'react'

import AdWidget from '../AdWidget'

import style from './AdLoader.style'

class AdLoader extends AdWidget {
  render() {
    return (
      <div className={`${style.adLoader} ${this.loadClassNames(style)}`} >
        fdsfdsf
      </div>
    )
  }
}

// <img src="loader.gif" className={style.loader} alt="loader" />

export default AdLoader
