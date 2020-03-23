---
title: 循环遍历：for in & forEach & while & map
date: 2020-03-12 11:35:26
tags:
  - javascript
categories: 前端笔记
---

## for...in

以任意顺序遍历一个对象的除 Symbol 以外的可枚举属性。

### 语法

```javascript
for (variable in iterable) {
  //statements
}
```

**variable** 在每次迭代时，variable 会被赋值为不同的属性名。

**object** 非 Symbol 类型的可枚举属性被迭代的对象。

例：

```javascript
for (let item in list) {
  console.log(item)
}
```

### 缺陷

1. 次序问题，遍历数组时不要使用`for...in`

for...in 的迭代顺序依赖执行环境，不一定是数组的索引顺序。当需要遍历数组时，使用 forEach 或 for...of 更好。

2. 只迭代自身属性

for...in 无法迭代类的原型，只能迭代类的属性。

### 应用场景

1. 迭代对象：key-value 数据

2. 检查某键是否为某值时

## for...of

在可迭代对象（包括 Array，Map，Set，String，TypedArray，arguments 对象等等）上创建一个迭代循环，调用自定义迭代钩子，并为每个不同属性的值执行语句.

### 语法

```javascript
for (variable of iterable) {
  //statements
}
```

**variable** 在每次迭代中，将不同属性的值分配给变量。

**iterable** 被迭代枚举其属性的对象。
