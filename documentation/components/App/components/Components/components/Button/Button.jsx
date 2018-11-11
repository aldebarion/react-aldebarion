import React from 'react'

import { AdButton } from 'react-aldebarion'

import Page from '../../../../../Page'
import Section from '../../../../../Section'
import Example from '../../../../../Example'

import style from './Button.style'

const Button = () => (
  <Page title="Button" description="Trigger an action and submit with buttons.">
    <Section title="Basic usage">
      <Example>
        <AdButton label="button" />
      </Example>
    </Section>
    <Section title="Disabled Button">
      <Example>
        <AdButton label="Disabled button" disabled />
      </Example>
    </Section>
    <Section title="Icon Button">
      <Example>
        <AdButton className={style.button} label="link" href="https://www.qwant.com" target="_blank" />
        <AdButton className={style.button} label="add" icon="plus" />
        <AdButton className={style.button} label="remove" icon="close" iconPosition="right" />
        <AdButton className={style.button} icon="close" />
        <AdButton className={style.button} icon="star" type="icon" />
      </Example>
    </Section>
  </Page>
)

export default Button
