# Hello World - 我的第一篇博客

date: 2023-01-01

欢迎来到我的博客！这是我的第一篇文章。

## 简介

这是一个使用 Node.js 和 Express 构建的简单博客系统。博客支持 Markdown 格式，并具有代码高亮功能。

## 功能特点

- 使用 Markdown 编写文章
- 代码高亮显示
- 响应式设计
- 简洁美观的界面

## 示例代码

这里是一些示例代码：

```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

## 结语

希望你喜欢这个简单的博客系统！