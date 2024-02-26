import { useState } from "react";
import Square from "./Square";
import styles from "./Board.module.css";

const Board = () => {
  const [state, setState] = useState(Array(9).fill(null));
  const [xTurn, setxTurn] = useState(true);
  const [sortOrder, setSortOrder] = useState("asc");
  const [moveHistory, setMoveHistory] = useState([]);

  const checkWinner = () => {
    const winnerLogic = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < winnerLogic.length; i++) {
      const [a, b, c] = winnerLogic[i];
      if (state[a] !== null && state[a] === state[b] && state[a] === state[c]) {
        return state[a];
      }
    }
    return false;
  };

  const isWinner = checkWinner();

  const handleClick = (index) => {
    if (state[index]) return;

    const copyState = [...state];
    copyState[index] = xTurn ? "X" : "O";
    setState(copyState);
    setxTurn(!xTurn);
    setMoveHistory([...moveHistory, { index, player: xTurn ? "X" : "O" }]);
  };
  const handleReset = () => {
    setState(Array(9).fill(null));
    setMoveHistory([]);
  };

  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const sortedMoveHistory = moveHistory.sort((a, b) => {
    if (sortOrder === "asc") {
      return a.index - b.index;
    } else {
      return b.index - a.index;
    }
  });

  const boardRows = [];

  for (let i = 0; i < 3; i++) {
    const boardRow = [];

    for (let j = 0; j < 3; j++) {
      const index = i * 3 + j;
      boardRow.push(
        <Square
          key={index}
          onClick={() => handleClick(index)}
          value={state[index]}
        />
      );
    }

    boardRows.push(
      <div key={i} className={styles.board_row}>
        {boardRow}
      </div>
    );
  }

  return (
    <div className={styles.Board}>
      {isWinner ? <>{isWinner} won the game</> : <>{boardRows}</>}
      <button onClick={handleReset}>Play Again</button>
      <button onClick={handleSort}>Sort Moves</button>
      <ul className="move-history">
        {sortedMoveHistory.map((move, index) => (
          <li key={index}>
            {move.player} at ({Math.floor(move.index / 3) + 1},{" "}
            {(move.index % 3) + 1})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Board;
