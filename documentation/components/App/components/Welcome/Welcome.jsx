import React from 'react'
import { AnimatedGroup, AnimatedItem } from 'react-progressive-entrance'

import { contexts } from 'react-aldebarion'

import style from './Welcome.style'

export default () => (
  <contexts.Theme.Consumer>
    {({ theme }) => (
      <div className={style.Welcome}>
        <div>
          <AnimatedGroup animation="fadeInBottom">
            <AnimatedItem animationIndex={1}>
              <h1 className={`${style.title} ${style[theme]}`}>The front-end framework built for the future.</h1>
              <h2 className={`${style.subtitle} ${style[theme]}`}>
                Based on minimalism to save user time<br /> and create timeless user experiences.
              </h2>
            </AnimatedItem>
            {/* <div className={style.center}>
              <AnimatedItem animationIndex={4} animation="fadeIn">
                <div className={`${style.progress} ${style[theme]}`}>Work in progress</div>
              </AnimatedItem>
            </div> */}
          </AnimatedGroup>
        </div>
      </div>
    )}
  </contexts.Theme.Consumer>
)
