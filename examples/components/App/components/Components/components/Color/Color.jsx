import React from 'react'

import { ALDEBARION } from 'react-aldebarion'

import Page from '../../../../../Page'
import Section from '../../../../../Section'

import Palette from './components/Palette'

import colors from './colors'

export default () => (
  <Page title="Color" description={`${ALDEBARION} is also minimalist in the colors. Each theme contain only 5 colors.`}>
    <Section
      index={2}
      title="Moon Light"
      description="This theme is adapted to dark environments like screens in nights."
    >
      <Palette colors={colors.moonLight} />
    </Section>
    <Section
      index={4}
      title="Frozen Winter"
      description="This theme is adapted to light environments."
    >
      <Palette colors={colors.frozenWinter} />
    </Section>
  </Page>
)
