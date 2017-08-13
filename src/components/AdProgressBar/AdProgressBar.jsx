import React, { PropTypes } from 'react'

import AdWidget from '../AdWidget'

import style from './AdProgressBar.style'

class AdProgressBar extends AdWidget {

  constructor(props) {
    super(props)

    this.state = {
      percentage: 0,
      label: null,
    }
  }

  updatePercentage() {
    this.setState({
      percentage: ((this.props.value - this.props.min) * 100) / (this.props.max - this.props.min),
      label: this.props.label,
    })
  }

  componentDidMount() {
    this.updatePercentage()
  }


  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value || this.props.label !== nextProps.label) {
      this.updatePercentage()
    }
  }


  render() {
    return (
      <div className={`${this.loadClassNames(style)} ${style.adProgressBar}`} >
        {
          this.state.label ?
            <div className={style.adProgressBarLabel}>
              {this.state.label}
            </div> : null
        }
        <div className={`${style.adProgressBarContent} ${this.loadSubClassNames(style)}`}>
          <div className={style.adProgressBarProgress} style={{ width: `${this.state.percentage}%` }} />
        </div>
      </div>
    )
  }
}

AdProgressBar.propTypes = {
  ...AdWidget.propTypes,
  value: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  label: PropTypes.string,
}

AdProgressBar.defaultProps = {
  ...AdWidget.defaultProps,
  value: '',
  min: 0,
  max: 100,
  label: null,
}

export default AdProgressBar
