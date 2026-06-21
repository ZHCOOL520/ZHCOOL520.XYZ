import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { FiDownload, FiMonitor, FiPackage, FiMusic, FiExternalLink, FiCheck } from 'react-icons/fi';
import PageLayout from '../components/shared/PageLayout.jsx';
import BackLink from '../components/shared/BackLink.jsx';

const config = {
  monitor: { accent: 'text-cyan-500', accentBg: 'bg-cyan-500/10', glow: 'group-hover:shadow-cyan-500/15', border: 'border-cyan-500/15 group-hover:border-cyan-500/30', iconBg: 'bg-gradient-to-br from-cyan-500 to-blue-500' },
  package: { accent: 'text-purple-500', accentBg: 'bg-purple-500/10', glow: 'group-hover:shadow-purple-500/15', border: 'border-purple-500/15 group-hover:border-purple-500/30', iconBg: 'bg-gradient-to-br from-purple-500 to-pink-500' },
  music: { accent: 'text-rose-500', accentBg: 'bg-rose-500/10', glow: 'group-hover:shadow-rose-500/15', border: 'border-rose-500/15 group-hover:border-rose-500/30', iconBg: 'bg-gradient-to-br from-rose-500 to-red-500' },
};

const downloads = [
  { icon: FiMonitor, title: 'Windows 系统镜像', subtitle: 'Win 11 · 10 · 8.1 · 7 · XP', desc: '从 Windows 11 到 Windows XP 全版本系统镜像合集，包含原版 ISO 和优化版本。', key: 'monitor', links: [{ label: '百度网盘', url: 'https://pan.baidu.com/s/1xTAtytZd8OgLfQPhRvcoqA', note: '提取码：2333', code: '2333', type: '百度网盘' }] },
  { icon: FiPackage, title: '我的世界整合包', subtitle: '原版增强 · 科技模组 · 魔法冒险', desc: '精选 Minecraft 整合包资源合集，涵盖多种玩法，一键安装即玩。', key: 'package', links: [{ label: '百度网盘', url: 'https://pan.baidu.com/s/1M-dmHBNFObMpkCnhRlfi0A?pwd=b2z2', note: '提取码：b2z2', code: 'b2z2', type: '百度网盘' }] },
  { icon: FiMusic, title: '音乐转码工具', subtitle: '酷狗 · QQ音乐 · 网易云', desc: '支持加密音乐文件转换为通用格式 MP3 / FLAC。', key: 'music', links: [{ label: '蓝奏云', url: 'https://wwavs.lanzouv.com/b01d70zyuh', note: '密码：2333', code: '2333', type: '蓝奏云' }] },
];

function DownloadLink({ link, accent, glow, accentBg }) {
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
    <a href={link.url} target="_blank" rel="noopener noreferrer" onClick={handleClick}
      className={`glass-light flex items-center justify-between px-5 py-4 rounded-xl transition-all duration-300 group ${glow}`}>
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg ${accentBg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
          {copied ? <FiCheck className={accent} size={17} /> : <FiDownload className={accent} size={17} />}
        </div>
        <div>
          <div className="font-semibold text-sm text-neutral-800 dark:text-neutral-100">{link.label}</div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className={`text-[11px] font-mono ${copied ? 'text-emerald-500' : 'text-neutral-500 dark:text-neutral-400'}`}>
              {copied ? `已复制 ✓` : link.note}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 font-mono">{link.type}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
        {copied ? <span className="text-[11px] text-emerald-500">已复制</span> : <><span className="text-[11px] text-neutral-500">打开</span><FiExternalLink className="text-neutral-400" size={14} /></>}
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

      <div ref={headerRef} className="text-center mb-16">
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full glass-light text-xs font-mono text-neutral-500 dark:text-neutral-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          Available Now
        </div>
        <h1 className="text-4xl sm:text-5xl font-black mb-4 tracking-tight text-gradient">资源下载</h1>
        <p className="text-neutral-500 dark:text-neutral-400 text-sm max-w-lg mx-auto">{'// 精选工具与资源合集 · 持续更新中'}</p>
      </div>

      <div ref={cardsRef} className="space-y-6">
        {downloads.map((item, i) => {
          const c = config[item.key];
          return (
            <div key={i} className={`glass-card p-0 overflow-hidden group transition-all duration-500 ${c.glow} ${c.border}`}>
              <div className="p-6 sm:p-8">
                <div className="flex items-start gap-5 mb-5">
                  <div className={`w-14 h-14 rounded-2xl ${c.iconBg} flex items-center justify-center flex-shrink-0 shadow-lg text-white`}>
                    <item.icon size={24} />
                  </div>
                  <div className="pt-0.5">
                    <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-1">{item.title}</h2>
                    <p className={`text-xs font-mono ${c.accent}`}>{item.subtitle}</p>
                  </div>
                </div>
                <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed mb-6 pl-[76px]">{item.desc}</p>
                <div className="h-px bg-gradient-to-r from-transparent via-neutral-200/50 dark:via-white/10 to-transparent mb-5" />
                <nav className="space-y-2">
                  {item.links.map((link, j) => (
                    <DownloadLink key={j} link={link} accent={c.accent} glow={c.glow} accentBg={c.accentBg} />
                  ))}
                </nav>
              </div>
            </div>
          );
        })}
      </div>

      <div ref={footerRef} className="mt-14 text-center">
        <p className="text-xs text-neutral-400 dark:text-neutral-500">{'// 所有资源来自网络，仅供学习交流'}</p>
      </div>
    </PageLayout>
  );
}
