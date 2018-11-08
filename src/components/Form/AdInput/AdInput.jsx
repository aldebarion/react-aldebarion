import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ThemeContext from 'contexts/Theme'
// import FluidityContext from 'contexts/Fluidity'
import AdIcon from 'components/AdIcon'
import AdIndicator from 'components/AdIndicator'

import { evaluateValidation } from 'utils/validation'

import style from './AdInput.style'

class AdInput extends Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    const { animated, defaultValue, value } = this.props

    this.maxShow = 5

    this.state = {
      value: value || defaultValue,
      show: animated ? 0 : this.maxShow,
      valid: false,
      submitted: false,
    }
  }

  componentDidMount() {
    this.validate()
    this.intervalShow = setInterval(() => {
      let { show } = this.state
      show += 1
      if (show >= this.maxShow) {
        const { focus } = this.props
        if (focus) {
          this.focus()
        }
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
      this.focusListener = this.input.addEventListener('focus', this.handleFocus)
    }

    const { focus } = this.props
    if (focus) {
      this.focus()
    }
  }

  componentDidUpdate(prevProps) {
    const {
      validate,
      type,
      focus,
      submitted,
    } = this.props
    if (validate !== prevProps.validate || type !== prevProps.type) {
      this.validate()
    }

    if (focus && focus !== prevProps.focus) {
      this.focus()
    }

    if (!submitted && submitted !== prevProps.submitted) {
      this.unSubmit()
    }
  }

  componentWillUnmount() {
    if (this.focusListener) {
      this.input.removeEventListener(this.focusListener)
    }
  }

  handleFocus() {
    const { defaultValue } = this.props
    const { value } = this.state
    if (value !== null && value === defaultValue) {
      // this.input.setSelectionRange(0, value.length)
    }
  }

  handleSubmit() {
    const { valid, submitted } = this.state
    if (valid) {
      if (!submitted) {
        this.setState({
          submitted: true,
        })
        const { onSubmit } = this.props
        if (onSubmit) {
          onSubmit()
        }
      }
    }
  }

  handleKeyDown(event) {
    if (event.keyCode === 13) {
      this.handleSubmit()
    }
  }

  handleChange(event) {
    const { value } = event.target
    const {
      onChange,
    } = this.props
    this.setState({
      value,
      submitted: false,
    }, () => {
      this.validate()
    })
    if (onChange) {
      onChange(value, event)
    }
  }

  validate() {
    const { validate, type } = this.props
    const { value } = this.state
    evaluateValidation(validate || type, value, (valid) => {
      this.setState({
        valid,
      })
    })
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

  unSubmit() {
    this.setState({
      submitted: false,
    })
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
      validate,
      disabled,
      type,
    } = this.props

    const {
      submitted,
      valid,
      show,
      value,
    } = this.state

    if ((validate === null && type === 'text') && !showSubmit) {
      return null
    }

    if (showSubmit) {
      return (
        <button
          type="button"
          className={`${style.right} ${style.button} ${style[theme]} ${show >= 4 ? style.show : ''} ${submitted ? style.submitted : ''}`}
          onClick={this.handleSubmit}
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
   * [prefix description]
   * @type {[type]}
   */
  prefix: PropTypes.string,
  /**
   * if set to true, the input will show up in a progressive animation
   * @type {boolean}
   */
  animated: PropTypes.bool,
  /**
   * callback called when the value of the input change
   * @type {function}
   */
  onChange: PropTypes.func,
  /**
   * callback called when the button is clicked or the key enter is pressed
   * @type {function}
   */
  onSubmit: PropTypes.func,
  /**
   * default value to pass to the input
   * @type {string|number}
   */
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  /**
   * value pass to the input, is used to contrain the input value to a specific value
   */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  /**
   * the validate is a way to validate the value of the input. Until the value is not
   * validated, the input cannot be submitted.
   * The validate can be a string representing a regex, a asynchronous function or a number
   * representing a minimal length requested.
   * If no validate is defined, a default validate will be used depending of the type
   * of the input requested. The type text doesn't provide any validate
   */
  validate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.number,
  ]),
  /**
   * callback called when the animation of the input is finished
   */
  onAnimationFinished: PropTypes.func,
  /**
   * show the submit button integrated in the input
   */
  showSubmit: PropTypes.bool,
  /**
   * if set to true, the input is in read only
   */
  readOnly: PropTypes.bool,
  /**
   * name to set to the input
   */
  name: PropTypes.string,
  /**
   * if set to true, the input is disabled
   */
  disabled: PropTypes.bool,
  /**
   * when the value changes to true, the input is focus
   */
  focus: PropTypes.bool,
  /**
   * when the value changes to false, the input is unsubmitted
   */
  submitted: PropTypes.bool,
}

AdInput.defaultProps = {
  className: '',
  type: 'text',
  placeholder: '',
  icon: '',
  prefix: '',
  animated: false,
  onChange: null,
  onSubmit: null,
  defaultValue: '',
  value: '',
  validate: null,
  onAnimationFinished: null,
  showSubmit: false,
  readOnly: false,
  name: '',
  disabled: false,
  focus: false,
  submitted: false,
}


export default AdInput
