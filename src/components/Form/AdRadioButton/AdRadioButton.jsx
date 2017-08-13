import React, { PropTypes } from 'react'

import AdWidget from '../../AdWidget'

import style from './AdRadioButton.style'

class AdRadioButton extends AdWidget {

  constructor(props) {
    super(props)

    this.state = {
      value: parseInt(this.props.defaultValue, 10) >= this.props.options.length ?
      0 : parseInt(this.props.defaultValue, 10),
    }
  }

  selectOption(option, index) {
    return () => {
      this.setState({
        value: index,
      })

      if (this.props.onChange) {
        this.props.onChange(option, index)
      }
    }
  }

  renderOption(option, index) {
    return (
      <div className={`${style.adRadioButtonOption} ${this.loadSubClassNames(style)}`} key={index} >
        <div
          className={style.adRadioButtonOptionContent}
          onClick={this.selectOption(option, index)}
        >
          <i className={`zmdi   ${this.state.value === index ? 'zmdi-dot-circle' : 'zmdi-circle-o'} ${style.adRadioButtonOptionIcon}`} />
          <div className={style.adRadioButtonOptionLabel}>
            {typeof option === 'object' && option.label ? option.label : option}
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className={`${this.loadClassNames(style)} ${style.adRadioButton}`}>
        {this.props.options.map((option, index) => {
          return this.renderOption(option, index)
        })}
      </div>
    )
  }
}

AdRadioButton.propTypes = {
  ...AdWidget.propTypes,
  options: PropTypes.array,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
}

AdRadioButton.defaultProps = {
  ...AdWidget.defaultProps,
  options: [],
  defaultValue: 0,
}
export default AdRadioButton
