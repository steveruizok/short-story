import React from "react";
import PropTypes from "prop-types";
import { throttle } from "./utils";

const theme = {
  white: "#fff",
  background: "#f6f6f6",
  gray: "#eee",
  black: "#000",
  labelColor: "#555",
  inputColor: "#777",
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

    return [
      <div
        key={"Label_Box_" + knob.name}
        style={{
          gridColumn: 1,
          padding: theme.rowPadding,
          borderBottom: theme.border,
          color: theme.labelColor
        }}
      >
        <label key={"Knob_Label_" + knob.name}>{knob.label}</label>
      </div>,
      <div
        key={"Knob_Input" + knob.name}
        style={{
          gridColumn: 2,
          padding: theme.rowPadding,
          borderBottom: theme.border,
          color: theme.inputColor
        }}
      >
        {input}
      </div>
    ];
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
            className="stsy-knob-input"
            key={key}
            onChange={handleChange}
            defaultValue={currentValue}
            style={{
              width: "calc(100% - 16px)",
              fontFamily: "sans-serif",
              fontSize: ".9em",
              padding: "8px",
              border: "1px solid #aaa"
            }}
          />
        );
      // TEXTAREA
      case "textarea":
        return (
          <textarea
            className="stsy-knob-textarea"
            key={key}
            onChange={handleChange}
            defaultValue={currentValue}
            style={{
              width: "calc(100% - 16px)",
              border: "1px solid #aaa"
            }}
          />
        );
      // DATE
      case "date":
        return (
          <Input
            className="stsy-knob-date"
            key={key}
            type="date"
            min={knob.min}
            max={knob.max}
            onChange={handleChange}
            value={currentValue}
            style={{
              width: "calc(100% - 16px)",
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
          <select
            key={key}
            type="select"
            onChange={handleChange}
            defaultValue={currentValue}
            style={{
              width: "calc(100% - 16px)",
              fontFamily: "sans-serif",
              fontSize: ".9em",
              padding: "8px"
            }}
          >
            {knob.options.map((o, index) => (
              <option key={key + "_option_" + index} value={o}>
                {knob.labels[index]}
              </option>
            ))}
          </select>
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
                name={key + "_SegmentOption_" + index}
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
      // TODO: IMAGE
      default:
        return <span>Nothing for that type.</span>;
    }
  };

  componentDidMount() {
    this.updateWidth();
    window.addEventListener("resize", throttle(this.updateWidth, 100));
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
      <div
        key={`stsy_${name}_knobs_heading_container`}
        style={{
          all: "initial"
        }}
      >
        <h2
          style={{
            fontFamily: "sans-serif",
            fontSize: "1.68em"
          }}
          key={`stsy_${name}_heading`}
        >
          {name}
        </h2>
      </div>,
      <div
        key={`stsy_${name}_component`}
        style={{
          display: "flex",
          backgroundColor: theme.background,
          width: "100%",
          justifyContent: "center"
        }}
      >
        <div key={`stsy_${name}_padding`} style={{ padding: "24px 0" }}>
          <div
            key={`stsy_${name}_measure`}
            style={{ borderBottom: `1px solid #ccc` }}
            ref={this.measure}
          >
            {this.props.children(this.state)}
          </div>
        </div>
      </div>,
      <div key={`stsy_${name}_knobs_container`} style={{ all: "initial" }}>
        <div
          key={`stsy_${name}_knobs_panel`}
          style={{
            fontFamily: "sans-serif",
            fontSize: ".9em",
            margin: theme.margin,
            border: `1px solid ${theme.gray}`,
            borderRadius: "4px",
            overflow: "hidden"
          }}
        >
          <div
            key={`stsy_${name}_width`}
            style={{
              fontSize: ".8em",
              color: "#aaa",
              paddingTop: "8px",
              textAlign: "center"
            }}
          >
            {this.state.width}
            px
          </div>
          <div
            key="stsy-knobs-container"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 2fr"
            }}
          >
            {Object.values(this.props.knobs).map(v => this.createKnob(v))}
          </div>
        </div>
      </div>
    ];
  }
}

ShortStory.defaultProps = {
  name: "My Element",
  knobs: {}
};

export default ShortStory;

const Input = props => <input key="Stsy-input" {...props} />;
