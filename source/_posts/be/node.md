---
title: Node.js 基础入门
date: 2020-05-13 11:30:00
tags:
  - Node
  - Express
  - Koa
  - 待填坑
categories: 后端笔记
---

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