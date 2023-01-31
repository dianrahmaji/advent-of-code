import { getInput } from "../../utils";

const content = getInput(__dirname).split("\n");

function parseCommands(commands: string[]): [string, number][] {
  return commands
    .map((c) => c.split(" "))
    .map(([dir, val]) => [dir, parseInt(val)]);
}

function calculateResult(commands: [string, number][]): number {
  let x = 0;
  let y = 0;

  commands.forEach(([dir, val]) => {
    switch (dir) {
      case "forward":
        x += val;
        break;
      case "up":
        y -= val;
        break;
      case "down":
        y += val;
        break;
    }
  });

  return x * y;
}

function calculateResult2(commands: [string, number][]): number {
  let x = 0;
  let y = 0;
  let aim = 0;

  commands.forEach(([dir, val]) => {
    switch (dir) {
      case "forward":
        x += val;
        y += aim * val;
        break;
      case "up":
        aim -= val;
        break;
      case "down":
        aim += val;
        break;
    }
  });

  return x * y;
}

const commands = parseCommands(content);

/**Part 1 */
const result = calculateResult(commands);
console.log(result);

/**Part 2 */
const result2 = calculateResult2(commands);
console.log(result2);
