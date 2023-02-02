import { getInput } from "../../utils";

const content = getInput(__dirname);

interface Password {
  password: string;
  char: string;
  min: number;
  max: number;
}

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

function verifyPassword({ password, char, min, max }: Password): boolean {
  const length = [...password].filter((v) => v === char).length;

  return length <= max && length >= min;
}

function verifyPassword2({ password, char, min, max }: Password): boolean {
  const isFirstMatch = password[min - 1] === char;
  const isSecondMatch = password[max - 1] === char;

  return (isFirstMatch && !isSecondMatch) || (!isFirstMatch && isSecondMatch);
}

const parsed = content.split("\n").map((v) => parsePassword(v));

/** Part 1 */
const result = parsed.map((p) => verifyPassword(p)).filter(Boolean).length;
console.log(result);

/** Part 2 */
const result2 = parsed.map((p) => verifyPassword2(p)).filter(Boolean).length;
console.log(result2);
