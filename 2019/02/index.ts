import { getInput } from "../../utils";

const codes = getInput(__dirname)
  .split(",")
  .map((c) => parseInt(c));

function calculate(codes: number[]): number {
  for (let i = 0; i < codes.length; i += 4) {
    const opcode = codes[i];
    const first = codes[i + 1];
    const second = codes[i + 2];
    const result = codes[i + 3];

    if (opcode === 1) {
      codes[result] = codes[first] + codes[second];
    } else if (opcode === 2) {
      codes[result] = codes[first] * codes[second];
    } else {
      break;
    }
  }

  return codes[0];
}

/** Part 1 */
const result = calculate(codes);
console.log(result);
