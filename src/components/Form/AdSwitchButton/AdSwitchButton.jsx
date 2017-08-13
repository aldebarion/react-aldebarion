import React, { PropTypes } from 'react'

import AdWidget from '../../AdWidget'

import style from './AdSwitchButton.style'

class AdSwitchButton extends AdWidget {

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
      <option className={`${style.adSwitchButtonOption} ${this.loadSubClassNames(style)} ${this.state.value === index ? style.active : null}`} key={index} onClick={this.selectOption(option, index)} >
        {typeof option === 'object' && option.label ? option.label : option}
      </option>
    )
  }

  render() {
    return (
      <div className={`${this.loadClassNames(style)} ${style.adSwitchButton} ${this.state.value === 0 ? style.left : style.right} `}>
        <div className={style.adSwitchButtonPanel} />
        {this.props.options.map((option, index) => {
          return this.renderOption(option, index)
        })}
      </div>
    )
  }
}

AdSwitchButton.propTypes = {
  ...AdWidget.propTypes,
  options: PropTypes.array,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
}

AdSwitchButton.defaultProps = {
  ...AdWidget.defaultProps,
  options: [],
  defaultValue: 0,
}


// const LoadingIndicator = () => <div />
// export default loader(Vault, { LoadingIndicator })

// export default loader(Wizard, { Loader: null })
export default AdSwitchButton
