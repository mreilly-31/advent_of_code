import fs from "node:fs";

const joltages = fs.readFileSync("jolts.txt", "utf8");

// im not writing my own recursive .split(), just not happening
const jolts = joltages.split("\n");

let part1_sum = 0;
let part2_sum = 0;

const recursiveIter = (arr, index, work) => {
  if (index === arr.length) {
    return;
  }

  work(arr, index);

  return recursiveIter(arr, index + 1, work);
};

recursiveIter(jolts, 0, (arr, index) => {
  const jolt = arr[index];
  let bank = [];
  recursiveIter(jolt.split(""), 0, (arr, index) => {
    bank.push(Number(arr[index]))
  });
  let max = 0;
  recursiveIter(bank, 0, (arr, index) => {
    if (index < bank.length - 1 && bank[index] > max) {
      max = bank[index];
    }
  });
  let secondMax = 0;
  recursiveIter(bank, bank.indexOf(max) + 1, (arr, index) => {
    if (index < bank.length && bank[index] > secondMax) {
      secondMax = bank[index]
    }
  });
  part1_sum += parseInt(`${max}${secondMax}`);
});

// ===== PART 2 =====
const MAX_LEN = 12;

const calculate = (jolt, start = 0, remaining = MAX_LEN) => {
  if (remaining === 0) return [];
  const prevStart = jolt.length - remaining;
  const recursiveIter = (jolt, start, prevStart, best = -1, bestIdx = -1) => {
    if (start > prevStart) {
      return { best, bestIdx };
    }
    if (jolt[start] > best) {
      best = jolt[start];
      bestIdx = start;
    }

    return recursiveIter(jolt, start + 1, prevStart, best, bestIdx);
  };
  const { best, bestIdx } = recursiveIter(jolt, start, prevStart);
  return [best, ...calculate(jolt, bestIdx + 1, remaining - 1)];
};

recursiveIter(jolts, 0, (arr, index) => {
  const joltage = calculate(arr[index]);
  const iterSum = parseInt(joltage.join(""));
  part2_sum += iterSum;
});
console.log({ part1_sum, part2_sum });

/**
 * once you extract recursiveIter it's not that bad. just gross looking
 */