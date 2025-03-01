import { COMP_KEYS, CompKey } from "@/utils";

import { Student, StudentState } from "./student";

export interface CompState {
  st1?: StudentState;
  st2?: StudentState;
  st3?: StudentState;
  st4?: StudentState;
  sp1?: StudentState;
  sp2?: StudentState;
}

export class Comp {
  st1?: Student;
  st2?: Student;
  st3?: Student;
  st4?: Student;
  sp1?: Student;
  sp2?: Student;

  constructor(state: CompState) {
    COMP_KEYS.forEach((key) => {
      const studentState = state[key];
      if (studentState) {
        this[key] = new Student(studentState);
      }
    });
  }

  names(): string[] {
    return COMP_KEYS.map((key) => this[key]?.raw.Name ?? "").filter(Boolean);
  }

  keys(): CompKey[] {
    return COMP_KEYS.filter((key) => this[key]);
  }
}

export { Student };
export type { StudentState };
