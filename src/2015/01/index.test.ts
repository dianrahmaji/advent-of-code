import { join } from "path";
import { readFileSync } from "fs";
import { describe, expect, it } from 'bun:test';

import { partOne } from '.'

describe('2015 day 01', () => {
  describe('sample', () => {
    const input = readFileSync(join(import.meta.dir, 'sample.txt'), 'utf-8')
    it('part 1', () => {
      expect(partOne(input)).toBe(-3)
    })
  })
})