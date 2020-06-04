---
title: Angular 基础
date: 2020-05-14 17:20:00
update: 2020-05-15 14:20:00
tags:
  - Javascript
  - Angular
  - 待填坑
categories: Angular开发
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

## ionic

## UI框架

1. [https://material.angular.io/](https://material.angular.io/) 适合PC端使用

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
