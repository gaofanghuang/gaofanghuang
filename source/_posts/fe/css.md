---
title: CSS 基础入门
date: 2020-04-26 11:00:00
tags:
  - css
  - css3
  - 待填坑
categories: 前端笔记
---

## 布局

<!--more-->

### 盒模型

## 样式

### 渐变

### 动画

## 函数

简单来说，在 CSS 中只要是带有 () 的属性值，我们就可以把它称为 CSS 函数。

### 1. 属性函数

- **attr()**

  attr 可以读取 html 标签中的属性值

  ```html
  <span class="tips" data-tips="something is error"></span>
  ```

  ```css
  .tips::before {
    content: attr(data-tips);
  }
  ```

### 2. 背景图片函数

- **linear-gradient()**

  `linear-gradient([ [ [ <angle> | to [top | bottom] || [left | right] ],]? <color-stop>[, <color-stop>]+)`

  创建线性渐变。

  <style>
  .linear-gradient {
    width: 200px;
    height: 40px;
    margin-bottom: 10px;
  }
  .linear-gradient-1 {
    background: linear-gradient(90deg, #28C5C2, #79E2B7);
  }
  .linear-gradient-2 {
    background: linear-gradient(180deg, #28C5C2, #79E2B7);
  }
  .linear-gradient-3 {
    background: linear-gradient(45deg, #28C5C2 25%, hsl(45, 100%, 55%) 0, hsl(45, 100%, 55%) 50%, #28C5C2 0, #28C5C2 75%, hsl(45, 100%, 55%) 0);
    background-size: 10px 10px;
  }
  </style>

  <div class="linear-gradient linear-gradient-1"></div>

  ```css
  /* 从左到右的渐变 */
  .linear-gradient-1 {
    background: linear-gradient(90deg, #28c5c2, #79e2b7);
  }
  ```

  <div class="linear-gradient linear-gradient-2"></div>

  ```css
  /* 从上到下的渐变 */
  .linear-gradient-2 {
    background: linear-gradient(180deg, #28c5c2, #79e2b7);
  }
  ```

  <div class="linear-gradient linear-gradient-3"></div>

  ```css
  /* 斜条纹 */
  .linear-gradient-3 {
    background: linear-gradient(
      45deg,
      #28c5c2 25%,
      hsl(45, 100%, 55%) 0,
      hsl(45, 100%, 55%) 50%,
      #28c5c2 0,
      #28c5c2 75%,
      hsl(45, 100%, 55%) 0
    );
  }
  ```

- **radial-gradient()**

  创建径向渐变

  <style>
  .radial-gradient {
    width: 100px;
    height: 100px;
    margin-bottom: 20px;
  }
  .radial-gradient-1 {
    background: radial-gradient(#e4309e, #8347ff);
  }
  .radial-gradient-2 {
    background: radial-gradient(#e4309e 0%, #70b6f3 40%, #8347ff 60%);
  }
  .radial-gradient-3 {
    background: radial-gradient(at 110% 100%, #e4309e, #8347ff);
  }
  .radial-gradient-4 {
    background: radial-gradient(20% 20%, #e4309e, #8347ff);
  }
  </style>

  <div class="radial-gradient radial-gradient-1"></div>

  ```css
  /* 径向渐变 */
  .radial-gradient-1 {
    background: radial-gradient(#e4309e, #8347ff);
  }
  ```

  <div class="radial-gradient radial-gradient-2"></div>

  ```css
  /* 多色渐变 */
  .radial-gradient-2 {
    background: radial-gradient(#e4309e 0%, #70b6f3 40%, #8347ff 60%);
  }
  ```

  <div class="radial-gradient radial-gradient-3"></div>

  ```css
  /* 指定圆心位置 */
  .radial-gradient-3 {
    background: radial-gradient(at 110% 100%, #e4309e, #8347ff);
  }
  ```

  <div class="radial-gradient radial-gradient-4"></div>

  ```css
  /* 指定圆的大小 */
  .radial-gradient-4 {
    background: radial-gradient(20% 20%, #e4309e, #8347ff);
  }
  ```

- **conic-gradient()**

  创建锥形渐变

  <style>
    .conic-gradient {
      width: 100px;
      height: 100px;
      margin-bottom: 20px;
    }
    .conic-gradient-1 {
      border-radius: 50%;
      background: conic-gradient(red, orange, yellow, green, teal, blue, purple, red);
    }
    .conic-gradient-2 {
      border-radius: 50%;
      background: conic-gradient(lightblue 0, lightblue 30%, skyblue 30%, skyblue 70%, deepskyblue 70%, deepskyblue 100%);
    }
  </style>

  <div class="conic-gradient conic-gradient-1"></div>

  ```css
  /* 色环 */
  .conic-gradient-1 {
    /* 这里开始和结束用同一个颜色，否则头尾的颜色衔接会不自然 */
    background: conic-gradient(red, orange, yellow, green, teal, blue, purple, red);
  }
  ```

  <div class="conic-gradient conic-gradient-2"></div>

  ```css
  /* 饼图 */
  .conic-gradient-2 {
    border-radius: 50%;
    /* 这里可以指定每个颜色所占比例 */
    background: conic-gradient(lightblue 0, lightblue 30%, skyblue 30%, skyblue 70%, deepskyblue 70%, deepskyblue 100%);
  }
  ```

* **repeating-linear-gradient()**

  自动重复的线性渐变。



* **repeating-radial-gradient()**

* **repeating-conic-gradient()**

* **image-set()**

* **image()**

* **url()**

* **element()**

### 3. 颜色函数

- **rgb()**

  `rgba(r, g, b)`

  使用红(R)、绿(G)、蓝(B)三个颜色的叠加来生成各式各样的颜色。

  红色（R）0 到 255 间的整数，代表颜色中的红色成分。。
  绿色（G）0 到 255 间的整数，代表颜色中的绿色成分。
  蓝色（B）0 到 255 间的整数，代表颜色中的蓝色成分。

  ```css
  .black {
    color: rgb(0, 0, 0);
  }
  ```

- **rgba()**

  `rgba(r, g, b, a)`

  RGB 同上。
  透明度（A）取值 `0~1` 之间， 代表透明度。

  ```css
  .box-bg {
    background: rgba(0, 0, 0, 0.8);
  }
  ```

- **hsl()**

  `hsl(h, s, l)`

  使用色相(h)、饱和度(s)、亮度(l)来定义颜色。

  <div class="conic-gradient conic-gradient-1"></div>

  色相取值 `0 ~ 359` 之间， 即 360° = 0°，意为色环中某个角度的值。
  饱和度取值 `0 ~ 1` 之间。
  亮度取值 `0 ~ 1` 之间。

- **hsla()**

  `hsl(h, s, l, a)`

  使用色相(h)、饱和度(s)、亮度(l)、透明度(a)来定义颜色。

- **hwb()**

- **color-mod()**

### 4. 图形函数

- **circle()**

- **ellipse()**

- **inset()**

- **polygon()**

- **path()**

### 5. 滤镜函数

- **blur()**

- **brightness()**

- **contrast()**

- **drop-shadow()**

- **grayscale()**

- **hue-rotate()**

- **invert()**

- **opacity()**

- **saturate()**

- **sepia()**

### 6. 转换函数

- **matrix()**

- **matrix3d()**

- **perspective()**

- **rotate()**

- **rotate3d()**

- **rotateX()**

- **rotateY()**

- **rotateZ()**

- **scale()**

- **scale3d()**

- **scaleX()**

- **scaleY()**

- **scaleZ()**

- **skew()**

- **skewX()**

- **skewY()**

- **translate()**

- **translateX()**

- **translateY()**

- **translateZ()**

- **translate3d()**

### 7. 数学函数

- **calc()**

- **min()**

  在传入的值中取最小的那一个

  ```css
  div {
    width: min(40%, 400px);
  }
  ```

- **max()**

  在传入的值中取最大的那一个

  ```css
  div {
    width: max(40%, 400px);
  }
  ```

- **mixmax()**

- **repeat()**

### 8. 缓动函数

- **cubic-bezier()**

- **steps()**

### 9. 其他函数

- **counter()**

- **counters()**

- **toggle()**

- **var()**

- **symbols()**
