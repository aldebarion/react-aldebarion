import React from 'react'
import PropTypes from 'prop-types'

import styles from './adscreen.style'

const AdScreen = (props) => {
  return (
    <div className={`${props.className} ${styles.adscreen} ${styles[`platform${props.platform}`]} ${styles[`background${props.background}`]}`}>
      {props.children}
    </div>
  )
}

AdScreen.propTypes = {
  className: PropTypes.string,
  platform: PropTypes.string,
  background: PropTypes.string,
  children: PropTypes.node.isRequired,
}

AdScreen.defaultProps = {
  className: '',
  platform: 'computer',
  background: 'cross',
}


// const LoadingIndicator = () => <div />
// export default loader(Vault, { LoadingIndicator })

// export default loader(Wizard, { Loader: null })
export default AdScreen
