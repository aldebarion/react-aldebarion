import React from 'react'

import { AdIcon, ALDEBARION } from 'react-aldebarion'

import Page from '../../../../../Page'
import Section from '../../../../../Section'
import Example from '../../../../../Example'
import Link from '../../../../../Link'

import style from './Icon.style'

export default () => (
  <Page title="Icon" description="Use straight, thin and minimalist icons to illustrate your point.">
    <Section index={3} title="Basic usage" description="These icons are font icons.">
      <Example>
        <AdIcon className={style.icon} icon="user" />
        <AdIcon className={style.icon} icon="email" />
        <AdIcon className={style.icon} icon="lock" />
        <AdIcon className={style.icon} icon="arrow-right" />
      </Example>
    </Section>
    <Section index={6} title="All icons">
      <p>
        {ALDEBARION} uses themify icons so you can retrieve all icons on
        the <Link href="https://themify.me/themify-icons">website</Link>.
      </p>
    </Section>
  </Page>
)
