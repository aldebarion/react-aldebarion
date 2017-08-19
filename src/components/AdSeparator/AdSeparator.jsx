import React from 'react'
// import PropTypes from 'prop-types'

import AdWidget from '../AdWidget'

import style from './AdSeparator.style'

class AdSeparator extends AdWidget {
  render() {
    return (
      <div className={`${this.loadClassNames(style)} ${style.adSeparator}`} />
    )
  }
}
// AdSeparator.propTypes = {
//   ...AdWidget.propTypes,
//   from: PropTypes.string,
//   to: PropTypes.string,
// }
//
// AdSeparator.defaultProps = {
//   ...AdWidget.defaultProps,
//   from: 'left',
//   to: 'right',
// }

export default AdSeparator
