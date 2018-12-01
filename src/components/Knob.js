/* eslint no-unused-vars: "warn" */
/* eslint react/prop-types: "warn" */
/* eslint no-tabs: "off" */

import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import theme, { ContainerStyle } from './theme'

const { colors, fonts } = theme

const KnobContainer = styled('div')`
  grid-row: span 1;
  font: ${fonts.label};
`

const KnobLabel = styled('span')`
  letter-spacing: 0.1em;
  font: ${fonts.code};
  color: ${({ solo }) => (solo ? colors.text : colors.fill)};
  text-align: right;
`
const KnobTitle = styled('span')`
  letter-spacing: 0.18em;
  font: ${fonts.label};
  color: ${colors.text};
  text-align: right;
  text-transform: uppercase;
`

const KnobLabelRow = styled('div')`
  display: flex;
  justify-content: space-between;
  padding-bottom: 0.4em;
`

const KnobVariableName = styled('span')`
  letter-spacing: 0.1em;
  font: ${fonts.code};
  color: ${colors.fill};
`

const KnobInput = styled.div`
  width: 100%;

  & input[type='text'] {
    ${ContainerStyle};
  }

  & input[type='date'] {
    ${ContainerStyle};
  }

  & input[type='time'] {
    ${ContainerStyle};
  }

  & textarea {
    ${ContainerStyle};
  }

  & select {
    ${ContainerStyle};
  }

  & input[type='radio'] {
    position: relative;
    visibility: hidden;
  }

  & input[type='checkbox'] {
    position: relative;
    visibility: hidden;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      visibility: visible;
      ${ContainerStyle};
      height: 24px;
      padding: 0;
      margin: 0;
      width: 40px;
      display: block;
      border-radius: 12px;
      border-color: ${({ value }) => (value ? colors.select : colors.border)};
      background-color: ${({ value }) =>
        value ? colors.select : colors.field};
      transition: all 0.15s;
    }

    &:after {
      position: absolute;
      content: '';
      top: -1px;
      visibility: visible;
      ${ContainerStyle};
      height: 24px;
      width: 24px;
      padding: 0;
      margin: 0;
      margin-left: ${({ value }) => (value ? '16px' : '0px')};
      display: block;
      border-radius: 100%;
      transform: scale(0.8);
      border-color: #fff;
      background-color: ${({ value }) => (value ? colors.field : '#FFF')};
      transition: all 0.15s;
      box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
    }
  }

  & input[type='radio'] {
    width: fit-content;
  }

  & input[type='range'] {
    -webkit-appearance: none;
    width: 100%;
    margin: 8px 0;
  }
  & input[type='range']:focus {
    outline: none;
  }
  & input[type='range']::-webkit-slider-runnable-track {
    width: 100%;
    height: 8px;
    cursor: pointer;
    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0), 0px 0px 0px rgba(13, 13, 13, 0);
    background: #f5f7ff;
    border-radius: 0px;
    border: 1px solid #e5e9f2;
  }
  & input[type='range']::-webkit-slider-thumb {
    box-shadow: 1.3px 1.3px 2px rgba(0, 0, 0, 0.25),
      0px 0px 1.3px rgba(13, 13, 13, 0.25);
    border: 0px solid rgba(0, 0, 0, 0);
    height: 24px;
    width: 24px;
    border-radius: 50px;
    background: #ffffff;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -9px;
  }
  & input[type='range']:focus::-webkit-slider-runnable-track {
    background: #f5f7ff;
  }
  & input[type='range']::-moz-range-track {
    width: 100%;
    height: 8px;
    cursor: pointer;
    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0), 0px 0px 0px rgba(13, 13, 13, 0);
    background: #f5f7ff;
    border-radius: 0px;
    border: 1px solid #e5e9f2;
  }
  & input[type='range']::-moz-range-thumb {
    box-shadow: 1.3px 1.3px 2px rgba(0, 0, 0, 0.25),
      0px 0px 1.3px rgba(13, 13, 13, 0.25);
    border: 0px solid rgba(0, 0, 0, 0);
    height: 24px;
    width: 24px;
    border-radius: 50px;
    background: #ffffff;
    cursor: pointer;
  }
  & input[type='range']::-ms-track {
    width: 100%;
    height: 8px;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }
  & input[type='range']::-ms-fill-lower {
    background: #f5f7ff;
    border: 1px solid #e5e9f2;
    border-radius: 0px;
    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0), 0px 0px 0px rgba(13, 13, 13, 0);
  }
  & input[type='range']::-ms-fill-upper {
    background: #f5f7ff;
    border: 1px solid #e5e9f2;
    border-radius: 0px;
    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0), 0px 0px 0px rgba(13, 13, 13, 0);
  }
  & input[type='range']::-ms-thumb {
    box-shadow: 1.3px 1.3px 2px rgba(0, 0, 0, 0.25),
      0px 0px 1.3px rgba(13, 13, 13, 0.25);
    border: 0px solid rgba(0, 0, 0, 0);
    height: 24px;
    width: 24px;
    border-radius: 50px;
    background: #ffffff;
    cursor: pointer;
    height: 8px;
  }
  & input[type='range']:focus::-ms-fill-lower {
    background: #f5f7ff;
  }
  & input[type='range']:focus::-ms-fill-upper {
    background: #f5f7ff;
  }
`

KnobInput.propTypes = {
  value: PropTypes.any,
}

const Knob = ({ knob, keyName, label, children, value }) => {
  const templates = {
    boolean: (k, v) => `boolean (${v})`,
    text: (k, v) => `string (${v ? v.length : 0})`,
    textarea: (k, v) => `string (${v ? v.length : 0})`,
    number: (k, v) => `number (${v})`,
    enum: (k, v) => `${typeof v} (${v})`,
    segment: (k, v) => `${typeof v} (${v})`,
    date: (k, v) => `date (${v})`,
    time: (k, v) => `time (${v})`,
    color: (k, v) => `color (${v})`,
  }

  return (
    <KnobContainer>
      <div style={{ width: '320px', margin: '0 auto 1em auto' }}>
        <KnobLabelRow>
          {knob.label ? (
            <div>
              <KnobTitle>{knob.label} </KnobTitle>
              <KnobLabel>({keyName})</KnobLabel>
            </div>
          ) : (
            <KnobLabel solo>{keyName}</KnobLabel>
          )}
          <KnobVariableName>
            {templates[knob.type](knob, value)}
          </KnobVariableName>
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
