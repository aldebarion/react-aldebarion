import React from 'react'
import { contexts } from 'react-aldebarion'
import { AnimatedItem } from 'react-progressive-entrance'

import Page from '../../../../../Page'
import Section from '../../../../../Section'
import Link from '../../../../../Link'

import style from './Minimalism.style'


// https://scifiinterfaces.com/2015/07/21/iron-man-hud-1-person-view/

const Minimalism = () => (
  <contexts.Theme.Consumer>
    {({ theme }) => (
      <Page title="Minimalism" className={`${style.page}`} description="The most important specificity of Aldebarion is the minimalist design.">
        <AnimatedItem animationIndex={3}>
          <p className={style[theme]}>
            With minimalism, Aldebarion wants software applications
            to give back the freedom to the user and
            to help him saving time instead of manipulating him.
            At the opposite of a lot of apps, softwares using Aldebarion should be designed to
            to save user time and so should incitate the user to use them the less possible.
          </p>
          <p>
            If you are not sure what we are talking about, you can read this <Link href="https://medium.com/thrive-global/how-technology-hijacks-peoples-minds-from-a-magician-and-google-s-design-ethicist-56d62ef5edf3">medium article</Link>.
          </p>
          <p>
            In order to make it, Aldebarion gives the priority to efficiency over emotional design.
            So it doesn't fit all applications but helps to focus on what
            really matters.
          </p>
        </AnimatedItem>
        <Section
          index={6}
          title="Minimalist on steroids"
          description="From an aesthetic point of view, Aldebarion is inspired by scandinavian design very
        refined but sill ergonomic."
        >
          <p>
            All designed components are designed with geometric shapes, right angles and only few
            colors. But each difference of colors is symbolic and represents something: a disabled
            state, a wrong value, etc.
          </p>
          <p>
            So even if components are designed to be minimalist, they should contain a lot
            of features to
            make the user experience as much as efficient as possible.
          </p>
        </Section>

      </Page>
    )}
  </contexts.Theme.Consumer>
)

export default Minimalism
