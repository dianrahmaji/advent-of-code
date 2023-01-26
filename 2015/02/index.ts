import { getInput } from "../../utils";

const content = getInput(__dirname);

function calculatePaper(dimension: number[]): number {
  const [length, width, height] = dimension;

  const surfaces = [length * width, width * height, height * length];
  const totalSurfaceArea = surfaces
    .map((v) => v * 2)
    .reduce((prev, acc) => prev + acc);

  const slack = surfaces.reduce((prev, acc) => Math.min(prev, acc));

  return totalSurfaceArea + slack;
}

function calculateRibbon(dimension: number[]): number {
  const wrap = dimension
    .sort((a, b) => a - b)
    .slice(0, 2)
    .map((v) => v * 2)
    .reduce((prev, acc) => prev + acc);

  const bow = dimension.reduce((prev, acc) => prev * acc);

  console.log({ wrap, bow });

  return wrap + bow;
}

const raw = content
  .split("\n")
  .map((box) => box.split("x").map((dimension) => parseInt(dimension)));

/** Part 1 */
const result = raw
  .map((v) => calculatePaper(v))
  .reduce((prev, acc) => prev + acc);

console.log(result);

/** Part 2 */
const result2 = raw
  .map((v) => calculateRibbon(v))
  .reduce((prev, acc) => prev + acc);
console.log(result2);
