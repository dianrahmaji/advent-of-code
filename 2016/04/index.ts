import { getLines } from "../../utils";

const rooms = getLines(__dirname);

function isValidRoom(room: {
  name: string;
  sector: number;
  checksum: string;
}): boolean {
  const { name, sector, checksum } = room;
  const charMap = new Map<string, number>();

  for (let char of name) {
    charMap.set(char, (charMap.get(char) || 0) + 1);
  }

  const charSorted = [...charMap].sort(([, i], [, j]) => j - i);

  const lengthMap = new Map<number, string[]>();

  for (let [char, length] of charSorted) {
    lengthMap.set(length, [...(lengthMap.get(length) || []), char].sort());
  }

  let cs = "";

  for (let [, char] of lengthMap) {
    for (let c of char) {
      cs += c;
    }
  }

  return checksum === cs.slice(0, 5);
}

function decrypt({ name, sector }: { name: string[]; sector: number }) {
  return {
    name: name
      .map((n) =>
        [...n]
          .map((c) =>
            String.fromCharCode(((c.charCodeAt(0) - 96 + sector) % 26) + 96)
          )
          .join("")
      )
      .join(" "),
    sector,
  };
}

/** Part 1 */
let result = rooms
  .map((r) => ({
    //TODO: Parse with RegEx
    name: r.slice(0, -11).split("-").join(""),
    sector: parseInt(r.slice(-11).slice(1, 4)),
    checksum: r.slice(-11).slice(5, 10),
  }))
  .filter(isValidRoom)
  .reduce((acc, cur) => acc + cur.sector, 0);

// console.log(result);

/** Part 2 */
let result2 = rooms
  .map((r) => ({
    name: r.slice(0, -11).split("-"),
    sector: parseInt(r.slice(-11).slice(1, 4)),
  }))
  .map(({ name, sector }) => decrypt({ name, sector }))
  .filter((d) => d.name.includes("north"));

console.log(result2);
