import React from 'react'

import { AdCheckbox } from 'react-aldebarion'

import Page from '../../../../../Page'
import Section from '../../../../../Section'
import Example from '../../../../../Example'

const Checkbox = () => (
  <Page title="Checkbox" description="Checkbox buttons should be used when there is a non-exclusive choice to make between a fixed and quick small list of posibilities.">
    <Section title="Basic usage">
      <Example>
        <AdCheckbox choices={[{ value: 'toto', label: 'choice 1' }, { value: 'tutu', label: 'choice 2' }]} />
      </Example>
    </Section>
    <Section title="Disabled">
      <Example>
        <AdCheckbox choices={[{ value: 'toto', label: 'choice 1' }, { value: 'tutu', label: 'choice 2' }]} disabled />
      </Example>
    </Section>
    <Section title="Multi lines">
      <Example>
        <AdCheckbox choices={[{ value: 'toto', label: 'choice 1' }, { value: 'tutu', label: 'choice 2' }, { value: 'titi', label: 'choice 3' }]} multiline />
      </Example>
    </Section>
  </Page>
)

export default Checkbox
