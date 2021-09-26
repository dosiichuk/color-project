import React, { Component } from "react";

import logo from "./logo.svg";
import "./App.css";
import Palette from "./Palette";
import seedColors from "./seedColors";
import { generatePalette } from "./colorHelpers";
import { render } from "@testing-library/react";
import ColorBox from "./ColorBox";

class App extends Component {
  render() {
    return (
      <div>
        <Palette palette={generatePalette(seedColors[4])} />
      </div>
    );
  }
}

export default App;
