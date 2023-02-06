import { parseLines } from "../../utils";

const changes = parseLines(__dirname, parseInt);

/** Part 1 */
const result = changes.reduce((acc, cur) => acc + cur, 0);
console.log(result);

/** Part 2 */
let set = new Set();
let sum = 0;

while (!set.has(sum)) {
  for (let i = 0; i < changes.length; i++) {
    if (set.has(sum)) {
      console.log(sum);
      break;
    }
    set.add(sum);
    sum += changes[i];
  }
}
