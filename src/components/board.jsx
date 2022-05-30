import React, { useState } from 'react';
import Possibles from './avails.jsx';
import solve, { initBoard } from '../help';

function Board() {
  const [msg, setmsg] = useState('');
  const [solved, setSolved] = useState(false);
  const [grid, setGrid] = useState(initBoard());

  const [selected, setSelected] = useState([0, 0]);

  const solveBoard = () => {
    const solution = solve(grid);
    setGrid(solution);
    setSolved(true);
    let a = true;
    setSelected([...selected]); // to rerender Possibles child component
    if (!solution) {
      setmsg('Invalid Board!');
    } else setmsg('Here is your solution!');
  };
  const updatePosition = (row, col) => {
    setSelected([row, col]);
  };
  const resetBoard = () => {
    setGrid(initBoard());
    setSolved(!solved);
    setmsg('');
  };
  
  return (
    <>
      <h1>Sudoku Solver</h1>
      {grid.map((row, index) => (
        <div key={index} className="row">
          {row.map((el, i) => (
            <button
              type="button"
              key={i}
              // className={selected[0] === index && selected[1] === i ? 'el selected' : 'el'}
              className = {`el ${selected[0] === index && selected[1] === i ? 'selected':''}
                          ${(i+1)%3==0 && i!=8?'vert':''}
                          ${(index+1)%3==0 && index!=8?'hor':''}              
              `}
              onClick={() => { updatePosition(index, i); }}
            >
              {el === 0 ? '' : el}
            </button>
          ))}
        </div>
      ))}
      {setSolved
        ? <Possibles board={grid} pos={selected} setGrid={setGrid} setPos={setSelected} setMessage={setmsg}/> : ''}
      <button type="button" className="btn" onClick={solveBoard}>Solve</button>
      <button type="button" className="btn" onClick={resetBoard}>Reset</button>
      <div className='message'>{msg}</div>
    </>
  );
}

export default Board;
