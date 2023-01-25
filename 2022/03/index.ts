import { getInput } from "../../utils";

const content = getInput(__dirname);

function getSharedItem(first: string, second: string): string {
  let shared = "";
  for (let i = 0; i < first.length; i++) {
    for (let j = 0; j < second.length; j++) {
      if (first[i] === second[j]) shared = first[i];
    }
  }

  return shared;
}

function getPriority(item: string): number {
  let ascii = item.charCodeAt(0);

  if (ascii <= 90) return ascii - 38;
  return ascii - 96;
}

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
