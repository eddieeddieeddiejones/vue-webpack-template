// 操作 DOM 元素，把 content 显示到网页上
function show(content: string) {
  window.document.body.innerText = 'Hello,' + content;
}

// 通过 CommonJS 规范导出 show 函数
module.exports = show;
