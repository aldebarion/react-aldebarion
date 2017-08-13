import React, { PropTypes } from 'react'
// import { Link } from 'react-router'
// import Typist from 'react-typist'

import AdWidget from '../../AdWidget'
import AdIcon from '../../AdIcon'

import style from './adbutton.style'

class AdButton extends AdWidget {

  // constructor(props) {
  //   super(props)
  //   console.log(this.props)
  // }

  render() {
    return (
      <button className={` ${style.adButton} ${this.loadClassNames(style)}`} onClick={this.props.onClick}>
        <div className={style.adButtonLabel}>
          { this.props.label }
        </div>
        { this.props.icon != null ?
          <AdIcon icon={this.props.icon} className={style.adButtonIcon} /> : null }
      </button>
    )
  }
}

AdButton.propTypes = {
  ...AdWidget.propTypes,
  label: PropTypes.string,
  icon: PropTypes.string,
  link: PropTypes.string,
  onClick: PropTypes.func,
}

AdButton.defaultProps = {
  ...AdWidget.defaultProps,
  label: '',
  icon: null,
  link: null,
}


// const LoadingIndicator = () => <div />
// export default loader(Vault, { LoadingIndicator })

// export default loader(Wizard, { Loader: null })
export default AdButton
