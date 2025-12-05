import fs from "node:fs";

const rollGrid = fs.readFileSync('./rolls.txt', 'utf8');
const rollChar = '@';
const offsetCoords = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1]
]

const totalRolls = (rollMatrix) => rollMatrix.flat(2).map(isRoll).filter(Boolean).length;
const isRoll = (str) => str === rollChar;
const get = (arr, index) => (index < 0 || index >= arr.length) ? '.' : arr[index];
const processMatrix = (rollMatrix, runningSum) => {
  const startingRolls = totalRolls(rollMatrix);
  const resultMatrix = rollMatrix.map((row, rowIndex, matrix) => 
    row.map((cell, cellIndex) => {
      if (!isRoll(cell)) return cell;
      const numNeighbors = offsetCoords
        .map(([a, b]) => get(get(rollMatrix, rowIndex + a), cellIndex + b))
        .filter(isRoll)
        .length
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