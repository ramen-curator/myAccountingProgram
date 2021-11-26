import { lowestLife as 最低生活水平 } from "./data/constant";
import { getObjSum, getDateRange } from "./util";
import {
  getHomeRentAfterSharingBy,
  getEveryMonthRest,
  getLoanTotalFromRange,
  getRestTotalFromRange,
  getWageTotalFromRange
} from "./compute";

// 开始年份月份，结束年份月份
const dateRangeStr = "2021/12 ~ 2023/3";
const dateRange = getDateRange(dateRangeStr);

const fixedPayMonthly = [];
fixedPayMonthly.push(getObjSum(最低生活水平))
fixedPayMonthly.push(getHomeRentAfterSharingBy(2)); // 应付房租
console.log(dateRangeStr);
console.log("每个月剩钱", getEveryMonthRest(dateRange, fixedPayMonthly));
console.log("期间贷款总额", getLoanTotalFromRange(dateRange));
console.log(
  "期间剩钱总额",
  getRestTotalFromRange(getEveryMonthRest(dateRange, fixedPayMonthly))
);
console.log("期间工资合计", getWageTotalFromRange(dateRange))

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
