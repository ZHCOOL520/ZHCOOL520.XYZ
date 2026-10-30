import { Helmet } from 'react-helmet-async';
import BackLink from '../components/shared/BackLink.jsx';
import { FiExternalLink, FiTarget, FiMove, FiRotateCw, FiActivity, FiCpu, FiMaximize2, FiStar } from 'react-icons/fi';

const DEMO_URL = '/precision-touchpad-lab/index.html';

const features = [
  { icon: FiTarget, label: '精准指针检测：pointerType / 接触面积 / 压力' },
  { icon: FiMove, label: '双指捏合缩放，实时显示缩放倍数' },
  { icon: FiRotateCw, label: '双指旋转，测试卡跟随角度变化' },
  { icon: FiActivity, label: '压力与接触面积分层读取' },
  { icon: FiCpu, label: '单指轨迹平滑度与采样率统计' },
  { icon: FiMaximize2, label: '六维加权评分 + S/A/B/C/D 等级' },
];

const dims = [
  ['精准信号', '22%', '100'],
  ['手势覆盖', '22%', '100'],
  ['轨迹连续', '18%', '96'],
  ['采样率', '16%', '95'],
  ['多点触控', '10%', '100'],
  ['压力分层', '12%', '92'],
];

export default function PrecisionTouchpadLab() {
  return (
    <div className="min-h-screen page-backdrop">
      <Helmet>
        <title>Precision Touchpad Lab · Windows 触控板素质测试台 | ZHCOOL520</title>
        <meta name="description" content="Windows 触控板素质测试台：检查是否为精准触控板，测试捏合、旋转、压力与轨迹，六维加权评分并对标 MacBook Pro。纯前端，数据不离开本机。" />
        <link rel="canonical" href="https://zhcool520.xyz/precision-touchpad-lab" />
        <meta property="og:title" content="Precision Touchpad Lab · Windows 触控板素质测试台" />
        <meta property="og:description" content="双指捏合 / 旋转 / 压力 / 轨迹检测，六维加权评分并对标 MacBook Pro 触控板。" />
        <meta property="og:url" content="https://zhcool520.xyz/precision-touchpad-lab" />
      </Helmet>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-12">
        <BackLink to="/" label="返回首页" hash="projects" />

        {/* 标题区 */}
        <div className="text-center mt-4 mb-8">
          <span className="inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 items-center justify-center text-3xl mb-4 shadow-sm">🖱️</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-neutral-800 dark:text-neutral-100 mb-3">Precision Touchpad Lab</h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">Windows 触控板素质测试台 · 示例项目</p>
          <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed max-w-2xl mx-auto">
            判断手边的 Windows 触控板是不是<strong className="text-neutral-800 dark:text-neutral-100">精准触控板</strong>，测试双指捏合、旋转、压力与轨迹平滑度，
            六维加权评分后与 MacBook Pro 触控板逐项对标。全静态页面，不需要服务器、不联网，数据不离开本机。
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {['HTML', 'JavaScript', 'CSS', 'Pointer Events', '零依赖'].map(tag => (
              <span key={tag} className="px-2.5 py-1 text-xs rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 font-mono border border-neutral-200/60 dark:border-neutral-700/40">{tag}</span>
            ))}
          </div>
        </div>

        {/* 在线示例：直接内嵌静态页面 */}
        <div className="relative rounded-[24px] overflow-hidden shadow-2xl shadow-cyan-500/10 ring-1 ring-neutral-200 dark:ring-neutral-700 bg-neutral-950">
          <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3 bg-neutral-900/95 border-b border-white/10">
            <div className="flex items-center gap-2 min-w-0">
              <span className="flex gap-1.5 flex-shrink-0" aria-hidden="true">
                <i className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                <i className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                <i className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
              </span>
              <span className="text-xs text-neutral-400 font-mono truncate">/precision-touchpad-lab/index.html</span>
            </div>
            <a
              href={DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-200 bg-white/10 hover:bg-white/20 transition-colors flex-shrink-0"
            >
              <FiExternalLink size={13} /><span>新窗口打开</span>
            </a>
          </div>
          <iframe
            src={DEMO_URL}
            title="Precision Touchpad Lab · Windows 触控板素质测试台"
            className="w-full border-0 block h-[720px] sm:h-[980px]"
            loading="lazy"
            allow="fullscreen; clipboard-write"
          />
        </div>
        <p className="text-xs text-neutral-400 dark:text-neutral-500 text-center mt-3">
          示例在下方直接运行，和健康码纪念版一样是独立静态页面；用触摸屏 / 触控板做手势测试效果最好。
        </p>

        {/* 功能特性 */}
        <div className="max-w-3xl mx-auto mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {features.map((f, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/60 dark:bg-neutral-800/40 border border-neutral-200/60 dark:border-neutral-700/40">
                <f.icon className="text-cyan-500 flex-shrink-0" size={16} />
                <span className="text-sm text-neutral-600 dark:text-neutral-300">{f.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 评分与对标 */}
        <div className="max-w-3xl mx-auto mt-10">
          <h2 className="flex items-center gap-2 text-lg font-bold text-neutral-800 dark:text-neutral-100 mb-4">
            <FiStar className="text-cyan-500" /> 六维加权 · 对标 MacBook Pro
          </h2>
          <div className="glass-card p-0 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-neutral-500 dark:text-neutral-400 border-b border-neutral-200/60 dark:border-neutral-700/40">
                  <th className="px-4 py-2.5 font-medium">维度</th>
                  <th className="px-4 py-2.5 font-medium">权重</th>
                  <th className="px-4 py-2.5 font-medium">苹果基线</th>
                </tr>
              </thead>
              <tbody>
                {dims.map(([name, weight, base]) => (
                  <tr key={name} className="border-b border-neutral-200/40 dark:border-neutral-700/20 last:border-0">
                    <td className="px-4 py-2.5 text-neutral-700 dark:text-neutral-200">{name}</td>
                    <td className="px-4 py-2.5 text-neutral-500 dark:text-neutral-400 font-mono">{weight}</td>
                    <td className="px-4 py-2.5 text-neutral-500 dark:text-neutral-400 font-mono">{base}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-3 leading-relaxed">
            只把已测到的维度纳入加权，没测的不会拉低分数。等级：S ≥ 90、A ≥ 80、B ≥ 68、C ≥ 52、D 更低。
            材质、震动反馈与表面摩擦力浏览器读不到，不计入评分。
          </p>
        </div>

        {/* 操作提示 */}
        <div className="max-w-3xl mx-auto mt-8 glass-card">
          <h3 className="text-sm font-semibold text-neutral-800 dark:text-neutral-100 mb-2">操作提示</h3>
          <ul className="text-xs text-neutral-500 dark:text-neutral-400 space-y-1.5 leading-relaxed">
            <li>▸ 双指在测试区捏合 / 张开 / 旋转，右侧「测试项」会自动亮起通过、部分或未通过。</li>
            <li>▸ 单指按住画圈或画斜线，观察轨迹是否连续、有无断点。</li>
            <li>▸ 键盘 <kbd className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 font-mono">+</kbd>/<kbd className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 font-mono">-</kbd> 缩放，
              <kbd className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 font-mono">[</kbd>/<kbd className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 font-mono">]</kbd> 旋转，
              <kbd className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 font-mono">R</kbd> 重置，
              <kbd className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 font-mono">F</kbd> 全屏，
              <kbd className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 font-mono">0</kbd> 复位。</li>
            <li>▸ 普通鼠标的 pointerType 是 mouse，捏合与旋转不会生效，页面会给出「未通过」的判定。</li>
          </ul>
        </div>

        {/* 底部说明 */}
        <div className="text-center mt-10">
          <a
            href={DEMO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-medium hover:scale-[1.02] transition-transform shadow-lg shadow-cyan-500/20"
          >
            <FiExternalLink size={16} /> 独立页面打开示例
          </a>
          <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-4">
            示例项目 · Windows 触控板素质测试台 · 纯前端，所有测试数据只留在本机。
          </p>
        </div>
      </div>
    </div>
  );
}
