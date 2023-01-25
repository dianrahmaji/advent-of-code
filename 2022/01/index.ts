import { getInput } from "../../utils";

const content = getInput(__dirname)
  .split("\n\n")
  .map((elves) =>
    elves
      .split("\n")
      .map((cal) => parseInt(cal))
      .reduce((prev, acc) => prev + acc, 0)
  )
  .sort((a, b) => b - a);

let result;

/**Part 1 */
result = content[0];
console.log("Part 1", result);

/**Part 2 */
result = content.slice(0, 3).reduce((prev, acc) => prev + acc, 0);
console.log("Part 2", result);
