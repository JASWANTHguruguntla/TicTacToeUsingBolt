import React from 'react';
import { Player } from '../types';

interface GamePieceProps {
  player: Player;
  isWinning?: boolean;
  animateIn?: boolean;
}

const GamePiece: React.FC<GamePieceProps> = ({ player, isWinning = false, animateIn = false }) => {
  if (!player) return null;

  const baseClass = `game-piece ${player.toLowerCase()} ${isWinning ? 'winning' : ''} ${animateIn ? 'animate-in' : ''}`;

  if (player === 'X') {
    return (
      <div className={baseClass}>
        <div className="x-piece">
          <div className="x-line x-line-1"></div>
          <div className="x-line x-line-2"></div>
          <div className="x-crystal-effect"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={baseClass}>
      <div className="o-piece">
        <div className="o-ring">
          <div className="o-inner-ring"></div>
          <div className="o-vortex-effect"></div>
        </div>
      </div>
    </div>
  );
};

export default GamePiece;