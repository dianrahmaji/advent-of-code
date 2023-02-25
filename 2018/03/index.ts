import { createGrid, parseLines } from "../../utils";

type Dimension = {
  width: number;
  height: number;
};

type Claim = {
  id: string;
  start: { row: number; col: number };
  dimension: Dimension;
};

function parseClaim(claim: string) {
  const [id, rect] = claim.split("@").map((v) => v.trim());

  const [start, dimension] = rect.split(":").map((v) => v.trim());

  const [col, row] = start.split(",").map((v) => parseInt(v));
  const [width, height] = dimension.split("x").map((v) => parseInt(v));

  return { id, start: { row, col }, dimension: { width, height } };
}

function findAreaDimension(claims: Claim[]): Dimension {
  return claims.reduce(
    ({ width, height }, { start, dimension }) => {
      return {
        width: Math.max(width, start.row + dimension.height),
        height: Math.max(height, start.col + dimension.width),
      };
    },
    { width: 0, height: 0 }
  );
}

function drawClaims(fabric: number[][], claims: Claim[]) {
  for (const { start, dimension } of claims) {
    for (let row = start.row; row < start.row + dimension.height; row++) {
      for (let col = start.col; col < start.col + dimension.width; col++) {
        fabric[row][col] += 1;
      }
    }
  }
}

function calculateOverlap(fabric: number[][]): number {
  return fabric
    .map((row) => row.filter((v) => v > 1).length)
    .reduce((acc, cur) => acc + cur, 0);
}

const claims = parseLines(__dirname, parseClaim);

/** Part 1 */
const { width, height } = findAreaDimension(claims);
const fabric = createGrid(height + 1, width + 1, 0);
drawClaims(fabric, claims);

const result = calculateOverlap(fabric);
console.log(result);
