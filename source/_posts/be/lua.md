---
title: Lua 入门
date: 2020-10-05 10:30:00
tags:
  - lau
categories: 后端笔记
---

## 1. Lua 是什么

一种嵌入式脚本语言，为应用程序提供灵活的扩展和定制功能。通常用于制作游戏 Mod。

### 1.1 安装调试

在 VsCode 上搭建 Lua 编译环境

1. 安装 MinGW

2. 安装 Lua 编译环境

  [LuaDist官方下载地址](http://luadist.org/)

3. 配置环境变量

  ![](/images/lua/lua-path1.jpg)

  ![](/images/lua/lua-path2.jpg)

4. Vscode 中 Lua 环境的配置

  插件：`Lua Debug`、`Code Runner`

  Code Runner 配置:

  勾选： 
  - ✔ Run In Terminal
  - ✔ Show Execution Message

  ![](/images/lua/runcode-config.jpg)

5. launch 配置

  运行 → 添加配置 → 选择 Lua Debug

  ![](/images/lua/launch.jpg)

  ```json
  // ...
  "configurations": [
    {
      // ...
      "program": "${workspaceFolder}",
      // ...
    }
  ]
  // ...
  ```

  6. 运行调试

  `ctrl + shift + d` 打开运行面板，点击右上角的 `Run File` 运行 或 `Debug File` 调试。

## 2. 语法

### 2.1 类型&值

Lua 是一种动态类型语言。Lua 没有类型定义，也就是说 Lua 的变量是没有类型的，只有值才有。

#### 2.1.1 基本类型

**8种基本类型**：`nil`，`boolean`，`number`，`string`，`function`，`userdata`，`thread` 和 `table`。

1. `nil`: 表示无效值，类似 javascript 中的 `null`。

2. `boolean`: `true` 或 `false`。`nil` 和 `false` 为假，任何其他值都是真。

3. `number`: 表示双精度类型的实浮点数。

4. `string`: 字符串。

5. `function`: 由 `Lua` 或 `C` 编写的函数。

6. `userdata`: 允许将任意 `C` 数据结构存储在 Lua 变量中。

7. `thread`: 表示执行的独立线路，用于执行协同程序。

8. `table`: 关联数组，可以使用除 nil 和 NaN 之外的任何 Lua 值对数组进行索引，最简单构造表达式是`{}`，用来创建一个空表。

**Tips**: 

- `nil` 作比较时应该加上双引号

- 数字 `0` 也是 `true`

- 当lua进行数学运算时，会尝试自动把值为数字类型为字符串的，转换为数字。

- 多行字符串用`[[]]`表示

- 字符串长度用 `#` 表示

- Lua 数组的初始索引，不是 *0*， 而是**1**。

### 2.2 注释

```lua
--这是单行注释--
print("这是单行注释");
--[[
 这是多行注释
 这是多行注释2
 --]]
print("这是多行注释");
```

### 2.3 标识符

1. Lua 区分大小写。

2. 最好不要使用下划线加大写字母的标示符，因为这是 Lua 的内部全局变量格式，容易造成混淆冲突。

3. Lua 不允许使用特殊字符如 @, $, 和 % 来定义标示符

例：

```lua
--正确的标识符--
abc apple red_moon hotDog dior999 _abc

--错误的标识符--
_ZOO d@w s$9 r%s
```

### 2.4 关键字

保留关键字不能作为常量或变量或其他用户自定义标示符：

|  |  |  |  |
| :--: | :--: | :--: | :--: |
| and | break | do | else |
| elseif | end |	false | for |
| function | if | in | local |
| nil | not | or | repeat |
| return | then | true | until |
| while | goto |

### 2.5 变量&全局变量

默认情况下，Lua 的变量是全局的，不需要刻意声明某个变量是全局变量。

当访问一个没有定义的变量时，不会报错，值为 nil。

想删除某个全局变量时，只需设置这个变量的值为 nil 即可。

