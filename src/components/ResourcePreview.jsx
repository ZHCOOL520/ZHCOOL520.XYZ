import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { FiMonitor, FiTerminal, FiPackage, FiArrowRight, FiChevronRight } from 'react-icons/fi';
import { resourceList, categories, categoryMeta } from '../pages/resources/data/index.js';
import SectionTitle from './shared/SectionTitle.jsx';

gsap.registerPlugin(ScrollTrigger);

const catIcons = { system: FiMonitor, software: FiTerminal, games: FiPackage };

export default function ResourcePreview() {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);
  const btnRef = useRef(null);

  useGSAP(() => {
    const cards = cardsRef.current?.children;
    if (!cards?.length) return;
    gsap.set(cards, { autoAlpha: 0, y: 80, scale: 0.6, rotation: -8 });
    gsap.set(btnRef.current, { autoAlpha: 0, y: 20 });

    const st = ScrollTrigger.create({
      trigger: sectionRef.current, start: 'top 88%',
      onEnter: () => {
        gsap.to(cards, {
          autoAlpha: 1, y: 0, scale: 1, rotation: 0,
          duration: 0.7, stagger: 0.15, ease: 'elastic.out(1, 0.2)',
        });
        gsap.to(btnRef.current, { autoAlpha: 1, y: 0, duration: 0.5, delay: 0.35, ease: 'back.out(2.5)' });
      },
      once: true,
    });
    return () => st.kill();
  }, { scope: sectionRef });

  return (
    <section id="resources" ref={sectionRef} className="relative py-20 px-6 z-10 overflow-hidden">
      <div className="absolute top-20 right-0 w-80 h-80 bg-cyan-500/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-72 h-72 bg-purple-500/6 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        <SectionTitle title="资源下载" subtitle="// 精选工具与资源合集 · 持续更新中" />

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10 perspective-[1200px]">
          {categories.map(cat => {
            const meta = categoryMeta[cat.id];
            const items = resourceList.filter(r => r.category === cat.id);
            const first = items[0];
            const IconComp = catIcons[cat.id];
            const topBorder = `border-t-2 ${meta.border.replace('/15', '/30')}`;

            return (
              <Link key={cat.id} to={first ? `/resources/${first.id}` : '/resources'}
                className={`group liquid-glass-light rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03] ${topBorder} hover:shadow-2xl hover:shadow-indigo-500/15 hover:bg-white/60 dark:hover:bg-[rgba(28,28,56,0.55)]`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl ${meta.iconBg} flex items-center justify-center shadow-lg text-white group-hover:scale-110 group-hover:-rotate-3 transition-all duration-400`}>
                    <IconComp size={22} />
                  </div>
                  <span className={`text-[11px] px-2.5 py-1 rounded-full ${meta.accentBg} ${meta.accent} font-mono`}>{items.length} 个资源</span>
                </div>

                <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-100 mb-2">{cat.label}</h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed min-h-[2.5rem]">
                  {items.slice(0, 3).map(r => r.title).join('、')}
                </p>

                {first && (
                  <div className="flex items-center gap-2 mt-4 pt-3 border-t border-neutral-100 dark:border-white/5 text-[11px] text-neutral-400 font-mono">
                    {first.size && <span>{first.size}</span>}
                    {first.updated && <span>· {first.updated}</span>}
                  </div>
                )}

                <div className="mt-3 flex items-center gap-1 text-xs font-medium text-indigo-500 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-1 group-hover:translate-x-0">
                  查看详情 <FiChevronRight size={13} />
                </div>
              </Link>
            );
          })}
        </div>

        <div ref={btnRef} className="text-center">
          <Link to="/resources"
            className="inline-flex items-center gap-2 liquid-glass-light rounded-xl px-6 py-3 text-sm font-medium text-neutral-600 dark:text-neutral-300 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.04] hover:shadow-lg hover:text-indigo-500 group">
            查看全部资源 <FiArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
