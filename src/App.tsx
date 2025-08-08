import React, { useState, useCallback } from 'react';
import { GameState, Player } from './types';
import Board from './components/Board';
import GameOverlay from './components/GameOverlay';
import { useAudio } from './hooks/useAudio';
import './styles/game.css';

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
  [0, 4, 8], [2, 4, 6] // Diagonal
];

function App() {
  const audio = useAudio();
  const [hoveredSquare, setHoveredSquare] = useState<number | null>(null);
  
  const [gameState, setGameState] = useState<GameState>({
    board: Array(9).fill(null),
    currentPlayer: 'X',
    status: 'playing',
    winner: null,
    winningLine: null
  });

  const checkWinner = useCallback((board: Player[]): { winner: Player; winningLine: number[] | null } => {
    for (const combination of WINNING_COMBINATIONS) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { winner: board[a], winningLine: combination };
      }
    }
    return { winner: null, winningLine: null };
  }, []);

  const handleSquareClick = useCallback((index: number) => {
    if (gameState.board[index] || gameState.status !== 'playing') {
      audio.playError();
      return;
    }

    audio.playUIClick();
    
    const newBoard = [...gameState.board];
    newBoard[index] = gameState.currentPlayer;

    const { winner, winningLine } = checkWinner(newBoard);
    
    if (winner) {
      audio.playWin();
      setGameState({
        ...gameState,
        board: newBoard,
        status: 'win',
        winner,
        winningLine
      });
    } else if (newBoard.every(square => square !== null)) {
      audio.playDraw();
      setGameState({
        ...gameState,
        board: newBoard,
        status: 'draw',
        winner: null,
        winningLine: null
      });
    } else {
      // Play piece placement sound
      if (gameState.currentPlayer === 'X') {
        audio.playPlaceX();
      } else {
        audio.playPlaceO();
      }
      
      setGameState({
        ...gameState,
        board: newBoard,
        currentPlayer: gameState.currentPlayer === 'X' ? 'O' : 'X'
      });
    }
  }, [gameState, checkWinner, audio]);

  const handleRestart = useCallback(() => {
    audio.playUIClick();
    setGameState({
      board: Array(9).fill(null),
      currentPlayer: 'X',
      status: 'playing',
      winner: null,
      winningLine: null
    });
    setHoveredSquare(null);
  }, [audio]);

  return (
    <div className="app">
      <div className="background-effects">
        <div className="data-stream stream-1"></div>
        <div className="data-stream stream-2"></div>
        <div className="data-stream stream-3"></div>
        <div className="code-rain">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className={`code-line line-${i % 4}`}>
              {Math.random().toString(36).substring(2, 15)}
            </div>
          ))}
        </div>
      </div>

      <div className="game-container">
        <header className="game-header">
          <h1 className="game-title">
            <span className="title-holo">HOLO</span>
            <span className="title-grid">-GRID</span>
          </h1>
          <div className="current-player">
            <span>ACTIVE NODE:</span>
            <div className={`player-indicator ${gameState.currentPlayer?.toLowerCase()}`}>
              {gameState.currentPlayer}
            </div>
          </div>
        </header>

        <main className="game-main">
          <Board
            board={gameState.board}
            onSquareClick={handleSquareClick}
            winningLine={gameState.winningLine}
            hoveredSquare={hoveredSquare}
            onSquareHover={setHoveredSquare}
          />
        </main>

        <GameOverlay
          status={gameState.status}
          winner={gameState.winner}
          onRestart={handleRestart}
        />

        <footer className="creator-credit">
          <span>Created by Jaswanth Guruguntla</span>
        </footer>
      </div>
    </div>
  );
}

export default App;