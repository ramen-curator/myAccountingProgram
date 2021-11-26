# 由来
花呗和借呗每个月的钱可能不同，所以想看看每个月“工资”，在扣去“必要生活消费”、“花呗借呗等贷款”、“房租”后，能剩多少钱。进而能算一年实际总额是多少等等的行为。

# 怎么启动？
## Mac
```
npm install
sudo chmod 777 ./run.sh
npm start
```
## Win
### 如果你要在vscode里跑
1. git bash会装吧，装好后路径放环境变量里
2. vscode的settings.json里，加上`"terminal.integrated.defaultProfile.windows":"Git Bash",`
3. 重启vscode
4. 打开终端 
```
npm install
npm run win
```
### 如果你要在命令行里跑
1. git bash会装吧，装好后路径放环境变量里
2. 打开命令行
```
npm install
npm run win
```


# 用法
1. 在data文件里写下你每个月的贷款值、工资值
2. 在data/constant文件里写下房租、最低生活水平、工资（如果每个月都一样的话）
3. 在./main里写下开始时间和结束时间，必要的话你可以改改计算行为
4. Windows: `npm run win`, Mac: `npm start`  
命令行看结果