import React, { PropTypes } from 'react'

import AdWidget from '../../AdWidget'

import style from './AdCheckboxButton.style'

class AdCheckboxButton extends AdWidget {

  constructor(props) {
    super(props)

    this.state = {
      values: this.props.defaultValues,
    }
  }

  toggleOption(option, index) {
    return () => {
      const indexOf = this.state.values.indexOf(index)
      if (indexOf > -1) {
        this.state.values.splice(indexOf, 1)
        this.setState({
          values: this.state.values,
        })

        if (this.props.onChange) {
          this.props.onChange(option, index)
        }
      } else {
        this.setState({
          values: [...this.state.values, index],
        })

        if (this.props.onChange) {
          this.props.onChange(option, index)
        }
      }
    }
  }

  renderOption(option, index) {
    return (
      <div className={`${style.adCheckboxButtonOption} ${this.loadSubClassNames(style)}`} key={index} >
        <div
          className={style.adCheckboxButtonOptionContent}
          onClick={this.toggleOption(option, index)}
        >
          <i className={`zmdi   ${this.state.values.indexOf(index) > -1 ? 'zmdi-check-square' : 'zmdi-square-o'} ${style.adCheckboxButtonOptionIcon}`} />
          <div className={style.adCheckboxButtonOptionLabel}>
            {typeof option === 'object' && option.label ? option.label : option}
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className={`${this.loadClassNames(style)} ${style.adCheckboxButton} `}>
        {this.props.options.map((option, index) => {
          return this.renderOption(option, index)
        })}
        { this.state.value }
      </div>
    )
  }
}

AdCheckboxButton.propTypes = {
  ...AdWidget.propTypes,
  options: PropTypes.array,
  defaultValues: PropTypes.array,
  onChange: PropTypes.func,
}

AdCheckboxButton.defaultProps = {
  ...AdWidget.defaultProps,
  options: [],
  defaultValues: [],
}


export default AdCheckboxButton
