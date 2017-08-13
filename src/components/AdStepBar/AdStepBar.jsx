import React, { PropTypes } from 'react'

import AdWidget from '../AdWidget'

import style from './AdStepBar.style'

class AdStepBar extends AdWidget {

  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)

    this.state = {
      steps: [],
      currentStep: 0,
    }
  }

  updateState() {
    this.setState({
      steps: this.props.steps,
      currentStep: this.props.currentStep,
    })
  }

  handleClick(step, index) {
    return (event) => {
      if (this.props.onClick) {
        this.props.onClick(index, step, event)
      }
    }
  }

  componentDidMount() {
    this.updateState()
  }


  componentWillReceiveProps(nextProps) {
    // if (JSON.stringify(this.props.steps) !== JSON.stringify(nextProps.steps)
      // || this.props.currentStep !== nextProps.currentStep) {
      this.updateState()
    // }
  }

  renderStep(step, index) {
    return (
      <div className={`${this.loadSubClassNames(style)} ${style.adStepBarStep}`} >
        <div className={`${this.loadSubClassNames(style)} ${style.adStepBarStepInner2}`} >
          <div className={`${this.loadSubClassNames(style)} ${style.adStepBarStepInner}`} >
            <button className={`${this.loadSubClassNames(style)} ${style.adStepBarIndicator} ${index === this.state.currentStep ? style.active : null}`} onClick={this.handleClick(step, index)} />
          </div>
        </div>
      </div>
    )
  }


  render() {
    return (
      <div className={`${this.loadClassNames(style)} ${style.adStepBar}`} >
        {this.props.steps.map((step, index) => {
          return [
            <div className={`${this.loadSubClassNames(style)} ${style.adStepBarBar}`} />,
            this.renderStep(step, index),
          ]
        })}
        <div className={`${this.loadSubClassNames(style)} ${style.adStepBarBar}`} />
      </div>
    )
  }
}

AdStepBar.propTypes = {
  ...AdWidget.propTypes,
  steps: PropTypes.array,
  currentStep: PropTypes.number,
  onClick: PropTypes.func,
}

AdStepBar.defaultProps = {
  ...AdWidget.defaultProps,
  steps: [],
  currentStep: 0,
  discrete: true,
}

export default AdStepBar
