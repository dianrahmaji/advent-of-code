import { getLines } from "../../utils";

const directions = getLines(__dirname);

const keypad = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

const bathroomKeypad = [
  [null, null, "1", null, null],
  [null, "2", "3", "4", null],
  ["5", "6", "7", "8", "9"],
  [null, "A", "B", "C", null],
  [null, null, "D", null, null],
];

/** Part 1 */
const result = directions.reduce(
  (acc, directions) => {
    let { r, col, row } = acc;

    for (const d of directions) {
      switch (d) {
        case "U":
          row = Math.max(0, row - 1);
          break;
        case "R":
          col = Math.min(2, col + 1);
          break;
        case "D":
          row = Math.min(2, row + 1);
          break;
        case "L":
          col = Math.max(0, col - 1);
          break;
      }
    }

    r = r * 10 + keypad[row][col];

    return { r, col, row };
  },
  { r: 0, col: 0, row: 0 }
);

console.log(result);

/** Part 2 */
const result2 = directions.reduce(
  (acc, directions) => {
    let { r, col, row } = acc;

    for (const d of directions) {
      switch (d) {
        case "U":
          if (bathroomKeypad[Math.max(0, row - 1)][col] !== null)
            row = Math.max(0, row - 1);
          break;
        case "R":
          if (bathroomKeypad[row][Math.min(4, col + 1)] !== null)
            col = Math.min(4, col + 1);
          break;
        case "D":
          if (bathroomKeypad[Math.min(4, row + 1)][col] !== null)
            row = Math.min(4, row + 1);
          break;
        case "L":
          if (bathroomKeypad[row][Math.max(0, col - 1)] !== null)
            col = Math.max(0, col - 1);
          break;
      }
    }

    r = r + bathroomKeypad[row][col];

    return { r, col, row };
  },
  { r: "", col: 0, row: 2 }
);

console.log(result2);
