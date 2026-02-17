import "./App.css";
import { useState } from "react";

function Square({ value, onSquareClick, disabled }) {
  return (
    <button
      className={`square ${disabled ? "disabled-square" : ""}`}
      onClick={onSquareClick}
      disabled={disabled}
    >
      {value}
    </button>
  );
}

export default function App() {
  const emptyBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  const [squares, setSquares] = useState(emptyBoard);
  const [xIsNext, setXIsNext] = useState(true);
  const [status, setStatus] = useState(null);

  function calculateWinner(board) {
    // rows
    for (let i = 0; i < 3; i++) {
      if (
        board[i][0] === board[i][1] &&
        board[i][0] === board[i][2] &&
        board[i][0] !== null
      ) {
        return board[i][0];
      }
    }

    // columns
    for (let i = 0; i < 3; i++) {
      if (
        board[0][i] === board[1][i] &&
        board[0][i] === board[2][i] &&
        board[0][i] !== null
      ) {
        return board[0][i];
      }
    }

    // diagonals
    if (
      board[0][0] === board[1][1] &&
      board[0][0] === board[2][2] &&
      board[0][0] !== null
    ) {
      return board[0][0];
    }

    if (
      board[0][2] === board[1][1] &&
      board[0][2] === board[2][0] &&
      board[0][2] !== null
    ) {
      return board[0][2];
    }

    return null;
  }

  function handleClick(i, j) {
    if (squares[i][j] || status) return;

    // deep copy board
    const newSquares = squares.map(row => [...row]);
    newSquares[i][j] = xIsNext ? "X" : "O";

    const win = calculateWinner(newSquares);

    setSquares(newSquares);
    setStatus(win);
    setXIsNext(!xIsNext);
  }

  function restartGame() {
    setSquares(emptyBoard.map(row => [...row]));
    setXIsNext(true);
    setStatus(null);
  }

  return (
    <div className="game">
      <div className="game-board">

        <div className="status">
          {status
            ? `Winner: ${status}`
            : `Next Player: ${xIsNext ? "X" : "O"}`}
        </div>

        {squares.map((row, i) => (
          <div className="board-row" key={i}>
            {row.map((cell, j) => (
              <Square
                key={j}
                value={cell}
                onSquareClick={() => handleClick(i, j)}
                disabled={status || cell !== null}
              />
            ))}
          </div>
        ))}

        {status && (
          <button onClick={restartGame} className="restart-button">
            Restart Game
          </button>
        )}

      </div>
    </div>
  );
}
