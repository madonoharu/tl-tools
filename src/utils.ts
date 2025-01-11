export const COMP_KEYS = ["st1", "st2", "st3", "st4", "sp1", "sp2"] as const;
export type CompKey = (typeof COMP_KEYS)[number];

export function range(n: number): number[] {
  return [...Array(n).keys()];
}

export function uniq<T>(array: T[]): T[] {
  return [...new Set(array)];
}

export function uniqBy<T>(array: T[], iteratee: (value: T) => unknown): T[] {
  const state = new Set();

  return array.filter((item) => {
    const v = iteratee(item);

    if (state.has(v)) {
      return false;
    }

    state.add(v);
    return true;
  });
}

export function round(value: number, precision: number): number {
  return Number(value.toFixed(precision));
}
