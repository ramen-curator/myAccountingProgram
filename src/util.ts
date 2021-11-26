import { month, monthObj } from "./constant";

export const getObjSum = (o: { [name: string]: number }) =>
  Object.keys(o).reduce((s, k) => s + o[k], 0);

const initMonthsInAYear = (y: number, sm: month, em: month) => {
  const result: monthObj[] = [];
  for (let m = sm; m <= em; m++) {
    result.push({ year: y, month: m });
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

const parseDateRangeStr = (str: string) => {
  if (
    str.split("~").length != 2 ||
    str.split("~").some((ym) => ym.split("/").length !== 2)
  ) {
    throw new Error("起始格式错误，格式应为2021/1 ～ 2023/12");
  }
  return str.split("~").map((ym) => {
    const [y, d] = ym.split("/").map((s) => s.trim());
    return { y: Number(y), m: Number(d) };
  });
};

//获取日期范围
export const getDateRange = (dateRangeStr: string) => {
  const [startDate, endDate] = parseDateRangeStr(dateRangeStr);

  const diffYear = endDate.y - startDate.y; // 相差几年
  const diffMonth = endDate.m - startDate.m; // 同一年时，相差几月
  if (diffYear < 0 || (diffYear === 0 && diffMonth < 0))
    throw new Error("结束日期应大于开始日期");

  if (diffYear === 0)
    return initMonthsInAYear(startDate.y, startDate.m, endDate.m);
  if (diffYear > 0) {
    const monthsStartYear: monthObj[] = initMonthsInAYear(
      startDate.y,
      startDate.m,
      12
    );
    const years: monthObj[] = initIntRange(startDate.y + 1, endDate.y)
      .map((y) => initMonthsInAYear(y, 1, 12))
      .flat(1);
    const monthsEndYear: monthObj[] = initMonthsInAYear(
      endDate.y,
      1,
      endDate.m
    );

    return [...monthsStartYear, ...years, ...monthsEndYear];
  }
};
