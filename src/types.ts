export type Player = 'X' | 'O' | null;
export type Board = Player[];
export type GameStatus = 'playing' | 'win' | 'draw';

export interface GameState {
  board: Board;
  currentPlayer: Player;
  status: GameStatus;
  winner: Player;
  winningLine: number[] | null;
}

export interface AudioContextType {
  playUIClick: () => void;
  playPlaceX: () => void;
  playPlaceO: () => void;
  playWin: () => void;
  playDraw: () => void;
  playError: () => void;
}