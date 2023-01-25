import { getInput } from "../../utils";

const content = getInput(__dirname);

function getSharedItem(first: string, second: string): string | undefined {
  let shared = "";
  for (let i = 0; i < first.length; i++) {
    for (let j = 0; j < second.length; j++) {
      if (first[i] === second[j]) return (shared = first[i]);
    }
  }
}

function getSharedItem2(
  first: string,
  second: string,
  third: string
): string | undefined {
  let shared = "";

  for (let i = 0; i < first.length; i++) {
    for (let j = 0; j < second.length; j++) {
      for (let k = 0; k < third.length; k++)
        if (
          first[i] === second[j] &&
          first[i] === third[k] &&
          second[j] === third[k]
        )
          return (shared = first[i]);
    }
  }
}

function getPriority(item?: string): number {
  if (item === undefined) return 0;
  let ascii = item.charCodeAt(0);

  if (ascii <= 90) return ascii - 38;
  return ascii - 96;
}

/**Part 1 */
const result = content
  .split("\n")
  .map((rucksack) =>
    getSharedItem(
      rucksack.slice(0, rucksack.length / 2),
      rucksack.slice(rucksack.length / 2, rucksack.length)
    )
  )
  .map((item) => getPriority(item))
  .reduce((prev, acc) => prev + acc, 0);

console.log(result);

/**Part 2 */
const teams: string[][] = [];

content.split("\n").forEach((rucksack, idx) => {
  if (idx % 3 === 0) {
    teams.push([rucksack]);
    return;
  }
  teams[teams.length - 1].push(rucksack);
});

const result2 = teams
  .map((rucksacks) => getSharedItem2(rucksacks[0], rucksacks[1], rucksacks[2]))
  .map((item) => getPriority(item))
  .reduce((prev, acc) => prev + acc, 0);
console.log(result2);
