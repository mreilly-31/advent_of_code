import fs from "node:fs";
const idData = fs.readFileSync('ids.txt', 'utf8');

const rangeHandler = {
  get(target, prop, receiver) {
    if (prop === 'includes') {
      return (searchValue, _) => searchValue >= target[0] && searchValue <= target[1];
    }
    if (prop === 'total') {
      return target[1] - target[0];
    }
    if (prop === 'start') {
      return target[0];
    }
    if (prop === 'end') {
      return target[1];
    }
    return Reflect.get(target, prop, receiver);
  },
}

const lines = idData.split('\n');
const rangeProxies = lines.filter(item => item.includes('-')).map(item => item.split('-').map(Number)).map(item => new Proxy(item, rangeHandler));
const availableIds = lines.filter(item => !item.includes('-') && item.length > 0).map(Number);
// part 1
const part1 = availableIds.filter((item) => rangeProxies.some(range => range.includes(item))).length;
console.log(part1);

// part 2
// off by ones are a pain here
const part2 = rangeProxies
  .sort((a, b) => a.start - b.start)
  .reduce((acc, curRange) => {
    if (!acc.length) return new Proxy([curRange], rangeHandler);
    const prevRange = acc[acc.length - 1];
    if (curRange.start <= prevRange.end + 1) {
      prevRange[1] = Math.max(curRange.end, prevRange.end);
      return acc;
    }
    acc.push(new Proxy([curRange.start, curRange.end], rangeHandler));
    return acc;
  }, [])
  .reduce((acc, [a, b]) => acc += b - a + 1, 0);

console.log(part2)