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

/** Part 2 */
let result2 = 0;

for (let row = 0; row < triangles.length; row += 3) {
  for (let col = 0; col < triangles[row].length; col++) {
    let comparable = [
      triangles[row][col],
      triangles[row + 1][col],
      triangles[row + 2][col],
    ];
    // .sort((a, b) => a - b);

    // if (comparable[0] + comparable[1] > comparable[2]) result2++;
    let inValid = 0;
    for (let i = 0; i < comparable.length; i++) {
      let cur = i;
      let next = (i + 1) % comparable.length;
      let compare = (i + 2) % comparable.length;

      if (comparable[cur] + comparable[next] <= comparable[compare]) {
        inValid++;
      }
    }
    if (inValid === 0) result2++;
  }
}

console.log(result2);

/**TODO: Refactor the solution */
