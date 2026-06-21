import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { FiDownload, FiMonitor, FiPackage, FiMusic, FiArrowRight } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const previewItems = [
  { icon: FiMonitor, label: 'Windows 镜像', accent: 'text-cyan-400' },
  { icon: FiPackage, label: 'MC 整合包', accent: 'text-purple-400' },
  { icon: FiMusic, label: '音乐转码', accent: 'text-pink-400' },
];

export default function ResourcePreview() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const header = el.querySelector('[data-anim="header"]');
    const cards = el.querySelectorAll('[data-anim="card"]');
    gsap.set(header, { opacity: 0, y: 20 });
    gsap.set(cards, { opacity: 0, y: 15 });
    const st1 = ScrollTrigger.create({ trigger: el, start: 'top 92%', onEnter: () => gsap.to(header, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }), once: true });
    const st2 = ScrollTrigger.create({ trigger: el, start: 'top 90%', onEnter: () => gsap.to(cards, { opacity: 1, y: 0, duration: 0.4, stagger: 0.12, ease: 'power2.out' }), once: true });
    return () => { st1.kill(); st2.kill(); };
  }, []);

  return (
    <section id="resources" ref={sectionRef} className="relative py-20 px-6 z-10">
      <div className="max-w-3xl mx-auto">
        <div data-anim="header" className="group relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-br from-cyan-400 via-purple-400 to-pink-400 opacity-40 group-hover:opacity-70 transition-opacity duration-500">
            <div className="h-full w-full rounded-3xl bg-light-100 dark:bg-dark-900" />
          </div>

          <div className="relative rounded-3xl glass-lg backdrop-blur-xl p-8 sm:p-10">
            <div className="flex items-start justify-between gap-6 mb-8">
              <div>
                <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-neon-cyan/5 border border-neon-cyan/10">
                  <FiDownload className="text-neon-cyan" size={14} />
                  <span className="text-[10px] font-mono text-neon-cyan tracking-widest uppercase">Downloads</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-2">
                  <span className="gradient-text">资源下载</span>
                </h2>
                <p className="text-neutral-700/60 dark:text-neutral-200/50 text-sm max-w-md">
                  Windows 系统镜像 · Minecraft 整合包 · 音乐转码工具
                </p>
              </div>
              <Link to="/resources" target="_blank" rel="noopener noreferrer" className="btn-primary">
                查看全部 <FiArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {previewItems.map((item, i) => (
                <Link key={i} to="/resources" target="_blank" rel="noopener noreferrer" data-anim="card">
                  <div className={`glass-card`}>
                    <div className={`w-10 h-10 mx-auto mb-2 rounded-xl bg-gradient-to-br ${item.accent.replace('text-', 'from-').replace('-400', '-500/20')} flex items-center justify-center`}>
                      <item.icon className={item.accent} size={20} />
                    </div>
                    <span className="text-xs text-neutral-700 dark:text-neutral-200 font-medium">{item.label}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
