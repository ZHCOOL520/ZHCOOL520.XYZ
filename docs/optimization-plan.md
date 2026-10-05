# zhcool520.xyz 优化计划：加载速度 · 页面布局 · 视觉效果

> 扫描范围：`index.html`、`src/**`、`public/**`、构建产物 `dist/**`（Vite 5 + React 18 + Tailwind 3 + GSAP 3）。
> 原则：**只改"长相"和"速度"，不改业务逻辑**——路由、数据、交互结果、埋点、点击行为全部保持不变。
> 每条都带 `文件:行号`，可以直接照做；按 P0 → P3 顺序执行，每批都能独立上线。

---

## 执行状态（首轮已完成）

**可回滚基线：** 改动全部停留在工作区，未提交。基线提交 `8bcb5cd`（分支 `main`）。
一条命令全部还原：`git checkout -- .`；想先存起来：`git stash`。

### 保底策略（每一条都已在代码里落地）

| 风险 | 保底做法 | 位置 |
| --- | --- | --- |
| 字体加载失败 / 被墙 / 被拦截 | 自托管 + `font-display: swap` + 完整的系统字体回落链，文字永远可读，不再有阻塞渲染的跨域请求 | `src/index.css` `@font-face`、`index.html` preload |
| 浏览器太旧不支持毛玻璃 | `@supports not (backdrop-filter…)` 时把玻璃面板换成接近不透明的底色，文字不糊 | `src/index.css` 末尾 |
| 动画触发器没触发（内容停在透明） | 路由挂载 2.5 秒后兜底：只把「视口内且仍被内联样式隐藏」的元素显示出来，绝不隐藏任何东西 | `src/App.jsx` `AnimationFailsafe` |
| 懒加载换出内容后滚动位置错乱 | 内容挂载后用动态 `import` 调一次 `ScrollTrigger.refresh()` | `src/components/LazyLoadSection.jsx` |
| 用户开启"减少动态效果" | 粒子画布不启动、鼠标光晕不启用，CSS 层再关掉所有常驻动画 | `ParticleBackground.jsx`、`MouseGlow.jsx`、`index.css` |
| 触摸设备（无鼠标） | 光晕由 CSS 隐藏且不挂监听；hover 才出现的按钮默认可见 | `index.css`、`index.css:pointer coarse`、各 CTA |
| 未开启 JavaScript | `index.html` 加 `<noscript>` 说明 + GitHub / B 站直链 | `index.html` |
| 构建失败 | 改动前记录基线提交；`npm run build` 每次全量校验，失败即回滚 | 本文件顶部 |

### 已完成

- **P0 全部**：12 处无效 Tailwind 类（`hover:scale-108`、`duration-400`、`text-gradient`、`glass`、`bg-light-100`、`dark-900`、`text-light-900`、`text-neon-cyan`、`dark:border-white/8`、缺失的 `group`）、页面底色收敛为 `.page-backdrop`、字体自托管（新增 `public/fonts/` 2 个文件 115 KB，删掉两条 Google Fonts 请求）、图片属性与 favicon（新增 `favicon-64.webp` 1.7 KB / `apple-touch-icon.png` 20 KB）、删除死代码 3 个文件与未使用图片 217 KB。
- **P1 大部分**：粒子背景（平方距离筛选 + DPR + 主题不每帧读 DOM + 后台暂停 + 面积算粒子数）、鼠标光晕（`quickTo` + 去掉与 GSAP 打架的 CSS transition）、去掉 `.btn-primary` / `.gradient-text` 的常驻动画（按钮保留 hover 播放）、玻璃模糊 24→14px、`LazyLoadSection` 去掉 100ms 延迟并 refresh、全站 Loading 从整屏改为细进度条、Navbar/ScrollToTopFab 滚动改 rAF 节流、`Typewriter` 的 `useGSAP`→`useEffect` 并修掉越界隐患。
- **P2 大部分**：Navbar 移动端抽屉 `max-h-[70vh] overflow-y-auto` + 安全区（`.nav-container` 用 `env()` 且保留原有 12px/8px 内边距）、锚点偏移统一成 100、`PageLayout` 顶部改 `pt-28`、窄屏统计栏与资源网格断点、触摸端 CTA 默认可见、`NotFound` 改用玻璃卡片 + `BackLink`、暗色对比度补 `dark:`。
- **P3 大部分**：4 处 GSAP 内联 transform 压住 Tailwind hover 的问题（改用 `clearProps: 'transform'`）、玻璃模糊与圆角刻度收敛（`.btn` 12px、`.tag` 药丸、`.btn-glass` 12px）、图标去重与尺寸统一、`SectionTitle` 的 `dark:text-white`/`gray-400` 修正、项目卡片 `<a>` 套 `<a>` 改为 `div + navigate`（点击行为不变，Tab 停靠点从 2 个变 1 个）、`Contact` 的 `hoverColor` 接上、手写 SVG 箭头换成 `FiChevronRight`、`meta.borderStrong` 取代字符串替换魔法。

### 仍待你确认（涉及行为改动，计划第六节）

`ThemeContext` 系统主题实时切换、`utils/gsapAnimations.js` 的 `scope: ref.current`（渲染期为 null）、`resources/index.jsx` 的 GSAP scope 与搜索后的残留样式。这三项属于"改逻辑"，需要你点头再动。

---

## 一、体检结果（实测数据）

| 项目 | 现状 | 说明 |
| --- | --- | --- |
| 产物总大小 | 979 KB（`dist`） | 其中 `public/` 占 424 KB |
| 单个 JS 最大块 | `react-vendor` 192.8 KB（gzip 63 KB） | React + Router + Helmet，正常 |
| GSAP 相关 | `gsap-vendor` 71.2 KB + `ScrollTrigger` 43.6 KB | 首屏就加载，Home 的 Hero/About/… 都 lazy，但 GSAP 是入口依赖 |
| CSS | 63.98 KB（gzip 10 KB） | 未 purge 的自定义类 + Tailwind |
| 外部字体请求链 | **2 条**（`index.html:8` Inter+JetBrains Mono，`index.css:1` @import Geist+Geist Mono） | 两条都是**渲染阻塞**；且 `@import` 是二级请求，`tailwind.config.js:22-25` 声明的 Inter 与 `index.css:72` 实际使用的 Geist 不一致——Inter 被下载了但没用上 |
| Google Fonts 可达性 | 中国大陆基本不可达 | 阻塞样式表会一直等到超时，首屏白屏时间被它主导 |
| 未使用的图片 | `public/images/video-highlights.jpg` **217 KB** | 全站无任何引用，占 `public` 的一半 |
| 图片属性 | 全站仅 4 个 `<img>`，**均无** `width/height/decoding`，仅 1 处 `loading="lazy"` | 首屏头像与视频缩略图会贡献 CLS |
| 常驻动画 | canvas 粒子 + 鼠标光晕 + 6 组 `infinite` CSS 动画 | 全路由常驻，与页面是否可见无关 |
| `prefers-reduced-motion` | **0 处** | 无障碍与低端机耗电都有影响 |

---

## 二、P0：零风险、见效最快（建议第一批，约半天）

### 2.1 修掉"写了但不生效"的 Tailwind 类
这些类根本不存在于 Tailwind 默认刻度里，写了等于没写，改一个词就能拿回效果：

| 位置 | 现在 | 改成 |
| --- | --- | --- |
| `src/components/shared/AnimatedLink.jsx:15` | `hover:scale-108` | `hover:scale-105` |
| `src/pages/TzXyz.jsx:365,370,375,380` | `hover:scale-108` | `hover:scale-105` |
| `src/pages/TzXyz.jsx:401,432`、`src/pages/XiGua.jsx:155` | `duration-400` | `duration-300`（或 500） |
| `src/components/ResourcePreview.jsx:70,77`、`src/components/Skills.jsx:61` | `duration-400` | `duration-300` |
| `src/pages/resources/index.jsx:51` | `text-gradient` | `gradient-text`（`index.css:295` 定义的是后者，"资源下载"标题现在渲染成灰底字） |
| `src/components/shared/GlassCard.jsx:3` | `glass` | `glass-effect`（`glass` 不存在，卡片完全没有玻璃底） |
| `src/components/shared/NotFound.jsx:8,9` | `text-light-900` / `text-neon-cyan` | `text-neutral-800 dark:text-neutral-100` / `text-indigo-500 dark:text-indigo-400` |
| `src/components/shared/PageLayout.jsx:6` | `bg-light-100 dark:bg-dark-900` | 删掉，或与 App 一致（见 2.2） |
| `src/pages/TzResources.jsx:201` | `dark:border-white/8` | `dark:border-white/10` |
| `src/components/ResourceCard.jsx:9,11` | 子元素用 `group-hover:scale-110` 但根节点没有 `group` | 在 `:9` 的 `<Link>` 上加 `group` |

### 2.2 统一页面背景（这是"子页面像另一个站"的根因）
`PageLayout.jsx:6` 的 `bg-light-100 dark:bg-dark-900` 两个 token 都不存在，包装层实际是透明的，于是各页自己造背景：`TzXyz.jsx:307` 和 `2019Card.jsx:18` 用 slate→indigo 渐变，`TzResources.jsx:93`、`XiGua.jsx:66` 干脆没有背景。
**改法**：把 App 的渐变（`App.jsx:84`）提升为 `index.css` 里的 `.page-backdrop`，`PageLayout`、`TzXyz`、`2019Card` 都复用它，删掉各页自建渐变。行为不变，视觉立刻统一。

### 2.3 字体：一条链、自托管、不再阻塞
1. 删掉 `index.css:1` 的 `@import`，只保留 `index.html` 里一条 `<link>`；
2. 在 `index.html` 加 `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`；
3. 把字体族统一：`tailwind.config.js:23` 的 `sans` 改成实际使用的 `Geist`，或反过来把 `index.css:72` 改成 `Inter`——**二选一，不要两套都下**；
4. 国内访问优先方案：把 Geist / Geist Mono 的 woff2 子集自托管到 `public/fonts/`，用 `font-display: swap` 声明 `@font-face`。这一个改动通常能砍掉首屏 1–3 秒的等待。

### 2.4 图片
- 删掉未引用的 `public/images/video-highlights.jpg`（-217 KB）；
- 给 4 个 `<img>` 补 `width` / `height` / `decoding="async"`：`TzXyz.jsx:329`（avatar）、`TzXyz.jsx:404`（视频缩略图）、`Hero.jsx:54`、`About.jsx:63`（fox）；
- `TzXyz.jsx:404` 的视频缩略图加 `loading="lazy"`；
- `public/images/fox.webp` 45 KB 用作 favicon（`index.html:5`）偏大，可另出一张 64×64 的图标。

### 2.5 清理死代码（不影响任何行为）
`src/utils/colors.js`（无引用，且用字符串拼接生成类名，Tailwind 扫不到）、`shared/GlassCard.jsx`、`shared/AnimatedButton.jsx`、`ParticleBackground.jsx:23-28` 的 `Particle.draw`、`Hero.jsx:60-67` 里永远为真的 `Typewriter ? … :` 分支、`Contact.jsx:12-16` 从未被读取的 `hoverColor`、`SectionTitle.jsx:8` 的 `light` prop。

---

## 三、P1：首屏与滚动性能（建议第二批）

### 3.1 粒子背景 `ParticleBackground.jsx`（最大的一处常驻开销）
- `:61-73` 每帧对最多 80 个粒子做 O(n²)（3160 对）`Math.sqrt` 距离计算，并对每对近邻各画一次线段。**改法**：用平方距离比较 `dx*dx + dy*dy < 10000` 去掉全部开方；粒子数按面积而非宽度计算（`:44`）。
- `:49` 每帧读 `document.documentElement.classList`（强制样式回读）。`:35` 已经解构了 `resolvedTheme` 却没用——换成 `useLayoutEffect` 依赖 `resolvedTheme` 预先算好 `particleAlpha/lineAlpha`。
- `:41-42` 画布后备缓冲按 CSS 像素设置，HiDPI 屏上是糊的：乘 `Math.min(devicePixelRatio, 2)` 并 `ctx.scale`。
- `:79-85` resize 未节流、不重算粒子；`:23-28` 的 `draw()` 是死代码。
- 增加：`document.hidden` 时暂停、画布不可见时暂停、`prefers-reduced-motion` 时只画静态帧。

### 3.2 鼠标光晕 `MouseGlow.jsx`
- `:17-21` 每个 `mousemove` 直接 `gsap.set`：换成 `gsap.quickTo(glow, 'x', {duration: 0.08})`，120–1000 Hz 鼠标下差别明显；
- `index.css:373` 的 `.mouse-glow { transition: transform .08s }` 与 GSAP 的写值**互相打架**，删掉它；
- `index.css:366` 是 `z-index:9999` + 450×450 的 `mix-blend-mode: screen` 全屏混合层：加 `@media (pointer: coarse){ display:none }`，触摸设备直接不挂监听；
- `:28` 的 `document.mouseleave` 不可靠，换成 `window` 的 `blur` / `documentElement`。

### 3.3 常驻无限动画收敛
`index.css` 里 6 处 `infinite`：`gradient-shift`（`:209,301`）、`shimmer`（`:338`）、`float`（`:380`）、`pulse-glow`（`:392`）、`hover-lift`（`:396`）。其中 `.btn-primary` 与 `.gradient-text` 的 `background-position` 动画是**绘制型**属性，会持续触发重绘。**改法**：按钮/标题改为静态渐变或只在 hover 时动画；`Hero.jsx:29-31` 的三个 `blur-3xl` 浮动光斑减到 2 个；全部包进 `@media (prefers-reduced-motion: reduce)` 的关闭分支。

### 3.4 玻璃效果的代价
全站 59 处使用 `liquid-glass*` / `glass-*`，`index.css` 里 12 处 `backdrop-filter`。每个模糊层都要独立合成，低端机上滚动容易掉帧。**改法**：把模糊半径从 16–32px 降到 10–14px（视觉差别很小），只对视口内的浮层（Navbar、FAB、模态）保留大半径；必要时给卡片加 `transform: translateZ(0)` 提升为独立层。

### 3.5 懒加载与占位
- `LazyLoadSection.jsx:26-31` 有硬编码 100ms 延迟 + 把 `h-64` 占位换成真实内容，会造成明显布局跳动，而且**子组件的 ScrollTrigger 不会重新计算**，进场动画在错误的滚动位置触发。**改法**：去掉延迟，挂载后调用一次 `ScrollTrigger.refresh()`；`min-h-[200px]`（`:34`）与 `h-64` 占位双重占位（约 456px）合成一个高度；占位底色与 `App.jsx:51` 统一成 `/30`。
- `App.jsx:89` 的全局 `Loading` 是 `min-h-screen` 全屏 spinner，任何一个小 chunk 都会整屏闪一下：换成顶部细进度条或空占位。
- 可加：`Navbar` 链接 hover 时 `import()` 预取对应路由 chunk，点进去几乎瞬时。

### 3.6 滚动/指针事件
`Navbar.jsx:93`、`ScrollToTopFab.jsx:11` 的滚动监听未节流，`MouseGlow` 的指针监听同上：统一用 `requestAnimationFrame` 批处理（滚动里 React 本身会 bail out，但因为同时读 `scrollY` 仍在每帧触发布局查询）。
`Navbar.jsx:103-109` 的 `setTimeout(100)` 重试没有在卸载时清理；`ScrollToTopFab.jsx:10-14` 把纯 DOM 逻辑包在 `useGSAP` 里、`Typewriter.jsx:9` 用 `useGSAP` 跑 `setTimeout`——都该换成 `useEffect`。

---

## 四、P2：布局与响应式（建议第三批）

### 4.1 统一容器与节奏
现在存在三套内容宽度与内边距：首页 `max-w-7xl / py-32`、`PageLayout.jsx:7` `max-w-4xl / py-20`、Navbar `max-w-7xl`。而且 `py-20`（80px）顶着约 70px 的固定导航太紧。**改法**：定义一组约定（列表页 `max-w-4xl`、展示页 `max-w-7xl`、`pt-28` 起），在 `PageLayout` 里统一，各页不再自己写。

### 4.2 移动端会挤爆/溢出的地方
- `XiGua.jsx:102` 三列统计栏在 360px 宽下每格约 96px，`grid-cols-3` 从不折叠 → `grid-cols-1 sm:grid-cols-3` 或缩字号；
- `TzResources.jsx:218` 的 `sm:grid-cols-3` 在 640px 宽时每列约 200px，标题会被压成一列一列的字；
- `ResourceCard.jsx:16,26` 长标题 + `flex-shrink-0` 的分类药丸在 360px 下溢出 → 标题加 `line-clamp-2`、药丸允许换行；
- `TzXyz.jsx:442`、`XiGua.jsx:216,226` 等 `text-neutral-400` 缺 `dark:` 对应值，暗色下对比度不足（< WCAG AA 4.5:1），补 `dark:text-neutral-500`；`Footer.jsx:13` 的 `dark:text-neutral-500` 反过来要改成 `dark:text-neutral-400`。

### 4.3 触摸端不可见的 CTA
`XiGua.jsx:167,187`、`TzResources.jsx:242,270,286`、`resources/components/DownloadButton.jsx:42` 的"立即下载 / 观看视频"是 `opacity-0 group-hover:opacity-100`，手机上永远看不见。**改法**：`opacity-100 sm:opacity-0`（桌面保留 hover 效果）。

### 4.4 固定元素与层级
- `Navbar.jsx:175` 的移动端抽屉没有 `max-h` / `overflow-y-auto`，568px 高的手机上后面的链接和设置项会被裁掉：加 `max-h-[70vh] overflow-y-auto`，并补 `pb-[env(safe-area-inset-bottom)]`；固定导航本身也该加 `pt-[env(safe-area-inset-top)]`；
- 层级没有规范：`.nav-container` 和 `ScrollToTopFab` 都是 `z-50`，`.mouse-glow` 是 `z-9999`。写进注释形成 `10/20/50/60/9999` 的层级表；
- `ScrollToTopFab.jsx:31` 把 `glass-card-sm`（内含 `p-4`）塞进 44×44 的盒子，18px 图标会顶着内边距：换成 `glass-effect` + `rounded-full`，或把尺寸放大到 48px；位置 `bottom-24 right-8` 在窄屏会盖住页脚文字，改 `right-4 sm:right-8`。

### 4.5 锚点与滚动偏移不一致
`Navbar.jsx:112` 硬编码 `- 85`，而 `index.css:66` 是 `scroll-padding-top: 100px`。统一到一个常量（建议 100），否则点导航跳转会被标题挡住一截。

---

## 五、P3：美观一致性（建议第四批，可与其他批并行做视觉回归）

### 5.1 GSAP 内联 transform 让 Tailwind hover 失效（4 处同源问题）
`About.jsx:39` 写入内联 `transform`，导致 `About.jsx:62` 的 `hover:-translate-y-3 hover:scale-[1.05]` 永远不生效；同样的问题在 `Projects.jsx:30/42`、`Skills.jsx:36/56`、`ResourcePreview.jsx:32/70`。**改法**：GSAP 只负责入场（改成写 `opacity` 或用 `gsap.fromTo` 后 `clearProps: 'transform'`），或者把 hover 类挪到外层包裹元素。**这是视觉收益最大的一条**。

### 5.2 玻璃变体与圆角收敛
现在有 `glass-effect` / `glass-card` / `glass-card-sm` / `liquid-glass` / `liquid-glass-light` / `liquid-glass-strong` 六种，同一角色（卡片、按钮底、浮层）在不同页面用不同变体，`liquid-glass-strong` 在页面里几乎没用过。圆角同时存在 `rounded-full / 2xl / xl / lg` + `.tag` 10px + `.btn` 14px。
**改法**：卡片= `liquid-glass`，次级= `liquid-glass-light`，浮层/激活态= `liquid-glass-strong`；圆角定为 容器 24px / 卡片 16px / 控件 12px / 药丸 full，写进 `index.css` 注释并逐页替换。

### 5.3 图标与排版尺度
同一"卡片图标"角色出现 14/15/16/18/22/24/32 七种尺寸、三种表现（react-icons / emoji / 字面量 `⭐`），容器有 `w-12` 和 `w-14` 两种。**改法**：列表卡图标 20、区块标题图标 18、空状态 28，emoji 一律换成 react-icons（`Projects.jsx:43`、`Skills.jsx` 的品牌色块）。

### 5.4 文案与标题样式对齐
`SectionTitle.jsx:29` 用 `dark:text-white`、`:33` 用 `dark:text-gray-400`（`gray` 不是本项目覆盖过的 slate 系 `neutral`），与其他标题的 `dark:text-neutral-100` 不一致；`NotFound.jsx` 完全没有用 `liquid-glass` / `SectionTitle` / `BackLink`，404 页看起来不属于这个站。

### 5.5 其他小项
- `Projects.jsx:42` 的卡片是 `<Link>` 里套 `<a>`（`:57`、`:61`），属于无效 HTML、会产生两个 Tab 停靠点：卡片改 `div`，标题用 `Link`，操作按钮保持 `<a>`；
- `Contact.jsx:59-61` 手写 SVG 箭头，改用已在用的 `FiChevronRight`；
- `Tags`：`Projects.jsx:48` 用 `rounded-full` 药丸，而 `index.css:341` 定义的 `.tag`（10px 圆角）没人用，二选一；
- `TzXyz.jsx:513,521`、`ProjectDetail.jsx:77` 等 `target="_blank"` 缺 `rel="noopener noreferrer"`（`ProjectDetail` 已有，其余补齐）。

---

## 六、需要"改逻辑"才能修的 Bug（**单独确认后再动**，不属于本次视觉优化）

1. **暗色模式不跟随系统实时切换**：`ThemeContext.jsx:37-39` 在系统主题变化时 `setTheme('system')` 传的是同一个值，React 直接 bail out。需要多一个 `systemTheme` state。
2. **`gsapAnimations.js` 的 scope 传空**：`:13,20` 用 `scope: ref.current`，渲染期 ref 还是 `null`；并且 `:37,55` 的依赖里含 `delay/duration`，参数变化会把已显示的元素重新隐藏。
3. **首页 `LazyLoadSection` 切换后 ScrollTrigger 未刷新**（见 3.5），会造成"动画不触发/卡在透明"的观感问题。
4. **`/2019-card` 存在两份实现**：`src/pages/2019Card.jsx`（React 路由）与 `public/2019-card/index.html`（独立静态页）。静态文件会抢先生效，所以线上的"示例"是静态页，React 那份在线上其实访问不到（开发环境才会走 React 版本）。当前行为没问题，但要么保留这个事实、要么统一，别在不知情的情况下改。
5. **`resources/index.jsx:27-39`**：`scope: headerRef` 却对 filterRef/gridRef/footerRef 做动画，且搜索框输入时不会重跑动画，会残留上一轮的 GSAP 内联样式。

---

## 七、验证方式（每批上线前）

1. `npm run build` 对比产物大小（当前基准：979 KB / CSS 63.98 KB / react-vendor 192.8 KB）；
2. 本地 `npm run dev` + 生产 `npm run preview` 各过一遍 5 个关键路由：`/`、`/resources/minecraft-pack`、`/projects`、`/tz`、`/xigua`，重点看 360px 宽；
3. Lighthouse（移动端 + 桌面端）记录 Performance / CLS / LCP 三项，作为批次回归基线；
4. 出厂前关掉 `prefers-reduced-motion` 和开启系统暗色，各截图一次；
5. 所有改动只允许"类名 / 样式 / 属性"级别的 diff，出现 JSX 结构或数据改动时单独走一次 review。

## 八、建议排期

| 批次 | 内容 | 风险 | 预期收益 |
| --- | --- | --- | --- |
| P0 | 无效类名、背景统一、字体自托管、图片属性、删死代码 | 极低 | 首屏 LCP 通常 -1~3s（字体），CLS 明显下降 |
| P1 | 粒子/光晕/无限动画/玻璃/懒加载/滚动节流 | 低（逐项可回滚） | 滚动帧率与低端机耗电改善最大 |
| P2 | 容器与节奏、移动端溢出、触摸端 CTA、安全区、层级 | 中（涉及布局） | 移动端可用性质变 |
| P3 | hover 冲突、玻璃/圆角/图标尺度、标题与 404 对齐 | 低但改动面广 | 观感一致性，最"值钱"的一批 |

> 全程遵守"不改变原本逻辑"：以上没有任何一条要求改动路由、数据结构、接口调用或交互结果。
