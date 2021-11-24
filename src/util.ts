export const getObjSum = (o: { [name: string]: number }) =>
  Object.keys(o).reduce((s, k) => s + o[k], 0);

type month = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
interface monthObj {
  y: number;
  m: month;
}

const initMonthsInAYear = (y: number, sm: month, em: month) => {
  const result: monthObj[] = [];
  for (let m = sm; m <= em; m++) {
    result.push({ y, m });
  }
  return result;
};

const initIntRange = (s: number, e: number) => {
  const result: number[] = [];
  for (let i = s; i <= e; i++) {
    result.push(i);
  }
  return result;
};

//获取日期范围
export const getDateRange = (startDate: monthObj, endDate: monthObj) => {
  const diffYear = endDate.y - startDate.y; // 相差几年
  if (diffYear < 0) throw new Error("结束日期应大于开始日期");
  if (diffYear === 0) {
    const diffMonth = endDate.m - startDate.m; // 相差几月
    if (diffMonth < 0) throw new Error("结束日期应大于开始日期");
    return initMonthsInAYear(startDate.y, startDate.m, endDate.m);
  }
  if (diffYear > 0) {
    const startYearDate: monthObj[] = initMonthsInAYear(
      startDate.y,
      startDate.m,
      12
    );
    const endYearDate: monthObj[] = initMonthsInAYear(endDate.y, 1, endDate.m);
    const years: monthObj[] = initIntRange(startDate.y + 1, endDate.y)
      .map((y) => initMonthsInAYear(y, 1, 12))
      .flat(1);
    return [...startYearDate, ...years, ...endYearDate];
  }
};
