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

function hasDisallowedContent(input: string): boolean {
  for (let i = 1; i < input.length; i++) {
    if (disallowed.has(`${input[i - 1]}${input[i]}`)) return true;
  }

  return false;
}

function isNiceString(input: string): boolean {
  if (hasDisallowedContent(input)) return false;

  if (hasDoubleCharInARow(input) && hasThreeVowels(input)) return true;

  return false;
}

function hasRepeatedPair(input: string): boolean {
  for (let i = 0; i < input.length - 3; i++) {
    const firstPair = `${input[i]}${input[i + 1]}`;

    for (let j = i + 2; j < input.length - 1; j++) {
      const secondPair = `${input[j]}${input[j + 1]}`;

      if (firstPair === secondPair) {
        return true;
      }
    }
  }
  return false;
}

function hasRepeatedChar(input: string): boolean {
  for (let i = 0; i < input.length - 2; i++) {
    if (input[i] === input[i + 2]) {
      return true;
    }
  }
  return false;
}

function isNiceString2(input: string): boolean {
  return hasRepeatedPair(input) && hasRepeatedChar(input);
}

/** Part 1 */
const result = content
  .split("\n")
  .map((s) => isNiceString(s))
  .filter(Boolean).length;

console.log(result);

/** Part 2 */
const result2 = content
  .split("\n")
  .map((s) => isNiceString2(s))
  .filter(Boolean).length;

console.log(result2);
