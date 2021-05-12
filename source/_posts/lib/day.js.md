---
title: Day.js 应用总结
date: 2021-05-06 16:40:00
update: 2021-05-11 16:50:00
tags:
  - Day.js
  - Javascript
  - Javascript Lib
  - 时间处理
categories: 工具库笔记
---

## Day.js 和 Moment.js 的区别与选择

查看[Moment.js 应用总结](/lib/moment.js/)

## 安装使用

### Node.js

```shell
npm install dayjs --save
```

```javascript
var dayjs = require('dayjs')
dayjs().format()
```

<!--more-->

### 浏览器

```html
<script src="dayjs.js"></script>
<script>
  dayjs().format()
</script>
```
### Typescript

```typescript
import * as dayjs from 'dayjs'
dayjs().format()
```

## 格式化

### 默认值

```javascript
dayjs() === dayjs(new Date()) // true
dayjs() === dayjs(undefined) // true
```

`dayjs(null)` 为无效输入。

## 取值

## 查询
