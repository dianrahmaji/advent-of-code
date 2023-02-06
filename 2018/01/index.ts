import { parseLines } from "../../utils";

const changes = parseLines(__dirname, parseInt);

/** Part 1 */
const result = changes.reduce((acc, cur) => acc + cur, 0);
console.log(result);
