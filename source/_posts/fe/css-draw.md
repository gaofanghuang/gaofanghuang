---
title: CSS 进阶应用 - 纯 css 绘图
date: 2020-04-26 11:10:00
tags:
  - css
  - css3
  - 待填坑
categories: 前端笔记
---

[查看DEMO 纯css绘制图形](https://gaofanghuang.github.io/demo/api/css/demo1)

当我们需要三角形、圆形、半圆等简单图形时，用 css 直接绘制会比加载图片更好，通常可以使用 border 属性方法来绘制，目前主流的浏览器还可以使用 clip-path 属性来绘制图形。

如果不需要过多考虑浏览器兼容问题的话，使用 clip-path 更好。

<!--more-->

## border 方法

border 方法主要使用 border + transform 两个方法结合完成绘图。

### 绘制三角形

**原理:**

当 width、height 等于 0 时，border 四边会被挤压成四个三角形。因此当设置其中三个边的 border-color 的颜色为透明时，剩下一个边的颜色设置为我们需要的值，即可显示出一个三角形，且三角形指向为这个边的反向。

```css
/* bottom 颜色不为透明时，bottom 的反向为 top，即这个三角形指向 top */
/* border-width = 10 表示 绘制出的这个三角形为 等边三角形，边长为20，高为10 */
/* 通过控制不同边的 border-width, 我们可以绘制出任意角度的三角形 */
.arrow-up {
  width: 0;
  height: 0;
  border: 10px solid transparent;
  border-bottom-color: tomato;
}
```

### 绘制常见图形

#### 绘制矩形

```css
.rectangle {
  width: 0;
  height: 0;
  border: 10px solid tomato;
}
```

#### 绘制圆形

```css
.circle {
  width: 20px;
  height: 20px;
  background: tomato;
  border-radius: 50%;
}
```

#### 绘制扇形

```css
.sector {
  width: 20px;
  height: 20px;
  background: tomato;
  border-radius: 100% 0 0 0;
}
```

#### 绘制椭圆

```css
.ellipse {
  width: 40px;
  height: 20px;
  background: tomato;
  border-radius: 20px / 10px;
}
```

## clip-path 方法

clip-path 可以创建一个只有元素的部分区域可以显示的剪切区域。区域内的部分显示，区域外的隐藏。剪切区域是被引用内嵌的 URL 定义的路径或者外部 svg 的路径，或者作为一个形状例如 circle()。

### 语法

```css
/* Keyword values */
clip-path: none;

/* <clip-source> values */
clip-path: url(resources.svg#c1);

/* <geometry-box> values */
clip-path: margin-box;
clip-path: border-box;
clip-path: padding-box;
clip-path: content-box;
clip-path: fill-box;
clip-path: stroke-box;
clip-path: view-box;

/* <basic-shape> values */
clip-path: inset(100px 50px);
clip-path: circle(50px at 0 100px);
clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
clip-path: path(
  'M0.5,1 C0.5,1,0,0.7,0,0.3 A0.25,0.25,1,1,1,0.5,0.3 A0.25,0.25,1,1,1,1,0.3 C1,0.7,0.5,1,0.5,1 Z'
);
clip-path: ellipse(30% 20% at 50% 50%);

/* Box and shape values combined */
clip-path: padding-box circle(50px at 0 100px);

/* Global values */
clip-path: inherit;
clip-path: initial;
clip-path: unset;
```

### 绘制三角形

**原理:**

利用 clip-path 属性的`polygon`函数，传入一组点的坐标，每个点用逗号隔开，点用 x y 分别表示 x轴 和 y轴 的位置。把这三个点用传入的顺序连接，连接区域内的图形显示，链接区域外的图形隐藏，即显示出了三角形。

```css
/* width = 20 height = 10 即宽为 20 高为 10 的矩形 */
/* polygon 里传入了三个点的坐标分别是矩形的 左下点（0 100%,）、中上点（50% 0）、 右下点（100% 100%）*/
/* 即 (x1 y1, x2 y2, x3 y3) */
.arrow-up {
  width: 20px;
  height: 10px;
  background: tomato;
  clip-path: polygon(0 100%, 50% 0, 100% 100%);
}
```

### 绘制常见图形

#### 绘制矩形

```css
.rectangle {
  width: 20px;
  height: 20px;
  background: tomato;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
}
```

#### 绘制圆形

```css
.circle {
  width: 20px;
  height: 20px;
  background: tomato;
  clip-path: circle(10px);
}
```

#### 绘制扇形

```css
/* 方法一 */
.sector {
  width: 20px;
  height: 20px;
  background: tomato;
  clip-path: inset(0 0 0 0 round 100% 0 0 0);
}
/* 方法二 */
.sector2 {
  width: 20px;
  height: 20px;
  background: tomato;
  /* at 后面可以指定圆心的xy坐标, 可忽略，默认为 50% 50% */
  clip-path: circle(20px at 100% 100%);
}
```

#### 绘制椭圆

```css
.ellipse {
  width: 40px;
  height: 20px;
  background: tomato;
  clip-path: ellipse(20px 10px);
}
```

## clip-path 应用

除了绘制简单图形，还可以使用clip-path制作变形动画，得到更自然的过渡效果。

[查看DEMO clip-path 动画](https://gaofanghuang.github.io/demo/api/css/demo2)

### 变形动画

使用 polygon 制作变形动画需要注意，变形开始和结束的点，数量需要一致，点之间的坐标是可以重复的。

例：

```css
@keyframes animation3 {
  0% {
    clip-path: polygon(0 0%, 50% 0, 100% 0, 100% 50%, 100% 80%, 100% 100%, 50% 100%, 0 100%, 0 50%, 0 38%);
  }
  100% {
    clip-path: polygon(50% 0%, 63% 38%, 100% 38%, 69% 59%, 82% 100%, 50% 75%, 18% 100%, 31% 59%, 0 38%, 37% 38%);
  }
}
```