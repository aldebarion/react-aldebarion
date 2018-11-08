import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ThemeContext from 'contexts/Theme'

import style from './AdSwitch.style'

class AdSwitch extends Component {
  constructor(props) {
    super(props)

    const { animated, choices } = this.props
    let { defaultValue } = this.props
    this.maxShow = 4

    let foundIndex = choices.findIndex((choice) => {
      if (typeof choice === 'string') {
        return choice === defaultValue
      }
      if (typeof choice === 'object') {
        return choice.value === defaultValue
      }

      return false
    })

    if (foundIndex === -1) {
      foundIndex = 0
    }
    if (typeof choices[foundIndex] === 'string') {
      defaultValue = choices[foundIndex]
    } else if (typeof choices[foundIndex] === 'object') {
      defaultValue = choices[foundIndex].value
    }

    this.state = {
      value: defaultValue,
      index: foundIndex,
      show: animated ? 0 : this.maxShow,
    }
  }

  componentDidMount() {
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
  }

  handleClick(value, index) {
    return () => {
      this.setState({
        value,
        index,
      })

      const { onChange } = this.props

      if (onChange) {
        onChange(value)
      }
    }
  }

  renderChoice(choice, index, theme) {
    const {
      value: currentValue,
    } = this.state
    const {
      disabled,
    } = this.props

    let label = ''
    let value = ''

    if (typeof choice === 'string') {
      label = choice
      value = choice
    } else if (typeof choice === 'object') {
      ({ label, value } = choice)
    }
    return (
      <button
        key={value}
        disabled={disabled}
        type="button"
        className={`${style.choice} ${style[theme]} ${currentValue === value ? style.active : ''}`}
        onClick={this.handleClick(value, index)}
      >
        { label }
      </button>
    )
  }

  render() {
    const { choices, className, disabled } = this.props
    if (choices.length < 2) {
      return null
    }

    const { index } = this.state

    return (
      <ThemeContext.Consumer>
        {({ theme }) => (
          <div className={`${style.AdSwitch} ${style[theme]} ${disabled ? style.disabled : ''} ${className}`}>
            <div className={`${style.banner} ${style[theme]} ${disabled ? style.disabled : ''} ${index === 0 ? style.left : style.right}`} />
            {choices.map((choice, indexOfChoice) => this.renderChoice(
              choice,
              indexOfChoice,
              theme,
            ))}
          </div>
        )}
      </ThemeContext.Consumer>
    )
  }
}

AdSwitch.propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  choices: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]),
      }),
    ),
  ]),
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  animated: PropTypes.bool,
  onAnimationFinished: PropTypes.func,
}

AdSwitch.defaultProps = {
  className: '',
  defaultValue: null,
  choices: [],
  disabled: false,
  onChange: null,
  animated: false,
  onAnimationFinished: null,
}

export default AdSwitch
