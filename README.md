# Gaofang's Site

黄高芳的小站，在这里记录开发日志。

## 技术架构

后端：Node.js + Koa + Json
中后台：Vue全家桶 + Element UI + Axios
前台：Vue全家桶 + Axios

## 实现原理

使用Koa来储存Json数据、储存图片，前台使用Axios来读取json数据。

## 操作方式

在本地dev模式下可以登陆后台编辑内容、查看统计数据，在production模式下只能查看前台内容。

## 运行方式

```
// 1.打开后端服务，命令行
$ cd serve
$ npm i
$ npm run serve

// 2. 打开中后台服务，命令行
$ cd admin
$ npm i
$ npm run serve

// 3. 编译前台SPA，将在根目录自动生成index.html和404.html
$ cd client
$ npm i
$ npm run build
```

