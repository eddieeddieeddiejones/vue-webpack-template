
# 搭建基于webpack的vue环境

### 搭建webpack环境
在文件夹下安装webpack
```shell
npm i -D webpack
```

创建package.json文件
```shell
npm init -y
```

更改package.json文件
```
"scripts": {
    "start": "webpack --config webpack.config.js"
  },
```

新建index.html文件
```html
<html>
<head>
  <meta charset="UTF-8">
</head>
<body>
<div id="app"></div>
<!--导入 Webpack 输出的 JavaScript 文件-->
<script src="./dist/bundle.js"></script>
</body>
</html>
```

新建`show.js`
```js
// 操作 DOM 元素，把 content 显示到网页上
function show(content) {
  window.document.getElementById('app').innerText = 'Hello,' + content;
}

// 通过 CommonJS 规范导出 show 函数
module.exports = show;
```

新建main.js
```shell
// 通过 CommonJS 规范导入 show 函数
const show = require('./show.js');
// 执行 show 函数
show('Webpack');
```

命令行执行`webpack`命令，浏览器打开`index.html`文件得"hello webpack"

```shell
```

```shell
```

```shell
```

```shell
```

```shell
```

```shell
```

要求
- 开发、测试、线上环境
- ts、scss
- 图片，静态文件
性能优化方面
- 懒加载
- 服务端渲染ssr（必须）