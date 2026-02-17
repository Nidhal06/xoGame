import "./App.css";
import { useState, useEffect } from "react";

function Square({ value, onClick, isWinning }) {
  return (
    <button
      className={`square ${isWinning ? "win-square" : ""}`}
      onClick={onClick}
      disabled={value}
    >
      {value}
    </button>
  );
}

export default function App() {
  const emptyBoard = Array(3)
    .fill(null)
    .map(() => Array(3).fill(null));

  const [board, setBoard] = useState(emptyBoard);
  const [xIsNext, setXIsNext] = useState(true);
  const [winnerInfo, setWinnerInfo] = useState(null);

  function calculateWinner(b) {
    const lines = [
      { cells: [[0,0],[0,1],[0,2]], type: "row", index: 0 },
      { cells: [[1,0],[1,1],[1,2]], type: "row", index: 1 },
      { cells: [[2,0],[2,1],[2,2]], type: "row", index: 2 },
      { cells: [[0,0],[1,0],[2,0]], type: "col", index: 0 },
      { cells: [[0,1],[1,1],[2,1]], type: "col", index: 1 },
      { cells: [[0,2],[1,2],[2,2]], type: "col", index: 2 },
      { cells: [[0,0],[1,1],[2,2]], type: "diag1", index: 0 },
      { cells: [[0,2],[1,1],[2,0]], type: "diag2", index: 0 }
    ];

    for (let line of lines) {
      const [[a1,a2],[b1,b2],[c1,c2]] = line.cells;
      if (
        b[a1][a2] &&
        b[a1][a2] === b[b1][b2] &&
        b[a1][a2] === b[c1][c2]
      ) {
        return { player: b[a1][a2], ...line };
      }
    }
    return null;
  }

  function handleClick(i, j) {
    if (board[i][j] || winnerInfo) return;

    const newBoard = board.map(r => [...r]);
    newBoard[i][j] = xIsNext ? "X" : "O";

    const win = calculateWinner(newBoard);

    setBoard(newBoard);

    if (win) {
      setWinnerInfo(win);
    } else {
      setXIsNext(!xIsNext);
    }
  }

  function restart() {
    setBoard(emptyBoard);
    setWinnerInfo(null);
    setXIsNext(true);
  }

  return (
    <div className="game">
      <div className={`game-board ${winnerInfo ? "winner" : ""}`}>

        <div className="status">
          {winnerInfo
            ? `🎉 Winner: ${winnerInfo.player}`
            : `Next Player: ${xIsNext ? "X" : "O"}`}
        </div>

        <div className="board-wrapper">

          {winnerInfo && (
            <div
              className={`win-line ${winnerInfo.type} pos-${winnerInfo.index}`}
            />
          )}

          {board.map((row, i) => (
            <div key={i} className="board-row">
              {row.map((cell, j) => (
                <Square
                  key={j}
                  value={cell}
                  onClick={() => handleClick(i, j)}
                  isWinning={
                    winnerInfo?.cells.some(([r,c]) => r===i && c===j)
                  }
                />
              ))}
            </div>
          ))}
        </div>

        {winnerInfo && (
          <>
            <div className="confetti-container" />
            <button className="restart-button" onClick={restart}>
              Play Again
            </button>
          </>
        )}
      </div>
    </div>
  );
}
