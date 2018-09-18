import React from "react";
import PropTypes from "prop-types";
import { throttle } from "./utils";
import styled, { css } from "react-emotion";

const fonts = {
  heading: "300 2em/2.2em Avenir",
  label: "500 .9em/.9em Avenir",
  code: "500 1em/1.2em Menlo",
  body: "500 .9em/1.15em Avenir",
  caption: "400 .8em/.8em Avenir"
};

const colors = {
  border: "#e5e9f2",
  text: "#514f4f",
  outline: "#d3dce6",
  fill: "#928f8f",
  field: "#f5f7ff",
  fieldBorder: "#e5e9f2",
  background: "none"
};

// styled components

const Heading = styled("h2")`
  font: ${fonts.heading};
  color: ${colors.text};
`;

const CSSCapsule = styled("div")`
  all: initial;
`;

const ComponentContainer = styled("div")`
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
`;

const MeasureLabel = styled("div")`
  font: ${fonts.caption};
  color: ${colors.label};
  padding-top: 1em;
  border-top: 1px solid ${colors.border};
  text-align: center;
`;

const KnobsPanel = styled("div")`
  display: grid;
  font: ${fonts.label};
  border: 1px solid ${colors.border};
  border-top: none;
  border-radius: 0 0 0.25em 0.25em;
  overflow: hidden;
  margin-bottom: 2em;
`;

const KnobContainer = styled("div")`
  border-top: 1px solid ${colors.border};
  grid-row: span 1;
  padding: 1.75em 0 1.75em 0;
`;

const KnobLabelRow = styled("div")`
  width: 320px;
  margin: 0 auto 1em auto;
  display: flex;
  align-content: center;
  justify-content: space-between;
`;

const KnobLabel = styled("span")`
  letter-spacing: 0.18em;
  font: ${fonts.label};
  color: ${colors.text};
  text-transform: uppercase;
`;

const KnobVariableName = styled("span")`
  font: ${fonts.code};
  color: ${colors.text};
`;

const KnobInput = styled("div")`
  width: 100%;
`;

const ContainerStyle = css`
	width: 100%;
	letter-spacing: .08em;
	box-sizing: border-box;
  padding: 1em 1.25em;
  font: ${fonts.body};x;
  color: ${colors.body};
  background-color: ${colors.field};
  border: 1px solid ${colors.fieldBorder};
  border-radius: 0.25em;
`;

const Input = props => (
  <input key="Stsy-input" className={ContainerStyle} {...props} />
);

// prior art

const theme = {
  white: "#fff",
  background: "#f6f6f6",
  gray: "#eee",
  black: "#000",
  labelColor: "#555",
  inputColor: "#777",
  outerBorder: "1px solid #ccc",
  border: "1px solid #eee",
  rowPadding: "16px"
};

class ShortStory extends React.Component {
  static propTypes = {
    knobs: PropTypes.object,
    name: PropTypes.string,
    children: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.measure = React.createRef();

    this.state = {
      width: 0,
      activeTab: 0
    };

    Object.keys(this.props.knobs).map(key => {
      const knob = this.props.knobs[key];
      knob.name = key;
      this.state = { ...this.state, [key]: knob.default };
    });
  }

  // Create knobs
  createKnob = knob => {
    if (knob.hidden !== undefined) {
      if (knob.hidden(this.state)) {
        return;
      }
    }

    const input = this.createKnobInput(knob);

    return (
      <KnobContainer>
        <div style={{ width: "320px", margin: "0 auto 1em auto" }}>
          <KnobLabelRow key={"Label_Box_" + knob.name}>
            <KnobLabel>{knob.label}</KnobLabel>
            <KnobVariableName>{knob.variableName}</KnobVariableName>
          </KnobLabelRow>
          <KnobInput>{input}</KnobInput>
        </div>
      </KnobContainer>
    );
  };

  // Create the correct input for the knob type
  createKnobInput = knob => {
    let i = 0;

    // let ref = React.createRef();
    const key = knob.name;

    const handleChange = throttle(ev => {
      this.setState({ [knob.name]: ev.target.value });
    }, 250);

    const currentValue = this.state[knob.name];

    switch (knob.type) {
      // TEXT
      case "text":
        return (
          <Input
            key={key}
            onChange={handleChange}
            defaultValue={currentValue}
          />
        );
      // TEXTAREA
      case "textarea":
        return (
          <textarea
            key={key}
            onChange={handleChange}
            defaultValue={currentValue}
            className={ContainerStyle}
          />
        );
      // DATE
      case "date":
        return (
          <Input
            key={key}
            type="date"
            min={knob.min}
            max={knob.max}
            onChange={handleChange}
            value={currentValue}
            style={{
              border: "1px solid #aaa",
              fontFamily: "sans-serif",
              fontSize: ".9em",
              padding: "8px"
            }}
          />
        );
      // NUMBER
      case "number":
        return [
          <div
            key={key + "_slider_currentValue"}
            style={{
              width: "calc(100% - 16px)",
              textAlign: "center"
            }}
          >
            <small key={key + "_slider_max"}>{currentValue}</small>
          </div>,
          <Input
            key={key}
            type="range"
            min={knob.min}
            max={knob.max}
            onChange={handleChange}
            defaultValue={currentValue}
            style={{
              width: "calc(100% - 16px)"
            }}
          />,
          <div
            key={key + "_slider_values"}
            style={{
              display: "flex",
              width: "calc(100% - 16px)",
              justifyContent: "space-between",
              fontFamily: "sans-serif",
              fontSize: ".9em"
            }}
          >
            <span key={key + "_slider_min"}>{knob.min}</span>
            <span key={key + "_slider_max"}>{knob.max}</span>
          </div>
        ];
      // ENUMERATED VALUE
      case "enum":
        return (
          <div
            className={ContainerStyle}
            style={{
              position: "relative",
              padding: "0",
              height: "3em"
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
                <option key={key + "_option_" + index} value={o}>
                  {knob.labels[index]}
                </option>
              ))}
            </select>
          </div>
        );
      // SEGMENTED ENUMERATED VALUE
      case "segment":
        i++;
        return (
          <div
            key={key + i + "_segment"}
            style={{
              width: "calc(100% - 16px)"
            }}
          >
            {knob.options.map((o, index) => [
              <Input
                key={key + i + "_SegmentOption_" + index}
                type="radio"
                checked={currentValue === o}
                mr={2}
                id={key + i + "_SegmentOption_" + index}
                onChange={ev => {
                  this.setState({ [knob.name]: o });
                }}
                style={{
                  marginRight: "8px"
                }}
              />,
              <label
                style={{
                  marginRight: "16px"
                }}
                key={key + i + "_SegmentOptionLabel_" + index}
                htmlFor={key + i + "_SegmentOption_" + index}
              >
                {knob.labels[index]}
              </label>
            ])}
          </div>
        );
      // BOOLEAN
      case "boolean":
        return (
          <Input
            key={key}
            type="checkbox"
            onClick={ev => {
              this.setState({ [knob.name]: !currentValue });
            }}
            defaultChecked={currentValue}
            style={{}}
          />
        );
      // COLOR
      case "color":
        return [
          <Input
            key={key}
            type="color"
            name={knob.name}
            onChange={handleChange}
            value={currentValue}
            style={{
              padding: 0,
              margin: 0,
              borderWidth: 0,
              height: "32px",
              width: "56px",
              borderColor: "none",
              backgroundColor: "none"
            }}
          />
        ];
      // TIME
      case "time":
        return [
          <Input
            key={key}
            type="time"
            min={knob.min}
            max={knob.max}
            onChange={handleChange}
            value={currentValue}
            style={{
              border: "1px solid #aaa",
              fontFamily: "sans-serif",
              fontSize: ".9em",
              padding: "8px"
            }}
          />
        ];
      // TODO: IMAGE
      default:
        return <span>Nothing for that type.</span>;
    }
  };

  componentDidMount() {
    this.updateWidth();
    window.addEventListener("resize", throttle(this.updateWidth, 100));
  }

  componentDidUpdate() {
    this.updateWidth();
  }

  updateWidth = ev => {
    if (!this.measure.current) {
      return;
    }

    const node = this.measure.current.childNodes[0];

    if (!node || node.offsetWidth === this.state.width) {
      return;
    }

    this.setState({ width: node.offsetWidth });
  };

  render() {
    let name = this.props.name;

    return [
      <CSSCapsule key={`stsy_${name}_header`}>
        <Heading>{name}</Heading>
      </CSSCapsule>,
      <div key={`stsy_${name}_component`}>
        <ComponentContainer>
          <div ref={this.measure}>{this.props.children(this.state)}</div>
          <CSSCapsule>
            <MeasureLabel>
              {this.state.width}
              px
            </MeasureLabel>
          </CSSCapsule>
        </ComponentContainer>
        <CSSCapsule>
          <KnobsPanel>
            {Object.values(this.props.knobs).map(v => this.createKnob(v))}
          </KnobsPanel>
        </CSSCapsule>
      </div>
    ];
  }
}

ShortStory.defaultProps = {
  name: "My Element",
  knobs: {}
};

export default ShortStory;
