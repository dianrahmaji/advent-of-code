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

function setUpLights(instructions: Instruction[], lights: boolean[][]) {
  for (const step of instructions) {
    const { instruction, from, to } = step;

    const [colStart, rowStart] = from;
    const [colEnd, rowEnd] = to;

    for (let c = colStart; c <= colEnd; c++) {
      for (let r = rowStart; r <= rowEnd; r++) {
        if (instruction === "on") {
          lights[r][c] = true;
        }

        if (instruction === "off") {
          lights[r][c] = false;
        }

        if (instruction === "toggle") {
          lights[r][c] = !lights[r][c];
        }
      }
    }
  }

  return lights;
}

function countActiveLights(lights: boolean[][]): number {
  return lights
    .map((r) => r.filter(Boolean).length)
    .reduce((acc, prev) => acc + prev, 0);
}

function adjustBrightness(
  instructions: Instruction[],
  lights: number[][]
): number[][] {
  for (const step of instructions) {
    const { instruction, from, to } = step;

    const [colStart, rowStart] = from;
    const [colEnd, rowEnd] = to;

    for (let c = colStart; c <= colEnd; c++) {
      for (let r = rowStart; r <= rowEnd; r++) {
        if (instruction === "on") {
          lights[r][c]++;
        }

        if (instruction === "off") {
          lights[r][c] = Math.max(0, lights[r][c] - 1);
        }

        if (instruction === "toggle") {
          lights[r][c] += 2;
        }
      }
    }
  }

  return lights;
}

function calculateBrightness(lights: number[][]): number {
  return lights
    .map((r) => r.reduce((acc, cur) => acc + cur, 0))
    .reduce((acc, cur) => acc + cur, 0);
}

const instructions = content.split("\n").map((i) => parseInstruction(i));

/** Part 1 */
const lampGrid = createGrid(1000, 1000, false);

const lights = setUpLights(instructions, lampGrid);
const result = countActiveLights(lights);

console.log(result);

/**Part 2 */
const lampGrid2 = createGrid(1000, 1000, 0);

const lights2 = adjustBrightness(instructions, lampGrid2);
const result2 = calculateBrightness(lights2);

console.log(result2);

//TODO: Create utility function to createGrid
