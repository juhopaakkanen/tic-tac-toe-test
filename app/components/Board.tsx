import React from 'react';
import Square from './Square'; // Adjust the path as necessary

interface BoardProps {
  squares: Array<string | null>;
  onClick: (i: number) => void;
  winningLine: number[]; 
}

const Board: React.FC<BoardProps> = ({ squares, onClick, winningLine }) => {
  const renderSquare = (i: number) => (
    <Square
      value={squares[i]}
      onClick={() => onClick(i)}
      highlight={winningLine.includes(i)}
    />
  );

  return (
    <div className="grid grid-cols-3 gap-2">
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i}>{renderSquare(i)}</div>
      ))}
    </div>
  );
};

export default Board;
