import 贷款, { loan } from "../data/贷款";

export const getObjSum = (o: { [name: string]: number }) =>
  Object.keys(o).reduce((s, k) => s + o[k], 0);

// 取对应月份的债务
export const getLoanValue = (y, m) => {
  const getValue = (arr: loan): number => {
    // @ts-ignore 'find' does not exist on type '{ year: number; mouth: number; value: number; }[]'
    const result = arr.find((o) => o.mouth === m && o.year === y);
    if (result === undefined) return 0;
    return result.value;
  };

  return 贷款.reduce((s, o) => s + getValue(o), 0);
};

interface dateObj {
  y: number;
  m: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
}
//获取日期范围
export const getDateRange = (startDate: dateObj, endDate: dateObj) => {
  const getAYearDate = (y: number): dateObj => {
    // @ts-ignore 'fill' does not exist on type 'any[]'
    return new Array(12).fill(" ").map((_, m) => ({ y, m: m + 1 }));
  };
  const diffYear = endDate.y - startDate.y;
  const diffMonth = endDate.m - startDate.m;
  if (diffYear < 0) {
    throw new Error("日期不对1");
  }
  if (diffYear === 0) {
    if (diffMonth < 0) throw new Error("日期不对2");
    let result: dateObj[] = [];
    for (let m = startDate.m; m <= endDate.m; m++) {
      result.push({ y: startDate.y, m });
    }
    return result;
  }
  if (diffYear > 0) {
    let startYearDate: dateObj[] = [];
    let endYearDate: dateObj[] = [];
    let years: dateObj[] = [];
    for (let m = startDate.m; m <= 12; m++) {
      startYearDate.push({ y: startDate.y, m });
    }
    for (let m = 1; m <= endDate.m; m++) {
      //@ts-ignore
      endYearDate.push({ y: endDate.y, m });
    }
    for (let y = startDate.y + 1; y < endDate.y; y++) {
      years = years.concat(getAYearDate(y));
    }
    return [...startYearDate, ...years, ...endYearDate];
  }
};
