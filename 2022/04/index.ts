import { getInput } from "../../utils";

const content = getInput(__dirname);

function getId(start: number, end: number): number[] {
  let id = [];
  for (let i = start; i <= end; i++) {
    id.push(i);
  }

  return id;
}

function isOverlap(a: number[], b: number[]): boolean {
  return (
    a.map((section) => b.includes(section)).filter(Boolean).length ===
      Math.min(a.length, b.length) &&
    b.map((section) => a.includes(section)).filter(Boolean).length ===
      Math.min(a.length, b.length)
  );
}

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
  .map((ids) => isOverlap(ids[0], ids[1]))
  .filter(Boolean).length;

console.log(result);
