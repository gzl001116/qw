# QW 博客

这是一个使用 Node.js 和 Express 构建的简单博客系统。

## 功能特点

- 使用 Markdown 编写文章
- 代码高亮显示
- 响应式设计
- 简洁美观的界面

## 快速开始

1. 克隆项目
   ```
   git clone git@github.com:gzl001116/qw.git
   ```

2. 安装依赖
   ```
   npm install
   ```

3. 启动服务
   ```
   npm start
   ```

4. 访问博客
   在浏览器中打开 http://localhost:3000

## 创建文章

在 `posts` 目录下创建 Markdown 文件即可创建新文章。文章支持以下格式：

```markdown
# 文章标题

date: 2023-01-01

文章内容...
```

## 部署

可以部署到各种平台，如 GitHub Pages、Heroku、Vercel 等。

## 技术栈

- Node.js
- Express.js
- EJS 模板引擎
- Marked Markdown 解析器
- Highlight.js 代码高亮

## 许可证

MIT