import React, { PropTypes, Component } from 'react'
// import { Link } from 'react-router'
// import Typist from 'react-typist'

/* eslint-disable import/no-extraneous-dependencies */
import {
  AdButton,
  AdScreen,
  AdRadioButton,
  AdSwitchButton,
  AdCheckboxButton,
  AdInput,
  AdTextarea,
  AdProgressBar,
  AdStepBar,
  AdIcon,
  AdIconButton,
  AdHexaButton,
  AdEyeCatcher,
  AdCarousel,
  AdSlide,
} from 'react-aldebarion'


import style from './api.style'

// import Nav from '../Nav'


class Api extends Component {

  constructor({ className }) {
    super()
    this.className = className

    this.progressBarValue = 10
    this.progressBarMin = 0
    this.progressBarMax = 100

    this.state = {
      progressBarMax: 100,
      progressBarValue: 0,
      progressBarMin: 0,
      currentStep: 0,
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleClickStep = this.handleClickStep.bind(this)
  }

  componentDidMount() {
    setInterval(() => {
      let tmpValue = this.state.progressBarValue
        + ((this.state.progressBarMax - this.state.progressBarMin) / 100)
      if (tmpValue > this.state.progressBarMax) {
        tmpValue = this.state.progressBarMin
      }
      this.setState({
        progressBarValue: tmpValue,
      })
    }, 100)
  }

  /* componentDidUmount() {

  }*/

  handleChange(value, callback) {
    if (this.timeout) {
      clearTimeout(this.timeout)
      this.timeout = null
    }
    if (value === '') {
      callback(false, '')
      this.timeout = null
    } else {
      this.timeout = setTimeout(() => {
        callback(true, 'check')
        this.timeout = null
      }, 2000)
    }
  }

  handleClickStep(index) {
    this.setState({
      currentStep: index,
    })
  }

  render() {
    return (
      <div className={this.className}>
        <AdScreen>
          <div className={style.api}>
            <h1>Aldebarion</h1>
            <h2>API</h2>
            <h3>buttons</h3>
            <div className={style.card}>
              <AdButton label="button" />
              <AdButton label="button with icon" icon="angle-right" />
              <AdButton label="100% width button" icon="angle-right" fluid />
            </div>
            <div className={style.card}>
              <h3>radio buttons</h3>
              <AdRadioButton options={['yes', 'no', 'maybe']} fluid defaultValue="2" onChange={(choice) => { console.log(`choice: ${choice}`) }} />
            </div>
            <div className={style.card}>
              <h3>switch buttons</h3>
              <AdSwitchButton options={['yes', 'no']} defaultValue="2" onChange={(choice) => { console.log(`choice: ${choice}`) }} />
              <AdSwitchButton options={['show', 'hide']} defaultValue="2" onChange={(choice) => { console.log(`choice: ${choice}`) }} />
            </div>
            <div className={style.card}>
              <h3>checkbox buttons</h3>
              <AdCheckboxButton options={['choice 1', 'choice 2', 'choice 3']} defaultValue="2" onChange={(choice) => { console.log(`choice: ${choice}`) }} />
              <AdCheckboxButton options={['choice 1', 'choice 2']} defaultValue="2" fluid onChange={(choice) => { console.log(`choice: ${choice}`) }} />
            </div>
            <div className={style.card}>
              <h3>inputs</h3>
              <AdInput type="text" placeholder="Input text" />
              <AdInput type="password" placeholder="Input password" />
              <AdInput type="text" placeholder="Input with button" button="angle-right" />
              <AdInput type="text" placeholder="Input with button when ok" button="angle-right" showButton={(inputValue, callback) => { callback(inputValue !== '') }} />
              <AdInput type="text" placeholder="Input with indicator when ok" showIndicator={(inputValue, callback) => { callback(inputValue !== '', 'check') }} />
              <AdInput type="text" placeholder="Input with indicator when ko" showIndicator={(inputValue, callback) => { callback(inputValue !== '', 'na', 'Already used.') }} />
              <AdInput type="text" placeholder="Input with loading indicator" loadingIndicator showIndicator={this.handleChange} />
              <AdInput type="text" icon="email" placeholder="Input with icon" />
              <AdInput type="text" icon="email" placeholder="Input with icon and button" button="angle-right" showButton={(inputValue, callback) => { callback(inputValue !== '') }} />
              <AdInput type="text" icon="email" placeholder="Input with icon and indicator" showIndicator={(inputValue, callback) => { callback(inputValue !== '', 'check') }} />
            </div>

            <div className={style.card}>
              <h3>textareas</h3>
              <AdTextarea />
            </div>

            <div className={style.card}>
              <h3>progress bar</h3>
              <AdProgressBar value={10} />

              <AdProgressBar value={10} label="10%" />
              <AdProgressBar
                label={`${this.state.progressBarValue}%`}
                value={this.state.progressBarValue}
                min={this.state.progressBarMin}
                max={this.state.progressBarMax}
              />
            </div>

            <div className={style.card}>
              <h3>step bar</h3>
              <AdStepBar
                steps={[0, 1, 2]}
                currentStep={this.state.currentStep}
                onClick={this.handleClickStep}
              />
            </div>
            <div className={style.card}>
              <h3>Icons</h3>
              <p>
                <div className={style.icon} >
                  <AdIcon icon="user" />
                </div>
                <div className={style.icon} >
                  <AdIcon icon="lock" />
                </div>
                <div className={style.icon} >
                  <AdIcon icon="heart" />
                </div>
              </p>
              <p>
                <div className={style.icon} >
                  <AdIconButton icon="user" label="User" />
                </div>
                <div className={style.icon} >
                  <AdIconButton icon="lock" label="Lock" />
                </div>
                <div className={style.icon} >
                  <AdIconButton icon="heart" label="Love" />
                </div>
              </p>
              <p>
                <div className={style.icon} >
                  <AdIconButton icon="user" label="User" discreet />
                </div>
                <div className={style.icon} >
                  <AdIconButton icon="lock" label="Lock" discreet />
                </div>
                <div className={style.icon} >
                  <AdIconButton icon="heart" label="Love" discreet />
                </div>
              </p>
              <p>
                <div className={style.icon} >
                  <AdHexaButton icon="user" />
                </div>
                <div className={style.icon} >
                  <AdHexaButton icon="lock" />
                </div>
                <div className={style.icon} >
                  <AdHexaButton icon="heart" />
                </div>
              </p>
              <p>
                <div className={style.icon}>
                  <AdHexaButton icon="user" discreet />
                </div>
                <div className={style.icon}>
                  <AdHexaButton icon="lock" discreet />
                </div>
                <div className={style.icon}>
                  <AdHexaButton icon="heart" discreet />
                </div>
              </p>
              <p className="light">
                <strong>Aldebarion</strong> uses Themify Icons. Find all of theme <a href="http://themify.me/themify-icons">there</a>.
              </p>

            </div>
            <div className={style.card}>
              <h3>eye catcher</h3>
              <p>
                <AdEyeCatcher from="left" to="right" />
              </p>
              <p>
                <AdEyeCatcher from="right" to="left" />
              </p>
              <p>
                <AdEyeCatcher from="top" to="bottom" />
              </p>
              <p>
                <AdEyeCatcher from="bottom" to="top" />
              </p>
            </div>
            <div className={style.card}>
              <h3>carousel</h3>
              <AdCarousel className={style.slider} >
                <AdSlide>slide 1</AdSlide>
                <AdSlide>slide 2</AdSlide>
                <AdSlide>slide 3</AdSlide>
                <AdSlide>slide 4</AdSlide>
              </AdCarousel>
            </div>
          </div>
        </AdScreen>
      </div>
    )
  }
}

Api.propTypes = {
  className: PropTypes.string,
}

// const LoadingIndicator = () => <div />
// export default loader(Vault, { LoadingIndicator })

// export default loader(Wizard, { Loader: null })
export default Api
