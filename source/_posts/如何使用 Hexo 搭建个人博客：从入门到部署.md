# 如何使用 Hexo 搭建个人博客：从入门到部署



![Hexo 博客示例](https://picsum.photos/id/180/1200/400)

## 前言

Hexo 作为一款基于 Node.js 的静态博客生成器，凭借速度快、配置简单、主题丰富等特点，深受开发者喜爱。本文将详细介绍从环境搭建到博客部署的完整流程，为新手提供入门参考。

## 一、准备工作：安装必要工具

搭建 Hexo 博客前，需安装以下两个基础工具：

### 1.1 Node.js



*   **作用**：Hexo 基于 Node.js 运行。

*   **版本建议**：安装 LTS 版本（长期支持版）。

*   **下载地址**：[Node.js 官网](https://nodejs.org/)。

*   **安装验证**：终端输入 `node -v` 和 `npm -v`，显示版本号即安装成功。

### 1.2 Git



*   **作用**：用于版本控制和部署到 GitHub Pages 等平台。

*   **下载地址**：[Git](https://git-scm.com/)[ 官网](https://git-scm.com/)。

*   **安装验证**：终端输入 `git --version`，显示版本号即安装成功。

## 二、安装 Hexo 并创建博客

### 2.1 全局安装 Hexo

打开终端，输入以下命令：



```
npm install -g hexo-cli
```

安装完成后，输入 `hexo -v` 验证是否成功。

### 2.2 初始化博客项目

选择一个文件夹作为博客根目录（例如 `my-hexo-blog`），执行以下命令：



```
hexo init my-hexo-blog  # 初始化项目

cd my-hexo-blog         # 进入项目目录

npm install             # 安装依赖
```

### 2.3 目录结构说明

初始化完成后，博客目录结构如下：



```
my-hexo-blog/

├── \_config.yml         # 全局配置文件

├── package.json        # 项目依赖

├── scaffolds/          # 文章模板

├── source/             # 文章和静态资源

│   ├── \_posts/         # 博客文章

│   └── images/         # 图片等资源

└── themes/             # 博客主题
```

## 三、本地预览博客



1.  生成静态文件：



```
hexo generate  # 简写：hexo g
```



1.  启动本地服务器：



```
hexo server    # 简写：hexo s
```



1.  打开浏览器，访问 `http://localhost:4000`，即可看到默认主题的博客页面。

## 四、发布第一篇文章

### 4.1 创建文章

使用 Hexo 命令创建新文章：



```
hexo new "我的第一篇 Hexo 博客"  # 简写：hexo n "标题"
```

执行后，会在 `source/_posts/` 目录下生成一个 `.md` 文件（Markdown 格式）。

### 4.2 编写文章

用编辑器打开 `.md` 文件，按照 Markdown 语法编写内容。文件头部的 **Front-matter** 用于配置文章信息，例如：



```
\---

title: 我的第一篇 Hexo 博客

date: 2023-10-01 15:30:00

tags: \[Hexo, 博客]

categories: 技术

\---

这里是文章正文...
```

### 4.3 重新预览

修改后执行 `hexo g && hexo s`，刷新浏览器即可看到新文章。

## 五、更换主题

Hexo 默认主题为 `landscape`，可到 [Hexo 主题商店](https://hexo.io/themes/) 挑选喜欢的主题。以热门主题 **Next** 为例：



1.  克隆主题到 `themes` 目录：



```
git clone https://github.com/theme-next/hexo-theme-next.git themes/next
```



1.  修改全局配置文件 `_config.yml`：



```
theme: next  # 将默认主题改为 next
```



1.  重新生成并预览：



```
hexo clean  # 清除缓存

hexo g && hexo s
```

## 六、部署到 GitHub Pages

### 6.1 准备工作



*   注册 GitHub 账号，创建一个仓库，仓库名必须为 `用户名.``github.io`（例如 `张三.``github.io`）。

### 6.2 安装部署插件



```
npm install hexo-deployer-git --save
```

### 6.3 配置部署信息

修改 `_config.yml`，添加以下内容：



```
deploy:

&#x20; type: git

&#x20; repo: https://github.com/你的用户名/你的用户名.github.io.git

&#x20; branch: main  # 或 master，根据仓库默认分支调整
```

### 6.4 部署博客



```
hexo clean && hexo g && hexo d  # 清除缓存→生成静态文件→部署
```

等待部署完成后，访问 `https://你的用户名.``github.io`，即可看到在线博客。

## 七、常用 Hexo 命令总结



| 命令              | 简写            | 说明         |
| --------------- | ------------- | ---------- |
| `hexo generate` | `hexo g`      | 生成静态文件     |
| `hexo server`   | `hexo s`      | 启动本地服务器    |
| `hexo deploy`   | `hexo d`      | 部署博客       |
| `hexo new "标题"` | `hexo n "标题"` | 创建新文章      |
| `hexo clean`    | -             | 清除缓存和生成的文件 |

## 结语

通过以上步骤，你已拥有一个可在线访问的 Hexo 博客！后续可根据需求自定义主题样式、添加评论功能或统计工具。若有问题，欢迎交流。

> 参考资料：
>
> [Hexo 官方文档](https://hexo.io/docs/)

> （注：文档部分内容可能由 AI 生成）