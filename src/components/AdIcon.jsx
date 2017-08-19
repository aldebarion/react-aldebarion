import React from 'react'
import PropTypes from 'prop-types'

const AdIcon = ({ className = '', icon = '' }) => {
  return <i className={`${className} ti-${icon}`} />
}

AdIcon.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string.isRequired,
}

AdIcon.defaultProps = {
  className: '',
}

export default AdIcon
