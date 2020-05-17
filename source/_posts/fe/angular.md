---
title: angular
date: 2020-05-14 17:20:00
update: 2020-05-15 14:20:00
tags:
  - javascript
  - angular
  - 待填坑
categories: 前端笔记
---

## 语法

### 管道

类似于 Vue 中的过滤器

```html
<span>{{year | date:'yyyy'}}</span>
```

<!--more-->

#### angular 内置过滤器

具体参数查阅 angular 官方文档 [pipe](https://angular.cn/api?type=pipe)

#### 自定义过滤器

```javascript
// exponential-strength.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'exponentialStrength'})
export class ExponentialStrengthPipe implements PipeTransform {
  transform(value: number, exponent?: number): number {
    return Math.pow(value, isNaN(exponent) ? 1 : exponent);
  }
}
```

## 生态

## 常见问题

1. angular 中使用 `for...in...` 编辑器报错`[tslint] for (... in ...) statements must be filtered with an if statement (for in)`

```javascript
for (var key in itemArr) {
  // 报错[tslint] for (... in ...) statements must be filtered with an if statement (forin)
}
```

解决方案：

改为 `for...of...`

```javascript
for (const key of Object.keys(itemArr)) {
}
```