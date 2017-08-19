import React, { PropTypes } from 'react'

import AdWidget from '../../AdWidget'
import AdIcon from '../../AdIcon'

import style from './AdHexaButton.style'

class AdHexaButton extends AdWidget {
  render() {
    return (
      <div className={` ${style.adHexaButton} ${this.loadClassNames(style)}`} onClick={this.props.onClick}>
        <div className={style.adHexaButtonIcon}>
          <AdIcon icon={this.props.icon} className={style.icon} />
        </div>
      </div>
    )
  }
}

AdHexaButton.propTypes = {
  ...AdWidget.propTypes,
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func,
}

AdHexaButton.defaultProps = {
  ...AdWidget.defaultProps,
}


// const LoadingIndicator = () => <div />
// export default loader(Vault, { LoadingIndicator })

// export default loader(Wizard, { Loader: null })
export default AdHexaButton
