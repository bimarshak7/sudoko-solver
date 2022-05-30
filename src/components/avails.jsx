import React, { useState, useEffect } from 'react';
import { getAvailableNumbers } from '../help';

function Possibles({ board, pos, setGrid, setMessage }) {
  const [possibles, setPosibles] = useState([]);

  useEffect(() => {
    const avails = getAvailableNumbers(board, pos);
    avails.unshift(0);
    setPosibles(avails, board, possibles);
  }, [pos,board]);

  const updateGrid = (opt) => {
    const avails = getAvailableNumbers(board, pos);
    avails.unshift(0);
    setPosibles(avails, board, possibles);
    board[pos[0]][pos[1]] = opt;
    board = [...board];
    setGrid(board);
    setMessage('')
  };
  return (
    <div>
      {possibles.map((opt) => (
        <button type="button" key={opt} onClick={() => { updateGrid(opt);}} className="possibles">
          {opt === 0 ? 'X' : opt}
        </button>
      ))}

    </div>
  );
}

export default Possibles;
