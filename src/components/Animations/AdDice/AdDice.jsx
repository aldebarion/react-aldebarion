import React, { Component } from 'react'
import PropTypes from 'prop-types'

import style from './AdDice.style'

class AdDice extends Component {
  constructor(props) {
    super(props)

    const { face } = this.props

    this.state = {
      face,
    }
  }

  componentDidUpdate(prevProps) {
    const {
      face: newFace,
    } = this.props
    const {
      face,
    } = this.state
    if (newFace !== prevProps.face && newFace !== face) {
      this.updateFace()
    }
  }

  updateFace() {
    const {
      face,
    } = this.props
    this.setState({
      face,
    })
  }

  render() {
    const {
      className,
      children,
      height,
    } = this.props
    const {
      face,
    } = this.state

    let centerDistance = 0
    if (children.length === 4) {
      centerDistance = height / 2
    } else if (children.length === 3) {
      centerDistance = height * 1.732050808 / 6
    } else if (children.length === 3) {
      centerDistance = 0
    }

    return (
      <div className={`${style.AdDice} ${className}`} style={{ height }}>
        {React.Children.map(children, (child, index) => (
          <div
            style={{ transformOrigin: `center center ${centerDistance}px` }}
            className={`${style.face} ${style[`count-${children.length}`]} ${style[`face-${index}`]} ${style[`current-face-${face}`]}`}
          >
            {child}
          </div>
        ))}
      </div>
    )
  }
}

AdDice.propTypes = {
  className: PropTypes.string,
  face: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  height: PropTypes.number,
}

AdDice.defaultProps = {
  className: '',
  face: 0,
  children: ['Face 1', 'Face 2', 'Face3', 'Face 4'],
  height: 100,
}

export default AdDice
