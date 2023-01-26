import { getInput } from "../../utils";

const content = getInput(__dirname);

function createStack(cargo: string): string[][] {
  const splitted = cargo.split("\n");
  const length = splitted.length;
  const crates = splitted.slice(0, length - 1);
  const stackCount = (splitted[length - 1].length + 1) / 4;

  const stacks = Array(stackCount)
    .fill(0)
    .map(() => new Array(0));

  [...crates].reverse().forEach((line) => {
    let stackNumber = 0;
    for (let i = 1; i < line.length; i += 4, stackNumber++) {
      if (line[i] === " ") continue;
      stacks[stackNumber].push(line[i]);
    }
  });

  return stacks;
}

function createRearrangement(procedures: string) {
  const rearrangements = procedures.split("\n").map((p) =>
    p
      .split(" ")
      .filter((_, idx) => idx % 2 === 1)
      .map((v) => parseInt(v))
  );

  return rearrangements;
}

function rearrange(stacks: string[][], rearrangements: number[][]): string[][] {
  for (let i = 0; i < rearrangements.length; i++) {
    const [move, from, to] = rearrangements[i];

    for (let i = 0; i < move; i++) {
      stacks[to - 1].push(stacks[from - 1].pop() as string);
    }
  }

  return stacks;
}

function getStackTops(stacks: string[][]): string {
  let tops = "";
  for (let i = 0; i < stacks.length; i++) {
    const topIdx = stacks[i].length - 1;
    if (topIdx === -1) continue;
    tops += stacks[i][topIdx];
  }

  return tops;
}

const [cargo, procedures] = content.split("\n\n");

const stacks = createStack(cargo);
const rearrangements = createRearrangement(procedures);

/**Part 1 */
const rearrangedStacks = rearrange(stacks, rearrangements);
const tops = getStackTops(rearrangedStacks);

console.log("Part 1", tops);
