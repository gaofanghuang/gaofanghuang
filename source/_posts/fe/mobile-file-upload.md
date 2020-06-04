---
title: 移动端图片/文件上传
date: 2020-04-09 14:53:19
update: 2020-05-15 14:20:00
tags:
  - Javascript
  - HTML5
  - 文件上传
  - 图片上传
  - 移动端
categories: 前端笔记
---

## 原理

html 中使用 `input` 标签获得访问本地文件的能力，选择本地图片后，把 input 中的 `File` 对象转换成后端需要的数据格式。

[查看DEMO](https://gaofanghuang.github.io/demo/api/file-upload/demo1)

## input type="file"

选择本地图片需要使用 `<input type="file">`。附加属性 `accept`, `capture`, `files`, `multiple`。

**Tips**:

1. 当选择了多个文件时，value 的值是选择的第一个文件，其他文件使用 `HTMLInputElement.files` 访问。

2. 如果没有选择文件，该值为空字符串 ""。

3. 为了阻止恶意软件猜测文件路径，字符串以 `C:\fakepath\` 为前缀。

<!--more-->

### 1. accept 属性

accept 表明了服务器端可接受的文件类型，可以限制你手机选择相关的文件，如果限制多个，可以用逗号分割。

例：

```html
<input accept="image/*,.pdf" type="file" />
```

一个以英文句号（"."）开头的合法的不区分大小写的文件名扩展名。例如： .jpg，.pdf 或 .doc。

例：

```html
<input accept=".jpg,.dpc" type="file" />
```

一个不带扩展名的 MIME 类型字符串。

- 字符串 `audio/*`， 表示“任何音频文件”。

- 字符串 `video/*`，表示 “任何视频文件”。

- 字符串 `image/*`，表示 “任何图片文件”。

例：

```html
<input accept="image/*,audio/*" type="file" />
```

### 2. capture 属性

capture 接受一个字符串（旧版是布尔值）

**新版**：

- `user` 使用前置摄像头

- `environment` 使用后置摄像头

**旧版**：

- `true` 打开摄像头

- `false` 打开相册

### 3. files 属性

`FileList` 对象每个已选择的文件。如果 `multiple` 属性没有指定，则这个列表只有一个成员。

用户所选择的文件都存储在了一个 FileList 对象上，其中每个文件都对应了一个 `File` 对象。

File 对象负责处理那些以文件形式存在的二进制数据，也就是操作本地文件。

**注意**，File对象也是一个Blob对象。

- File 对象的*获取方式*有两种：

  1. 通过 HTML 中的 `<input type="file">` 元素

  2. 通过拖拽来选择本地文件

  3. ~~mozGetAsFile()，只能火狐浏览器使用~~

- File 对象提供了三个*属性*，包含了文件的有用信息：

  1. `name` 文件名称，只读字符串。只包含文件名，不包含任何路径信息。

  2. `size` 以字节数为单位的文件大小，只读的 64 位整数。

  3. `type` 文件的 MIME 类型，只读字符串，当类型不能确定时为 ""。

### 4. multiple 属性

当指定布尔类型属性 multiple 为 `true`, 则文件 input 允许用户选择多个文件。为 `false`, 则为只能选择单个文件。

### 5. change 事件

大多数情况下选择文件，会使用 `change` 事件来监听。

例：

```javascript
let upload = document.getElementById('upload')
upload.addEventListener(
  'change',
  function () {
    let file = upload.files[0]
    alert(file.size)
  },
  false
)
```

或

```html
<input accept="image/*" type="file" onchange="chooseFile()" />
```

## FileReader 对象

FileReader 对象允许 Web 应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容，使用 File 或 Blob 对象指定要读取的文件或数据。

**注意**： FileReader 仅用于以安全的方式从用户*远程*系统读取文件内容 它不能用于从文件系统中按路径名简单地读取文件。 要在 JavaScript 中按路径名读取文件，应使用标准 Ajax 解决方案进行服务器端文件读取，如果读取跨域，则使用 CORS 权限。

### 1. 属性

- `readyState`：类型为unsigned short，FileReader实例的当前状态，（EMPTY——0，还没有加载任何数据；LOADING——1，数据正在加载；DONE——2，已完成全部的读取请求），只读。

- `result`：读取到的文件内容，只读。

- `error`：类型为DOMError，表示在读取文件时发生的错误，只读。

### 2. 事件处理

- `FileReader.onabort` 处理 abort 事件。该事件在读取操作被中断时触发。

- `FileReader.onerror` 处理 error 事件。该事件在读取操作发生错误时触发。

- `FileReader.onload` 处理 load 事件。该事件在读取操作完成时触发。

- `FileReader.onloadstart` 处理 loadstart 事件。该事件在读取操作开始时触发。

- `FileReader.onloadend` 处理 loadend 事件。该事件在读取操作结束时（要么成功，要么失败）触发。

- `FileReader.onprogress` 处理 progress 事件。该事件在读取 Blob 时触发。

### 3. 方法

- `FileReader.abort()` 中止读取操作。在返回时，readyState 属性为 DONE。

- `FileReader.readAsArrayBuffer()` 开始读取指定的 Blob 中的内容，一旦完成，result 属性中保存的将是被读取文件的 ArrayBuffer 数据对象.

- `FileReader.readAsDataURL()` 开始读取指定的 Blob 中的内容。一旦完成，result 属性中将包含一个 data: URL 格式的 Base64 字符串以表示所读取文件的内容。

- `FileReader.readAsText()` 开始读取指定的 Blob 中的内容。一旦完成，result 属性中将包含一个字符串以表示所读取的文件内容。

例：

```javascript
let reader = new FileReader()
reader.readAsDataURL(file)
reader.onload = function (e) {
  console.log(e, this.result)
}
```

## 数据格式

### 1. URL 对象

URL 接口是一个包含若干静态方法的对象，用来创建 URLs。

当我们通过input提交了一个图片时，可以使用`URL.createObjectURL`获取图片地址。

#### 1.1 静态方法

- `URL.createObjectURL(obj)` 返回一个 DOMString ，包含一个唯一的 blob 链接（该链接协议为以 blob:，后跟唯一标识浏览器中的对象的掩码）。

  obj: File、Blob、MediaSource

- `URL.revokeObjectURL()` 销毁之前使用 URL.createObjectURL() 方法创建的 URL 实例。

例：

```javascript
let url = URL.createObjectURL(file)
let img = new Image()
img.src = url
img.onload = function (e) {
  // 销毁
  window.URL.revokeObjectURL(this.src)
}
console.log(url)
```

#### 1.2 注意事项

1. 移动端兼容性

  在移动端需要做个兼容性判断。`window.URL = window.URL || window.webkitURL`

2. 内存管理

  当不再需要这些 URL 对象时，每个对象必须通过调用 `URL.revokeObjectURL()` 方法来释放。

  浏览器在 document 卸载的时候，会自动释放它们，但是为了获得最佳性能和内存使用状况，你应该在安全的时机主动释放掉它们。

### 2. Blob 对象

> Blob 对象表示一个不可变、原始数据的类文件对象。

File 接口基于 Blob，继承了 Blob 的功能，并且扩展支持了用户计算机上的本地文件。

**语法**：

返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。

`Blob(blobParts[, options])`

**方法**：

- `Blob.slice([start[, end[, contentType]]])` 返回一个新的 Blob 对象，包含了源 Blob 对象中指定范围内的数据。

- `Blob.stream()` 返回一个能读取 blob 内容的 ReadableStream。

- `Blob.text()` 返回一个 promise 且包含 blob 所有内容的 UTF-8 格式的 USVString。

- `Blob.arrayBuffer()` 返回一个 promise 且包含 blob 所有内容的二进制格式的 ArrayBuffer 

**读取 Blob 的方法**：


#### 2.1 创建 Blob 对象的 4 种方法

1. 调用 Blob 构造函数

  ```javascript
  var debug = {hello: "world"};
  var blob = new Blob([JSON.stringify(debug, null, 2)], {type : 'application/json'});
  ```

2. 使用一个已有 Blob 对象上的 `slice()` 方法切出另一个 Blob 对象

3. 调用 canvas 对象上的 toBlob 方法

4. ~~过气的方法，通过 BlobBuilder 接口创建，但兼容性不好，并且现有的 BlobBuilder 实现都是带前缀的~~

#### 2.2 读取 Blob 对象

使用 FileReader 可以读取 Blob 对象中的内容。

```javascript
var reader = new FileReader();
reader.readAsArrayBuffer(blob);
reader.addEventListener("loadend", function() {
   //reader.result 就是内容
   console.log(reader.result)
});
```

#### 2.3 Object URLs

Object URLs 指的是以 `blob:` 开头的地址，可以用来展示图片、文本信息。

这里就有点类似 base64 图片的展示，所以我们同样可以用来预览图片。

把选中的图片转为 Object URLs 形式:

```javascript
function handleFiles(files) {
  if (!files.length) {
    fileList.innerHTML = "<p>No file!</p>";
  } else {
    fileList.innerHTML = "";
    var list = document.createElement("ul");
    fileList.appendChild(list);
    for (var i = 0; i < files.length; i++) {
      var li = document.createElement("li");
      list.appendChild(li);
      
      var img = document.createElement("img");
      // 从文件中创建object url
      img.src = window.URL.createObjectURL(files[i]);
      img.height = 60;
      img.onload = function() {
        // 加载完成后记得释放object url
        window.URL.revokeObjectURL(this.src);
      }
      li.appendChild(img);
      var info = document.createElement("span");
      info.innerHTML = files[i].name + ": " + files[i].size + " bytes";
      li.appendChild(info);
    }
  }
}
```

### 3. Typed Arrays 类型化数组

类型化数组是一种类似数组的对象，提供了*访问原始二进制数据*的功能。但是类型化数组和正常数组并不是一类的，`Array.isArray()` 调用会返回 `false`。

Typed Arrays 有两块内容：

1. 缓冲(ArrayBuffer)

2. 视图(TypedArray 和 DataView)

#### 3.1 ArrayBuffer

ArrayBuffer 对象用来表示*通用的、固定长度的*原始二进制数据缓冲区。

ArrayBuffer 不能直接操作，而是要通过 TypedArray 或 DataView 对象来操作，它们会将缓冲区中的数据表示为特定的格式，并通过这些格式来读写缓冲区的内容。

ArrayBuffer 主要用来高效快速的访问二进制数据，比如 `WebGL`, `Canvas 2D` 或者 `Web Audio` 所使用的数据。

**语法**：

一个指定大小的 ArrayBuffer 对象，其内容被初始化为 0。

`new ArrayBuffer(length)`

- *length* 

  要创建的 ArrayBuffer 的大小，单位为字节。

**方法**:

`ArrayBuffer.isView(arg)`

用来判断传入的参数值是否是一种 ArrayBuffer 视图（view），比如类型化数组对象（typed array objects）或者数据视图（ DataView）。

#### 3.2 TypedArray

TypedArray 可以在 ArrayBuffer 对象之上，根据不同的数据类型建立视图。

```javascript
// 创建一个8字节的ArrayBuffer
const b = new ArrayBuffer(8);

// 创建一个指向b的Int32视图，开始于字节0，直到缓冲区的末尾
const v1 = new Int32Array(b);

// 创建一个指向b的Uint8视图，开始于字节2，直到缓冲区的末尾
const v2 = new Uint8Array(b, 2);

// 创建一个指向b的Int16视图，开始于字节2，长度为2
const v3 = new Int16Array(b, 2, 2);
```

Int32Array, Uint8Array 之类指的就是 TypedArray，TypedArray 对象描述的是底层二进制数据缓存区的一个类似数组 (array-like) 的视图。

#### 3.3 DataView

如果一段数据包含多种类型，我们还可以使用`DataView 视图`进行操作。

```javascript
var buffer = new ArrayBuffer(14)
var view = new DataView(buffer)

view.setUint8(0, 66)     // 写入1字节: 'B'
view.setUint8(1, 67)     // 写入1字节: 'M'
view.setUint32(2, 1234)  // 写入4字节的大小: 1234
view.setUint16(6, 0)     // 写入2字节保留位
view.setUint16(8, 0)     // 写入2字节保留位
view.setUint32(10, 0)    // 写入4字节偏移量
```

## 数据格式总结

### 1. File 和 Blob 的关系

从 `input onchange` 中返回的图片对象其实就是一个`File`对象。

而`Blob`对象是一个用来包装二进制文件的容器，`File`继承于`Blob`。

`FileReader`是用来读取内存中的文件的`API`，支持`File`和`Blob`两种格式。

### 2. Blob Url 和 Data URLs 的区别

即 `URL.createObjectURL` 对比 `FileReader.readAsDataURL`

*相同*：
  
- 都能获取图片地址

  1. 通过 `URL.createObjectURL(blob)` 可以获取当前文件的一个内存URL

  2. 通过 `FileReader.readAsDataURL(file)` 可以获取一段data:base64的字符串

- 兼容性

  都支持从 IE10 往上的所有现代浏览器

*不同*：
  
  - 执行时机:

    1. createObjectURL 是同步执行（立即的）

    2. FileReader.readAsDataURL 是异步执行（过一段时间）

  - 内存使用

    1. createObjectURL 返回一段带 hash 的 url，并且一直存储在内存中，直到 document 触发了 unload 事件（例如：document close）或者执行 revokeObjectURL 来释放。
    
    2. FileReader.readAsDataURL 则返回包含很多字符的 base64，并会比 blob url 消耗更多内存，但是在不用的时候会自动从内存中清除（通过垃圾回收机制）

**根据情况使用**：

1. 使用`createObjectURL`可以节省性能并更快速，只不过需要在不使用的情况下手动释放内存
  
2. 如果不太在意设备性能问题，并想获取图片的base64，则推荐使用`FileReader.readAsDataURL`

### 3. 数据转换

1. Canvas 转换为 DataURL

  ```javascript
  // 转为png图片
  let dataurl = canvas.toDataURL('image/png');

  // 转为jpg图片，并压缩20%的图片质量
  let dataurl2 = canvas.toDataURL('image/jpeg', 0.8);
  ```

2. File 对象转换为 DataURL、Blob 对象转换为 DataURL

  ```javascript
  function readBlobAsDataURL(blob, callback) {
    let a = new FileReader();
    a.onload = function(e) {callback(e.target.result);};
    a.readAsDataURL(blob);
  }
  // file 对象属于 blob 对象
  readBlobAsDataURL(blob, function (dataurl){
    console.log(dataurl);
  });
  readBlobAsDataURL(file, function (dataurl){
    console.log(dataurl);
  });
  ```

3. DataURL 转换为 Blob 对象、DataURL 转换为 File 对象

  File继承于Blob，扩展了一些属性（文件名、修改时间、路径等）。绝大多数场景下，使用Blob对象就可以了。 

  ```javascript
  function dataURLtoBlob(dataurl) {
    let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1]
    let bstr = atob(arr[1])
    let n = bstr.length
    let u8arr = new Uint8Array(n)
    while(n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new Blob([u8arr], {type:mime})
  }
  function dataURLtoFile(dataurl, filename) {
    let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1]
    let bstr = atob(arr[1])
    let n = bstr.length
    let u8arr = new Uint8Array(n)
    while(n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], filename, {type:mime})
  }
  var blob = dataURLtoBlob('data:text/plain;base64,YWFhYWFhYQ==')
  var file = dataURLtoFile('data:text/plain;base64,YWFhYWFhYQ==', 'test.txt')
  ```

4. DataURL 图片数据绘制到 Canvas

  先构造 Image 对象，src 为 DataURL，图片 onload 之后绘制到 Canvas

  ```javascript
  let img = new Image()
  img.src = dataurl
  img.onload = function(){
    canvas.drawImage(img)
  }
  ```

5. File, Blob 的图片文件数据绘制到 Canvas

  先转换成一个 url，然后构造 Image 对象，src 为 DataURL，图片 onload 之后绘制到 Canvas, 利用上面的 readBlobAsDataURL 函数，由 File,Blob 对象得到 DataURL 格式的 url, 构造 Image 对象，src 为 DataURL，图片 onload 之后绘制到 Canvas

  ```javascript
  readBlobAsDataURL(file, function (dataurl){
    var img = new Image()
    img.onload = function(){
        canvas.drawImage(img)
    }
    img.src = dataurl
  });
  ```

6. Canvas转换为Blob对象并使用Ajax发送

  先从 Canvas 获取 DataURL, 再将 DataURL 转换为Blob对象

  ```javascript
  let dataurl = canvas.toDataURL('image/png')
  let blob = dataURLtoBlob(dataurl)
  // 使用ajax发送
  let fd = new FormData()
  fd.append("image", blob, "image.png")
  let xhr = new XMLHttpRequest()
  xhr.open('POST', '/server', true)
  xhr.send(fd)
  ```

## 传输数据流

文件上传一般有 2 种方式:

1. 将图片转化为 `base64`，使用 _Json_ 上传

2. 将图片数据转为 `Blob 对象`，使用 _FormData_ 上传文件

### 1. FormData

FormData 对象的字段类型可以是 Blob，File，或者 string，如果它的字段类型不是 Blob 也不是 File，则会被转换成字符串。

利用 FormData 对象，可以使用键值对来模拟一个完整的表单，然后使用 XMLHttpRequest 发送这个"表单"。

**FormData** 的优势:

1. 可以通过 `XMLHttpRequest.send()` 来异步提交二进制文件。

2. 可以通过Blob的slice来扩展分片上传功能。

例：

```javascript
let formData = new FormData()
// 普通键值对
formData.append('name', 'value')
// 传递一个blob对象
formData.append('blob', blob)
// 传递一个file对象
formData.append('file', file)
// 如果有多个文件，可以追加到同一个字段中
fileInputElement.files.forEach(file => {
  formData.append('images', file);
})
let oReq = new XMLHttpRequest()
oReq.open('POST', 'http://xx.com')
oReq.send(formData)
```

### 2. Base64

Base64 是一组相似的二进制到文本（binary-to-text）的编码规则，使得二进制数据在解释成 radix-64 的表现形式后能够用 ASCII 字符串的格式表示出来。Base64 这个词出自一种 MIME 数据传输编码。 

在 JavaScript 中，有两个函数被分别用来处理解码和编码 base64 字符串：

- `atob()` 解码通过base-64编码的字符串数据

- `btoa()` 从二进制数据“字符串”创建一个base-64编码的ASCII字符串

## 进阶

### 1. 上传进度条

进度条事件使用**progressEvent对象**来实现。

- `ProgressEvent.lengthComputable` 只读
是一个 Boolean 标志，表示底层流程将需要完成的总工作量和已经完成的工作量是否可以计算。换句话说，它告诉我们进度是否可以被测量。

- `ProgressEvent.loaded` 只读
是一个 unsigned long long 类型数据，表示底层流程已经执行的工作总量。可以用这个属性和 ProgressEvent.total 计算工作完成比例。当使用 HTTP 下载资源，它只表示内容本身的部分，不包括首部和其它开销。

- `ProgressEvent.total` 只读
是一个 unsigned long long 类型数据，表示正在执行的底层流程的工作总量。当使用 HTTP 下载资源，它只表示内容本身的部分，不包括首部和其它开销。

即我们通过loaded/total可以得到当前进度的百分比。

例：

```javascript
let progressBar = document.getElementById("p"),
    client = new XMLHttpRequest()
    client.open("GET", "xxx/xxx")
client.onprogress = function(e) {
    if (e.lengthComputable) {
      let total = e.total;
      let loaded = e.loaded;
      let percentage = Math.floor(total/loaded);
      progressBar.style.width = `${percentage}%`
    }
  }
client.send()
```

### 2. 多图上传

```html
<input type="file" accept="image/*" multiple />
```

多图上传，这里一般的处理步骤：

1. 获得图片列表

2. 处理图片，每处理完成一个图片即提交到后端服务器，后端返回一个服务端图片地址

3. 把返回的服务端图片地址的数组提交到服务器

### 3. 拖拽上传

在移动端中很少使用拖拽上传的交互方式，一般桌面端才会做这个事件处理。

拖拽上传的三个相关事件：

- `dragenter` 当拖动的元素或被选择的文本进入有效的放置目标时

- `dragover` 当元素或者选择的文本被拖拽到一个有效的放置目标上时(每几百毫秒触发一次)

- `drop` 当一个元素或是选中的文字被拖拽释放到一个有效的释放目标位置时

### 4. 本地预览

1. 图片上传后使用 FileReader 将文件读取成 base64

2. 预览的img标签使用绝对定位，然后把这个img的src值设置为获得的base64字符串

这里用base64预览会有一个问题，就是当图片过大时，生成的base64字符串也会非常大，所以把预览的img标签使用绝对定位，使得这个img脱离文档流，当页面重绘时reflow，就不会过渡消耗性能了。

这里第1步也可以使用`window.URL.createObjectURL()`生成数据链接。完成预览后需要使用`window.URL.revokeObjectURL()`释放内存。

### 5. 拍照上传

使用拍照上传图片

```html
<!-- 调用系统录制功能 -->
<input type="file" accept="video/*" capture />

<!-- 调用系统相机 -->
<input type="file" accept="image/*" capture />

<!-- 调用前置摄像头 -->
<input type="file" accept="image/*" capture="user" />

<!-- 调用后置摄像头 -->
<input type="file" accept="image/*" capture="environment" />
```

### 6. 图片旋转

使用相机拍照在 IOS 中会有一个问题，当手机是竖着拍的，图片上传后会被逆时针90°旋转。这是因为从相机拍照获取的图片的EXIF（Exchangeable image file format）会默认设置一个orientation tag。注意，目前只有`jpeg`格式的图片会有这个问题。

#### 步骤：

1. 获取图片的orientation

  可以使用 `exif` 这个 js 库来解决这个问题。

  `exif`: 获取相片的属性，比如曝光度、拍照方向、GPS 等。

  ```javascript
  import EXIF from 'exif'
  ```

2. 根据图片的orientation做对应的旋转

  ```javascript
  switch (orientation) {
   case 2:
     // horizontal flip
     ctx.translate(width, 0);
     ctx.scale(-1, 1);
     break;
   case 3:
     // 180 rotate left
     ctx.translate(width, height);
     ctx.rotate(Math.PI);
     break;
   case 4:
     // vertical flip
     ctx.translate(0, height);
     ctx.scale(1, -1);
     break;
   case 5:
     // vertical flip + 90 rotate right
     ctx.rotate(0.5 * Math.PI);
     ctx.scale(1, -1);
     break;
   case 6:
     // 90 rotate right
     ctx.rotate(0.5 * Math.PI);
     ctx.translate(0, -height);
     break;
   case 7:
     // horizontal flip + 90 rotate right
     ctx.rotate(0.5 * Math.PI);
     ctx.translate(width, -height);
     ctx.scale(-1, 1);
     break;
   case 8:
     // 90 rotate left
     ctx.rotate(-0.5 * Math.PI);
     ctx.translate(-width, 0);
     break;
  ```

### 7. 压缩图片

图片过大会拖慢上传时间，并且后端一般情况下回限制上传文件的大小，因此在移动端上传文件时需要进行压缩。

#### 步骤

1. 压缩上传基本操作流程：

2. 图片上传后使用 FileReader 将文件读取成 base64

3. 创建 Image，设置 src 属性为图片 base64

4. 创建 canvas，绘制 Image，控制图片宽高

5. 调用 canvas 的 toDataURL 方法压缩，返回压缩后的 base64

6. 将 base64 转成 Blob 对象

7. 创建 FormData 对象，append Blob 对象，提交给服务端

### 8. 裁剪图片

可以使用 [cropper.js](https://fengyuanchen.github.io/cropperjs/) 这个库来裁剪图片。

## 常见问题

### 1. 键盘意外弹出

有部分手机在点击 input 的时候，会弹出键盘选择。

**解决办法**：用 `onfocus="this.blur()"`，来强制失去焦点。

例：

```html
<input type="file" id="upload" onfocus="this.blur()" />
```

### 2. 选择文件没响应

当选择过一次后，再次选择同一个文件，`change` 事件不会触发，因为 value 没有改变

**解决办法**：给 input 添加点击事件，点击后使 value 值为空字符串即可，`HTMLInputElement.value = ''`。

### 3. 获取不到type值

在安卓机器中，部分 4.x 的机型, 在 webview 里面对 file 对象进行了阉割，因此拿不到 file.type 的值。

**解决办法**：暂无。

### 4. onprogress只调用了一次

本地上传请求事件小于50ms
  
### 5. 浏览器不支持

**解决办法**：在上传图片之前先检测浏览器兼容性

```javascript
// 检测是否支持File API
if (window.File && window.FileReader && window.FileList && window.Blob) {
  //  支持
} else {
  alert('不支持');
}
```

### 6. 图片过大

图片的大小：如果图片的大小超过两百万像素，图片是无法绘制到 canvas 上的，调用 drawImage 的时候不会报错，但是你用 toDataURL 获取图片数据的时候获取到的是空的图片数据。

**解决方法**：瓦片绘制，也就是将图片分割成多块绘制到 canvas 上，代码里的实现是把图片分割成 100 万像素一块的大小，再绘制到 canvas 上。

canvas 的大小有限制，如果 canvas 的大小大于大概五百万像素（宽 \* 高）时，不仅图片画不出来，其他什么东西也都是画不出来的。

**解决方法**：对图片的宽高进行适当压缩。具体实现以上限四百万像素为基准，如果图片大于四百万像素就压缩到小于四百万像素。