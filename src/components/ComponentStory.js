import React from 'react'
import PropTypes from 'prop-types'
import parsePropTypes from 'parse-prop-types'

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

class ComponentStory extends React.Component {
  render() {
    const { component } = this.props

    const text = JSON.stringify(parsePropTypes(component))
    const child = React.createElement(component)

    return (
      <div>
        {text}
        {child}
      </div>
    )
  }
}

export default ComponentStory
