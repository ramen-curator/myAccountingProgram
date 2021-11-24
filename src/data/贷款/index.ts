/**本文件主要用于import该目录下的其他文件，然后export出去 */
// 这种import引入方式才有typescript提示
import * as fs from "fs";
import * as path from "path";

interface loanItem {
  year: number;
  mouth: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  value: number;
}
export type loan = loanItem[];

// __filename是指本文件的具体地址，比方/Users/..../index.js
// path.basename(__filename)是指本文件的名字，比方index.js
const basename = path.basename(__filename);
const dirname = __dirname; // 本文件的路径
const files: loan[] = [];

// readdirSync读取目录的内容。
fs.readdirSync(dirname)
  .filter(
    (file) =>
      // 搜索这种文件：
      // 1. 不该包含前缀.
      // 2. 与本文件不同名
      // 3. 后缀要为.js。不写ts的原因是，在编译后ts文件会变成js文件
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      !file.includes("constant") // 常量文件constant就不用导出了
  )
  .map((fileBasename) => {
    const filePath = path.join(dirname, fileBasename);
    files.push(require(filePath).default); // 默认会带一个default
  });

export default files;
