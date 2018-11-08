import React, { Component } from 'react'
import PropTypes from 'prop-types'

import style from './AdTypeWriter.style'

class AdTypeWriter extends Component {
  constructor(props) {
    super(props)

    this.state = {
      text: '',
      currentIndex: null,
      writing: false,
    }

    this.timeout = null
  }

  componentDidMount() {
    this.startWriting(true)
  }

  componentDidUpdate(prevProps) {
    const { value: prevValue } = prevProps
    const { value } = this.props
    if (prevValue !== value) {
      if (value) {
        this.startWriting(true)
      } else {
        this.startBackspace()
      }
    }
  }

  startWriting(init = false) {
    const { interval, value, onFinish } = this.props
    if (init) {
      this.setState({
        text: '',
        currentIndex: null,
        writing: false,
      })
    }
    if (this.timeout) {
      clearInterval(this.timeout)
      this.timeout = null
    }
    this.timeout = setInterval(() => {
      const { text } = this.state
      let { currentIndex } = this.state
      if (currentIndex === null && value.length === 0) {
        clearInterval(this.timeout)
      } else if (currentIndex !== null && currentIndex >= value.length - 1) {
        clearInterval(this.timeout)
        this.setState({
          writing: false,
        })
        onFinish()
      } else {
        if (currentIndex === null) {
          currentIndex = 0
        } else {
          currentIndex += 1
        }

        const newText = `${text}${value[currentIndex]}`
        this.setState({
          text: newText,
          currentIndex,
          writing: true,
        })
      }
    }, interval)
  }

  startBackspace() {
    const { backspaceInterval } = this.props
    this.timeout = setInterval(() => {
      const { text } = this.state
      if (text === '') {
        const { onBackspaceFinish } = this.props
        this.setState({
          writing: false,
        })
        clearInterval(this.timeout)
        this.timeout = null
        onBackspaceFinish()
      } else {
        const newText = text.substr(0, text.length - 1)
        this.setState({
          text: newText,
          writing: true,
        })
      }
    }, backspaceInterval)
  }

  render() {
    const { hidePrompt } = this.props
    const { text, writing } = this.state
    return (
      <span className={style.AdTypeWriter}>{ text }{ writing && !hidePrompt ? '|' : '' }</span>
    )
  }
}

AdTypeWriter.propTypes = {
  value: PropTypes.string.isRequired,
  interval: PropTypes.number,
  backspaceInterval: PropTypes.number,
  onFinish: PropTypes.func,
  onBackspaceFinish: PropTypes.func,
  hidePrompt: PropTypes.bool,
}

AdTypeWriter.defaultProps = {
  onFinish: () => {},
  interval: 90,
  backspaceInterval: 60,
  onBackspaceFinish: () => {},
  hidePrompt: PropTypes.false,
}

export default AdTypeWriter
