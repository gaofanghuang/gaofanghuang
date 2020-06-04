---
title: CSS 基础 - 函数
date: 2020-04-26 11:00:00
update: 2020-05-15 14:20:00
tags:
  - CSS
  - CSS函数
categories: CSS笔记
---

简单来说，在 CSS 中只要是带有 () 的属性值，我们就可以把它称为 CSS 函数。

<!--more-->

## 1. 属性函数

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

## 2. 背景图片函数

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

## 3. 颜色函数

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

## 4. 图形函数

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

## 5. 滤镜函数

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
    margin: 0;
  }
  .filter-blur {
    filter: blur(1px);
  }
  td .filter-box2 {
    margin-bottom: 0;
    padding: 10px;
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

  调整图像的对比度，取值 0 ~ ∞，默认为 1，当为 0 时图像全灰，大于 1 时图象对比度更高。

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

  *Tips*: 通过上图我们看出，当 div 有边距时，使用`box-shadow`会出现空白的部分，而`drop-shadow`是直接作用于内容的，不受内外边距影响。当不考虑浏览器兼容时（不兼容IE），可以使用`drop-shadow`代替`box-shadow`，通过滤镜可以使用浏览器提供的硬件加速，获得更好的性能。

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

  *Tips*: 当值为 0.5 / 1 时，可理解为 PhotoShop 中的反相。

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

  调整图像饱和度，取值 0 ~ ∞，默认为 1，当为 0 时图像全灰，大于 1 时图象饱和度更高。

  | 原图 | 0 | 0.5 | 1 | 1.5 | 2 |
  | :---: | :---: | :---: | :---: | :---: | :---: |
  | <div class="filter-box2"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="filter: saturate(0)"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="filter: saturate(0.5)"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="filter: saturate(1)"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="filter: saturate(1.5)"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="filter: saturate(2)"><img src="/images/carrot.jpg" /></div> |

  *Tips*: 饱和度高意味着，有颜色的部分（黑白灰除外）颜色更深。

  ```css
  .filter-saturate {
    filter: saturate(1.5)
  }
  ```

- **sepia()**

  调整图像的颜色为深褐色，取值 0 ~ 1, 默认0。

  | 原图 | 0 | 0.5 | 1 |
  | :---: | :---: | :---: | :---: |
  | <div class="filter-box2"><img src="/images/logo.png" /></div> | <div class="filter-box2" style="filter: sepia(0)"><img src="/images/logo.png" /></div> | <div class="filter-box2" style="filter: sepia(0.5)"><img src="/images/logo.png" /></div> | <div class="filter-box2" style="filter: sepia(1)"><img src="/images/logo.png" /></div> |

  ```css
  .filter-sepia {
    filter: sepia(1)
  }
  ```

- **复合函数**

  filter 函数可以复合使用，如：

  ```css
  /* 加强对比度和亮度 */
  .filter-img {
    filter: contrast(175%) brightness(3%)
  }
  ```

## 6. 转换函数

- **rotate()**

  旋转图像，移动量由指定角度定义；如果为正值，则运动将为顺时针，如果为负值，则为逆时针。 180°的旋转称为点反射 (point reflection)。

  | 原图 | 0 | 45deg | 90deg | 180deg | -90deg |
  | :---: | :---: | :---: | :---: | :---: | :---: |
  | <div class="filter-box2"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="filter: transform: rotate(0)"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="transform: rotate(45deg)"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="transform: rotate(90deg)"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="transform: rotate(180deg)"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="transform: rotate(-90deg)"><img src="/images/carrot.jpg" /></div> |

  ```css
  .rotate {
    transform: rotate(45deg)
  }
  ```

- **rotate3d()**

  在三维空间旋转图像，该旋转使元素能够绕固定轴移动而不变形。其中移动量由指定角度定义；如果为正值，则运动将为顺时针，如果为负值，则为逆时针。

  `rotate3d(x, y, z, a)`

  *x*: 该参数为 `number` 类型值， 描述旋转轴向量的 x 坐标，取值 0 或 1，当为0时该轴不应用旋转。

  *y*: 该参数为 `number` 类型值，描述旋转轴向量的 y 坐标，取值 0 或 1，当为0时该轴不应用旋转。

  *z*: 该参数为 `number` 类型值，描述旋转轴向量的 z 坐标，取值 0 或 1，当为0时该轴不应用旋转。

  *a*: 该参数为 `angle` 代表旋转的角度。正角度表示顺时针旋转，负角度表示逆时针旋转。

  | 原图 | x-1-45deg | y-1-45deg | z-1-45deg | 1-1-1-90deg |
  | :---: | :---: | :---: | :---: | :---: |
  | <div class="filter-box2"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="filter: transform: rotate3d(1, 0, 0, 45deg)"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="transform: rotate3d(0, 1, 0, 45deg)"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="transform: rotate3d(0, 0, 1, 45deg)"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="transform: rotate3d(1, 1, 1, 45deg)"><img src="/images/carrot.jpg" /></div> |

  *Tips*: 这里 x, y, z 传入的顺序不可打乱且不可省略。

  ```css
  .rotate3d {
    transform: rotate3d(1, 1, 1, 45deg)
  }
  ```

- **rotateX()**

  在 x 轴旋转图像，即 `rotateX(45deg)` = `rotate3d(1, 0, 0, 45deg)`

  *注意*：`rotate3d(1, 0, 0, 45deg)` 在 chrome 和 firefox 中实测没有变化（2020/05/09）。尽量使用 `rotateX(45deg)` 代替。

  | 原图 | 0 | 45deg | 90deg | 180deg | -90deg |
  | :---: | :---: | :---: | :---: | :---: | :---: |
  | <div class="filter-box2"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="filter: transform: rotateX(0)"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="transform: rotateX(45deg)"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="transform: rotateX(90deg)"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="transform: rotateX(180deg)"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="transform: rotateX(-90deg)"><img src="/images/carrot.jpg" /></div> |

  *Tips*: 当角度为 90deg 时，图像不可见。

  ```css
  .rotateX {
    transform: rotateX(45deg)
  }
  ```

- **rotateY()**

  在 y 轴旋转图像，即 `rotateY(45deg)` = `rotate3d(0, 1, 0, 45deg)`

  | 原图 | 0 | 45deg | 90deg | 180deg | -90deg |
  | :---: | :---: | :---: | :---: | :---: | :---: |
  | <div class="filter-box2"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="filter: transform: rotateY(0)"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="transform: rotateY(45deg)"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="transform: rotateY(90deg)"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="transform: rotateY(180deg)"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="transform: rotateY(-90deg)"><img src="/images/carrot.jpg" /></div> |

  *Tips*: 当角度为 90deg 时，图像不可见。

  ```css
  .rotateY {
    transform: rotateY(45deg)
  }
  ```

- **rotateZ()**

  在 z 轴旋转图像，即 `rotateZ(45deg)` = `rotate3d(0, 0, 1, 45deg)`

  | 原图 | 0 | 45deg | 90deg | 180deg | -90deg |
  | :---: | :---: | :---: | :---: | :---: | :---: |
  | <div class="filter-box2"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="filter: transform: rotateZ(0)"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="transform: rotateZ(45deg)"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="transform: rotateZ(90deg)"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="transform: rotateZ(180deg)"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="transform: rotateZ(-90deg)"><img src="/images/carrot.jpg" /></div> |

  *Tips*: `rotateZ` 的旋转效果 = `rotate`。

  ```css
  .rotateZ {
    transform: rotateZ(45deg)
  }
  ```

- **scale()**

  改变图像的大小

  `scale(sx[, sy])`

  *sx*: 缩放 x 轴。

  *sy*: 缩放 y 轴，可选。如不存在，则取值为 sx，图像将保持等比缩放。

  | 原图 | x-0.5 | y-0.5 | x-1.5-y-0.5 |
  | :---: | :---: | :---: | :---: |
  | <div class="filter-box2"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="transform: scale(0.5, 1)"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="transform: scale(1, 0.5)"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="transform: scale(1.5, 0.5)"><img src="/images/carrot.jpg" /></div> |

  *Tips*: 当 sx 或 sy 值为 0 时，图像不可见。

  ```css
  .scale {
    transform: scale(1.5, 0.5)
  }
  ```

- **scale3d()**

  在三维空间缩放图像
  
  当超出 [-1，1] 的范围之外时，缩放比例将在坐标方向上放大元素；当在 [-1，1] 范围内时，它在当前方向收缩元素。当等于 1 时，它什么也不做，当它为负时，它执行点反射和大小修改。

  `scale3d(sx, sy, sz)`

  *sx*: 缩放 x 轴。

  *sy*: 缩放 y 轴。

  *sz*: 缩放 z 轴。

  | 原图 | sx-0.5 | sy-(-1.5) | sz-0.5 | sx-1.5-sy-0.5-sz-2 |
  | :---: | :---: | :---: | :---: | :---: |
  | <div class="filter-box2"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="transform: scale3d(0.5, 1, 1)"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="transform: scale3d(1, -0.5, 1)"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="transform: scale3d(1, 1, 0.5)"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="transform: scale3d(1.5, 0.5, 2)"><img src="/images/carrot.jpg" /></div> |

  *Tips*: 当值为负时，图像反转，且当值 小于 -1 时图像变大。

  ```css
  .scale3d {
    transform: scale(0.5, 1, 1)
  }
  ```

- **scaleX()**

  在 x 轴上缩放图像， 即 `scaleX(0.5)` = `scale3d(0.5, 1, 1)`

  | 原图 | 0.5 | 1 | 1.5 | -0.5 |
  | :---: | :---: | :---: | :---: | :---: |
  | <div class="filter-box2"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="transform: scaleX(0.5)"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="transform: scaleX(1)"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="transform: scaleX(1.5)"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="transform: scaleX(-0.5)"><img src="/images/carrot.jpg" /></div> |

  ```css
  .scaleX {
    transform: scaleX(0.5)
  }
  ```

- **scaleY()**

  在 y 轴上缩放图像， 即 `scaleY(0.5)` = `scale3d(1, 0.5, 1)`

  | 原图 | 0.5 | 1 | 1.5 | -0.5 |
  | :---: | :---: | :---: | :---: | :---: |
  | <div class="filter-box2"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="transform: scaleY(0.5)"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="transform: scaleY(1)"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="transform: scaleY(1.5)"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="transform: scaleY(-0.5)"><img src="/images/carrot.jpg" /></div> |

  ```css
  .scaleY {
    transform: scaleY(0.5)
  }
  ```

- **scaleZ()**

  在 z 轴上缩放图像， 即 `scaleZ(0.5)` = `scale3d(1, 1, 0.5)`

  | 原图 | 0.5 | 1 | 1.5 | -0.5 |
  | :---: | :---: | :---: | :---: | :---: |
  | <div class="filter-box2"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="transform: scaleZ(0.5)"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="transform: scaleZ(1)"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="transform: scaleZ(1.5)"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="transform: scaleZ(-0.5)"><img src="/images/carrot.jpg" /></div> |

  ```css
  .scaleZ {
    transform: scaleZ (0.5)
  }
  ```

- **skew()**

  拉伸图像，默认角度为0。当值为正时，图像顺时针拉伸，值为负数时，图像逆时针拉伸。

  `skew(ax[, ay])`

  *ax*: x 轴的拉伸角度

  *ay*: y 轴的拉伸角度，可选。

  | 原图 | x-15deg | y-15deg | x-45deg-y-15deg |
  | :---: | :---: | :---: | :---: |
  | <div class="filter-box2"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="transform: skew(15deg)"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="transform: skew(0, 15deg)"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="transform: skew(45deg, 15deg)"><img src="/images/carrot.jpg" /></div> |

- **skewX()**

  在 x 轴拉伸图像
  
  | 原图 | 45deg | 90deg | 180deg |
  | :---: | :---: | :---: | :---: |
  | <div class="filter-box2"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="transform: skewX(45deg)"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="transform: skewX(90deg)"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="transform: skewX(180deg)"><img src="/images/carrot.jpg" /></div> |

  *Tips*: 当拉伸角度为 90deg 时， 图像不可见。

  *注意*：实测在 QQ浏览器 等国产双核浏览器中，使用 skewX 非常容易造成浏览器崩溃（2020/05/09）。实测 搜狗浏览器 整个l'l

  ```css
  .skewX {
    transform: skewX(45deg)
  }
  ```

- **skewY()**

  在 y 轴拉伸图像
  
  | 原图 | 45deg | 90deg | 180deg |
  | :---: | :---: | :---: | :---: |
  | <div class="filter-box2"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="transform: skewY(45deg)"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="transform: skewY(90deg)"><img src="/images/carrot.jpg" /></div> | <div class="filter-box2" style="transform: skewY(180deg)"><img src="/images/carrot.jpg" /></div> |

  *Tips*: 当拉伸角度为 90deg 时， 图像不可见。

  ```css
  .skewY {
    transform: skewY(45deg)
  }
  ```

- **translate()**

  平移图像

  `translate(tx[, ty])`

  *tx*: 在 x 轴上移动图像

  *ty*: 在 y 轴上移动图像，可选，默认为 0

  ```css
  .translate {
    transform: translate(100%, 100%)
  }
  ```

- **translate3d()**

  在三维空间平移图像

  `translate3d(tx, ty, tz)`

  *tx*: 在 x 轴上移动图像

  *ty*: 在 y 轴上移动图像

  *tz*: 在 z 轴上移动图像，注意该值不能用百分比

  ```css
  .translate3d {
    transform: translate3d(100%, 100%, 5px)
  }
  ```

- **translateX()**

  在 x 轴上移动图像

  `translateX(5px)` = `translate(5px, 0)` = `translate3d(5px, 0, 0)`

- **translateY()**

  在 y 轴上移动图像

  `translateY(5px)` = `translate(0, 5px)` = `translate3d(0, 5px, 0)`

- **translateZ()**

  在 z 轴上移动图像

  `translateZ(5px)` = `translate3d(0, 0, 5px)`

- **perspective()**

  定义了 z = 0 平面与用户之间的距离，以便给三维定位元素一定透视度。当每个 3D 元素的 z > 0 时会显得比较大，而在 z < 0 时会显得比较小。其影响的程度由这个属性的值来决定。

  `perspective: 20px;`

- **matrix()**

  指定了一个由指定的 6 个值组成的 2D 变换矩阵。

  `matrix(a, b, c, d, tx, ty)`

  *a b c d*: 以 `number` 的格式来描述线性变换

  *tx ty*: 以 `number` 的格式来描述变换的量

- **matrix3d()**

  用一个 4 × 4 （16个值）的齐次矩阵来描述一个三维（3D）变换。

  `matrix3d(a1, b1, c1, d1, a2, b2, c2, d2, a3, b3, c3, d3, a4, b4, c4, d4)`

  *a1 b1 c1 d1 a2 b2 c2 d2 a3 b3 c3 d3 d4*: 以 `number` 的格式来描述线性变换

  *a4 b4 c4*: 以 `number` 的格式来描述变换的量

## 7. 数学函数

- **calc()**

  传入运算表达式进行一些简单计算

  ```css
  .box {
    width: calc(100% - 80px);
  }
  ```

  *注意*：
  
  1. `+` 和 `-` 运算符的两边必须要有空白字符。`*` 和 `/` 运算符的两边可不加空白字符，但考虑到统一性加上比较好。

  2. 用 0 作除数会使 HTML 解析器抛出异常。

  3. 涉及自动布局和固定布局的表格中的表列、表列组、表行、表行组和表单元格的宽度和高度百分比的数学表达式，auto 可视为已指定。

  4. `clac()` 里可以再嵌套 `clac()`, 如：`width: calc(100% - calc(50% - 30px));`。

  5. 运算表达式可以用小括号来建立运算顺序。


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

- **repeat()**

  表示轨道列表的重复片段，允许以更紧凑的形式写入大量显示重复模式的列或行。

  <style>
  .repeat-box {
    display: grid;
    grid-template-columns: repeat(2, 50px 1fr) 100px;
    grid-gap: 5px;
    box-sizing: border-box;
    height: 100px;
    width: 100%;
    background-color: #f2f2f2;
    padding: 10px;
    margin-bottom: 20px;
  }

  .repeat-box-item {
    background-color: lightblue;
    padding: 5px;
  }
  </style>

  <div class="repeat-box">
    <div class="repeat-box-item">1111</div>
    <div class="repeat-box-item">2222</div>
    <div class="repeat-box-item">3333</div>
    <div class="repeat-box-item">4444</div>
    <div class="repeat-box-item">5555</div>
  </div>

  ```css
  .repeat-box {
    display: grid;
    /* 创建 1 个 宽度为 100px 的格子， 2 个 宽度为 50px 的格子， 剩下的 2 个格子宽度为剩余空间的平分值 */
    grid-template-columns: repeat(2, 50px 1fr) 100px;
    grid-gap: 5px;
    box-sizing: border-box;
    height: 100px;
    width: 100%;
    background-color: #f2f2f2;
    padding: 10px;
  }

  .repeat-box-item {
    background-color: lightblue;
    padding: 5px;
  }
  ```


## 8. 缓动函数

- **cubic-bezier()**

  三次贝塞尔，主要是为 animation 生成速度曲线的函数。

  `cubic-bezier(x1,y1,x2,y2)`

  ```css
  /* ease */
  .ease {
    transition-timing-function: cubic-bezier(.25, .1, .25, 1);
  }
  /* liner */
  .liner {
    /* cubic-bezier(1, 1, 0, 0) */
    transition-timing-function: cubic-bezier(0, 0, 1, 1);
  }
  /* ease-in */
  .ease-in {
    transition-timing-function: cubic-bezier(.42, 0, 1, 1);
  }
  /* ease-out */
  .ease-out {
    transition-timing-function: cubic-bezier(0, 0, .58, 1);
  }
  /* ease-in-out */
  .ease-in-out {
    transition-timing-function: cubic-bezier(.42, 0, .58, 1);
  }
  /* bounce */
  .bounce {
    transition-timing-function: cubic-bezier(0.68, -0.55, 0.27, 1.55);
  }
  ```

- **steps()**

  如果说 `cubic-bezier` 是连续动画, 那么 `steps` 就是断续动画。通常应用在 loading 动画，逐帧动画之中。

  `steps(number, position)`

  *number*: 表示把动画分成了多少段。

  *position*: 接受两个值 start、end。start：表示直接开始。end：表示戛然而止。默认值。

  <style>
  .steps,
  .cubic-bezier {
    width: 300px;
    height: 40px;
    background: #f2f2f2;
    position: relative;
  }
  .steps::before,
  .cubic-bezier::before {
    position: absolute;
    top: 0;
    left: 0;
    content: '';
    width: 100%;
    height: 100%;
  }
  .cubic-bezier.show::before {
    animation: process 10s forwards cubic-bezier(0, 0, 1, 1);
  }
  .steps.show::before {
    animation: process 10s forwards steps(3, start);
  }
  @keyframes process {
    0% {
      background: lightblue;
      width: 0;
    }
    30% {
      background: darkslateblue;
      width: 30%;
    }
    70% {
      background: pink;
      width: 70%;
    }
    100% {
      background: lightblue;
      width: 100%;
    }
  }
  </style>

  <button onclick="showCBAni()" class="btn btn-primary">点击播放动画↓</button>

  | cubic-bezier | steps |
  | :---: | :---: |
  | <div class="cubic-bezier"></div> | <div class="steps"></div> |

  <script>
    function showCBAni() {
      $('.cubic-bezier, .steps').removeClass('show')
      setTimeout(function(){ 
        $('.cubic-bezier, .steps').addClass('show')
      }, 300)
    }
  </script>

  从以上 Demo 可以看出，`steps` 的动画是跳动着执行的，每个关键帧之间没有过渡。而 `cubic-bezier` 会自动给每个关键帧之间创建补间动画。

  ```css
  .cubic-bezier.show::before {
    animation: process 10s forwards cubic-bezier(0, 0, 1, 1);
  }
  .steps.show::before {
    animation: process 10s forwards steps(3, start);
  }
  ```

## 9. 其他函数

- **counter()**

  将计数器的值添加到元素

  counter 和 counters 要配合以下几个属性使用：

  1. `counter-reset`：计数器声明及初始值设置
  2. `counter-increment`：递增规则

    <style>
    .counter {
      margin-bottom: 20px;
      counter-reset: item;
    }
    .counter-item::before {
      counter-increment: item;
      content: counter(item)".";
      color: lightblue;
    }
  </style>

  <div class="counter">
    <div class="counter-item"> apple</div>
    <div class="counter-item"> bear</div>
    <div class="counter-item">
      cat
      <div class="counter">
      <div class="counter-item"> animal</div>
      <div class="counter-item"> cute</div>
      </div>
    </div>
  </div>

  ```css
  .counter {
    margin-bottom: 20px;
    counter-reset: item;
  }
  .counter-item::before {
    counter-increment: item;
    content: counter(item)".";
    color: lightblue;
  }
  ```

- **counters()**

  将计数器的值添加到元素

  `counters` 和 `counter` 的区别在于，counters 可以嵌套计数，counter 只能计算到第一层。

  *Tips*: counters 和 counter 的值只能添加到 `content`。

    <style>
    .counter2 {
      margin-bottom: 20px;
      counter-reset: section;
    }
    .counter-item2::before {
      counter-increment: section;
      content: counters(section, ".") " ";
      color: lightblue;
    }
  </style>

  <div class="counter2">
    <div class="counter-item2"> apple</div>
    <div class="counter-item2"> bear</div>
    <div class="counter-item2">
      cat
      <div class="counter2">
      <div class="counter-item2"> animal</div>
      <div class="counter-item2"> cute</div>
      </div>
    </div>
  </div>

  ```css
  .counter2 {
      margin-bottom: 20px;
      counter-reset: section;
  }
  .counter-item2::before {
    counter-increment: section;
    content: counters(section, ".") " ";
    color: lightblue;
  }
  ```

- **var()**

  引用`:root`中定义的变量，css中原生的引用变量方法，类似于 scss 中的 `$primary`。

  ```scss
  $primary: #28C5C2;

  .box {
    color: $primary;
  }
  ```

  ```css
  :root {
    --primary: #28C5C2;
  }

  .box {
    color: var(--primary);
    /* 这里 bgColor 这个变量没有被定义，因此会使用备用的 #f2f2f2 作为背景色 */
    background-color: var(--bgColor, #f2f2f2);
  }
  ```
