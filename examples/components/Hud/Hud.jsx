import React, { PropTypes, Component } from 'react'
// import { Link } from 'react-router'
// import Typist from 'react-typist'

import style from './Hud.style'

// import Nav from '../Nav'

import {

} from '../../../src'

class Hud extends Component {

  constructor({ className }) {
    super()
    this.className = className
  }

  render() {
    return (
      <div className={this.className}>
        ok
      </div>
    )
  }
}

Hud.propTypes = {
  className: PropTypes.string,
}

// const LoadingIndicator = () => <div />
// export default loader(Vault, { LoadingIndicator })

// export default loader(Wizard, { Loader: null })
export default Hud
