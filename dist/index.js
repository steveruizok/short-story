'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var PropTypes = _interopDefault(require('prop-types'));
var styled = require('react-emotion');
var styled__default = _interopDefault(styled);

var throttle = function throttle(func, limit) {
  var inThrottle = void 0;
  return function () {
    var args = arguments;
    var context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(function () {
        return inThrottle = false;
      }, limit);
    }
  };
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var taggedTemplateLiteral = function (strings, raw) {
  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
};

var _templateObject = taggedTemplateLiteral(["\n  font: ", ";\n  color: ", ";\n"], ["\n  font: ", ";\n  color: ", ";\n"]),
    _templateObject2 = taggedTemplateLiteral(["\n  all: initial;\n"], ["\n  all: initial;\n"]),
    _templateObject3 = taggedTemplateLiteral(["\n  display: grid;\n  grid-gap: 1em;\n  flex-direction: column;\n  border: 1px solid ", ";\n  border-bottom: none;\n  border-radius: 0.25em 0.25em 0 0;\n  background-color: ", ";\n  width: auto;\n  align-items: center;\n  justify-content: center;\n  padding: 1.25em;\n"], ["\n  display: grid;\n  grid-gap: 1em;\n  flex-direction: column;\n  border: 1px solid ", ";\n  border-bottom: none;\n  border-radius: 0.25em 0.25em 0 0;\n  background-color: ", ";\n  width: auto;\n  align-items: center;\n  justify-content: center;\n  padding: 1.25em;\n"]),
    _templateObject4 = taggedTemplateLiteral(["\n  font: ", ";\n  color: ", ";\n  padding-top: 1em;\n  border-top: 1px solid ", ";\n  text-align: center;\n"], ["\n  font: ", ";\n  color: ", ";\n  padding-top: 1em;\n  border-top: 1px solid ", ";\n  text-align: center;\n"]),
    _templateObject5 = taggedTemplateLiteral(["\n  display: grid;\n  font: ", ";\n  border: 1px solid ", ";\n  border-top: none;\n  border-radius: 0 0 0.25em 0.25em;\n  overflow: hidden;\n  margin-bottom: 2em;\n"], ["\n  display: grid;\n  font: ", ";\n  border: 1px solid ", ";\n  border-top: none;\n  border-radius: 0 0 0.25em 0.25em;\n  overflow: hidden;\n  margin-bottom: 2em;\n"]),
    _templateObject6 = taggedTemplateLiteral(["\n  border-top: 1px solid ", ";\n  grid-row: span 1;\n  padding: 1.75em 0 1.75em 0;\n"], ["\n  border-top: 1px solid ", ";\n  grid-row: span 1;\n  padding: 1.75em 0 1.75em 0;\n"]),
    _templateObject7 = taggedTemplateLiteral(["\n  width: 320px;\n  margin: 0 auto 1em auto;\n  display: flex;\n  align-content: center;\n  justify-content: space-between;\n"], ["\n  width: 320px;\n  margin: 0 auto 1em auto;\n  display: flex;\n  align-content: center;\n  justify-content: space-between;\n"]),
    _templateObject8 = taggedTemplateLiteral(["\n  letter-spacing: 0.18em;\n  font: ", ";\n  color: ", ";\n  text-transform: uppercase;\n"], ["\n  letter-spacing: 0.18em;\n  font: ", ";\n  color: ", ";\n  text-transform: uppercase;\n"]),
    _templateObject9 = taggedTemplateLiteral(["\n  width: 100%;\n"], ["\n  width: 100%;\n"]),
    _templateObject10 = taggedTemplateLiteral(["\n\twidth: 100%;\n\tletter-spacing: .08em;\n\tbox-sizing: border-box;\n  padding: 1em 1.25em;\n  font: ", ";x;\n  color: ", ";\n  background-color: ", ";\n  border: 1px solid ", ";\n  border-radius: 0.25em;\n"], ["\n\twidth: 100%;\n\tletter-spacing: .08em;\n\tbox-sizing: border-box;\n  padding: 1em 1.25em;\n  font: ", ";x;\n  color: ", ";\n  background-color: ", ";\n  border: 1px solid ", ";\n  border-radius: 0.25em;\n"]),
    _templateObject11 = taggedTemplateLiteral(["\n                padding: 1em 1.25em;\n              "], ["\n                padding: 1em 1.25em;\n              "]),
    _templateObject12 = taggedTemplateLiteral(["\n                position: absolute;\n                top: calc(50% - 2px);\n                right: 16px;\n                width: 20px;\n                height: 12px;\n                clip-path: polygon(0px 0px, 8px 8px, 16px 0px);\n                background-color: ", ";\n              "], ["\n                position: absolute;\n                top: calc(50% - 2px);\n                right: 16px;\n                width: 20px;\n                height: 12px;\n                clip-path: polygon(0px 0px, 8px 8px, 16px 0px);\n                background-color: ", ";\n              "]),
    _templateObject13 = taggedTemplateLiteral(["\n                position: absolute;\n                top: 0;\n                left: 0;\n                height: 100%;\n                width: 100%;\n                opacity: 0;\n              "], ["\n                position: absolute;\n                top: 0;\n                left: 0;\n                height: 100%;\n                width: 100%;\n                opacity: 0;\n              "]);

var fonts = {
  heading: "300 2em/2.2em Avenir",
  label: "500 .9em/.9em Avenir",
  code: "500 1em/1.2em Menlo",
  body: "500 .9em/1.15em Avenir",
  caption: "400 .8em/.8em Avenir"
};

var colors = {
  border: "#e5e9f2",
  text: "#514f4f",
  outline: "#d3dce6",
  fill: "#928f8f",
  field: "#f5f7ff",
  fieldBorder: "#e5e9f2",
  background: "none"
};

// styled components

var Heading = styled__default("h2")(_templateObject, fonts.heading, colors.text);

var CSSCapsule = styled__default("div")(_templateObject2);

var ComponentContainer = styled__default("div")(_templateObject3, colors.border, colors.background);

var MeasureLabel = styled__default("div")(_templateObject4, fonts.caption, colors.label, colors.border);

var KnobsPanel = styled__default("div")(_templateObject5, fonts.label, colors.border);

var KnobContainer = styled__default("div")(_templateObject6, colors.border);

var KnobLabelRow = styled__default("div")(_templateObject7);

var KnobLabel = styled__default("span")(_templateObject8, fonts.label, colors.text);

var KnobVariableName = styled__default("span")(_templateObject, fonts.code, colors.text);

var KnobInput = styled__default("div")(_templateObject9);

var ContainerStyle = styled.css(_templateObject10, fonts.body, colors.body, colors.field, colors.fieldBorder);

var Input = function Input(props) {
  return React.createElement("input", _extends({ key: "Stsy-input", className: ContainerStyle }, props));
};

var ShortStory = function (_React$Component) {
  inherits(ShortStory, _React$Component);

  function ShortStory(props) {
    classCallCheck(this, ShortStory);

    var _this = possibleConstructorReturn(this, (ShortStory.__proto__ || Object.getPrototypeOf(ShortStory)).call(this, props));

    _this.createKnob = function (knob) {
      if (knob.hidden !== undefined) {
        if (knob.hidden(_this.state)) {
          return;
        }
      }

      var input = _this.createKnobInput(knob);

      return React.createElement(
        KnobContainer,
        null,
        React.createElement(
          "div",
          { style: { width: "320px", margin: "0 auto 1em auto" } },
          React.createElement(
            KnobLabelRow,
            { key: "Label_Box_" + knob.name },
            React.createElement(
              KnobLabel,
              null,
              knob.label
            ),
            React.createElement(
              KnobVariableName,
              null,
              knob.variableName
            )
          ),
          React.createElement(
            KnobInput,
            null,
            input
          )
        )
      );
    };

    _this.createKnobInput = function (knob) {
      var i = 0;

      // let ref = React.createRef();
      var key = knob.name;

      var handleChange = throttle(function (ev) {
        _this.setState(defineProperty({}, knob.name, ev.target.value));
      }, 250);

      var currentValue = _this.state[knob.name];

      switch (knob.type) {
        // TEXT
        case "text":
          return React.createElement(Input, {
            key: key,
            onChange: handleChange,
            defaultValue: currentValue
          });
        // TEXTAREA
        case "textarea":
          return React.createElement("textarea", {
            key: key,
            onChange: handleChange,
            defaultValue: currentValue,
            className: ContainerStyle
          });
        // DATE
        case "date":
          return React.createElement(Input, {
            key: key,
            type: "date",
            min: knob.min,
            max: knob.max,
            onChange: handleChange,
            value: currentValue,
            style: {
              border: "1px solid #aaa",
              fontFamily: "sans-serif",
              fontSize: ".9em",
              padding: "8px"
            }
          });
        // NUMBER
        case "number":
          return [React.createElement(
            "div",
            {
              key: key + "_slider_currentValue",
              style: {
                width: "calc(100% - 16px)",
                textAlign: "center"
              }
            },
            React.createElement(
              "small",
              { key: key + "_slider_max" },
              currentValue
            )
          ), React.createElement(Input, {
            key: key,
            type: "range",
            min: knob.min,
            max: knob.max,
            onChange: handleChange,
            defaultValue: currentValue,
            style: {
              width: "calc(100% - 16px)"
            }
          }), React.createElement(
            "div",
            {
              key: key + "_slider_values",
              style: {
                display: "flex",
                width: "calc(100% - 16px)",
                justifyContent: "space-between",
                fontFamily: "sans-serif",
                fontSize: ".9em"
              }
            },
            React.createElement(
              "span",
              { key: key + "_slider_min" },
              knob.min
            ),
            React.createElement(
              "span",
              { key: key + "_slider_max" },
              knob.max
            )
          )];
        // ENUMERATED VALUE
        case "enum":
          return React.createElement(
            "div",
            {
              className: ContainerStyle,
              style: {
                position: "relative",
                padding: "0",
                height: "3em"
              }
            },
            React.createElement(
              "div",
              {
                className: styled.css(_templateObject11)
              },
              knob.labels[knob.options.indexOf(currentValue)]
            ),
            React.createElement("div", {
              className: styled.css(_templateObject12, colors.text)
            }),
            React.createElement(
              "select",
              {
                key: key,
                type: "select",
                onChange: handleChange,
                defaultValue: currentValue,
                className: styled.css(_templateObject13)
              },
              knob.options.map(function (o, index) {
                return React.createElement(
                  "option",
                  { key: key + "_option_" + index, value: o },
                  knob.labels[index]
                );
              })
            )
          );
        // SEGMENTED ENUMERATED VALUE
        case "segment":
          i++;
          return React.createElement(
            "div",
            {
              key: key + i + "_segment",
              style: {
                width: "calc(100% - 16px)"
              }
            },
            knob.options.map(function (o, index) {
              return [React.createElement(Input, {
                key: key + i + "_SegmentOption_" + index,
                type: "radio",
                checked: currentValue === o,
                mr: 2,
                id: key + i + "_SegmentOption_" + index,
                onChange: function onChange(ev) {
                  _this.setState(defineProperty({}, knob.name, o));
                },
                style: {
                  marginRight: "8px"
                }
              }), React.createElement(
                "label",
                {
                  style: {
                    marginRight: "16px"
                  },
                  key: key + i + "_SegmentOptionLabel_" + index,
                  htmlFor: key + i + "_SegmentOption_" + index
                },
                knob.labels[index]
              )];
            })
          );
        // BOOLEAN
        case "boolean":
          return React.createElement(Input, {
            key: key,
            type: "checkbox",
            onClick: function onClick(ev) {
              _this.setState(defineProperty({}, knob.name, !currentValue));
            },
            defaultChecked: currentValue,
            style: {}
          });
        // COLOR
        case "color":
          return [React.createElement(Input, {
            key: key,
            type: "color",
            name: knob.name,
            onChange: handleChange,
            value: currentValue,
            style: {
              padding: 0,
              margin: 0,
              borderWidth: 0,
              height: "32px",
              width: "56px",
              borderColor: "none",
              backgroundColor: "none"
            }
          })];
        // TIME
        case "time":
          return [React.createElement(Input, {
            key: key,
            type: "time",
            min: knob.min,
            max: knob.max,
            onChange: handleChange,
            value: currentValue,
            style: {
              border: "1px solid #aaa",
              fontFamily: "sans-serif",
              fontSize: ".9em",
              padding: "8px"
            }
          })];
        // TODO: IMAGE
        default:
          return React.createElement(
            "span",
            null,
            "Nothing for that type."
          );
      }
    };

    _this.updateWidth = function (ev) {
      if (!_this.measure.current) {
        return;
      }

      var node = _this.measure.current.childNodes[0];

      if (!node || node.offsetWidth === _this.state.width) {
        return;
      }

      _this.setState({ width: node.offsetWidth });
    };

    _this.measure = React.createRef();

    _this.state = {
      width: 0,
      activeTab: 0
    };

    Object.keys(_this.props.knobs).map(function (key) {
      var knob = _this.props.knobs[key];
      knob.name = key;
      _this.state = _extends({}, _this.state, defineProperty({}, key, knob.default));
    });
    return _this;
  }

  // Create knobs


  // Create the correct input for the knob type


  createClass(ShortStory, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.updateWidth();
      window.addEventListener("resize", throttle(this.updateWidth, 100));
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.updateWidth();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var name = this.props.name;

      return [React.createElement(
        CSSCapsule,
        { key: "stsy_" + name + "_header" },
        React.createElement(
          Heading,
          null,
          name
        )
      ), React.createElement(
        "div",
        { key: "stsy_" + name + "_component" },
        React.createElement(
          ComponentContainer,
          null,
          React.createElement(
            "div",
            { ref: this.measure },
            this.props.children(this.state)
          ),
          React.createElement(
            CSSCapsule,
            null,
            React.createElement(
              MeasureLabel,
              null,
              this.state.width,
              "px"
            )
          )
        ),
        React.createElement(
          CSSCapsule,
          null,
          React.createElement(
            KnobsPanel,
            null,
            Object.values(this.props.knobs).map(function (v) {
              return _this2.createKnob(v);
            })
          )
        )
      )];
    }
  }]);
  return ShortStory;
}(React.Component);

ShortStory.propTypes = {
  knobs: PropTypes.object,
  name: PropTypes.string,
  children: PropTypes.func.isRequired
};


ShortStory.defaultProps = {
  name: "My Element",
  knobs: {}
};

module.exports = ShortStory;
//# sourceMappingURL=index.js.map
