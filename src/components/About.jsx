import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiUser, FiMapPin, FiCode, FiGitBranch } from 'react-icons/fi';
import SectionTitle from './shared/SectionTitle.jsx';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: FiCode, label: '年经验', value: '4+' },
  { icon: FiGitBranch, label: '开源仓库', value: '5' },
  { icon: FiMapPin, label: '所在地', value: '中国' },
  { icon: FiUser, label: 'GitHub', value: '老登' },
];

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const left = el.querySelector('[data-anim="left"]');
    const right = el.querySelector('[data-anim="right"]');
    const statsGrid = el.querySelectorAll('[data-anim="stat"]');

    gsap.set([left, right, statsGrid], { opacity: 0 });
    gsap.set(left, { x: -40 });
    gsap.set(right, { x: 40 });
    statsGrid.forEach((el) => gsap.set(el, { y: 20 }));

    const st1 = ScrollTrigger.create({ trigger: left, start: 'top 92%', onEnter: () => gsap.to(left, { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }), once: true });
    const st2 = ScrollTrigger.create({ trigger: right, start: 'top 92%', onEnter: () => gsap.to(right, { opacity: 1, x: 0, duration: 0.5, delay: 0.1, ease: 'power2.out' }), once: true });
    const st3 = ScrollTrigger.create({ trigger: el, start: 'top 88%', onEnter: () => gsap.to(statsGrid, { opacity: 1, y: 0, duration: 0.35, stagger: 0.1, delay: 0.15, ease: 'power2.out' }), once: true });
    return () => { st1.kill(); st2.kill(); st3.kill(); };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative py-24 px-6 z-10">
      <div className="max-w-6xl mx-auto">
        <SectionTitle title="关于我" subtitle="// About Me" />

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div data-anim="left" className="flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full glass-strong flex items-center justify-center shadow-xl">
                <div className="text-center">
                  <span className="text-5xl sm:text-6xl font-black text-gradient font-mono tracking-tight">南瓜</span>
                  <p className="text-neutral-500 dark:text-neutral-400 mt-3 text-xs font-mono tracking-widest uppercase">ZHCOOL520</p>
                </div>
              </div>
              <div className="absolute -inset-3 rounded-full border border-indigo-500/20 animate-pulse" />
              <div className="absolute -inset-6 rounded-full border border-violet-500/10" />
            </div>
          </div>

          <div data-anim="right" className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-3 text-neutral-800 dark:text-neutral-100">
                <span className="text-gradient">多平台开发者</span>
              </h3>
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                专注于 HarmonyOS 与 Android 跨平台开发，同时也是 Minecraft Mod & Plugin 创作者，
                热爱开源社区，所有项目公开托管于 GitHub。
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              {stats.map((stat, i) => (
                <div key={i} data-anim="stat" className="glass-card-sm">
                  <stat.icon className="mx-auto mb-2 text-indigo-500" size={20} />
                  <div className="text-xl font-bold text-neutral-800 dark:text-neutral-100">{stat.value}</div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
