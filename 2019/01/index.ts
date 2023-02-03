import { getInput, getLines, parseLines } from "../../utils";

const masses = parseLines(__dirname, parseInt);

function calculateFuel(mass: number): number {
  return Math.floor(mass / 3) - 2;
}

function calculateCumulativeFuel(mass: number): number {
  let fuel = calculateFuel(mass);
  let cumulativeFuel = fuel;

  while (fuel > 0) {
    fuel = Math.max(0, calculateFuel(fuel));
    cumulativeFuel += fuel;
  }

  return cumulativeFuel;
}

/** Part 1 */
let result = masses
  .map((m) => calculateFuel(m))
  .reduce((acc, cur) => acc + cur, 0);
console.log(result);

/** Part 2 */
result = masses
  .map((m) => calculateCumulativeFuel(m))
  .reduce((acc, prev) => acc + prev, 0);
console.log(result);
