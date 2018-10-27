import React from 'react'

import { AdSwitch } from 'react-aldebarion'

import Page from '../../../../../Page'
import Section from '../../../../../Section'
import Example from '../../../../../Example'

const Switch = () => (
  <Page title="Switch" description="Switche buttons should be used when there is an exclusive choice to make between two possibilities.">
    <Section index={3} title="Basic usage">
      <Example>
        <AdSwitch choices={[{ value: 'toto', label: 'choice 1' }, { value: 'tutu', label: 'choice 2' }]} />
      </Example>
    </Section>
    <Section index={5} title="Disabled Switch Button">
      <Example>
        <AdSwitch choices={[{ value: 'toto', label: 'choice 1' }, { value: 'tutu', label: 'choice 2' }]} disabled />
      </Example>
    </Section>
  </Page>
)

export default Switch
