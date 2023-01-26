import { getInput } from "../../utils";

const content = getInput(__dirname);

/**Part 1 */
const result1 = content.split("").reduce((prev, curr) => {
  const instruction = curr === "(" ? 1 : -1;
  return (prev += instruction);
}, 0);

console.log(result1);
