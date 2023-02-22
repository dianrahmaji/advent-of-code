import { inspect } from "util";
import { getLines } from "../../utils";

type Path = ["R" | "L" | "U" | "D", number];
type Direction = "n" | "e" | "s" | "w";
type Point = { x: number; y: number };
type Navigation = {
  L?: Direction;
  R?: Direction;
  U?: Direction;
  D?: Direction;
  offset: 1 | -1;
  axis: keyof Point;
};
type State = {
  direction: Navigation;
  start: Point | null;
  end: Point;
};
type WirePath = {
  start: Point | null;
  end: Point;
  axis: keyof Point;
};

const wires = getLines(__dirname).map((wire) =>
  wire.split(",").map(([dir, ...val]) => [dir, parseInt(val.join(""))] as Path)
);

const navigation = new Map<Direction, Navigation>([
  ["n", { L: "w", R: "e", axis: "y", offset: 1 }],
  ["e", { U: "n", D: "s", axis: "x", offset: 1 }],
  ["s", { L: "w", R: "e", axis: "y", offset: -1 }],
  ["w", { U: "n", D: "s", axis: "x", offset: -1 }],
]);

const reducer = (state: State[], dir: Path, index: number) => {
  let newState = {
    start: state[index].end,
    end: {
      ...state[index].end,
      [navigation.get(state[index].direction[dir[0]]!)!.axis]:
        navigation.get(state[index].direction[dir[0]]!)!.offset * dir[1] +
        state[index].end[navigation.get(state[index].direction[dir[0]]!)!.axis],
    },
    direction: navigation.get(state[index].direction[dir[0]] as Direction)!,
  };

  state.push(newState);
  return state;
};

function createWirePath(wire: Path[]) {
  return wire
    .reduce(reducer, [
      {
        direction: ["R", "L"].includes(wire[0][0])
          ? navigation.get("n")!
          : navigation.get("w")!,
        start: null,
        end: { x: 0, y: 0 },
      },
    ])
    .slice(1)
    .map(({ start, end, direction: { axis } }) => ({ start, end, axis }));
}

function isIntersection(val: number, ...bound: number[]): boolean {
  const [start, end] = bound.sort((a, b) => a - b);

  return val > start && val < end;
}

function findIntersections(wirePaths: WirePath[][]) {
  const intersections: Point[] = [];

  const [firstPath, secondPath] = wirePaths;

  for (const first of firstPath) {
    const { start: firstStart, end: firstEnd, axis: firstAxis } = first;
    for (const second of secondPath) {
      const { start: secondStart, end: secondEnd, axis: secondAxis } = second;

      if (firstAxis === secondAxis) continue;

      const firstIntersection = firstStart![secondAxis];
      const secondIntersection = secondStart![firstAxis];

      if (
        isIntersection(
          secondIntersection,
          firstStart![firstAxis],
          firstEnd![firstAxis]
        ) &&
        isIntersection(
          firstIntersection,
          secondStart![secondAxis],
          secondEnd![secondAxis]
        )
      ) {
        // @ts-ignore
        intersections.push({
          [firstAxis]: firstIntersection,
          [secondAxis]: secondIntersection,
        });
      }
    }
  }

  return intersections;
}

/** Part 1 */
const wirePaths = wires.map((wire) => {
  return createWirePath(wire);
});

const result = findIntersections(wirePaths)
  .map((i) => Math.abs(i.x) + Math.abs(i.y))
  .sort((a, b) => a - b);

console.log(result);
