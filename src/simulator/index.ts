import studentsJson, { Student as RawStudent } from "@/data/students.json";
import { COMP_KEYS, CompKey, range, round } from "@/utils";

export interface StudentState {
  id: number;
}

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

export class Student {
  id: number;
  raw: RawStudent;
  level = 90;
  bond = 50;

  constructor(state: StudentState) {
    this.id = state.id;
    this.raw = studentsJson[state.id];
  }

  // https://docs.google.com/document/d/1Ui0FRgG8h8RB1-cA639F3ETDrVM7q9FKftg4vBKBAAQ/edit?tab=t.0#heading=h.h4m5cg5fnapl
  attackPower(): number {
    const stat1 = this.raw.AttackPower1;
    const stat100 = this.raw.AttackPower100;

    const levelScale = round((this.level - 1) / 99, 4);

    return Math.round(stat1 + (stat100 - stat1) * levelScale);
  }

  bondStats(): [number, number] {
    const { FavorStatValue } = this.raw;
    let stat1 = 0;
    let stat2 = 0;

    range(this.bond).forEach((i) => {
      if (i < 20) {
        stat1 += FavorStatValue[Math.floor(i / 5)][0];
        stat2 += FavorStatValue[Math.floor(i / 5)][1];
      } else if (i < 50) {
        stat1 += FavorStatValue[2 + Math.floor(i / 10)][0];
        stat2 += FavorStatValue[2 + Math.floor(i / 10)][1];
      }
    });

    return [stat1, stat2];
  }
}
