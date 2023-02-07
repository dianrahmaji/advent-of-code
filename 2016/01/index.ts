import { getLines } from "../../utils";

const directions = getLines(__dirname).map((t) =>
  t
    .split(",")
    .map((v) => v.trim())
    .map(
      ([dir, ...val]) => [dir, parseInt(val.join(""))] as ["R" | "L", number]
    )
);

type Compass = "n" | "e" | "s" | "w";

const navigation = new Map<
  Compass,
  {
    L: Compass;
    R: Compass;
    axis: "x" | "y";
    offset: 1 | -1;
  }
>([
  ["n", { L: "w", R: "e", axis: "y", offset: 1 }],
  ["e", { L: "n", R: "s", axis: "x", offset: 1 }],
  ["s", { L: "e", R: "w", axis: "y", offset: -1 }],
  ["w", { L: "s", R: "n", axis: "x", offset: -1 }],
]);

/** Part 1 */
const result = directions.map((dir) =>
  Object.values(
    dir.reduce(
      (state, dir) => {
        state.dir = navigation.get(state.dir![dir[0]]);
        state.position[state.dir!.axis] += dir[1] * state.dir!.offset;

        return state;
      },
      {
        dir: navigation.get("n"),
        position: { x: 0, y: 0 },
      }
    ).position
  ).reduce((acc, cur) => acc + Math.abs(cur), 0)
);

console.log(result);

/** Part 2 */
const memory = new Set(["x0y0", true]);
let key;

const result2 = directions.map((dir) =>
  Object.values(
    dir.reduce(
      (state, dir) => {
        if (state.found) return state;

        state.dir = navigation.get(state.dir![dir[0]]);

        for (let i = 0, j = dir[1]; i < j && !state.found; i++) {
          state.position[state.dir!.axis] += state.dir!.offset;
          key = `x${state.position.x}y${state.position.y}`;

          if (memory.has(key)) state.found = true;
          else memory.add(key);
        }

        return state;
      },
      {
        dir: navigation.get("n"),
        position: { x: 0, y: 0 },
        found: false,
      }
    ).position
  ).reduce((acc, cur) => acc + Math.abs(cur), 0)
);

console.log(result2);
