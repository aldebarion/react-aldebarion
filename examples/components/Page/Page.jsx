import React from 'react'
import PropTypes from 'prop-types'
import { AnimatedGroup, AnimatedItem } from 'react-progressive-entrance'
import { contexts } from 'react-aldebarion'

import style from './Page.style'

const Page = ({
  className,
  title,
  description,
  children,
}) => (
  <contexts.Theme.Consumer>
    {({ theme }) => (
      <AnimatedGroup animation="fadeInRight" interval={50} maxIndex={100}>
        <div className={`${style.Page} ${style[theme]} ${className}`}>
          <AnimatedItem animationIndex={1}>
            <h1 className={`${style.title} ${style[theme]}`}>
              {title}
            </h1>
          </AnimatedItem>
          { description
            ? (
              <AnimatedItem animationIndex={2}>
                <p className={`${style.description} ${style[theme]}`}>
                  {description}
                </p>
              </AnimatedItem>
            ) : null }
          {children}
        </div>
      </AnimatedGroup>
    )}
  </contexts.Theme.Consumer>
)

Page.propTypes = {
  className: PropTypes.string,
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  description: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
}

Page.defaultProps = {
  className: '',
  title: '',
  description: '',
  children: [],
}

export default Page
