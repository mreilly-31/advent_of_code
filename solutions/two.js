import fs from "node:fs";

const rangeList = fs.readFileSync('ids.txt', 'utf8');
const ranges = rangeList.split(',');

function* parseRange(rangeArr) {
  for (let i = 0; i < rangeArr.length; i++) {
    const [start_id, end_id] = rangeArr[i].split('-');
    const range = new Array(Number(end_id) - Number(start_id) + 1).fill(0).map((_, index) => Number(start_id) + index);
    yield range;
  }
}

const chunkString = (str, stepSize) => {
  if (str.length % stepSize !== 0) return false;
  const chunk_1 = str.slice(0, stepSize);
  for (let i = stepSize; i < str.length; i += stepSize) {
    if (str.slice(i, stepSize + i) !== chunk_1) {
      return false;
    }
  }
  return true;
}

const checkRange = (range) => {
  let count = 0;
  let invalids_part1 = [];
  let invalids_part2 = [];
  for (const num of range) {
    const strNum = `${num}`;
    const midway = Math.floor(strNum.length / 2);
    if (strNum.length % 2 === 0) {
      if (strNum.slice(0, midway) === strNum.slice((midway))) {
        count++;
        invalids_part1.push(num)
      }
    };
    for (let i = 1; i <= midway; i++) {
      if (strNum.length % i !== 0) continue; 
      if (chunkString(strNum, i)) {
        invalids_part2.push(num);
        break;
      }
    }
  }
  return { count, invalids_part1, invalids_part2 };
}

let p1_sum = 0;
let p2_sum = 0;
for (const range of parseRange(ranges)) {
  const res = checkRange(range);
  p1_sum += res.invalids_part1.reduce((acc, cur) => acc += cur, 0);
  p2_sum += res.invalids_part2.reduce((acc, cur) => acc += cur, 0);
}

console.log({ p1_sum, p2_sum })

/**
 * This one's kind of a lazy check of the box on the twist.
 */