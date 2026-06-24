import { Helmet } from 'react-helmet-async';
import BackLink from '../components/shared/BackLink.jsx';
import { FiGithub, FiSmartphone, FiDroplet, FiClock, FiDownload, FiSave, FiLayout } from 'react-icons/fi';

const GITHUB_URL = 'https://github.com/ZHCOOL520/2019-card';

const features = [
  { icon: FiLayout, label: '健康码 / 行程卡双模式切换' },
  { icon: FiDroplet, label: '5 种预设颜色 + 自定义颜色' },
  { icon: FiClock, label: '实时时间，精确到秒' },
  { icon: FiSmartphone, label: '移动端完美适配' },
  { icon: FiDownload, label: '一键保存高清 PNG 图片' },
  { icon: FiSave, label: '配置自动本地存储' },
];

export default function Tz2019Card() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-900 via-slate-800 dark:to-indigo-900/20">
      <Helmet>
        <title>健康码 & 行程卡 - 纪念版 | ZHCOOL520</title>
        <meta name="description" content="疫情时代的纪念，纯前端健康码/行程卡生成器，仅供纪念和娱乐用途。" />
        <link rel="canonical" href="https://zhcool520.xyz/2019-card" />
        <meta property="og:title" content="健康码 & 行程卡 - 纪念版" />
        <meta property="og:description" content="疫情时代的纪念，纯前端健康码/行程卡生成器" />
        <meta property="og:url" content="https://zhcool520.xyz/2019-card" />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-20 pb-12">
        <BackLink to="/" label="返回首页" hash="projects" />

        {/* 标题区 */}
        <div className="text-center mt-4 mb-8">
          <span className="inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500/20 to-green-500/20 items-center justify-center text-3xl mb-4 shadow-sm">💚</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-neutral-800 dark:text-neutral-100 mb-3">2019-card</h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">健康码 & 行程卡 · 纪念版</p>
          <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed max-w-lg mx-auto">
            疫情时代的纪念，纯前端生成器。高度还原健康码和行程卡样式，支持颜色自定义、实时时间、二维码生成、一键保存高清图片等功能。
          </p>
          {/* 标签 */}
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {['HTML', 'JavaScript', 'Tailwind CSS', 'GSAP', 'MIT'].map(tag => (
              <span key={tag} className="px-2.5 py-1 text-xs rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 font-mono border border-neutral-200/60 dark:border-neutral-700/40">{tag}</span>
            ))}
          </div>
        </div>

        {/* 手机预览 */}
        <div className="flex justify-center mb-10">
          <div className="relative w-full max-w-[414px] rounded-[24px] overflow-hidden shadow-2xl shadow-teal-500/10 ring-1 ring-neutral-200 dark:ring-neutral-700 bg-white">
            <iframe
              src="/2019-card/index.html"
              title="健康码 & 行程卡 - 纪念版"
              className="w-full border-0"
              style={{ height: '750px' }}
              loading="lazy"
            />
          </div>
        </div>

        {/* 功能特性 + GitHub 按钮 */}
        <div className="max-w-lg mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {features.map((f, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/60 dark:bg-neutral-800/40 border border-neutral-200/60 dark:border-neutral-700/40">
                <f.icon className="text-teal-500 flex-shrink-0" size={16} />
                <span className="text-sm text-neutral-600 dark:text-neutral-300">{f.label}</span>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl btn-primary text-sm font-medium">
              <FiGithub size={17} /><span>在 GitHub 上查看源码</span>
            </a>
          </div>
        </div>

        {/* 底部说明 */}
        <div className="text-center mt-10">
          <p className="text-xs text-neutral-400 dark:text-neutral-500">
            本项目仅供学习和纪念使用，不具有任何实际功能。MIT 开源协议。
          </p>
        </div>
      </div>
    </div>
  );
}
