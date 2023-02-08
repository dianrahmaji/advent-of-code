import { getLines } from "../../utils";

const spreadsheet = getLines(__dirname).map((r) =>
  r.split("\t").map((c) => parseInt(c))
);

const sorted = spreadsheet.map((r) => r.sort((a, b) => b - a));

function findDividedValue(r: number[]): number {
  for (let i = 0; i < r.length - 1; i++) {
    for (let j = i + 1; j < r.length; j++) {
      if (r[i] % r[j] === 0) return r[i] / r[j];
    }
  }

  return 0;
}

/** Part 1 */
const result = sorted
  .map((r) => Math.abs(r.slice(0, 1)[0] - r.slice(-1)[0]))
  .reduce((acc, cur) => acc + cur, 0);

console.log(result);

/** Part 2 */
const result2 = sorted
  .map((r) => findDividedValue(r))
  .reduce((acc, cur) => acc + cur, 0);
console.log(result2);
