// 这种import引入方式才有typescript提示
import * as fs from "fs";
import * as path from "path";

// __filename是指本文件的具体地址，比方/Users/..../index.js
// path.basename(__filename)是指本文件的名字，比方index.js
const basename = path.basename(__filename);
const dirname = __dirname; // 本文件的路径
const files = {};

// readdirSync读取目录的内容。
fs.readdirSync(dirname)
  .filter(
    (file) =>
      // 搜索这种文件：
      // 1. 不该包含前缀.
      // 2. 与本文件不同名
      // 3. 后缀要为.js。不写ts的原因是，在编译后ts文件会变成js文件
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .map((fileBasename) => {
    const fileName = fileBasename.slice(0, -3);
    const filePath = path.join(dirname, fileBasename);
    files[fileName] = require(filePath);
  });

export default files;
