import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import ThemeContext from 'contexts/Theme'

import style from './AdSlider.style'

class AdSlider extends Component {
  constructor(props) {
    super(props)

    this.updateValue = this.updateValue.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleLabelClick = this.handleLabelClick.bind(this)
    this.handleDragStart = this.handleDragStart.bind(this)
    this.isInInterval = this.isInInterval.bind(this)
    this.convertLabel = this.convertLabel.bind(this)
    this.renderCursor = this.renderCursor.bind(this)
    this.handleDragMove = this.handleDragMove.bind(this)
    this.handleDragEnd = this.handleDragEnd.bind(this)
    this.updateBestValue = this.updateBestValue.bind(this)

    const {
      value,
      defaultValue,
      min,
      max,
      interval,
    } = this.props

    this.state = {
      value: value || defaultValue || (interval ? [min, max] : min),
      animatedBar: true,
    }
  }

  componentDidMount() {
    this.mouseMoveEvent = window.addEventListener('mousemove', this.handleDragMove)
    this.mouseUpEvent = window.addEventListener('mouseup', this.handleDragEnd)
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.mouseMoveEvent)
    window.removeEventListener('mouseup', this.mouseUpEvent)
  }

  componentDidChange(prevProps) {
    const { value } = this.props
    if (value !== prevProps.value) {
      this.setState({
        value,
      })
    }
  }


  handleLabelClick(value) {
    return (event) => {
      this.updateBestValue(value, event)
    }
  }

  handleClick(event) {
    const { disabled } = this.props
    if (disabled) {
      return
    }
    const value = this.convertToValue(event.clientX)
    this.updateBestValue(value, event)
  }

  handleDragStart(cursorIndex = 0) {
    return (event) => {
      if (this.draggable) {
        return
      }
      const { disabled } = this.props
      if (disabled) {
        return
      }
      this.draggable = true
      this.cursorIndex = cursorIndex
      event.preventDefault()
      event.stopPropagation()
    }
  }

  handleDragMove(event) {
    if (this.draggable) {
      const { value: previousValue } = this.state
      const { interval } = this.props
      let value = null
      const newValue = this.convertToValue(event.clientX)
      if (interval) {
        value = [...previousValue]
        value[this.cursorIndex] = newValue
      } else {
        value = newValue
      }
      this.updateValue(value, event)
      this.setState({
        animatedBar: false,
      })
    }
  }

  handleDragEnd() {
    if (this.draggable) {
      this.draggable = false
      this.setState({
        animatedBar: true,
      })
    }
  }

  updateBestValue(value, event) {
    const { interval } = this.props
    const { value: previousValue } = this.state
    let newValue = null
    if (interval) {
      newValue = [...previousValue]
      if (Math.abs(value - previousValue[1]) > Math.abs(value - previousValue[0])) {
        newValue[0] = value
      } else {
        newValue[1] = value
      }
    } else {
      newValue = value
    }
    this.updateValue(newValue, event)
  }

  updateValue(value, event) {
    const { onChange, interval } = this.props
    this.setState({
      value,
    })
    if (onChange) {
      if (interval) {
        if (value[0] < value[1]) {
          onChange(value, event)
        } else {
          onChange(value.reverse(), event)
        }
      } else {
        onChange(value, event)
      }
    }
  }

  convertMinMaxStep() {
    const {
      min,
      max,
      step,
      choices,
    } = this.props
    if (choices.length > 0) {
      return {
        min: 0,
        max: choices.length - 1,
        step: 1,
      }
    }
    return { min, max, step }
  }

  convertLabel(value) {
    const { choices } = this.props
    if (choices.length > 0) {
      return choices[value].label
    }

    return value
  }

  convertToValue(x) {
    const { min, max, step } = this.convertMinMaxStep()
    let value = min
    if (x <= this.bar.getBoundingClientRect().x) {
      value = min
    } else if (
      x >= this.bar.getBoundingClientRect().x
      + this.bar.getBoundingClientRect().width) {
      value = max
    } else {
      value = min
        + step * Math.round(
          (x - this.bar.getBoundingClientRect().x)
            * (max - min) / this.bar.getBoundingClientRect().width / step,
        )
    }

    return value
  }

  convertToWidth(index) {
    const { min, max } = this.convertMinMaxStep()
    let width = 0

    if (index === min) {
      width = 0
    } else if (index === max) {
      width = 100
    } else if (min !== max) {
      width = (index - min) * 100 / (max - min)
    }

    return width
  }

  isInInterval(currentIndex) {
    const { interval } = this.props
    const { value } = this.state
    if (interval) {
      if (value[0] <= value[1]) {
        return currentIndex >= value[0] && currentIndex <= value[1]
      }
      return currentIndex >= value[1] && currentIndex <= value[0]
    }
    return currentIndex <= value
  }

  renderCursor(theme, value, index) {
    const {
      animatedBar,
    } = this.state
    const {
      disabled,
      showCursorLabel,
    } = this.props
    const width = this.convertToWidth(value)
    return (
      <div
        className={`${style.cursorContainer} ${animatedBar ? style.animated : ''}`}
        style={{ left: `${width}%` }}
      >
        <button
          type="button"
          className={`${style.cursor} ${style[theme]} ${disabled ? style.disabled : ''}`}
          onDragStart={this.handleDragStart(index)}
          draggable="true"
        />
        {showCursorLabel ? <div className={`${style.tooltip} ${style[theme]}`}>{this.convertLabel(value)}</div> : null}
      </div>
    )
  }

  render() {
    const {
      className,
      disabled,
      minLabel,
      maxLabel,
      labelClassName,
      showGraduationLabels,
      showGraduations,
      choices: choiceLabels,
      interval,
    } = this.props

    const {
      value,
      animatedBar,
    } = this.state


    const { min, max, step } = this.convertMinMaxStep()

    const showChoices = choiceLabels.length > 0 || step >= (max - min) / 10

    let width = 0
    let left = 0
    if (interval) {
      left = this.convertToWidth(Math.min(value[0], value[1]))
      width = this.convertToWidth(Math.abs(value[0] - value[1]))
    } else {
      width = this.convertToWidth(value)
    }

    const choices = []
    if (showChoices || showGraduations) {
      for (let i = min; i <= max; i += step) {
        choices.push({
          label: choiceLabels.length > 0 ? choiceLabels[i].label : i,
          index: i,
          width: this.convertToWidth(i),
        })
      }
    }

    return (
      <ThemeContext.Consumer>
        {({ theme }) => (
          <div className={`${style.AdSlider} ${style[theme]} ${disabled ? style.disabled : ''} ${className}`}>
            { minLabel ? <button type="button" className={`${style.label} ${style[theme]} ${labelClassName}`} onClick={this.handleLabelClick(min)} disabled={disabled}>{minLabel}</button> : null }
            <div className={`${style.slider}`}>
              <button
                type="button"
                onClick={this.handleClick}
                className={`${style.bar} ${style[theme]}`}
                ref={(e) => { this.bar = e }}
                disabled={disabled}
              >
                <div
                  className={`${style.content} ${style[theme]} ${animatedBar ? style.animated : ''}`}
                  style={{ width: `${width}%`, left: `${left}%` }}
                />
              </button>
              {
                showChoices || showGraduations
                  ? (
                    choices.map(choice => (
                      <div
                        key={choice.index}
                        className={`${style.stepContainer}`}
                        style={{ left: `${choice.width}%` }}
                      >
                        <button
                          type="button"
                          className={`${style.step} ${style[theme]} ${this.isInInterval(choice.index) ? style.active : ''}`}
                          onClick={this.handleClick}
                          disabled={disabled}
                        />
                        {
                          showGraduationLabels || choiceLabels.length > 0
                            ? (
                              <button
                                onClick={this.handleClick}
                                type="button"
                                className={`${style.currentLabel} ${style[theme]} ${this.isInInterval(choice.index) ? style.active : ''}`}
                              >
                                {choice.label}
                              </button>
                            )
                            : null
                        }
                      </div>
                    ))
                  ) : null
              }
              {
                interval
                  ? (
                    <Fragment>
                      {this.renderCursor(theme, value[0], 0)}
                      {this.renderCursor(theme, value[1], 1)}
                    </Fragment>
                  ) : this.renderCursor(theme, value)
              }
            </div>
            { minLabel ? <button type="button" className={`${style.label} ${style[theme]} ${labelClassName}`} onClick={this.handleLabelClick(max)} disabled={disabled}>{maxLabel}</button> : null }
          </div>
        )}
      </ThemeContext.Consumer>
    )
  }
}

AdSlider.propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ])),
  ]),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ])),
  ]),
  choices: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  })),
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  animated: PropTypes.bool,
  onAnimationFinished: PropTypes.func,
  max: PropTypes.number,
  min: PropTypes.number,
  step: PropTypes.number,
  minLabel: PropTypes.string,
  maxLabel: PropTypes.string,
  labelClassName: PropTypes.string,
  showCursorLabel: PropTypes.bool,
  showGraduationLabels: PropTypes.bool,
  showGraduations: PropTypes.bool,
  interval: PropTypes.bool,
}

AdSlider.defaultProps = {
  className: '',
  defaultValue: null,
  value: '',
  choices: [],
  disabled: false,
  onChange: null,
  animated: false,
  onAnimationFinished: null,
  max: 100,
  min: 0,
  step: 1,
  minLabel: null,
  maxLabel: null,
  labelClassName: null,
  showCursorLabel: false,
  showGraduationLabels: false,
  showGraduations: false,
  interval: false,
}

export default AdSlider
