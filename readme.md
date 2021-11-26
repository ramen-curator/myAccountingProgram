# 由来
花呗和借呗每个月的钱可能不同，所以想看看每个月“工资”，在扣去“必要生活消费”、“花呗借呗等贷款”、“房租”后，能剩多少钱。进而能算一年实际总额是多少等等的行为。

# 怎么启动？
## Mac
```
npm install
sudo chmod 777 ./run.sh
npm start
```

# 用法
1. 在data文件里写下你每个月的贷款值、工资值
2. 在data/constant文件里写下房租、最低生活水平、工资（如果每个月都一样的话）
3. 在./main里写下开始时间和结束时间，必要的话你可以改改计算行为
4. `npm start`，命令行看结果