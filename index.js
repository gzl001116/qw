const express = require('express');
const path = require('path');
const fs = require('fs');
const marked = require('marked');
const hljs = require('highlight.js');

const app = express();
const PORT = process.env.PORT || 3000;

// 配置模板引擎
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 静态文件服务
app.use(express.static(path.join(__dirname, 'public')));

// 配置marked和highlight.js
marked.setOptions({
  highlight: function(code, lang) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, { language }).value;
  },
  langPrefix: 'hljs language-',
});

// 首页路由 - 显示博客列表
app.get('/', (req, res) => {
  // 读取posts目录下的所有markdown文件
  const postsDir = path.join(__dirname, 'posts');
  
  // 确保posts目录存在
  if (!fs.existsSync(postsDir)) {
    fs.mkdirSync(postsDir, { recursive: true });
  }
  
  fs.readdir(postsDir, (err, files) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error reading posts');
    }
    
    // 过滤出markdown文件
    const markdownFiles = files.filter(file => path.extname(file) === '.md');
    
    // 读取每个文件的元数据
    const posts = markdownFiles.map(file => {
      const filePath = path.join(postsDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      const lines = content.split('\n');
      
      // 简单提取标题和摘要
      const title = lines[0].replace(/^#/, '').trim() || file;
      const date = lines.find(line => line.startsWith('date:'))?.replace('date:', '').trim() || 
                   fs.statSync(filePath).birthtime.toISOString().split('T')[0];
      
      return {
        title,
        date,
        file: file.replace('.md', '')
      };
    });
    
    // 按日期排序
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    res.render('index', { posts });
  });
});

// 博客文章路由
app.get('/post/:slug', (req, res) => {
  const slug = req.params.slug;
  const filePath = path.join(__dirname, 'posts', `${slug}.md`);
  
  fs.readFile(filePath, 'utf8', (err, content) => {
    if (err) {
      return res.status(404).send('Post not found');
    }
    
    const htmlContent = marked.parse(content);
    
    // 提取标题
    const lines = content.split('\n');
    const title = lines[0].replace(/^#/, '').trim() || slug;
    
    res.render('post', { 
      title,
      content: htmlContent 
    });
  });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Blog server running on port ${PORT}`);
});