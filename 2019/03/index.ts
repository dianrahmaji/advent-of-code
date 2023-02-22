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
  steps: number;
};
type WirePath = {
  start: Point | null;
  end: Point;
  axis: keyof Point;
  steps: number;
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
    steps: state[index].steps + dir[1],
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
        steps: 0,
      },
    ])
    .slice(1)
    .map(({ start, end, direction: { axis }, steps }) => ({
      start,
      end,
      axis,
      steps,
    }));
}

function isIntersection(val: number, ...bound: number[]): boolean {
  const [start, end] = bound.sort((a, b) => a - b);

  return val > start && val < end;
}

function findIntersections(wirePaths: WirePath[][]) {
  const intersections: { intersections: Point; totalSteps: number }[] = [];

  const [firstPath, secondPath] = wirePaths;

  for (const first of firstPath) {
    const {
      start: firstStart,
      end: firstEnd,
      axis: firstAxis,
      steps: firstSteps,
    } = first;
    for (const second of secondPath) {
      const {
        start: secondStart,
        end: secondEnd,
        axis: secondAxis,
        steps: secondSteps,
      } = second;

      if (firstAxis === secondAxis) continue;

      const firstIntersection = firstStart![secondAxis];
      const secondIntersection = secondStart![firstAxis];

      const actualFirstSteps =
        firstSteps -
        Math.abs(
          Math.abs(firstStart![firstAxis]) - Math.abs(firstEnd![firstAxis])
        ) +
        Math.abs(
          Math.abs(firstStart![firstAxis]) - Math.abs(secondIntersection)
        );

      const actualsecondSteps =
        secondSteps -
        Math.abs(
          Math.abs(secondStart![secondAxis]) - Math.abs(secondEnd![secondAxis])
        ) +
        Math.abs(
          Math.abs(secondStart![secondAxis]) - Math.abs(firstIntersection)
        );

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
        intersections.push({
          // @ts-ignore
          intersections: {
            [firstAxis]: firstIntersection,
            [secondAxis]: secondIntersection,
          },
          totalSteps: actualFirstSteps + actualsecondSteps,
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

const intersections = findIntersections(wirePaths).map((i) => ({
  distance: Math.abs(i.intersections.x) + Math.abs(i.intersections.y),
  steps: i.totalSteps,
}));

let result = intersections.sort((a, b) => a.distance - b.distance);
console.log(result);

/** Part 2 */
result = intersections.sort((a, b) => a.steps - b.steps);
console.log(result);
