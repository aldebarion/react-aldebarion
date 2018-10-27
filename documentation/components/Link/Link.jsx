import React from 'react'
import PropTypes from 'prop-types'

const Link = ({ className, href, children }) => {
  const onClick = (event) => {
    window.open(href, '_blank')
    event.stopPropagation()
    event.preventDefault()
  }

  return (
    <a className={className} onClick={onClick} href={href}>{children}</a>
  )
}

Link.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

Link.defaultProps = {
  className: '',
}

export default Link
