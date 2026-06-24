import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { FiMonitor, FiTerminal, FiPackage, FiArrowRight, FiChevronRight, FiDatabase } from 'react-icons/fi';
import { resourceList, categories, categoryMeta } from '../pages/resources/data/index.js';
import SectionTitle from './shared/SectionTitle.jsx';

gsap.registerPlugin(ScrollTrigger);

const catIcons = { system: FiMonitor, software: FiTerminal, games: FiPackage };

export default function ResourcePreview() {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);
  const btnRef = useRef(null);
  const noteRef = useRef(null);

  useGSAP(() => {
    const cards = cardsRef.current?.children;
    if (!cards?.length) return;
    gsap.set(cards, { autoAlpha: 0, y: 60, scale: 0.92 });
    gsap.set(btnRef.current, { autoAlpha: 0, y: 20 });
    gsap.set(noteRef.current, { autoAlpha: 0, x: -20 });

    const st = ScrollTrigger.create({
      trigger: sectionRef.current, start: 'top 88%',
      onEnter: () => {
        gsap.to(cards, {
          autoAlpha: 1, y: 0, scale: 1,
          duration: 0.6, stagger: 0.15, ease: 'power3.out',
        });
        gsap.to(noteRef.current, { autoAlpha: 1, x: 0, duration: 0.5, delay: 0.3, ease: 'power3.out' });
        gsap.to(btnRef.current, { autoAlpha: 1, y: 0, duration: 0.5, delay: 0.4, ease: 'back.out(1.5)' });
      },
      once: true,
    });
    return () => st.kill();
  }, { scope: sectionRef });

  return (
    <section id="resources" ref={sectionRef} className="relative py-20 px-6 z-10">
      <div className="max-w-5xl mx-auto">
        <SectionTitle title="资源下载" subtitle="// 精选工具与资源合集 · 持续更新中" />
        
        {/* 说明提示 */}
        <div ref={noteRef} className="liquid-glass-light rounded-xl p-4 mb-8 flex items-start gap-3">
          <FiDatabase className="text-indigo-500 mt-0.5 flex-shrink-0" size={18} />
          <div className="text-sm">
            <span className="font-semibold text-neutral-800 dark:text-neutral-100">说明：</span>
            <span className="text-neutral-600 dark:text-neutral-400">
              本站资源由站长搜集整理，与各内容创作者（如天真SkyerNovie）无关。资源仅供学习交流，请支持正版软件。
            </span>
          </div>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {categories.map(cat => {
            const meta = categoryMeta[cat.id];
            const items = resourceList.filter(r => r.category === cat.id);
            const first = items[0];
            const IconComp = catIcons[cat.id];
            const topBorder = `border-t-2 ${meta.border.replace('/15', '/30')}`;

            return (
              <Link 
                key={cat.id} 
                to={first ? `/resources/${first.id}` : '/resources'}
                className={`group relative liquid-glass rounded-2xl p-6 transition-all duration-400 hover:-translate-y-3 hover:scale-[1.02] ${topBorder} hover:shadow-2xl hover:shadow-indigo-500/15`}
              >
                {/* 渐变背景动画 */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div className="relative">
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`w-14 h-14 rounded-xl ${meta.iconBg} flex items-center justify-center shadow-lg text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-400`}>
                      <IconComp size={24} />
                    </div>
                    <span className={`text-[11px] px-3 py-1.5 rounded-full ${meta.accentBg} ${meta.accent} font-mono font-semibold`}>
                      {items.length} 个资源
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-2 group-hover:text-indigo-500 transition-colors">
                    {cat.label}
                  </h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed min-h-[3rem]">
                    {items.slice(0, 2).map(r => r.title).join('、')}
                    {items.length > 2 && ` 等${items.length}个资源`}
                  </p>

                  {first && (
                    <div className="flex items-center gap-3 mt-4 pt-3 border-t border-neutral-100/80 dark:border-white/8">
                      {first.size && <span className="text-xs font-mono text-neutral-400">{first.size}</span>}
                      {first.updated && <span className="text-xs text-neutral-400">更新于 {first.updated}</span>}
                    </div>
                  )}

                  <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-indigo-500 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-8px] group-hover:translate-x-0">
                    <span>浏览资源</span>
                    <FiChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div ref={btnRef} className="text-center">
          <Link to="/resources"
            className="inline-flex items-center gap-3 liquid-glass rounded-xl px-8 py-3.5 text-sm font-semibold text-neutral-700 dark:text-neutral-200 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl hover:text-indigo-500 group">
            <span>查看全部资源</span>
            <FiArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
