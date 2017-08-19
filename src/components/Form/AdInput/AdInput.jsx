import React, { PropTypes } from 'react'

import AdWidget from '../../AdWidget'
import AdIcon from '../../AdIcon'

import style from './AdInput.style'

class AdInput extends AdWidget {

  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)

    this.state = {
      value: this.props.defaultValue,
      showButton: false,
      showIndicator: false,
      indicator: 'check',
      rotatingIndicator: false,
      indicatorHelp: '',
    }
  }

  updateState() {
    if (this.props.button) {
      if (typeof this.props.showButton === 'boolean') {
        this.setState({
          showButton: this.props.showButton,
        })
      } else if (typeof this.props.showButton === 'function') {
        this.setState({
          showButton: false,
        })
        this.props.showButton(this.state.value, (visible) => {
          this.setState({
            showButton: visible,
          })
        })
      }
    }

    if (this.props.showIndicator !== null) {
      if (typeof this.props.showIndicator === 'boolean') {
        this.setState({
          showIndicator: this.props.showIndicator,
        })
      } else if (typeof this.props.showIndicator === 'function') {
        this.setState({
          showIndicator: false,
        })
        this.props.showIndicator(this.state.value, (visible, newIndicator = this.state.indicator, indicatorHelp = '') => {
          this.setState({
            showIndicator: visible,
            indicator: newIndicator,
            indicatorHelp,
          })
        })
      }
    }
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
    })

    if (this.props.onChange) {
      this.props.onChange(this.state.value, event)
    }
    if (typeof this.props.showButton === 'function') {
      this.props.showButton(event.target.value, (visible) => {
        this.setState({
          showButton: visible,
        })
      })
    }

    if (typeof this.props.showIndicator === 'function') {
      if (this.props.loadingIndicator) {
        this.setState({
          showIndicator: true,
          indicator: 'reload',
          rotatingIndicator: true,
        })
      }
      this.props.showIndicator(event.target.value,
        (visible, newIndicator = this.state.indicator, indicatorHelp = '') => {
          this.setState({
            showIndicator: visible,
            indicator: newIndicator,
            rotatingIndicator: false,
            indicatorHelp,
          })
        })
    }
  }

  componentDidMount() {
    this.updateState()
  }

  render() {
    return (
      <div className={`${this.props.className} ${style.adInput} ${this.loadClassNames(style)}`}>
        <div className={`${style.adInputContent}`}>
          {this.props.icon !== null ?
            <div className={`${style.adInputIcon} ${this.loadSubClassNames(style)}`} ><AdIcon icon={this.props.icon} /></div> : null }
          <div className={`${style.adInputSubContent}`}>
            <input className={`${style.adInputSubContentInput}`} type={this.props.type} placeholder={this.props.placeholder} onChange={this.handleChange} />
          </div>
          {
            this.props.showIndicator !== null ?
              <div className={`${style.adInputIndicator} ${this.loadSubClassNames(style)} ${this.state.showIndicator ? style.adInputIndicatorShow : ''}`} title={this.state.indicatorHelp} >
                <AdIcon icon={this.state.indicator} className={`${this.state.rotatingIndicator ? style.rotating : ''}`} />
              </div> : null
          }
          {this.state.showButton}
          {
            this.props.button !== null ?
              <button className={`${style.adInputButton} ${this.state.showButton ? style.adInputButtonShow : ''} ${this.loadSubClassNames(style)}`} onClick={this.props.onClick} >
                <AdIcon icon={this.props.button} />
              </button> : null
          }
        </div>
      </div>
    )
  }
}

AdInput.propTypes = {
  ...AdWidget.propTypes,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.string,
  icon: PropTypes.string,
  button: PropTypes.string,
  placeholder: PropTypes.string,
  onClick: PropTypes.func,
  showButton: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  showIndicator: PropTypes.func,
  loadingIndicator: PropTypes.bool,
}

AdInput.defaultProps = {
  ...AdWidget.defaultProps,
  defaultValue: '',
  type: 'text',
  icon: null,
  button: null,
  placeholder: '',
  showButton: true,
  showIndicator: null,
  loadingIndicator: false,
}


export default AdInput
