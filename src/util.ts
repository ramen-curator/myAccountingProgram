export const getObjSum = (o: { [name: string]: number }) =>
  Object.keys(o).reduce((s, k) => s + o[k], 0);

interface monthObj {
  y: number;
  m: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
}
const getAYearMonth = (y: number): monthObj => {
  // @ts-ignore 'fill' does not exist on type 'any[]'
  return new Array(12).fill(" ").map((_, m) => ({ y, m: m + 1 }));
};

//获取日期范围
export const getDateRange = (startDate: monthObj, endDate: monthObj) => {
  const diffYear = endDate.y - startDate.y; // 相差几年
  if (diffYear < 0) throw new Error("结束日期应大于开始日期");
  if (diffYear === 0) {
    const diffMonth = endDate.m - startDate.m; // 相差几月
    if (diffMonth < 0) throw new Error("结束日期应大于开始日期");
    const result: monthObj[] = [];
    for (let m = startDate.m; m <= endDate.m; m++) {
      result.push({ y: startDate.y, m });
    }
    return result;
  }
  if (diffYear > 0) {
    let startYearDate: monthObj[] = [];
    let endYearDate: monthObj[] = [];
    let years: monthObj[] = [];
    for (let m = startDate.m; m <= 12; m++) {
      startYearDate.push({ y: startDate.y, m });
    }
    for (let m = 1; m <= endDate.m; m++) {
      // @ts-ignore Type 'number' is not assignable to type '1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12'.ts(2322)
      endYearDate.push({ y: endDate.y, m });
    }
    for (let y = startDate.y + 1; y < endDate.y; y++) {
      years = years.concat(getAYearMonth(y));
    }
    return [...startYearDate, ...years, ...endYearDate];
  }
};
