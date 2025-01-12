import { describe, test, expect } from "vitest";
import { range, uniq, round } from "./utils";

describe("utils", () => {
  test("range", () => {
    expect(range(5)).toEqual([0, 1, 2, 3, 4]);
  });

  test("uniq", () => {
    const array = [1, 1, 2, 3, 2, 7, 1];
    expect(uniq(array)).toEqual([1, 2, 3, 7]);
  });

  test("round", () => {
    expect(round(5.89451, 0)).toBe(6);
    expect(round(5.89451, 1)).toBe(5.9);
    expect(round(5.89451, 2)).toBe(5.89);
    expect(round(5.89451, 3)).toBe(5.895);
    expect(round(0.0049, 2)).toEqual(0.0);
    expect(round(0.005, 2)).toEqual(0.01);
  });
});
