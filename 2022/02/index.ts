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

const ResultToShape: Record<MyShapeKey, keyof typeof GameScore> = {
  X: "lose",
  Y: "draw",
  Z: "win",
};

type TheirShapeKey = "A" | "B" | "C";
type MyShapeKey = "X" | "Y" | "Z";
type ShapeKey = TheirShapeKey | MyShapeKey;
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

  return (gameScore += GameScore["win"]);
}

function resultToShape(
  their: ShapeValue,
  outcome: keyof typeof GameScore
): ShapeValue {
  if (outcome === "draw") return their;

  if (their === "rock" && outcome === "win") {
    return "paper";
  }

  if (their === "rock" && outcome === "lose") {
    return "scissor";
  }

  if (their === "paper" && outcome === "win") {
    return "scissor";
  }

  if (their === "paper" && outcome === "lose") {
    return "rock";
  }

  if (their === "scissor" && outcome === "win") {
    return "rock";
  }

  return "paper";
}

const content = getInput(__dirname);

/**Part 1 */
const result = content
  .split("\n")
  .map((row) => row.split(" ") as [TheirShapeKey, MyShapeKey])
  .map(
    (round) => round.map((shape) => Shape[shape]) as [ShapeValue, ShapeValue]
  )
  .map((game) => getScore(game))
  .reduce((prev, acc) => prev + acc, 0);

console.log("Part 1", result);

/**Part 2 */
const result2 = content
  .split("\n")
  .map((row) => row.split(" ") as [TheirShapeKey, MyShapeKey])
  .map((shape) => {
    const [their, outcome] = [Shape[shape[0]], ResultToShape[shape[1]]];
    return [their, resultToShape(their, outcome)] as [ShapeValue, ShapeValue];
  })
  .map((game) => getScore(game))
  .reduce((prev, acc) => prev + acc, 0);

console.log(result2);
