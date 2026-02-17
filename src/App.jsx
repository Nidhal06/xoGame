import "./App.css";
import { useState } from "react";

function Square({ value, onSquareClick, disabled, isWinning }) {
  return (
    <button
      className={`square
        ${disabled ? "disabled-square" : ""}
        ${isWinning ? "win-square" : ""}
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
      { cells:[[0,0],[0,1],[0,2]], type:"row", index:0 },
      { cells:[[1,0],[1,1],[1,2]], type:"row", index:1 },
      { cells:[[2,0],[2,1],[2,2]], type:"row", index:2 },

      { cells:[[0,0],[1,0],[2,0]], type:"col", index:0 },
      { cells:[[0,1],[1,1],[2,1]], type:"col", index:1 },
      { cells:[[0,2],[1,2],[2,2]], type:"col", index:2 },

      { cells:[[0,0],[1,1],[2,2]], type:"diag1", index:0 },
      { cells:[[0,2],[1,1],[2,0]], type:"diag2", index:0 }
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
          type: line.type,
          index: line.index
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
    } else {
      setXIsNext(!xIsNext);
    }
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
            ? `🎉 Winner: ${status}`
            : `Next Player: ${xIsNext ? "X" : "O"}`}
        </div>

        <div className="board-wrapper">

          {winningInfo && (
            <div
              className={`win-line ${winningInfo.type} pos-${winningInfo.index}`}
            />
          )}

          {squares.map((row, i) => (
            <div className="board-row" key={i}>
              {row.map((cell, j) => (
                <Square
                  key={j}
                  value={cell}
                  onSquareClick={() => handleClick(i, j)}
                  disabled={status || cell !== null}
                  isWinning={winningInfo?.cells.some(
                    ([r,c]) => r===i && c===j
                  )}
                />
              ))}
            </div>
          ))}
        </div>

        {status && (
          <button onClick={restartGame} className="restart-button">
            Play Again
          </button>
        )}
      </div>
    </div>
  );
}
