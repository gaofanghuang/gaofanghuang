---
title: Easy API
date: 2020-09-16 14:50:00
tags:
  - Nest
  - Typescript
  - API
categories: 个人项目
state: 3
---

一个符合 RESTful API 架构的 Web 接口，使用 Nest + MySql 开发。

<!--more-->

## 1.用户模块

### 1.1 注册账号

地址：`/api/user/register`

方法：`Post`

参数:
**body**:

```javascript
  {
    /** 用户名 */
    userName: string,
    /** 密码 */
    password: string
  }
```

返回：

```javascript
  {
    /** 0 请求成功 */
    "ReturnCode": 0,
    "ErrorMassage": null,
    "Data": {
      /** 用户名 */
      "userName": "abc123",
      /** 昵称 */
      "nickName": "abc123",
      /** 普通用户 */
      "role": 0,
      /** 用户id */
      "id": 2,
      /** 创建时间 */
      "createTime": "2020-09-16T07:11:16.000Z",
      /** 更新时间 */
      "updateTime": "2020-09-16T07:11:16.000Z"
    }
  }
```

### 1.2 登录账号

地址：`/api/user/login`

方法：`Post`

参数：
**body**:

```javascript
  {
    /* 用户名 */
    userName: string,
    /* 密码 */
    password: string
  }
```

返回：

```javascript
  {
    "ReturnCode": 0,
    "ErrorMassage": null,
    "Data": {
      "id": 2,
      "userName": "abc123",
      "nickName": "abc123",
      "role": 0,
      "createTime": "2020-09-16T07:11:16.000Z",
      "updateTime": "2020-09-16T07:11:16.000Z",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImFiYzEyMyIsImlkIjoyLCJuaWNrTmFtZSI6ImFiYzEyMyIsInJvbGUiOjAsImlhdCI6MTYwMDI0MDU2NiwiZXhwIjoxNjAwMjY5MzY2fQ.FSaFgz21MYa1VFfTzK5aOrYeSrnG-DYMmdH_oHW6sAg"
    }
  }
```

### 1.2 根据id获取用户信息

地址：`/api/user/{id}`

方法：`Get`

参数：`{}`

返回：

```javascript
  {
    "ReturnCode": 0,
    "ErrorMassage": null,
    "Data": {
      "id": 2,
      "userName": "abc123",
      "nickName": "abc123",
      "role": 0,
      "createTime": "2020-09-16T07:11:16.000Z",
      "updateTime": "2020-09-16T07:11:16.000Z"
    }
  }
```

### 1.3 登录后编辑用户信息

地址：`/api/user/{id}`

方法：`Patch`

参数：

**Authorization**: `BearerToken={token}`

**body**:

```javascript
  {
    nickName: "hahaha"
  }
```

返回：

```javascript
  {
    "ReturnCode": 0,
    "ErrorMassage": null,
    "Data": ""
  }
```
