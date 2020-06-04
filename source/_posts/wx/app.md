---
title: 微信小程序开发总结
date: 2020-04-09 14:39:15
update: 2020-05-15 14:20:00
tags:
  - 微信小程序
  - 待填坑
categories: 微信开发
---

## 原生语法

to be continue

<!--more-->

### http封装

1. 二次封装http方法

  小程序提供了原生的http方法，为了方便使用，我这里可以进行二次封装。

  ```javascript
  // http.js
  export const API_URI = 'https://www.huanggaofang.com/api/'

  import util from "./util"

  let token = ""

  function fetch(url, params, method, header, resolve, reject) {
    let _header = {
      ...header,
      'client': 'miniapp',
      'Authorization': "Bearer " + token
    }
    wx.request({
      url: `${API_URI}/${url}`,
      data: params,
      method: method,
      header: _header,
      success: res => {
        if (res.statusCode === 200 || res.statusCode === 201 || res.statusCode === 202 || res.statusCode === 204) {
          resolve(res)
        } else if (res.statusCode === 401) {
          console.log("token过期重新登录")
          wx.removeStorage({
            key: 'token',
            success(res) {
              console.log(res.data)
            }
          })
          setTimeout(() => {
            wx.reLaunch({
              url: 'index'
            })
          }, 600);
        } else {
          reject(res)
        }
      },
      fail: err => {
        console.log(err)
      }
    })
  }

  const http = function (url, params, method, header) {
    if (!token) {
      wx.getStorage({
        key: 'token',
        success(res) {
          token = res.data
          console.log(res.data)
        }
      })
    }
    return new Promise((resolve, reject) => {
      if (!token) {
        setTimeout(() => {
          fetch(url, params, method, header, resolve, reject)
        }, 300);
      } else {
        fetch(url, params, method, header, resolve, reject)
      }
    })
  }

  module.exports = {
    baseUrl: function () {
      return API_URI
    },
    get: function (url, params) {
      return http(url, params, "GET", {
        'content-type': 'application/json'
      })
    },
    delete: function (url, params) {
      return http(url, params, "DELETE", {
        'content-type': 'application/json'
      })
    },
    post: function (url, params, header = { 'content-type': 'application/x-www-form-urlencoded' }) {
      let formData = util.json2Form(params)
      return http(url, formData, "POST", header)
    }
  }
  ```

  ```javascript
  // util.js
  function json2Form(json) {
    let str = [];
    for (let p in json) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
    }
    return str.join("&");
  }

  module.exports = {
    json2Form,
  }
  ```

### 上拉加载下拉刷新

### 常见问题

## mpvue

### 语法

### 应用

#### 在 mpvue 中使用iView

[查看文档](https://weapp.iviewui.com/docs/guide/start)

### 常见问题

## wepy

## 其他平台小程序

### 支付宝小程序

### 快应用