import { getInput } from "../../utils";

const codes = getInput(__dirname)
  .split(",")
  .map((c) => parseInt(c));

function calculate(codes: number[], noun: number, verb: number): number {
  codes[1] = noun;
  codes[2] = verb;

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

function findCombination(codes: number[]): number {
  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      if (calculate([...codes], i, j) === 19690720) {
        return i * 100 + j;
      }
    }
  }

  return 0;
}

/** Part 1 */
const result = calculate([...codes], 12, 2);
console.log(result);

/** Part 2 */
const result2 = findCombination(codes);
console.log(result2);
