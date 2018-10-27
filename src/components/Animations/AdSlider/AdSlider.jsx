import React, { Component } from 'react'
import PropTypes from 'prop-types'

import style from './AdSlider.style'

class AdSlider extends Component {
  constructor(props) {
    super(props)

    const { index } = this.props

    this.state = {
      index,
    }
  }

  componentDidUpdate(prevProps) {
    const {
      index: newIndex,
    } = this.props
    const {
      index,
    } = this.state
    if (newIndex !== prevProps.index && newIndex !== index) {
      this.updateIndex()
    }
  }

  updateIndex() {
    const {
      index,
    } = this.props
    this.setState({
      index,
    })
  }

  render() {
    const {
      className,
      viewBoxClassName,
      currentSlideClassName,
      children,
    } = this.props
    const {
      index,
    } = this.state

    return (
      <div className={`${style.AdSlider} ${className}`}>
        <div className={`${style.viewBox} ${viewBoxClassName}`}>
          <div className={style.list} style={{ width: `${100 * children.length}%`, transform: `translateX(${-100 / children.length * index}%)` }}>
            {React.Children.map(children, (child, currentIndex) => (
              <div
                className={`${style.slide} ${currentIndex === index ? currentSlideClassName : ''}`}
              >
                {child}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

AdSlider.propTypes = {
  className: PropTypes.string,
  index: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  viewBoxClassName: PropTypes.string,
  currentSlideClassName: PropTypes.string,
}

AdSlider.defaultProps = {
  className: '',
  index: 0,
  children: ['index 1', 'index 2', 'index3', 'index 4'],
  viewBoxClassName: '',
  currentSlideClassName: '',
}

export default AdSlider
