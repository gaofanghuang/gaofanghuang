---
title: H5与原生APP的交互事件
date: 2020-04-26 10:03:00
update: 2020-05-15 14:20:00
tags:
  - HTML5
  - 移动端
  - 唤端
categories: 前端笔记
---

## H5 与原生 APP 的传值

传值需要和原生开发者先沟通好，比如以下的 activity 事件需要原生先做这个监听事件的处理。

```javascript
if (isApp) {
  let u = navigator.userAgent
  let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 //android终端
  let isIos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
  if (isIos) {
    webkit.messageHandlers.activity.postMessage(`这里传字符串`)
  } else {
    activity.startNewActivity(`这里传字符串`)
  }
}
```

<!--more-->

## 唤端

唤端是指当用户在微信或浏览器中打开 H5，可以通过某个事件打开原生 APP。

### 原理

浏览器是通过 `URL scheme` 打开 APP，一个 APP 可以设置一个或多个打开自己的 URL scheme。比如，Twitter 就注册自己能被`「twitter://」`打开。

如果是做 APP 间相互跳转是比较简单的。iOS 就可以使用 UIApplication 的 canOpenUrl 方法来检测 URL scheme 是否能打开对应的 APP。

比如，如果「twitter://」检测能被打开，也就说明本地安装了 Twitter 。再用 UIApplication 的 openURL 方法，就能打开 Twitter 了。Android 中的做法类似。

### 实现

#### IOS 实现方式

iOS 中默认通过 Safari 打开 URL scheme，方法一般如下两种：

1. **直跳方式**：点击链接、修改 window.location 等。

- 点击链接跳转

  ```html
  <a href="schemeUrl">在APP内打开</a>
  ```

- 通过 js 打开

  ```javascript
  window.location.href = schemeUrl
  ```

2. **iframe 方式**：在 body 上添加 iframe，设置 src 属性为跳转的 URL scheme。

```html
<a href="APP下载地址">下载或打开APP</a>
<script>
  // 这里的 click 事件会比 href 先一步执行，如果 iframe 的 src 加载失败，页面就会跳转到 a 标签 href 中的地址
  $('a').click(function () {
    var ifr = document.createElement('iframe')
    ifr.src = '自定义 URL scheme'
    ifr.style.display = 'none'
    document.body.appendChild(ifr)
    setTimeout(function () {
      document.body.removeChild(ifr)
    }, 3000)
  })
</script>
```

一般来说*推荐使用第二种方式*。第二种方法不会引起页面可见的变化（例如页面内容变成一个新页面），不会导致浏览器历史记录的变化。

在第一种情况，如果 APP 唤醒失败，或者 APP 未安装的话，很多时候都会跳到错误页，这很影响用户体验，而我们的要求可能是跳转到其他页面或者下载 APP。

#### 安卓实现方式

安卓主要依靠 setTimeout 来区分是否唤醒成功。

```javascript
function openApp(openUrl, appUrl, action, callback) {
  // 检查app是否打开
  function checkOpen(cb) {
    var _clickTime = +new Date()
    function check(elsTime) {
      if (elsTime > 3000 || document.hidden || document.webkitHidden) {
        cb(1)
      } else {
        cb(0)
      }
    }
    // 启动间隔20ms运行的定时器，并检测累计消耗时间是否超过3000ms，超过则结束
    var _count = 0,
      intHandle
    intHandle = setInterval(function () {
      _count++
      var elsTime = +new Date() - _clickTime
      if (_count >= 100 || elsTime > 3000) {
        clearInterval(intHandle)
        check(elsTime)
      }
    }, 20)
  }

  // 在iframe 中打开APP
  var ifr = document.createElement('iframe')
  ifr.src = openUrl
  ifr.style.display = 'none'
  if (callback) {
    checkOpen(function (opened) {
      callback && callback(opened)
    })
  }

  document.body.appendChild(ifr)
  setTimeout(function () {
    document.body.removeChild(ifr)
  }, 2000)
}
```

### 常用 URL Scheme

几个常用的URL Scheme平台：

- QQ： mqq://

- 微信： weixin://

- 淘宝： taobao://

- 支付宝： alipay://

- 微博： sinaweibo://

- 知乎： zhihu://

- 短信： sms://

### 第三方唤端库

[callapp-lib](https://www.npmjs.com/package/callapp-lib)

## 引导下载 APP

微信将 唤起本地 APP 的接口 和 下载 APP 的接口 给禁了，所以微信中是不能直接唤起 APP 的，一般做法是提示用户在浏览器中打开。下载 APP 的操作也是这样。

一般的做法是添加一张引导图片，引导用户点击右上角的更多按钮，然后点击【在浏览器中打开】这个按钮，跳转到系统浏览器之后，在执行响应的 唤端 或 下载 事件。
