
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

### 处理css
main.js
```js
// 通过 CommonJS 规范导入 CSS 模块
require('./main.css');
// 通过 CommonJS 规范导入 show 函数
const show = require('./show.js');
// 执行 show 函数
show('Webpack');
```

新建`main.css`
```css
#app{
  text-align: center;
}
```

webpack.config.js

```js
const path = require('path');

module.exports = {
  // JavaScript 执行入口文件
  entry: './main.js',
  output: {
    // 把所有依赖的模块合并输出到一个 bundle.js 文件
    filename: 'bundle.js',
    // 输出文件都放到 dist 目录下
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        // 用正则去匹配要用该 loader 转换的 CSS 文件
        test: /\.css$/,
        use: ['style-loader', 'css-loader?minimize'],
      }
    ]
  }
};
```

```shell
npm i -D style-loader css-loader
```

命令行执行`webpack`命令，浏览器打开`index.html`文件得文字居中的"hello webpack"

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