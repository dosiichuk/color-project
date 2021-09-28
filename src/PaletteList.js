import React, { Component } from "react";
import { Link } from "react-router-dom";
import MiniPalette from "./MiniPalette";
import "./PaletteList.css";

export default class PaletteList extends Component {
  goToPalette(id) {
    this.props.history.push(`/palette/${id}`);
  }
  render() {
    const { palettes } = this.props;
    return (
      <div className="root">
        <div className="container">
          <nav className="nav">
            <h1>Color Project</h1>
            <Link to="/palette/new">Create Palette</Link>
          </nav>
          <div className="palettes">
            {palettes.map((p) => (
              <MiniPalette {...p} handleClick={() => this.goToPalette(p.id)} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
