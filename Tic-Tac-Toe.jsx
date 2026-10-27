const { useState } = React;

export function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const winner = winningCombinations.find(([a, b, c]) => {
    return (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    );
  });

  const winnerSymbol = winner ? squares[winner[0]] : null;
  const isDraw = !winnerSymbol && squares.every((square) => square !== null);

  const handleClick = (index) => {
    if (squares[index] || winnerSymbol || isDraw) {
      return;
    }

    const nextSquares = [...squares];
    nextSquares[index] = xIsNext ? "X" : "O";

    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <div className="board">
      <h1>Tic-Tac-Toe</h1>

      <p className="status">
        {winnerSymbol
          ? `Winner: ${winnerSymbol}`
          : isDraw
          ? "Draw"
          : `Next player: ${xIsNext ? "X" : "O"}`}
      </p>

      <div className="grid">
  {squares.map((square, index) => (
    <button
      key={index}
      className="square"
      onClick={() => handleClick(index)}
    >
      {square}
    </button>
  ))}
</div>

      <button id="reset" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
}
