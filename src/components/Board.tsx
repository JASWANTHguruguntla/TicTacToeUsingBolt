import React from 'react';
import { Board as BoardType, Player } from '../types';
import GamePiece from './GamePiece';

interface BoardProps {
  board: BoardType;
  onSquareClick: (index: number) => void;
  winningLine: number[] | null;
  hoveredSquare: number | null;
  onSquareHover: (index: number | null) => void;
}

const Board: React.FC<BoardProps> = ({ 
  board, 
  onSquareClick, 
  winningLine, 
  hoveredSquare,
  onSquareHover 
}) => {
  return (
    <div className="board-container">
      <div className="board">
        <div className="grid-lines">
          {/* Vertical lines */}
          <div className="grid-line vertical line-1"></div>
          <div className="grid-line vertical line-2"></div>
          {/* Horizontal lines */}
          <div className="grid-line horizontal line-3"></div>
          <div className="grid-line horizontal line-4"></div>
        </div>
        
        <div className="squares">
          {board.map((square, index) => (
            <button
              key={index}
              className={`square ${hoveredSquare === index ? 'hovered' : ''} ${winningLine?.includes(index) ? 'winning-square' : ''}`}
              onClick={() => onSquareClick(index)}
              onMouseEnter={() => onSquareHover(index)}
              onMouseLeave={() => onSquareHover(null)}
              disabled={square !== null}
            >
              <div className="square-content">
                <GamePiece 
                  player={square} 
                  isWinning={winningLine?.includes(index)}
                  animateIn={true}
                />
              </div>
              <div className="ripple-effect"></div>
            </button>
          ))}
        </div>
        
        {winningLine && (
          <div className={`winning-line winning-line-${getLineDirection(winningLine)}`}>
            <div className="energy-beam"></div>
          </div>
        )}
      </div>
    </div>
  );
};

function getLineDirection(winningLine: number[]): string {
  const [a, b, c] = winningLine;
  
  // Horizontal lines
  if (a === 0 && b === 1 && c === 2) return 'horizontal-top';
  if (a === 3 && b === 4 && c === 5) return 'horizontal-middle';
  if (a === 6 && b === 7 && c === 8) return 'horizontal-bottom';
  
  // Vertical lines
  if (a === 0 && b === 3 && c === 6) return 'vertical-left';
  if (a === 1 && b === 4 && c === 7) return 'vertical-middle';
  if (a === 2 && b === 5 && c === 8) return 'vertical-right';
  
  // Diagonal lines
  if (a === 0 && b === 4 && c === 8) return 'diagonal-main';
  if (a === 2 && b === 4 && c === 6) return 'diagonal-anti';
  
  return 'horizontal-top';
}

export default Board;