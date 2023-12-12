interface SquareProps {
  value: string | null;
  onClick: () => void;
  highlight: boolean;
}

const Square: React.FC<SquareProps> = ({ value, onClick, highlight }) => (
  <button
    className={`h-24 w-24 text-2xl font-bold ${highlight ? 'bg-yellow-300' : 'bg-white'}`}
    onClick={onClick}
  >
    {value}
  </button>
);

export default Square;