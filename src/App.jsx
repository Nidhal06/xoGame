import "./App.css";
import { useState } from "react";

function Square({ value, onSquareClick, disabled, isWinning, winType }) {
  return (
    <button
      className={`square
        ${disabled ? "disabled-square" : ""}
        ${isWinning ? `win ${winType}` : ""}
      `}
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
  const [winningInfo, setWinningInfo] = useState(null);

  function calculateWinner(board) {
    const lines = [
      { cells:[[0,0],[0,1],[0,2]], type:"row" },
      { cells:[[1,0],[1,1],[1,2]], type:"row" },
      { cells:[[2,0],[2,1],[2,2]], type:"row" },

      { cells:[[0,0],[1,0],[2,0]], type:"col" },
      { cells:[[0,1],[1,1],[2,1]], type:"col" },
      { cells:[[0,2],[1,2],[2,2]], type:"col" },

      { cells:[[0,0],[1,1],[2,2]], type:"diag1" },
      { cells:[[0,2],[1,1],[2,0]], type:"diag2" }
    ];

    for (let line of lines) {
      const [[a1,a2],[b1,b2],[c1,c2]] = line.cells;

      if (
        board[a1][a2] &&
        board[a1][a2] === board[b1][b2] &&
        board[a1][a2] === board[c1][c2]
      ) {
        return {
          player: board[a1][a2],
          cells: line.cells,
          type: line.type
        };
      }
    }

    return null;
  }

  function handleClick(i, j) {
    if (squares[i][j] || status) return;

    const newSquares = squares.map(row => [...row]);
    newSquares[i][j] = xIsNext ? "X" : "O";

    const win = calculateWinner(newSquares);

    setSquares(newSquares);

    if (win) {
      setStatus(win.player);
      setWinningInfo(win);
    }

    setXIsNext(!xIsNext);
  }

  function restartGame() {
    setSquares(emptyBoard.map(r => [...r]));
    setXIsNext(true);
    setStatus(null);
    setWinningInfo(null);
  }

  return (
    <div className="game">
      <div className={`game-board ${status ? "winner" : ""}`}>

        <div className={`status ${status ? "win-text" : ""}`}>
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
                winType={winningInfo?.type}
                isWinning={winningInfo?.cells.some(
                  ([r,c]) => r===i && c===j
                )}
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
