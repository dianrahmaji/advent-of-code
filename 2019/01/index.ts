import { getInput } from "../../utils";

const masses = getInput(__dirname)
  .split("\n")
  .map((v) => parseInt(v));

function calculateFuel(mass: number): number {
  return Math.floor(mass / 3) - 2;
}

/** Part 1 */
const result = masses
  .map((m) => calculateFuel(m))
  .reduce((acc, cur) => acc + cur, 0);
console.log(result);
