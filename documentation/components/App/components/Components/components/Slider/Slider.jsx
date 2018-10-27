import React, { Component } from 'react'
import { AdSlider, contexts } from 'react-aldebarion'

import Page from '../../../../../Page'
import Section from '../../../../../Section'
import Example from '../../../../../Example'

import style from './Slider.style'

class Dice extends Component {
  constructor(props) {
    super(props)

    this.changeFace = this.changeFace.bind(this)

    this.state = {
      basicSlider: 0,
      gallerySlider: 0,
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
      basicSlider,
      gallerySlider,
      threeFace,
      customFace,
      widgetsFace,
    } = this.state
    return (
      <contexts.Theme.Consumer>
        {({ theme }) => (
          <Page title="Slider" description="The Slider is a component to help you create ... an animated slider obviously.">
            <Section index={2} title="Basic usage">
              <Example>
                <div className={style.center}>
                  <button className={style.raw} type="button" onClick={this.changeFace('basicSlider', 4)}>Next</button>
                </div>
                <AdSlider className={style.slider} index={basicSlider}>
                  <div className={`${style.slide} ${style[theme]}`}>Slide 1</div>
                  <div className={`${style.slide} ${style[theme]}`}>Slide 2</div>
                  <div className={`${style.slide} ${style[theme]}`}>Slide 3</div>
                  <div className={`${style.slide} ${style[theme]}`}>Slide 4</div>
                </AdSlider>
              </Example>
            </Section>
            <Section index={4} title="Gallery">
              <Example>
                <div className={style.center}>
                  <button className={style.raw} type="button" onClick={this.changeFace('gallerySlider', 4)}>Next</button>
                </div>
                <AdSlider
                  className={style.slider}
                  index={gallerySlider}
                  viewBoxClassName={style.viewBox}
                  currentSlideClassName={style.current}
                >
                  <div className={`${style.slide} ${style[theme]}`}>Slide 1</div>
                  <div className={`${style.slide} ${style[theme]} ${style.face2}`}>Slide 2</div>
                  <div className={`${style.slide} ${style[theme]} ${style.face3}`}>Slide 3</div>
                  <div className={`${style.slide} ${style[theme]} ${style.face4}`}>Slide 4</div>
                </AdSlider>
              </Example>
            </Section>
          </Page>
        )}
      </contexts.Theme.Consumer>
    )
  }
}

export default Dice