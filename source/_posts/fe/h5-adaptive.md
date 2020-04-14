---
title: H5自适应小结
date: 2020-04-07 16:48:50
tags:
  - html5
  - 移动端
  - 自适应
categories: 前端笔记
---

## H5 头标签

```html
<!-- 优先使用 IE 最新版本和 Chrome / 使用极速模式 -->
<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1" />

<!-- 360 使用Google Chrome Frame -->
<meta name="renderer" content="webkit" />

<!-- 使用响应式渲染 -->
<meta
  name="viewport"
  content="initial-scale=1, maximum-scale=3, minimum-scale=1, user-scalable=no"
/>
```

<!--more-->

## 单位 VW/REM

### VW

1.**vw**：1vw 等于视口宽度的 1%。

2.**vh**：1vh 等于视口高度的 1%。

3.**vmin**：选取 vw 和 vh 中最小的那个。

4.**vmax**：选取 vw 和 vh 中最大的那个

```css
/* 例 */
.banner {
  width: 100vw;
  height: 40vw;
  font-size: 4.72vw;
}
```

### REM

rem 是相对于根元素（html）字体大小的单位，他只是一种相对单位。不同于另一个相对单位 em，em 是相对于父元素的字体大小，而 rem 则相对于根元素（html），与父元素的字体大小无关。

字号大小不推荐用 rem 作为单位，否则可能会有文字排版问题。因此，字号仍旧使用 px 作为单位，并配合 data-dpr 自定义属性来在普通屏和高清屏设置不同的 font-size。

原理：1. 使用 js 根据屏幕宽度设置不同的根字体大小；2. 使用 rem 为单位绘制元素宽高；3. 文字大小仍旧使用 px 为单位。

```javascript
window.onresize = function () {
  RootSize()
}
function RootSize() {
  var docWidth = document.documentElement.clientWidth
  var objHtml = document.getElementsByTagName('html')[0]
  objHtml.style.fontSize = docWidth / 7.5 + 'px'
}
RootSize()
```

```css
/* 例 */
.banner {
  width: 100%;
  height: 20rem;
  font-size: 16px;
}
```

## 媒体查询

```css
html {
  font-size: 20px;
  /* 平滑渐变 */
  -webkit-transition: font-size 0.2s ease-out;
}
@media only screen and (min-width: 401px) {
  html {
    font-size: 25px !important;
  }
}
@media only screen and (min-width: 428px) {
  html {
    font-size: 26.75px !important;
  }
}
@media only screen and (min-width: 481px) {
  html {
    font-size: 30px !important;
  }
}
@media only screen and (min-width: 569px) {
  html {
    font-size: 35px !important;
  }
}
@media only screen and (min-width: 641px) {
  html {
    font-size: 40px !important;
  }
}
```

## 刘海屏/异性屏处理

```css
header {
  /* Status bar height on iOS 10 */
  padding-top: 20px;
  /* Status bar height on iOS 11+ */
  padding-top: constant(safe-area-inset-top);
}
```
