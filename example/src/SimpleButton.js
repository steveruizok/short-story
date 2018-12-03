import React from 'react'
import PropTypes from 'prop-types'

const SimpleButton = ({ text, secondary }) => {
  return <button className={secondary ? 'secondary' : null}>{text}</button>
}

SimpleButton.propTypes = {
  text: PropTypes.string,
  secondary: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
}

SimpleButton.defaultProps = {
  text: 'Get Started!',
  secondary: false,
}

export default SimpleButton
