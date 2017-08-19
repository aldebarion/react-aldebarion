import React from 'react'
import PropTypes from 'prop-types'

/* eslint-disable import/no-extraneous-dependencies */
import { AdScreen, AdEyeCatcher } from 'react-aldebarion'

import style from './Welcome.style'

const Welcome = ({ className = '' }) => {
  return (
    <div className={`${className} ${style.welcome}`}>
      <AdScreen className={style.screen}>
        <div className={style.part1}>
          <img className={style.background} src="/assets/planet.jpg" alt="planet" />
          <div className={style.center}>
            <h1>Aldebarion</h1>
            <h2>The frontend framework built for the future</h2>

          </div>
          <AdEyeCatcher className={style.eyeCatcher} from="top" to="bottom" />

        </div>
        <div className={style.part2}>
          <p>
            fdsfds
          </p>
        </div>
      </AdScreen>
    </div>
  )
}

Welcome.propTypes = {
  className: PropTypes.string,
}

Welcome.defaultProps = {
  className: '',
}

// const LoadingIndicator = () => <div />
// export default loader(Vault, { LoadingIndicator })

// export default loader(Wizard, { Loader: null })
export default Welcome
