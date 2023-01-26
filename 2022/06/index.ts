import { getInput } from "../../utils";

const content = getInput(__dirname);

function getMarker(datastream: string) {
  let sequences: string[] = [];

  let i = 0;
  for (; i < datastream.length; i++) {
    sequences.push(datastream[i]);

    if ([...new Set(sequences)].length === 4) break;

    if (sequences.length === 4) sequences.shift();
  }

  return i + 1;
}

/** Demo */
// const result = content.split("\n").map((v) => getMarker(v));

/**Part 1 */
const result = getMarker(content);
console.log(result);

//TODO: Create utility function to find duplication in array
