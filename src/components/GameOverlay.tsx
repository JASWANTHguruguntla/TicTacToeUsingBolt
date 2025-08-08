import React from 'react';
import { GameStatus, Player } from '../types';

interface GameOverlayProps {
  status: GameStatus;
  winner: Player;
  onRestart: () => void;
}

const GameOverlay: React.FC<GameOverlayProps> = ({ status, winner, onRestart }) => {
  if (status === 'playing') return null;

  const isWin = status === 'win';
  const isDraw = status === 'draw';

  return (
    <div className={`game-overlay ${isWin ? 'win' : 'draw'} ${winner ? winner.toLowerCase() : ''}`}>
      <div className="overlay-content">
        <div className="status-text">
          {isWin && winner === 'X' && <span className="win-text x-win">GRID DOMINATED</span>}
          {isWin && winner === 'O' && <span className="win-text o-win">VICTORY ACHIEVED</span>}
          {isDraw && <span className="draw-text">SYSTEM DEADLOCK</span>}
        </div>
        
        <div className="winner-display">
          {isWin && winner && (
            <div className={`winner-piece ${winner.toLowerCase()}`}>
              {winner === 'X' ? (
                <div className="victory-x">
                  <div className="x-line x-line-1"></div>
                  <div className="x-line x-line-2"></div>
                </div>
              ) : (
                <div className="victory-o">
                  <div className="o-ring"></div>
                </div>
              )}
            </div>
          )}
        </div>
        
        <button className="restart-button" onClick={onRestart}>
          <span>INITIALIZE NEW GRID</span>
          <div className="button-glow"></div>
        </button>
      </div>
      
      <div className="overlay-effects">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
      </div>
    </div>
  );
};

export default GameOverlay;