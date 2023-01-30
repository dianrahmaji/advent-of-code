import { getInput } from "../../utils";

const content = getInput(__dirname);

interface Instruction {
  instruction: "on" | "off" | "toggle";
  from: [number, number];
  to: [number, number];
}

function parseInstruction(input: string): Instruction {
  const splitted = input.split(" ");

  if (splitted.length === 5) {
    splitted.shift();
  }

  const [instruction, from, , to] = splitted;

  return {
    instruction,
    from: from.split(",").map((v) => parseInt(v)),
    to: to.split(",").map((v) => parseInt(v)),
  } as Instruction;
}

function createGrid<T>(row: number, col: number, initial: T): T[][] {
  return new Array(row).fill(0).map(() => new Array(col).fill(initial));
}

function setUpLights(instructions: Instruction[], grid: boolean[][]) {
  for (const step of instructions) {
    const { instruction, from, to } = step;

    const [xStart, yStart] = from;
    const [xEnd, yEnd] = to;

    for (let i = xStart; i <= xEnd; i++) {
      for (let j = yStart; j <= yEnd; j++) {
        if (instruction === "on") {
          grid[j][i] = true;
        }

        if (instruction === "off") {
          grid[j][i] = false;
        }

        if (instruction === "toggle") {
          grid[j][i] = !grid[j][i];
        }
      }
    }
  }

  return grid;
}

function countActiveLights(lights: boolean[][]): number {
  return lights
    .map((r) => r.filter(Boolean).length)
    .reduce((acc, prev) => acc + prev, 0);
}

/** Part 1 */
const instructions = content.split("\n").map((i) => parseInstruction(i));
const lampGrid = createGrid(999, 999, false);

const lights = setUpLights(instructions, lampGrid);
const result = countActiveLights(lights);

console.log(result);
