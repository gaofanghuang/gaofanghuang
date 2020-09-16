---
title: Javascript 数据类型及结构
date: 2020-06-06 10:40:00
tags:
  - Javascript
  - 待填坑
categories: JS笔记
---

## 原始类型

### 基本类型

基本类型（基本数值、基本数据类型）是一种*既非对象也无方法*的数据。

在 JavaScript 中，共有*7*种基本类型：string，number，bigint，boolean，null，undefined，symbol (ECMAScript 2016新增)。

<!--more-->

1. `string`: 字符串

2. `number`: 数值

3. `bigint`: 大整数

4. `boolean`: 布尔

5. `null`: 空值

6. `undefined`: 未定义

7. `symbol`: 字面量

### bigint

bigint 在平时的开发中很少用到，它用于表示大于 2^53 - 1 的整数，和 number 的区别在于：number 的最大值为 2^53 - 1，而 BigInt 可以表示任意大的整数。

### 浮点

JavaScript 内部，所有数字都是以64位浮点数形式储存，即使整数也是如此。所以，1与1.0是相同的，是同一个数。

```javascript
var a = 0.1 + 0.2
console.log(a, a === 0.3) // 0.30000000000000004 false
```

`D1.D2D3D4...Dp x BE`, 这种通用形式被称作浮点数。

浮点数的好处是它可以用来表示任何数值。例如，整数 1 可以表示为 1.0 × 10^0。光的速度可以表示为2.99792458 × 108 m/s。1/2 可以被表示为二进制形式 0.1 × 2^0。

**处理浮点数**：

1. 在算数运算之前或之后完成取舍

2. 仅是用于显示时，使用`toPrecision()` 和 `str.toFixed()`处理，之后记得要转回 number 类型

3. 使用 sinfuljs 或 mathjs 库

## 进制转换

### 二进制

### 十进制

## 隐式, 显式, 名义和鸭子类型

## 值类型和引用类型

## == 与 ===, typeof 与 instanceof

## 数据结构

## 数据处理

查看[数据处理](/js/data-handle)
