import React from 'react'

import { AdRadio } from 'react-aldebarion'

import Page from '../../../../../Page'
import Section from '../../../../../Section'
import Example from '../../../../../Example'

const Radio = () => (
  <Page title="Radio" description="Radio buttons should be used when there is an exclusive choice to make between a fixed and quick small list of possibilities.">
    <Section title="Basic usage">
      <Example>
        <AdRadio choices={[{ value: 'toto', label: 'choice 1' }, { value: 'tutu', label: 'choice 2' }]} />
      </Example>
    </Section>
    <Section title="Disabled">
      <Example>
        <AdRadio choices={[{ value: 'toto', label: 'choice 1' }, { value: 'tutu', label: 'choice 2' }]} disabled />
      </Example>
    </Section>
    <Section title="Multi lines">
      <Example>
        <AdRadio choices={[{ value: 'toto', label: 'choice 1' }, { value: 'tutu', label: 'choice 2' }, { value: 'titi', label: 'choice 3' }]} multiline />
      </Example>
    </Section>
  </Page>
)

export default Radio
