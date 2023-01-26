import { getInput } from "../../utils";

const content = getInput(__dirname);

/**Part 1 */
const result1 = content.split("").reduce((prev, curr) => {
  const instruction = curr === "(" ? 1 : -1;
  return (prev += instruction);
}, 0);

console.log(result1);

/**Part 2 */
let result2 = "";
let position = 0;
const movements = content.split("");

for (let i = 0; i < movements.length; i++) {
  if (position === -1) break;

  const movement = movements[i];
  const instruction = movement === "(" ? 1 : -1;

  position += instruction;
  result2 += movement;
}

const instructionNumber = result2.length;

console.log(instructionNumber);
