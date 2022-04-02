import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Palette from './components/ui/Palette/Palette';
import PaletteList from './components/ui/PaletteList/PaletteList';
import SingleColorPalette from './components/ui/SingleColorPalette/SingleColorPalette';
import NewPaletteForm from './components/ui/NewPaletteForm/NewPaletteForm';
import seedColors from './seed-data/seedColors';
import { generatePalette } from './components/utils/colorHelpers';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    const savedPalettes = JSON.parse(window.localStorage.getItem('palettes'));
    this.savePalette = this.savePalette.bind(this);
    this.state = { palettes: savedPalettes || seedColors };
    this.findPalette = this.findPalette.bind(this);
    this.deletePalette = this.deletePalette.bind(this);
  }
  findPalette(id) {
    return this.state.palettes.find(function (palette) {
      return palette.id === id;
    });
  }
  savePalette(newPalette) {
    this.setState(
      { palettes: [...this.state.palettes, newPalette] },
      this.syncLocalStorage
    );
  }
  deletePalette(id) {
    this.setState(
      {
        palettes: [
          ...this.state.palettes.filter((palette) => palette.id !== id),
        ],
      },
      this.syncLocalStorage
    );
  }
  syncLocalStorage() {
    window.localStorage.setItem(
      'palettes',
      JSON.stringify(this.state.palettes)
    );
  }
  render() {
    return (
      <Route
        render={({ location }) => (
          <TransitionGroup>
            <CSSTransition key={location.key} classNames="fade" timeout={500}>
              <Switch location={location}>
                <Route
                  exact
                  path="/palette/new"
                  render={(routeProps) => (
                    <div className="page">
                      <NewPaletteForm
                        savePalette={this.savePalette}
                        {...routeProps}
                        palettes={this.state.palettes}
                      />
                    </div>
                  )}
                />
                <Route
                  exact
                  path="/palette/:paletteId/:colorId"
                  render={(routeProps) => (
                    <div className="page">
                      <SingleColorPalette
                        colorId={routeProps.match.params.colorId}
                        palette={generatePalette(
                          this.findPalette(routeProps.match.params.paletteId)
                        )}
                      />
                    </div>
                  )}
                />
                <Route
                  exact
                  path="/"
                  render={(routeProps) => (
                    <div className="page">
                      <PaletteList
                        palettes={this.state.palettes}
                        deleteHandle={this.deletePalette}
                        {...routeProps}
                      />
                    </div>
                  )}
                />
                <Route
                  exact
                  path="/palette/:id"
                  render={(routeProps) => (
                    <div className="page">
                      <Palette
                        palette={generatePalette(
                          this.findPalette(routeProps.match.params.id)
                        )}
                      />
                    </div>
                  )}
                />
                <Route
                  render={(routeProps) => (
                    <div className="page">
                      <PaletteList
                        palettes={this.state.palettes}
                        deleteHandle={this.deletePalette}
                        {...routeProps}
                      />
                    </div>
                  )}
                ></Route>
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      ></Route>
    );
  }
}

export default App;
