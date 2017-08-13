import React, { PropTypes } from 'react'

import AdWidget from '../../AdWidget'
import AdIcon from '../../AdIcon'

import style from './AdIconButton.style'

class AdIconButton extends AdWidget {

  render() {
    return (
      <div className={` ${style.adIconButton} ${this.loadClassNames(style)}`} onClick={this.props.onClick}>
        <AdIcon icon={this.props.icon} className={style.adIconButtonIcon} />
        {
          this.props.label ?
            <div className={style.adIconButtonLabel}>{this.props.label}</div> : ''
        }
      </div>
    )
  }
}

AdIconButton.propTypes = {
  ...AdWidget.propTypes,
  label: PropTypes.string,
  icon: PropTypes.string,
  link: PropTypes.string,
  onClick: PropTypes.func,
}

AdIconButton.defaultProps = {
  ...AdWidget.defaultProps,
  label: '',
  icon: null,
  link: null,
}


// const LoadingIndicator = () => <div />
// export default loader(Vault, { LoadingIndicator })

// export default loader(Wizard, { Loader: null })
export default AdIconButton
