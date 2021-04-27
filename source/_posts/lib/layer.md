---
title: LayUI -- Layer & LayDate 应用总结
date: 2020-06-04 10:30:00
update: 2021-04-27 14:48:00
tags:
  - Layer
  - Javascript Lib
  - jQuery Lib
  - 待填坑
categories: 工具库笔记
---

## 简介

Layer.js 是基于 JQuery 的一款 UI 插件，是专用于 Web 的弹出层组件。

官网地址：[https://layer.layui.com/](https://layer.layui.com/)

LayDate.js 是基于 JQuery 的一款 UI 插件，是专用于 Web 的日期与时间组件。

官网地址：[https://www.layui.com/laydate/](https://www.layui.com/laydate/)

## Layer 使用方法

### Alert

<!-- 弹出基础 Alert -->

```html
<button class="btn btn-test" onclick="testBaseAlert()">弹出基础 Alert</button>
```

```javascript
function testBaseAlert() {
  layer.alert("弹出基础Alert");
}
```

<button class="btn btn-test" onclick="testBaseAlert()">弹出基础 Alert</button>

<!-- 弹出带回调的 Alert -->

```html
<button class="btn btn-test" onclick="testBackAlert()">
  弹出带回调的 Alert
</button>
```

```javascript
function testBackAlert() {
  layer.alert("弹出回调Alert", function (index) {
    console.log("弹出回调Alert", index);
    layer.close(index);
  });
}
```

<button class="btn btn-test" onclick="testBackAlert()">弹出带回调的 Alert</button>

<!-- 弹出自定义 Alert -->

```html
<button class="btn btn-test" onclick="testDiyAlert()">弹出自定义 Alert</button>
```

```javascript
function testDiyAlert() {
  layer.alert("弹出自定义Alert", {
    // 右上角关闭按钮的另外一种样式
    closeBtn: 2,
    cancel: function (index, layero) {
      // 点右上角关闭按钮时触发
      if (confirm("确定要关闭么")) {
        // 只有当点击confirm框的确定时，该层才会关闭
        layer.close(index);
      }
      return false;
    },
  });
}
```

<button class="btn btn-test" onclick="testDiyAlert()">弹出自定义 Alert</button>

### Confirm

<!-- 弹出基础 Confirm -->

```html
<button class="btn btn-test" onclick="testBaseConfirm()">
  弹出基础 Confirm
</button>
```

```javascript
function testBaseConfirm() {
  layer.confirm(
    "是否确认删除？",
    {
      btn: ["确认", "取消"], //按钮
    },
    function () {
      layer.msg("删除成功");
    },
    function () {
      layer.msg("取消删除");
    }
  );
}
```

<button class="btn btn-test" onclick="testBaseConfirm()">弹出基础 Confirm</button>

### Loading

```javascript
var loading = layer.load();
// 关闭loading
layer.close(loading);
// 强制关闭所有弹框
layer.closeAll();
```

### Tips

```javascript
layer.msg("删除成功");
```

### Iframe

```javascript
function testBaseIframe() {
  layer.open({
    type: 2,
    title: "layer mobile页",
    shadeClose: true,
    shade: 0.8,
    area: ["380px", "90%"],
    // iframe的url, 这里可以写本地地址，也可以写网络地址
    // content: "//huanggaofang.com/",
    content: "../common/selectUser.html",
  });
}
```

<button class="btn btn-test" onclick="testBaseIframe()">弹出指定网页 Iframe</button>

## LayDate 使用方法

```javascript
laydate.render({
  // 指定元素
  elem: "#testBaseDate",
  // 日期格式
  format: "yyyy年MM月dd日",
  // 默认值
  value: "2018-08-18",
});
```

<input class="input-control" id="testBaseDate" placeholder="请选择日期" />

<!-- extra__start -->

<script src="https://cdn.bootcdn.net/ajax/libs/layui/2.6.4/layui.min.js"></script>
<script>
  const layer = layui.layer;
  function testBaseAlert() {
    layer.alert('弹出基础Alert')
  }
  function testBackAlert() {
    layer.alert("弹出回调Alert", function(index) {
      console.log('弹出回调Alert', index)
      layer.close(index);
    });
  }
  function testDiyAlert() {
    layer.alert("弹出自定义Alert", {
      // 右上角关闭按钮的另外一种样式
      closeBtn: 2,
      cancel: function(index, layero){ 
        // 点右上角关闭按钮时触发
        if(confirm('确定要关闭么')){
          // 只有当点击confirm框的确定时，该层才会关闭
          layer.close(index)
        }
        return false; 
      } 
    });
  }
  function testBaseConfirm() {
    layer.confirm(
      "是否确认删除？",
      {
        btn: ["确认", "取消"], //按钮
      },
      function () {
        layer.msg("删除成功");
      },
      function () {
        layer.msg("取消删除");
      }
    );
  }
  function testBaseIframe() {
    layer.open({
      type: 2,
      title: "指定iframe",
      shadeClose: true,
      shade: 0.8,
      area: ["375px", "90%"],
      // iframe的url, 这里可以写本地地址，也可以写网络地址
      content: "//huanggaofang.com/",
    });
  }
  const laydate = layui.laydate;
  laydate.render({
    // 指定元素
    elem: '#testBaseDate',
    // 日期格式
    format: 'yyyy年MM月dd月',
    // 默认值
     value: '2021年08月18月'
  });
</script>

<!-- extra__end -->
