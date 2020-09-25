---
title: Flex 和 grid 布局详解
date: 2020-09-25 10:00:00
update: 2020-09-25 10:00:00
tags:
  - CSS
  - Flex
  - grid
  - 布局
categories: CSS笔记
---

Flex 布局，即弹性布局，任何一个容器都可以设置为 Flex 布局。

Grid 布局，即网格布局，任何一个容器都可以设置为 Grid 布局。

> Flex 布局是轴线布局，只能指定"项目"针对轴线的位置，可以看作是一维布局。Grid 布局则是将容器划分成"行"和"列"，产生单元格，然后指定"项目所在"的单元格，可以看作是二维布局。Grid 布局远比 Flex 布局强大。

<!--more-->

<style>
.base-flex {
  display: flex;
}
.base-gird {
  display: grid;
}
.base-box {
  width: 300px;
  min-height: 100px;
  background: #f2f2f2;
  margin-bottom: 1rem;
}
.base-dot {
  width: 30px;
  height: 30px;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
}
.dot-big {
  width: 100px;
}
.color1 {
  background: #79E2B7;
}
.color2 {
  background: #28C5C2;
}
.color3 {
  background: #8347ff;
}
.row {
  flex-direction: row;
}
.row-reverse {
  flex-direction: row-reverse;
}
.column {
  flex-direction: column;
}
.column-reverse {
  flex-direction: column-reverse;
}
.nowrap {
  flex-wrap: nowrap;
}
.wrap {
  flex-wrap: wrap;
}
.wrap-reverse {
  flex-wrap: wrap-reverse;
}
.x-start {
  justify-content: flex-start;
}
.x-end {
  justify-content: flex-end;
}
.x-center {
  justify-content: center;
}
.x-between {
  justify-content: space-between;
}
.x-around {
  justify-content: space-around;
}
.x-evenly {
  justify-content: space-evenly;
}
.y-start {
  align-items: flex-start;
}
.y-end {
  align-items: flex-end;
}
.y-center {
  align-items: center;
}
.y-baseline {
  align-items: baseline;
}
.y-stretch {
  align-items: stretch;
}
.table {
  height: auto;
}
.table-row {
  width: 100%;
}
.table-cell {
  flex: 1;
}
.y-stretch .table-cell {
  height: auto;
}
.all-y-start {
  align-content: flex-start;
}
.all-y-end {
  align-content: flex-end;
}
.all-y-center {
  align-content: center;
}
.all-y-between {
  align-content: space-between;
}
.all-y-around {
  align-content: space-around;
}
.all-y-stretch {
  align-content: stretch;
}
.row-start {
  justify-items: flex-start;
}
.row-end {
  justify-items: flex-end;
}
.row-center {
  justify-items: center;
}
.row-stretch {
  justify-items: stretch;
}
.row-baseline {
  justify-items: baseline;
}
.row-h312 {
  grid-template-rows: 30% 10% 20%;
}
.col-w312 {
  grid-template-columns: 30% 10% 20%;
}
.gird-9 {
  grid-template-rows: 33.33% 33.33% 33.33%;
  grid-template-columns: 33.33% 33.33% 33.33%;
}
.gird-16 {
  grid-template-rows: repeat(4, 25%);
  grid-template-columns: repeat(4, 25%);
}
</style>

## 1. Flex基础语法

```scss
.base-flex {
  display: flex;
  // or 行内弹性布局
  // display: inline-flex;
}
```

**注意**，设为 Flex 布局以后，子元素的 `float`、`clear` 和 `vertical-align` 属性将失效。

![](/images/flex/axis.png)

### 1.1 Flex容器的属性

#### 1.1.1 flex-direction

`flex-direction`: 项目的排列方向

- row 从左到右
- row-reverse 从右到左
- column 从下到上
- column-reverse 从上到下

flex-direction: `row` | `row-reverse` | `column` | `column-reverse`;

**例**：

```html
<div class="base-box base-flex">
  <div class="base-dot color1">1</div>
  <div class="base-dot color2">2</div>
  <div class="base-dot color3">3</div>
</div>
```

- 项目沿 X 轴方向，从左到右排列

```css
.row {
  flex-direction: row;
}
```

<div class="base-box base-flex row">
  <div class="base-dot color1">1</div>
  <div class="base-dot color2">2</div>
  <div class="base-dot color3">3</div>
</div>

- 项目沿 X 轴方向，从右到左排列

```css
.row-reverse {
  flex-direction: row-reverse;
}
```

<div class="base-box base-flex row-reverse">
  <div class="base-dot color1">1</div>
  <div class="base-dot color2">2</div>
  <div class="base-dot color3">3</div>
</div>

- 项目沿 Y 轴方向，从下到上排列

```css
.column {
  flex-direction: column;
}
```

<div class="base-box base-flex column">
  <div class="base-dot color1">1</div>
  <div class="base-dot color2">2</div>
  <div class="base-dot color3">3</div>
</div>

- 项目沿 Y 轴方向，从上到下排列

```css
.column-reverse {
  flex-direction: column-reverse;
}
```

<div class="base-box base-flex column-reverse">
  <div class="base-dot color1">1</div>
  <div class="base-dot color2">2</div>
  <div class="base-dot color3">3</div>
</div>

#### 1.1.2 flex-wrap

`flex-wrap`: 项目的换行方式

- nowrap 不换行
- wrap 换行，从上到下，第一行在上方
- wrap-reverse 换行，从下到上，第一行在下方

flex-wrap: `nowrap` | `wrap` | `wrap-reverse`;

**例**：

- 项目不换行

```css
.nowrap {
  flex-wrap: nowrap;
}
```

<div class="base-box base-flex nowrap">
  <div class="base-dot dot-big color1">1</div>
  <div class="base-dot dot-big color2">2</div>
  <div class="base-dot dot-big color3">3</div>
  <div class="base-dot dot-big color1">4</div>
  <div class="base-dot dot-big color2">5</div>
  <div class="base-dot dot-big color3">6</div>
  <div class="base-dot dot-big color1">7</div>
  <div class="base-dot dot-big color2">8</div>
  <div class="base-dot dot-big color3">9</div>
</div>

- 项目换行

```css
.wrap {
  flex-wrap: wrap;
}
```

<div class="base-box base-flex wrap">
  <div class="base-dot dot-big color1">1</div>
  <div class="base-dot dot-big color2">2</div>
  <div class="base-dot dot-big color3">3</div>
  <div class="base-dot dot-big color1">4</div>
  <div class="base-dot dot-big color2">5</div>
  <div class="base-dot dot-big color3">6</div>
  <div class="base-dot dot-big color1">7</div>
  <div class="base-dot dot-big color2">8</div>
  <div class="base-dot dot-big color3">9</div>
</div>

- 项目换行，从下到上，第一行在下方

```css
.wrap-reverse {
  flex-wrap: wrap-reverse;
}
```

<div class="base-box base-flex wrap-reverse">
  <div class="base-dot dot-big color1">1</div>
  <div class="base-dot dot-big color2">2</div>
  <div class="base-dot dot-big color3">3</div>
  <div class="base-dot dot-big color1">4</div>
  <div class="base-dot dot-big color2">5</div>
  <div class="base-dot dot-big color3">6</div>
  <div class="base-dot dot-big color1">7</div>
  <div class="base-dot dot-big color2">8</div>
  <div class="base-dot dot-big color3">9</div>
</div>

#### 1.1.3 flex-flow

`flex-flow`: 项目的排列方向和换行方式缩写，默认值为 row nowrap

flex-flow: `<flex-direction>` || `<flex-wrap>`

**例**：

```html
<div class="base-box base-flex row-reverse wrap-reverse">
  <div class="base-dot dot-big color1">1</div>
  <div class="base-dot dot-big color2">2</div>
  <div class="base-dot dot-big color3">3</div>
  <div class="base-dot dot-big color1">4</div>
  <div class="base-dot dot-big color2">5</div>
  <div class="base-dot dot-big color3">6</div>
  <div class="base-dot dot-big color1">7</div>
  <div class="base-dot dot-big color2">8</div>
  <div class="base-dot dot-big color3">9</div>
</div>
```

<div class="base-box base-flex row-reverse wrap-reverse">
  <div class="base-dot dot-big color1">1</div>
  <div class="base-dot dot-big color2">2</div>
  <div class="base-dot dot-big color3">3</div>
  <div class="base-dot dot-big color1">4</div>
  <div class="base-dot dot-big color2">5</div>
  <div class="base-dot dot-big color3">6</div>
  <div class="base-dot dot-big color1">7</div>
  <div class="base-dot dot-big color2">8</div>
  <div class="base-dot dot-big color3">9</div>
</div>

#### 1.1.4 justify-content

`justify-content`: 项目 X 轴的对齐方式

- flex-start 向开始端对齐，默认为左
- flex-end 向结束端对齐，默认为右
- center 水平居中对齐
- space-between 两端对齐，项目之间的间隔都相等
- space-around 每个项目两侧的间隔相等（项目之间的间隔比项目与边框的间隔大一倍）
- space-evenly 项目到容器的边距比与项目之前的间隔比一致

justify-content: `flex-start` | `flex-end` | `center` | `space-between` | `space-around` | `space-evenly`;

**例**：

- 项目沿 X 轴方向，向*开始端*对齐

```css
.x-start {
  justify-content: flex-start;
}
```

<div class="base-box base-flex x-start">
  <div class="base-dot color1">1</div>
  <div class="base-dot color2">2</div>
  <div class="base-dot color3">3</div>
</div>

**Tips**: 当设置了 `flex-direction: row-reverse;` 时，`justify-content: flex-start;` 不起作用, 是因为设置 flex-direction 后，轴线的方向发生变化，`flex-start` 方向也随之变化。

```html
<div class="base-box base-flex row-reverse x-start">
  <div class="base-dot color1">1</div>
  <div class="base-dot color2">2</div>
  <div class="base-dot color3">3</div>
</div>
```

<div class="base-box base-flex row-reverse x-start">
  <div class="base-dot color1">1</div>
  <div class="base-dot color2">2</div>
  <div class="base-dot color3">3</div>
</div>

```html
<div class="base-box base-flex row-reverse x-end">
  <div class="base-dot color1">1</div>
  <div class="base-dot color2">2</div>
  <div class="base-dot color3">3</div>
</div>
```

<div class="base-box base-flex row-reverse x-end">
  <div class="base-dot color1">1</div>
  <div class="base-dot color2">2</div>
  <div class="base-dot color3">3</div>
</div>

- 项目沿 X 轴方向，向*结束端*对齐

```css
.x-end {
  justify-content: flex-end;
}
```

<div class="base-box base-flex x-end">
  <div class="base-dot color1">1</div>
  <div class="base-dot color2">2</div>
  <div class="base-dot color3">3</div>
</div>

- 项目沿 X 轴方向，向中间对齐

```css
.x-center {
  justify-content: center;
}
```

<div class="base-box base-flex x-center">
  <div class="base-dot color1">1</div>
  <div class="base-dot color2">2</div>
  <div class="base-dot color3">3</div>
</div>

- 项目沿 X 轴方向，两端对齐，项目到容器的边距为 0，项目之间的间隔均等

```css
.x-between {
  justify-content: space-between;
}
```

<div class="base-box base-flex x-between">
  <div class="base-dot color1">1</div>
  <div class="base-dot color2">2</div>
  <div class="base-dot color3">3</div>
</div>

- 项目沿 X 轴方向，项目到容器的边距*比*为 1，项目之间的间隔*比*为 2

```css
.x-around {
  justify-content: space-around;
}
```

<div class="base-box base-flex x-around">
  <div class="base-dot color1">1</div>
  <div class="base-dot color2">2</div>
  <div class="base-dot color3">3</div>
</div>

**Tips**：这里想要项目到容器的边距比与项目之前的间隔比一致的话，可以使用 `space-between` 属性, 再给容器设置宽高为 0 的伪元素`before`、`after`，即可。更简单的方法，使用`space-evenly`。

```css
.box-padding:before,
.box-padding:after {
  display: block;
  width: 0;
  height: 0;
  content: '';
}
```

```html
<div class="base-box base-flex x-between box-padding">
  <div class="base-dot color1">1</div>
  <div class="base-dot color2">2</div>
  <div class="base-dot color3">3</div>
</div>
```

<style>
  .box-padding:before,
  .box-padding:after {
    display: block;
    width: 0;
    height: 0;
    content: "";
  }
</style>
<div class="base-box base-flex x-between box-padding">
  <div class="base-dot color1">1</div>
  <div class="base-dot color2">2</div>
  <div class="base-dot color3">3</div>
</div>

- 项目到容器的边距比与项目之前的间隔比一致

**Tips**: 注意该属性部分浏览器可能还未实现，如果考虑到兼容性，可以使用上面的方法。

```css
.x-evenly {
  justify-content: space-evenly;
}
```

<div class="base-box base-flex x-evenly">
  <div class="base-dot color1">1</div>
  <div class="base-dot color2">2</div>
  <div class="base-dot color3">3</div>
</div>

#### 1.1.5 align-items

`align-items`: 项目 Y 轴的对齐方式

- flex-start 向开始端对齐，默认为上
- flex-end 向结束端对齐，默认为下
- center 垂直居中对齐
- baseline 项目里第一行文字的基线对齐
- stretch 如果项目未设置高度或设为 auto，将占满整个容器的高度

align-items: `flex-start` | `flex-end` | `center` | `baseline` | `stretch`;

**例**：

- 项目沿 Y 轴方向，向*开始端*对齐

```css
.y-start {
  align-items: flex-start;
}
```

<div class="base-box base-flex y-start">
  <div class="base-dot color1">1</div>
  <div class="base-dot color2">2</div>
  <div class="base-dot color3">3</div>
</div>

- 项目沿 Y 轴方向，向*结束端*对齐

```css
.y-end {
  align-items: flex-end;
}
```

<div class="base-box base-flex y-end">
  <div class="base-dot color1">1</div>
  <div class="base-dot color2">2</div>
  <div class="base-dot color3">3</div>
</div>

- 项目沿 Y 轴方向，向中间对齐

```css
.y-center {
  align-items: center;
}
```

<div class="base-box base-flex y-center">
  <div class="base-dot color1">1</div>
  <div class="base-dot color2">2</div>
  <div class="base-dot color3">3</div>
</div>

- 项目里第一行文字的基线对齐

```css
.y-baseline {
  align-items: baseline;
}
```

```html
<div class="base-box base-flex y-baseline">
  <div class="base-dot color1">1</div>
  <div class="base-dot color2">
    <div style="font-size: 1.6rem">2</div>
    <div style="font-size: 0.4rem">2.1</div>
  </div>
  <div class="base-dot color3" style="font-size: 0.8rem">3</div>
</div>
```

<div class="base-box base-flex y-baseline">
  <div class="base-dot color1">1</div>
  <div class="base-dot color2">
    <div style="font-size: 1.8rem">2</div>
    <div style="font-size: 0.8rem">2.1</div>
  </div>
  <div class="base-dot color3" style="font-size: 1.2rem">3</div>
</div>

- 如果项目未设置高度或设为 auto，将占满整个容器的高度

```css
.y-stretch {
  align-items: stretch;
}
```

<div class="base-box base-flex y-stretch">
  <div class="base-dot color1" style="height: auto">1</div>
  <div class="base-dot color2" style="height: auto">2</div>
  <div class="base-dot color3" style="height: auto">3</div>
</div>

**Tips**：`stretch` 这个属性在显示表格数据的时候，可以使单元格高度自适应。

```html
<div class="base-box table base-flex wrap">
  <div class="base-flex table-row">
    <div class="table-cell base-dot color1">1</div>
    <div class="table-cell base-dot color2">2</div>
    <div class="table-cell base-dot color3">3</div>
  </div>
  <div class="base-flex table-row">
    <div class="table-cell base-flex x-center y-center y-stretch">
      <div class="table-cell base-dot color1">4</div>
    </div>
    <div class="table-row table-cell">
      <div class="table-row table-cell base-dot color2">5</div>
      <div class="table-row table-cell base-dot color3">6</div>
    </div>
  </div>
</div>
```

<div class="base-box table base-flex wrap">
  <div class="base-flex table-row">
    <div class="table-cell base-dot color1">1</div>
    <div class="table-cell base-dot color2">2</div>
    <div class="table-cell base-dot color3">3</div>
  </div>
  <div class="base-flex table-row">
    <div class="table-cell base-flex x-center y-center y-stretch">
      <div class="table-cell base-dot color1">4</div>
    </div>
    <div class="table-row table-cell">
      <div class="table-row table-cell base-dot color2">5</div>
      <div class="table-row table-cell base-dot color3">6</div>
      <div class="table-row table-cell base-dot color1">7</div>
    </div>
  </div>
</div>

#### 1.1.6 align-content

`align-content`: 多根轴线的对齐方式(仅存在多根轴线时起作用)

**Tips**: 

1. 当`flex-wrap: wrap`时，项目会自动换行，此时就产生了多根轴线，项目换了几行就有几根轴线。这里说的轴线仅表示Y轴。

2. 当存在多轴线时，`align-items: flex-start`不起作用。

- flex-start 向开始端对齐
- flex-end 向结束端对齐
- center 垂直居中对齐
- space-between 两端对齐，项目之间的间隔都相等
- space-around 每个项目两侧的间隔相等（项目之间的间隔比项目与边框的间隔大一倍）
- stretch 如果项目未设置高度或设为 auto，将占满整个容器的高度

align-content: `flex-start` | `flex-end` | `center` | `space-between` | `space-around` | `stretch`;

**例**：

- 项目沿 Y 轴方向，向开始端对齐

```css
.all-y-start {
  align-content: flex-start;
}
```

<div class="base-box base-flex wrap all-y-start" style="height: 120px">
  <div class="base-dot dot-big color1">1</div>
  <div class="base-dot dot-big color2">2</div>
  <div class="base-dot dot-big color3">3</div>
  <div class="base-dot dot-big color1">4</div>
  <div class="base-dot dot-big color2">5</div>
  <div class="base-dot dot-big color3">6</div>
  <div class="base-dot dot-big color1">7</div>
  <div class="base-dot dot-big color2">8</div>
  <div class="base-dot dot-big color3">9</div>
</div>

- 项目沿 Y 轴方向，向结束端对齐

```css
.all-y-end {
  align-content: flex-end;
}
```

<div class="base-box base-flex wrap all-y-end" style="height: 120px">
  <div class="base-dot dot-big color1">1</div>
  <div class="base-dot dot-big color2">2</div>
  <div class="base-dot dot-big color3">3</div>
  <div class="base-dot dot-big color1">4</div>
  <div class="base-dot dot-big color2">5</div>
  <div class="base-dot dot-big color3">6</div>
  <div class="base-dot dot-big color1">7</div>
  <div class="base-dot dot-big color2">8</div>
  <div class="base-dot dot-big color3">9</div>
</div>

- 项目沿 Y 轴方向，向中间对齐

```css
.all-y-center {
  align-content: center;
}
```

<div class="base-box base-flex wrap all-y-center" style="height: 120px">
  <div class="base-dot dot-big color1">1</div>
  <div class="base-dot dot-big color2">2</div>
  <div class="base-dot dot-big color3">3</div>
  <div class="base-dot dot-big color1">4</div>
  <div class="base-dot dot-big color2">5</div>
  <div class="base-dot dot-big color3">6</div>
  <div class="base-dot dot-big color1">7</div>
  <div class="base-dot dot-big color2">8</div>
  <div class="base-dot dot-big color3">9</div>
</div>

- 项目沿 Y 轴方向，两端对齐，项目之间的间隔都相等

```css
.all-y-between {
  align-content: space-between;
}
```

<div class="base-box base-flex wrap all-y-between" style="height: 120px">
  <div class="base-dot dot-big color1">1</div>
  <div class="base-dot dot-big color2">2</div>
  <div class="base-dot dot-big color3">3</div>
  <div class="base-dot dot-big color1">4</div>
  <div class="base-dot dot-big color2">5</div>
  <div class="base-dot dot-big color3">6</div>
  <div class="base-dot dot-big color1">7</div>
  <div class="base-dot dot-big color2">8</div>
  <div class="base-dot dot-big color3">9</div>
</div>

- 项目沿 Y 轴方向，每个项目两侧的间隔相等（项目之间的间隔比项目与边框的间隔大一倍）

```css
.all-y-around {
  align-content: space-around;
}
```

<div class="base-box base-flex wrap all-y-around" style="height: 120px">
  <div class="base-dot dot-big color1">1</div>
  <div class="base-dot dot-big color2">2</div>
  <div class="base-dot dot-big color3">3</div>
  <div class="base-dot dot-big color1">4</div>
  <div class="base-dot dot-big color2">5</div>
  <div class="base-dot dot-big color3">6</div>
  <div class="base-dot dot-big color1">7</div>
  <div class="base-dot dot-big color2">8</div>
  <div class="base-dot dot-big color3">9</div>
</div>

- 如果项目未设置高度或设为 auto，将占满整个容器的高度

```css
.all-y-stretch {
  align-content: stretch;
}
```

<div class="base-box base-flex wrap all-y-stretch" style="height: 120px">
  <div class="base-dot dot-big color1" style="height: auto">1</div>
  <div class="base-dot dot-big color2" style="height: auto">2</div>
  <div class="base-dot dot-big color3" style="height: auto">3</div>
  <div class="base-dot dot-big color1" style="height: auto">4</div>
  <div class="base-dot dot-big color2" style="height: auto">5</div>
  <div class="base-dot dot-big color3" style="height: auto">6</div>
  <div class="base-dot dot-big color1" style="height: auto">7</div>
  <div class="base-dot dot-big color2" style="height: auto">8</div>
  <div class="base-dot dot-big color3" style="height: auto">9</div>
</div>

## 2. Grid基础语法

```scss
.base-grid {
  display: grid;
  // or 行内网格布局
  // display: inline-grid;
}
```

**注意**，设为网格布局以后，容器项目的`float`、`display: inline-block`、`display: table-cell`、`vertical-align`和`column-*`等设置都将失效。

### 2.1 Grid容器的属性

#### 2.1.1 grid-template-rows & grid-template-columns

- `grid-template-rows`：设置网格中每一行的行高。

```css
.row-h312 {
  grid-template-rows: 30% 10% 20%;
}
```

<div class="base-box base-gird row-h312">
  <div class="base-dot color1">1</div>
  <div class="base-dot color2">2</div>
  <div class="base-dot color3">3</div>
</div>

- `grid-template-columns`：设置网格中每一列的列宽。

```css
.col-w312 {
  grid-template-columns: 30% 10% 20%;
}
```

<div class="base-box base-gird col-w312">
  <div class="base-dot color1">1</div>
  <div class="base-dot color2">2</div>
  <div class="base-dot color3">3</div>
</div>

- 切分九宫格

```css
.gird-9 {
  grid-template-rows: 33.33% 33.33% 33.33%;
  grid-template-columns: 33.33% 33.33% 33.33%;
}
```

<div class="base-box base-gird gird-9">
  <div class="base-dot color1">1</div>
  <div class="base-dot color2">2</div>
  <div class="base-dot color3">3</div>
  <div class="base-dot color1">4</div>
  <div class="base-dot color2">5</div>
  <div class="base-dot color3">6</div>
  <div class="base-dot color1">7</div>
  <div class="base-dot color2">8</div>
  <div class="base-dot color3">9</div>
</div>

- repeat() 自动重复切割

```css
.gird-16 {
  grid-template-rows: repeat(4, 25%);
  grid-template-columns: repeat(4, 25%);
}
```

<div class="base-box base-gird gird-16">
  <div class="base-dot color1">1</div>
  <div class="base-dot color2">2</div>
  <div class="base-dot color3">3</div>
  <div class="base-dot color1">4</div>
  <div class="base-dot color2">5</div>
  <div class="base-dot color3">6</div>
  <div class="base-dot color1">7</div>
  <div class="base-dot color2">8</div>
  <div class="base-dot color3">9</div>
  <div class="base-dot color1">10</div>
  <div class="base-dot color2">11</div>
  <div class="base-dot color3">12</div>
  <div class="base-dot color1">13</div>
  <div class="base-dot color2">14</div>
  <div class="base-dot color3">15</div>
  <div class="base-dot color3">16</div>
</div>

------------ **to be continue** ------------

#### 2.1.x justify-items

`justify-items`: xxx的对齐方式。

- start 向开始端对齐，默认为左
- end 向结束端对齐，默认为右
- center 水平居中对齐
- stretch 如果项目未设置高度或设为 auto，将占满整个容器的高度

justify-items: `start` | `end` | `center` | `stretch`;

- 向开始端对齐

```css
.row-start {
  justify-content: flex-start;
}
```

<div class="base-box base-gird row-start">
  <div class="base-dot color1">1</div>
  <div class="base-dot color2">2</div>
  <div class="base-dot color3">3</div>
</div>

## 参考资料

> 1. [《Flex 布局教程：语法篇》 by 阮一峰](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

> 2. [《CSS Grid 网格布局教程》 by 阮一峰](http://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html)

> 3. [《Box alignment in Flexbox》 by MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Box_Alignment/Box_Alignment_in_Flexbox)
