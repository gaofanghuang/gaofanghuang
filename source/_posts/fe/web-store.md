---
title: 浏览器数据存储方案
date: 2020-04-07 15:18:52
update: 2020-05-15 14:20:00
tags:
  - Javascript
  - 数据存储
categories: 前端笔记
---

常见的浏览器数据存储方法：Cookie、WEB 存储 (localStorage 和 sessionStorage)、IndexedDB。

需要注意的是，以上方法都不适合存储敏感数据。

<!--more-->

## Cookie

优点：Cookie 的兼容性最好，可以兼容现在市面上所有的主流浏览器。

缺点：存储量小、性能差、只能储存字符串、安全问题。

Cookie 是没有过期时间的，可以设置永不过期，也可以默认不设置的话，是关闭浏览器自动过期。

cookie 过期时间设置方式：

```javascript
cookie.setMaxAge(0) //不记录cookie

cookie.setMaxAge(-1) //会话级cookie，关闭浏览器失效

cookie.setMaxAge(60 * 60) //过期时间为1小时
```

### 语法

```javascript
var CookieUtil = {
    // get可根据cookie的名字获取相应的值
    get: function() {
        const cookieName = encodeURIcOMPONET(name) + "=",
               cookieStart = document.cookie.indexOf(cookieName),
               cookieValue = null
        if(cookieStart > -1) {
            const cookieEnd = document.cookie.indexOf(";", cookieStart)
            if(cookieEnd == -1) {
                cookieEnd = document.cookie.length
            }
            cookieValue = decodeURICompoent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd))
        }
        return cookieValue
    }
    // set设置一个cookie
    set: function(name, value, expires, path, domain, secure) {
        var cookieText = encodeURIComponet(name)+"="+encodeURIComponet(value)
        if(expires instanceof Date) {
            cookieText += "; expires=" + expires.toGMTString()
        }
        if(path) {
            cookieText += ";path=" + path
        }
        if(domain) {
            cookieText += "; domain" + domain
        }
        if(secure) {
            cookieText += "; secure"
        }
        document.cookie = cookieText
    }
    // 删除已有的cookie
    unset: function(name, path, domain, secure) {
        this.set(name, "", new Date(0), path, domain, secure)
    }
}
```

## WEB 存储

WEB 存储，即 localStorage 和 sessionStorage。

与 Cookie 的区别：

1. 属于 HTML5 标准的新 API，上古浏览器不支持。

2. 存储量大，可以跨会话存在。

3. 更安全。

### localStorage

```javascript
// 使用方法存储数据
localStorage.setItem('name', 'Srtian')
const user = { name: 'Srtian', age: 22 }
localStorage.setItem('user', JSON.stringify(user))

// 使用属性存储数据
localStorage.say = 'Hello world'

// 使用方法读取数据
const name = localStorage.getItem('name')
const user = JSON.parse(localStorage.getItem('user'))

// 使用属性读取数据
const say = localStorage.say

// 删除数据
localStorage.removeItem('name')
```

### sessionStorage

```javascript
// 保存数据到sessionStorage
sessionStorage.setItem('name', 'Srtian')

// 从sessionStorage获取数据
var data = sessionStorage.getItem('name')

// 从sessionStorage删除保存的数据
sessionStorage.removeItem('name')

// 从sessionStorage删除所有保存的数据
sessionStorage.clear()
```

### 时效

**永久的**：

localStorage 存储的数据时永久性的，除非我们使用 removeItem 来删除或者用户通过设置浏览器配置来删除，负责数据会一直保留在用户的电脑上，永不过期。

**暂时的**：

Session Storage 只存储当前会话页的数据，且只有当用户关闭当前会话页或浏览器时，数据才会被清除。

## IndexedDB

IndexedDB 的优点：

1. 数据格式是 JSON

2. 存储量较 localStorage/sessionStorage 更大，取决于设备（分配到浏览器）的内存大小。

缺点是浏览器兼容问题，IE10 以下无法使用。

### 语法

```javascript
// 注意数据库的版本号只能是整数
const request = IndexedDB.open(databasename, version)

request.onerror = function () {
  // 创建数据库失败时的回调函数
}
request.onsuccess = function () {
  // 创建数据库成功时的回调函数
}
request.onupgradeneededd = function (e) {
  // 当数据库改变时的回调函数
}

request.onupgradeneeded = function (event) {
  const db = event.target.result
  const objectStore = db.createObjectStore('name', { keyPath: 'id' })
}
```

## 区别

|   区别   | Cookie  |   localStorage    |  sessionStorage   |     IndexedDB      |
| :------: | :-----: | :---------------: | :---------------: | :----------------: |
|   兼容   |  良好   |       一般        |       一般        |         差         |
|   安全   |   差    |       一般        |       一般        |        良好        |
|   性能   |   差    |       一般        |       一般        |        良好        |
|   容量   | 4k 以内 |      5M 左右      |      5M 左右      | 50M 以上（或不限） |
|   时效   | 无过期  |       永久        |     当前会话      |        永久        |
|   格式   | 字符串  | key/value(字符串) | key/value(字符串) |  key/value(Json)   |
| 同域限制 |   是    |        是         |        是         |         是         |
