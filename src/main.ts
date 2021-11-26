import { lowestLife as 最低生活水平, willCWage } from "./data/constant";
import { getObjSum, getDateRange } from "./util";
import { getHomeRentAfterSharingBy, getLoanValue } from "./compute";
import 工资_monthlyList from "./data/工资";
import { getValue } from "./helper";

// 开始年份月份，结束年份月份
// const dateRange = getDateRange({ y: 2021, m: 12 }, { y: 2023, m: 3 });
const dateRange = getDateRange("2021/12 ~ 2023/3");

// 获取每月剩钱，
const getEveryMonthRest = (dateRange, needPay: number[], wage?: number) =>
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

const needPay = [];
needPay.push(getHomeRentAfterSharingBy(2));
console.log("每个月剩钱", getEveryMonthRest(dateRange,needPay));

const 贷款总额 = dateRange.reduce((s, { y, m }) => {
  return s + getLoanValue(y, m);
}, 0);
console.log("贷款总额", 贷款总额.toFixed(2));

const 余钱总额 = getEveryMonthRest(dateRange,needPay).reduce((s, { value }) => {
  return s + Number(value);
}, 0);
console.log("余钱总额", 余钱总额.toFixed(2));

// todo 一年挣多少钱

// const 三个月攒下来的钱 = getDateRange(
//   { y: 2021, m: 12 },
//   { y: 2022, m: 2 }
// ).reduce(
//   (s, { y, m }) =>
//     s +
//     willCWage -
//     getObjSum(最低生活水平) -
//     getLoanValue(y, m) -
//     needPay.reduce((s, v) => s + v, 0),
//   0
// );

// const 三个月还掉的贷款 = getDateRange(
//   { y: 2021, m: 12 },
//   { y: 2022, m: 2 }
// ).reduce((s, { y, m }) => s + getLoanValue(y, m), 0);
// const 额外收入 = 1000;
// console.log("三个月攒下来的钱", 三个月攒下来的钱.toFixed(2));
// console.log("三个月还掉的贷款", 三个月还掉的贷款.toFixed(2));
// console.log("也许有年终奖的额外收入", 额外收入);
// console.log("剩下的贷款", (贷款总额 - 三个月还掉的贷款).toFixed(2));
// console.log(
//   "用攒的钱、额外收入减一下，还剩",
//   (三个月攒下来的钱 + 额外收入 - (贷款总额 - 三个月还掉的贷款)).toFixed(2)
// );
