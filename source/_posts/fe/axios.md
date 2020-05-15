---
title: Axios 的配置与封装
date: 2020-04-22 10:04:24
update: 2020-05-15 14:20:00
tags:
  - HTTP
  - axios
  - ajax
categories: 前端笔记
---

Axios 是一个基于 promise 的 HTTP 库,可以用在浏览器和 Node.js 中。

## 安装

node.js

```shell
npm install axios --save
```

直接引用

```javascript
<script src="https://cdn.bootcss.com/axios/0.19.2/axios.min.js"></script>
```

<!--more-->

## 默认配置

### 1. 全局配置

```javascript
axios.defaults.baseURL = 'http://api.huanggaofang.com'
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
axios.defaults.headers.post['content-Type'] = 'application/x-www-form-urlencoded'
```

### 2. 自定义实例

```javascript
// 当创建实例的时候配置默认配置
var instance = axios.create({
  baseURL: 'http://api.huanggaofang.com',
})

// 当实例创建时候修改配置
instance.defaults.headers.common['Authorization'] = AUTH_TOKEN
```

### 3. 优先级

> lib/defaults.js < 实例中的默认配置 < 请求中的 config 参数的配置

`请求中的config参数的配置`优先级最高。

```javascript
// 创建一个实例的时候会使用lib目录中的默认配置
// 在这里timeout配置的值为0，来自于lib的默认值
var instance = axios.create()
// 回覆盖掉lib的默认值
// 现在所有的请求都要等2.5S之后才会发出
instance.defaults.timeout = 2500
// 这里的timeout回覆盖之前的2.5S变成5s
instance.get('/test', {
  timeout: 5000,
})
```

## 拦截器

可以在请求、响应在到达 then / catch 之前拦截他们

### 1. 请求拦截器

```javascript
// 添加一个请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 在请求发出之前进行一些操作
    return config
  },
  function (err) {
    return Promise.reject(error)
  }
)
// 添加一个响应拦截器
axios.interceptors.response.use(
  function (res) {
    // 在这里对返回的数据进行处理
    return res
  },
  function (err) {
    return Promise.reject(error)
  }
)
```

### 2. 取消拦截器

```javascript
var myInterceptor = axios.interceptor.request.use(function () {
  /*....*/
})
axios.interceptors.request.eject(myInterceptor)
```

### 3. 给自定义的 axios 实例添加拦截器

```javascript
var instance = axios.create()
instance.interceptors.request.use(function () {})
```

## 错误处理

```javascript
axios.get('/getList').catch(function (error) {
  if (error.response) {
    // 请求已经发出，但是服务器响应返回的状态吗不在2xx的范围内
    console.log(error.response.data)
    console.log(error.response.status)
    console.log(error.response.header)
  } else {
    // 一些错误是在设置请求的时候触发
    console.log('Error', error.message)
  }
  console.log(error.config)
})
```

## 取消请求

以通过一个 cancel token 来取消一个请求

### 1. CancelToken.source

可以通过 CancelToken.source 工厂函数来创建一个 cancel token

```javascript
var CancelToken = axios.CancelToken;
var source = CancelToken.source();

axios.get('/getList',{
  cancelToken: source.token
}).catch(function(thrown){
  if(axios.isCancel(thrown)){
    console.log('Request canceled',thrown.message);
  }else {
    //handle error
  }
});

// 取消请求（信息的参数可以设置的）
source.cancel("操作被用户取消");
```

### 2. cancelToken构造函数

可以给 cancelToken 构造函数传递一个 executor function 来创建一个 cancel token

```javascript
var cancelToken = axios.CancelToken;
var cancel;
axios.get('/getList',{
  cancelToken: new CancelToken(function(c){
    // 这个executor函数接受一个cancel function作为参数
    cancel = c;
  })
})
// 取消请求
cancel();
```

## 常用封装

我在 vue 中的常用 axios 封装

```javascript
import axios from 'axios';
import router from '@/services/router';
import Message from '@/plugins/message';
import $db from '@/services/Storage';

let cancel;
let pending = {};
const CancelToken = axios.CancelToken;

export const baseURL =
  process.env.NODE_ENV === 'production'
    ? process.env.VUE_APP_API_HOST_PROD
    : process.env.VUE_APP_API_HOST_DEV;

const instance = axios.create({
  baseURL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
});

//请求拦截器
instance.interceptors.request.use(
  config => {
    //发起请求时，取消掉当前正在进行的相同请求
    if (pending[config.url]) {
      pending[config.url]('操作取消');
      pending[config.url] = cancel;
    } else {
      pending[config.url] = cancel;
    }
    const TOKEN = $db.getData('token');
    if (TOKEN) {
      config.headers.Authorization = TOKEN;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器即异常处理
instance.interceptors.response.use(
  response => {
    return response;
  },
  err => {
    if (!axios.isCancel(err)) {
      if (err && err.response) {
        switch (err.response.status) {
          case 400:
            err.tips = '错误请求';
            break;
          case 401:
            err.tips = $db.hasData('token') ? '登录超时，请重新登录' : '请登录后再操作';
            window.localStorage.clear();
            router.push({
              path: '/login',
              query: { redirect: router.currentRoute.fullPath },
            });
            break;
          case 403:
            err.tips = '拒绝访问';
            break;
          case 404:
            err.tips = '请求错误,未找到该资源';
            break;
          case 405:
            err.tips = '请求方法未允许';
            break;
          case 408:
            err.tips = '请求超时';
            break;
          case 422: {
            const { data: { message = '错误请求' } = {} } = err.response;
            err.tips = message;
            break;
          }
          case 500:
            err.tips = '服务器端出错';
            break;
          case 501:
            err.tips = '网络未实现';
            break;
          case 502:
            err.tips = '网络错误';
            break;
          case 503:
            err.tips = '服务不可用';
            break;
          case 504:
            err.tips = '网络超时';
            break;
          case 505:
            err.tips = 'http版本不支持该请求';
            break;
          default:
            err.tips = `连接错误${err.response.status}`;
        }
      } else {
        err.tips = '网络不可用，请检查！';
      }
      console.log('err', err.tips);
    }
    Message.error(err.tips || err);
    return Promise.reject(err);
  }
);

export const get = (url, param) => {
  return new Promise((resolve, reject) => {
    instance({
      method: 'get',
      url,
      params: param,
      cancelToken: new CancelToken(c => {
        cancel = c;
      }),
    }).then(
      res => {
        resolve(res);
      },
      err => {
        reject(err);
      }
    );
  });
};
export const post = (url, param) => {
  return new Promise((resolve, reject) => {
    instance({
      method: 'post',
      url,
      data: param,
      cancelToken: new CancelToken(c => {
        cancel = c;
      }),
    }).then(
      res => {
        resolve(res);
      },
      err => {
        reject(err);
      }
    );
  });
};
export const updated = (url, param) => {
  return new Promise((resolve, reject) => {
    instance({
      method: 'patch',
      url,
      data: param,
      cancelToken: new CancelToken(c => {
        cancel = c;
      }),
    }).then(
      res => {
        resolve(res);
      },
      err => {
        reject(err);
      }
    );
  });
};
export const remove = (url, param) => {
  return new Promise((resolve, reject) => {
    instance({
      method: 'delete',
      url,
      params: param,
      cancelToken: new CancelToken(c => {
        cancel = c;
      }),
    }).then(
      res => {
        resolve(res);
      },
      err => {
        reject(err);
      }
    );
  });
};
```