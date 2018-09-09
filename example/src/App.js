import React, { Component } from "react";
import "./index.css";
import ShortStory from "short-story";

const testKnobs = {
  myText: {
    type: "text",
    label: "Name",
    default: "Steve"
  },
  myDate: {
    type: "date",
    label: "Date",
    min: "1986-01-01",
    max: "1986-01-11",
    default: "1986-01-09"
  },
  myTime: {
    type: "time",
    label: "Time",
    min: "00:00",
    max: "09:30",
    default: "04:45"
  },
  myNumber: {
    type: "number",
    label: "Age",
    default: 32,
    min: 1,
    max: 100
  },
  myBoolean: {
    type: "boolean",
    label: "Dark Mode",
    default: false
  },
  myEnum: {
    type: "enum",
    label: "Favorite Color",
    options: ["#f98c5f", "#86d7dd", "#c2e988"],
    labels: ["Red", "Blue", "Green"],
    default: "#f98c5f"
  },
  myColor: {
    type: "color",
    label: "Text Color",
    default: "#e1547c"
  },
  mySegment: {
    type: "segment",
    label: "Alignment",
    options: ["left", "center", "right"],
    labels: ["Left", "Center", "Right"],
    default: "left"
  },
  hidden: {
    type: "boolean",
    label: "Light mode only",
    default: false,
    hidden: s => s.myBoolean
  },
  revealed: {
    type: "boolean",
    label: "Dark mode only",
    default: false,
    hidden: s => !s.myBoolean
  },
  myTextarea: {
    name: "myTextarea",
    type: "textarea",
    label: "Message",
    default: ""
  }
};

export default class App extends Component {
  render() {
    return (
      <div>
        <ShortStory name="Test Rhyme" knobs={testKnobs}>
          {state => (
            <div
              key="testRhyme"
              style={{
                textAlign: state.mySegment,
                color: state.myColor,
                backgroundColor: "#333"
              }}
            >
              <p key="1">
                Hi, I'm {state.myText}. I'm {state.myNumber} years old. I was
                born on{" "}
                {new Date(state.myDate).toLocaleDateString("en-gb", {
                  month: "long",
                  day: "numeric",
                  year: "numeric"
                })}{" "}
                at {state.myTime}.
              </p>
              <p key="2" style={{ color: state.myEnum }}>
                This is my favourite color.
              </p>
              {state.myTextarea && (
                <p key="3">
                  <p key="3.1">Dear diary,</p>
                  <p key="3.2">{state.myTextarea}</p>
                  <p key="3.3">Yours truly,</p>
                  <p key="3.4">{state.myText}</p>
                </p>
              )}
            </div>
          )}
        </ShortStory>
      </div>
    );
  }
}
