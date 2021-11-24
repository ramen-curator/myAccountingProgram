import ta的工资 from "./工资";
import { getValue } from "../helper";

// 房租
export const homeRent = 1800;

export const lowestLife = {
  // 最低生活水平
  吃饭: 1000,
  话费: 100,
  VPN: 0,
  零花钱: 200,
  给妈妈: 1500,
};

// 获取医社保占的比例
const getInsuranceRate = (wage: number, insurance: number) =>
  Number((insurance / wage).toFixed(2));

// 到手工资 · 不变化版
const getWillCWage = () => {
  const nowWage = 9000;
  const now医保 = 100;
  const 医保率 = getInsuranceRate(nowWage, now医保);
  const willWage = 18000;
  const willCWage = willWage * (1 - 医保率);
  return willCWage;
};

// 到手工资 · 写在 工资.ts 里的
export const getYXWillCWage = (y, m) => getValue(ta的工资,y,m);
// export const willCWage = getWillCWage();
