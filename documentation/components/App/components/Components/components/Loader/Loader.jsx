import React, { Component } from 'react'

import { AdLoader, AdButton } from 'react-aldebarion'

import Page from '../../../../../Page'
import Section from '../../../../../Section'
import Example from '../../../../../Example'
import Link from '../../../../../Link'

import style from './Loader.style'

export default class Loader extends Component {
  constructor(props) {
    super(props)

    this.onClick = this.onClick.bind(this)

    this.state = {
      loading1: false,
      loading2: false,
    }
  }

  onClick(index) {
    return () => {
      this.setState({
        [`loading${index}`]: true,
      })

      setTimeout(() => {
        this.setState({
          [`loading${index}`]: false,
        })
      }, 6000)
    }
  }

  render() {
    const {
      loading1,
      loading2,
    } = this.state
    return (
      <Page
        title="Loader"
        description="When the user needs to wait, it is important to show him that
        the application is working for him."
      >
        <Section title="Basic usage" description="An hypnotic animated loarder to lost the user in his mind.">
          <Example>
            <AdLoader className={style.loader} />
          </Example>
        </Section>
        <Section title="Impatient loader">
          <Example>
            <AdLoader className={style.loader} fast />
          </Example>
        </Section>
        <Section title="In button">
          <Example>
            <AdButton loading={loading1} label="Click me" onClick={this.onClick(1)} />
            <AdButton loading={loading2} label="Click me" onClick={this.onClick(2)} iconPosition="right" />
          </Example>
          <p>
            This loader is inspired from Deus Ex video games and all rights come to <Link href="https://dribbble.com/shots/3203465-Loader-Animation">Anton Drokov</Link> who did this wonderful piece of art.
          </p>
        </Section>
      </Page>
    )
  }
}
