// 通过 CommonJS 规范导入 CSS 模块
// require('./main.css');
import './style.scss';

// 通过 CommonJS 规范导入 show 函数
const showHello = require('./show.ts');
// 执行 show 函数
showHello('Webpack hot reload');
console.log(22)
