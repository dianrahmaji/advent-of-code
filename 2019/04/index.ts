import { getInput, range } from "../../utils";

const [start, end] = getInput(__dirname)
  .split("-")
  .map((v) => parseInt(v));

function hasDoubleAdjacent(input: string): boolean {
  for (let i = 0; i < input.length - 1; i++) {
    if (input[i] === input[i + 1]) return true;
  }
  return false;
}

function hasDuobleLargestAdjacent(input: string): boolean {
  let map = new Map<number, number>();

  for (let i = 0; i < input.length; i++) {
    map.set(parseInt(input[i]), (map.get(parseInt(input[i])) || 0) + 1);
  }

  let count = [...map].sort((a, b) => b[0] - a[0]).map(([, count]) => count);

  for (let i = 0; i < count.length; i++) {
    if (count[i] === 2) return true;
  }

  return false;
}

function isNeverDecrease(input: string): boolean {
  for (let i = 0; i < input.length - 1; i++) {
    if (parseInt(input[i + 1]) < parseInt(input[i])) return false;
  }
  return true;
}

let passwords = range(end - start + 1, start);

/** Part 1 */
let result = passwords
  .filter((p) => isNeverDecrease(p.toString()))
  .filter((p) => hasDoubleAdjacent(p.toString())).length;

console.log(result);

/** Part 2 */
let result2 = passwords
  .filter((p) => isNeverDecrease(p.toString()))
  .filter((p) => hasDuobleLargestAdjacent(p.toString())).length;

console.log(result2);
