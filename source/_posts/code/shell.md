---
title: Shell 和 Vim 常用命令
date: 2020-04-17 14:05:51
tags:
  - Shell
  - Vim
categories: 编程相关
---

## Shell

Shell 既是一种命令语言，又是一种程序设计语言。

熟练的使用 Shell 命令可以提高我们的工作效率。以下命令以 Mac / Linux 为主，部分命令 Windows 下无法使用。

**注意**：在访问系统级目录或进行敏感操作时，Mac / Linux 下需要先输入 `sudo` 以及用户密码，才能进行下一步操作。

### 切换目录

```shell
# 切换到主目录
cd ~

# 切换到目录/tmp 
cd /tmp

# 切换到当前目录下的dir目录
cd dir

# 切换到根目录
cd /

# 切换到到上一级目录
cd ..

# 切换到上二级目录
cd ../..
```

<!--more-->

### 操作目录

```shell
# 查看目录下的内容
ls

# 在当前目录下创建子目录 abc
mkdir abc

# 打印当前目录路径
pwd

# 删除空目录
rmdir
```

### 操作文件

```shell
# 创建文件 aaa.text
touch aaa.text

# 查看文件内容
cat aaa.text

# 重命名文件 aaa.text 为 bbb.text
mv aaa.text bbb.text

# 移动文件到指定目录
mv aaa.text /abc

# 删除文件 aaa.text
rm aaa.text

# 删除当前目录下的所有未隐藏文件
rm *

# 删除指定目录以及它包含的所有内容
rm -rf abc
```

### 软链接

```shell
# 建立软链接 ln -s 源文件/目录 目标文件/目录
ln -s aaa.text test
```

## Vim

```shell
# vim编辑文件（只读模式）
vi aaa.text

# 进入编辑模式
i

# 按 ESC 后执行其他命令

# 写入文件
:w

# 保存并退出
:wq

# 强制保存并退出
:wq!

# 不保存并退出
:q

# 不保存并强制退出
q!
```

## 快捷键打开

使用快捷键打开命令行工具。

### Windows：

1. cmd

同时按`win` + `R`键，在运行中输入`cmd`，回车。

2. powershell

同时按`win` + `R`键，在运行中输入`powershell`，回车。

或

在指定文件夹打开: 在此文件夹上按 shift 同时点击鼠标右键，选择在此处打开`Powershell`窗口。

在 Windows 系统中推荐使用 Powershell 代替 cmd，功能更强大，cmd 有很多命令不支持。

### Mac:

同时按`control` + `空格`，在搜索框`spotlight`中输入`terminal`，回车。

或

`command` + `空格`，输入terminal.app。

### Linux:

同时按`Alt` + `F2`，在运行中输入`gnome-terminal`，回车。

或 在设置中自定义快捷键。
