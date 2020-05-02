import React, { useState, Component } from 'react';
import OptionsPanel from '../OptionsPanel'
import Board from '../Board'

import './App.css';
import { createTiles } from "../../misc/utils"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numTiles: 36,
      playing: false,
      previousTileIndex: null,
      tiles: [],
      toBeCleared: null
    }
  }

  startGame = (numTiles) => {
    this.setState((state) => ({
      playing: true,
      previousTileIndex: null,
      toBeCleared: null,
      tiles: createTiles(state.numTiles)
    }));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          Turbo-Matcher
      </header>
        <OptionsPanel startGame={this.startGame} playing={this.state.playing} numTiles={this.state.numTiles} />
        <Board numTiles={this.state.numTiles} playing={this.state.playing} tiles={this.state.tiles} />
      }
      </div>
    )

  }
}

/*
const App = () => {

  const [numTiles, setNumTiles] = useState(36);
  const [playing, setPlaying] = useState(false);
  const [previousTileindex, setPreviousTileindex] = useState(null);
  const [tiles, setTiles] = useState([])
  const [toBeCleared, setToBeCleared] = useState(null)

  const startGame = (numTiles) => {
    setPlaying(true);
    setPreviousTileindex(null);
    setToBeCleared(null);
    setTiles(createTiles(numTiles));
  }

  return (
    <div className="App">
      <header className="App-header">
        Turbo-Matcher
      </header>
      <OptionsPanel startGame={startGame} playing={playing} numTiles={numTiles} />
      <Board numTiles={numTiles} playing={playing} tiles={tiles} />
      }
    </div>
  );

}
*/

export default App;
