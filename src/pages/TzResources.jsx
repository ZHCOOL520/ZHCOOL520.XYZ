import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiTool, FiClock } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { icon: '📦', label: '整合包', desc: 'Minecraft 模组整合包', color: 'from-[#7CC722] to-[#5FA319]' },
  { icon: '🎨', label: '材质包', desc: '精美材质资源', color: 'from-[#FF6B35] to-[#D9552B]' },
  { icon: '💾', label: '存档', desc: '游戏存档分享', color: 'from-[#FB7299] to-[#D9556E]' },
  { icon: '📝', label: '汉化补丁', desc: '优质模组汉化', color: 'from-[#00B4FF] to-[#008FCC]' },
  { icon: '✨', label: '光影', desc: '光影着色器包', color: 'from-[#A855F7] to-[#7C3AED]' },
];

export default function TzResources() {
  const pageRef = useRef(null);

  useEffect(() => {
    const el = pageRef.current;
    if (!el) return;
    const triggers = [];
    const header = el.querySelector('[data-anim="header"]');
      if (header) gsap.fromTo(header, { opacity: 0, scale: 0.85, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: 'elastic.out(1,0.4)' });
      const badges = el.querySelectorAll('[data-anim="badge"]');
      if (badges.length) {
        gsap.set(badges, { opacity: 0, scale: 0.7, y: 40 });
        gsap.to(badges, { opacity: 1, scale: 1, y: 0, duration: 0.55, stagger: 0.2, delay: 0.3, ease: 'elastic.out(1,0.5)' });
      }
      const catTitle = el.querySelector('[data-anim="cat-title"]');
      if (catTitle) { gsap.set(catTitle, { opacity: 0, y: 25 }); triggers.push(ScrollTrigger.create({ trigger: catTitle, start: 'top 92%', onEnter: () => gsap.to(catTitle, { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out' }), once: true })); }
      const cards = el.querySelectorAll('[data-anim="card"]');
      if (cards.length) {
        gsap.set(cards, { opacity: 0, scale: 0.8, rotationY: 15, y: 40 });
        triggers.push(ScrollTrigger.create({ trigger: cards[0], start: 'top 90%', onEnter: () => gsap.to(cards, { opacity: 1, scale: 1, rotationY: 0, y: 0, duration: 0.55, stagger: 0.15, ease: 'back.out(1.5)' }), once: true }));
      }
    return () => { triggers.forEach(st => st.kill()); };
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen">
      <section className="relative py-20 sm:py-28 px-6">
        <div className="absolute inset-0 opacity-20 dark:opacity-30">
          <div className="absolute top-20 right-10 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto">
          <div data-anim="header" className="glass-card text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-neutral-800 dark:text-neutral-50 mb-2">资源下载</h1>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm max-w-md mx-auto">Minecraft 整合包、材质包、存档、汉化补丁、光影等资源</p>
          </div>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4">
          <div data-anim="badge" className="glass-card-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center flex-shrink-0"><FiTool className="text-indigo-500" size={18} /></div>
            <div><div className="font-semibold text-neutral-800 dark:text-neutral-100 text-sm">施工中</div><div className="text-xs text-neutral-500">资源内容即将上线</div></div>
          </div>
          <div data-anim="badge" className="glass-card-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0"><FiClock className="text-amber-500" size={18} /></div>
            <div><div className="font-semibold text-neutral-800 dark:text-neutral-100 text-sm">敬请期待</div><div className="text-xs text-neutral-500">整理中，稍后开放</div></div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 px-6 section-glass">
        <div className="max-w-5xl mx-auto">
          <div data-anim="cat-title" className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-800 dark:text-neutral-50 mb-2">资源分类</h2>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm">以下分类将在上线后提供对应资源下载</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((cat, i) => (
              <div key={i} data-anim="card" className="glass-card-sm group">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>{cat.icon}</div>
                  <div>
                    <h3 className="font-semibold text-neutral-800 dark:text-neutral-100">{cat.label}</h3>
                    <p className="text-xs text-neutral-500 flex items-center gap-1"><span className="inline-block w-1.5 h-1.5 rounded-full bg-primary/60" />{cat.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
