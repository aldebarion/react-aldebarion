import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import ThemeContext from 'contexts/Theme'
import AdIcon from 'components/AdIcon'

import style from './AdSelect.style'

class AdSelect extends Component {
  static getValue(option) {
    if (typeof option === 'object' && 'value' in option) {
      return option.value
    }
    return option
  }

  static getLabel(option) {
    if (typeof option === 'object' && 'label' in option) {
      return option.label
    }
    return option
  }

  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
    this.handleToggle = this.handleToggle.bind(this)

    const { animated, defaultValue, value } = this.props

    this.maxShow = 5

    this.state = {
      value: value || defaultValue,
      show: animated ? 0 : this.maxShow,
      valid: false,
      submitted: false,
      opened: false,
      bottom: 0,
      left: 0,
      right: 0,
    }
  }

  componentDidMount() {
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

    if (this.container) {
      const rect = this.container.getBoundingClientRect()
      this.setState({
        // top: rect.top,
        left: this.container.scrollLeft,
        right: rect.right,
        bottom: this.container.scrollTop + rect.height,
        width: rect.width,
      })
    }

    this.clickOutsideEvent = window.addEventListener('click', this.handleClose)

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

    if (this.clickOutsideEvent) {
      window.removeEventListener('click', this.clickOutsideEvent)
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

  handleOpen(event) {
    console.log('open')
    if (this.menuInterval) {
      clearInterval(this.menuInterval)
    }
    const { opened } = this.state
    if (!opened) {
      let step = -1
      this.setState({
        opened: true,
        stepOpened: step,
      })
      this.menuInterval = setInterval(() => {
        const { options } = this.props
        step += 1
        this.setState({
          stepOpened: step,
        })
        if (step === options.length) {
          clearInterval(this.menuInterval)
        }
      }, 200)
    }

    event.stopPropagation()
  }

  handleClose(event) {
    if (this.menuCloseInterval) {
      clearInterval(this.menuCloseInterval)
    }
    const { opened } = this.state
    if (opened) {
      this.menuCloseInterval = setInterval(() => {
        const { stepOpened } = this.state
        this.setState({
          stepOpened: stepOpened - 1,
        })
        if (stepOpened === -1) {
          this.setState({
            opened: false,
          })
          clearInterval(this.menuCloseInterval)
        }
      }, 200)
    }
    event.stopPropagation()
  }

  handleToggle(event) {
    const { opened } = this.state
    if (opened) {
      this.handleClose(event)
    } else {
      this.handleOpen(event)
    }
  }

  handleChange(value) {
    return (event) => {
      console.log('handleChange', value)
      this.setState({
        value,
      })
      this.handleClose(event)
      const {
        onChange,
      } = this.props
      if (onChange) {
        onChange(value, event)
      }
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
      null
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
      options,
      icon,
      prefix,
    } = this.props
    const {
      show,
      value,
      opened,
      stepOpened,
      bottom,
      left,
      right,
      width,
    } = this.state
    const selectedOption = options.find(currentOption => (
      AdSelect.getValue(currentOption) === value
    ))
    let label = null
    if (selectedOption) {
      label = AdSelect.getLabel(selectedOption)
    }

    return (
      <ThemeContext.Consumer>
        {({ theme }) => (
          <div
            ref={(e) => { this.container = e }}
            className={`${style.AdSelect} ${style[theme]} ${className} ${show >= 1 ? style.showHeight : ''} ${show >= 2 ? style.showWidth : ''} ${disabled ? style.disabled : ''} `}
          >
            { this.renderLeft() }
            <div className={`${style.selection} ${icon || prefix ? style.noMargin : ''} ${show >= 3 ? style.showSelection : ''}`}>
              <input
                className={`${style.input} ${style[theme]} ${show >= 3 ? style.showInput : ''}`}
                type={type}
                placeholder={placeholder}
                onChange={this.handleChange}
                onKeyDown={this.handleKeyDown}
                ref={(e) => { this.input = e }}
                readOnly
                onClick={this.handleToggle}
                name={name}
                disabled={disabled}
                value={label}
              />
              { opened ? ReactDOM.createPortal(
                <div className={style.optionList} style={{ top: bottom, left, width }}>
                  <div className={`${style.options} ${style[theme]}`}>
                    {options.map((option, index) => {
                      const currentValue = AdSelect.getValue(option)
                      return (
                        <button
                          type="button"
                          key={currentValue}
                          className={`${style.option} ${style[theme]} ${currentValue === value ? style.active : ''} ${stepOpened < index ? style.hidden : ''}`}
                          onClick={this.handleChange(currentValue)}
                        >
                          {AdSelect.getLabel(option)}
                        </button>
                      )
                    })}
                  </div>
                </div>,
                document.getElementById('root-modal'),
              ) : null }
            </div>
            <button
              type="button"
              className={`${style.toggle} ${style[theme]} ${show >= 4 ? style.show : ''} ${opened ? style.rotated : ''}`}
              onClick={this.handleToggle}
              disabled={disabled}
            >
              <AdIcon icon="angle-down" className={`${style.icon} ${opened ? style.rotated : ''} ${style[theme]}`} />
            </button>
          </div>
        )}
      </ThemeContext.Consumer>
    )
  }
}

AdSelect.status = {
  VALID: 'valid',
  INVALID: 'invalid',
  WAITING: 'waiting',
}

AdSelect.propTypes = {
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
   * choices to display in the liss
   */
  options: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      data: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
      ]),
      label: PropTypes.string,
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
    }),
  ])),
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
}

AdSelect.defaultProps = {
  className: '',
  type: 'text',
  placeholder: '',
  icon: '',
  prefix: '',
  options: [],
  animated: false,
  onChange: null,
  defaultValue: '',
  value: '',
  validate: null,
  onAnimationFinished: null,
  showSubmit: false,
  readOnly: false,
  name: '',
  disabled: false,
  focus: false,
}


export default AdSelect
