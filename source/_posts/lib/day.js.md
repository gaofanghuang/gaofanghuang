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

Day.js 和 Moment.js 一样是处理时间和日期的 JavaScript 库。接口几乎完全一致，Day.js 体积比 Moment.js 小好几倍。

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

### 格式化参数

**注意**: 如星期等数据需要先设置本地化格式。

```javascript
// 设置为中文格式
dayjs.locale('zh-cn');

// 添加依赖LocalizedFormat插件
// 浏览器加载方式 dayjs.extend(window.dayjs_plugin_localizedFormat)
dayjs.extend(LocalizedFormat);

```

### 默认值

```javascript
dayjs() === dayjs(new Date()) // true
dayjs() === dayjs(undefined) // true
```

`dayjs(null)` 为无效输入。

## 取值

## 查询

> 参考资料：

1. [Day.js中文网](https://dayjs.gitee.io/docs/zh-CN/get-set/quarter)