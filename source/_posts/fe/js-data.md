---
title: javascript 数据处理
date: 2020-05-14 11:15:00
tags:
  - javascript
  - 待填坑
categories: 前端笔记
---

## 对象处理

### 深浅拷贝

|   --   | 和原数据是否指向同一对象 | 第一层数据为基本数据类型 |    原数据中包含子对象    |
| :----: | :----------------------: | :----------------------: | :----------------------: |
|  赋值  |            是            |  改变会使原数据一同改变  |  改变会使原数据一同改变  |
| 浅拷贝 |            否            | 改变不会使原数据一同改变 |  改变会使原数据一同改变  |
| 深拷贝 |            否            | 改变不会使原数据一同改变 | 改变不会使原数据一同改变 |

```javascript
var a = {
    a: 1,
    b: { c: 1, d: 2 }
}
var b = JSON.parse(JSON.stringify(a))
```

### 是否存在某个属性

1. 使用 `in` 关键字

  该方法可以判断对象的自有属性和继承来的属性是否存在。

  ```javascript
  var o = { x: 1 }
  'x' in o // true，自有属性存在
  'y' in o // false
  'toString' in o // true，是一个继承属性
  ```

2. 使用对象的 `hasOwnProperty()` 方法

  该方法只能判断自有属性是否存在，对于继承属性会返回 false 。

  ```javascript
  var o = { x: 1 }
  o.hasOwnProperty('x') // true，自有属性中有x
  o.hasOwnProperty('y') // false，自有属性中不存在y
  o.hasOwnProperty('toString') // false，这是一个继承属性，但不是自有属性
  ```

3. 用 `undefined` 判断

  自有属性和继承属性均可判断。

  ```javascript
  var o = { x: 1 }
  o.x !== undefined // true
  o.y !== undefined // false
  o.toString !== undefined // true
  ```

  该方法存在一个问题，如果属性的值就是 undefined 的话，该方法不能返回想要的结果，如下。

  ```javascript
  var o = { x: undefined }
  o.x !== undefined // false，属性存在，但值是 undefined
  o.y !== undefined // false
  o.toString !== undefined // true
  ```

4. 在条件语句中直接判断

  ```javascript
  var o = {}
  if (o.x) o.x += 1 // 如果 x 是 undefine, null, false, " ", 0 或 NaN,它将保持不变
  ```

## 数组处理

### 去重

利用 ES6 中的 `set()` , 以及 `.from()` 或 `[...arr]`

```javascript
const fruits = [
  'banana',
  'apple',
  'orange',
  'watermelon',
  'apple',
  'orange',
  'grape',
  'apple',
]
const fruitsTemp = new Set(fruits)
console.log('方法一', Array.from(fruitsTemp))
console.log('方法二', [...fruitsTemp])
```

### 替换数组中的某些元素

利用 `.splice(start, 删除的元素个数, 添加的元素)`

```javascript
const fruits = [
  'banana',
  'apple',
  'orange',
  'watermelon',
  'apple',
  'orange',
  'grape',
  'apple',
]
fruits.splice(0, 2, 'potato', 'tomato')
console.log(fruits)
```

### 用数据填充数组

`.fill()`

```javascript
var newArray = new Array(10).fill('1')
console.log(newArray) // returns ["1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1"]
```

### 查找两个数组的交集

```javascript
var numOne = [0, 2, 4, 6, 8, 8]
var numTwo = [1, 2, 3, 4, 5, 6]
var duplicatedValues = [...new Set(numOne)].filter((item) =>
  numTwo.includes(item)
)
console.log(duplicatedValues) // returns [2, 4, 6]
```

## 字符串处理

## 数字处理
