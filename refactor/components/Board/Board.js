import React from 'react'
import './Board.css';
import Tile from "../Tile";

const Board = (props) => {

  const gridConfig = {
    gridTemplateColumns: `repeat(${Math.sqrt(props.numTiles)}, 1fr)`,
    gridTemplateRows: `repeat(${Math.sqrt(props.numTiles)}, 1fr)`,
  }

  const t = props.tiles.map((tile, index) => (<Tile key={index} {...tile} />))

  return (
    <div className='Board' style={gridConfig}>
      {t}
    </div>
  )
}

export default Board
