import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
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

  useGSAP(() => {
    const el = sectionRef.current;
    if (!el) return;
    const avatar = el.querySelector('.about-avatar');
    const rings = el.querySelectorAll('.about-ring');
    const ringGlow = el.querySelector('.about-ring-glow');
    const text = el.querySelector('.about-text');
    const statEls = el.querySelectorAll('.about-stat');

    gsap.set(avatar, { autoAlpha: 0, scale: 0.2, rotation: -20 });
    gsap.set(ringGlow, { autoAlpha: 0, scale: 0 });
    gsap.set(rings, { autoAlpha: 0, scale: 0 });
    gsap.set(text, { autoAlpha: 0, x: 50 });
    gsap.set(statEls, { autoAlpha: 0, y: 30, scale: 0.6 });

    const st = ScrollTrigger.create({
      trigger: el, start: 'top 88%',
      onEnter: () => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.to(avatar, { autoAlpha: 1, scale: 1, rotation: 0, duration: 1, ease: 'elastic.out(1, 0.2)' }, 0)
          .to(ringGlow, { autoAlpha: 1, scale: 1, duration: 0.6, ease: 'back.out(2.5)' }, '-=0.5')
          .to(rings, { autoAlpha: 1, scale: 1, duration: 0.5, stagger: 0.15, ease: 'back.out(2)' }, '-=0.3')
          .to(text, { autoAlpha: 1, x: 0, duration: 0.6 }, '-=0.1')
          .to(statEls, { autoAlpha: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.12, ease: 'back.out(2.5)' }, '-=0.1');
      },
      once: true,
    });
    return () => st.kill();
  }, { scope: sectionRef });

  return (
    <section id="about" ref={sectionRef} className="relative py-32 px-6 z-10">

      <div className="max-w-7xl mx-auto">
        <SectionTitle title="关于我" subtitle="// About Me" />

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="flex justify-center">
            <div className="relative">
              <div className="about-ring-glow absolute -inset-10 rounded-full bg-gradient-to-br from-indigo-500/15 via-purple-500/10 to-transparent blur-3xl" />
              <div className="about-ring absolute -inset-6 rounded-full border border-indigo-500/10" />
              <div className="about-ring absolute -inset-3 rounded-full border border-violet-500/8" />
              <div className="about-avatar w-64 h-64 sm:w-80 sm:h-80 rounded-full glass-effect flex items-center justify-center shadow-xl transition-all duration-500 hover:-translate-y-3 hover:scale-[1.05] hover:shadow-2xl hover:shadow-indigo-500/15 cursor-default overflow-hidden p-2">
                <img src="/images/fox.webp" alt="ZHCOOL520" className="w-full h-full rounded-full object-cover" />
              </div>
            </div>
          </div>

          <div className="about-text space-y-8">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-neutral-800 dark:text-neutral-100">
                <span className="gradient-text">多平台开发者</span>
              </h3>
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed text-lg">
                专注于 HarmonyOS 与 Android 跨平台开发，同时也是 Minecraft Mod & Plugin 创作者，
                热爱开源社区，所有项目公开托管于 GitHub。
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              {stats.map((stat, i) => (
                <div key={i} className="about-stat glass-card-sm text-center card-hover cursor-default">
                  <stat.icon className="mx-auto mb-3 text-indigo-500" size={24} />
                  <div className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">{stat.value}</div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
