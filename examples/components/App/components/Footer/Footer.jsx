import React from 'react'
import PropTypes from 'prop-types'
import { AdIcon, AdButton, contexts } from 'react-aldebarion'

import style from './Footer.style'

const Footer = ({ className }) => (
  <contexts.Theme.Consumer>
    {({ theme }) => (
      <footer className={`${style.Footer} ${className}`}>
        <div className={`${style.links} ${style[theme]}`}>
          <AdButton icon="github" type="icon" href="https://github.com/aldebarion/react-aldebarion" target="_blank" />
          <AdButton icon="email" type="icon" />
        </div>
        Made with <AdIcon icon="heart" /> in Grenoble
      </footer>
    )}
  </contexts.Theme.Consumer>
)

Footer.propTypes = {
  className: PropTypes.string,
}

Footer.defaultProps = {
  className: '',
}

export default Footer
