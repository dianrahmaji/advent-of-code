import { getInput } from "../../utils";

const content = getInput(__dirname);

function getMarker(datastream: string, position: number) {
  let sequences: string[] = [];

  let i = 0;
  for (; i < datastream.length; i++) {
    sequences.push(datastream[i]);

    if ([...new Set(sequences)].length === position) break;

    if (sequences.length === position) sequences.shift();
  }

  return i + 1;
}

/** Demo */
// const result = content.split("\n").map((v) => getMarker(v));

/** Part 1 */
const result = getMarker(content, 4);
console.log(result);

/** Part 2 */
const result2 = content.split("\n").map((v) => getMarker(v, 14));
console.log(result2);

//TODO: Create utility function to find duplication in array
