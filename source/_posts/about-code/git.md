---
title: git
date: 2020-04-07 14:19:57
tags:
  - git
  - github
categories: 编程相关
---

## Git 是什么

Git，分布式版本控制系统。GitHub 网站，为开源项目免费提供 Git 存储。

<!--more-->

## 集中式 vs 分布式

集中式版本控制系统的代表，SVN。版本库是集中存放在中央服务器。

分布式，即每个人的电脑上都是一个完整的版本库。

## Git 优势

1. 去中心化：SVN 需要一个中央服务器，当服务器出问题时，所有的版本都丢失了。Git 没有中央服务器的概念，当一个电脑的版本库出问题，clone 其他电脑的版本库即可。

2. 本地提交：没有网络时，SVN 不能提交修改，Git 可以提交修改。

3. 分支策略：Git 拥有强大的分支管理，可以更方便的进行分离和合并的操作。



## Git 切换账号

```shell
git config --global user.name "Your Name"
git config --global user.email "email@example.com"
```

## Git 常用命令

clone远程仓库

```shell
git clone git@github.com:xxx/xxx.git
```


更新提交命令:

```shell
git fetch origin develop
git checkout develop
git merge origin/develop
```

更新子模块：

```shell
git submodule update --remote
```

放弃本地修改强制更新:

```shell
git fetch --all
git reset --hard origin/develop
```

## Git 命令列表

```shell
# 初始化仓库
git init

# 把变动文件添加到仓库
git add ReadMe.md

# 把变动提交到仓库
git commit -m "add ReadMe"

# 查看当前变动状态
git status

# 查看当前变动详情
git diff

# 查看最近提交的记录
git log

# 从远程仓库clone
git clone git@github.com:xxx/xxx.git

# 把本地仓库关联到远程github仓库
git remote add origin git@github.com:xxx/xxx.git

# 创建分支
git branch <name>

# 切换分支
git switch <name>

# 创建并切换分支
git switch -c <name>

# 查看当前分支
git branch

# 合并某分支到当前分支上
git merge <name>

# 删除分支
git branch -d <name>

# 把本地提交的变动，推送到远程仓库
git push origin master

# 拉取远程仓库中的某个分支的最新代码，并合并到本地的指定分支上
git pull <远程库名> <远程分支名>:<本地分支名>
```