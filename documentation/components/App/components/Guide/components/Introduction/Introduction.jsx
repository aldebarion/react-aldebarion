import React from 'react'
import { AnimatedItem } from 'react-progressive-entrance'

import { contexts } from 'react-aldebarion'

import Page from '../../../../../Page'

import style from './Introduction.style'

import table from './assets/table.png'

const Introduction = () => (
  <contexts.Theme.Consumer>
    {({ theme }) => (
      <Page title="Introduction" className={`${style.page}`}>
        <AnimatedItem>
          <p className={style[theme]}>
            Aldebarion is a web framework to help you build user interfaces ready for the future.
          </p>
          <p>
            Aldebarion is inspired by user interfaces in science-fiction movies like Oblivion,
            Iron Man, Anon, etc.
            His main purpose is to create timeless user interfaces efficient on various
            futuristic platforms like
            virtual reality, augmented reality, HUDs, etc.
          </p>
          <img src={table} className={style.img} alt="Oblivion table" />
          <p>
            Aldebarion is a minimalist framework without compromises. So, it doesn&apos;t fit all
            applications. However, it should dramatically improve your efficiency as developer and
            the experience of your users.
          </p>
          <p>
            Besides Aldebarion is more than a web framework. It is also a Design System to guide you
            while creating timeless user experiences.
          </p>
        </AnimatedItem>
      </Page>
    )}
  </contexts.Theme.Consumer>
)

export default Introduction
