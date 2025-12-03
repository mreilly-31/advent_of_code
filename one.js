import fs from "node:fs";

const s = fs.readFileSync('./combo.txt', 'utf8').split('\n');
let d = 50, o = 0, t = 0;
for (const m of s) {
  if (Number(m.slice(1)) >= ((((m[0] > "M") * 2 - 1) === 1 ? (100 - (d % 100)) % 100 : d % 100) === 0 ? 100 : (((m[0] > "M") * 2 - 1) === 1 ? (100 - (d % 100)) % 100 : d % 100))) t += 1 + ~~((Number(m.slice(1)) - ((((m[0] > "M") * 2 - 1) === 1 ? (100 - (d % 100)) % 100 : d % 100) === 0 ? 100 : (((m[0] > "M") * 2 - 1) === 1 ? (100 - (d % 100)) % 100 : d % 100))) / 100);
  d = (d + ((m[0] > "M") * 2 - 1) * Number(m.slice(1))) % 100;
  if (d < 0) d += 100; if (d === 0) o++;
}

console.log({ o, t });


/**
 * easy to obfuscate if you write it normally then work backwards. becomes a fun challenge then
 */