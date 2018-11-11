import React from 'react'
import { contexts } from 'react-aldebarion'
import { AnimatedItem } from 'react-progressive-entrance'

import Page from '../../../../../Page'
import Section from '../../../../../Section'

import style from './Consistency.style'

const Consistency = () => (
  <contexts.Theme.Consumer>
    {(/* { theme } */) => (
      <Page
        title="Consistency"
        className={`${style.page}`}
        description="Even if minimalism is the most visible specificity of Aldebarion,
        consistency is the first reason of the creation of this framework."
      >
        <Section
          title="Over time"
          description="First of all, applications built with Aldebarion should be designed to be consistent
        over time. Your application should keep the same efficiency years after years.
        It may seem useless but
        it is already necessary in few business sectors like military supplyments or nuclear centers. It will be more significant in the future with the space colonization."
        />
        <Section
          index={5}
          title="Between devices"
          description="In future, we will have more and more digital devices in our daily life.
          With Aldebarion, the ambition is to have the same user experience when you use a
        smartphone, a computer, a tablet, a HUD, a touch table, a car, etc."
        />
        <Section
          index={7}
          title="Between applications"
          description=""
        />
        <AnimatedItem animationIndex={9}>
          <p>
            In order to have a consistent experience, user should be able to have the same
            customizations over devices and applications. For example, the theme on one application
            should be appliable on another application.
          </p>
        </AnimatedItem>
      </Page>
    )}
  </contexts.Theme.Consumer>
)

export default Consistency
