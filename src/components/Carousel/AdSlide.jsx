import React /* , { PropTypes }*/ from 'react'

import AdWidget from '../AdWidget'

import style from './AdSlide.style'

class AdSlide extends AdWidget {

  render() {
    return (
      <div className={`${this.loadClassNames(style)} ${style.adSlide}`}>
        {this.props.children}
      </div>
    )
  }
}

AdSlide.propTypes = {
  ...AdWidget.propTypes,
}

AdSlide.defaultProps = {
  ...AdWidget.defaultProps,
}

export default AdSlide
