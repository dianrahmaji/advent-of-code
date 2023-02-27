import { getInput } from "../../utils";

const passports = getInput(__dirname)
  .split("\n\n")
  .map((passport) => passport.split("\n").map((line) => line.split(" ")))
  .map((passport) =>
    passport
      .reduce((acc, cur) => [...acc, ...cur], [])
      .map((entry) => entry.split(":"))
  )
  .map((passport) => Object.fromEntries(passport));

function isValid(passport: Record<string, string>): boolean {
  const fields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

  for (const field of fields) {
    if (!Object.keys(passport).includes(field)) return false;
  }

  return true;
}

/** Part 1 */
let result = passports.filter(isValid).length;
console.log(result);
