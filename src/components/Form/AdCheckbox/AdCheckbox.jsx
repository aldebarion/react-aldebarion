import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ThemeContext from 'contexts/Theme'
import AdIcon from 'components/AdIcon'

import style from './AdCheckbox.style'

let idByGroup = 0
let idByCheckbox = 0

class AdCheckbox extends Component {
  constructor(props) {
    super(props)

    const { defaultValue } = this.props

    this.state = {
      value: defaultValue,
    }
  }

  handleClick(newValue) {
    return () => {
      const { value } = this.state
      const values = [
        ...value,
      ]

      const index = values.indexOf(newValue)
      if (index >= 0) {
        values.splice(index, 1)
      } else {
        values.push(newValue)
      }
      this.setState({
        value: values,
      })

      const { onChange } = this.props

      if (onChange) {
        onChange(values)
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

    idByCheckbox += 1

    let label = ''
    let value = ''

    if (typeof choice === 'string') {
      label = choice
      value = choice
    } else if (typeof choice === 'object') {
      ({ label, value } = choice)
    }
    return (
      <label htmlFor={idByCheckbox} className={`${style.choice} ${disabled ? style.disabled : ''}`} key={value}>
        <button
          disabled={disabled}
          type="button"
          className={`${style.checkbox} ${style[theme]} ${currentValue.includes(value) ? style.active : ''}`}
          onClick={this.handleClick(value)}
        >
          <AdIcon icon="check" className={style.icon} />
          <input type="checkbox" name={`checkbox-${idByGroup}`} className={style.input} id={idByCheckbox} />
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

AdCheckbox.propTypes = {
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
  defaultValue: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])),
  multiline: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
}

AdCheckbox.defaultProps = {
  className: '',
  choices: [],
  defaultValue: [],
  multiline: false,
  disabled: false,
  onChange: null,
}

export default AdCheckbox
