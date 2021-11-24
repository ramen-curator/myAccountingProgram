import { homeRent } from "./data/constant";
import 贷款 from "./data/贷款";
import { getValue } from "./helper";

// 合租后的房租
export const getHomeRentAfterSharingBy = (peopleNum: number) =>
  homeRent / peopleNum;

// 取对应月份的债务
export const getLoanValue = (y, m) => {
  return 贷款.reduce((s, o) => s + getValue(o, y, m), 0);
};
