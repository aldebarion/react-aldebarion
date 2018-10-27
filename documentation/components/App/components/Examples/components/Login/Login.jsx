import React, { Component } from 'react'
import {
  AdInput,
  AdDice,
  AdSpan,
  AdButton,
  contexts,
} from 'react-aldebarion'
import PropTypes from 'prop-types'

import style from './Login.style'

class Login extends Component {
  constructor(props) {
    super(props)

    this.handleSubmitEmail = this.handleSubmitEmail.bind(this)
    this.handleSubmitPassword = this.handleSubmitPassword.bind(this)
    this.handleEndAnimation = this.handleEndAnimation.bind(this)
    this.goBack = this.goBack.bind(this)
    this.restart = this.restart.bind(this)
    this.state = {
      restart: 0,
      step: 0,
      animationFinished: false,
      show: true,
    }
  }

  componentDidMount() {
    if (this.inputEmail) {
      this.inputEmail.focus()
    }
  }

  handleEndAnimation() {
    this.setState({
      animationFinished: true,
    })
  }

  handleSubmitEmail() {
    const { step } = this.state
    this.setState({
      step: step + 1,
    })
    if (this.inputPassword) {
      this.inputPassword.focus()
    }
  }

  handleSubmitPassword() {
    const { step } = this.state
    this.setState({
      step: step + 1,
    })
  }

  goBack(event) {
    const { step } = this.state
    this.setState({
      step: step - 1,
    })
    event.stopPropagation()
    event.preventDefault()
  }

  restart() {
    const { restart } = this.state
    this.setState({
      restart: restart + 1,
      show: false,
      step: 0,
      animationFinished: false,
    })

    setTimeout(() => {
      this.setState({
        show: true,
      })
    }, 1000)
  }

  render() {
    const { className } = this.props
    const {
      step,
      animationFinished,
      show,
      restart,
    } = this.state
    return (
      <contexts.Theme.Consumer>
        {({ theme }) => (
          <div className={`${style.Login} ${className}`}>
            <AdButton
              style={{ transform: `rotate(${180 * restart}deg)` }}
              className={style.restart}
              onClick={this.restart}
              icon="reload"
              type="icon"
            />
            {
              show && (
                <div>
                  <AdDice face={step} height={42}>
                    <AdInput
                      animated
                      type="email"
                      icon="email"
                      placeholder="Email"
                      onSubmit={this.handleSubmitEmail}
                      ref={(e) => { this.inputEmail = e }}
                      onAnimationFinished={this.handleEndAnimation}
                      showSubmit
                    />
                    <AdInput
                      type="password"
                      icon="lock"
                      placeholder="Password"
                      validate={10}
                      onSubmit={this.handleSubmitPassword}
                      ref={(e) => { this.inputPassword = e }}
                      showSubmit
                    />
                    <AdSpan>Welcome!</AdSpan>
                  </AdDice>
                  <div className={style.help}>
                    <div className={style.container}>
                      <div className={style.content}>
                        {
                          step === 0 && animationFinished
                            ? (
                              <AdSpan discreet className={style.text}>
                                Already have an account? <a href="/fds">Sign up</a>
                              </AdSpan>
                            )
                            : null
                        }
                        {
                          step === 1
                            ? (
                              (
                                <AdSpan discreet className={style.text}>
                                  <a href="/fds" onClick={this.goBack}>Change email</a>
                                </AdSpan>
                              )
                            )
                            : null
                        }
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
          </div>
        )}
      </contexts.Theme.Consumer>
    )
  }
}

Login.propTypes = {
  className: PropTypes.string,
}

Login.defaultProps = {
  className: '',
}

export default Login
