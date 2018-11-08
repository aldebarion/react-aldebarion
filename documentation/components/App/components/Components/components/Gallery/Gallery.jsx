import React, { Component } from 'react'
import { AdGallery, contexts } from 'react-aldebarion'

import Page from '../../../../../Page'
import Section from '../../../../../Section'
import Example from '../../../../../Example'

import style from './Gallery.style'

class Gallery extends Component {
  constructor(props) {
    super(props)

    this.changeFace = this.changeFace.bind(this)

    this.state = {
      basicSlider: 0,
      gallerySlider: 0,
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
    } = this.state
    return (
      <contexts.Theme.Consumer>
        {({ theme }) => (
          <Page title="Gallery" description="The Gallery is a component to help you create animated sliding component.">
            <Section index={2} title="Basic usage">
              <Example>
                <div className={style.center}>
                  <button className={style.raw} type="button" onClick={this.changeFace('basicSlider', 4)}>Next</button>
                </div>
                <AdGallery className={style.slider} index={basicSlider}>
                  <div className={`${style.slide} ${style[theme]}`}>Slide 1</div>
                  <div className={`${style.slide} ${style[theme]}`}>Slide 2</div>
                  <div className={`${style.slide} ${style[theme]}`}>Slide 3</div>
                  <div className={`${style.slide} ${style[theme]}`}>Slide 4</div>
                </AdGallery>
              </Example>
            </Section>
            <Section index={4} title="Sophisticated">
              <Example>
                <div className={style.center}>
                  <button className={style.raw} type="button" onClick={this.changeFace('gallerySlider', 4)}>Next</button>
                </div>
                <AdGallery
                  className={style.slider}
                  index={gallerySlider}
                  viewBoxClassName={style.viewBox}
                  currentSlideClassName={style.current}
                >
                  <div className={`${style.slide} ${style[theme]}`}>Slide 1</div>
                  <div className={`${style.slide} ${style[theme]} ${style.face2}`}>Slide 2</div>
                  <div className={`${style.slide} ${style[theme]} ${style.face3}`}>Slide 3</div>
                  <div className={`${style.slide} ${style[theme]} ${style.face4}`}>Slide 4</div>
                </AdGallery>
              </Example>
            </Section>
          </Page>
        )}
      </contexts.Theme.Consumer>
    )
  }
}

export default Gallery
