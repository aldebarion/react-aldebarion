import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class AdWidget extends Component {
  loadClassNames(style) {
    return `${this.props.className ? this.props.className : ''} ${this.loadSubClassNames(style)}`
  }

  loadSubClassNames(style) {
    return `${this.props.fluid ? style.fluid : ''} ${this.props.discreet ? style.discreet : ''} ${style[`${this.props.size}Size`]}`
  }

  render() {
    return <div className={this.props.className} />
  }
}

AdWidget.propTypes = {
  className: PropTypes.string,
  fluid: PropTypes.bool,
  discreet: PropTypes.bool,
  size: PropTypes.string,
}

AdWidget.defaultProps = {
  className: '',
  fluid: false,
  discreet: false,
  size: 'normal',
}
