
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

### 打包的时候，抽离css文件

```shell
npm install --save-dev mini-css-extract-plugin
```

webpack.config.js

```js
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              publicPath: '../',
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader',
        ],
      },
    ],
  },
  // 打包的时候抽离css，使之成为单独文件
  plugins: [new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // all options are optional
    filename: '[name].css',
    chunkFilename: '[id].css',
    ignoreOrder: false, // Enable to remove warnings about conflicting order
  }),]
};
```

更改index.html，添加对css文件的引用
```html
<link rel="stylesheet" href="./dist/main.css">
```

命令行执行`webpack`命令，dist文件夹下生成了`main.css`文件，浏览器打开`index.html`文件得文字居中的"hello webpack"

### 热更新

```shell
npm i -D webpack-cli
npm i -d html-webpack-plugin clean-webpack-plugin webpack-dev-server
```

更改`package.json`文件的script字段

```json
"scripts": {
  "start": "webpack-dev-server --mode development --open"
},
```

`webapck.config.js`文件改动非常多

```js
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  // JavaScript 执行入口文件
  entry: {
    app: './src/index.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './',
    hot: true,
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          // {
          //   loader: MiniCssExtractPlugin.loader,
          //   options: {
          //     // you can specify a publicPath here
          //     // by default it uses publicPath in webpackOptions.output
          //     publicPath: '../',
          //     hmr: process.env.NODE_ENV === 'development',
          //   },
          // },
          'css-loader',
        ],
      },
    ],
  },
  // 打包的时候抽离css，使之成为单独文件
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Hot Module Replacement',
    }),
  ]
};
```

根目录下新建src文件夹
在src文件夹下，新建 `index.js`
```js
// index.js
// 通过 CommonJS 规范导入 CSS 模块
require('./main.css');
// 通过 CommonJS 规范导入 show 函数
const show = require('./show.js');
// 执行 show 函数
show('Webpack hot reload');
console.log(12222)
```

在src文件夹下，新建 `show.js`

```js
// show.js
// 操作 DOM 元素，把 content 显示到网页上
function show(content) {
  window.document.body.innerText = 'Hello,' + content;
}

// 通过 CommonJS 规范导出 show 函数
module.exports = show;
```

在src文件夹下，新建 `main.css`
```css
/* main.css */
body {
  text-align: center;
  background-color: green;
}
```

执行命令`npm start`，会自动浏览器打开`http://localhost:8080/`，更改src下文件，浏览器会刷新显示最新内容。

### support typescript

new `tsconfig.json`

```json
{
  "compilerOptions": {
    "outDir": "./dist/",
    "sourceMap": true,
    "noImplicitAny": true,
    "module": "es6",
    "target": "es5",
    "jsx": "react",
    "allowJs": true
  }
}
```

```shell
npm install --save-dev typescript ts-loader
```

webpack.config.js

```js
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  // JavaScript 执行入口文件
  entry: {
    app: './src/index.ts',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './',
    hot: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          // {
          //   loader: MiniCssExtractPlugin.loader,
          //   options: {
          //     // you can specify a publicPath here
          //     // by default it uses publicPath in webpackOptions.output
          //     publicPath: '../',
          //     hmr: process.env.NODE_ENV === 'development',
          //   },
          // },
          'css-loader',
        ],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  // 打包的时候抽离css，使之成为单独文件
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Hot Module Replacement',
    }),
  ]
};
```

index.ts

```ts
// 通过 CommonJS 规范导入 CSS 模块
require('./main.css');
// 通过 CommonJS 规范导入 show 函数
const showHello = require('./show.ts');
// 执行 show 函数
showHello('Webpack hot reload');
console.log(22)
```

show.ts

```ts
// 操作 DOM 元素，把 content 显示到网页上
function show(content: string) {
  window.document.body.innerText = 'Hello,' + content;
}

// 通过 CommonJS 规范导出 show 函数
module.exports = show;
```
