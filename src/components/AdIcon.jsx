import React, { PropTypes } from 'react'

const AdIcon = ({ className = '', icon = '' }) => {
  return <i className={`${className} ti-${icon}`} />
}

AdIcon.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string.required,
}

AdIcon.defaultProps = {
  className: '',
}

export default AdIcon
