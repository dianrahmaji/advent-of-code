import * as dotenv from "dotenv";
import { readFileSync } from "fs";
import { join } from "path";

dotenv.config();

export function getInput(dirname: string) {
  const inputFile = process.env.DEMO === "1" ? "sample-input.txt" : "input.txt";
  return readFileSync(join(dirname, inputFile), "utf-8");
}
