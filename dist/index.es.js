import React, { Component } from 'react';
import PropTypes from 'prop-types';

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = "/* add css styles here (optional) */\n\n.styles_test__32Qsm {\n  display: inline-block;\n  margin: 2em auto;\n  border: 2px solid #000;\n  font-size: 2em;\n}\n";
var styles = { "test": "styles_test__32Qsm" };
styleInject(css);

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

<<<<<<< HEAD
var ExampleComponent = function (_Component) {
  inherits(ExampleComponent, _Component);

  function ExampleComponent() {
    classCallCheck(this, ExampleComponent);
    return possibleConstructorReturn(this, (ExampleComponent.__proto__ || Object.getPrototypeOf(ExampleComponent)).apply(this, arguments));
=======
var theme = {
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

      return [React.createElement(
        "div",
        {
          key: "Label_Box_" + knob.name,
          style: {
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gridColumn: 1,
            padding: theme.rowPadding,
            borderTop: theme.border,
            color: theme.labelColor
          }
        },
        knob.label
      ), React.createElement(
        "div",
        {
          key: "Knob_Input" + knob.name,
          style: {
            gridColumn: 2,
            padding: theme.rowPadding,
            borderTop: theme.border,
            color: theme.inputColor
          }
        },
        input
      )];
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
            defaultValue: currentValue,
            style: {
              width: "calc(100% - 16px)",
              fontFamily: "sans-serif",
              fontSize: ".9em",
              padding: "8px",
              border: "1px solid #aaa"
            }
          });
        // TEXTAREA
        case "textarea":
          return React.createElement("textarea", {
            key: key,
            onChange: handleChange,
            defaultValue: currentValue,
            style: {
              width: "calc(100% - 16px)",
              border: "1px solid #aaa",
              fontFamily: "sans-serif",
              fontSize: ".9em",
              padding: "8px"
            }
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
            "select",
            {
              key: key,
              type: "select",
              onChange: handleChange,
              defaultValue: currentValue,
              style: {
                width: "calc(100% - 16px)",
                fontFamily: "sans-serif",
                fontSize: ".9em",
                padding: "8px"
              }
            },
            knob.options.map(function (o, index) {
              return React.createElement(
                "option",
                { key: key + "_option_" + index, value: o },
                knob.labels[index]
              );
            })
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
>>>>>>> parent of 195041b... short story
  }

  createClass(ExampleComponent, [{
    key: 'render',
    value: function render() {
      var text = this.props.text;

<<<<<<< HEAD

      return React.createElement(
        'div',
        { className: styles.test },
        'Example Component: ',
        text
      );
=======
      var name = this.props.name;
      return [React.createElement(
        "div",
        {
          key: "stsy_" + name + "_knobs_heading_container",
          style: {
            all: "initial"
          }
        },
        React.createElement(
          "h2",
          {
            style: {
              fontFamily: "sans-serif",
              fontSize: "1.68em"
            },
            key: "stsy_" + name + "_heading"
          },
          name
        )
      ), React.createElement(
        "div",
        {
          key: "stsy_" + name + "_component",
          style: {
            display: "flex",
            border: theme.outerBorder,
            borderBottom: "none",
            borderRadius: "4px 4px 0 0",
            backgroundColor: theme.background,
            width: "auto",
            justifyContent: "center"
          }
        },
        React.createElement(
          "div",
          { key: "stsy_" + name + "_padding", style: { padding: "24px 0" } },
          React.createElement(
            "div",
            {
              key: "stsy_" + name + "_measure",
              style: {
                borderBottom: "1px solid #bbb",
                backgroundColor: "#eee"
              },
              ref: this.measure
            },
            this.props.children(this.state)
          ),
          " ",
          React.createElement(
            "div",
            {
              style: {
                all: "initial"
              }
            },
            React.createElement(
              "div",
              {
                key: "stsy_" + name + "_width",
                style: {
                  fontFamily: "sans-serif",
                  fontSize: ".8em",
                  color: "#777",
                  paddingTop: "8px",
                  textAlign: "center"
                }
              },
              this.state.width,
              "px"
            )
          )
        )
      ), React.createElement(
        "div",
        { key: "stsy_" + name + "_knobs_container", style: { all: "initial" } },
        React.createElement(
          "div",
          {
            key: "stsy_" + name + "_knobs_panel",
            style: {
              fontFamily: "sans-serif",
              fontSize: ".9em",
              margin: theme.margin,
              border: theme.outerBorder,
              borderRadius: "0 0 4px 4px",
              overflow: "hidden",
              marginBottom: "40px"
            }
          },
          React.createElement(
            "div",
            {
              key: "stsy_" + name + "_knobs_container",
              style: {
                display: "grid",
                gridTemplateColumns: "25% auto"
              }
            },
            Object.values(this.props.knobs).map(function (v) {
              return _this2.createKnob(v);
            })
          )
        )
      )];
>>>>>>> parent of 195041b... short story
    }
  }]);
  return ExampleComponent;
}(Component);

ExampleComponent.propTypes = {
  text: PropTypes.string
};

<<<<<<< HEAD
export default ExampleComponent;
=======
var Input = function Input(props) {
  return React.createElement("input", _extends({ key: "Stsy-input" }, props));
};

export default ShortStory;
>>>>>>> parent of 195041b... short story
//# sourceMappingURL=index.es.js.map
