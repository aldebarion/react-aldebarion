import React, { PropTypes } from 'react'

import AdWidget from '../AdWidget'

import style from './AdEyeCatcher.style'

class AdEyeCatcher extends AdWidget {

  render() {
    return (
      <div className={`${this.loadClassNames(style)} ${style.adEyeCatcher} ${style[`from${this.props.from}`]} ${style[`to${this.props.to}`]}`} />
    )
  }
}

AdEyeCatcher.propTypes = {
  ...AdWidget.propTypes,
  from: PropTypes.string,
  to: PropTypes.string,
}

AdEyeCatcher.defaultProps = {
  ...AdWidget.defaultProps,
  from: 'left',
  to: 'right',
}

export default AdEyeCatcher
