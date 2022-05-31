import React, { useState, useEffect } from 'react';
import { getAvailableNumbers } from '../help';

function Possibles({ board, pos, setGrid, setMessage }) {
  const [possibles, setPosibles] = useState([]);

  useEffect(() => {
    const avails = getAvailableNumbers(board, pos);
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
  const checkPossible = number=>{
    for(let i=0;i<10;i++){
      if(possibles[i]===number) return true
    }
    return false
  }
  return (
    <div>
      {[0,1,2,3,4,5,6,7,8,9].map((opt) => (
        <button type="button" key={opt}
          onClick={checkPossible(opt) || opt==0?() => { updateGrid(opt);}:''}
          className={`possibles ${!checkPossible(opt) && opt !== 0?'inactive':''}`}>
          {opt === 0 ? 'X' : opt}
        </button>
      ))}

    </div>
  );
}

export default Possibles;
