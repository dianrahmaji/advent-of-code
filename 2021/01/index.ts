import { getInput } from "../../utils";

const content = getInput(__dirname)
  .split("\n")
  .map((v) => parseInt(v));

/**Part 1 */
let result = 0;
for (let i = 1; i < content.length; i++) {
  if (content[i] > content[i - 1]) result++;
}

console.log(result);
