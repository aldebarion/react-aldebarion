import React, { PropTypes } from 'react'

import AdWidget from '../../AdWidget'

import style from './AdTextarea.style'

class AdTextarea extends AdWidget {

  constructor(props) {
    super(props)
    this.state = {
      value: this.props.defaultValue,
    }
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
    })
    if (this.props.onChange) {
      this.props.onChange(event.target.value, event)
    }
  }

  render() {
    return (
      <div className={`${this.loadClassNames(style)} ${style.adTextarea}`} >
        <textarea
          placeholder={this.props.placeholder}
          className={`${style.adTextareaContent} ${this.loadSubClassNames(style)}`}
          defaultValue={this.state.value}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}

AdTextarea.propTypes = {
  ...AdWidget.propTypes,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
}

AdTextarea.defaultProps = {
  ...AdWidget.defaultProps,
  defaultValue: '',
  placeholder: '',
}

export default AdTextarea
