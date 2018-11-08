import React, { Component } from 'react'
import {
  AdTypeWriter,
  contexts,
} from 'react-aldebarion'

import Page from '../../../../Page'
import Section from '../../../../Section'
import Example from '../../../../Example'

class TypeWriter extends Component {
  constructor(props) {
    super(props)

    this.handleFinishAnimation = this.handleFinishAnimation.bind(this)
    this.handleBackspaceAnimation = this.handleBackspaceAnimation.bind(this)

    this.choices = [
      'I love the smell of napalm in the morning.',
      'I love the smell of napalm in the morning.',
      'Thy days are done, thy fame begun;\nThy country\'s strains record\nThe triumphs of her chosen Son,\nThe slaughter of his sword!\nThe deeds he did, the fields he won,\nThe freedom he restored!',
    ]

    this.state = {
      simpleText: '',
      impatientText: '',
      multiLineText: '',
    }
  }

  componentDidMount() {
    this.handleBackspaceAnimation('simpleText', 0)()
    this.handleBackspaceAnimation('impatientText', 1)()
    this.handleBackspaceAnimation('multiLineText', 2)()
  }

  handleFinishAnimation(key) {
    return () => {
      setTimeout(() => {
        this.setState({
          [key]: '',
        })
      }, 2000)
    }
  }

  handleBackspaceAnimation(key, index) {
    return () => {
      setTimeout(() => {
        this.setState({
          [key]: this.choices[index],
        })
      }, 2000)
    }
  }

  render() {
    const {
      simpleText,
      impatientText,
      multiLineText,
    } = this.state
    return (
      <contexts.Theme.Consumer>
        {({ theme }) => (
          <Page title="TypeWriter" description="The TypeWriter is a component to write progressively a text string.">
            <Section index={3} title="Basic usage">
              <Example>
                <AdTypeWriter
                  value={simpleText}
                  onFinish={this.handleFinishAnimation('simpleText')}
                  onBackspaceFinish={this.handleBackspaceAnimation('simpleText', 0)}
                />
              </Example>
            </Section>
            <Section index={5} title="Customizable typing speeed" description="The typing speed can be customizable as you want.">
              <Example>
                <AdTypeWriter
                  interval={30}
                  backspaceInterval={15}
                  value={impatientText}
                  onFinish={this.handleFinishAnimation('impatientText')}
                  onBackspaceFinish={this.handleBackspaceAnimation('impatientText', 1)}
                />
              </Example>
            </Section>
            <Section index={8} title="Multi lines">
              <Example>
                <AdTypeWriter
                  value={multiLineText}
                  onFinish={this.handleFinishAnimation('multiLineText')}
                  onBackspaceFinish={this.handleBackspaceAnimation('multiLineText', 2)}
                />
              </Example>
            </Section>
          </Page>
        )}
      </contexts.Theme.Consumer>
    )
  }
}

export default TypeWriter
