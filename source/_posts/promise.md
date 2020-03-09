---
title: Promise
date: 2020-03-09 09:15:46
tags:
  - Promise
  - ES6
  - Javascript
categories: 前端笔记
---

## 概念

### 1. Async

async function 用来定义一个返回 AsyncFunction 对象的异步函数。异步函数是指通过事件循环异步执行的函数，它会通过一个隐式的 Promise 返回其结果。

### 2. Await

异步函数可以包含 await 指令，该指令会暂停异步函数的执行，并等待 Promise 执行，然后继续执行异步函数，并返回结果。

await 关键字只在异步函数内有效。如果在异步函数外使用它，会抛出语法错误。

当异步函数暂停时，它调用的函数会继续执行(收到异步函数返回的隐式 Promise)

### 3. Promise

Promise 对象用于表示一个异步操作的最终完成 (或失败), 及其结果值.

<!--more-->

#### Async/Await 和 Promise 的关系

async/await 的目的是简化使用多个 promise 时的同步行为，并对一组 Promises 执行某些操作。正如 Promises 类似于结构化回调，async/await 更像结合了 generators 和 promises。

大多数异步函数也可以使用 Promises 编写。

#### Async/Await 和 Promise 的区别

在错误处理方面，async 函数更容易捕获异常错误。

#### 回调函数和 Promise 的区别

回调函数容易造成回调地狱。promise 可以让代码更容易读懂。

回调函数：

把一个函数 A 传给另一个函数 B 调用，并在函数 B 完成后执行，那么 A 就是回调函数。

[查看 demo](https://gaofanghuang.github.io/demo/api/promise/demo4)

### 4. bluebird

bluebird 是一个第三方 Promise 规范实现库，它不仅完全兼容原生 Promise 对象，且比原生对象功能更强大。bluebird 的浏览器兼容性比原生的更好。

[bluebird api 文档](http://bluebirdjs.com/docs/getting-started.html)

## 语法

### 1. Async

```javascript
/**
 * @params name 函数名称
 * @params param 要传递给函数的参数
 * @params statements 函数体语句
**/
async function name([param[, param[, ... param]]]) { statements }
```

返回值：

返回的 Promise 对象会运行**执行**(resolve)异步函数的返回结果，或者运行**拒绝**(reject)——如果异步函数抛出异常的话。

### 2. Await

`[return_value] = await expression;`

**expression** 表达式:

一个 Promise 对象或者任何要等待的值。

**return_value** 返回值:

返回 Promise 对象的处理结果。如果等待的不是 Promise 对象，则返回该值本身。

### 3. Promise

```javascript
/**
 * @params resolve 将promise的状态改为fulfilled（完成）
 * @prams reject 将promise的状态改为rejected（失败）
**/
new Promise( function(resolve, reject) {...} /* executor */  );
```

如果在 executor 函数中抛出一个错误，那么该 promise 状态为 rejected。 executor 函数的返回值被忽略。

一个 Promise 有以下几种状态：

- pending: 初始状态，既不是成功，也不是失败状态。

- fulfilled: 意味着操作成功完成。

- rejected: 意味着操作失败。

状态变化过程（from MDN）:

![](https://mdn.mozillademos.org/files/8633/promises.png)

方法：

- `Promise.all(iterable)`: 返回一个新的 promise 对象，该 promise 对象在 iterable 参数对象里所有的 promise 对象都成功的时候才会触发成功，一旦有任何一个 iterable 里面的 promise 对象失败则立即触发该 promise 对象的失败。 Promise.all 方法常被用于处理多个 promise 对象的状态集合。

- `Promise.race(iterable)`: 当 iterable 参数里的任意一个子 promise 被成功或失败后，父 promise 马上也会用子 promise 的成功返回值或失败详情作为参数调用父 promise 绑定的相应句柄，并返回该 promise 对象。

- `Promise.reject(reason)`: 返回一个状态为失败的 Promise 对象，并将给定的失败信息传递给对应的处理方法。注意当使用 reject 之后，必须要加 catch 声明 onRejected 回调。

- `Promise.resolve(value)`: 返回一个状态由给定 value 决定的 Promise 对象。如果该值是 thenable (即，带有 then 方法的对象)，返回的 Promise 对象的最终状态由 then 方法执行决定；否则的话(该 value 为空，基本类型或者不带 then 方法的对象)，返回的 Promise 对象状态为 fulfilled，并且将该 value 传递给对应的 then 方法。

Promise 原型方法：

- `Promise.prototype.catch(onRejected)`：添加一个拒绝(rejection) 回调到当前 promise, 返回一个新的 promise。当这个回调函数被调用，新 promise 将以它的返回值来 resolve，否则如果当前 promise 进入 fulfilled 状态，则以当前 promise 的完成结果作为新 promise 的完成结果。

- `Promise.prototype.then(onFulfilled, onRejected)`：添加**解决**(fulfillment)和**拒绝**(rejection)回调到当前 promise, 返回一个新的 promise, 将以回调的返回值来 resolve。

- `Promise.prototype.finally(onFinally)`：不管最终返回的是 resolve 还是 reject, finally 里的代码都会执行，一般写在 catch 后面。

Tips:

1. 写 promise 最好加上 catch。

2. 由于 promise 是异步的, try catch 语句也无法捕获其错误。

## 应用示例

### 1. 创建一个 promise

[查看 demo](https://gaofanghuang.github.io/demo/api/promise/demo1)

### 2. 使用 async 函数重写 promise 链

[查看 demo](https://gaofanghuang.github.io/demo/api/promise/demo2)

### 3. 多个 promise 同时执行

[查看 demo](https://gaofanghuang.github.io/demo/api/promise/demo3)

### 4. Promise 和 this 指向

[查看 demo](https://gaofanghuang.github.io/demo/api/promise/demo5)

## 常见错误

### 1. Uncaught (in promise) 报错

promise 上必须加上 `.catch((e) => {})`。 如果使用 async/await, 则需要使用 `try {...} catch {...}`

```
// promise 错误写法
new Promise((resolve, reject) => {
    const res = {
      // 返回 0 或 1
      code
    }
    if (res.code) {
      // 返回一个成功结果
      resolve('[code is 1]')
    } else {
      // 返回一个失败结果
      reject('[code is not 1]')
    }
})

// async/await 错误写法
const doAsync2 = async () => {
  console.log('执行 async 方法2', new Date().getTime())
  const res = await todoSth()
  console.log('成功2', res, new Date().getTime())
}

// promise 正确写法
new Promise((resolve, reject) => {
    const res = {
      // 返回 0 或 1
      code
    }
    if (res.code) {
      // 返回一个成功结果
      resolve('[code is 1]')
    } else {
      // 返回一个失败结果
      reject('[code is not 1]')
    }
}).catch(err => {
    console.log(err)
})

// async/await 正确写法
const doAsync = async () => {
  console.log('执行 async 方法', new Date().getTime())
  try {
    const res = await todoSth()
    console.log('成功', res, new Date().getTime())
  } catch (err) {
    console.log('失败', err, new Date().getTime())
  }
}
```

### 2. 重复的 catch，一个 promise 只需要一个 catch

当同一个 promise 上 then 里调用了 err 和 链式调用了 catch 时，错误只会在 err 中被捕获， catch 中的代码是不会被执行的。

如果 一个 promise 里 还有嵌套 promise, 那么只需要在最外层的 promise 加上 catch。

```
// 正确写法

// 写法1
todoSth()
  .then(res => {
      console.log('成功', res)
    })
    .catch(err => {
      console.log('失败', err)
    })

// 写法二
todoSth().then(
    res => {
      console.log('成功', res)
    },
    err => {
      console.log('失败', err)
    }
  )

// 错误写法
todoSth().then(
    res => {
      console.log('成功', res)
    },
    err => {
      console.log('失败', err)
    }
  ).catch(err => {
    console.log('失败2', err)
  })
```

### 3. then 和 catch 执行顺序问题

当 catch 写在 then 前时，then 中的代码也会被执行，但是 `res = undefined`。因此，catch 应该写在链式调用的最后部分。

多个 then 时，前面 then 报错会阻塞后面 then 中代码的执行。

```
// 错误写法
todoSth().catch(err => {
    console.log('失败', err)
  }).then(
    res => {
      console.log('成功', res)
    }
  )

// 正确写法
todoSth().then(
    res => {
      console.log('成功', res)
    }
  ).catch(err => {
    console.log('失败', err)
  })
```
