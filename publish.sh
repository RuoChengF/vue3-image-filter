#!/bin/bash

# 提示用户输入提交信息
read -p "请输入提交信息: " commit_message

# 执行 git 命令
git add .
git commit -m "$commit_message"
git push all master

# 询问用户是否发布npm包
read -p "是否发布npm包? (y/n): " publish_npm

if [[ $publish_npm == 'y' ]]; then
  # 执行 npm 相关命令
  npm run build:lib
  npm config set registry https://registry.npmjs.org
  npm publish
  npm config set registry https://registry.npmmirror.com
fi

# 提示用户脚本执行完成
echo "代码执行完成。"
