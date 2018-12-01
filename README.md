# short-story

Beautiful component previews for design, docs and demos.

⚠️ Work in progress! The knobs API may change in future updates.

👉 [CodeSandbox Demo](https://codesandbox.io/s/3rwj7kqm15).

## Install

```bash
npm install --save short-story
```

## Usage

ShortStory is a render props component. It accepts a prop `knobs`, an object describing different knobs, creates an interface for setting the values of those knobs, and passes those values into its child function.

See [example](https://codesandbox.io/s/3rwj7kqm15) for a different knob types.

The component calls its child function with an object argument that maps to the `knobs` prop it received, where each key evaluates to the current value of the knob as set through the interface it generates. (Easier seen than said.) In the example below, the component will create a text field for the `knobs.text` knob, and pass the value of that text field into the child function as `state.text`.

```jsx
import React from "react"
import ReactDOM from "react-dom";
import ShortStory from "short-story"

import MyComponent from "./MyComponent"

const knobs = {
  text: {
    label: "Text Content",
    type: "text",
    default: "Click here!"
  },

function App() {
  return (
    <div className="App">
      <ShortStory knobs={knobs}>
        {(state) => <MyComponent text={state.text} />}
      </ShortStory>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

```

See [https://codesandbox.io/s/3rwj7kqm15](https://codesandbox.io/s/3rwj7kqm15) for a full demo.

## License

MIT © [steveruizok](https://github.com/steveruizok)
