import { homeRent, lowestLife as 最低生活水平 } from "./data/constant";
import 工资_monthlyList from "./data/工资";
import 贷款 from "./data/贷款";
import { getValue } from "./helper";
import { getObjSum, getDateRange } from "./util";

// 合租后的房租
export const getHomeRentAfterSharingBy = (peopleNum: number) =>
  homeRent / peopleNum;

// 取对应月份的债务
export const getLoanValue = (y, m) => {
  return 贷款.reduce((s, o) => s + getValue(o, y, m), 0);
};

// 获取每月剩钱，是工资-最低生活水平-贷款-每月买点啥
// 如果写了第三个参数，就每个月按第三个数算
// 如果没写第三个参数，每个月工资就按“/data/工资”文件那样地算
export const getEveryMonthRest = (
  dateRange,
  needPay: number[],
  wage?: number
) =>
  dateRange.map(({ y, m }) => {
    const theWage = wage ? wage : getValue(工资_monthlyList, y, m);
    return {
      year: y,
      month: m,
      value: (
        theWage -
        getObjSum(最低生活水平) -
        getLoanValue(y, m) -
        needPay.reduce((s, v) => s + v, 0)
      ).toFixed(2),
    };
  });
