import React, { Component } from 'react'
import { AdInput, AdSpan } from 'react-aldebarion'
// import PropTypes from 'prop-types'

import style from './Login.style'

class Login extends Component {
  constructor(props) {
    super(props)

    this.handleSubmitEmail = this.handleSubmitEmail.bind(this)
    this.handleSubmitPassword = this.handleSubmitPassword.bind(this)
    this.handleEndAnimation = this.handleEndAnimation.bind(this)
    this.goBack = this.goBack.bind(this)
    this.state = {
      step: 0,
      animationFinished: false,
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

  render() {
    const { step, animationFinished } = this.state
    return (
      <div className={style.Login}>
        <div>
          <div className={style.form}>
            <div className={`${style.face} ${style.front}`} data-rotated={step}>
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
            </div>
            <div className={`${style.face} ${style.bottom}`} data-rotated={step}>
              <AdInput
                animated
                type="password"
                icon="lock"
                placeholder="Password"
                validate={10}
                onSubmit={this.handleSubmitPassword}
                ref={(e) => { this.inputPassword = e }}
                showSubmit
              />
            </div>
            <div className={`${style.face} ${style.back}`} data-rotated={step}>
              <AdSpan>Welcome!</AdSpan>
            </div>
          </div>
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
      </div>
    )
  }
}


/*
Login.propTypes = {email
  location: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
}
*/


export default Login
