import { createHash } from "crypto";
import { getInput } from "../../utils";

const content = getInput(__dirname);

function hasLeadingZeros(hash: string, count: number): boolean {
  const re = new RegExp(`^0{${count}}`);
  return re.test(hash);
}

function getAdventCoin(input: string, zeros: number): number {
  let counter = 0;
  while (true) {
    let secret = `${input}${counter}`;
    const hash = createHash("md5").update(secret).digest("hex");

    if (hasLeadingZeros(hash, zeros)) {
      return counter;
    }

    counter++;
  }
}

/** Part 1 */
let result = content.split("\n").map((v) => getAdventCoin(v, 5));
console.log(result);

/** Part 2 */
result = content.split("\n").map((v) => getAdventCoin(v, 6));
console.log(result);
