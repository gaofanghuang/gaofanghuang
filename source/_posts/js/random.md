---
title: JavaScript生成随机数
date: 2021-05-10 09:50:00
update: 2021-05-10 09:50:00
tags:
  - Javascript
  - 随机
categories: JS笔记
---

## 主要方法：Math

```javascript
// 向上取整
Math.ceil();

// 向下取整
Math.floor();

// 四舍五入
Math.round();

// 0.0 ~ 1.0 之间的一个伪随机数， 即：>= 0 && < 1， 如：0.31415926
Math.random();

// 字符串转为数字，并向下取整
parseInt(string, radix);
```

<!--more-->

## 常见随机数取值方法：

1. 随机获取 1 到 10 的整数，其中取 0 的概览极小，即当 `Math.random()` 值等于 0 时，此方法结果才等于 0。

  `Math.ceil(Math.random()*10);`

2. 随机均衡获取 0 或者 1 的其中一个

  `Math.round(Math.random());`

3. 随机均衡获取 0 到 9 的整数

  `Math.floor(Math.random()*10);`

4. 随机获取 0 到 10 的整数，其中 取 0 或 10 的几率为其他数字几率的 50%。

  `Math.round(Math.random()*10);`

5. 随机均衡生成 [1 ~ max] 的整数

  ```javascript
  parseInt(Math.random() * (max + 1), 10);
  // 或
  Math.floor(Math.random() * (max + 1));
  // 或
  Math.ceil(Math.random() * max);
  ```

6. 随机均衡生成 [0 ~ max] 的整数

  ```javascript
  parseInt(Math.random() * (max + 1), 10);
  // 或
  Math.floor(Math.random() * (max + 1));
  ```

7. 随机均衡生成 [min ~ max] 的整数

  ```javascript
  parseInt(Math.random() * (max - min + 1) + min, 10);
  // 或
  Math.floor(Math.random() * (max - min + 1) + min);
  ```