import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ThemeContext from 'contexts/Theme'

import style from './AdRadio.style'

let idByGroup = 0
let idByRadio = 0

class AdRadio extends Component {
  constructor(props) {
    super(props)

    const { defaultValue } = this.props

    this.state = {
      value: defaultValue,
    }
  }

  handleClick(value) {
    return () => {
      this.setState({
        value,
      })

      const { onChange } = this.props

      if (onChange) {
        onChange(value)
      }
    }
  }

  renderChoice(choice, theme) {
    const {
      value: currentValue,
    } = this.state
    const {
      disabled,
    } = this.props

    idByRadio += 1

    let label = ''
    let value = ''

    if (typeof choice === 'string') {
      label = choice
      value = choice
    } else if (typeof choice === 'object') {
      ({ label, value } = choice)
    }
    return (
      <label htmlFor={idByRadio} className={`${style.choice} ${disabled ? style.disabled : ''}`} key={value}>
        <button
          disabled={disabled}
          type="button"
          className={`${style.radio} ${style[theme]} ${currentValue === value ? style.active : ''}`}
          onClick={this.handleClick(value)}
        >
          <input type="radio" name={`radio-${idByGroup}`} className={style.input} id={idByRadio} />
        </button>
        <span className={`${style.label} ${style[theme]} ${disabled ? style.disabled : ''}`}>
          { label }
        </span>
      </label>
    )
  }

  render() {
    const {
      className,
      choices,
      multiline,
    } = this.props

    return (
      <ThemeContext.Consumer>
        {({ theme }) => {
          idByGroup += 1
          return (
            <div className={`${style.AdRadio} ${multiline ? style.block : style.inline} ${style[theme]} ${className}`}>
              {choices.map(choice => this.renderChoice(choice, theme))}
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

AdRadio.propTypes = {
  className: PropTypes.string,
  choices: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
      label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.oneOfType([
          PropTypes.node,
          PropTypes.arrayOf(PropTypes.node),
        ]),
      ]),
    }),
  ])),
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  multiline: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
}

AdRadio.defaultProps = {
  className: '',
  choices: [],
  defaultValue: null,
  multiline: false,
  disabled: false,
  onChange: null,
}

export default AdRadio
