import { lowestLife as 最低生活水平, willCWage } from "./data/constant";
import { getObjSum, getDateRange } from "./util";
import 贷款 from "./data/贷款";
import 浮动开销 from "./data/浮动开销";
import 浮动收入 from "./data/浮动收入";
import {
  getHomeRentAfterSharingBy,
  getEveryMonthRest,
  getLoanTotalFromRange,
  getRestTotalFromRange,
  getWageTotalFromRange,
} from "./compute";

// todo 将 贷款 合并到 浮动开销里
// todo 将 工资 合并到 浮动收入里
// todo 将 固定开销、浮动开销、固定收入、浮动收入，列入计算里

// todo 大计划，React实现。
// 进入网页的时候先把以上值存到 localStorage 里，然后再渲染出来
// 于是可以修改（localStorage）、存储（如果localStorage里有值，就读localStorage里的，不存进去）
// 如果localStorage不行，那就用那啥数据库的，我记得网页有这种数据库
// 于是就变成一个网页了

// 开始年份月份，结束年份月份
const dateRangeStr = "2021/12 ~ 2023/3";
const dateRange = getDateRange(dateRangeStr);

const fixedPayMonthly = [];
fixedPayMonthly.push(getObjSum(最低生活水平));
fixedPayMonthly.push(getHomeRentAfterSharingBy(2)); // 应付房租

const floatPay = [];
floatPay.push(贷款);
floatPay.push(浮动开销);

const fixedGet = [];
fixedGet.push(willCWage); // 固定工资

const floatGet = [];
floatGet.push(浮动收入);

console.log(dateRangeStr);
console.log(
  "每个月剩钱",
  getEveryMonthRest(dateRange, fixedPayMonthly, floatPay)
);
console.log("期间贷款总额", getLoanTotalFromRange(dateRange));
console.log(
  "期间剩钱总额",
  getRestTotalFromRange(getEveryMonthRest(dateRange, fixedPayMonthly, floatPay))
);
console.log("期间工资合计", getWageTotalFromRange(dateRange));

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
