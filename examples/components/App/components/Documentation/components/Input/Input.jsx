import React from 'react'
// import PropTypes from 'prop-types'

import { AdInput } from 'react-aldebarion'

import style from './Input.style'

export default () => (
  <div className={style.Input}>
    <AdInput className={style.item} placeholder="Simple input" />
    <AdInput className={style.item} placeholder="Input with icon" icon="lock" />
  </div>
)
