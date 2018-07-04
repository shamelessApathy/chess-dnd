import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Square from './Square';
import Knight from './Knight';
import { canMoveKnight, moveKnight} from './Game';

export default class Board extends Component {
  renderSquare(i) 
  {
    const x = i % 8;
    const y = Math.floor(i / 8);
    const black = (x + y) % 2 === 1;

    const [knightX, knightY] = this.props.knightPosition;
    // If, for this iteration knightX and knightY both equal x and y, draw
    // the Knight, if not, it equals null and won't be drawn
    const piece = (x === knightX && y === knightY) ? <Knight /> : null;

      return(
        <div key={i}
             style={{ width: '12.5%', height: '12.5%'}}
             onClick={() => this.handleSquareClick(x,y)}>
             <Square black={black}>
              {piece}
             </Square>
        </div>
        );
  }
  handleSquareClick(toX, toY)
  {
    if (canMoveKnight(toX, toY))
    {
      moveKnight(toX, toY);
    }
  }
  render() 
  {
    const squares = [];
    for (let i = 0; i < 64; i++)
    {
      // Pushes a fully drawn out and marked up square into the squares array
      // For further processing, all loops must be outside of the return(); function
      squares.push(this.renderSquare(i));
    }

    return (
      <div style={{
        width: '100%',
        height: '700px',
        display: "flex",
        flexWrap: 'wrap'
      }}>
        {squares}
      </div>
      );

  }
}

Board.propTypes = {
  knightPosition: PropTypes.arrayOf(
    PropTypes.number.isRequired
  ).isRequired
};