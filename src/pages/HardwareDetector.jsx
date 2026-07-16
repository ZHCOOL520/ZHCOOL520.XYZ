import { Helmet } from 'react-helmet-async';
import BackLink from '../components/shared/BackLink.jsx';
import { FiGithub, FiCpu, FiHardDrive, FiMonitor, FiShield } from 'react-icons/fi';

const GITHUB_URL = 'https://github.com/ZHCOOL520/hardware-detector';

const features = [
  { icon: FiCpu, label: 'CPU 核心数检测与性能评级' },
  { icon: FiHardDrive, label: '内存大小检测与容量评估' },
  { icon: FiMonitor, label: 'GPU 型号识别与显存估算' },
  { icon: FiShield, label: '纯浏览器运行，数据不上传服务器' },
];

export default function HardwareDetector() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-900 via-slate-800 dark:to-indigo-900/20">
      <Helmet>
        <title>AI 电脑体检 | ZHCOOL520</title>
        <meta name="description" content="一键检测电脑硬件配置，评估本地 AI 应用部署能力，纯浏览器运行，隐私安全。" />
        <link rel="canonical" href="https://zhcool520.xyz/hardware-detector" />
        <meta property="og:title" content="AI 电脑体检" />
        <meta property="og:description" content="一键检测电脑硬件配置，评估本地 AI 应用部署能力" />
        <meta property="og:url" content="https://zhcool520.xyz/hardware-detector" />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-20 pb-12">
        <BackLink to="/" label="返回首页" hash="projects" />

        {/* 标题区 */}
        <div className="text-center mt-4 mb-8">
          <span className="inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-500/20 to-cyan-500/20 items-center justify-center text-3xl mb-4 shadow-sm">🖥️</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-neutral-800 dark:text-neutral-100 mb-3">AI 电脑体检</h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">你的电脑能跑本地 AI 吗？</p>
          <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed max-w-lg mx-auto">
            一键检测你的电脑硬件配置，评估是否适合在本地部署各类 AI 应用。支持语音生成、AI 换脸、声音克隆、AI 数字人、视频生成、音乐生成等 6 项 AI 任务的能力评估。
          </p>
          {/* 标签 */}
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {['HTML', 'JavaScript', 'AI', 'Hardware', 'MIT'].map(tag => (
              <span key={tag} className="px-2.5 py-1 text-xs rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 font-mono border border-neutral-200/60 dark:border-neutral-700/40">{tag}</span>
            ))}
          </div>
        </div>

        {/* 体检工具嵌入 */}
        <div className="flex justify-center mb-10">
          <div className="relative w-full max-w-lg rounded-[24px] overflow-hidden shadow-2xl shadow-sky-500/10 ring-1 ring-neutral-200 dark:ring-neutral-700 bg-black">
            <iframe
              src="/hardware-detector/index.html"
              title="AI 电脑体检"
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
                <f.icon className="text-sky-500 flex-shrink-0" size={16} />
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
            ⚡ 数据仅在你本地浏览器中检测，不会上传到任何服务器 · MIT 开源协议
          </p>
        </div>
      </div>
    </div>
  );
}