import React from 'react'

import { AdRadio } from 'react-aldebarion'

import Page from '../../../../../Page'
import Section from '../../../../../Section'
import Example from '../../../../../Example'

const Radio = () => (
  <Page title="Radio" description="Radio buttons should be used when there is an exclusive choice to make between a fixed and quick small list of possibilities.">
    <Section index={3} title="Basic usage">
      <Example>
        <AdRadio choices={[{ value: 'toto', label: 'choice 1' }, { value: 'tutu', label: 'choice 2' }]} />
      </Example>
    </Section>
    <Section index={5} title="Disabled">
      <Example>
        <AdRadio choices={[{ value: 'toto', label: 'choice 1' }, { value: 'tutu', label: 'choice 2' }]} disabled />
      </Example>
    </Section>
    <Section index={7} title="Multi lines">
      <Example>
        <AdRadio choices={[{ value: 'toto', label: 'choice 1' }, { value: 'tutu', label: 'choice 2' }, { value: 'titi', label: 'choice 3' }]} multiline />
      </Example>
    </Section>
  </Page>
)

export default Radio
