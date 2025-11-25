import "./App.css";
import { useState } from "react";

function Square({ value, onSquareClick, disabled }) {
  return (
    <button className={`square ${disabled ? "disabled-square" : ""}`}  onClick={onSquareClick} disabled={disabled}>
      {value}
    </button>
  );
}

export default function App() {
  const [squares, setSquares] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);
  const [xIsNext, setXIsNext] = useState(true);
  const [status, setStatus] = useState(null);
  function handleClick(i, j) {
    const newSquares = [...squares];
    newSquares[i][j] = xIsNext ? "X" : "O";
    setSquares(newSquares);
    console.log(newSquares);
    setStatus(winner(newSquares));

    setXIsNext(!xIsNext);
  }

  function winner(sq) {
    for (let i = 0; i < 3; i++) {
      if (sq[i][0] == sq[i][1] && sq[i][0] == sq[i][2] && sq[i][0] != null) {
        return sq[i][0];
      }
    }
    for (let i = 0; i < 3; i++) {
      if (sq[0][i] == sq[1][i] && sq[0][i] == sq[2][i] && sq[i][0] != null) {
        return sq[0][i];
      }
    }
    for (let i = 0; i < 3; i++) {
      if (sq[0][0] === sq[1][1] && sq[0][0] === sq[2][2] && sq[0][0] !== null) {
        return sq[0][0];
      }

      if (sq[0][2] === sq[1][1] && sq[0][2] === sq[2][0] && sq[0][2] !== null) {
        return sq[0][2];
      }
    }

    return null;
  }

  function restartGame() {
    setSquares([
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ]);
    setXIsNext(true);
  }

  return (
    <div className="game">
      <div className="game-board">
        <div className="status">
          {status ? `Winner: ${status}` : `Next Player: ${xIsNext ? "X" : "O"}`}
        </div>

        <div className="board-row">
          <Square 
            value={squares[0][0]}
            onSquareClick={() => handleClick(0, 0)}
            disabled={status || squares[0][0] != null}
          />

          <Square
            value={squares[0][1]}
            onSquareClick={() => handleClick(0, 1)}
            disabled={status || squares[0][1] != null}
          />
          <Square
            value={squares[0][2]}
            onSquareClick={() => handleClick(0, 2)}
            disabled={status || squares[0][2] != null}
          />
        </div>
        <div className="board-row">
          <Square
            value={squares[1][0]}
            onSquareClick={() => handleClick(1, 0)}
            disabled={status || squares[1][0] != null}
          />
          <Square
            value={squares[1][1]}
            onSquareClick={() => handleClick(1, 1)}
            disabled={status || squares[1][1] != null}
          />
          <Square
            value={squares[1][2]}
            onSquareClick={() => handleClick(1, 2)}
            disabled={status || squares[1][2] != null}
          />
        </div>
        <div className="board-row">
          <Square
            value={squares[2][0]}
            onSquareClick={() => handleClick(2, 0)}
            disabled={status || squares[2][0] != null}
          />
          <Square
            value={squares[2][1]}
            onSquareClick={() => handleClick(2, 1)}
            disabled={status || squares[2][1] != null}
          />
          <Square
            value={squares[2][2]}
            onSquareClick={() => handleClick(2, 2)}
            disabled={status || squares[2][2] != null}
          />
        </div>

        {winner && (
          <button onClick={restartGame} className="restart-button">
            Restart Game
          </button>
        )}
      </div>
    </div>
  );
}
