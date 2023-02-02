import { getInput } from "../../utils";

const content = getInput(__dirname);

//TODO: Parse with RegEx
function parsePassword(input: string) {
  const [rule, password] = input.split(": ");
  const [count, char] = rule.split(" ");
  const [min, max] = count.split("-");

  return {
    password,
    char,
    min: parseInt(min),
    max: parseInt(max),
  };
}

function verifyPassword({
  password,
  char,
  min,
  max,
}: {
  password: string;
  char: string;
  min: number;
  max: number;
}) {
  const length = [...password].filter((v) => v === char).length;

  return length <= max && length >= min;
}

/** Part 1 */
const result = content
  .split("\n")
  .map((v) => parsePassword(v))
  .map((p) => verifyPassword(p))
  .filter(Boolean).length;

console.log(result);
