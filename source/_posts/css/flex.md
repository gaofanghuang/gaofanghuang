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

> Flex 布局是轴线布局，只能指定"项目"针对轴线的位置，可以看作是一维布局。Grid 布局则是将容器划分成"行"和"列"，产生单元格，然后指定"项目所在"的单元格，可以看作是二维布局。

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
.gird-16-2 {
  grid-template-rows: repeat(2, 10px 50px);
  grid-template-columns: repeat(2, 10px 50px 80px);
}
.gird-16-3 {
  grid-template-rows: repeat(2, 10px 50px);
  grid-template-columns: repeat(auto-fill, 50px);
}
.gird-fr-1-2 {
  grid-template-rows: repeat(2, 30px);
  grid-template-columns: repeat(2, 1fr 2fr);
}
.gird-fr-50-3-1 {
  grid-template-rows: repeat(2, 30px);
  grid-template-columns: 50px 3fr 1fr;
}
.gird-minmax-20-50 {
  grid-template-columns: 1fr 2fr minmax(20px, 50px);
}
.gird-r3-minmax-20-50 {
  grid-template-columns: repeat(3, 1fr 2fr minmax(20px, 50px));
}
.gird-auto-1 {
  grid-template-columns: 1fr auto 2fr;
}
.gird-name {
  grid-template-rows: [r1] 50px [r2] 100px [r3];
  grid-template-columns: [c1] 50px [c2] 30px [c3] 80px [c4];
}
.gird-gap-10-10 {
  gap: 10px 10px;
}
.gird-area-9 {
  grid-template-areas: 'g1 g2 g3'
                       'g4 g5 g6'
                       'g7 g8 g9';
}
.gird-flow-row {
  grid-auto-flow: row;
}
.gird-flow-column {
  grid-auto-flow: column;
}
.gird-flow-dense {
  grid-auto-flow: row dense;
}
.gird-flow-dense .base-dot {
  width: 100%;
  height: 100%;
}
.dot-1 {
  grid-row-start: 1;
  grid-row-end: 3;  
}
.dot-2 {
  grid-row-start: 1;
  grid-row-end: 4;  
}
.dot-3 {
  grid-row-start: 1;
  grid-row-end: 5;  
}
.dot-4 {
  grid-row-start: r2;
  grid-row-end: r3;  
  grid-column-start: c2;
  grid-column-end: c3;
}
.dot-5 {
  grid-row-start: g6-start;
  grid-row-end: g9-end;  
  grid-column-start: g6-start;
  grid-column-end: g9-end;
}
.dot-6 {
  grid-row-start: span 3; 
  grid-column-start: span 2;
}
.dot-7 {
  grid-row: g3-start / g5-end; 
  grid-column: g3-start / g5-end;
}
.z-9 {
  z-index: 9;
}
.gird-x-center {
  justify-items: center;
}
.gird-y-center {
  align-items: center;
}
.gird-x-c-center {
  justify-content: center;
}
.gird-y-c-center {
  align-content: center;
}
.gird-auto-row {
  grid-auto-rows: 20px;
}
.area-5 {
  grid-area: g5;
}
.order-9 {
  order: 9;
}
.grow-2 {
  flex-grow: 2;
}
.grow-3 {
  flex-grow: 3;
}
.shrink-0 {
  flex-shrink: 0;
}
.shrink-2 {
  flex-shrink: 2;
}
.basis-1 {
  flex-basis: 100px;
}
.basis-half {
  flex-basis: 50%;
}
</style>

## 1. Flex 基础语法

```scss
.base-flex {
  display: flex;
  // or 行内弹性布局
  // display: inline-flex;
}
```

**注意**，设为 Flex 布局以后，子元素的 `float`、`clear` 和 `vertical-align` 属性将失效。

![](/images/flex/axis.png)

### 1.1 Flex 容器的属性

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

1. 当`flex-wrap: wrap`时，项目会自动换行，此时就产生了多根轴线，项目换了几行就有几根轴线。这里说的轴线仅表示 Y 轴。

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

### 1.2 Flex 项目的属性

#### 1.2.1 order

`order`: 定义项目的排列顺序，数值小的排前面。默认为 0。

```css
.order-9 {
  order: 9;
}
```

<div class="base-box base-flex">
  <div class="base-dot color1 order-9">1</div>
  <div class="base-dot color2">2</div>
  <div class="base-dot color3">3</div>
</div>

#### 1.2.2 flex-grow

`flex-grow`：属性定义项目的放大比例，数字越大占的比例越大。默认为 0。为 0 时，即使存在剩余空间，也不放大。

```css
.grow-2 {
  flex-grow: 2;
}
.grow-3 {
  flex-grow: 3;
}
```

<div class="base-box base-flex">
  <div class="base-dot color1">1</div>
  <div class="base-dot color2 grow-2">2</div>
  <div class="base-dot color3 grow-3">3</div>
</div>


#### 1.2.3 flex-shrink

`flex-shrink`：属性定义了项目的缩小比例，默认为 1，即如果空间不足，该项目将缩小。为 0 时，即使空间不足也不缩小。

```css
.shrink-0 {
  flex-shrink: 0;
}
.shrink-2 {
  flex-shrink: 2;
}
```

<div class="base-box base-flex">
  <div class="base-dot dot-big color1">1</div>
  <div class="base-dot dot-big color2">2</div>
  <div class="base-dot dot-big color3 shrink-2">3</div>
  <div class="base-dot dot-big color1">4</div>
  <div class="base-dot dot-big color2">5</div>
  <div class="base-dot dot-big color3">6</div>
  <div class="base-dot dot-big color1 shrink-0">7</div>
  <div class="base-dot dot-big color2">8</div>
  <div class="base-dot dot-big color3">9</div>
</div>

#### 1.2.4 flex-basis

`flex-basis`：设置项目的初始大小

**Tips**：当一个元素同时被设置了 flex-basis (除值为 auto 外) 和 width (或者在 flex-direction: column 情况下设置了 height) ，flex-basis 具有更高的优先级。auto 表示项目的原大小。

flex-basis: `<width>` | `auto`

```css
.basis-1 {
  flex-basis: 100px;
}
.basis-half {
  flex-basis: 50%;
}
```

<div class="base-box base-flex">
  <div class="base-dot color1">1</div>
  <div class="base-dot color2 basis-1">2</div>
  <div class="base-dot color3 basis-half">3</div>
</div>

#### 1.2.5 flex

`flex`：`<flex-grow>`, `<flex-shrink>` 和 `<flex-basis>` 的简写，默认值为 0 1 auto。后两个属性可选。

两个快捷值：

1. auto (1 1 auto)

2. none (0 0 auto)

#### 1.2.6 align-self

align-self 类似于容器中的 align-items， 作用于项目，并且优先级高于容器中的 align-items。默认值为auto 时表示继承容器中的 align-items 的值，如果没有容器，则等同于 stretch。

align-self: `auto` | `flex-start` | `flex-end` | `center` | `baseline` | `stretch`;



## 2. Grid 基础语法

```scss
.base-grid {
  display: grid;
  // or 行内网格布局
  // display: inline-grid;
}
```

**注意**，设为网格布局以后，容器项目的`float`、`display: inline-block`、`display: table-cell`、`vertical-align`和`column-*`等设置都将失效。

### 2.1 Grid 容器的属性

#### 2.1.1 grid-template-rows & grid-template-columns

- `grid-template-rows`：设置网格中每一行的行高。

- `grid-template-columns`：设置网格中每一列的列宽。

**例**：

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

`repeat(<重复次数>, <重复的宽度>)`, *重复宽度*可以设置为多个值为一组，以空格隔开，*重复次数*可以使用`auto-fill`关键字来进行自动计算。

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

```css
.gird-16-2 {
  grid-template-rows: repeat(2, 10px 50px);
  grid-template-columns: repeat(2, 10px 50px 80px);
}
```

<div class="base-box base-gird gird-16-2">
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

```css
.gird-16-3 {
  grid-template-rows: repeat(2, 10px 50px);
  grid-template-columns: repeat(auto-fill, 50px);
}
```

<div class="base-box base-gird gird-16-3">
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

- fr 网格宽度比例

**Tips**: 使用`fr`作为网格宽度单位，并且使用`auto-fill`设置为`repeat()`的重复次数时，该样式不生效，此时 css 报错：_Invalid property value_。

```css
.gird-fr-1-2 {
  grid-template-rows: repeat(2, 30px);
  grid-template-columns: repeat(2, 1fr 2fr);
}
```

<div class="base-box base-gird gird-fr-1-2">
  <div class="base-dot color1">1</div>
  <div class="base-dot color2">2</div>
  <div class="base-dot color3">3</div>
  <div class="base-dot color1">4</div>
  <div class="base-dot color2">5</div>
  <div class="base-dot color3">6</div>
</div>

```css
.gird-fr-50-3-1 {
  grid-template-rows: repeat(2, 30px);
  grid-template-columns: 50px 3fr 1fr;
}
```

这里的意思是说，第一列宽为 50px，剩下的宽度为`(100% - 50px)`，然后第二列宽度为 `(100% - 50px)/ (3 + 1) * 3`，第三列宽度为 `(100% - 50px) / (3 + 1) * 1`。

<div class="base-box base-gird gird-fr-50-3-1">
  <div class="base-dot color1">1</div>
  <div class="base-dot color2">2</div>
  <div class="base-dot color3">3</div>
  <div class="base-dot color1">4</div>
  <div class="base-dot color2">5</div>
  <div class="base-dot color3">6</div>
</div>

- minmax() 宽度范围

`minmax(<最小值>, <最大值>)`

```css
.gird-minmax-20-50 {
  grid-template-columns: 1fr 2fr minmax(20px, 50px);
}
```

<div class="base-box base-gird gird-minmax-20-50">
  <div class="base-dot color1">1</div>
  <div class="base-dot color2">2</div>
  <div class="base-dot color3">3</div>
  <div class="base-dot color1">4</div>
  <div class="base-dot color2">5</div>
  <div class="base-dot color3">6</div>
</div>

```css
.gird-r3-minmax-20-50 {
  grid-template-columns: repeat(3, 1fr 2fr minmax(20px, 50px));
}
```

**Tips**：这里第 7、8、9 列的宽度和第 1、2、4 列的宽度不一致，是因为使用了 fr 为单位，此时列宽优先为单元格的列宽。

<div class="base-box base-gird gird-r3-minmax-20-50">
  <div class="base-dot color1">1</div>
  <div class="base-dot color2">2</div>
  <div class="base-dot color3">3</div>
  <div class="base-dot color1">4</div>
  <div class="base-dot color2">5</div>
  <div class="base-dot color3">6</div>
</div>

- auto 关键字

```css
.gird-auto-1 {
  grid-template-columns: 1fr auto 2fr;
}
```

**Tips**：当某列的宽设置为 auto 时，此时列宽优先为单元格的列宽。

<div class="base-box base-gird gird-auto-1">
  <div class="base-dot color1">1</div>
  <div class="base-dot color2">2</div>
  <div class="base-dot color3">3</div>
  <div class="base-dot color1">4</div>
  <div class="base-dot color2">5</div>
  <div class="base-dot color3">6</div>
</div>

- 网格线的命名

可以使用方括号`[]`，指定每一根网格线的名字。

```css
.gird-name {
  grid-template-rows: [r1] 50px [r2] 100px [r3];
  grid-template-columns: [c1] 50px [c2] 30px [c3] 80px [c4];
}
```

<div class="base-box base-gird gird-name">
  <div class="base-dot color1">1</div>
  <div class="base-dot color2">2</div>
  <div class="base-dot color3">3</div>
  <div class="base-dot color1">4</div>
  <div class="base-dot color2">5</div>
  <div class="base-dot color3">6</div>
</div>

#### 2.2.2 row-gap & column-gap & gap

- `row-gap` 行与行之间的间距

- `column-gap` 列与列之间的间距

- `gap` 行间距与列间距的简写 `gap: <row-gap> <column-gap>;`

```css
.gird-gap-10-10 {
  gap: 10px 10px;
}
```

<div class="base-box base-gird gird-9 gird-gap-10-10">
  <div class="base-dot color1">1</div>
  <div class="base-dot color2">2</div>
  <div class="base-dot color3">3</div>
  <div class="base-dot color1">4</div>
  <div class="base-dot color2">5</div>
  <div class="base-dot color3">6</div>
</div>

#### 2.2.3 grid-template-areas

`grid-template-areas`指定区域，一个区域由单个或多个单元格组成。

```css
.gird-area-9 {
  grid-template-areas:
    'g1 g2 g3'
    'g4 g5 g6'
    'g7 g8 g9';
}
```

**Tips**: 区域的命名会影响到网格线，每个区域的起始网格线，会自动命名为`[区域名-start]`，终止网格线自动命名为`[区域名-end]`。

<div class="base-box base-gird gird-9 gird-area-9">
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

**Q**：划分区域和网格线的作用？

**A**：可以在指定项目（单元格）位置和大小的时候使用，详见 → [2.2.1 grid-column-start & grid-column-end & grid-row-start & grid-row-end](#2-2-1-grid-column-start-amp-grid-column-end-amp-grid-row-start-amp-grid-row-end)

#### 2.2.4 grid-auto-flow

`grid-auto-flow`，指定项目的排列顺序。

- `row` 默认值`row`，先从左到右横排，如果第一行排满就切换到第二行，继续排。

- `column` 先从上到下竖排，如果第一列排满就切换到第二列，继续排。

- `row dense` 横排紧凑模式，如果出现空隙，则调度后面合适的项目填补

- `column dense` 竖排紧凑模式，如果出现空隙，则调度后面合适的项目填补

**Tips**: 使用`row dense`和`column dense`会打乱项目的顺序，适合在瀑布流排版的时候使用。

```css
.gird-flow-row {
  grid-auto-flow: row;
}
.gird-flow-column {
  grid-auto-flow: column;
}
```

<div class="base-box base-gird gird-9 gird-flow-column">
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

```css
.gird-flow-dense {
  grid-auto-flow: row dense;
}
```

<div class="base-box base-gird gird-16 gird-flow-dense gird-gap-10-10">
  <div class="base-dot color1 dot-1">1</div>
  <div class="base-dot color2">2</div>
  <div class="base-dot color3">3</div>
  <div class="base-dot color1 dot-3">4</div>
  <div class="base-dot color2 dot-2">5</div>
  <div class="base-dot color3">6</div>
  <div class="base-dot color1">7</div>
  <div class="base-dot color2">8</div>
  <div class="base-dot color3 dot-1">9</div>
</div>

#### 2.1.5 justify-items & align-items & place-items

- `justify-items`: 单元格内容的水平对齐方式。

start 向开始端对齐，默认为左
end 向结束端对齐，默认为右
center 水平居中对齐
stretch 如果项目未设置高度或设为 auto，将占满整个容器的高度

justify-items: `start` | `end` | `center` | `stretch`;

```css
.gird-x-center {
  justify-items: center;
}
```

<div class="base-box base-gird gird-9 gird-x-center">
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

- `align-items`: 单元格内容的垂直对齐方式。

align-items: `start` | `end` | `center` | `stretch`;

```css
.gird-y-center {
  align-items: center;
}
```

<div class="base-box base-gird gird-9 gird-y-center">
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

- `place-items`: justify-items 和 align-items 的简写，水平垂直居中的对齐方式

`place-items: start end;`，这里如果省略第二个值，则浏览器认为与第一个值相等。

#### 2.1.6 justify-content & justify-content & place-content

- `justify-content`: 内容区域(网格相对于容器)的水平对齐方式。

justify-content: `start` | `end` | `center` | `stretch` | `space-around` | `space-between` | `space-evenly`;

```css
.gird-x-c-center {
  justify-content: center;
}
```

<div class="base-box base-gird col-w312 gird-x-c-center">
  <div class="base-dot color1">1</div>
  <div class="base-dot color2">2</div>
  <div class="base-dot color3">3</div>
</div>

- `align-content`: 内容区域(网格相对于容器)的垂直对齐方式。

align-content: `start` | `end` | `center` | `stretch` | `space-around` | `space-between` | `space-evenly`;

```css
.gird-y-c-center {
  align-content: center;
}
```

<div class="base-box base-gird col-w312 gird-y-c-center">
  <div class="base-dot color1">1</div>
  <div class="base-dot color2">2</div>
  <div class="base-dot color3">3</div>
</div>

#### 2.1.7 grid-auto-columns & grid-auto-rows

用来指定浏览器自动创建的多余网格的列宽和行高。

```css
.gird-auto-row {
  grid-auto-rows: 20px;
}
```

<div class="base-box base-gird gird-9 gird-auto-row">
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
</div>

#### 2.1.8 grid-template & grid

- `grid-template`: grid-template-columns、grid-template-rows 和 grid-template-areas 的简写

- `grid`: grid-template-rows、grid-template-columns、grid-template-areas、 grid-auto-rows、grid-auto-columns 和 grid-auto-flow 的简写

### 2.2 Grid 项目的属性

#### 2.2.1 grid-column-start & grid-column-end & grid-row-start & grid-row-end

- `grid-column-start`: 定位项目左边框所在的垂直线网格

- `grid-column-end`: 定位项目右边框所在的垂直线网格

- `grid-row-start`: 定位项目上边框所在的水平线网格

- `grid-row-end`: 定位项目下边框所在的水平线网格

**例**：

1. 以第几条网格线定位

  ```css
  .dot-1 {
    grid-row-start: 1;
    grid-row-end: 3;
  }
  ```

  <div class="base-box base-gird gird-9">
    <div class="base-dot color1 dot-1" style="width: auto; height: auto">1</div>
    <div class="base-dot color2">2</div>
    <div class="base-dot color3">3</div>
    <div class="base-dot color1">4</div>
    <div class="base-dot color2">5</div>
    <div class="base-dot color3">6</div>
  </div>

2. 以网格线名字定位

  ```css
  .dot-4 {
    grid-row-start: r2;
    grid-row-end: r3;
    grid-column-start: c2;
    grid-column-end: c3;
  }
  ```

  <div class="base-box base-gird gird-name">
    <div class="base-dot color1 dot-4" style="width: auto; height: auto">1</div>
    <div class="base-dot color2">2</div>
    <div class="base-dot color3">3</div>
    <div class="base-dot color1">4</div>
    <div class="base-dot color2">5</div>
    <div class="base-dot color3">6</div>
  </div>

3. 以区域定位

  ```css
  .dot-5 {
    grid-row-start: g5-start;
    grid-row-end: g6-end;
    grid-column-start: g5-end;
    grid-column-end: g6-end;
  }
  ```

  <div class="base-box base-gird gird-area-9">
    <div class="base-dot color1 dot-5" style="width: auto; height: auto">1</div>
    <div class="base-dot color2">2</div>
    <div class="base-dot color3">3</div>
    <div class="base-dot color1">4</div>
    <div class="base-dot color2">5</div>
    <div class="base-dot color3">6</div>
  </div>

4. span 跨越网格

  ```css
  .dot-6 {
    grid-row-start: span 3;
    grid-column-start: span 2;
  }
  ```

  <div class="base-box base-gird gird-16">
    <div class="base-dot color1 dot-6" style="width: auto; height: auto">1</div>
    <div class="base-dot color2">2</div>
    <div class="base-dot color3">3</div>
    <div class="base-dot color1">4</div>
    <div class="base-dot color2">5</div>
    <div class="base-dot color3">6</div>
  </div>

5. 指定项目重叠顺序

  ```css
  .z-9 {
    z-index: 9;
  }
  ```

  <div class="base-box base-gird gird-area-9">
    <div class="base-dot color1 dot-5 z-9" style="width: auto; height: auto;">1</div>
    <div class="base-dot color2">2</div>
    <div class="base-dot color3">3</div>
    <div class="base-dot color1">4</div>
    <div class="base-dot color2 dot-7" style="width: auto; height: auto">5</div>
    <div class="base-dot color3">6</div>
  </div>

#### 2.2.2 grid-column & grid-row

- `grid-column`: grid-column-start 和 grid-column-end 的简写

- `grid-row`: grid-row-start 和 grid-row-end 的简写

grid-column: `<start-line>` / `<end-line>`

grid-row: `<start-line>` / `<end-line>`

**Tips**: 如果斜杠后面的参数不写，则默认跨越 *1* 个网格。

```css
.dot-7 {
  grid-row: g3-start / g5-end; 
  grid-column: g3-start / g5-end;
}
/* 这里 .dot-7 效果 = .dot-8 */
.dot-8 {
  grid-row: g3-start / span 2; 
  grid-column: g3-start / span 2;
}
```

#### 2.2.3 grid-area

1. 指定项目放在某个区域

  ```css
  .area-5 {
    grid-area: g5;
  }
  ```

  <div class="base-box base-gird gird-area-9">
    <div class="base-dot color1 area-5">1</div>
    <div class="base-dot color2">2</div>
    <div class="base-dot color3">3</div>
    <div class="base-dot color1">4</div>
    <div class="base-dot color2">5</div>
    <div class="base-dot color3">6</div>
  </div>

2. 用作 `grid-row-start`、`grid-column-start`、`grid-row-end`、`grid-column-end` 的简写

  grid-area: `<row-start>` / `<column-start>` / `<row-end>` / `<column-end>`

#### 2.2.4 justify-self & align-self & place-self

- justify-self: `start` | `end` | `center` | `stretch`

- align-self: `start` | `end` | `center` | `stretch`

- place-self: `<align-self>` `<justify-self>`

## 3. 常用布局

### 3.1 页面布局

#### 3.1.1 单列布局

1. 上中下居中

2. 上下通栏，中间居中

#### 3.1.2 两列布局

1. 左边固定宽度高度（高度为屏幕高度）；右边宽度自适应，高度随内容滚动

2. 左边固定宽度，高度跟随右边；右边宽度自适应，高度随内容滚动

#### 3.1.3 三列布局

1. 左右侧边栏高度跟随中间（等高），左右宽度固定；中间内容高度滚动，中间宽度自适应

2. 左右侧边栏高度跟随中间（等高），中间内容高度滚动，左中右按比例宽度自适应

#### 3.1.4 粘连布局

1. 当container内容高度大于屏幕高度时，footer跟随在内容后面；当container内容高度小于屏幕高度时，footer位于屏幕底部。

### 3.2 组件布局

### 3.3 业务布局

## 参考资料

1. [《Flex 布局教程：语法篇》 by 阮一峰](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

2. [《CSS Grid 网格布局教程》 by 阮一峰](http://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html)

3. [《Box alignment in Flexbox》 by MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Box_Alignment/Box_Alignment_in_Flexbox)
