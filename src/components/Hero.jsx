import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { FiArrowDown, FiGithub, FiMail, FiMessageCircle, FiCode } from 'react-icons/fi';
import { SiBilibili } from 'react-icons/si';
import { Typewriter } from './Typewriter';

export default function Hero() {
  const containerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo('.hero-badge', { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.6 })
      .fromTo('.hero-heading', { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.7 }, '-=0.25')
      .fromTo('.hero-avatar-container', { autoAlpha: 0, scale: 0.5 }, { autoAlpha: 1, scale: 1, duration: 0.8, ease: 'elastic.out(1, 0.3)' }, '-=0.2')
      .fromTo('.hero-typewriter', { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.6 }, '-=0.2')
      .fromTo('.hero-cta', { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.55 }, '-=0.15')
      .fromTo('.hero-social', { autoAlpha: 0, scale: 0.8 }, { autoAlpha: 1, scale: 1, duration: 0.5 }, '-=0.1');
  }, { scope: containerRef });

  const scrollToAbout = (e) => {
    e.preventDefault();
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/8 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/8 rounded-full blur-3xl animate-float" style={{ animationDelay: '-4s' }} />
      </div>

      <div className="relative z-10 text-center max-w-5xl w-full flex flex-col items-center">
        <div className="hero-badge inline-flex items-center gap-3 mb-8 px-5 py-2.5 rounded-full liquid-glass">
          <FiCode className="text-indigo-500" size={14} />
          <span className="text-xs font-mono text-indigo-500 dark:text-indigo-400 tracking-widest uppercase">Developer & Creator</span>
        </div>

        <h1 className="hero-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 leading-tight">
          <span className="text-neutral-800 dark:text-neutral-100">你好，我是</span>
          <br />
          <span className="gradient-text">ZHCOOL520</span>
        </h1>

        <div className="hero-avatar-container mb-8">
          <a 
            href="#about" 
            onClick={scrollToAbout}
            className="group relative inline-block"
          >
            <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 blur-lg opacity-50 group-hover:opacity-80 group-hover:scale-110 transition-all duration-500" />
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1.5 bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 group-hover:scale-105 transition-all duration-500 cursor-pointer shadow-xl">
              <img src="/images/fox.webp" alt="ZHCOOL520" decoding="async" className="w-full h-full rounded-full object-cover border-2 border-white dark:border-neutral-800" />
            </div>
          </a>
        </div>

        <div className="hero-typewriter mb-10">
          <Typewriter
            texts={['用代码构建未来 ✨', '热爱开源与技术创新', 'HarmonyOS & Android 开发者', 'Minecraft Mod & Plugin 创作者']}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-neutral-600 dark:text-neutral-300 font-mono"
          />
        </div>

        <div className="hero-cta flex flex-wrap items-center justify-center gap-4 mb-12">
          <a href="#projects" onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }} className="btn-primary inline-flex items-center gap-2">
            查看项目 <FiArrowDown size={16} />
          </a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }} className="btn-outline">联系我</a>
        </div>

        <div className="hero-social flex items-center justify-center gap-4 sm:gap-5">
          <a href="https://github.com/ZHCOOL520" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl liquid-glass-light text-neutral-500 hover:text-indigo-500 hover:bg-indigo-500/10 transition-all duration-300 hover:scale-110">
            <FiGithub size={22} />
          </a>
          <a href="https://space.bilibili.com/1414910921" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl liquid-glass-light text-neutral-500 hover:text-pink-500 hover:bg-pink-500/10 transition-all duration-300 hover:scale-110">
            <SiBilibili size={22} />
          </a>
          <a href="mailto:ZHCOOL520@qq.com" className="p-3 rounded-xl liquid-glass-light text-neutral-500 hover:text-violet-500 hover:bg-violet-500/10 transition-all duration-300 hover:scale-110">
            <FiMail size={22} />
          </a>
          <a href="https://qm.qq.com/q/1125585497" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl liquid-glass-light text-neutral-500 hover:text-indigo-500 hover:bg-indigo-500/10 transition-all duration-300 hover:scale-110" title="QQ群: 1125585497">
            <FiMessageCircle size={22} />
          </a>
        </div>
      </div>
    </section>
  );
}