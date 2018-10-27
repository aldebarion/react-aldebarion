import React, { Component } from 'react'

import {
  AdSlider,
  AdButton,
  contexts,
  AdSpan,
} from 'react-aldebarion'

import Login from './components/Login'

import Link from '../../../Link'

import style from './Examples.style'


export default class Examples extends Component {
  constructor(props) {
    super(props)

    this.next = this.next.bind(this)
    this.previous = this.previous.bind(this)

    this.state = {
      currentExample: 0,
    }
  }

  next() {
    const {
      currentExample,
    } = this.state
    this.setState({
      currentExample: currentExample + 1,
    })
  }

  previous() {
    const {
      currentExample,
    } = this.state
    this.setState({
      currentExample: currentExample - 1,
    })
  }

  render() {
    const {
      currentExample,
    } = this.state
    return (
      <contexts.Theme.Consumer>
        {({ theme }) => (
          <div className={`${style.Examples} ${style[theme]}`}>
            <div className={style.main}>
              {
                currentExample < 1 && (
                  <div className={style.right}>
                    <AdButton icon="angle-right" type="icon" onClick={this.next} />
                  </div>
                )
              }
              {
                currentExample >= 1 && (
                  <div className={style.left}>
                    <AdButton icon="angle-left" type="icon" onClick={this.previous} />
                  </div>
                )
              }
              <AdSlider className={style.slider} index={currentExample}>
                <div className={style.slide}>
                  <Login className={style.content} />
                </div>
                <div className={`${style.slide} ${style.center}`}>
                  <AdSpan discreet>
                    <div style={style.noMore}>
                      <strong>No more example yet! More are coming...</strong>
                    </div>
                    <p>
                      You want to see more example? Please ask them on the <Link href="https://github.com/aldebarion/react-aldebarion">github</Link>.
                    </p>
                  </AdSpan>
                </div>
              </AdSlider>
            </div>
          </div>
        )}
      </contexts.Theme.Consumer>
    )
  }
}
