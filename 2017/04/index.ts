import { getLines } from "../../utils";

const passwords = getLines(__dirname);

function isValidPassword(password: string): boolean {
  const splitted = password.split(" ");
  let set = new Set();

  for (const val of splitted) {
    if (set.has(val)) {
      return false;
    }

    set.add(val);
  }

  return true;
}

function isValidPassword2(password: string): boolean {
  const splitted = password.split(" ").map((v) => [...v].sort().join(""));

  for (let i = 0; i < splitted.length - 1; i++) {
    for (let j = i + 1; j < splitted.length; j++) {
      if (splitted[i] === splitted[j]) return false;
    }
  }

  return true;
}

/** Part 1 */
let result = passwords.filter(isValidPassword).length;
console.log(result);

/** Part 2 */
result = passwords.filter(isValidPassword2).length;
console.log(result);
