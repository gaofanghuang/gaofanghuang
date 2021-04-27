---
title: Node.js 基础
date: 2020-05-13 11:30:00
update: 2021-04-17 14:29:00
tags:
  - Node
  - Express
  - Koa
  - 待填坑
categories: Node开发
---

## npm

### 常用命令

1. 查看npm当前镜像源

`npm config get registry`

2. 设置指定镜像源

`npm config set registry https://registry.npmjs.org`

### yarn

yarn 大部分命令和 npm 一样。

两者*区别*：

1. 安装所有依赖

`npm install`

`yarn`

### 常用镜像源

```shell
npm --- https://registry.npmjs.org/
taobao --- https://registry.npm.taobao.org/
cnpm --- https://r.cnpmjs.org/
yarn --- https://registry.npm.taobao.org/
```

## 语法

## Express

## Koa

## 常见问题

### 1. 版本升级

1. 安装 `n` 模块

  ```shell
  npm install -g n
  ```

2. 升级到稳定版

  ```shell
  n stable
  ```

  或升级到指定版本

  ```shell
  n v14.2.0
  ```

### 2. 开机启动服务

**windows 环境**:

1. 安装模块 node-windows

  ```shell
  npm install node-windows --save
  ```

2. 在根目录创建 nw.js 文件

  ```javascript
  let Service = require('node-windows').Service;
 
  let svc = new Service({
    name: 'node_test',    //服务名称
    description: '测试项目服务器', //描述
    script: 'D:/testproject2017/test/bin/www' //nodejs项目要启动的文件路径
  });
  
  svc.on('install', () => {
    svc.start();
  });
  
  svc.install();
  ```

3. 在根目录运行 nw.js 文件

  ```shell
  node nw.js
  ```