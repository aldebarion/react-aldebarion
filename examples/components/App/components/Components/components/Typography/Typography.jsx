import React from 'react'

import { ALDEBARION } from 'react-aldebarion'

import Page from '../../../../../Page'
import Section from '../../../../../Section'
import Example from '../../../../../Example'

const openInTab = (event) => {
  window.open('http://indestructibletype.com/Jost.html')
  event.preventDefault()
  event.stopPropagation()
}


export default () => (
  <Page title="Typography" description={`All fonts in ${ALDEBARION} are very functional.`}>
    <Section title="Basic usage" index={3}>
      <p>
        The main font in {ALDEBARION} is <a href="http://indestructibletype.com/Jost.html" onClick={openInTab}>Jost</a>*, a font very similar to Futura.
      </p>
      <Example>
        <h1>Title h1</h1>
        <h2>Title h2</h2>
        <p>Normal text with <strong>strong</strong> and <a href="#h1">link</a></p>
      </Example>
    </Section>
  </Page>
)
