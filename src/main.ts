import {
  shouldPayNewRent,
  lowestLife as 最低生活水平,
  // willCWage,
  getYXWillCWage,
} from "./data/constant";
import { getObjSum, getLoanValue, getDateRange } from "./util/util";

const comingDate = getDateRange({ y: 2021, m: 12 }, { y: 2023, m: 3 });

const myMustPay = getObjSum(最低生活水平);
const getEveryMonthRest = (needPay: number[]) =>
  comingDate.map(({ y, m }) => {
    return {
      year: y,
      month: m,
      value: (
        getYXWillCWage(y,m) -
        myMustPay -
        getLoanValue(y, m) -
        needPay.reduce((s, v) => s + v, 0)
      ).toFixed(2),
    };
  });

const needPay = [];
needPay.push(shouldPayNewRent);
console.log("每个月剩钱", getEveryMonthRest(needPay));

const 贷款总额 = comingDate.reduce((s, { y, m }) => {
  return s + getLoanValue(y, m);
}, 0);
console.log("贷款总额", 贷款总额.toFixed(2));

const 余钱总额= getEveryMonthRest(needPay).reduce((s, { value }) => {
  return s + Number(value);
}, 0);
console.log("余钱总额", 余钱总额.toFixed(2));

// const 三个月攒下来的钱 = getDateRange(
//   { y: 2021, m: 12 },
//   { y: 2022, m: 2 }
// ).reduce(
//   (s, { y, m }) =>
//     s +
//     willCWage -
//     myMustPay -
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