---
title: javascript 富文本编辑器
date: 2020-05-14 14:00:00
update: 2020-05-15 14:20:00
tags:
  - javascript
  - 富文本编辑器
  - 待填坑
categories: 前端笔记
---

## 实现

[查看Demo 富文本编辑器](https://gaofanghuang.github.io/demo/nodus/editor)

### contenteditable

`contenteditable` 属性规定是否可编辑元素的内容。

```html
<div class="editor-box" contenteditable></div>
```

<!--more-->

### document.execCommand

`bool = document.execCommand(aCommandName, aShowDefaultUI, aValueArgument)`

具体参数查询MDN，[document.execCommand](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/execCommand)

### Window.getSelection()

返回一个 Selection 对象，表示用户选择的文本范围或光标的当前位置。

### 常见问题

1. 点击自定义 button, `document.execCommand` 不起作用

给自定义 button 加上样式 `user-select: none`

```css
.editor-tool-btn {
  user-select: none;
}
```

## 库

### Quill

https://quilljs.com/

### wangEditor

http://www.wangeditor.com/