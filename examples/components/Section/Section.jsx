import React from 'react'
import PropTypes from 'prop-types'
import { AnimatedItem } from 'react-progressive-entrance'

import { contexts } from 'react-aldebarion'

import style from './Section.style'

const Section = ({
  title,
  description,
  children,
  index,
}) => (
  <contexts.Theme.Consumer>
    {({ theme }) => (
      <section className={style.Section}>
        <AnimatedItem animationIndex={index}>
          <h2 className={`${style.title} ${style[theme]}`}>{title}</h2>
        </AnimatedItem>
        {
          description
            ? (
              <AnimatedItem animationIndex={index + 1}>
                <p className={`${style.description} ${style[theme]}`}>
                  {description}
                </p>
              </AnimatedItem>
            ) : null
        }
        <div className={style.content}>
          {React.Children.toArray(children).map((child, index2) => (
            <AnimatedItem key={`child-${index2 + index + 2}`} animationIndex={index + index2 + 2}>
              {child}
            </AnimatedItem>
          ))}
        </div>
      </section>
    )}
  </contexts.Theme.Consumer>
)

Section.propTypes = {
  title: PropTypes.string,
  description: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  index: PropTypes.number,
}

Section.defaultProps = {
  title: '',
  description: '',
  children: [],
  index: null,
}

export default Section
