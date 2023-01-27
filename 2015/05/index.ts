import { getInput } from "../../utils";

const content = getInput(__dirname);

const vowels = new Set(["a", "e", "i", "o", "u"]);
const disallowed = new Set(["ab", "cd", "pq", "xy"]);

function hasThreeVowels(input: string): boolean {
  let vowelCounts = 0;
  for (let i = 0; i < input.length; i++) {
    if (vowels.has(input[i])) vowelCounts++;

    if (vowelCounts === 3) {
      return true;
    }
  }

  return false;
}

function hasDoubleCharInARow(input: string): boolean {
  for (let i = 1; i < input.length; i++) {
    if (input[i - 1] === input[i]) {
      return true;
    }
  }

  return false;
}

function hasDissalowedContent(input: string): boolean {
  for (let i = 1; i < input.length; i++) {
    if (disallowed.has(`${input[i - 1]}${input[i]}`)) return true;
  }

  return false;
}

function isNiceString(input: string): boolean {
  if (hasDissalowedContent(input)) return false;

  if (hasDoubleCharInARow(input) && hasThreeVowels(input)) return true;

  return false;
}

/** Part 1 */
let result = content
  .split("\n")
  .map((s) => isNiceString(s))
  .filter(Boolean).length;

console.log(result);
