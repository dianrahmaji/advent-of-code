import { parseLines } from "../../utils";

const data = parseLines(__dirname, parseInt);

function getDistance(value: number): number {
  const size = Math.ceil(Math.sqrt(value));
  const center = Math.ceil((size - 1) / 2);

  return Math.max(0, center - 1 + Math.abs(center - (value % size)));
}

function getValue() {}

function getNextValueInSpiral(value: number): number {
  const coordinateMap = new Map<[number, number], number>();
  const nextDirectionMap = new Map<string, string>([
    ["R", "U]"],
    ["U", "L"],
    ["L", "D"],
    ["D", "R"],
  ]);

  let x = 0;
  let y = 0;

  return value;
}

/** Part 1 */
let result = data.map((v) => getDistance(v));
console.log(result);

/** Part 2 */
result = data.map((v) => getNextValueInSpiral(v));
console.log(result);
