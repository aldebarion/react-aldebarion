import React from 'react'
import PropTypes from 'prop-types'

import AdWidget from '../AdWidget'

// import AdSeparator from '../AdSeparator'

import style from './AdBoard.style'

class AdBoard extends AdWidget {
  render() {
    return (
      <div className={`${this.loadClassNames(style)} ${style.adBoard}`} >
        {this.props.children}
      </div>
    )
  }
}

AdBoard.propTypes = {
  ...AdWidget.propTypes,
  from: PropTypes.string,
  to: PropTypes.string,
  children: PropTypes.node.isRequired,
}

AdBoard.defaultProps = {
  ...AdWidget.defaultProps,
  from: 'left',
  to: 'right',
}

export default AdBoard
