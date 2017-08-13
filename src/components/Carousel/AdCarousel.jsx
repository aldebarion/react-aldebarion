import React /* , { PropTypes }*/ from 'react'

import AdWidget from '../AdWidget'

// import AdIconButton from '../Buttons/AdIconButton'
import AdHexaButton from '../Buttons/AdHexaButton'
import AdStepBar from '../AdStepBar'

import style from './AdCarousel.style'

class AdCarousel extends AdWidget {

  constructor(props) {
    super(props)

    this.goToLeft = this.goToLeft.bind(this)
    this.goToRight = this.goToRight.bind(this)
    this.goToSlide = this.goToSlide.bind(this)
    this.state = {
      currentSlide: 0,
    }
  }

  goToLeft() {
    let newCurrentSlide = this.state.currentSlide - 1
    if (newCurrentSlide < 0) {
      newCurrentSlide = 0
    }
    this.setState({
      currentSlide: newCurrentSlide,
    })
  }

  goToRight() {
    let newCurrentSlide = this.state.currentSlide + 1
    if (newCurrentSlide >= this.props.children.length) {
      newCurrentSlide = this.props.children.length - 1
    }
    this.setState({
      currentSlide: newCurrentSlide,
    })
  }

  goToSlide(index) {
    this.setState({
      currentSlide: index,
    })
  }

  render() {
    return (
      <div className={`${this.loadClassNames(style)} ${style.adCarousel}`}>
        <div className={`${this.loadSubClassNames(style)} ${style.navButton}`}>
          {
            this.state.currentSlide > 0 ?
              <AdHexaButton icon="angle-left" discreet onClick={this.goToLeft} /> : null
          }
        </div>
        <div className={`${this.loadSubClassNames(style)} ${style.show}`}>
          <div className={`${this.loadSubClassNames(style)} ${style.list}`} style={{ left: `-${this.state.currentSlide * 100}%` }}>
            {this.props.children}
          </div>
          <AdStepBar
            className={style.progressBar}
            currentStep={this.state.currentSlide}
            onClick={this.goToSlide}
            steps={this.props.children}
          />
        </div>
        <div className={`${this.loadSubClassNames(style)} ${style.navButton}`}>
          {
            this.state.currentSlide < this.props.children.length - 1 ?
              <AdHexaButton icon="angle-right" discreet onClick={this.goToRight} /> : null
          }
        </div>
      </div>
    )
  }
}

AdCarousel.propTypes = {
  ...AdWidget.propTypes,
}

AdCarousel.defaultProps = {
  ...AdWidget.defaultProps,
}

export default AdCarousel
