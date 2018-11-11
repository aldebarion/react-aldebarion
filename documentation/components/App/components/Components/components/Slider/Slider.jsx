import React from 'react'
import { AdSlider, contexts } from 'react-aldebarion'

import Page from '../../../../../Page'
import Section from '../../../../../Section'
import Example from '../../../../../Example'

const choices = [
  { value: 'darker', label: 'Darker' },
  { value: 'dark', label: 'Dark' },
  { value: 'medium', label: 'Medium' },
  { value: 'light', label: 'Light' },
  { value: 'lighter', label: 'Lighter' },
]

export default () => (
  <contexts.Theme.Consumer>
    {(/* { theme } */) => (
      <Page title="Slider" description="The Slider is a way to select a value between in minimum and a maximum.">
        <Section title="Basic usage">
          <Example>
            <AdSlider value={40} />
          </Example>
        </Section>
        <Section title="Disabled">
          <Example>
            <AdSlider value={40} disabled />
          </Example>
        </Section>
        <Section title="Discrete values">
          <Example>
            <AdSlider value={40} min={1} max={100} step={10} />
          </Example>
        </Section>
        <Section title="With left and right labels">
          <Example>
            <AdSlider value={40} minLabel="light" maxLabel="dark" />
          </Example>
        </Section>
        <Section title="With graduation labels">
          <Example>
            <AdSlider value={14} min={10} max={20} step={1} showGraduationLabels />
          </Example>
        </Section>
        <Section title="With label">
          <Example>
            <AdSlider value={2} min={0} max={5} step={1} showCursorLabel />
          </Example>
        </Section>
        <Section title="Custom labels">
          <Example>
            <AdSlider choices={choices} showGraduationLabels />
          </Example>
        </Section>
        <Section title="Select an interval">
          <Example>
            <AdSlider min={0} max={10} showGraduations showGraduationLabels interval />
          </Example>
        </Section>
      </Page>
    )}
  </contexts.Theme.Consumer>
)
