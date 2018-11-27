/* eslint no-unused-vars: "warn" */
/* eslint react/prop-types: "warn" */
/* eslint no-tabs: "off" */

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'

import theme, { ContainerStyle } from './theme'

const { colors, fonts } = theme

const KnobContainer = styled('div')`
  border-top: 1px solid ${colors.border};
  grid-row: span 1;
  padding: 1.75em 0 1.75em 0;
`

const KnobLabelRow = styled('div')`
  width: 320px;
  margin: 0 auto 0.7em auto;
  display: flex;
  align-content: center;
  justify-content: space-between;
`

const KnobLabel = styled('span')`
  letter-spacing: 0.18em;
  font: ${fonts.label};
  color: ${colors.text};
  text-align: right;
  text-transform: uppercase;
`

const KnobVariableName = styled('span')`
  font: ${fonts.code};
  color: ${colors.text};
`

const KnobInput = styled('div')`
  width: 100%;

  & input[type='checkbox'] {
    visibility: hidden;

    &:after {
      content: '';
      visibility: visible;
      ${ContainerStyle};
      height: 24px;
      padding: 0;
      margin: 0;
      width: 24px;
      display: block;
      border-radius: 100%;
      background-color: ${({ value }) => (value ? colors.select : colors.fill)};
    }
  }

  & input[type='radio'] {
    width: fit-content;
  }
`

KnobInput.propTypes = {
  value: PropTypes.any,
}

const Knob = ({ knob, children, value }) => {
  return (
    <KnobContainer>
      <div style={{ width: '320px', margin: '0 auto 1em auto' }}>
        <KnobLabelRow>
          <KnobLabel>{knob.label}</KnobLabel>
          <KnobVariableName>{knob.variableName}</KnobVariableName>
        </KnobLabelRow>
        <KnobInput value={value}>{children}</KnobInput>
      </div>
    </KnobContainer>
  )
}

Knob.propTypes = {
  knob: PropTypes.object,
  children: PropTypes.node,
  value: PropTypes.any,
}

export default Knob
