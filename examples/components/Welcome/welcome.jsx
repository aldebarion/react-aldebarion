import React, { PropTypes } from 'react'
// import { Link } from 'react-router'
// import Typist from 'react-typist'

/* eslint-disable import/no-extraneous-dependencies */
import { AdButton, AdScreen } from 'react-aldebarion'


// import styles from './welcome.style'

// import Nav from '../Nav'


const Welcome = ({ className = '' }) => {
  return (
    <div className={className}>
      <AdScreen>
        <AdButton label="button" />
      </AdScreen>
    </div>
  )
}

Welcome.propTypes = {
  className: PropTypes.string,
}

// const LoadingIndicator = () => <div />
// export default loader(Vault, { LoadingIndicator })

// export default loader(Wizard, { Loader: null })
export default Welcome
