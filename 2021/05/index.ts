import { createGrid, parseLines } from "../../utils";

const lines = parseLines(__dirname, parseLine) as Line[];

type Point = {
  x: number;
  y: number;
};

type Line = {
  start: Point;
  end: Point;
};

type Dimension = {
  width: number;
  height: number;
};

function parseLine(line: string): Line {
  const point = /[0-9]{1,},[0-9]{1,}/gi;
  const points = line
    .match(point)!
    .map((point) => point.split(","))
    .map((point) => ({ x: parseInt(point[0]), y: parseInt(point[1]) }));

  return {
    start: {
      x: Math.min(points[0].x, points[1].x),
      y: Math.min(points[0].y, points[1].y),
    },
    end: {
      x: Math.max(points[0].x, points[1].x),
      y: Math.max(points[0].y, points[1].y),
    },
  };
}

function isVertical(line: Line): boolean {
  const {
    start: { x: Xstart },
    end: { x: Xend },
  } = line;

  return Xstart === Xend;
}

function isHorizontal(line: Line): boolean {
  const {
    start: { y: Ystart },
    end: { y: YEnd },
  } = line;

  return Ystart === YEnd;
}

function findAreaDimension(lines: Line[]): Dimension {
  return lines
    .map(({ end }) => end)
    .reduce(
      (max, cur) => ({
        width: Math.max(max.width, cur.x),
        height: Math.max(max.height, cur.y),
      }),
      { width: 0, height: 0 }
    );
}

function drawLines(lines: Line[], area: number[][]): number[][] {
  for (const { start, end } of lines) {
    for (let row = start.y; row <= end.y; row++) {
      for (let col = start.x; col <= end.x; col++) {
        area[row][col]++;
      }
    }
  }
  return area;
}

function calculateOverlap(area: number[][]): number {
  return area
    .map((row) => row.filter((v) => v > 1).length)
    .reduce((acc, cur) => acc + cur, 0);
}

/** Part 1 */
const selected = lines.filter((line) => isVertical(line) || isHorizontal(line));
const { width, height } = findAreaDimension(selected);
const area = createGrid(height + 1, width + 1, 0);
const drawn = drawLines(selected, area);

const result = calculateOverlap(drawn);
console.log(result);
