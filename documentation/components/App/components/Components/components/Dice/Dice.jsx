import React, { Component } from 'react'
import {
  AdDice,
  AdInput,
  AdRadio,
  AdCheckbox,
  contexts,
} from 'react-aldebarion'

import Page from '../../../../../Page'
import Section from '../../../../../Section'
import Example from '../../../../../Example'

import style from './Dice.style'

class Dice extends Component {
  constructor(props) {
    super(props)

    this.changeFace = this.changeFace.bind(this)

    this.state = {
      basicFace: 0,
      twoFace: 0,
      threeFace: 0,
      customFace: 0,
      widgetsFace: 0,
    }
  }

  changeFace(variable, length) {
    return () => {
      const { [variable]: face } = this.state
      let newFace = face + 1
      if (newFace >= length) {
        newFace = 0
      }
      this.setState({
        [variable]: newFace,
      })
    }
  }

  render() {
    const {
      basicFace,
      twoFace,
      threeFace,
      customFace,
      widgetsFace,
    } = this.state
    return (
      <contexts.Theme.Consumer>
        {({ theme }) => (
          <Page title="Dice" description="The Dice is a component to help you animate components like they were on different faces of a solid. It is very useful when you want to show different steps of a process.">
            <Section index={3} title="Basic usage" description="4 faces that rotate.">
              <Example>
                <div className={style.center}>
                  <button className={style.raw} type="button" onClick={this.changeFace('basicFace', 4)}>Next</button>
                </div>
                <AdDice className={style.dice} face={basicFace}>
                  <div className={`${style.face} ${style[theme]} ${style.face1}`}>Face 1</div>
                  <div className={`${style.face} ${style[theme]} ${style.face2}`}>Face 2</div>
                  <div className={`${style.face} ${style[theme]} ${style.face3}`}>Face 3</div>
                  <div className={`${style.face} ${style[theme]} ${style.face4}`}>Face 4</div>
                </AdDice>
              </Example>
            </Section>
            <Section index={6} title="With 2 faces">
              <Example>
                <div className={style.center}>
                  <button className={style.raw} type="button" onClick={this.changeFace('twoFace', 2)}>Next</button>
                </div>
                <AdDice className={style.dice} face={twoFace}>
                  <div className={`${style.face} ${style[theme]} ${style.face1}`}>Face 1</div>
                  <div className={`${style.face} ${style[theme]} ${style.face2}`}>Face 2</div>
                </AdDice>
              </Example>
            </Section>
            <Section index={8} title="With 3 faces">
              <Example>
                <div className={style.center}>
                  <button className={style.raw} type="button" onClick={this.changeFace('threeFace', 3)}>Next</button>
                </div>
                <AdDice className={style.dice} face={threeFace}>
                  <div className={`${style.face} ${style[theme]} ${style.face1}`}>Face 1</div>
                  <div className={`${style.face} ${style[theme]} ${style.face2}`}>Face 2</div>
                  <div className={`${style.face} ${style[theme]} ${style.face3}`}>Face 3</div>
                </AdDice>
              </Example>
            </Section>
            <Section index={10} title="With custom design">
              <Example className={style.clean}>
                <div className={style.center}>
                  <button className={style.raw} type="button" onClick={this.changeFace('customFace', 4)}>Next</button>
                </div>
                <AdDice className={style.customDice} face={customFace} height={400}>
                  <div className={`${style.face} ${style.face1}`} />
                  <div className={`${style.face} ${style.face2}`} />
                  <div className={`${style.face} ${style.face3}`} />
                  <div className={`${style.face} ${style.face4}`} />
                </AdDice>
              </Example>
            </Section>
            <Section index={12} title="With components">
              <Example className={style.clean}>
                <div className={style.center}>
                  <button className={style.raw} type="button" onClick={this.changeFace('widgetsFace', 3)}>Next</button>
                </div>
                <AdDice className={style.customDice} face={widgetsFace} height={150}>
                  <AdInput placeholder="Input 1" />
                  <AdRadio choices={['Choice 1', 'Choice 2']} />
                  <AdCheckbox choices={['Choice 1', 'Choice 2']} />
                </AdDice>
              </Example>
            </Section>
          </Page>
        )}
      </contexts.Theme.Consumer>
    )
  }
}

export default Dice
