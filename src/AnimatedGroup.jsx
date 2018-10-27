import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Context from './Context'

class AnimatedGroup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentStep: 0,
    }
  }

  componentDidMount() {
    const { trigger } = this.props
    if (trigger === 'mount') {
      this.play()
    }
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearInterval(this.timeout)
      this.timeout = null
    }
  }

  play() {
    const { interval } = this.props
    if (this.timeout) {
      clearInterval()
    }

    this.setState({
      currentStep: 0,
    })
    this.timeout = setInterval(() => {
      const { currentStep } = this.state
      const { maxIndex, pitch } = this.props
      this.setState({
        currentStep: currentStep + pitch,
      })

      if (currentStep === maxIndex) {
        clearInterval(this.timeout)
        this.timeout = null
      }
    }, interval)
  }

  render() {
    const { currentStep } = this.state
    const { children, maxIndex, animation } = this.props
    return (
      <Context.Provider value={{ currentStep, maxIndex, animation }}>
        {children}
      </Context.Provider>
    )
  }
}

AnimatedGroup.propTypes = {
  animation: PropTypes.string,
  interval: PropTypes.number,
  children: PropTypes.node.isRequired,
  maxIndex: PropTypes.number,
  pitch: PropTypes.number,
  trigger: PropTypes.string,
}

AnimatedGroup.defaultProps = {
  animation: 'fade',
  interval: 200,
  maxIndex: 10,
  pitch: 1,
  trigger: 'mount',
}

export default AnimatedGroup
