import { getInput } from "../../utils";

const GameScore = {
  win: 6,
  draw: 3,
  lose: 0,
} as const;

const ShapeScore = {
  rock: 1,
  paper: 2,
  scissor: 3,
} as const;

const Shape: Record<ShapeKey, ShapeValue> = {
  A: "rock",
  B: "paper",
  C: "scissor",
  X: "rock",
  Y: "paper",
  Z: "scissor",
};

type ShapeKey = "A" | "B" | "C" | "X" | "Y" | "Z";
type ShapeValue = "rock" | "paper" | "scissor";

function getScore(game: [ShapeValue, ShapeValue]): number {
  const shapeScore = ShapeScore[game[1]];
  let gameScore = shapeScore;

  const [theirShape, myShape] = game;

  if (theirShape === myShape) {
    return (gameScore += GameScore["draw"]);
  }

  if (theirShape === "paper" && myShape === "rock") {
    return (gameScore += GameScore["lose"]);
  }

  if (theirShape === "scissor" && myShape === "paper") {
    return (gameScore += GameScore["lose"]);
  }

  if (theirShape === "rock" && myShape === "scissor") {
    return (gameScore += GameScore["lose"]);
  }

  if (theirShape === "rock" && myShape === "paper") {
    return (gameScore += GameScore["win"]);
  }

  if (theirShape === "paper" && myShape === "scissor") {
    return (gameScore += GameScore["win"]);
  }

  if (theirShape === "scissor" && myShape === "paper") {
    return (gameScore += GameScore["win"]);
  }

  return 0;
}

const content = getInput(__dirname);

/**Part 1 */
let result = content
  .split("\n")
  .map((row) => row.split(" ") as [ShapeKey, ShapeKey])
  .map(
    (round) => round.map((shape) => Shape[shape]) as [ShapeValue, ShapeValue]
  )
  .map((game) => getScore(game))
  .reduce((prev, acc) => prev + acc, 0);

console.log("Part 1", result);
