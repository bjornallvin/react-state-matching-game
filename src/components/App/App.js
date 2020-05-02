import React, { Component } from 'react';
import OptionsPanel from '../OptionsPanel'
import Board from '../Board'
import { createTiles, indexOfSelected } from '../../misc/utils'

import './App.css';

class App extends Component{
  constructor(props) {
    super(props)

    this.state = {
      numTiles: 36,
      playing: false,
      previousTileIndex: null,
      tiles: [],
      toBeCleared: null
    }
  }

  handleNumTileChange = (num) => {
    this.setState({
      numTiles: num,
      playing: false,
      tiles: []
    })
  }


  startGame = (numTiles) => {
    this.setState((state) => ({
      playing: true,
      previousTileIndex: null,
      toBeCleared: null,
      tiles: createTiles(state.numTiles, this.handleTileClicked)
    }));
  }

  handleTileClicked = (id, color) => {
    this.setState((state) => {
      const tiles = state.tiles;
      let selectedTileIndex = indexOfSelected(tiles, id, color)
      let previousTileIndex = state.previousTileIndex;
      let toBeCleared = state.toBeCleared;

      if (toBeCleared !== null) {
        tiles[toBeCleared[0]].selected = false;
        tiles[toBeCleared[1]].selected = false;
        toBeCleared = null;
      }

      tiles[selectedTileIndex].selected = true;


      if (previousTileIndex !== null) {
        //console.log("we have previous: ", previousTileIndex)
        let previousTile = tiles[previousTileIndex];
        let selectedTile = tiles[selectedTileIndex];
        //console.log({ previousTile })
        //console.log({ selectedTile })
        if (previousTile.id !== selectedTile.id && previousTile.color == color) {
          //console.log("We have a match")
          tiles[selectedTileIndex].matched = true;
          tiles[previousTileIndex].matched = true;
          previousTileIndex = null;
        } else {
          toBeCleared = [previousTileIndex, selectedTileIndex];
          previousTileIndex = null;
        }
      }
      else {
        previousTileIndex = selectedTileIndex
      }

      const newState = {
        previousTileIndex,
        tiles,
        toBeCleared
      }

      //console.log({ newState })

      return newState
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          Turbo-Matcher
      </header>
        <OptionsPanel handleNumTileChange={this.handleNumTileChange} startGame={this.startGame} playing={this.state.playing} numTiles={this.state.numTiles} />
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
