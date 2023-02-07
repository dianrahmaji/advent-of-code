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

/** Part 2 */
for (const [i, currentId] of ids.slice(0, ids.length).entries()) {
  for (const [j, nextId] of ids.slice(i + 1).entries()) {
    let diff = 0;
    let l = 0;
    let res = "";

    for (let k = 0; k < currentId.length; k++) {
      if (currentId[k] !== nextId[k]) {
        diff++;
      } else {
        res += currentId[k];
      }
      l++;
    }

    if (diff === 1 && l === currentId.length) {
      console.log({ diff, l, res, c: currentId.length });
      break;
    }
  }
}
