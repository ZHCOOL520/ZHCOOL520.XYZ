import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { FiArrowDown, FiGithub, FiMail, FiMessageCircle } from 'react-icons/fi';
import { SiBilibili } from 'react-icons/si';
import { Typewriter } from './Typewriter';

export default function Hero() {
  const containerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo('.hero-badge', { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.6 })
      .fromTo('.hero-heading', { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.6 }, '-=0.2')
      .fromTo('.hero-typewriter', { autoAlpha: 0, y: 25 }, { autoAlpha: 1, y: 0, duration: 0.5 }, '-=0.15')
      .fromTo('.hero-cta', { autoAlpha: 0, y: 25 }, { autoAlpha: 1, y: 0, duration: 0.5 }, '-=0.1')
      .fromTo('.hero-social', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 }, '-=0.1');
    gsap.fromTo('.hero-scroll', { autoAlpha: 0 }, { autoAlpha: 0.45, duration: 0.6, delay: 0.8, ease: 'power3.out' });
  }, { scope: containerRef });

  return (
    <section id="hero" ref={containerRef} className="relative min-h-screen flex items-center justify-center px-6 z-10">
      <div className="text-center max-w-4xl">
        <div className="hero-badge inline-flex items-center gap-3 mb-6 px-4 py-2 rounded-full liquid-glass-light">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
          <span className="text-xs font-mono text-indigo-500 dark:text-indigo-400 tracking-widest uppercase">Developer & Creator</span>
        </div>

        <h1 className="hero-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
          <span className="text-neutral-800 dark:text-neutral-100">你好，我是</span>
          <br />
          <span className="text-gradient">ZHCOOL520</span>
        </h1>

        <div className="hero-typewriter mb-10">
          {Typewriter ? (
            <Typewriter
              texts={['用代码构建未来 ✨', '热爱开源与技术创新', 'HarmonyOS & Android 开发者', 'Minecraft Mod & Plugin 创作者']}
              className="text-lg sm:text-xl md:text-2xl text-neutral-600 dark:text-neutral-300 font-mono"
            />
          ) : (
            <p className="text-lg sm:text-xl md:text-2xl text-neutral-600 dark:text-neutral-300 font-mono">用代码构建未来 ✨</p>
          )}
        </div>

        <div className="hero-cta flex flex-wrap items-center justify-center gap-4">
          <a href="#projects" onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }} className="btn-primary rounded-xl">
            查看项目 <FiArrowDown className="inline ml-2" />
          </a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }} className="btn-glass">联系我</a>
        </div>

        <div className="hero-social flex items-center justify-center gap-6 mt-12">
          <a href="https://github.com/ZHCOOL520" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"><FiGithub size={22} /></a>
          <a href="https://space.bilibili.com/1414910921" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-pink-500 dark:hover:text-pink-400 transition-colors"><SiBilibili size={22} /></a>
          <a href="mailto:ZHCOOL520@qq.com" className="text-neutral-400 hover:text-violet-500 dark:hover:text-violet-400 transition-colors"><FiMail size={22} /></a>
          <a href="https://qm.qq.com/q/1125585497" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors" title="QQ群: 1125585497"><FiMessageCircle size={22} /></a>
        </div>

        <div className="hero-scroll absolute bottom-10 left-1/2 -translate-x-1/2">
          <FiArrowDown className="text-indigo-400/50" size={24} />
        </div>
      </div>
    </section>
  );
}
