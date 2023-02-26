import { getInput } from "../../utils";

const range = getInput(__dirname)
  .split("-")
  .map((v) => parseInt(v));

function hasDoubleAdjacent(input: string): boolean {
  for (let i = 0; i < input.length - 1; i++) {
    if (input[i] === input[i + 1]) return true;
  }
  return false;
}

function isNeverDecrease(input: string): boolean {
  for (let i = 0; i < input.length - 1; i++) {
    if (parseInt(input[i + 1]) < parseInt(input[i])) return false;
  }
  return true;
}

function calculate(start: number, end: number) {
  let count = 0;
  for (let i = start; i <= end; i++) {
    if (hasDoubleAdjacent(i.toString()) && isNeverDecrease(i.toString()))
      count++;
  }

  return count;
}

/** Part 1 */
const [start, end] = range;
const result = calculate(start, end);

console.log(result);
