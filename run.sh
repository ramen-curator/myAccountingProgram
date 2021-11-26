#!/bin/bash
# 这东西在win的vscode里，npm start起来只会在cmd里跑
npx tsc --project ./tsconfig.json
node ./dist/main