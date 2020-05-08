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
    background: conic-gradient(
      red,
      orange,
      yellow,
      green,
      teal,
      blue,
      purple,
      red
    );
  }
  ```

  <div class="conic-gradient conic-gradient-2"></div>

  ```css
  /* 饼图 */
  .conic-gradient-2 {
    border-radius: 50%;
    /* 这里可以指定每个颜色所占比例 */
    background: conic-gradient(
      lightblue 0,
      lightblue 30%,
      skyblue 30%,
      skyblue 70%,
      deepskyblue 70%,
      deepskyblue 100%
    );
  }
  ```

  <style>
  .repeating-linear-gradient {
    width: 200px;
    height: 40px;
    margin-bottom: 20px;
  }
  .repeating-linear-gradient-1 {
    background: repeating-linear-gradient(45deg, lightblue 5%, deepskyblue 10%);
  }
  .repeating-radial-gradient-1 {
    background: repeating-radial-gradient(circle at center, lightblue 0, skyblue, deepskyblue 30px);
  }
  .repeating-conic-gradient-1 {
    background: repeating-conic-gradient(red, orange, yellow, green, blue 50%);
  }
  </style>

* **repeating-linear-gradient()**

  自动重复的线性渐变。

  <div class="repeating-linear-gradient repeating-linear-gradient-1"></div>

  ```css
  .repeating-linear-gradient-1 {
    background: repeating-linear-gradient(45deg, lightblue 5%, deepskyblue 10%);
  }
  ```

* **repeating-radial-gradient()**

  自动重复的径向渐变。

  <div class="repeating-linear-gradient repeating-radial-gradient-1"></div>

  ```css
  .repeating-radial-gradient-1 {
    background: repeating-radial-gradient(
      circle at center,
      lightblue 0,
      skyblue,
      deepskyblue 30px
    );
  }
  ```

* **repeating-conic-gradient()**

  自动重复的锥形渐变。

  <div class="repeating-linear-gradient repeating-conic-gradient-1"></div>

  ```css
  .repeating-conic-gradient-1 {
    background: repeating-conic-gradient(red, orange, yellow, green, blue 50%);
  }
  ```

* **image-set()**

  根据不同屏幕的像素密度选择不同的图片。

  ```css
  .banner {
    background-image: image-set(
      'cat.png' 1x,
      'cat-2x.png' 2x,
      'cat-print.png' 600dpi
    );
  }
  ```

* **url()**

  加载一个资源（如 jpg, svg 等）作为背景图片。

  ```css
  .banner {
    background-image: url('http://xxx.com/banner.jpg');
  }
  ```

* **image()**

  类似于 `url()` 函数，增加了指定图像方向性、指定显示区域的图片，指定固定颜色作为图片失效的时的背景色等功能。

  ```css
  .logo {
    background-image: image('logo.png#xywh=0,20,40,60');
  }
  ```

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

  `hwb(h, w, b)`

  使用色相(h)、明度-白(w)、明度-黑(b)来定义颜色。

  色相取值 `0 ~ 359` 之间， 即 360° = 0°，意为色环中某个角度的值。
  明度取值 `0 ~ 1` 之间。

### 4. 图形函数

- **circle()**

  用于定义一个圆形。

  <style>
  .box-shape {
    width: 100px;
    height: 100px;
    background: deepskyblue;
    margin-bottom: 20px;
  }
  .box-circle {
    clip-path: circle(50px at 50% 50%);
  }
  .box-ellipse {
    clip-path: ellipse(50px 30px at 50% 50%)
  }
  .box-inset {
    clip-path: inset(10% 20% round 5px)
  }
  .box-polygon {
    clip-path: polygon(0 0, 100% 100%, 0 100%);
  }
  .box-path {
    clip-path: path('M0.5,1 C0.5,1,0,0.7,0,0.3 A0.25,0.25,1,1,1,0.5,0.3 A0.25,0.25,1,1,1,1,0.3 C1,0.7,0.5,1,0.5,1 Z');
  }
  </style>

  <div class="box-shape box-circle"></div>

  ```css
  .box-circle {
    clip-path: circle(50px at 50% 50%);
  }
  ```

- **ellipse()**

  用于定义一个椭圆形。

  <div class="box-shape box-ellipse"></div>

  ```css
  .box-ellipse {
    clip-path: ellipse(50px 30px at 50% 50%);
  }
  ```

- **inset()**

  定义一个 inset 类型的矩形。

  <div class="box-shape box-inset"></div>

  ```css
  .box-inset {
    clip-path: inset(10% 20% round 5px);
  }
  ```

- **polygon()**

  定义一个多边形。

  <div class="box-shape box-polygon"></div>

  ```css
  .box-polygon {
    clip-path: polygon(0 0, 100% 100%, 0 100%);
  }
  ```

- **path()**

  把转入的 svg 路径显示为矢量图形

  <div class="box-shape box-path"></div>

  ```css
  .box-path {
    clip-path: path(
      'M0.5,1 C0.5,1,0,0.7,0,0.3 A0.25,0.25,1,1,1,0.5,0.3 A0.25,0.25,1,1,1,1,0.3 C1,0.7,0.5,1,0.5,1 Z'
    );
  }
  ```

### 5. 滤镜函数

- **blur()**

  应用高斯模糊效果。

  <style>
  .filter-box {
    width: 100px;
    height: 40px;
    margin-bottom: 20px;
  }
  .filter-box2 {
    width: 100px;
    height: 100px;
    margin-bottom: 20px;
  }
  .filter-box2 img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .filter-blur {
    filter: blur(1px);
  }
  </style>

  <div class="filter-box filter-blur">高斯模糊</div>

  ```css
  /* 允许的长度单位：px、vw、rem */
  /* 无效的单位：% */
  .filter-blur {
    filter: blur(1px);
  }
  ```

- **brightness()**

  调整图像的亮度，取值 0 ~ ∞，默认为 1，当为 0 时图像全黑，大于 1 时图象比默认更亮。

  | 原图 | 0 | 0.5 | 1 | 1.5 | 2 |
  | :---: | :---: | :---: | :---: | :---: | :---: |
  | <div class="filter-box2"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="filter: brightness(0)"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="filter: brightness(0.5)"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="filter: brightness(1)"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="filter: brightness(1.5)"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="filter: brightness(2)"><img src="/images/carrot.jpg" /></div> |

  *Tips*: `brightness` 没有取值上限，当亮度高到一定程度后，图形全白。

  ```css
  .filter-blur {
    /* 这里的1.5，也可以用百分比表示如：150% */
    filter: brightness(1.5);
  }
  ```

- **contrast()**

  调整图像的对比度，取值 0 ~ ∞，默认为 1，当为 0 时图像全灰，大于 1 时图象图形对比度更高。

  | 原图 | 0 | 0.5 | 1 | 1.5 | 2 |
  | :---: | :---: | :---: | :---: | :---: | :---: |
  | <div class="filter-box2"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="filter: contrast(0)"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="filter: contrast(0.5)"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="filter: contrast(1)"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="filter: contrast(1.5)"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="filter: contrast(2)"><img src="/images/carrot.jpg" /></div> |

  *Tips*: 对比度高意味着，深色的部分更深，浅色的部分更浅。

  ```css
  .filter-contrast {
    filter: contrast(1.5)
  }
  ```
 
- **drop-shadow()**

  给图像设置一个阴影效果

  | 原图 | box-shadow | drop-shadow |
  | :---: | :---: | :---: |
  | <div class="filter-box2"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="box-shadow: 3px 3px 9px rgba(0,0,0,0.6)"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="filter: drop-shadow(3px 3px 9px rgba(0,0,0,0.6))"><img src="/images/carrot.jpg" /></div> |

  *Tips*: 通过上图我们看出，当img有外边距时，使用`box-shadow`会出现空白的部分，而`drop-shadow`是直接作用于内容的，不受内外边距影响。当不考虑浏览器兼容时（不兼容IE），可以使用`drop-shadow`代替`box-shadow`，通过滤镜可以使用浏览器提供的硬件加速，获得更好的性能。

  ```css
  .filter-drop-shadow {
    filter: drop-shadow(3px 3px 9px rgba(0,0,0,0.6))
  }
  ```

- **grayscale()**

  将图像转换为灰度图像，取值 0 ~ 1, 默认0。

  | 原图 | 0 | 0.5 | 1 |
  | :---: | :---: | :---: | :---: |
  | <div class="filter-box2"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="filter: grayscale(0)"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="filter: grayscale(0.5)"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="filter: grayscale(1)"><img src="/images/carrot.jpg" /></div> |

  *Tips*: 当值为 1 时，图像变为黑白，可理解为 PhotoShop 中的去色。

  ```css
  .filter-grayscale {
    filter: grayscale(1)
  }
  ```

- **hue-rotate()**

  调整图像的色相，取值色相角度 0 ~ 359，默认为0，即 360 = 0。

  | 原图 | 0 | 30deg | 45deg | 90deg | 180deg |
  | :---: | :---: | :---: | :---: | :---: | :---: |
  | <div class="filter-box2"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="filter: hue-rotate(0)"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="filter: hue-rotate(45deg)"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="filter: hue-rotate(45deg)"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="filter: hue-rotate(90deg)"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="filter: hue-rotate(180deg)"><img src="/images/carrot.jpg" /></div> |

  *Tips*: 当值大于359°时，如 420 °，实际取值为 angle = 420 - 360 = 60

  ```css
  .filter-hue-rotate {
    filter: hue-rotate(45deg)
  }
  ```

- **invert()**

  反转输入图像的色相，取值 0 ~ 1, 默认0。

  | 原图 | 0 | 0.5 | 0.8 | 1 |
  | :---: | :---: | :---: | :---: | :---: |
  | <div class="filter-box2"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="filter: invert(0)"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="filter: invert(0.5)"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="filter: invert(0.8)"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="filter: invert(1)"><img src="/images/carrot.jpg" /></div> |

  *Tips*: 当值为 0.5 时，图像变为全灰；当值为 1 时，可理解为 PhotoShop 中的反相。

  ```css
  .filter-invert {
    filter: invert(0.5)
  }
  ```

- **opacity()**

  调整图像的透明度，取值 0 ~ 1, 默认1。

  | 原图 | opacity | 0 | 0.5 | 1 |
  | :---: | :---: | :---: | :---: | :---: |
  | <div class="filter-box2"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="opacity: 0"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="filter: opacity(0)"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="filter: opacity(0.5)"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="filter: opacity(1)"><img src="/images/carrot.jpg" /></div> |

  *Tips*: 当值为 0 时，图像不可见，和 opacity 属性的区别是，使用 filter 可以获得浏览器的硬件加速支持。

  ```css
  .filter-opacity {
    filter: opacity(0.5)
  }
  ```

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
