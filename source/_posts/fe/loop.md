---
title: 迭代器、Switch、Array循环
date: 2020-03-12 11:35:26
update: 2020-05-15 14:20:00
tags:
  - javascript
categories: 前端笔记
---

[查看 demo](https://gaofanghuang.github.io/demo/api/loop/demo1)

## for

for 语句用于创建一个循环，它包含了三个可选的表达式，这三个表达式被包围在圆括号之中，使用分号分隔，后跟一个用于在循环中执行的语句（通常是一个块语句）。

### 语法

```javascript
for ([initialization]; [condition]; [final - expression]) {
  statement
}
```

<!--more-->

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

;(async function () {
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

default 的位置不一定要放在流程的最后，也可以在第一个或者随便中间的某个位置，但是如果为了代码看起来更规范，还是建议放在流程尾部。

3. 多 case 单一操作

如果 case 语句之下没有 break ，它将继续执行下一个 case 语句，而不管 case 是否符合条件。

```
switch (animal.name) {
  case 'dog':
  case 'cat':
  case 'fish':
    console.log('fish age is 1.')
    break
  default:
    console.log('什么也没找到')
}
```

## arr.every()

测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。

**注意**：若收到一个空数组，此方法在一切情况下都会返回 true。

```javascript
const score = [16, 30, 39, 29, 10, 13]
const res = score.every((item) => item > 9)
console.log(res) // true
```

## arr.some()

测试数组中是不是至少有1个元素通过了被提供的函数测试。它返回的是一个Boolean类型的值。

### 语法

```javascript
arr.some(callback(element[, index[, array]])[, thisArg])
```

**callback** 生成新数组元素的函数，使用三个参数：

- element 数组中正在处理的元素。

- index 可选 数组中正在处理的元素的索引值。

- array 可选 some 方法调用的数组。

**thisArg** 可选 执行 callback 函数时值被用作this。

## arr.fill()

用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。不包括终止索引。

### 语法

`arr.fill(value[, start[, end]])`

**value** 用来填充数组元素的值。

**start** 可选，起始索引，默认值为 0。

**end** 可选，终止索引，默认值为 this.length。

### 常见问题

1. `fill` 方法会改变数组本身。

2. start 和 end 参数是可选的, 其默认值分别为 0 和 this 对象的 length 属性值。如果 start 是个负数, 则开始索引会被自动计算成为 length+start, 其中 length 是 this 对象的 length 属性值。如果 end 是个负数, 则结束索引会被自动计算成为 length+end

3. `fill` 方法可以用于非数组对象。(???)

4. 当一个对象被传递给 fill 方法的时候, 填充数组的是这个对象的引用。

## arr.filter()

创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。

### 语法

`var newArray = arr.filter(callback(element[, index[, array]])[, thisArg])`

**callback** 用来测试数组的每个元素的函数。返回 true 表示该元素通过测试，保留该元素，false 则不保留。它接受以下三个参数：

- element 数组中当前正在处理的元素。

- index 可选 正在处理的元素在数组中的索引。

- array 可选 调用了 filter 的数组本身。

**thisArg** 可选, 执行 callback 时，用于 this 的值。

## arr.find()

返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。

### 语法

`arr.find(callback[, thisArg])`

**callback** 在数组每一项上执行的函数，接收 3 个参数：

- element 当前遍历到的元素。

- index 可选 当前遍历到的索引。

- array 可选 数组本身。

**thisArg** 可选 执行回调时用作 this 的对象。

## arr.findIndex()

返回数组中满足提供的测试函数的第一个元素的索引。否则返回-1。

### 语法

`arr.findIndex(callback[, thisArg])`

**callback** 针对数组中的每个元素, 都会执行该回调函数, 执行时会自动传入下面三个参数:

- element 当前元素。

- index 当前元素的索引。

- array 调用 findIndex 的数组。

**thisArg** 可选。执行 callback 时作为 this 对象的值。

## arr.map()

创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。

### 语法

```javascript
var new_array = arr.map(function callback(currentValue[, index[, array]]) {
 // Return element for new_array
}[, thisArg])
```

**callback** 生成新数组元素的函数，使用三个参数：

- currentValue callback 数组中正在处理的当前元素。

- index 可选 callback 数组中正在处理的当前元素的索引。

- array 可选 map 方法调用的数组。

**thisArg** 可选 执行 callback 函数时值被用作 this。

## arr.flatMap()

首先使用映射函数映射每个元素，然后将结果压缩成一个新数组。

### 语法

```javascript
var new_array = arr.flatMap(function callback(currentValue[, index[, array]]) {
    // return element for new_array
}[, thisArg])
```

**callback** 可以生成一个新数组中的元素的函数，可以传入三个参数：

- currentValue 当前正在数组中处理的元素

- index 可选 数组中正在处理的当前元素的索引。

- array 可选 被调用的 map 数组

**thisArg** 可选 执行 callback 函数时 使用的 this 值。

## arr.forEach()

对数组的每个元素执行一次给定的函数。

### 语法

`arr.forEach(callback(currentValue [, index [, array]])[, thisArg])`

**callback** 为数组中每个元素执行的函数，该函数接收一至三个参数：

- currentValue 数组中正在处理的当前元素。

- index 可选 数组中正在处理的当前元素的索引。

- array 可选 forEach() 方法正在操作的数组。

**thisArg** 可选 当执行回调函数 callback 时，用作 this 的值。

### 常见问题

1. forEach 无法跳出循环

除了抛出异常以外，没有办法中止或跳出 forEach() 循环。只要条件允许，也可以使用 filter() 提前过滤出需要遍历的部分，再用 forEach() 处理。

若你需要提前终止循环，你可以使用：

`for...of` / `for...in` 循环

`arr.every()`

`arr.some()`

`arr.find()`

`arr.findIndex()`

这些数组方法则可以对数组元素判断，以便确定是否需要继续遍历：

`every()`

`some()`

`find()`

`findIndex()`



