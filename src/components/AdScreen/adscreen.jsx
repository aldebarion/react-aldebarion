import React, { PropTypes } from 'react'
// import { Link } from 'react-router'
// import Typist from 'react-typist'

import styles from './adscreen.style'

// import Nav from '../Nav'

const AdScreen = (props) => {
  const { className = '', platform = 'computer' } = props
  return (
    <div className={`${className} ${styles.adscreen}`}>
        {props.children}
    </div>
  )
}

AdScreen.propTypes = {
  className: PropTypes.string,
  platform: PropTypes.string,
}

// const LoadingIndicator = () => <div />
// export default loader(Vault, { LoadingIndicator })

// export default loader(Wizard, { Loader: null })
export default AdScreen
