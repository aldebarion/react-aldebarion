import React, { Component } from 'react'
import PropTypes from 'prop-types'

import style from './AdFixedScroll.style'

class AdFixedScroll extends Component {
  constructor(props) {
    super(props)

    this.handleScroll = this.handleScroll.bind(this)

    this.state = {
      scrollTop: 0,
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  handleScroll() {
    console.log('scrollTop', window.scrollY)
    this.setState({
      scrollTop: window.scrollY,
    })
  }

  render() {
    const {
      children,
    } = this.props
    const {
      scrollTop,
    } = this.state
    return (
      <div className={style.AdFixedScroll} style={{ top: scrollTop }}>
        {children}
      </div>
    )
  }
}

AdFixedScroll.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
}

AdFixedScroll.defaultProps = {
  children: [],
}

export default AdFixedScroll
