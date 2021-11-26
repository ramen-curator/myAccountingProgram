// type month = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type month = number;
export interface monthObj {
  year: number;
  month: month;
}
interface dateValueObj extends monthObj {
  value: number;
}

export type dateValueArr = dateValueObj[];
