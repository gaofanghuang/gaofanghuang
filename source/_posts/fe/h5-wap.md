---
title: 移动 Web 开发问题和优化小结
date: 2020-05-15 11:55:00
update: 2020-05-15 14:20:00
tags:
  - Javascript
  - HTML5
  - 待填坑
categories: 前端笔记
---

## Meta 标签

<!--more-->

### 禁止缩放页面

```html
<meta
  content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;"
  name="viewport"
/>
```

### 禁止 ios 上自动识别电话

```html
<meta content="telephone=no" name="format-detection" />
```

### 禁止 android 上自动识别邮箱

```html
<meta content="email=no" name="format-detection" />
```

## 原生交互

### 打电话发短信

```html
<a href="tel:10086">打电话给: 10086</a> <a href="sms:10086">发短信给: 10086</a>
```

## 性能优化

### css 动画开启硬件加速

```css
.translate3d {
  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);
  -ms-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
```

1. CSS3 动画或者过渡尽量使用 transform 和 opacity 来实现动画，不要使用 left 和 top。

2. 动画和过渡能用 css3 解决的，就不要使用 js。

### click 事件延迟响应

封装 `tap` 事件来代替 `click`。

`tap` 事件由 `touchstart` 事件 + `touchmove`（判断是否是滑动事件）+ `touchend` 事件封装组成。

### 图片优化

1. base64 编码图片替换 url 图片

例如一些小图标（8k 以内）转换成 base64，以减少 http 请求。

2. 图片压缩

3. 图片懒加载

非首屏的图片，在页面滚到到相应位置时，才加载。

4. img 还是 background

   _img_：html 中的标签 img 是网页结构的一部分会在加载结构的过程中和其他标签一起加载。

   _background_：以 css 背景图存在的图片 background 会等到结构加载完成（网页的内容全部显示以后）才开始加载

   根据具体情况选用。

### IOS 兼容问题

#### 局部滚动

IOS 在局部滚动时会产生卡顿，加上以下代码即可解决。

```css
.scroll {
  -webkit-overflow-scrolling: touch;
}
```

#### 定位

ios 下 fixed 元素容易定位出错，软键盘弹出时，影响 fixed 元素定位，会发生元素错位（滚动一下又恢复），有时候会出现闪屏的效果。

使用 `absolute` 代替 `fixed`。

#### input 去掉触摸高亮

```css
a,
button,
input,
textarea {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0;);
}
```

#### input 去掉默认样式

```css
input,
button,
textarea {
  -webkit-appearance: none;
}
```

### android 兼容

#### 圆角失效

```css
.box {
  background-clip: padding-box;
}
```

### 局部上下滑动时，页面不滑动

1. body 加上 css `touch-action: none;`

2. touchstart 的时候 `event.preventDefault();` 阻止默认事件

### 刘海屏/异型屏

to do ...

### 背景图模糊

手机分辨率过高的原因。

根据不同的分辨率显示不同清晰度的图片。

### 旋转屏幕时，字体大小调整的问题

```css
html,
body,
form,
fieldset,
p,
div,
h1,
h2,
h3,
h4,
h5,
h6 {
  -webkit-text-size-adjust: 100%;
}
```
