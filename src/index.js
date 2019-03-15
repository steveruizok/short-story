/* eslint no-unused-vars: "warn" */
/* eslint react/prop-types: "warn" */
/* eslint no-tabs: "off" */
/** @jsx jsx */

// Short Story
// @steveruizok

// TODO:
// Write docs in Readme
// Make code preview optional (default to true?)
// Clean up components (punch out knobs into own components)
// Remove styling dependencies
// Combine textarea and text types to "string" and add textarea option
// Convert to TypeScript to give better editor hints

import React from "react"
import { jsx, css } from "@emotion/core"
import PropTypes from "prop-types"
import styled from "@emotion/styled"

import theme, { AnchorStyle, ContainerStyle } from "./components/theme"
import Knob from "./components/Knob"

import reactElementToJSXString from "react-element-to-jsx-string"

import Highlight, { defaultProps } from "prism-react-renderer"
import duotoneLight from "prism-react-renderer/themes/duotoneLight"

import ComponentStory from "./components/ComponentStory"

class ShortStory extends React.Component {
  static propTypes = {
    showCode: PropTypes.bool,
    knobs: PropTypes.object,
    name: PropTypes.string,
    children: PropTypes.func.isRequired,
  }

  static defaultProps = {
    name: undefined,
    showCode: false,
    knobs: {},
    children: () => <div>Needs a child function!</div>,
  }

  state = {
    loaded: false,
    knobValues: {},
    width: 0,
  }

  measure = React.createRef()

  // Load initial values on component mount
  componentDidMount() {
    const { knobs } = this.props

    this.updateWidth()
    window.addEventListener("resize", throttle(this.updateWidth, 100))

    const initialValues = {}

    Object.keys(knobs).forEach(k => {
      const knob = knobs[k]
      initialValues[k] = knob.default
    })

    this.setState({
      loaded: true,
      knobValues: initialValues,
    })
  }

  // Create the knob's input
  // Create the correct input for the knob type
  createKnobInput = (key, knob, currentValue) => {
    let i = 0

    const handleChange = throttle(ev => {
      ev.preventDefault()
      const { value } = ev.target
      const { knobValues } = this.state
      this.setState({
        knobValues: { ...knobValues, [key]: value },
      })
    }, 250)

    switch (knob.type) {
      // BOOLEAN
      case "boolean":
        return (
          <input
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
      case "text":
        return (
          <input
            key={key}
            type="text"
            onChange={handleChange}
            defaultValue={currentValue}
            className={css`
              width: 100%;
              height: 40px;
            `}
          />
        )
      // TEXTAREA
      case "textarea":
        return (
          <textarea
            key={key}
            onChange={handleChange}
            defaultValue={currentValue}
          />
        )
      // NUMBER
      case "number":
        return [
          <div
            key={key + "_slider_values"}
            style={{
              display: "flex",
              marginTop: "1em",
              alignItems: "center",
              justifyContent: "space-between",
              fontFamily: "sans-serif",
              fontSize: ".9em",
            }}
          >
            <span
              style={{
                marginRight: "16px",
                letterSpacing: ".1em",
                font: theme.fonts.code,
              }}
              key={key + "_slider_min"}
            >
              {knob.min}
            </span>
            <input
              key={key}
              type="range"
              min={knob.min}
              max={knob.max}
              step={knob.step || 1}
              onChange={handleChange}
              defaultValue={currentValue}
              style={{
                width: "100%",
                margin: 0,
                padding: 0,
              }}
            />
            <span
              style={{
                marginLeft: "16px",
                letterSpacing: ".1em",
                font: theme.fonts.code,
              }}
              key={key + "_slider_max"}
            >
              {knob.max}
            </span>
          </div>,
        ]
      // ENUMERATED VALUE
      case "enum":
        return (
          <div
            css={css`
              ${ContainerStyle}
              position: relative;
              display: flex;
              align-items: center;
              justify-content: space-between;
              height: "3em";
            `}
          >
            {knob.labels[knob.options.indexOf(currentValue)]}
            <div
              css={css`
                width: 10px;
                height: 5px;
                clip-path: polygon(0px 0px, 5px 5px, 10px 0px);
                background-color: ${colors.text};
                opacity: 0.7;
              `}
            />
            <select
              key={key}
              type="select"
              onChange={handleChange}
              defaultValue={currentValue}
              css={css`
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                width: 100%;
                opacity: 0;
              `}
            >
              {knob.options.map((o, index) => (
                <option key={key + "_option_" + index} value={o}>
                  {knob.labels[index]}
                </option>
              ))}
            </select>
          </div>
        )
      // SEGMENTED ENUMERATED VALUE
      case "segment":
        i++
        return (
          <div
            key={key + i + "_segment"}
            css={css`
              display: flex;
              justify-content: space-between;
            `}
          >
            {knob.options.map((o, index) => {
              return (
                <div
                  key={key + i + "_" + index + "_segment_option"}
                  onClick={() =>
                    this.setState({
                      knobValues: {
                        ...this.state.knobValues,
                        [key]: o,
                      },
                    })
                  }
                  css={css`
                    ${ContainerStyle}
                    display: inline-block;
                    border-radius: ${index === 0
                      ? "22px 0 0 22px"
                      : index === knob.options.length - 1
                      ? "0 22px 22px 0"
                      : "0"};
                    background-color: ${currentValue === o
                      ? colors.select
                      : colors.field};
                    color: ${currentValue === o ? colors.field : colors.text};
                    ${index === 0
                      ? "padding-left: 24px"
                      : index === knob.options.length - 1
                      ? "padding-right: 24px"
                      : ""};
                  `}
                >
                  <input
                    key={key + i + "_SegmentOption_" + index}
                    type="radio"
                    value={o}
                    name={key}
                    checked={currentValue === o}
                    id={key + i + "_SegmentOption_" + index}
                    onChange={() => {}}
                  />
                  <label
                    css={css`
                      width: 100%;
                      height: 100%;
                      text-align: center;
                    `}
                    key={key + i + "_SegmentOptionLabel_" + index}
                    htmlFor={key + i + "_SegmentOption_" + index}
                  >
                    {knob.labels[index]}
                  </label>
                </div>
              )
            })}
          </div>
        )
      // COLOR
      case "color":
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
              height: "32px",
              width: "56px",
              borderColor: "none",
              backgroundColor: "none",
            }}
          />,
        ]
      // DATE
      case "date":
        return (
          <BaseInput
            key={key}
            type="date"
            min={knob.min}
            max={knob.max}
            onChange={handleChange}
            defaultValue={currentValue}
            style={{
              border: "1px solid #aaa",
              fontFamily: "sans-serif",
              fontSize: ".9em",
              padding: "8px",
            }}
          />
        )
      // TIME
      case "time":
        return [
          <BaseInput
            key={key}
            type="time"
            min={knob.min}
            max={knob.max}
            onChange={handleChange}
            defaultValue={currentValue}
            style={{
              border: "1px solid #aaa",
              fontFamily: "sans-serif",
              fontSize: ".9em",
              padding: "8px",
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
    window.removeEventListener("resize", throttle(this.updateWidth, 100))
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
    const { name, children, knobs, showCode } = this.props
    const { knobValues, loaded } = this.state
    const child = children(this.state.knobValues)
    const codeString = reactElementToJSXString(child)

    return (
      <div>
        <CSSCapsule key={`stsy_${name}_header`}>
          <Heading>
            <a href={`/#${name}-story`}>{name}</a>
          </Heading>
          <div id={`${name}-story`} className={AnchorStyle} />
        </CSSCapsule>
        <div key={`stsy_${name}_component`}>
          <ComponentContainer>
            <div ref={this.measure}>{child}</div>
            <CSSCapsule>
              <MeasureLabel>
                {this.state.width}
                px
              </MeasureLabel>
            </CSSCapsule>
          </ComponentContainer>
          <CSSCapsule>
            <KnobsPanel>
              {showCode && (
                <CodePanel>
                  <Highlight
                    {...defaultProps}
                    code={codeString}
                    theme={duotoneLight}
                    language="jsx"
                  >
                    {({
                      className,
                      style,
                      tokens,
                      getLineProps,
                      getTokenProps,
                    }) => (
                      <pre className={className} style={style}>
                        {tokens.map((line, i) => (
                          <div {...getLineProps({ line, key: i })}>
                            {line.map((token, key) => (
                              <span {...getTokenProps({ token, key })} />
                            ))}
                          </div>
                        ))}
                      </pre>
                    )}
                  </Highlight>
                </CodePanel>
              )}
              {Object.keys(knobs).map(key => {
                const knob = knobs[key]
                const currentValue = knobValues[key]
                return (
                  loaded && (
                    <Knob
                      key={`stsy_knob_${key}`}
                      keyName={key}
                      knob={knob}
                      value={currentValue}
                    >
                      {this.createKnobInput(key, knob, currentValue)}
                    </Knob>
                  )
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

const CSSCapsule = styled.div`
  all: initial;
`
const Heading = styled.h2`
  font: ${fonts.heading};
  color: ${colors.text};
`

const ComponentContainer = styled.div`
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

const MeasureLabel = styled.div`
  font: ${fonts.caption};
  color: ${colors.label};
  padding-top: 1em;
  border-top: 1px solid ${colors.border};
  text-align: center;
`

const KnobsPanel = styled.div`
  display: grid;
  grid-gap: 1em;
  border: 1px solid ${colors.border};
  border-top: none;
  border-radius: 0 0 0.25em 0.25em;
  overflow: hidden;
  border-top: 1px solid ${colors.border};
  padding-bottom: 2em;
  margin-bottom: 2em;
`

const CodePanel = styled.div`
  border-bottom: 1px solid ${colors.border};
  font: ${fonts.code};
  font-weight: 400;
  font-size: 14px;
  padding: 0 2em;
  overflow: scroll;
  background-color: #faf8f5;
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

const BaseInput = styled.input``

export default ShortStory
export { ComponentStory }
