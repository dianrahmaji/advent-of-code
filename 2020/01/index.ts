import { getInput } from "../../utils";

const content = getInput(__dirname)
  .split("\n")
  .map((v) => parseInt(v));

function calculateEntries(input: number[]): number {
  for (let i = 0; i < input.length - 1; i++) {
    for (let j = i + 1; j < input.length; j++) {
      if (input[i] + input[j] === 2020) return input[i] * input[j];
    }
  }
  return 0;
}

function calculateEntries2(input: number[]): number {
  for (let i = 0; i < input.length - 2; i++) {
    for (let j = i + 1; j < input.length - 1; j++) {
      for (let k = j + 1; k < input.length; k++)
        if (input[i] + input[j] + input[k] === 2020)
          return input[i] * input[j] * input[k];
    }
  }
  return 0;
}

/** Part 1 */
let result = calculateEntries(content);
console.log(result);

/** Part 2 */
result = calculateEntries2(content);
console.log(result);
