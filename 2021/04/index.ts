import { getInput } from "../../utils";

const input = getInput(__dirname).split("\n\n");

const moves = input[0].split(",").map((v) => parseInt(v));
const grids: (number | boolean)[][][] = input.slice(1, input.length).map((g) =>
  g.split("\n").map((r) =>
    r
      .split(" ")
      .filter(Boolean)
      .map((v) => parseInt(v))
  )
);

function isBingo(grid: (number | boolean)[][]): boolean {
  /** Check rows */
  for (let row = 0; row < grid.length; row++) {
    let marked = 0;
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === false) marked++;
    }

    if (marked === grid[0].length) return true;
  }

  /** Check columns*/
  for (let col = 0; col < grid[0].length; col++) {
    let marked = 0;
    for (let row = 0; row < grid.length; row++) {
      if (grid[row][col] === false) marked++;
    }

    if (marked === grid.length) return true;
  }

  return false;
}

function play(moves: number[], grids: (number | boolean)[][][]) {
  for (const move of moves) {
    for (const grid of grids) {
      for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
          if (grid[row][col] === move) grid[row][col] = false;
        }
      }

      if (isBingo(grid)) {
        return { move, grid };
      }
    }
  }
}

/** Part 1 */
const win = play(moves, grids);
const result =
  (win?.grid
    ?.map((r) =>
      // @ts-ignore
      r.filter((v) => v !== false).reduce((acc, cur) => acc + cur, 0)
    )
    // @ts-ignore

    .reduce((acc, cur) => acc + cur, 0) as number) * win!.move;

console.log(result);
