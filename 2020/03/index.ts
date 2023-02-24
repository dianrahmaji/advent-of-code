import { getInput } from "../../utils";

const area = getInput(__dirname).split("\n");

function countTrees(area: string[], right: number, down: number): number {
  let trees = 0;

  for (let row = down, i = 1; row < area.length; row += down) {
    let col =
      down > right
        ? (row / down) % area[row].length
        : (right + (row - 1) * right) % area[row].length;

    if (area[row][col] === "#") {
      trees++;
    }
  }

  return trees;
}

/** Part 1 */
let result = countTrees(area, 3, 1);

console.log(result);

/** Part 2 */
const slopes = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
];

result = slopes
  .map(([right, down]) => countTrees(area, right, down))
  .reduce((acc, cur) => acc * cur, 1);

console.log(result);
