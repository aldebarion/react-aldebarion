import React from 'react'
import PropTypes from 'prop-types'

import Context from './Context'

const AnimatedItem = ({ children, animation: childAnimation, animationIndex }) => (
  <Context.Consumer>
    { ({ currentStep, animation: parentAnimation }) => (React.Children
      .toArray(children)
      .map((child, index) => {
        const animation = childAnimation || parentAnimation
        let newClassName = `${child.props.className ? child.props.className : ''} ${animation}-enter`
        if (animationIndex <= currentStep) {
          newClassName = `${newClassName} ${animation}-enter-active`
        }
        const properties = {
          className: newClassName,
          key: `item-${index}`,
        }
        return React.cloneElement(child, properties)
      })
    )}
  </Context.Consumer>
)

AnimatedItem.propTypes = {
  children: PropTypes.node.isRequired,
  animationIndex: PropTypes.number.isRequired,
  animation: PropTypes.string,
}

AnimatedItem.defaultProps = {
  animation: null,
}

export default AnimatedItem
