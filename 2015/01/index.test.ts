import { join } from "path";
import { readFileSync } from "fs";
import { describe, expect, it } from "bun:test";

import { partOne, partTwo } from ".";

const [testCasePartOne, testCasePartTwo] = JSON.parse(
	readFileSync(join(import.meta.dir, "sample.json"), "utf-8"),
) as [string, number][][];

describe("2015 day 01", () => {
	describe("Part One", () => {
		it.each(testCasePartOne)(
			"has direction %s and goes to floor %i",
			(direction, expected) => {
				expect(partOne(direction)).toBe(expected);
			},
		);
	});
	describe("Part Two", () => {
		it.each(testCasePartTwo)(
			"has direction %s and enter the basement at the instruction number %i",
			(direction, expected) => {
				expect(partTwo(direction)).toBe(expected);
			},
		);
	});
});
