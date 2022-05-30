function getNextUnassigned(board) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === 0) return [i, j];
    }
  }
  return null;
}

function itsOk(board, location, value) {
  for (let i = 0; i < 9; i++) {
    if (value === board[location[0]][i]) return false;
  }
  for (let i = 0; i < 9; i++) {
    if (value === board[i][location[1]]) return false;
  }
  const starterRow = Math.floor(location[0] / 3) * 3;
  const starterCol = Math.floor(location[1] / 3) * 3;
  for (let i = starterRow; i < starterRow + 3; i++) {
    for (let j = starterCol; j < starterCol + 3; j++) {
      if (value === board[i][j]) return false;
    }
  }
  return true;
}

function getAvailableNumbers(board, location) {
  const availableNumbers = [];
  for (let i = 1; i < 10; i++) {
    if (itsOk(board, location, i)) {
      availableNumbers.push(i);
    }
  }
  return availableNumbers;
}

function solve(board) {
  const next = getNextUnassigned(board);
  if (next === null) return board;
  for (let i = 1; i < 10; i++) {
    if (itsOk(board, next, i)) {
      board[next[0]][next[1]] = i;
      const tmpAns = solve(board);
      if (tmpAns !== false) return tmpAns;
      board[next[0]][next[1]] = 0;
    }
  }
  return false;
}

function initBoard() {
  const rows = 9;
  const cols = 9;
  return Array.from({ length: rows }, () => Array(cols).fill(0));
}

export default solve;
export { initBoard, getAvailableNumbers };
