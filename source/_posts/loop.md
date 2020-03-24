---
title: 迭代器、Switch、Array循环
date: 2020-03-12 11:35:26
tags:
  - javascript
categories: 前端笔记
---

## for

for 语句用于创建一个循环，它包含了三个可选的表达式，这三个表达式被包围在圆括号之中，使用分号分隔，后跟一个用于在循环中执行的语句（通常是一个块语句）。

### 语法

```javascript
for ([initialization]; [condition]; [final - expression]) {
  statement
}
```

**initialization**: 一个表达式 (包含赋值语句) 或者变量声明。典型地被用于初始化一个计数器。该表达式可以使用 var 或 let 关键字声明新的变量，使用 var 声明的变量不是该循环的局部变量，而是与 for 循环处在同样的作用域中。用 let 声明的变量是语句的局部变量。该表达式的结果无意义。

**condition**: 一个条件表达式被用于确定每一次循环是否能被执行。如果该表达式的结果为 true，statement 将被执行。这个表达式是可选的。如果被忽略，那么就被认为永远为真。如果计算结果为假，那么执行流程将被跳到 for 语句结构后面的第一条语句。

**final-expression**: 每次循环的最后都要执行的表达式。执行时机是在下一次 condition 的计算之前。通常被用于更新或者递增计数器变量。

**statement**: 只要 condition 的结果为 true 就会被执行的语句。要在循环体内执行多条语句，使用一个块语句（{ ... }）来包含要执行的语句。没有任何语句要执行，使用一个空语句（;）。

例：

```javascript
for (let i = 0; i < 10; i++) {
  console.log(i)
}
```

注意，for 里的三个表达式是可省略的(如果条件语句省略，必须确保在循环体内跳出，否则将造成死循环)，例：

```javascript
var i = 0
// 注意，for()里的分号是强制性的不可省略
for (;;) {
  if (i > 3) break
  console.log(i)
  i++
}
```

<!--more-->

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
for (let key in obj) {
  console.log(key, obj[key])
}
```

### 停止迭代

对于 for...of 的循环，可以由`break`, `throw`, `continue`或`return`终止。

### 常见问题

1. 次序问题，遍历数组时不要使用`for...in`

for...in 的迭代顺序依赖执行环境，不一定是数组的索引顺序。当需要遍历数组时，使用 forEach 或 for...of 更好。

2. 只迭代自身属性

for...in 无法迭代类的原型，只能迭代类的属性。

### 应用场景

1. 迭代对象：key-value 数据

2. 检查某键是否为某值时

## for...of

在可迭代对象（包括 Array，Map，Set，String，TypedArray，arguments 对象，DOM 元素集合等等）上创建一个迭代循环，调用自定义迭代钩子，并为每个不同属性的值执行语句.

**TypedArray**：类型化数组。

**Map**：Map 对象保存键值对，并且能够记住键的原始插入顺序。任何值(对象或者原始值) 都可以作为一个键或一个值。

**Set**：Set 对象允许你存储任何类型的唯一值，无论是原始值或者是对象引用。

### 语法

```javascript
for (variable of iterable) {
  //statements
}
```

**variable** 在每次迭代中，将不同属性的值分配给变量。

**iterable** 被迭代枚举其属性的对象。

例：

```javascript
for (let item of list) {
  console.log(item)
}
```

### 停止迭代

对于 for...of 的循环，可以由`break`, `throw`, `continue`或`return`终止。

### 常见问题

1. 不能迭代对象

obj is not iterable

2. 不能迭代类

Ani is not iterable

3. 不能重复迭代生成器

同一个生成器只能迭代一次

## while

while 语句可以在某个条件表达式为真的前提下，循环执行指定的一段代码，直到那个表达式不为真时结束循环

### 语法

```javascript
while (condition) {
  statement
}
```

例：

```javascript
let i = 0
while (i < 10) {
  i++
  console.log(i)
}
```

## do...while

do...while 语句创建一个执行指定语句的循环，直到 condition 值为 false。在执行 statement 后检测 condition，所以指定的 statement 至少执行一次。

### 语法

```javascript
do {
  statement
} while (condition)
```

**statement**: 执行至少一次的语句，并在每次 condition 值为真时重新执行。想执行多行语句，可使用 block 语句（{ ... }）包裹这些语句。

**condition**: 循环中每次都会计算的表达式。如果 condition 值为真， statement 会再次执行。当 condition 值为假，则跳到 do...while 之后的语句。

例：

```javascript
let i = 0
do {
  i += 1
  console.log(i)
} while (i < 5)
```

### 常见问题

1. 当 **condition** 一直为 `true` 时，会一直循环至浏览器崩溃为止。

## for await...of

for await...of 语句会在异步或者同步可迭代对象上创建一个迭代循环，包括 String，Array，Array-like 对象（比如 arguments 或者 NodeList)，TypedArray，Map， Set 和自定义的异步或者同步可迭代对象。其会调用自定义迭代钩子，并为每个不同属性的值执行语句。

### 语法

```javascript
for await (variable of iterable) {
  statement
}
```

**variable** 在每次迭代中，将不同属性的值分配给变量。变量有可能以 const, let, 或者 var 来声明。

**iterable** 被迭代枚举其属性的对象。与 for...of 相比，这里的对象可以返回 Promise，如果是这样，那么 variable 将是 Promise 所包含的值，否则是值本身。

例：

```javascript
async function* asyncGenerator() {
  var i = 0
  while (i < 3) {
    yield i++
  }
}

;(async function() {
  for await (num of asyncGenerator()) {
    console.log(num)
  }
})()
```

## switch

switch 语句评估一个表达式，将表达式的值与 case 子句匹配，并执行与该情况相关联的语句。

### 语法

```javascript
switch (expression) {
  case value1:
    // 当 expression 的结果与 value1 匹配时，执行此处语句
    [break;]
  case value2:
    // 当 expression 的结果与 value2 匹配时，执行此处语句
    [break;]
  ...
  case valueN:
    // 当 expression 的结果与 valueN 匹配时，执行此处语句
    [break;]
  [default:
    // 如果 expression 与上面的 value 值都不匹配，执行此处语句
    [break;]]
}
```

**expression**:一个用来与 case 子语句匹配的表达式。

**case valueN**: 可选。用于匹配 expression 的 case 子句。如果 expression 与给定的 valueN 相匹配，则执行该 case 子句中的语句直到该 switch 语句结束或遇到一个 break 。

**default 可选**：一个 default 子句；如果给定，这条子句会在 expression 的值与任一 case 语句均不匹配时执行。

例：

```javascript
switch (animal.name) {
  case 'dog':
    console.log('Dag age is 10.')
    break
  case 'cat':
    console.log('Cat age is 4.')
    break
  case 'fish':
    console.log('fish age is 1.')
    break
  default:
    console.log('什么也没找到')
}
```

### 常见问题

1. 两个 case 之间没有 break

即上一个匹配的 case 没有 break，那么下一个 case 里的语句也会被执行，知道遇到 break。

2. default 的位置

default的位置不一定要放在流程的最后，也可以在第一个或者随便中间的某个位置，但是如果为了代码看起来更规范，还是建议放在流程尾部。

3. 
