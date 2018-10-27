import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ThemeContext from 'contexts/Theme'
// import FluidityContext from 'contexts/Fluidity'
import AdIcon from 'components/AdIcon'
import AdIndicator from 'components/AdIndicator'

import { isFluidAsChange, isFluidAsHover } from 'utils/fluidity'

import style from './AdInput.style'

class AdInput extends Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.submit = this.submit.bind(this)

    const { animated, defaultValue } = this.props

    this.maxShow = 5

    this.state = {
      value: defaultValue,
      show: animated ? 0 : this.maxShow,
      valid: false,
      submitted: false,
    }
  }

  componentDidMount() {
    const { defaultValue } = this.props
    this.evaluateValidator(defaultValue, (valid) => {
      this.setState({
        valid,
      })
    })
    this.intervalShow = setInterval(() => {
      let { show } = this.state
      show += 1
      if (show >= this.maxShow) {
        const { onAnimationFinished } = this.props
        if (onAnimationFinished) {
          onAnimationFinished()
        }
        clearInterval(this.intervalShow)
      } else {
        this.setState({
          show,
        })
      }
    }, 400)
    if (this.input) {
      this.focusListener = this.input.addEventListener('focus', () => {
        const { value } = this.state
        if (value !== null && value === defaultValue) {
          this.input.setSelectionRange(0, value.length)
        }
      })
    }
  }

  componentWillUnmount() {
    if (this.focusListener) {
      this.input.removeEventListener(this.focusListener)
    }
  }

  submit() {
    const { valid, submitted } = this.state
    if (valid) {
      if (!submitted) {
        this.setState({
          submitted: true,
        })
        setTimeout(() => {
          const { onSubmit } = this.props
          if (onSubmit) {
            onSubmit()
          }
        }, 200)
      }
    }
  }

  handleKeyDown(event) {
    if (event.keyCode === 13) {
      this.submit()
    }
  }

  handleChange(event) {
    const { value } = event.target
    const { onChange, submitTrigger } = this.props
    this.setState({
      value,
      submitted: false,
    })
    if (onChange) {
      onChange(value, event)
    }

    this.evaluateValidator(value, (valid) => {
      this.setState({
        valid,
      })

      if (valid && isFluidAsChange(submitTrigger)) {
        this.submit()
      }
    })
  }

  handleMouseEnter() {
    const { submitTrigger } = this.props
    if (isFluidAsHover(submitTrigger)) {
      this.submit()
    }
  }

  evaluateValidator(value, callback) {
    const { validator } = this.props
    if (callback) {
      if (!validator) {
        const { type } = this.props
        if (type === 'email') {
          callback(value.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))
        } else {
          callback(true)
        }
      } else if (typeof validator === 'function') {
        validator(value, callback)
      } else if (typeof validator === 'number') {
        callback(value.length >= validator)
      } else {
        const regex = new RegExp(validator)

        callback(`${value}`.match(regex))
      }
    }
  }

  focus() {
    if (this.input) {
      this.input.focus()
    }
  }

  blur() {
    if (this.input) {
      this.input.blur()
    }
  }

  renderLeft(theme) {
    const {
      icon,
      prefix,
      disabled,
    } = this.props
    const {
      show,
    } = this.state

    if (icon) {
      return (
        <div className={`${style.left} ${style[theme]} ${show >= 3 ? style.showLeft : ''} ${disabled ? style.disabled : ''} `}>
          <AdIcon icon={icon} className={`${style.icon} ${style[theme]}`} />
        </div>
      )
    }
    if (prefix) {
      return (
        <div className={`${style.prefixLeft} ${style[theme]} ${show >= 3 ? style.showLeft : ''} ${disabled ? style.disabled : ''} `}>
          {prefix}
        </div>
      )
    }
    return (
      <div className={style.minLeft} />
    )
  }

  renderRight(theme) {
    const {
      showSubmit,
      validator,
      disabled,
    } = this.props

    const {
      submitted,
      valid,
      show,
      value,
    } = this.state

    if (!validator && !showSubmit) {
      return null
    }

    if (showSubmit) {
      return (
        <button
          type="button"
          className={`${style.right} ${style.button} ${style[theme]} ${show >= 4 ? style.show : ''} ${submitted ? style.submitted : ''}`}
          onClick={this.submit}
          disabled={!valid || disabled}
          onMouseEnter={this.handleMouseEnter}
        >
          <AdIndicator
            className={style.indicator}
            icons={['arrow-right', 'check']}
            currentIconIndex={submitted ? 1 : 0}
          />
        </button>
      )
    }

    return (
      <div className={`${style.right} ${style[theme]} ${show >= 4 && value !== '' ? style.show : ''} ${valid && !disabled ? '' : style.disabled}`}>
        <AdIndicator
          className={style.indicator}
          icons={['check', 'na']}
          currentIconIndex={valid ? 0 : 1}
        />
      </div>
    )
  }

  render() {
    const {
      placeholder,
      className,
      type,
      readOnly,
      name,
      disabled,
      defaultValue,
    } = this.props
    const { show } = this.state
    return (
      <ThemeContext.Consumer>
        {({ theme }) => (
          <div className={`${style.AdInput} ${style[theme]} ${className} ${show >= 1 ? style.showHeight : ''} ${show >= 2 ? style.showWidth : ''} ${disabled ? style.disabled : ''} `}>
            { this.renderLeft() }
            <input
              className={`${style.input} ${style[theme]} ${show >= 3 ? style.showInput : ''}`}
              type={type}
              placeholder={placeholder}
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
              ref={(e) => { this.input = e }}
              readOnly={readOnly}
              name={name}
              disabled={disabled}
              defaultValue={defaultValue}
            />
            {this.renderRight(theme)}
          </div>
        )}
      </ThemeContext.Consumer>
    )
  }
}

AdInput.status = {
  VALID: 'valid',
  INVALID: 'invalid',
  WAITING: 'waiting',
}

AdInput.propTypes = {
  /**
   * class name provided by the parent component
   * @type {string}
   */
  className: PropTypes.string,
  /**
   * type of the input
   * @type string in (text|number|date|email|datetime)
   */
  type: PropTypes.string,
  /**
   * placeholder of the input
   * @type {string}
   */
  placeholder: PropTypes.string,
  /**
   * icon displayed on the left of the input
   * @type {string}
   */
  icon: PropTypes.string,
  /**
   * if set to true, the input will show up in a progressive animation
   * @type {boolean}
   */
  animated: PropTypes.bool,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  validator: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.number,
  ]),
  onAnimationFinished: PropTypes.func,
  showSubmit: PropTypes.bool,
  submitTrigger: PropTypes.oneOf([
    'manual',
    'hover',
    'click',
  ]),
  readOnly: PropTypes.bool,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  prefix: PropTypes.string,
}

AdInput.defaultProps = {
  className: '',
  type: 'text',
  placeholder: '',
  icon: '',
  animated: false,
  onChange: null,
  onSubmit: null,
  defaultValue: '',
  validator: null,
  onAnimationFinished: null,
  showSubmit: false,
  submitTrigger: 'click',
  readOnly: false,
  name: '',
  disabled: false,
  prefix: '',
}


export default AdInput
