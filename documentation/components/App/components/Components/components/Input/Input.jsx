import React, { Component } from 'react'

import { AdInput, ALDEBARION } from 'react-aldebarion'

import Page from '../../../../../Page'
import Section from '../../../../../Section'
import Example from '../../../../../Example'

import style from './Input.style'

class Input extends Component {
  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleStartShowAnimatedInput = this.handleStartShowAnimatedInput.bind(this)
    this.handleStopShowAnimatedInput = this.handleStopShowAnimatedInput.bind(this)

    this.state = {
      // submittedOne: false,
      showAnimatedInput: false,
      showAnimatedInputButton: true,
    }
  }

  handleStartShowAnimatedInput() {
    this.setState({
      showAnimatedInput: false,
      showAnimatedInputButton: false,
    }, () => {
      setTimeout(() => {
        this.setState({
          showAnimatedInput: true,
        })
      }, 200)
    })
  }

  handleStopShowAnimatedInput() {
    this.setState({
      showAnimatedInputButton: true,
    })
  }

  handleSubmit(input) {
    return () => {
      this.setState({
        [input]: true,
      })
    }
  }

  render() {
    const {
      showAnimatedInput,
      showAnimatedInputButton,
    } = this.state

    return (
      <Page title="Input" description="Inputs are the main way to enter information. So they need to be very clean, efficient and scalable.">
        <Section title="Basic usage">
          <Example>
            <AdInput placeholder="Basic input" />
          </Example>
        </Section>
        <Section title="Disabled">
          <Example>
            <AdInput placeholder="Disabled input" disabled />
          </Example>
        </Section>
        <Section title="Read only">
          <Example>
            <AdInput defaultValue="Read only input" readOnly />
          </Example>
        </Section>
        <Section title="With an icon" description="We sometimes say a picture is worth a thousand words. When the context and the placeholder are not enough, use a icon to describe what the application needs from the user.">
          <Example>
            <AdInput placeholder="Input with icon" icon="email" />
          </Example>
        </Section>
        <Section title="With an prefix" description="It is also possible to replace the icon for a prefix when it helps the user to start writing.">
          <Example>
            <AdInput placeholder="Input with prefix" prefix="http://" />
          </Example>
        </Section>
        <Section title="Integrated button" description="When the data needs to be submitted to be taken into account, a button can be directly linked to the input.">
          <Example>
            <AdInput placeholder="Input with button" showSubmit onSubmit={this.handleSubmit('submittedOne')} />
          </Example>
        </Section>
        <Section title="Validation" description="When the application expects data with specific format, it is important to show it to the user as soon as possible with a feedback. If the input is linked to a button, it will be automatically disabled until the value is valid.">
          <Example>
            <AdInput placeholder="Input with button with validation" showSubmit validate={5} />
          </Example>
          <p>
            Otherwise, {ALDEBARION} will display an indicator on the right.
          </p>
          <Example>
            <AdInput placeholder="Input with indicator" validate={5} />
          </Example>
          <blockquote>
            If you do not define a validator by yourself, a default validator is automatically set
            for specific input types like "number", "date", "datetime", "email", etc.
          </blockquote>
        </Section>
        <Section title="Mixed input" description="Of course, it is also possible to mix all previous feature together.">
          <Example>
            <AdInput placeholder="Only email accepted" showSubmit type="email" icon="email" />
          </Example>
        </Section>
        <Section title="Animated input" description="In order to avoid to overload user attention, it is suggested to make your components appearing progressively.">
          <Example>
            { showAnimatedInput ? <AdInput className={style.input} placeholder="Only email accepted" showSubmit type="email" icon="email" animated onAnimationFinished={this.handleStopShowAnimatedInput} /> : null }
            { showAnimatedInputButton ? <button className={style.button} onClick={this.handleStartShowAnimatedInput} type="button">Animate input</button> : null }
          </Example>
        </Section>
      </Page>
    )
  }
}

export default Input
