import { join } from "path";
import { readFileSync } from "fs";
import { describe, expect, it } from "bun:test";

import { partOne } from ".";

describe("2015 day 01", () => {
	describe("sample", () => {
		const sample = JSON.parse(
			readFileSync(join(import.meta.dir, "sample.json"), "utf-8"),
		) as [string, number][];
		it.each(sample)(
			"has direction %s and goes to floor %i",
			(direction, expected) => {
				expect(partOne(direction)).toBe(expected);
			},
		);
	});
});
