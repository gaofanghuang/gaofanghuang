---
title: Angular 基础
date: 2020-05-14 17:20:00
update: 2021-05-10 16:00:00
tags:
  - Javascript
  - Angular
  - 待填坑
categories: Angular开发
---

Angular，简称 ng 。

## 语法

### 循环

1. 基础循环

  ```html
  <div *ngFor="let item of list">{{ name }}</div>
  ```

2. 显示当前是第几个数据

  ```html
  <div *ngFor="let item of list; let i = index">第{{ i }}名：{{ name }}</div>
  ```

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

### 双向绑定

在 *Angular* 中，`()`是单向数据流，从视图目标到数据源，`[()]`是双向绑定，原理是 监听子组件内部发射的事件，然后赋值。

**特别注意**：双向绑定时，子组件向父组件发射事件，事件名一定要以 `xxxChange` 这个格式命名，其中 `xxx` 为父组件中 `[()]` 里需要双向绑定的参数， 如 `listChange`。

简单的例子：

*子组件*:

```html
<div>
  <input [(ngModel)]="count" type="number" />
</div>
```

```typescript
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
})
export class CounterComponent implements OnInit {
  @Input() count = 0;
  @Output() countChange = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  subtract() {
    this.count = this.count - 1;
    console.log('subtract', this.count);
    this.countChange.emit(this.count);
  }

  add() {
    this.count = this.count + 1;
    console.log('add', this.count);
    this.countChange.emit(this.count);
  }
}
```

*父组件*:

```html
<ion-header>
  <ion-toolbar>
    <ion-title>
      Tab 1
    </ion-title>
  </ion-toolbar>
</ion-header>

<ion-content>
  <app-counter [(count)]="countValue"></app-counter>
  <div class="counter-label">当前统计值：{{ countValue }}</div>
</ion-content>
```

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  countValue = 0;

  constructor() {}

}
```

## ng cli

### 常用命令

1. 创建一个新组件

  ```shell
  # 创建一个新组件
  ng generate component 组件名称
  # 或，g 为 generate 的简写
  ng g component 组件名称
  # 或，c 为 component 的简写
  ng g c 组件名称
  ```

2. 创建新服务

  ```shell
  ng g service 服务名称
  ```

3. 创建一个简易的模型类(class)

  ```shell
  ng g class 类名称
  ```

4. 生成一个新路由(route)

  ```shell
  ng generate route 路由名称
  ```

5. 生成一个新指令(directive)

  ```shell
  ng generate directive 指令名称
  ```

6. 生成一个新管道(pipe)

   ```shell
   ng generate pipe 管道名称
   ```

7. 创建路由配置文件

  ```shell
  ng generate module app-routing --flat --module=app
  ```

  生成的 `app-routing.module.ts` 和 `app-routing.module.spec.ts` 是与 `app.module.ts` 在同一目录下的，也就是都在 `src/app` 目录下。

## 生态

## ionic

### 常用命令



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
