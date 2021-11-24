import ta的工资 from "./工资";

// 房租
const homeRent = 1800;
export const shouldPayHomeRent = homeRent / 2; // 因为我合租，所以除以2

export const lowestLife = {
  // 最低生活水平
  吃饭: 1000,
  话费: 100,
  VPN: 0,
  零花钱:200,
  给妈妈: 1500,
};

// 到手工资 · 不变化版
const getWillCWage = () => {
  const nowWage = 9000;
  const now医保 = 100;
  const 医保率 = Number((now医保 / nowWage).toFixed(2));
  const willWage = 18000;
  const willCWage = willWage * (1 - 医保率);
  return willCWage;
};

// 到手工资 · 写在 工资.ts 里的
export const getYXWillCWage = (y, m) => {
  const getValue = (arr: typeof ta的工资): number => {
    // @ts-ignore 'find' does not exist on type '{ year: number; mouth: number; value: number; }[]'
    const result = arr.find((o) => o.mouth === m && o.year === y);
    if (result === undefined) return 0;
    return result.value;
  };
  return getValue(ta的工资);
};
// export const willCWage = getWillCWage();
