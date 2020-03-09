---
title: Canvas
date: 2020-03-09 15:08:14
tags:
  - Canvas
  - Html
  - Javascript
categories: 前端笔记
---

## 概念

canvas 元素可被用来通过 JavaScript（Canvas API 或 WebGL API）绘制图形及图形动画。

## 属性

**width**：该元素占用空间的宽度，以 CSS 像素（px）表示，默认为 300。

**height**：该元素占用空间的高度，以 CSS 像素（px）表示，默认为 150。

### Canvas 和 SVG 的区别是什么？

一句话总结：都是 2D 做图，svg 是矢量图，canvas 是位图。

svg 适合用于渲染图标 logo；Canvas 是逐像素进行渲染的，适合用于渲染游戏。

**svg**: 一种使用 XML 描述 2D 图形的语言。

```html
<svg width="100%" height="100%">
  <rect width="100%" height="100%" x="0" y="0" fill="red" />
</svg>
```

**canvas**: 由于是位图，当 w 或 h 有小数时，会产生虚边。

```html
<canvas id="canvas" width="300px" height="100px"> </canvas>
<script>
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = 'red'
  ctx.fillRect(0, 0, 300, 100)
</script>
```

[查看 demo](https://gaofanghuang.github.io/demo/api/canvas/demo1)

## 语法

[查看 demo](https://gaofanghuang.github.io/demo/api/canvas/demo2)

### 1. 坐标轴

canvas 的**默认**原点在画布的左上角。x = 0, y = 0。

X 轴向右延伸，Y 轴向下延伸。

![](/images/20200309/coordinate.png)

改变 Y 轴方向：

```javascript
// 改变Y轴方向
context.translate(0, offsetY)
context.scale(1, -1)
```

![](/images/20200309/coordinate2.png)

### 2. HTMLCanvasElement

DOM canvas 元素暴露了 **HTMLCanvasElement** 接口,该接口提供了用来操作一个 **canvas** 元素布局和呈现的属性和方法。HTMLCanvasElement 接口继承了 element 接口的属性和方法。

- `HTMLCanvasElement.width` canvas 元素在 html 文档中的宽度

- `HTMLCanvasElement.height` canvas 元素在 html 文档中的高度

### 3. canvas.toDataURL()

- 如果画布的高度或宽度是 0，那么会返回字符串“data:,”。
- 如果传入的类型非“image/png”，但是返回的值以“data:image/png”开头，那么该传入的类型是不支持的。
- Chrome 支持“image/webp”类型。

#### 3.1. Data URLs

即前缀为 data: 协议的 URL，其允许内容创建者向文档中嵌入小文件。

Data URLs 由四个部分组成：前缀(data:)、指示数据类型的 MIME 类型、如果非文本则为可选的 base64 标记、数据本身：

`data:[<mediatype>][;base64],<data>`

mediatype 是个 MIME 类型的字符串，例如 "image/jpeg" 表示 JPEG 图像文件。如果被省略，则默认值为 text/plain;charset=US-ASCII

如果数据是文本类型，你可以直接将文本嵌入 (根据文档类型，使用合适的实体字符或转义字符)。如果是二进制数据，你可以将数据进行 base64 编码之后再进行嵌入。

下面是一些示例：

1. 简单的 text/plain 类型数据

   `data:,Hello%2C%20World!`

2. 上一条示例的 base64 编码版本

   `data:text/plain;base64,SGVsbG8sIFdvcmxkIQ%3D%3D`

3. 一个 HTML 文档源代码 `<h1>Hello, World</h1>`

   `data:text/html,%3Ch1%3EHello%2C%20World!%3C%2Fh1%3E`

4. 一个会执行 JavaScript alert 的 HTML 文档。注意 script 标签必须封闭。

   `data:text/html,<script>alert('hi');</script>`

#### 3.2. 语法

- `canvas.toDataURL(type, encoderOptions)` 返回一个包含图片展示的 data URI 。可以使用 type 参数其类型，默认为 PNG 格式。图片的分辨率为 96dpi。

  **type**: 可选, 图片格式，默认为 image/png。

  **encoderOptions**： 可选，在指定图片格式为 image/jpeg 或 image/webp 的情况下，可以从 0 到 1 的区间内选择图片的质量。如果超出取值范围，将会使用默认值 0.92。其他参数会被忽略。

### 4. canvas.toBlob()

创造 Blob 对象，用以展示 canvas 上的图片；这个图片文件可以被缓存或保存到本地，由用户代理端自行决定。如不特别指明，图片的类型默认为 image/png，分辨率为 96dpi。第三个参数用于针对 image/jpeg 格式的图片进行输出图片的质量设置。

#### 4.1. 语法

- `canvas.toBlob(callback, type, encoderOptions)`

**callback**：回调函数，可获得一个单独的 Blob 对象参数。

**type**： 可选，DOMString 类型，指定图片格式，默认格式为 image/png。

**encoderOptions**： 可选，Number 类型，值在 0 与 1 之间，当请求图片格式为 image/jpeg 或者 image/webp 时用来指定图片展示质量。如果这个参数的值不在指定类型与范围之内，则使用默认值，其余参数将被忽略。

### 5. canvas.getContext()

`canvas.getContext()` 方法返回 canvas 的上下文，如果上下文没有定义则返回 null。在同一个 canvas 上以相同的 contextType 多次调用此方法只会返回同一个上下文。

当我们想要实现一些 ctx 目前没有的方法和属性时，我们可以通过 **ctx.prototype** 增加新的自定义属性和方法。即`ctx.prototype.新属性`、`ctx.prototype.新方法`。注意自定义的新属性和新方法不能和原生的重名。

```javascript
// 增加新属性, 角度 1° 的值
ctx.prototype.angleValue = Math.PI / 180
// 增加新方法，清空画布
ctx.prototype.clearCanvas(() => {
  // to do Something
})
```

#### 5.1 语法

```javascript
const ctx = canvas.getContext(contextType)
const ctx = canvas.getContext(contextType, contextAttributes)
```

##### contextType

- '2d'： 二维平面效果渲染

- 'webgl'：三维立体效果渲染

- 'bitmaprenderer'：`TODO:!暂时未知使用方法!`

##### contextAttributes

`ctxType = '2d'`:

- **alpha**: boolean 值表明 canvas 包含一个 alpha 通道. 如果设置为 false, 浏览器将认为 canvas 背景总是不透明的, 这样可以加速绘制透明的内容和图片.

`ctxType = 'webgl'`:

- **alpha**: boolean 值表明 canvas 包含一个 alpha 缓冲区。

- **antialias**: boolean 值表明是否开启抗锯齿。

- **depth**: boolean 值表明绘制缓冲区包含一个深度至少为 16 位的缓冲区。

- **failIfMajorPerformanceCaveat**: 表明在一个系统性能低的环境是否创建该上下文的 boolean 值。

- **powerPreference**: 指示浏览器在运行 WebGL 上下文时使用相应的 GPU 电源配置。"default":自动选择，默认值。"high-performance": 高性能模式。"low-power": 节能模式。

- **premultipliedAlpha**: 表明排版引擎讲假设绘制缓冲区包含预混合 alpha 通道的 boolean 值。

- **preserveDrawingBuffer**: 如果这个值为 true 缓冲区将不会被清除，会保存下来，直到被清除或被使用者覆盖。

- **stencil**: 表明绘制缓冲区包含一个深度至少为 8 位的模版缓冲区 boolean 值。

## 绘图方法

### 1.1. 设置绘图环境和样式

#### 1.1.1. 设置填充和描边颜色

- `ctx.fillStyle` 设置填充颜色, 接受三种类型参数：color（颜色字符串）、gradient（渐变对象）、pattern（图案对象）

- `ctx.strokeStyle` 设置描边颜色，接受三种类型参数，同上。

#### 1.1.2. 设置线型样式

- `ctx.lineCap` 线段端点的样式类型 `butt`方形(默认)、`round`圆形（半径是线段的宽度）、`square`矩形（高度是线段厚度一半的）

- `ctx.lineJoin` 线段拐角的样式类型 `miter`尖角(默认)、`round`圆角（半径是线段的宽度）、`bevel`平角

- `ctx.lineWidth` 设置线条宽度，默认对齐方式为居中对齐，默认为 1px

  线宽对齐方式参考 PS：

  ![](/images/20200309/line_style.jpg)

- `ctx.miterLimit` 斜接面限制比例的的数字。 0、负数、Infinity 和 NaN 都会被忽略。只当 `ctx.lineJoin='miter'`时才有效。

#### 1.1.3. 设置字体和文字对齐

- `ctx.font` 设置文本样式，参数参考 css font 属性。如：`ctx.font = '10px sans-serif'`

- `ctx.textAlign` 设置文本对齐方式，"left" || "right" || "center" || "start"（默认） || "end"。当设置为"center"时，fillText 的 xy 值为中点。

- `ctx.textBaseline` 设置文本的基线对齐方式（垂直方向），"top" || "hanging" || "middle" || "alphabetic"（默认） || "ideographic" || "bottom"。

#### 1.1.4. 设置阴影样式

- ctx.shadowColor 设置阴影颜色，只能接受 color 类型的颜色字符串。注意，阴影颜色可以通过颜色类型 rgba 或 hsla 设置阴影的透明度，但当透明度完全为 0 时，阴影不会被绘制。

- ctx.shadowBlur 阴影模糊

- ctx.shadowBlur 设置阴影模糊程度，默认为 0。float 类型，即负数、 Infinity 或者 NaN 都会被忽略。当 blur = 0，且 offsetX 或 offsetY 的值不为 0 时，阴影仍然会被绘制，只是没有模糊效果。

- ctx.shadowOffsetX 设置阴影水平偏移距离，默认为 0。float 类型。

- ctx.shadowOffsetY 设置阴影垂直偏移距离，默认为 0。float 类型。

#### 1.1.5. 设置全局透明度

- ctx.globalAlpha 设置图形和图片透明度的属性。 数值的范围从 0.0 （完全透明）到 1.0 （完全不透明）。 默认值是 1.0。 如果数值不在范围内，包括 Infinity 和 NaN ，无法赋值，并且 globalAlpha 会保持原有的数值。

#### 1.1.6. 设置图层混合模式

- ctx.globalCompositeOperation 设置合成操作的类型。类型可选：source-over、source-in、source-out、source-atop、destination-over、destination-in、destination-out、destination-atop、lighter、copy、xor（差集）、multiply、screen、overlay、darken、lighten、color-dodge、color-burn、hard-light、soft-light、difference、exclusion、hue、saturation、color、luminosity。可理解为 PS 中的图层混合模式 + AI 中的路径查找器。

  ![](/images/20200309/composite.png)

#### 1.1.7. 设置图案样式

- ctx.createPattern(image, repetition) 根据传入的图片，创建一个可重复的图案。返回**\*CanvasPattern**对象，不透明。创建完成后，可以使用 CanvasPattern.setTransform()方法对图案进行变形。

  image：作为重复图像源的 **CanvasImageSource** 对象。可以是下列之一

  - HTMLImageElement (`<img>`),
  - HTMLVideoElement (`<video>`),
  - HTMLCanvasElement (`<canvas>`),
  - CanvasRenderingContext2D,
  - ImageBitmap,
  - ImageData,
  - Blob.

  repetition：DOMString，指定如何重复图像。如果为空字符串 ('') 或 null (但不是 undefined)，repetition 将被当作"repeat"。允许的值有：

  - "repeat" (both directions),
  - "repeat-x" (horizontal only),
  - "repeat-y" (vertical only),
  - "no-repeat" (neither).

- pattern.setTransform(matrix) 使用 SVGMatrix 对象作为图案的变换矩阵，并在此图案上调用它。

#### 1.1.8. 设置渐变样式

- ctx.createLinearGradient(x0, y0, x1, y1) 创建一个沿参数坐标指定的直线的渐变。起点（x0, y0），终点（x1, y1）。返回**CanvasGradient**对象，透明。
  改变线性渐变的方向有两种方式：1️⃣ 调换 addColorStop 0 和 1 对应的值；2️⃣ 调换 createLinearGradient 创建的起点和终点，即（x1, y1, x0, y0）。
  我们知道，通过两不同点的直线有且只有一条。所以一般来说，我们只要改变 x0, y0, x1, y1 这四个值就可以轻松的改变渐变方向。这点可以结合 PS 里的线性渐变理解。

  ![](/images/20200309/gradient_line.png)

- CanvasGradient 描述渐变的不透明对象。CanvasGradient 有一个方法：`CanvasGradient.addColorStop()`

- CanvasGradient.addColorStop(offset, color) 添加一个由偏移值和颜色值指定的断点到渐变。offset: 0 到 1 之间的值，超出范围将抛出 INDEX_SIZE_ERR 错误; color: CSS 颜色值 `<color>`。如果颜色值不能被解析为有效的 CSS 颜色值 `<color>`，将抛出 SYNTAX_ERR 错误。

- ctx.createRadialGradient(x0, y0, r0, x1, y1, r1) 根据参数确定两个圆的坐标，绘制放射性渐变。起点圆，圆心(x0, y0)，半径（r0）; 结束圆，圆心(x1, y1)，半径（r1）。返回**CanvasGradient**对象。

  注意: 1️⃣ 当两个圆的半径相同时，r0 = r1 时，渐变不可见。2️⃣ 当两个圆的圆心坐标不同时，渐变效果则无法填充满路径。

### 1.2. 绘制矩形

- ctx.clearRect(x, y, w, h) 绘制一个起点在 (x, y) 、宽度为 w 、高度为 h 的透明矩形，此矩形将擦除所在区域的所有内容。

- ctx.fillRect(x, y, w, h) 绘制一个起点在 (x, y) 、宽度为 w 、高度为 h 的实心矩形。

- ctx.strokeRect(x, y, w, h) 绘制一个起点在 (x, y) 、宽度为 w 、高度为 h 的描边矩形。此方法直接绘制到画布而不会修改当前路径。

### 1.3. 绘制虚线

- ctx.setLineDash([length, spacing]) 传入一组数组设置线段和间距的值，以绘制虚线。如果数组元素的数量是奇数，数组元素会被复制并重复。如果数组为空，将会变为实线。

- ctx.getLineDash() 获取当前线段样式，得到一组数组为线段和间距的值，例：[5, 10], 长度为 5px 的线段, 间隔为 10px。

- ctx.lineDashOffset 设置虚线偏移量，默认 0

### 1.4. 绘制路径

- ctx.beginPath() 创建一个新的路径

- ctx.moveTo() 将笔触起点移动到 (x, y)

- ctx.closePath() 封闭当前路径，当存在起点和终点，并且图形为封闭时讲创建一个连接起点和终点的直线。

- ctx.stroke() 给当前路径描边

- ctx.lineTo(x, y) 绘制一个从起点到指定点 (x, y) 的直线

- ctx.rect(x, y, w, h) 绘制一个起点在 (x, y) 、宽度为 w 、高度为 h 的矩形路径

- ctx.fill() 填充当前或已存在的路径，可选传 fillRule。

  ** fillRule **是一种算法，决定点是在路径内还是在路径外。"nonzero": 非零环绕规则（默认），"evenodd": 奇偶环绕规则。利用这一特性，我们可以做出非常复杂的镂空图形。

  ** 非零环绕填充规则 **：如果想知道某一区域是否被填充，就从这一区域画一条直线向外，在与其他线的交点处，如果其他线是顺时针方向画的，就+1，逆时针则-1，如果最后总和为 0，则不会填充，非零则填充。

  ![](/images/20200309/fillrule.png)

  ** 奇偶环绕填充规则 **：在路径包围的区域中，随便找一点，向外发射一条射线，和所有围绕它的边相交，查看相交线的个数，如果为奇数，就填充，如果是偶数，就不填充。

- ctx.stroke() 给当前或已经存在的路径创建描边

- path2D() 转换 svg 格式的路径, 用法见 demo [查看 demo](https://gaofanghuang.github.io/demo/api/canvas/demo1)

- ctx.drawFocusIfNeeded(element) 如果传入的元素是聚焦的，就给当前路径绘制焦点。也可传入(path, element)。 注意该元素必须写在 canvas 标签内。(这个 api 不知道有什么应用场景，因为写在 canvas 里的标签是不可见也不可点击的，感觉这个 api 是多余的)

- ctx.clip() 将当前创建的路径设置为当前剪切路径，之后创建的所有信息都只会出现在此路径内部。可选传 fillRule

- ctx.isPointInPath(x, y, fillRule) 判断当前路径内部是否包含指定的点

- ctx.isPointInStroke(x, y) 判断当前路径描边是否包含指定的点

### 1.5. 绘制文本

- ctx.fillText(text, x, y [, maxWidth]) 绘制一个位于 (x, y) 的文本，并填充颜色。text 为文本内容。maxWidth 为文本最大宽度，可选项。

- ctx.strokeText(text, x, y [, maxWidth]) 绘制一个位于 (x, y) 的文本，并描边颜色。text 为文本内容。maxWidth 为文本最大宽度，可选项。

- ctx.measureText(text) 返回 text 的信息，如文字宽度等内容.

### 1.6. 绘制圆和弧

圆周率 π：`Math.PI ≈ 3.14 = 180°`

- ctx.arc(x, y, radius, startAngle, endAngle[, anticlockwise]) 圆弧路径的圆心在 (x, y) 位置，半径为 r ，根据 anticlockwise （默认为顺时针， true）指定的方向从 startAngle (x 轴方向开始计算) 开始绘制，到 endAngle (圆弧终点) 结束。

- ctx.arcTo(x1, y1, x2, y2, radius) 根据当前描点(前一个 moveTo 或 lineTo 等函数的止点)与给定的控制点 1 连接的直线，和控制点 1 与控制点 2 连接的直线，作为使用指定半径的圆的切线，画出两条切线之间的弧线路径。

** 开始角度 ** 及 ** 结束角度 **：

开始角度和结束角度都是以 x 轴为起点，顺时针环绕。

![](/images/20200309/arc_angle.png)

### 1.7. 贝塞尔曲线

[必须要理解掌握的贝塞尔曲线](https://www.jianshu.com/p/0c9b4b681724)

- ctx.quadraticCurveTo(cpx, cpy, x, y) 二次贝塞尔曲线。 需要传入 2 个点，第一个点是控制点，第二个点是终点。起始点是当前路径最新的点，当创建二次贝赛尔曲线之前，可以使用 moveTo() 方法进行改变。即以 3 个点产生一段曲线。

- ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) 三次贝塞尔曲线。需要传入 3 个点。 第一、第二个点是控制点，第三个点是结束点。起始点是当前路径的最后一个点，绘制贝赛尔曲线前，可以通过调用 moveTo() 进行修改。即以 4 个点产生一段曲线。

### 1.8. 绘制图像

- ctx.drawImage(image[, sx, sy, sWidth, sHeight], dx, dy[, dWidth, dHeight]) 在 Canvas 上绘制图像。

  image: 允许 CanvasImageSource 对象，同上。

  ![](https://mdn.mozillademos.org/files/225/Canvas_drawimage.jpg)

  dx：
  image 的左上角在目标 canvas 上 X 轴坐标。

  dy：
  image 的左上角在目标 canvas 上 Y 轴坐标。

  sx 可选：
  需要绘制到目标上下文中的，image 的矩形（裁剪）选择框的左上角 X 轴坐标。

  sy 可选：
  需要绘制到目标上下文中的，image 的矩形（裁剪）选择框的左上角 Y 轴坐标。

  sWidth 可选：
  需要绘制到目标上下文中的，image 的矩形（裁剪）选择框的宽度。如果不说明，整个矩形（裁剪）从坐标的 sx 和 sy 开始，到 image 的右下角结束。

  sHeight 可选：
  需要绘制到目标上下文中的，image 的矩形（裁剪）选择框的高度。

  dWidth 可选：
  image 在目标 canvas 上绘制的宽度。 允许对绘制的 image 进行缩放。 如果不说明， 在绘制时 image 宽度不会缩放。

  dHeight 可选：
  image 在目标 canvas 上绘制的高度。 允许对绘制的 image 进行缩放。 如果不说明， 在绘制时 image 高度不会缩放。

### 1.9. 变换

- ctx.rotate(angle) 传入一个角度，用来旋转画布。旋转方向是顺时针的。旋转中心点是 canvas 的起始点, 默认 x = 0, y = 0。

  ![](https://mdn.mozillademos.org/files/233/Canvas_grid_rotate.png)

- ctx.scale(x, y) 传入缩放比例来控制画布中的像素单位，x 为水平方向的缩放因子，y 垂直方向的缩放因子。默认情况下，x = 1, y = 1。可以使用 ctx.scale(-1, 1) 水平翻转上下文，使用 ctx.scale(1, -1) 垂直翻转上下文。

- ctx.translate(x, y) 偏移画布原点。x 水平方向的移动距离, y 垂直方向的移动距离。

  ![](https://mdn.mozillademos.org/files/234/Canvas_grid_translate.png)

- ctx.transform(a, b, c, d, e, f) 多次叠加当前变换, 即可以缩放、旋转、移动和倾斜上下文。a，水平缩放。b，垂直倾斜。c，水平倾斜。d，垂直缩放。e，水平移动。f，垂直移动。会叠加之前的变换。默认画布配置参数为(1, 0, 0, 1, 0, 0)。即 ad 参数等同 ctx.scale(x, y)，当 ab 参数同时为 0 时，之后的内容不可见；ef 测试等同 ctx.translate(x, y)。bc 参数为 **ctx.transform** 特有，当 bc 参数同时为 1 时，之后的内容不可见。

  **倾斜角度**：bc 参数数值换算方式，即 tan45° = 1。例如当 b = 1, c = 0 时，将 x 轴方向上倾斜 45 度。Math.sqrt() 计算平方根。tan90° 不存在。

  | 角度   |   值 | 约等于 |
  | ------ | ---: | :----: |
  | tan15° | 2-√3 |  0.27  |
  | tan30° | √3/3 |  0.58  |
  | tan45° |    1 |   1    |
  | tan60° |   √3 |  1.73  |
  | tan75° | 2+√3 |  3.73  |
  | tan90° |    0 |   0    |

- ctx.setTransform(a, b, c, d, e, f) 重设当前变换，会覆盖之前的变换。

### 1.10. 像素控制

- ctx.createImageData(width, height) 创建一个新的、空白的、指定大小的 ImageData 对象。 所有的像素在新对象中都是透明的。也可传参 `imageData`。返回一个指定了宽度和高度的，新的 ImageData 对象， 新对象使用透明的像素进行填充。

  width：ImageData 新对象的宽度。

  height：ImageData 新对象的高度。

  imageData：从现有的 ImageData 对象中，复制一个和其宽度和高度相同的对象。图像自身不允许被复制。

- ctx.getImageData(sx, sy, sw, sh) 返回一个 ImageData 对象，用来描述 canvas 区域隐含的像素数据，这个区域通过矩形表示，起始点为(sx, sy)、宽为 sw、高为 sh。返回一个 ImageData 对象，包含 canvas 给定的矩形图像数据。

- ctx.putImageData(imageData, dx, dy[, dirtyX, dirtyY, dirtyWidth, dirtyHeight]) 将数据从已有的 ImageData 对象绘制到位图的方法。 如果提供了一个绘制过的矩形，则只绘制该矩形的像素。此方法不受画布转换矩阵的影响。

  imageData: ImageData ，包含像素值的数组对象。

  dx: 源图像数据在目标画布中的 x 轴的坐标位置。

  dy: 源图像数据在目标画布中的 y 轴的坐标位置。

  dirtyX: 可选, 在源图像数据中，矩形区域左上角的位置。默认是整个图像数据的左上角（x 坐标）。

  dirtyY: 可选, 在源图像数据中，矩形区域左上角的位置。默认是整个图像数据的左上角（y 坐标）。

  dirtyWidth: 可选, 在源图像数据中，矩形区域的宽度。默认是图像数据的宽度。

  dirtyHeight: 可选, 在源图像数据中，矩形区域的高度。默认是图像数据的高度。

### 1.11. 状态

- ctx.save() 将当前状态放入栈中，保存 canvas 全部的状态。

  **被保存的值**：当前的变换矩阵。当前的剪切区域。当前的虚线列表. 以下属性当前的值： strokeStyle, fillStyle, globalAlpha, lineWidth, lineCap, lineJoin, miterLimit, lineDashOffset, shadowOffsetX, shadowOffsetY, shadowBlur, shadowColor, globalCompositeOperation, font, textAlign, textBaseline, direction, imageSmoothingEnabled.

- ctx.restore() 将 canvas 恢复到最近的保存状态的方法。 如果没有保存状态，此方法不做任何改变。

- ctx.canvas 上下文关联的 HTMLCanvasElement 对象的只读引用。如果没有 `<canvas>` 元素与之对应，对象值为 null 。

## 离屏 canvas

## 简单动画

canvas 动画实现原理：使用`window.setInterval()`或`window.setTimeout()`或`window.requestAnimationFrame()`，来清空画布并重绘新一帧的画面。由于肉眼在看超过 24 帧每秒的静态图片就会认为是连续动态视频，所以在这里 1 秒内连续生成 24 帧画面，就会产生连续的动画效果。

**帧数**：帧数(Frames)，为帧生成数量的简称。由于口语习惯上的原因，我们通常将帧数与帧率混淆。每一帧都是静止的图象，快速连续地显示帧便形成了运动的假象，因此高的帧率可以得到更流畅、更逼真的动画。

**帧率**：帧率(Frame rate)=帧数(Frames)/时间(Time)，单位为帧每秒(f/s, frames per second, fps)。如果一个动画的帧率恒定为 60 帧每秒(fps)，那么它在一秒钟内的帧数为 60 帧，两秒钟内的帧数为 120 帧。

**性能**：`window.requestAnimationFrame()`提供了更加平缓并更加有效率的方式来执行动画，当系统准备好了重绘条件的时候，才调用绘制动画帧。一般使用这个方法来执行动画，比 setInterval、setTimeout 效果更好。

## 设备交互

## 高级动画

### 1. 物理碰撞和加速度

[查看 demo](https://gaofanghuang.github.io/demo/api/canvas/demo3)

## 性能优化

1. 在离屏 canvas 上预渲染相似的图形或重复的对象。

2. 避免浮点数的坐标点，用整数取而代之。用 Math.floor()函数对所有的坐标点取整。

3. 不要在用 drawImage 时缩放图像。在离屏 canvas 中缓存图片的不同尺寸，而不要用 drawImage()去缩放它们。

4. 使用多层画布去画一个复杂的场景。

5. 用 CSS 设置大的背景图。

6. 用 CSS transforms 特性缩放画布。

7. 关闭透明度。`var ctx = canvas.getContext('2d', { alpha: false });`

8. 将画布的函数调用集合到一起（例如，画一条折线，而不要画多条分开的直线）。

9. 避免不必要的画布状态改变。

10. 渲染画布中的不同点，而非整个新状态。

11. 尽可能避免 shadowBlur 特性。

12. 尽可能避免 text rendering。

13. 使用不同的办法去清除画布(clearRect() vs. fillRect() vs. 调整 canvas 大小)。

14. 有动画，请使用 window.requestAnimationFrame() 而非 window.setInterval()。

15. 请谨慎使用大型物理库。

## 应用示例

## 常见错误

1. 标签需要闭合，`<canvas>` 元素需要有闭合标签 (`</canvas>`)。

2. 设置画布( canvas )的大小

可以直接在 html 标签中使用 width 和 height 属性 或 css 来设置画布尺寸，canvas 会通过放大缩小图像来适应画布。需要注意的是，这样容易造成图像内容模糊变形，我们目前无法使用 css 的样式来控制变形，如`object-fit:cover`，目前只能用改变宽高属性实现。

推荐的方法是宽高直接写在 canvas 标签上，或者使用 js 来修改 canvas 的宽高。

3. canvas 标签内的内容，当 canvas 工作时并不会显示，而当浏览器不支持 canvas 时，才会显示。

```html
<canvas id="canvas" width="300" height="300">
  抱歉，您的浏览器不支持canvas元素 （这些内容将会在不支持<canvas
    >元素的浏览器或是禁用了JavaScript的浏览器内渲染并展现）
  </canvas></canvas
>
```

4. canvas 画布清空问题

清除 Canvas 任意区域像素可以用 canvas_context.clearRect(x, y, width, height)，但如果只有一个 Canvas，不同的方法都调用同一个 Canvas 时，只调用 canvas_context.clearRect(x, y, width, height)之后，再次绘制会出现偏移现象。

此时只要重置画布的宽度或者高度`canvas.width = canvas.width`，canvas 标签就会重新被渲染，以此达到完全清空画布内容的效果。

5. ctx.font 不生效

ctx.font 必须同时设置 字体大小 和 字体名称， 如设置 `ctx.font = '16px'` 时是无效的，必须加上 font-family 才行, 即：`ctx.font = '16px serif'`

6. 引用外部图片资源绘制，toDataUrl()报错：Uncaught DOMException: Failed to execute 'toDataURL' on 'HTMLCanvasElement': Tainted canvases may not be exported.

解决方案：

① 把图片移动到当前域下。

② 服务器允许跨域，并且 img 设置允许跨域。

```javascript
var img = new Image()
img.setAttribute('crossOrigin', 'anonymous')
img.src = url
```