import { homeRent, lowestLife as 最低生活水平 } from "./data/constant";
import 工资_monthlyList from "./data/工资";
import 贷款 from "./data/贷款";
import { getValue } from "./helper";
import { getObjSum, getValueTotal, getTotalFromRange } from "./util";
import { dateValueArr, monthObj } from "./constant";

// 合租后的房租
export const getHomeRentAfterSharingBy = (peopleNum: number) =>
  homeRent / peopleNum;

// 取对应月份的债务
export const getLoanValue = (y, m) => {
  return getValue(贷款, y, m);
};

// 获取每月剩钱，是工资-最低生活水平-贷款-每月买点啥
// 如果写了第三个参数，就每个月按第三个数算
// 如果没写第三个参数，每个月工资就按“/data/工资”文件那样地算
export const getEveryMonthRest = (
  dateRange: monthObj[],
  needPay: number[],
  wage?: number
) =>
  dateRange.map(({ year, month }) => {
    const theWage = wage ? wage : getValue(工资_monthlyList, year, month);
    return {
      year,
      month,
      value: Number(
        (
          theWage -
          getObjSum(最低生活水平) -
          getLoanValue(year, month) -
          needPay.reduce((s, v) => s + v, 0)
        ).toFixed(2)
      ),
    };
  });

// 获取期间贷款总额
export const getLoanTotalFromRange = (dateRange: monthObj[]) => {
  const result = dateRange.reduce((s, { year, month }) => {
    return s + getLoanValue(year, month);
  }, 0);
  return Number(result.toFixed(2));
};

// 获取期间剩钱总额
export const getRestTotalFromRange = (dateValueArr: dateValueArr) =>
  getValueTotal(dateValueArr);

// 获取期间工资合计
export const getWageTotalFromRange = (dateRange: monthObj[], wage?: number) => {
  if (wage) {
    let result = 0;
    for (let i = 0; i < dateRange.length; i++) {
      result += wage;
    }
    return result;
  }
  return getTotalFromRange(dateRange, 工资_monthlyList);
};
