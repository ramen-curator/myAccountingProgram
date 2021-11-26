import { month, monthObj, dateValueArr } from "./constant";
import { getValue } from "./helper";
// 这种import引入方式才有typescript提示
import * as fs from "fs";
import * as path from "path";

export const getObjSum = (o: { [name: string]: number }) =>
  Object.keys(o).reduce((s, k) => s + o[k], 0);

// 获取值总额
export const getValueTotal = (dateValueArr: dateValueArr) => {
  const result = dateValueArr.reduce((s, { value: v }) => s + v, 0);
  return Number(result.toFixed(2));
};

// 获取期间值总额
export const getTotalFromRange = (
  dateRange: monthObj[],
  dateValueArr: dateValueArr
) => {
  const result = dateRange.reduce(
    (s, { year, month }) => s + getValue(dateValueArr, year, month),
    0
  );
  return Number(result.toFixed(2));
};

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

/**
 * 本函数主要用于 import 调用了该函数的文件 的目录下的其他文件，然后export出去
 *
 * @param basename 是指调用处文件的名字，比方index.js
 * @param dirname 调用处文件的路径
 * @param files import文件后存放的地方
 * @returns files
 */
export const importantAllTheFile = (basename: string, dirname: string) => {
  const files: dateValueArr[] = [];
  // readdirSync读取目录的内容。
  fs.readdirSync(dirname)
    .filter(
      (file) =>
        // 搜索这种文件：
        // 1. 不该包含前缀.
        // 2. 与本文件不同名
        // 3. 后缀要为.js。不写ts的原因是，在编译后ts文件会变成js文件
        file.indexOf(".") !== 0 &&
        file !== basename &&
        file.slice(-3) === ".js" &&
        !file.includes("constant") // 常量文件constant就不用导出了
    )
    .map((fileBasename) => {
      const filePath = path.join(dirname, fileBasename);
      files.push(require(filePath).default); // 默认会带一个default
    });

  return files;
};

const findOutDateRange = (dateValueArr: dateValueArr) => {
  const minYear = Math.min(...dateValueArr.map((o) => o.year));
  const minYearArr = dateValueArr.filter((o) => o.year === minYear);
  const minMonth = Math.min(...minYearArr.map((o) => o.month));

  const maxYear = Math.max(...dateValueArr.map((o) => o.year));
  const maxYearArr = dateValueArr.filter((o) => o.year === maxYear);
  const maxMonth = Math.max(...maxYearArr.map((o) => o.month));
  
  return getDateRange(`${minYear}/${minMonth}~${maxYear}/${maxMonth}`);
};

export const getDateValueArrFromFiles = (
  files: dateValueArr[]
): dateValueArr => {
  const dateRange = findOutDateRange(files.flat(1));
  const result = dateRange.map(({ year, month }) => {
    return {
      year,
      month,
      value: files.reduce((s, a) => s + getValue(a, year, month), 0),
    };
  });
  return result;
};
