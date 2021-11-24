import { dateValueArr } from "./constant";

export const getValue = (arr: dateValueArr, y: number, m: number): number => {
  // @ts-ignore 'find' does not exist on type '{ year: number; month: number; value: number; }[]'
  const result = arr.find((o) => o.month === m && o.year === y);
  if (result === undefined) return 0;
  return result.value;
};
