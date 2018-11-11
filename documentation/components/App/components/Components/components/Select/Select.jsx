import React, { Component } from 'react'
import {
  AdSelect,
  contexts,
} from 'react-aldebarion'

import style from './Select.style'

import Page from '../../../../../Page'
import Section from '../../../../../Section'
import Example from '../../../../../Example'

class Select extends Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)

    this.differentOptions = [
      { label: 'one by one', value: 'one' },
      { label: 'two by two', value: 'two' },
      { label: 'three by three', value: 'three' },
    ]

    // this.disabledOptions = [
    //   { label: '' }
    // ]

    this.state = {
      firstValue: null,
    }
  }

  handleChange(newValue) {
    this.setState({
      firstValue: newValue,
    })
  }

  render() {
    const {
      firstValue,
    } = this.state
    return (
      <contexts.Theme.Consumer>
        {(/* { theme } */) => (
          <Page title="Select" description="The Select component propose to the user to select between several options in a scrollable menu. Depending of the options, the options can even be editable.">
            <Section title="Basic usage">
              <Example>
                <AdSelect placeholder="Choose a name" options={['one', 'two', 'three', 'four']} />
              </Example>
            </Section>
            <Section title="Value different from label">
              <Example>
                <div className={style.container}>
                  <AdSelect
                    className={style.select}
                    placeholder="Choose a name"
                    options={this.differentOptions}
                    value={firstValue}
                    onChange={this.handleChange}
                  />
                  <div className={style.value}>{firstValue}</div>
                </div>
              </Example>
            </Section>
            <Section title="Disabled option">
              <Example>
                <AdSelect placeholder="Choose a name" options={['one', 'two', 'three', 'four']} value="one" disabled />
              </Example>
            </Section>
            <Section title="Disabled select">
              <Example>
                <AdSelect placeholder="Choose a name" options={['one', 'two', 'three', 'four']} value="one" disabled />
              </Example>
            </Section>
          </Page>
        )}
      </contexts.Theme.Consumer>
    )
  }
}

export default Select
