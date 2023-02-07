import { getLines } from "../../utils";

const spreadsheet = getLines(__dirname).map((r) =>
  r.split("\t").map((c) => parseInt(c))
);

/** Part 1 */
const result = spreadsheet
  .map((r) => r.sort((a, b) => a - b))
  .map((r) => Math.abs(r.slice(0, 1)[0] - r.slice(-1)[0]))
  .reduce((acc, cur) => acc + cur, 0);

console.log(result);
