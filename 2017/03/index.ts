import { parseLines } from "../../utils";

const data = parseLines(__dirname, parseInt);

function getDistance(value: number): number {
  const size = Math.ceil(Math.sqrt(value));
  const center = Math.ceil((size - 1) / 2);

  return Math.max(0, center - 1 + Math.abs(center - (value % size)));
}

/** Part 1 */
const result = data.map((v) => getDistance(v));
console.log(result);
