import { homeRent } from "./data/constant";

// 合租后的房租
export const getHomeRentAfterSharingBy = (peopleNum: number) => homeRent / peopleNum;
