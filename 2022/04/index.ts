import { getInput } from "../../utils";

const content = getInput(__dirname);

function getId(start: number, end: number): number[] {
  let id = [];
  for (let i = start; i <= end; i++) {
    id.push(i);
  }

  return id;
}

function isFullyOverlap(a: number[], b: number[]): boolean {
  return (
    a.map((section) => b.includes(section)).filter(Boolean).length ===
      Math.min(a.length, b.length) &&
    b.map((section) => a.includes(section)).filter(Boolean).length ===
      Math.min(a.length, b.length)
  );
}

function isPartiallyOverlap(a: number[], b: number[]): boolean {
  return (
    a.map((section) => b.includes(section)).filter(Boolean).length > 0 &&
    b.map((section) => a.includes(section)).filter(Boolean).length > 0
  );
}

/**Part 1 */
const result = content
  .split("\n")
  .map((pair) =>
    pair
      .split(",")
      .map((sections) =>
        sections.split("-").map((section) => parseInt(section))
      )
      .map((sections) => getId(sections[0], sections[1]))
  )
  .map((ids) => isFullyOverlap(ids[0], ids[1]))
  .filter(Boolean).length;

console.log(result);

/**Part 2 */
const result2 = content
  .split("\n")
  .map((pair) =>
    pair
      .split(",")
      .map((sections) =>
        sections.split("-").map((section) => parseInt(section))
      )
      .map((sections) => getId(sections[0], sections[1]))
  )
  .map((ids) => isPartiallyOverlap(ids[0], ids[1]))
  .filter(Boolean).length;

console.log(result2);
