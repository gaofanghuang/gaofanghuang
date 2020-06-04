---
title: Vue 基础
date: 2020-04-22 10:32:00
update: 2020-05-15 14:15
tags:
  - Vue
  - VueX
  - VueRouter
  - 待填坑
categories: Vue开发
---

## Vue 语法

[查看官网文档](https://cn.vuejs.org/)

<!--more-->

### 在 Vue 使用 SVG

1. 使用 [iconfont](https://www.iconfont.cn/)

  ```vue
  <template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="icon"></use>
  </svg>
  </template>

  <script>
  export default {
    data() {
      return {
        icon: "#icon-menu"
      }
    }
  }
  </script>
  ```

2. 封装 Icon 组件

## Vue-cli

### 安装

to do …… 

### 集成SASS/SCSS

vue-cli 3+ 版本已默认集成 SCSS，在创建项目的时候选择相应配置即可。

如果创建项目的时候没有配置则可以用以下方案添加支持：

1. 安装依赖

  ```shell
  npm install -D sass-loader node-sass
  ```

2. vue文件中style指定lang为scss即可

  ```vue
  <style lang="scss">
    $color = red;
  </style>
  ```

3. scss全局变量/函数
  在 vue.config.js 文件中指定 scss 配置文件，之后在每个 scss 文件中就使用该文件中定义的变量和函数了。否则需要在每个 vue 文件中 import 一遍。

  ```javascript
  // vue.config.js
  const fs = require('fs')
  module.exports = {
    css: {
      loaderOptions: {
        sass: {
          data: fs.readFileSync('src/variables.scss', 'utf-8')
        }
      }
    }
  }
  ```

### GithubPage中的配置

可以利用 vue 生成的静态文件，作为 GithubPage 中的网页。

在 GithubPage 中除了生成 index.html 外，还需要生成一个 404.html。

```javascript
// vue.config.js
module.exports = {
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'index',
    },
    notfound: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: '404.html',
      title: '404',
    },
  },
}
```

## Vuex

## Vue-Router

## UI 框架

