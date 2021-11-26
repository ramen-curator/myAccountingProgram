// 这种import引入方式才有typescript提示
import * as path from "path";
import { importantAllTheFile } from "../../util";

// __filename是指本文件的具体地址，比方/Users/..../index.js
// path.basename(__filename)是指本文件的名字，比方index.js
const basename = path.basename(__filename);
const dirname = __dirname; // 本文件的路径
const files = [];

export default importantAllTheFile(basename, dirname, files);
