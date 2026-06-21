import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { FiDownload, FiMonitor, FiPackage, FiMusic, FiExternalLink, FiCheck, FiCopy } from 'react-icons/fi';
import PageLayout from '../components/shared/PageLayout.jsx';
import BackLink from '../components/shared/BackLink.jsx';

const downloads = [
  { icon: FiMonitor, title: 'Windows 系统镜像', subtitle: 'Win 11 · 10 · 8.1 · 7 · XP', desc: '从 Windows 11 到 Windows XP 全版本系统镜像合集，包含原版 ISO 和优化版本，适用于系统重装、虚拟机部署等场景。', gradient: 'from-cyan-400 via-sky-500 to-blue-500', glow: 'shadow-cyan-400/20', accent: 'text-cyan-400', accentBg: 'bg-cyan-400/10', border: 'border-cyan-400/20 hover:border-cyan-400/40', iconBg: 'from-cyan-500/20 to-blue-500/20', links: [{ label: '百度网盘', url: 'https://pan.baidu.com/s/1xTAtytZd8OgLfQPhRvcoqA', note: '提取码：2333', code: '2333', type: '百度网盘' }] },
  { icon: FiPackage, title: '我的世界整合包', subtitle: '原版增强 · 科技模组 · 魔法冒险', desc: '精选 Minecraft 整合包资源合集，涵盖原版增强、科技模组、魔法冒险等多种玩法，一键安装即玩。', gradient: 'from-purple-400 via-fuchsia-500 to-pink-500', glow: 'shadow-purple-400/20', accent: 'text-purple-400', accentBg: 'bg-purple-400/10', border: 'border-purple-400/20 hover:border-purple-400/40', iconBg: 'from-purple-500/20 to-pink-500/20', links: [{ label: '百度网盘', url: 'https://pan.baidu.com/s/1M-dmHBNFObMpkCnhRlfi0A?pwd=b2z2', note: '提取码：b2z2', code: 'b2z2', type: '百度网盘' }] },
  { icon: FiMusic, title: '音乐转码工具', subtitle: '酷狗 · QQ音乐 · 网易云', desc: '支持将加密音乐文件（酷狗/QQ音乐/网易云）转换为通用格式 MP3 / FLAC，方便跨设备播放与收藏。', gradient: 'from-pink-400 via-rose-500 to-red-500', glow: 'shadow-pink-400/20', accent: 'text-pink-400', accentBg: 'bg-pink-400/10', border: 'border-pink-400/20 hover:border-pink-400/40', iconBg: 'from-pink-500/20 to-rose-500/20', links: [{ label: '蓝奏云', url: 'https://wwavs.lanzouv.com/b01d70zyuh', note: '密码：2333', code: '2333', type: '蓝奏云' }] },
];

function DownloadLink({ link, accent }) {
  const [copied, setCopied] = useState(false);

  const handleClick = useCallback(async (e) => {
    if (link.code) {
      e.preventDefault();
      try { await navigator.clipboard.writeText(link.code); } catch {
        const ta = document.createElement('textarea');
        ta.value = link.code; ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select();
        document.execCommand('copy'); document.body.removeChild(ta);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      window.open(link.url, '_blank', 'noopener noreferrer');
    }
  }, [link.code, link.url]);

  return (
    <a href={link.url} target="_blank" rel="noopener noreferrer" onClick={handleClick} className="group relative flex items-center justify-between px-6 py-5 rounded-2xl transition-all duration-300">
      <div className="absolute inset-0 rounded-2xl bg-white/[0.02] dark:bg-white/[0.02] group-hover:bg-white/[0.08] dark:group-hover:bg-white/[0.06] transition-colors pointer-events-none" />
      <div className={`absolute inset-0 rounded-2xl border border-transparent group-hover:shadow-[0_0_20px_rgba(0,240,255,0.08)] transition-all duration-300 pointer-events-none`} />
      <div className={`absolute left-0 top-3 bottom-3 w-[4px] rounded-full bg-gradient-to-b ${accent.replace('text-', 'from-').replace('-400', '-500')} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />
      <div className="relative flex items-center gap-5">
        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${accent.replace('text-', 'from-').replace('-400', '-500/20')} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          {copied ? <FiCheck className={accent} size={18} /> : <FiDownload className={accent} size={18} />}
        </div>
        <div>
          <div className={`font-semibold text-sm group-hover:${accent} transition-colors text-neutral-800 dark:text-neutral-100`}>{link.label}</div>
          <div className="flex items-center gap-2 mt-1">
            <span className={`text-[11px] font-mono ${copied ? 'text-neon-cyan' : 'text-neutral-700/50 dark:text-neutral-200/40'} transition-colors`}>
              {copied ? `已复制 ${link.code} ✓` : link.note}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-light-200/80 dark:bg-dark-600/80 text-neutral-700/50 dark:text-neutral-200/40 font-mono border border-light-300/30 dark:border-white/5">{link.type}</span>
          </div>
        </div>
      </div>
      <div className="relative flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
        {copied ? (<span className="text-[11px] font-mono text-neon-cyan">已复制</span>) : (<> <span className="text-[11px] font-mono text-neon-cyan">打开</span><FiExternalLink className="text-neon-cyan" size={15} /></>)}
      </div>
    </a>
  );
}

export default function Resources() {
  const headerRef = useRef(null);
  const cardsRef = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
    tl.fromTo(headerRef.current, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.5 })
      .fromTo(cardsRef.current?.children || [],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.12 },
        '+=0.1')
      .fromTo(footerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4 }, '+=0.1');
  }, []);

  return (
    <PageLayout maxWidth="max-w-3xl">
      <BackLink to="/" label="返回首页" />

      <div ref={headerRef} className="text-center mb-20">
        <div className="inline-flex items-center gap-3 mb-8 px-5 py-2.5 rounded-full border border-white/[0.08] dark:border-white/[0.06] bg-white/[0.03] dark:bg-white/[0.02] backdrop-blur-xl">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-neon-cyan" />
          </span>
          <span className="text-xs font-mono text-neon-cyan tracking-[0.2em] uppercase">Available Now</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black mb-5 tracking-tight">
          <span className="gradient-text">资源下载</span>
        </h1>
        <p className="text-neutral-700/50 dark:text-neutral-200/40 font-mono text-sm max-w-lg mx-auto leading-relaxed">
          {'// 精选工具与资源合集 · 持续更新中'}
        </p>
      </div>

      <div ref={cardsRef} className="space-y-8">
        {downloads.map((item, i) => (
          <div key={i} className={`group relative rounded-3xl overflow-hidden transition-all duration-500 ${item.glow}`}>
            <div className={`absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-br ${item.gradient} opacity-50 group-hover:opacity-100 transition-opacity duration-500`}>
              <div className="h-full w-full rounded-3xl bg-light-100 dark:bg-dark-900" />
            </div>
            <div className="relative rounded-3xl bg-light-100/80 dark:bg-dark-900/80 backdrop-blur-2xl p-7 sm:p-9">
              <div className="flex items-start gap-5 mb-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.iconBg} flex items-center justify-center flex-shrink-0 shadow-lg ${item.glow}`}>
                  <item.icon className={item.accent} size={28} />
                </div>
                <div className="pt-1">
                  <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100 mb-1.5">{item.title}</h2>
                  <p className={`text-xs font-mono ${item.accent} tracking-wide`}>{item.subtitle}</p>
                </div>
              </div>
              <p className="text-neutral-700/60 dark:text-neutral-200/50 text-sm leading-relaxed mb-7 pl-[84px]">{item.desc}</p>
              <div className="h-px bg-gradient-to-r from-transparent via-light-300/30 dark:via-white/10 to-transparent mb-6" />
              <nav aria-label={`${item.title} 下载链接`} className="space-y-2">
                {item.links.map((link, j) => (<DownloadLink key={j} link={link} accent={item.accent} />))}
              </nav>
            </div>
          </div>
        ))}
      </div>

      <div ref={footerRef} className="mt-16 text-center">
        <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full border border-white/[0.04] bg-white/[0.01]">
          <span className="text-neon-cyan/50 text-xs">⚡</span>
          <p className="text-xs text-neutral-700/40 dark:text-neutral-200/30 font-mono">
            {'// 所有资源来自网络，仅供学习交流，请于下载后 24 小时内删除'}
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
