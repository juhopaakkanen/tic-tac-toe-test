'use client'

import React, { useState } from 'react';
import Board from './Board';

const PLAYER_X_EMOJI = '🚀'; // Emoji for player X
const PLAYER_O_EMOJI = '⭐'; // Emoji for player O


function isWinPossible(squares: Array<string | null>): boolean {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return lines.some(([a, b, c]) => {
    const values = [squares[a], squares[b], squares[c]];
    const hasSmiley = values.includes(PLAYER_X_EMOJI);
    const hasStar = values.includes(PLAYER_O_EMOJI);
    return !(hasSmiley && hasStar); // Line is not blocked if it doesn't have both emojis
  });
}

const Game: React.FC = () => {
  const [history, setHistory] = useState<Array<Array<string | null>>>([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const playerEmoji = xIsNext ? PLAYER_X_EMOJI : PLAYER_O_EMOJI;

  const resetGame = () => {
    setHistory([Array(9).fill(null)]);
    setStepNumber(0);
    setXIsNext(true);
  };

  const current = history[stepNumber];
  const [winner, winningLine] = calculateWinner(current);

  const isBoardFull = current.every(square => square !== null);
  const isBoardEmpty = current.every(square => square === null);
  const winStillPossible = isWinPossible(current);
  const isTie = !isBoardEmpty && (isBoardFull || (!winStillPossible && !winner));

  const handleClick = (i: number) => {
    const squares = current.slice();

    // Check if the game has ended (either win or tie) or square is already filled
    if (winner || isTie || squares[i]) {
      return;
    }

    squares[i] = playerEmoji;
    setHistory(history.concat([squares]));
    setStepNumber(history.length);
    setXIsNext(!xIsNext);
  };



  let status;
  if (winner) {
    status = <span className="text-green-500 font-bold">Winner: {winner}</span>;
  } else if (isTie) {
    // eslint-disable-next-line react/no-unescaped-entities
    status = <span className="text-orange-500 font-bold">It's a tie!</span>;
  } else {
    status = `Next player: ${playerEmoji}`;
  }

  return (

    <div className="game">
      <h1 className="text-2xl text-black font-bold text-center my-4 shadow-lg">
        Prompted Tic-Tac-Toe
      </h1>
      <div className="game-board">
        <Board squares={current} onClick={handleClick} winningLine={winningLine} />
      </div>
      <div className="game-info">
        <div className="text-lg">{status}</div>
        <button onClick={resetGame} className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Start New Game
        </button>
      </div>
    </div>
  );
};

function calculateWinner(squares: Array<string | null>): [string | null, number[]] {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [squares[a], lines[i]]; // Return the winner and the winning line
    }
  }

  return [null, []];
}

export default Game;
