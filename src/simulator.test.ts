import { describe, test, expect } from "vitest";
import { Student } from "./simulator";

describe("simulator", () => {
  test("Student", () => {
    // アル
    const student = new Student({ id: 10000 });
    expect(student.attackPower()).toEqual(100);
  });
});
