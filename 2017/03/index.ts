import { parseLines } from "../../utils";

const data = parseLines(__dirname, parseInt);

function getLayer(value: number): number {
  return Math.ceil(Math.floor(Math.sqrt(value)) / 2);
}

function getLayerBiggestNumber(layer: number): number {
  return (layer * 2 + 1) ** 2;
}

function getCenter(root: number): number {
  return Math.ceil(root / 2);
}

function getDistanceFromCenter(
  value: number,
  root: number,
  center: number
): number {
  return (value % (root - 1)) - center;
}

// TODO: Handle case for squared number
// TODO: Handle number is in the left side
function getSteps(value: number): number {
  const layer = getLayer(value);
  const biggest = getLayerBiggestNumber(layer);
  const rootOfBiggest = Math.sqrt(biggest);
  const center = getCenter(rootOfBiggest);
  const distanceFromCenter = getDistanceFromCenter(
    value,
    rootOfBiggest,
    center
  );

  return layer + distanceFromCenter;
}

/** Part 1 */
const result = data.map((v) => getSteps(v));
console.log(result);
