import React from 'react'
import { contexts } from 'react-aldebarion'
import { AnimatedItem } from 'react-progressive-entrance'

import Page from '../../../../../Page'
import Section from '../../../../../Section'
import Link from '../../../../../Link'

import style from './Animations.style'

import transformer from './assets/transformers.gif'

const Animations = () => (
  <contexts.Theme.Consumer>
    {({ theme }) => (
      <Page
        title="Animations"
        className={`${style.page}`}
        description="Animations are a good support to ergonomy. They allow to display a large quantity
        on the screen without overloading user focus. They can also be used to help the user
        understand
        how the page is composed and with which elements he can interact."
      >
        <AnimatedItem animationIndex={3}>
          <blockquote>
            Animations are designed to increase the usability of your application
            following <Link href="https://medium.com/ux-in-motion/creating-usability-with-motion-the-ux-in-motion-manifesto-a87a4584ddc">motion manifesto</Link>.
          </blockquote>
        </AnimatedItem>
        <Section
          index={4}
          title="Apparitions"
          description="On high-productivity applications, a lot of data is often displayed. In
          order to avoid the user to be overloaded as soon as he arrives on the first page, it is
          always a good practice to add animations to make the components appearing progressively.
          "
        >
          <p>
            These apparition animations may be splitted in to part. The first part is to make
            the components appearing one after an other. A third party library
            like <Link href="https://github.com/friedrith/react-progressive-entrance">react-progressive-entrance</Link> may
            be used.
          </p>
          <p>
            For widgets composed of multi parts, it is also useful to make them appearing
            progressively like a <strong>transformer</strong>. It gives a little time to the
            user to understand
            all parts of the components and so be more efficient when usint it.
          </p>
          <img src={transformer} className={style.img} alt="Bumblebee" />
          <p>
            Default Aldebarion components have a property <strong>animated</strong> that create this
            kind of effect.
          </p>
        </Section>
        <Section
          index={10}
          title="Interactions"
          description="Everytime a component is interactive, he should be animated when the mouse
          goes
          over to help the user understand its capabilities."
        >
          <p>
            This kind of animations comes also with the absence of animations when a component
            is not interactive to explain the exact opposite to the user. It very important
            for disabled components that cannot be clicked by the user.
          </p>
          <p>
            It it also important to give a feedback to the user everytime an action is in progress.
            It
            helps him to understand that his requests has been taken into account and that
            the application is currently working. It avoid questioning, hesitation and frustration.
          </p>
        </Section>
        <Section
          index={14}
          title="Transitions"
          description="Last but not the least, it is also important to apply the same best practices
          after the first apparition, when views are changing."
        >
          <p>
            Aldebarion has also several special components to help you create smooth
            transitions.
          </p>
        </Section>
      </Page>
    )}
  </contexts.Theme.Consumer>
)

export default Animations
