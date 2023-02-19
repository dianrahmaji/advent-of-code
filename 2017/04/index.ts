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

/** Part 1 */
const result = passwords.filter(isValidPassword).length;
console.log(result);
