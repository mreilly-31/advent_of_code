import fs from "node:fs";

const rollGrid = fs.readFileSync('./rolls.txt', 'utf8');
const rollChar = '@';

const totalRolls = (rollMatrix) => rollMatrix.flat(2).map(isRoll).filter(Boolean).length;
const isRoll = (str) => str === rollChar;
const get = (arr, index) => (index < 0 || index >= arr.length) ? '.' : arr[index];
const processMatrix = (rollMatrix, runningSum) => {
  const startingRolls = totalRolls(rollMatrix);
  const resultMatrix = rollMatrix.map((row, rowIndex, matrix) => 
    row.map((cell, cellIndex) => {
      if (!isRoll(cell)) return cell;
      const ul = get(get(matrix, rowIndex - 1), cellIndex - 1);
      const ur = get(get(matrix, rowIndex - 1), cellIndex + 1);
      const bl = get(get(matrix, rowIndex + 1), cellIndex - 1);
      const br = get(get(matrix, rowIndex + 1), cellIndex + 1);
      const l = get(get(matrix, rowIndex), cellIndex - 1);
      const r = get(get(matrix, rowIndex), cellIndex + 1);
      const t = get(get(matrix, rowIndex - 1), cellIndex);
      const b = get(get(matrix, rowIndex + 1), cellIndex);
      const numNeighbors = [ul, ur, bl, br, l, r, t, b].filter(isRoll).length
      if (numNeighbors >= 0 && numNeighbors < 4) return 'X';
      return rollChar;
    })
  );
  const endingRolls = totalRolls(resultMatrix);
  const rollsRemoved = startingRolls - endingRolls;
  // to do part 1, just always return and don't recurse
  if (rollsRemoved === 0) {
    return runningSum;
  }
  return processMatrix(resultMatrix, runningSum + rollsRemoved);
}

const totalRemoved = processMatrix(rollGrid.split('\n').map(row => row.split('')), 0);

console.log(totalRemoved);