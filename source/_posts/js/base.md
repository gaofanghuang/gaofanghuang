---
title: Javascript 基础
date: 2020-06-04 09:40:00
tags:
  - Javascript
  - 待填坑
categories: JS笔记
---

<!--more-->

## 运算处理

### 数学计算

### 进制转换

### 时间处理

## 操作Dom

## HTTP请求

## 常见问题

### 1. 逻辑运算符 &&、|| 和 位运算符 &、|

逻辑运算符：

`||`（或者）:

只要`||`前面为 false，不管`||`后面是 true 还是 false，都返回`||`后面的值。
只要`||`前面为 true，不管`||`后面是 true 还是 false，都返回`||`前面的值。

即：真前假后

```javascript
var a = 10
var b = 6
console.log(a || b) // 10
```

```javascript
var c = 0
var d = 6
console.log(c || d) // 6
```

`&&`（并且）:

只要`&&`前面是 false，无论`&&`后面是 true 还是 false，结果都将返`&&`前面的值。
只要`&&`前面是 true，无论`&&`后面是 true 还是 false，结果都将返`&&`后面的值。

即：假前真后

位运算符:

> 位运算就是直接对整数在内存中的二进制位进行操作。二进制的最末位为 0 表示该数为偶数，最末位为 1 表示该数为奇数。

`|`（或者）:

两个位只要有一个为 1，那么结果都为 1。否则就为 0。

即：

```javascript
console.log(31 | 2) // 31
console.log('31的二进制为', (31).toString(2)) // 11111
console.log('2的二进制为', (2).toString(2)) // 10
```

`&`（并且）:

两个数值的个位分别相与，同时为 1 才得 1，只要一个为 0 就为 0。

即：

```javascript
console.log(31 & 2) // 2
console.log('31的二进制为', (31).toString(2)) // 11111
console.log('2的二进制为', (2).toString(2)) // 10
```
