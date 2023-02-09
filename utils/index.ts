import * as dotenv from "dotenv";
import { readFileSync } from "fs";
import { join } from "path";

dotenv.config();

export function getInput(dirname: string) {
  const inputFile = process.env.DEMO === "1" ? "sample-input.txt" : "input.txt";
  return readFileSync(join(dirname, inputFile), "utf-8");
}

export function getLines(__dirname: string) {
  return getInput(__dirname).split("\n");
}

export function parseLines(__dirname: string, parser: (arg: any) => any) {
  return getLines(__dirname).map((v) => parser(v));
}

export function createGrid<T>(row: number, col: number, initial: T): T[][] {
  return new Array(row).fill(0).map(() => new Array(col).fill(initial));
}

export function binarytoDecimal(binary: string): number {
  return [...binary].reduce((acc, cur) => acc * 2 + parseInt(cur), 0);
}
