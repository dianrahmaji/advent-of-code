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
