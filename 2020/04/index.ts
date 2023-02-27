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

function hasRequiredKeys(passport: Record<string, string>): boolean {
  const fields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

  for (const field of fields) {
    if (!Object.keys(passport).includes(field)) return false;
  }

  return true;
}

function validateBirthYear(byr: string): boolean {
  const value = parseInt(byr);
  return value >= 1920 && value <= 2002;
}

function validateIssueYear(iyr: string): boolean {
  const value = parseInt(iyr);
  return value >= 2010 && value <= 2020;
}

function validateExpirationYear(eyr: string): boolean {
  const value = parseInt(eyr);
  return value >= 2020 && value <= 2030;
}

function validateHeight(hgt: string): boolean {
  const value = parseInt(hgt.slice(0, -2));
  const unit = hgt.slice(-2);

  switch (unit) {
    case "cm": {
      return value >= 150 && value <= 193;
    }
    case "in": {
      return value >= 59 && value <= 76;
    }
    default:
      return false;
  }
}

function validateHairColor(hcl: string): boolean {
  const pattern = /#([0-9a-z]{6})$/i;
  return pattern.test(hcl);
}

function validateEyeColor(ecl: string): boolean {
  return ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(ecl);
}

function validatePassportId(pid: string): boolean {
  return pid.length === 9 && !isNaN(parseInt(pid));
}

function isValid(passport: Record<string, string>): boolean {
  const { byr, iyr, eyr, hgt, hcl, ecl, pid } = passport;

  if (!validateBirthYear(byr)) return false;
  if (!validateIssueYear(iyr)) return false;
  if (!validateExpirationYear(eyr)) return false;
  if (!validateHeight(hgt)) return false;
  if (!validateHairColor(hcl)) return false;
  if (!validateEyeColor(ecl)) return false;
  if (!validatePassportId(pid)) return false;

  return true;
}

/** Part 1 */
let result = passports.filter(hasRequiredKeys).length;
console.log(result);

/** Part 2 */
result = passports.filter(hasRequiredKeys).filter(isValid).length;
console.log(result);
