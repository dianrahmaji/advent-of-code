import { getInput } from "../../utils";

const area = getInput(__dirname).split("\n");

/** Part 1 */
let trees = 0;

for (let row = 1; row < area.length; row++) {
  let col = (3 + (row - 1) * 3) % area[row].length;
  if (area[row][col] === "#") trees++;
}

console.log(trees);
