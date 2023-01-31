import { getInput } from "../../utils";

const content = getInput(__dirname)
  .split("\n")
  .map((v) => parseInt(v));

function createMeasurementWindow(measurement: number[]): number[] {
  const measurementWindow: number[] = [];

  for (let i = 0; i < measurement.length - 2; i++) {
    let sum = 0;
    for (let j = i; j < i + 3; j++) {
      sum += measurement[j];
    }
    measurementWindow.push(sum);
  }

  return measurementWindow;
}

/**Part 1 */
let result = 0;
for (let i = 1; i < content.length; i++) {
  if (content[i] > content[i - 1]) result++;
}

console.log(result);

/**Part 2 */
let result2 = 0;
const window = createMeasurementWindow(content);
for (let i = 1; i < window.length; i++) {
  if (window[i] > window[i - 1]) result2++;
}
console.log(result2);
