import { getLines } from "../../utils";

const s = getLines(__dirname);

function sum(s: string): number {
  const matches = [];

  for (let i = 0; i < s.length; i++) {
    const firstIdx = i;
    const secondIdx = (i + 1) % s.length;

    if (s[firstIdx] === s[secondIdx]) matches.push(s[firstIdx]);
  }

  return matches.map((v) => parseInt(v)).reduce((acc, cur) => acc + cur, 0);
}

function sum2(s: string): number {
  const matches = [];

  for (let i = 0; i < s.length / 2; i++) {
    if (s[i] === s[s.length / 2 + i]) matches.push(s[i]);
  }

  return matches.map((v) => parseInt(v)).reduce((acc, cur) => acc + cur, 0) * 2;
}

/** Part 1 */
const result = s.map((v) => sum(v));
console.log(result);

/** Part 2 */
const result2 = s.map((v) => sum2(v));
console.log(result2);
