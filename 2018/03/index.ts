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

  return {
    id,
    start: { row, col },
    dimension: { width, height },
  };
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

function drawIds(fabric: string[][], claims: Claim[]) {
  for (const { id, start, dimension } of claims) {
    for (let row = start.row; row < start.row + dimension.height; row++) {
      for (let col = start.col; col < start.col + dimension.width; col++) {
        fabric[row][col] += id;
      }
    }
  }

  return fabric;
}

function calculateOverlap(fabric: number[][]): number {
  return fabric
    .map((row) => row.filter((v) => v > 1).length)
    .reduce((acc, cur) => acc + cur, 0);
}

function findNoOverlap(fabric: string[][], claims: Claim[]) {
  let set = new Set();
  const ids = claims.map(({ id }) => parseInt(id.split("#")[1]));

  const overlaps = fabric
    .map((row) =>
      row.map((v) => v.split("#").filter(Boolean)).filter((v) => v.length > 1)
    )
    .filter((row) => row.length > 1);

  for (let row = 0; row < overlaps.length; row++) {
    for (let col = 0; col < overlaps[row].length; col++) {
      for (let id = 0; id < overlaps[row][col].length; id++)
        set.add(parseInt(overlaps[row][col][id]));
    }
  }

  const overlapIds = [...set];

  return ids.filter((v) => !overlapIds.includes(v));
}

const claims = parseLines(__dirname, parseClaim);
const { width, height } = findAreaDimension(claims);

/** Part 1 */
// const fabric = createGrid(height + 1, width + 1, 0);
// drawClaims(fabric, claims);

// const result = calculateOverlap(fabric);
// console.log(result);

/** Part 2 */
const fabric2 = createGrid(height + 1, width + 1, "");
const ids = drawIds(fabric2, claims);

const result2 = findNoOverlap(ids, claims);
console.log(result2);
