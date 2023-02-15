import { getLines } from "../../utils";

const triangles = getLines(__dirname)
  .map((s) => s.trim())
  .map((s) =>
    s
      .split(" ")
      .filter(Boolean)
      .map((v) => parseInt(v))
  );

/** Part 1 */
let result = triangles.reduce((acc, triangle) => {
  for (let i = 0; i < triangle.length; i++) {
    let cur = i;
    let next = (i + 1) % triangle.length;
    let compare = (i + 2) % triangle.length;

    if (triangle[cur] + triangle[next] <= triangle[compare]) {
      return acc;
    }
  }
  return acc + 1;
}, 0);

console.log(result);
