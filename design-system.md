# 简历 Web 页面 — 设计系统文档

> **用途**：当需要基于新简历内容或更新内容生成/修改 Web 页面时，本文档作为唯一的设计真相来源（source of truth）。所有视觉、布局、交互规范均记录于此。

---

## 一、文件结构

```
resume/
├── index.html      # 页面结构 + 内容
├── styles.css      # 全部样式
├── script.js       # 交互逻辑
├── design-system.md # 本文件
└── docx_template.py # DOCX 生成模板（独立，与此无关）
```

三个文件通过 class 名耦合。更新内容时只需要改 `index.html`（偶尔需要改侧边栏的 `styles.css` 如果新增导航项）。

---

## 二、整体布局

```
┌──────────────┬────────────────────────────────────────┐
│              │                                        │
│   Sidebar    │           Main Content                 │
│   240px      │           margin-left: 240px           │
│   fixed      │           scrollable                   │
│              │                                        │
│  ┌────────┐  │  ┌──────────────────────────────────┐  │
│  │ 黎耀棠 │  │  │           Hero                   │  │
│  │ AI架构 │  │  │  深蓝渐变背景，数字卡片            │  │
│  ├────────┤  │  └──────────────────────────────────┘  │
│  │01 亮点 │  │  ┌──────────────────────────────────┐  │
│  │02 经历 │  │  │      Section: 个人亮点            │  │
│  │03 项目 │  │  │     2列卡片网格                   │  │
│  │04 技能 │  │  └──────────────────────────────────┘  │
│  │        │  │  ┌──────────────────────────────────┐  │
│  ├────────┤  │  │      Section: 工作经历            │  │
│  │📞 📧   │  │  │     垂直时间线                    │  │
│  └────────┘  │  └──────────────────────────────────┘  │
│              │  ┌──────────────────────────────────┐  │
│  始终可见    │  │      Section: 项目经历            │  │
│              │  │     2列卡片网格 + 技术标签         │  │
│              │  └──────────────────────────────────┘  │
│              │  ┌──────────────────────────────────┐  │
│              │  │      Section: 技能集合            │  │
│              │  │     3列分类标签云                  │  │
│              │  └──────────────────────────────────┘  │
│              │  ┌──────────────────────────────────┐  │
│              │  │           Footer                 │  │
│              │  └──────────────────────────────────┘  │
└──────────────┴────────────────────────────────────────┘
```

### 关键布局参数

| 参数 | 值 | CSS 变量 |
|------|-----|----------|
| 侧边栏宽度 | 240px | `--sidebar-width` |
| 内容区最大宽度 | 900px | `--max-width` |
| 侧边栏背景 | `#0F1D32` | `--color-sidebar-bg` |
| 主内容区偏移 | `margin-left: 240px` | `.main-content` |

---

## 三、配色方案

### 全局色板

| 用途 | 色值 | CSS 变量 |
|------|------|----------|
| 主色（标题、强调） | `#1F497D` 深蓝 | `--color-primary` |
| 辅助色（链接、hover） | `#2B6CB0` 科技蓝 | `--color-primary-light` |
| 强调色（数字、标签） | `#ED8936` 暖橙 | `--color-accent` |
| 强调浅色 | `#FBD38D` | `--color-accent-light` |
| 页面背景 | `#F7FAFC` 浅灰白 | `--color-bg` |
| 卡片背景 | `#FFFFFF` 白 | `--color-white` |
| 主文字 | `#2D3748` 深灰 | `--color-text` |
| 次要文字 | `#4A5568` | `--color-text-light` |
| 辅助文字 | `#718096` 中灰 | `--color-muted` |
| 边框/分割线 | `#E2E8F0` | `--color-border` |

### 侧边栏专用色

| 用途 | 色值 |
|------|------|
| 背景 | `#0F1D32` |
| 链接文字 | `#94A3B8` |
| 链接激活色 | `#60A5FA` |
| 品牌名白色 | `#FFFFFF` |
| 职位/联系方式 | `#64748B` |
| 分割线 | `rgba(255,255,255,0.08)` |

### Hero 渐变

```css
background: linear-gradient(160deg, #1a365d 0%, #1F497D 40%, #2B6CB0 100%);
```

### 语义色标签

| 标签类型 | CSS 类 | 效果 |
|----------|--------|------|
| 普通技能标签 | `.skill-tag` | 浅灰底 + 灰边框 |
| 精通技能 | `.skill-tag.skill-master` | 深蓝底白字，加粗 |
| 熟练技能 | `.skill-tag.skill-proficient` | 浅蓝底蓝字，加粗 |
| 项目技术标签 | `.project-tech span` | 浅蓝底蓝字 |

---

## 四、字体系统

| 用途 | 字体栈 | CSS 变量 |
|------|--------|----------|
| 中文正文 | `"PingFang SC", "Microsoft YaHei", "Hiragino Sans GB", "Noto Sans SC", sans-serif` | `--font-cn` |
| 数字/英文 | `"Inter", "Segoe UI", "SF Pro Display", system-ui, -apple-system, sans-serif` | `--font-num` |

### 字号阶梯

| 元素 | 字号 | 字重 | 备注 |
|------|------|------|------|
| Hero 姓名 | 44px | 800 | 移动端 → 32px → 28px |
| Hero 职位 | 18px | 400 | 移动端 → 15px |
| 统计数字 | 36px | 800 | `--font-num`；移动端 → 28px → 24px |
| 统计单位 | 18px | 500 | 移动端 → 14px |
| Section 标题 | 24px | 700 | 深蓝色 + 底部 3px 分割线 |
| Section 副标题 | 14px | 400 | `--color-muted` |
| 侧边栏名字 | 22px | 800 | 白色 |
| 侧边栏链接 | 16px | 600 | |
| 亮点标题 | 15px | 700 | |
| 亮点正文 | 13px | 400 | |
| 公司名 | 17px | 700 | |
| 职位 | 14px | 400 | |
| 时间线日期 | 14px | 600 | `--font-num`, 深蓝色 |
| 项目名 | 16px | 700 | 深蓝色 |
| 技能分类标题 | 15px | 700 | |
| 技能标签 | 12px | 500 | |
| Hero 标签 | 13px | 500 / 600 | |

---

## 五、圆角与阴影

| 属性 | 值 | CSS 变量 |
|------|-----|----------|
| 小圆角（图标、标签） | 6px | `--radius-sm` |
| 标准圆角（卡片） | 12px | `--radius` |
| 大圆角 | 16px | `--radius-lg` |
| 卡片默认阴影 | `0 1px 3px rgba(0,0,0,0.06)` | `--shadow-sm` |
| 卡片悬停阴影 | `0 4px 16px rgba(0,0,0,0.10)` | `--shadow-lg` |
| 过渡时间 | 0.2s ease | `--transition` |

所有卡片 hover 时：阴影加深 + 上移 2px（`transform: translateY(-1px)` 或 `-2px`）。

---

## 六、组件规格

### 6.1 侧边栏 (`.sidebar`)

```html
<aside class="sidebar" id="sidebar">
    <div class="sidebar-brand">
        <div class="sidebar-name">姓名</div>        <!-- 点击回顶部，hover 变蓝 -->
        <div class="sidebar-role">职位</div>
    </div>
    <nav class="sidebar-nav">
        <a href="#highlights" class="sidebar-link">
            <span class="sidebar-num">01</span>
            <span class="sidebar-text">个人亮点</span>
        </a>
        <!-- 更多链接... -->
    </nav>
    <div class="sidebar-footer">
        <a href="tel:xxx" class="sidebar-contact">📞 电话</a>
        <a href="mailto:xxx" class="sidebar-contact">📧 邮箱</a>
    </div>
</aside>
```

- `position: fixed`，始终可见
- 激活链接（`.sidebar-link.active`）：浅蓝背景 + 蓝色左边框条 + 蓝色文字
- 悬停：半透明白色背景 + 文字变亮
- 导航项编号使用 `--font-num` 字体

### 6.2 移动端横条 (`.mobile-bar`)

```html
<header class="mobile-bar" id="mobileBar">
    <span class="mobile-name">姓名</span>            <!-- 点击回顶部 -->
    <button class="mobile-menu-btn" id="mobileMenuBtn">
        <span></span><span></span><span></span>       <!-- 汉堡图标 -->
    </button>
</header>
```

- 桌面端 `display: none`，≤900px 时 `display: flex`
- 点击汉堡图标 → 侧边栏从左滑入 + 黑色遮罩
- 汉堡图标打开时变为 X

### 6.3 Hero (`.hero`)

```html
<section class="hero">
    <div class="container">
        <div class="hero-badge">AI Solutions Architect</div>   <!-- 英文小标签 -->
        <h1 class="hero-name">姓名</h1>
        <p class="hero-role">职位描述</p>
        <div class="hero-info">
            <span>📍 城市</span>
            <span>🎂 年龄</span>
            <span>🎓 学历</span>
        </div>
        <div class="hero-contact">
            <a href="tel:xxx">📞 电话</a>
            <a href="mailto:xxx">📧 邮箱</a>
        </div>
        <div class="hero-tags">
            <span class="tag tag-primary">目标岗位</span>
            <span class="tag tag-highlight">期望薪资</span>
        </div>
        <div class="stats-row">
            <div class="stat-card">
                <div class="stat-number">11<span class="stat-unit">年</span></div>
                <div class="stat-label">工作经验</div>
            </div>
            <!-- 4 个 stat-card -->
        </div>
    </div>
</section>
```

- 深蓝渐变背景 + 两个径向渐变光斑装饰（`::before` / `::after`）
- `.hero-badge`：半透明白底圆角标签，大写英文字母间距 2px
- `.stat-card`：半透明白底 + `backdrop-filter: blur(4px)`，hover 上移变亮
- `.stat-number` 用 `--font-num` 字体
- `.tag-primary`：半透明白底；`.tag-highlight`：橙色实底白字

### 6.4 Section 标题

```html
<h2 class="section-title">标题名</h2>
```

- 24px 深蓝加粗 + `display: inline-block`
- 底部 3px 深蓝实线分割线（`border-bottom`）
- 可选副标题：`<p class="section-subtitle">...</p>` 14px 灰色

### 6.5 个人亮点 (`.highlights-grid`)

```html
<div class="highlights-grid">           <!-- 2 列网格，移动端 1 列 -->
    <div class="highlight-card">        <!-- 白底卡片，左边图标 + 右边文字 -->
        <div class="highlight-icon">    <!-- 48x48，浅蓝底，内嵌 SVG 图标 -->
            <svg>...</svg>
        </div>
        <div class="highlight-content">
            <h3>标题</h3>              <!-- 15px 加粗 -->
            <p>描述...</p>             <!-- 13px；数字加粗用 <strong>，变深蓝色 -->
        </div>
    </div>
</div>
```

- 5 张卡片（最后一张是奇数，占据整行的一半宽度）
- 图标使用内联 SVG，尺寸 32x32，`stroke="currentColor"` 继承颜色

### 6.6 工作经历时间线 (`.timeline`)

```html
<div class="timeline">                  <!-- 相对定位，`padding-left: 40px` -->
    <div class="timeline-item">
        <div class="timeline-dot current"></div>  <!-- 圆点：current / pivot / 默认 -->
        <div class="timeline-card">
            <div class="timeline-header">
                <div class="timeline-period">2023.05 — 2026.04</div>  <!-- 深蓝色 -->
                <span class="timeline-duration">3 年</span>           <!-- 灰色小标签 -->
            </div>
            <h3 class="timeline-company">公司名</h3>
            <p class="timeline-role">职位 <span class="timeline-report">直属：xxx</span></p>
            <p class="timeline-summary">职责概述（灰色文字 + 底部分割线）</p>
            <ul class="timeline-achievements">
                <li>成果描述</li>       <!-- 前缀 ▸ 箭头 -->
            </ul>
            <!-- 可选：转折标签 -->
            <div class="timeline-badge">
                <span>🔀 技术转产品</span>  <!-- 橙色文字 + 浅橙背景 -->
            </div>
        </div>
    </div>
</div>
```

时间线竖线用 `.timeline::before` 伪元素（2px 宽，左边距 15px）。

圆点类型：
| 类名 | 边框色 | 内部圆点色 | 外发光 | 用途 |
|------|--------|-----------|--------|------|
| `.timeline-dot.current` | `#1F497D` | `#1F497D` | 蓝色光晕 | 当前/最近经历 |
| `.timeline-dot.pivot` | `#ED8936` | `#ED8936` | 橙色光晕 | 职业生涯转折点 |
| `.timeline-dot`（默认） | `#E2E8F0` | `#718096` | 无 | 普通经历 |

### 6.7 项目经历 (`.projects-grid`)

```html
<div class="projects-grid">             <!-- 2 列网格，移动端 1 列 -->
    <div class="project-card">
        <div class="project-header">
            <h3 class="project-name">项目名</h3>           <!-- 16px 深蓝加粗 -->
            <span class="project-period">时间范围</span>    <!-- 12px 灰色 -->
        </div>
        <p class="project-company">公司名</p>              <!-- 13px 灰色 -->
        <p class="project-desc">项目描述</p>               <!-- 13px -->
        <div class="project-tech">
            <span>技术标签</span>                           <!-- 浅蓝底蓝字圆角标签 -->
        </div>
        <ul class="project-results">
            <li><strong>关键词：</strong>描述</li>         <!-- 橙色小圆点前缀 -->
        </ul>
    </div>
</div>
```

- 技术标签背景 `#EBF4FF`，文字 `#2B6CB0`
- 成果列表用小圆点（`::before` 橙色 5px 圆）而非箭头

### 6.8 技能集合 (`.skills-grid`)

```html
<div class="skills-grid">               <!-- 3 列，移动端 → 2 列 → 1 列 -->
    <div class="skill-category">
        <h3 class="skill-cat-title">🤖 分类名</h3>       <!-- emoji + 15px 加粗 -->
        <div class="skill-tags">
            <span class="skill-tag skill-master">精通技能</span>    <!-- 深蓝底白字 -->
            <span class="skill-tag skill-proficient">熟练技能</span> <!-- 浅蓝底蓝字 -->
            <span class="skill-tag">普通技能</span>                 <!-- 浅灰底灰字 -->
        </div>
    </div>
</div>
```

### 6.9 页脚 (`.footer`)

```html
<footer class="footer">
    <div class="container">
        <p>姓名 · 职位</p>
        <p class="footer-contact">
            <a href="tel:xxx">电话</a> · <a href="mailto:xxx">邮箱</a> · 城市
        </p>
    </div>
</footer>
```

- 背景 `#1a365d`，文字半透明白色
- 链接 hover 变暖橙色

---

## 七、响应式断点

### 900px（平板/小屏桌面）

- 侧边栏隐藏 → 顶部出现移动端横条
- 侧边栏从左侧滑入（点击汉堡菜单触发）+ 黑色遮罩
- 主内容区 `margin-left: 0`
- Hero 字号缩小
- 亮点、项目 → 单列
- 技能 → 2 列
- 统计数字 → 2x2
- 时间线圆点缩小

### 480px（手机）

- 进一步缩小 Hero 字号和间距
- 技能 → 单列
- 卡片内边距减小（24px → 16px）
- 侧边栏最大宽度 300px

---

## 八、交互行为

| 行为 | 实现方式 | 触发条件 |
|------|----------|----------|
| 侧边栏导航高亮 | JS `initSidebarActiveLink()` — 监听 scroll，判断当前 section | 滚动到对应 section |
| 侧边栏链接点击 | 浏览器平滑滚动（`scroll-behavior: smooth`） | 点击 `.sidebar-link` |
| 滚动至顶部清空高亮 | 判断 `scrollY < 100` | 用户在 Hero 区 |
| 品牌名点击回顶部 | JS `initBrandClick()` — `scrollTo({top:0, behavior:'smooth'})` | 点击 `.sidebar-name` 或 `.mobile-name` |
| 移动端菜单 | JS `initMobileMenu()` — 创建遮罩、toggle class | 点击汉堡按钮 / 遮罩 / 导航链接 |
| 卡片渐入动画 | JS `initScrollReveal()` — IntersectionObserver + CSS transition | 卡片进入视口 12% |
| 卡片 hover 效果 | CSS `:hover` — 阴影加深 + 上移 | 鼠标悬停卡片 |

### 渐入动画详情

- 目标元素：`.highlight-card`, `.timeline-card`, `.project-card`, `.skill-category`, `.stat-card`
- 初始状态：`opacity: 0; transform: translateY(20px)`
- 触发：元素进入视口 12%（`threshold: 0.12`）
- 动画：0.5s ease，index 递增延迟 0.04s（stagger 效果）
- 只触发一次（`observer.unobserve` 后不再触发）

---

## 九、如何更新内容

**场景：新简历或内容更新**

### 需要修改的文件

1. **`index.html`** — 主要修改：
   - `<title>` 和 `<meta name="description">`
   - 侧边栏 `.sidebar-role`（职位）
   - Hero 区：名字、职位、个人信息、联系方式、标签、统计数字
   - 各 Section 的内容（亮点卡片、时间线、项目卡片、技能标签）
   - 页脚

2. **`styles.css`** — 通常不需要改，除非：
   - 新增导航项（需要在 `.sidebar-nav` 里加链接）
   - 统计卡片数量不是 4 个（调整 `.stats-row` 的 `grid-template-columns`）

3. **`script.js`** — 通常不需要改

### 内容映射规则

| 简历内容 | HTML Section | 关键类名 |
|----------|-------------|----------|
| 基本信息 | Hero | `.hero-name`, `.hero-role`, `.hero-info`, `.hero-contact` |
| 目标岗位/薪资 | Hero tags | `.hero-tags` > `.tag-primary` / `.tag-highlight` |
| 关键数字 | Hero stats | `.stat-card` × 4 |
| 个人亮点 | `#highlights` | `.highlight-card` × N |
| 工作经历 | `#experience` | `.timeline-item` × N（倒序） |
| 项目经历 | `#projects` | `.project-card` × N |
| 技能 | `#skills` | `.skill-category` × N |

### 更新流程

1. 阅读本 `design-system.md` 理解设计规范
2. 阅读新简历内容（Markdown / DOCX）
3. 修改 `index.html`：替换各 section 中的文字内容
4. 保持 HTML 结构和 class 名不变
5. 在浏览器中预览确认

---

## 十、打印样式

`@media print` 中自动处理：
- 隐藏侧边栏、移动端横条、遮罩
- Hero 背景变白，文字变深色
- 标签从半透明/彩色底变成边框样式
- 卡片阴影变为边框
- Section 避免页内断行

---

## 十一、依赖

- **零外部依赖**。无 CSS 框架，无 JS 库，无构建工具。
- SVG 图标内联在 HTML 中（无图标库依赖）。
- 数字字体 `Inter` 依赖系统安装或 Google Fonts 自动加载（未显式引入，依赖系统回退）。
