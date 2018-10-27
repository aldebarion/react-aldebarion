import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import ThemeContext from 'contexts/Theme'

import AdIcon from '../AdIcon'
import AdLoader from '../AdLoader'

import style from './AdButton.style'

class AdButton extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showLoadingIcon: true,
    }
  }

  componentDidUpdate(prevProps) {
    const {
      loading,
    } = this.props
    if (prevProps.loading !== loading) {
      if (loading) {
        setTimeout(() => {
          this.showLoadingIcon(true)
        }, 200)
      } else {
        this.showLoadingIcon(false)
      }
    }
  }

  showLoadingIcon(value) {
    this.setState({
      showLoadingIcon: value,
    })
  }

  renderContent() {
    const {
      label,
      icon,
      iconPosition,
      loading,
    } = this.props

    const {
      showLoadingIcon,
    } = this.state

    return (
      <Fragment>
        { iconPosition === 'left' ? (
          <div className={`${style.loading} ${loading ? '' : style.hidden}`}>
            {showLoadingIcon ? <AdLoader className={style.loader} fast /> : null}
          </div>
        ) : null}
        <div className={style.content}>
          { icon && iconPosition === 'left' ? <AdIcon icon={icon} className={`${style.icon} ${label ? style.rightMargin : ''}`} /> : null }
          <span className={style.label}>{label}</span>
          { icon && iconPosition === 'right' ? <AdIcon icon={icon} className={`${style.icon} ${label ? style.leftMargin : ''}`} /> : null }
        </div>
        { iconPosition === 'right' ? (
          <div className={`${style.loading} ${loading ? '' : style.hidden}`}>
            {showLoadingIcon ? <AdLoader className={style.loader} fast /> : null}
          </div>
        ) : null}
      </Fragment>
    )
  }

  render() {
    const {
      href,
      className,
      disabled,
      type,
      loading,
      onClick,
      target,
    } = this.props

    return (
      <ThemeContext.Consumer>
        {({ theme }) => (
          <Fragment>
            {
              href
                ? (
                  <a
                    href={href}
                    className={`${style.AdButton} ${style[theme]} ${loading ? style.loading : ''} ${style[type]} ${className} ${disabled ? style.disabled : ''}`}
                    onClick={onClick}
                    target={target}
                  >
                    {this.renderContent()}
                  </a>
                ) : (
                  <button
                    type="button"
                    className={`${style.AdButton} ${style[theme]} ${loading ? style.loading : ''} ${style[type]} ${className}`}
                    disabled={disabled}
                    onClick={onClick}
                  >
                    {this.renderContent()}
                  </button>
                )
            }
          </Fragment>
        )}
      </ThemeContext.Consumer>
    )
  }
}

AdButton.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  icon: PropTypes.string,
  iconPosition: PropTypes.oneOf([
    'left',
    'right',
  ]),
  disabled: PropTypes.bool,
  type: PropTypes.oneOf([
    'classic',
    'icon',
    'hexa',
  ]),
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  href: PropTypes.string,
  target: PropTypes.string,
}

AdButton.defaultProps = {
  className: '',
  label: '',
  icon: '',
  iconPosition: 'left',
  disabled: false,
  type: 'classic',
  loading: false,
  onClick: null,
  href: null,
  target: null,
}

export default AdButton
