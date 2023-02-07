import { getLines } from "../../utils";

const ids = getLines(__dirname);

function calculateAppearance(id: string) {
  let map = new Map<string, number>();
  let double = false;
  let triple = false;

  for (const char of id) {
    map.set(char, (map.get(char) || 0) + 1);
  }

  for (const [, val] of map) {
    switch (val) {
      case 2:
        double = true;
        break;
      case 3:
        triple = true;
        break;
    }
  }

  return [double, triple];
}

/** Part 1 */
const result = ids
  .map((id) => calculateAppearance(id))
  .reduce(
    (acc, cur) => [cur[0] ? acc[0] + 1 : acc[0], cur[1] ? acc[1] + 1 : acc[1]],
    [0, 0]
  )
  .reduce((acc, cur) => acc * cur, 1);

console.log(result);
