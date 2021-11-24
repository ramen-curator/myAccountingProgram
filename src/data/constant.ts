// 房租
export const homeRent = 1800;

// 最低生活水平
export const lowestLife = {
  吃饭: 1000,
  话费: 100,
  VPN: 0,
  零花钱: 200,
  给妈妈: 1500,
};

// 固定工资版
class MyFixedWage {
  nowWage = 1000; // 目前工资
  now医保 = 100;
  nowCwage = this.getComingWage(this.nowWage); // 到手工资
  医保率 = this.getInsuranceRate(this.nowWage, this.now医保);
  willWage = 18000; // 转正后工资
  will医保 = this.getInsurance(this.willWage, this.医保率);
  willCWage = this.willWage * (1 - this.医保率); // 转正后到手工资
  getInsuranceRate(wage: number, insurance: number) {
    // 获取医社保占的比例
    return Number((insurance / wage).toFixed(2));
  }
  getComingWage(wage: number) {
    // 获取到手工资
    return wage * (1 - this.医保率);
  }
  getInsurance(wage: number, insuranceRate: number) {
    // 获取医保费用
    return wage * insuranceRate;
  }
}
// 到手工资 · 固定工资版
export const { willCWage } = new MyFixedWage();
