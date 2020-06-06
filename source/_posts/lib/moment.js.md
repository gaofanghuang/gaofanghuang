---
title: Moment.js 应用总结
date: 2020-06-04 10:30:00
update: 2020-06-04 10:30:00
tags:
  - Moment.js
  - Javascript
  - Javascript Lib
  - 时间处理
categories: 工具库笔记
---

## 安装使用

### Node.js

```shell
npm install moment
```

```javascript
var moment = require('moment')
moment().format()
```

<!--more-->

### 浏览器

```html
<script src="moment.js"></script>
<script>
  moment().format()
</script>
```

### Typescript

```shell
npm install moment
```

```typescript
import * as moment from 'moment';
```

## 格式化

### 格式化参数

**注意**: 如星期等数据需要先设置本地化格式。

```javascript
// 设置为中文格式
moment.locale('zh-cn');
```

**注意**: 格式化参数区分大小写。

例：2020-06-04 16:05:32:120 星期四 第二季度

| 参数 | 示例 | 描述 |
| :---: | :---: | :---: |
| YYYY | 2020 | 4 或 2 位数字的年份 |
| YY | 20 | 2 位数字的年份 |
| Y | 2020 | 带有任意数字和符号的年份 |
| Q | 2 | 年份的季度。将月份设置为季度的第一个月 |
| M | 6 | 月份数字，不包含0 |
| MM | 06 | 月份数字，包含0 |
| MMM | Jun | 语言环境中的月份名称，由 `moment.locale()` 设置 |
| MMMM | June | 语言环境中的月份名称，由 `moment.locale()` 设置 |
| D | 4 | 月的某天，不包含0 |
| DD | 04 | 月的某天，包含0 |
| Do | 4th | 月的某天，带序号 |
| DDD | 156 | 年的某天，不包含0 |
| DDDD | 156 | 年的某天，包含0 |
| X | 1591257932 | Unix 时间戳 |
| x | 1591257932000 | Unix 毫秒时间戳 |
| GGGG | 2020 | ISO 的 4 位数字的周年 |
| GG | 2020 | ISO 的 2 位数字的周年 |
| gggg | 2020 | 语言环境的 4 位数字的周年 |
| gg | 20 | 语言环境的 2 位数字的周年 |
| WW | 23 | ISO 的年的第几周 |
| W | 23 | ISO 的年的第几周 |
| w | 23 | 语言环境的年的第几周，不包含0 |
| ww | 23 | 语言环境的年的第几周，包含0 |
| E | 4 | ISO 的星期几 |
| e | 3 | 语言环境的星期几 |
| ddd | 周四 | 语言环境的星期几的名称，由 `moment.locale()` 设置 |
| dddd | 星期四 | 语言环境的星期几的名称，由 `moment.locale()` 设置 |
| l | 2020/6/4 | 语言环境的日期（以本地格式） |
| ll | 2020年6月4日 | 语言环境的月份名称、月份日期、年份 |
| lll | 2020年6月4日 16:05 | 语言环境的月份名称、月份日期、年份、时间 |
| L | 2020/06/04 | 语言环境的日期（以本地格式） |
| LL | 2020年6月4日 | 语言环境的月份名称、月份日期、年份 |
| LLL | 2020年6月4日下午4点05分 | 语言环境的月份名称、月份日期、年份、时间 |
| LLLL | 2020年6月4日星期四下午4点05分 | 语言环境的星期几、月份名称、月份日期、年份、时间 |
| LT | 16:05 | 语言环境的时间（不含秒钟） |
| LTS | 16:05:32 | 语言环境的时间（含秒钟） |
| H | 16 | 小时（24 小时制），不包含0 |
| HH | 16 | 小时（24 小时制），包含0 |
| h | 4 | 小时（12 小时制, 0 ~ 23），不包含0 |
| hh | 04 | 小时（12 小时制, 0 ~ 23），包含0 |
| k | 16 | 小时（24 小时制, 1 ~ 24），不包含0 |
| kk | 16 | 小时（24 小时制, 1 ~ 24），包含0 |
| a | 下午 | 上午或下午 |
| A | 下午 | 上午或下午 |
| m | 5 | 分钟，不包含0 |
| mm | 05 | 分钟，包含0 |
| s | 32 | 秒钟，不包含0 |
| ss | 32 | 秒钟，包含0 |
| S | 1 | 带分数的秒钟(0~999), 即 100 毫秒 = 0.1 秒 |
| SS | 12 | 带分数的秒钟(0~999), 即 120 毫秒 = 0.12 秒 |
| SSS | 120 | 带分数的秒钟(0~999), 即 120 毫秒 = 0.12 秒 |
| Z | +08:00 | 从 UTC 偏移为 +-HH:mm、+-HHmm 或 Z |
| ZZ | +0800 | 从 UTC 偏移为 +-HH:mm、+-HHmm 或 Z |

### 格式化案例

1. 当前时间格式化为年月日，YYYY-MM-DD， 如 2020-06-04

  ```javascript
  moment().format('YYYY-MM-DD')
  ```

2. 年月日时分秒，YYYY-MM-DD HH:mm:ss

  ```javascript
  moment().format('YYYY-MM-DD HH:mm:ss')
  ```

3. 年月日星期，YYYY-MM-DD dddd

  ```javascript
  moment.locale('zh-cn')
  moment().format('YYYY-MM-DD dddd')
  ```

4. 返回一个包含年月日时分秒毫秒的对象

  ```javascript
  var timeObj = moment().toObject()
  console.log(timeObj)
  ```

## 取值

### 获取当前时间

这里默认调取的是本地时间，不传参数即可。

```javascript
// moment() = moment(new Date())
moment()
```

### 获取指定的某天

1. 本周的第一天

  ```javascript
  var weekFirstDay = moment().startOf('week')
  console.log('本周的第一天', weekFirstDay.format('YYYY-MM-DD'))
  ```

2. 本周的最后一天

  ```javascript
  var weekLastDay = moment().endOf('week')
  console.log('本周的最后一天', weekLastDay.format('YYYY-MM-DD'))
  ```

3. 本月的第一天

  ```javascript
  var monthFirstDay = moment().startOf('week')
  console.log('本周的第一天', weekFirstDay.format('YYYY-MM-DD'))
  ```

4. 本月的最后一天

  ```javascript
  var monthLastDay = moment().endOf('month')
  console.log('本月的最后一天', monthLastDay.format('YYYY-MM-DD'))
  ```

5. 上个月的第一天

  ```javascript
  var prevMonthFirstDay = moment().subtract(1, 'months').startOf('month')
  console.log('上个月的第一天', prevMonthFirstDay.format('YYYY-MM-DD'))
  ```

6. 下个月的最后一天

  ```javascript
  var nextMonthLastDay = moment().add(1, 'months').endOf('month')
  console.log('下个月的最后一天', nextMonthLastDay.format('YYYY-MM-DD'))
  ```

7. 某年某月的第一天

  ```javascript
  var someDayFirstDay = moment('2016-09-12').startOf('month')
  console.log('某年某月月的第一天', someDayFirstDay.format('YYYY-MM-DD'))
  ```

8. 某年某月的最后一天

  ```javascript
  var someDayLastDay = moment('2016-09-12').endOf('month')
  console.log('某年某月月的最后一天', someDayLastDay.format('YYYY-MM-DD'))
  ```

9. 7天前的日期

  ```javascript
  var DaysBefore7 = moment().subtract(7, 'days')
  console.log('7天前', DaysBefore7.format('YYYY-MM-DD'))
  ```

10. 30天后的日期

  ```javascript
  var DaysAfter30 = moment().add(30, 'days')
  console.log('30天后', DaysAfter30.format('YYYY-MM-DD'))
  ```

### 获取时间间距

1. 某天距离当前相隔时间

  ```javascript
  var date = '2020-06-04 16:05:32'
  // 当前时间为 2020-06-05 09:42
  console.log(moment(date).fromNow()) // 18 小时前
  ```

  ```javascript
  var date = '2019-06-06 06:05:32'
  // 当前时间为 2020-06-05 09:42
  console.log(moment(date).fromNow()) // 1 年前
  console.log(moment(date).fromNow(true)) // 1 年
  ```

2. 日期A与日期B相隔天数

  ```javascript
  var dateA = '2020-06-04 16:05:32'
  var dateB = '2019-06-06 06:05:32'
  var a = moment(dateA)
  var b = moment(dateB)
  console.log('时间A距离时间B的间隔', a.from(b)) // 1 年后
  console.log('时间A距离时间B的间隔', a.from(b, true)) // 1 年
  ```

## 查询

1. 时间A是否在时间B之前

  ```javascript
  var a1 = '2019-06-05'
  var b1 = '2020/02/09'
  console.log(moment(a1).isBefore(b1))
  ```

2. 时间A是和时间B是同一年

  ```javascript
  var a2 = '2020-06-05'
  var b2 = '2020/02/09'
  console.log(moment(a1).isSame(b1, 'year'))
  ```

3. 查询变量是否为moment对象

  ```javascript
  var a3 = moment('2015-05-15')
  var b3 = '2015-05-15'
  console.log(moment.isMoment(a3), moment.isMoment(b3))
  ```

4. 查询变量是否为原生 js Date 对象

  ```javascript
  var a4 = new Date('2015-05-15')
  var b4 = '2015-05-15'
  console.log(moment.isDate(a4), moment.isDate(b4))
  ```

> 参考资料：

1. Github: [Moment](https://github.com/moment/moment)

2. [Moment中文网](http://momentjs.cn/)