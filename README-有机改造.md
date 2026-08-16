# show_word — 有机形态设计改造版

> 原项目：https://github.com/stevengeyue/show_word.git（静态 HTML 个人博客）
> 本目录为按「有机形态设计语言」改造后的完整可部署副本（Netlify 静态部署，无构建依赖）。

## 改造主题

柔和、不规则、自然流动的有机形态作为主要视觉语言，营造「有机物在呼吸、资讯区稳定清晰」的氛围。

## 视觉设计要点

- **粉 / 紫 / 青柔和渐变**：主色 `#e079b8`（粉）、`#8d7bf7`（紫）、`#5fc9dd`（青），浅色/深色双主题均重新配色。
- **多值圆角**：卡片、面板、按钮全部改用非对称多值圆角（如 `26px 14px 30px 18px / 24px 30px 20px 34px`），避免严格对称与硬直角。
- **曲线 clip-path 与有机轮廓**：学习航道（art-band）顶部波浪 clip-path；Hero 面板与头像使用 blob 式多值圆角 + 呼吸形变。
- **雾面材质**：半透明表面 + `backdrop-filter` 模糊 + 低噪点（SVG turbulence 叠层）+ 柔和阴影 + 细描边分层。
- **文字区域保持规整矩形**：文章正文、内容盒子（highlight-box / info-card 等）保持规则圆角矩形，保证可读性。

## 动效设计

- **背景 blob**：四个柔和渐变 blob（粉/紫/青）以 9–12s 周期缓慢形变、漂移，`border-radius` 持续游走。
- **面板呼吸**：Hero 渐变面板与头像 8–9s 呼吸形变；手绘虚线环 24–26s 缓慢旋转。
- **Hover**：卡片轻微放大 + 旋转（`scale(1.022) rotate(0.5deg)`），按钮 `scale(1.045) rotate(-1deg)`。
- **Active**：平滑回正（`scale(0.96–0.98)`），过渡曲线 `cubic-bezier(0.22, 0.61, 0.36, 1)`。
- **知识图谱**：canvas 节点由正圆改为有机 blob 路径，连线改为柔和二次曲线。
- 尊重 `prefers-reduced-motion`，动效可整体降级。

## 主要改动文件

| 文件 | 改动 |
| --- | --- |
| `my-static-site/styles/styles.css` | 全量重写：有机设计系统（变量/圆角/材质/交互） |
| `my-static-site/styles/animations.css` | 全量重写：blob 形变、呼吸、缓慢旋转关键帧 |
| `my-static-site/styles/components.css` | 兼容层：旧文章页组件圆角有机化 |
| `my-static-site/index.html` | 注入 blob 装饰层、色板换粉紫青 |
| `my-static-site/articles.html` / `projects.html` / `about.html` | 注入 blob 装饰层 |
| `my-static-site/articles/*.html`（17 篇） | 注入 blob 层、hero/按钮圆角有机化、修复失效图片引用 |
| `my-static-site/scripts/script.js` | 知识图谱节点与连线有机化、reveal 降级保障 |

## 二次调整（按用户反馈）

- **Hero 面板重设计**：原三个文字卡片（Articles/Topics/Archive）替换为「呼吸轨道圆盘」——中心大数字 + 虚线轨道环缓慢旋转 + 三个专题关键词小标签，信息简洁、不再杂乱。
- **头像显示修复**：`reveal` 机制改为默认可见，由 JS 启动后才进入隐藏→显现流程；无 IntersectionObserver 环境直接显示，杜绝内容/头像丢失。
- **降低红色占比**：主粉由 `#e079b8` 调为低饱和 `#d69cc2`，背景光斑、blob、面板底色均降低粉色透明度，紫色与青色成为主导；`tone-teal` 恢复青绿系（原误改为粉色），卡片顶条不再一片红。

## 本地预览

```bash
cd my-static-site
python -m http.server 8000
# 打开 http://localhost:8000
```

## 验证记录

- 22 个 HTML 页面 + 6 个样式/脚本文件全部 HTTP 200。
- `site-data.js` 引用的 32 个资源、文章页 8 个资源引用全部存在。
- CSS 花括号平衡，所有页面均挂载 styles.css / animations.css 与 blob 装饰层。
