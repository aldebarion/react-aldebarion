import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { AdScreen, AdBoard } from 'react-aldebarion'

import style from './Dashboard.style'


class Dashboard extends Component {
  constructor({ className }) {
    super()
    this.className = className
  }

  render() {
    return (
      <div className={this.className}>
        <AdScreen className={`${style.dashboard}`}>
          <div className={`${style.column1}`}>
            <AdBoard className={style.board}>
              <div className={style.header} >
                <img src="/assets/logo.png" className={style.logo} alt="logo" />
                <div className={style.status}>
                  ONLINE
                </div>
              </div>
            </AdBoard>
            <AdBoard className={`${style.board} ${style.board2}`}>
            fds
            </AdBoard>
          </div>
          <div className={`${style.column2}`}>
            <AdBoard className={style.board}>
            fds
            </AdBoard>
          </div>
          <div className={`${style.column3}`}>
            <AdBoard className={style.board}>
              fds
            </AdBoard>
          </div>
        </AdScreen>
      </div>
    )
  }
}

Dashboard.propTypes = {
  className: PropTypes.string,
}

Dashboard.defaultProps = {
  className: '',
}
// const LoadingIndicator = () => <div />
// export default loader(Vault, { LoadingIndicator })

// export default loader(Wizard, { Loader: null })
export default Dashboard
