/* eslint no-unused-vars: "warn" */
/* eslint react/prop-types: "warn" */
/* eslint no-tabs: "off" */

import React from 'react'
import PropTypes from 'prop-types'
import BaseInput from './components/BaseInput'
import styled, { css } from 'react-emotion'

import theme, { ContainerStyle } from './components/theme'
import Knob from './components/Knob'
import './index.css'

class ShortStory extends React.Component {
  static propTypes = {
    knobs: PropTypes.object,
    name: PropTypes.string,
    children: PropTypes.func.isRequired,
  }

  static defaultProps = {
    name: 'My Element',
    knobs: {},
  }

  state = {
    knobValues: {},
    width: 0,
  }

  measure = React.createRef()

  // Load initial values on component mount
  componentDidMount() {
    const { knobs } = this.props

    this.updateWidth()
    window.addEventListener('resize', throttle(this.updateWidth, 100))

    const initialValues = {}

    Object.keys(knobs).forEach(k => {
      const knob = knobs[k]
      initialValues[k] = knob.default
    })

    this.setState({
      knobValues: initialValues,
    })
  }

  // Create the knob's input
  // Create the correct input for the knob type
  createKnobInput = (key, knob, currentValue) => {
    let i = 0

    const handleChange = throttle(ev => {
      const { value } = ev.target
      const { knobValues } = this.state
      this.setState({
        knobValues: { ...knobValues, [key]: value },
      })
    }, 250)

    switch (knob.type) {
      // BOOLEAN
      case 'boolean':
        return (
          <BaseInput
            key={key}
            type="checkbox"
            onClick={() => {
              this.setState({
                knobValues: {
                  ...this.state.knobValues,
                  [key]: !currentValue,
                },
              })
            }}
            defaultChecked={currentValue}
            style={{}}
          />
        )
      // TEXT
      case 'text':
        return (
          <BaseInput
            key={key}
            type="text"
            onChange={handleChange}
            defaultValue={currentValue}
          />
        )
      // TEXTAREA
      case 'textarea':
        return (
          <textarea
            key={key}
            onChange={handleChange}
            value={currentValue}
            defaultValue={currentValue}
            className={ContainerStyle}
          />
        )
      // NUMBER
      case 'number':
        return [
          <div
            key={key + '_slider_currentValue'}
            style={{
              width: 'calc(100% - 16px)',
              textAlign: 'center',
            }}
          >
            <small key={key + '_slider_max'}>{currentValue}</small>
          </div>,
          <BaseInput
            key={key}
            type="range"
            min={knob.min}
            max={knob.max}
            onChange={handleChange}
            defaultValue={currentValue}
            style={{
              width: 'calc(100% - 16px)',
            }}
          />,
          <div
            key={key + '_slider_values'}
            style={{
              display: 'flex',
              width: 'calc(100% - 16px)',
              justifyContent: 'space-between',
              fontFamily: 'sans-serif',
              fontSize: '.9em',
            }}
          >
            <span key={key + '_slider_min'}>{knob.min}</span>
            <span key={key + '_slider_max'}>{knob.max}</span>
          </div>,
        ]
      // ENUMERATED VALUE
      case 'enum':
        return (
          <div
            className={ContainerStyle}
            style={{
              position: 'relative',
              padding: '0',
              height: '3em',
            }}
          >
            <div
              className={css`
                padding: 1em 1.25em;
              `}
            >
              {knob.labels[knob.options.indexOf(currentValue)]}
            </div>
            <div
              className={css`
                position: absolute;
                top: calc(50% - 2px);
                right: 16px;
                width: 20px;
                height: 12px;
                clip-path: polygon(0px 0px, 8px 8px, 16px 0px);
                background-color: ${colors.text};
              `}
            />
            <select
              key={key}
              type="select"
              onChange={handleChange}
              defaultValue={currentValue}
              className={css`
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                width: 100%;
                opacity: 0;
              `}
            >
              {knob.options.map((o, index) => (
                <option key={key + '_option_' + index} value={o}>
                  {knob.labels[index]}
                </option>
              ))}
            </select>
          </div>
        )
      // SEGMENTED ENUMERATED VALUE
      case 'segment':
        i++
        return (
          <div
            key={key + i + '_segment'}
            style={{
              width: 'calc(100% - 16px)',
            }}
          >
            {knob.options.map((o, index) => [
              <BaseInput
                key={key + i + '_SegmentOption_' + index}
                type="radio"
                checked={currentValue === o}
                mr={2}
                id={key + i + '_SegmentOption_' + index}
                onChange={() => {
                  this.setState({ ...this.state.knobValues, [key]: o })
                }}
                style={{
                  marginRight: '8px',
                }}
              />,
              <label
                style={{
                  marginRight: '16px',
                }}
                key={key + i + '_SegmentOptionLabel_' + index}
                htmlFor={key + i + '_SegmentOption_' + index}
              >
                {knob.labels[index]}
              </label>,
            ])}
          </div>
        )
      // COLOR
      case 'color':
        return [
          <BaseInput
            key={key}
            type="color"
            name={knob.name}
            onChange={handleChange}
            defaultValue={currentValue}
            style={{
              padding: 0,
              margin: 0,
              borderWidth: 0,
              height: '32px',
              width: '56px',
              borderColor: 'none',
              backgroundColor: 'none',
            }}
          />,
        ]
      // DATE
      case 'date':
        return (
          <BaseInput
            key={key}
            type="date"
            min={knob.min}
            max={knob.max}
            onChange={handleChange}
            defaultValue={currentValue}
            style={{
              border: '1px solid #aaa',
              fontFamily: 'sans-serif',
              fontSize: '.9em',
              padding: '8px',
            }}
          />
        )
      // TIME
      case 'time':
        return [
          <BaseInput
            key={key}
            type="time"
            min={knob.min}
            max={knob.max}
            onChange={handleChange}
            defaultValue={currentValue}
            style={{
              border: '1px solid #aaa',
              fontFamily: 'sans-serif',
              fontSize: '.9em',
              padding: '8px',
            }}
          />,
        ]
      // TODO: IMAGE
      default:
        return <span>Nothing for that type.</span>
    }
  }

  componentDidUpdate() {
    this.updateWidth()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', throttle(this.updateWidth, 100))
  }

  updateWidth = () => {
    if (!this.measure.current) {
      return
    }

    const node = this.measure.current.childNodes[0]

    if (!node || node.offsetWidth === this.state.width) {
      return
    }

    this.setState({ width: node.offsetWidth })
  }

  render() {
    const { name, children, knobs } = this.props
    const { knobValues } = this.state

    return (
      <div>
        <CSSCapsule key={`stsy_${name}_header`}>
          <Heading>
            <a href={`/#${name}-story`}>
              Hello
              {name}
            </a>
          </Heading>
          <div id={`${name}-story`} className={AnchorStyle} />
        </CSSCapsule>
        <div key={`stsy_${name}_component`}>
          <ComponentContainer>
            <div ref={this.measure}>{children(this.state.knobValues)}</div>
            <CSSCapsule>
              <MeasureLabel>
                {this.state.width}
                px
              </MeasureLabel>
            </CSSCapsule>
          </ComponentContainer>
          <CSSCapsule>
            <KnobsPanel>
              {Object.keys(knobs).map(key => {
                const knob = knobs[key]
                const value = knobValues[key]
                return (
                  <Knob key={`stsy_knob_${key}`} knob={knob} value={value}>
                    {this.createKnobInput(key, knob, value)}
                  </Knob>
                )
              })}
            </KnobsPanel>
          </CSSCapsule>
        </div>
      </div>
    )
  }
}

const { colors, fonts } = theme

const AnchorStyle = css`
  position: relative;
  top: -200px;
  visible: false;
`

const CSSCapsule = styled('div')`
  all: initial;
`
const Heading = styled('h2')`
  font: ${fonts.heading};
  color: ${colors.text};
`

const ComponentContainer = styled('div')`
  display: grid;
  grid-gap: 1em;
  flex-direction: column;
  border: 1px solid ${colors.border};
  border-bottom: none;
  border-radius: 0.25em 0.25em 0 0;
  background-color: ${colors.background};
  width: auto;
  align-items: center;
  justify-content: center;
  padding: 1.25em;
`

const MeasureLabel = styled('div')`
  font: ${fonts.caption};
  color: ${colors.label};
  padding-top: 1em;
  border-top: 1px solid ${colors.border};
  text-align: center;
`

const KnobsPanel = styled('div')`
  display: grid;
  font: ${fonts.label};
  border: 1px solid ${colors.border};
  border-top: none;
  border-radius: 0 0 0.25em 0.25em;
  overflow: hidden;
  margin-bottom: 2em;
`

export const throttle = (func, limit) => {
  let inThrottle
  return function() {
    const args = arguments
    const context = this
    if (!inThrottle) {
      func.apply(context, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

export default ShortStory
