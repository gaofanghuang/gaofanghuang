---
title: Javascript 数据处理
date: 2020-05-14 11:15:00
tags:
  - Javascript
  - 待填坑
categories: JS笔记
---

## 1. 对象处理

### 1.1 深浅拷贝

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

### 1.2 是否存在某个属性

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

## 2. 数组处理

### 2.1 去重

### 2.2 扁平化

### 2.3 替换数组中的某些元素

### 2.4 用数据填充数组

### 2.5 查找两个数组的交集

## 3. 字符串处理

## 4. 数字运算

### 4.1 加减乘除