import React, { Component } from "react";
import { Link } from "react-router-dom";
import MiniPalette from "./MiniPalette";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./PaletteList.css";
import { palette } from "@mui/system";

export default class PaletteList extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }
  goToPalette(id) {
    this.props.history.push(`/palette/${id}`);
  }
  handleDelete(id) {
    this.props.deleteHandle(id);
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

          <TransitionGroup className="palettes">
            {palettes.map((p) => (
              <CSSTransition key={p.id} classNames="fade" timeout={500}>
                <MiniPalette
                  {...p}
                  handleClick={() => this.goToPalette(p.id)}
                  handleDelete={this.handleDelete}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
      </div>
    );
  }
}
