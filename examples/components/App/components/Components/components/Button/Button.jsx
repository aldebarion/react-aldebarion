import React from 'react'

import { AdButton } from 'react-aldebarion'

import Page from '../../../../../Page'
import Section from '../../../../../Section'
import Example from '../../../../../Example'

import style from './Button.style'

const Button = () => (
  <Page title="Button" description="Trigger an action and submit with buttons.">
    <Section index={3} title="Basic usage">
      <Example>
        <AdButton label="button" />
      </Example>
    </Section>
    <Section index={5} title="Disabled Button">
      <Example>
        <AdButton label="Disabled button" disabled />
      </Example>
    </Section>
    <Section index={7} title="Icon Button">
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
