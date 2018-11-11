import React from 'react'
import PropTypes from 'prop-types'
import { AnimatedItem } from 'react-progressive-entrance'

import { contexts } from 'react-aldebarion'

import style from './Section.style'

const Section = ({
  title,
  description,
  children,
}) => (
  <contexts.Theme.Consumer>
    {({ theme }) => (
      <section className={style.Section}>
        <AnimatedItem>
          <h2 className={`${style.title} ${style[theme]}`}>{title}</h2>
        </AnimatedItem>
        {
          description
            ? (
              <AnimatedItem>
                <p className={`${style.description} ${style[theme]}`}>
                  {description}
                </p>
              </AnimatedItem>
            ) : null
        }
        <div className={style.content}>
          {React.Children.toArray(children).map((child, index2) => (
            <AnimatedItem key={`child-${index2 + 1}`}>
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
}

Section.defaultProps = {
  title: '',
  description: '',
  children: [],
}

export default Section
