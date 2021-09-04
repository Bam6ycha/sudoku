function findEmptyCells(sudocu) {
  for (let i = 0; i < sudocu.length; i++) {
    for (let x = 0; x < sudocu.length; x++) {
      if (sudocu[i][x] === 0) {
        return [i, x];
      }
    }
  }
  return [-1, -1];
}

function isValidRow(sudocu, row, value) {
  for (let i = 0; i < sudocu[row].length; i++) {
    if (sudocu[row][i] === value) {
      return false;
    }
  }
  return true;
}
function isValidColumn(sudocu, column, value) {
  for (let i = 0; i < sudocu.length; i++) {
    if (sudocu[i][column] === value) {
      return false;
    }
  }
  return true;
}

function isValidSquare(sudocu, row, column, value) {
  let topSideOfsquare = Math.floor(column / 3) * 3;
  let leftSideOfSquare = Math.floor(row / 3) * 3;

  for (let i = 0; i < sudocu.length / 3; i++) {
    for (let x = 0; x < sudocu.length / 3; x++) {
      if (sudocu[leftSideOfSquare + i][topSideOfsquare + x] === value) {
        return false;
      }
    }
  }
  return true;
}

function isValidValue(sudocu, row, column, value) {
  if (
    isValidRow(sudocu, row, value) &&
    isValidColumn(sudocu, column, value) &&
    isValidSquare(sudocu, row, column, value)
  ) {
    return true;
  }
  return false;
}

module.exports = function sudocuSolver(sudocu) {
  let emptyCellRow = findEmptyCells(sudocu)[0];
  let emptyCellColumn = findEmptyCells(sudocu)[1];
  if (emptyCellRow === -1) return sudocu;

  for (let i = 1; i <= 9; i++) {
    if (isValidValue(sudocu, emptyCellRow, emptyCellColumn, i)) {
      sudocu[emptyCellRow][emptyCellColumn] = i;
      sudocuSolver(sudocu);
    }
  }
  if (findEmptyCells(sudocu)[0] !== -1) {
    sudocu[emptyCellRow][emptyCellColumn] = 0;
  }
  return sudocu;
};
