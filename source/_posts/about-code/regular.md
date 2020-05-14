---
title: 正则表达式
date: 2020-05-13 14:15:00
tags:
  - 正则表达式
  - 待填坑
categories: 前端笔记
---

正则表达式的基本组成元素可以分为：**字符**和**元字符**。

<!--more-->

## 语法

```javascript
const rule = /a/
console.log(rule.test('apple'))
```

正则表达式格式：`/rule/type`

**rule**: 正则表达式规则，写在两个`/`之间。

**type**: 修饰符，接受值为：`m`、`i`、`g`，type 可忽略

- m: 多行模式

- i: 忽略大小写

- g: 全局模式

### 在 js 中使用正则表达式

**exec()**: 返回值为一个数组，第一项是符合正则的内容，后续每项都对应正则表达式内捕获括号里匹配成功的文本。

如果匹配失败，`exec()` 方法返回 null，并将 lastIndex 重置为 0 。

```javascript
const rule = /quick\s(brown).+?(jumps)/gi
const str = 'The Quick Brown Fox Jumps Over The Lazy Dog'
console.log(rule.exec(str))
```

**test()**: 检查是否符合正则表达式

```javascript
const rule = /a/
const str = 'apple'
console.log(rule.test(str))
```

**match()**: 返回匹配正则的内容

```javascript
const rule = /The/g
const str = 'The Quick Brown Fox Jumps Over The Lazy Dog'
console.log(str.match(rule))
```

**matchAll()**: 返回匹配正则的所有内容

```javascript
const rule = /The/g
const str = 'The Quick Brown Fox Jumps Over The Lazy Dog'
const result = [...str.matchAll(rule)]
console.log(result[0], result[1])
```

**replace()**: 替换指定内容

```javascript
const rule = /a/g
const str = 'apple'
console.log(str.replace(rule, 'e'))
```

**search()**: 找到匹配正则的内容并返回下标

```javascript
const str = 'hey JudE'
const rule = /[A-Z]/g
console.log(str.search(rule))
```

**split**: 根据正则分割字符串，并返回数组

```javascript
const str = 'Harry Trump ;Fred Barney; Helen Rigby ; Bill Abel ;Chris Hand '
const rule = /\s*(?:;|$)\s*/
console.log(str.split(rule))
```

### 语义字符

`\`: 转义符

`|`: 管道符

### 单个字符

|  特殊字符  | 正则表达式 |
| :--------: | :--------: |
|   换行符   |     \n     |
|   换页符   |     \f     |
|   回车符   |     \r     |
|   空白符   |     \s     |
|   制表符   |     \t     |
| 垂直制表符 |     \v     |
|   回退符   |    [\b]    |

### 多个字符

|                    特殊字符                    | 正则表达式 |
| :--------------------------------------------: | :--------: |
|            除了换行符之外的任何字符            |     .      |
|                单个数字，[0-9]                 |     \d     |
|                   除了[0-9]                    |     \D     |
|     包括下划线在内的单个字符，[A-Za-z0-9_]     |     \w     |
|                   非单字字符                   |     \W     |
| 匹配空白字符，包括空格、制表符、换页符和换行符 |     \s     |
|                 匹配非空白字符                 |     \S     |
|                    单词边界                    |     \b     |
|                   非单词边界                   |     \B     |

### 字符组

`[abc]` 表示匹配 a、b、c 其中的一个

#### 范围表示法

用连字符`-`来省略和简写

例：

`[1-9]`: 表示 1 到 9 的数字，即 `[123456789]`

`[b-g]`: 表示 b 到 g 的字母，即 `[bcdefg]`

`[a-d3-7]`: 表示 a 到 d 的字母，以及 3 到 7 的数字，即 `[abcd34567]`

注意，当我们要匹配 a、-、z 这三者中任意一个字符时，不能写成 `[a-z]`，可写成以下方式：

`[-az]` 或 `[az-]` 或 `[a\-z]`

#### 排除字符组

`[^abc]`: 表示除 a、b、c 之外的任意一个字符。

#### 任意字符

`[\d\D]`、`[\w\W]`、`[\s\S]` 和 `[^]`

### 量词

`?`：匹配 1 个字符或 0 个字符，即 `1 || 0`

`*`：匹配 0 个字符或 无数 个字符，即 `>= 0`

`+`：匹配 1 个以上的字符，即 `>= 1`

`{x}`：x 次

`{min, max}`：介于 min 次到 max 次之间

`{min, }`：至少 min 次

`{0, max}`：至多 max 次

### 位置边界

在ES5中，共有6个锚字符：`^ $ \b \B (?=p) (?!p)`

1. `^`: 匹配开头，在多行匹配中匹配行开头。

  ```javascript
  const rule = /^|$/g
  const str = "hello"
  console.log(str.replace(rule, '#')); // #hello#
  ```

2. `$`: 匹配结尾，在多行匹配中匹配行结尾。

  ```javascript
  const rule = /^|$/gm
  const str = "I\nlove\njavascript"
  console.log(str.replace(rule, '#'));
  /*
    #I#
    #love#
    #javascript#
  */
  ```

3. `\b`: 单词边界

  ```javascript
  const rule = /\bcat\b/
  const str = `sdcatd cat catsfad`
  console.log(str.search(rule)) // 7
  ```

4. `\B`: 非单词边界

  ```javascript
  const rule = /\Bcat\B/
  const str = `sdcatd cat catsfad`
  console.log(str.search(rule)) // 2
  ```

5. `(?=p)`: 其中 p 是一个子模式，表示 p 前面的位置。

  ```javascript
  const rule = /(?=f)/g
  const str = `sdcatd cat catsfad`
  console.log(str.replace(rule, '#')); // sdcatd cat cats#fad
  ```

6. `(?!p)`: 其中 p 是一个子模式，表示 p 反面的位置。即除了 p 前面的所有位置。 

  ```javascript
  const rule = /(?!f)/g
  const str = `sdcatd cat catsfad`
  console.log(str.replace(rule, '#')); // #s#d#c#a#t#d# #c#a#t# #c#a#t#sf#a#d#
  ```

## 匹配

### 横向模糊匹配

横向模糊指的是，一个正则可匹配的字符串的长度不是固定的，可以是多种情况的。

其实现的方式是使用量词。譬如`{m,n}`，表示连续出现最少 m 次，最多 n 次。

```javascript
const rule = /ab{2,5}c/g
const str = 'abc abbc abbbc abbbbc abbbbbc abbbbbbc'
console.log(str.match(rule)) // ["abbc", "abbbc", "abbbbc", "abbbbbc"]
```

### 纵向模糊匹配

纵向模糊指的是，一个正则匹配的字符串，具体到某一位字符时，它可以不是某个确定的字符，可以有多种可能。

```javascript
const rule = /a[123]b/g
const str = 'a0b a1b a2b a3b a4b'
console.log(str.match(rule)) // ["a1b", "a2b", "a3b"]
```

### 贪婪匹配

即匹配所有的符合项。

```javascript
const rule = /\d{2,5}/g;
const str = "123 1234 12345 123456 1234567 12345678";
console.log(str.match(rule)); // ["123", "1234", "12345", "12345", "12345", "67", "12345", "678"]
```

### 惰性匹配

当匹配项达到最小次数时，不再往下匹配。

在量词后面加个`?`就能实现惰性匹配。

```
{m,n}?
{m,}?
??
+?
*?
```

```javascript
const rule = /\d{2,5}?/g;
const str = "123 1234 12345 123456 1234567 12345678";
console.log(str.match(rule)); // ["12", "12", "34", "12", "34", "12", "34", "56", "12", "34", "56", "12", "34", "56", "78"]
```

### 多选分支

用 `|`（管道符）分隔，表示其中任何之一。

```javascript
const rule = /good|nice/g;
const str = "good idea, nice try.";
console.log(str.match(rule)); // ["good", "nice"]
```

用 `|` 和 `[]` 的区别，`|` 可以表示多个单词的其中之一，`[]` 只能表示多个字符的其中之一。

注意，多选分子也是有惰性的，当满足 `|` 的匹配时，就不再往下匹配了。

## 回溯

深度优先搜索算法：其中退到之前的某一步这一过程，我们称为“回溯”。

尝试匹配失败时，接下来的一步通常就是回溯。

### 没有回溯的匹配

### 有回溯的匹配

### 常见的回溯形式

## 常用正则

### 1. 匹配16进制颜色值

表示一个16进制字符，可以用字符组 `[0-9a-fA-F]`。

其中字符可以出现3或6次，需要是用量词和分支结构。

使用分支结构时，需要注意顺序。

```javascript
const rule = /#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})/g;
const str = "#ffbbad #Fc01DF #FFF #ffE #99";
console.log(str.match(rule)); // ["#ffbbad", "#Fc01DF", "#FFF", "#ffE"]
```

### 2. 匹配24小时制时间

如：“23:05, 09:30”

共4位数字，第一位数字可以为`[0-2]`。

当第1位为2时，第2位可以为`[0-3]`，其他情况时，第2位为`[0-9]`。

第3位数字为`[0-5]`，第4位为`[0-9]`。

```javascript
const rule = /^(0?[01][0-9]|[2][0-3]):(0?[0-9]|[0-5][0-9])$/;
console.log(rule.test("22:50"), rule.test("25:70"), rule.test("5:7")); // true, false, true
```

### 3. 年月日

#### 3.1 检测日期格式

如：“2020-05-14”

年，四位数字即可，可用[0-9]{4}。

月，共12个月，分两种情况01、02、……、09和10、11、12，可用(0[1-9]|1[0-2])。

日，最大31天，可用(0[1-9]|[12][0-9]|3[01])。

```javascript
const rule = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
console.log(rule.test("2020-05-14"), rule.test("2020-13-44")); // true, false
```

#### 3.2 提取日期数值

```javascript
const rule = /(\d{4})-(\d{2})-(\d{2})/;
const str = "2020-05-14"
const result = {
  yyyy: str.match(rule)[1],
  mm: str.match(rule)[2],
  dd: str.match(rule)[3]
}
console.log(result); // {yyyy: "2020", mm: "05", dd: "14"}
```

#### 3.3 转换格式

```javascript
const rule = /(\d{4})-(\d{2})-(\d{2})/;
const str = "2020-05-14"
console.log(str.replace(rule, "$1年$2月$3日")); // 2020年05月14日
```


### 4. 数字的千分位分隔符表示法

```javascript
const rule = /(?!\b)(?=(\d{3})+\b)/g;
const str = "489798266114";
console.log(str.replace(rule, ',')); // 489,798,266,114
```

### 5. 验证密码

要求：密码长度6-12位，由数字、小写字母和大写字母组成，必须至少包括2种字符。

```javascript
// 在实际应用中，需要避免正则过于复杂，可以拆分成几个小的正则，以便阅读
// const regex1 = /^[0-9A-Za-z]{6,12}$/;
// const regex2 = /^[0-9]{6,12}$/;
// const regex3 = /^[A-Z]{6,12}$/;
// const regex4 = /^[a-z]{6,12}$/;
const rule = /(?=.*[0-9])(?=.*[a-z])^[0-9A-Za-z]{6,12}$/;
const str = "66114aaw";
console.log(rule.test(str)); // true
```