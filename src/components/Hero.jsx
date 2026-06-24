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
      .fromTo('.hero-typewriter', { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.6 }, '-=0.2')
      .fromTo('.hero-cta', { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.55 }, '-=0.15')
      .fromTo('.hero-social', { autoAlpha: 0, scale: 0.8 }, { autoAlpha: 1, scale: 1, duration: 0.5 }, '-=0.1');
    gsap.fromTo('.hero-scroll', { autoAlpha: 0, y: 20 }, { autoAlpha: 0.5, y: 0, duration: 0.7, delay: 1, ease: 'power3.out' });
    gsap.to('.hero-scroll', { y: 10, duration: 1.5, ease: 'power1.inOut', repeat: -1 });
  }, { scope: containerRef });

  return (
    <section id="hero" ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 overflow-hidden">

      <div className="relative z-10 text-center max-w-5xl w-full">
        <div className="hero-badge inline-flex items-center gap-3 mb-8 px-5 py-2.5 rounded-full glass-effect">
          <FiCode className="text-indigo-500" size={14} />
          <span className="text-xs font-mono text-indigo-500 dark:text-indigo-400 tracking-widest uppercase">Developer & Creator</span>
        </div>

        <h1 className="hero-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-8 leading-tight">
          <span className="text-neutral-800 dark:text-neutral-100">你好，我是</span>
          <br />
          <span className="gradient-text">ZHCOOL520</span>
        </h1>

        <a 
          href="#about" 
          onClick={(e) => { e.preventDefault(); document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' }); }}
          className="inline-block mb-8 group"
        >
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 group-hover:from-indigo-300 group-hover:via-purple-300 group-hover:to-pink-300 transition-all duration-500 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-indigo-500/20 cursor-pointer">
            <img src="/images/fox.webp" alt="ZHCOOL520" className="w-full h-full rounded-full object-cover border-2 border-white dark:border-neutral-800" />
          </div>
        </a>

        <div className="hero-typewriter mb-12">
          {Typewriter ? (
            <Typewriter
              texts={['用代码构建未来 ✨', '热爱开源与技术创新', 'HarmonyOS & Android 开发者', 'Minecraft Mod & Plugin 创作者']}
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-neutral-600 dark:text-neutral-300 font-mono"
            />
          ) : (
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-neutral-600 dark:text-neutral-300 font-mono">用代码构建未来 ✨</p>
          )}
        </div>

        <div className="hero-cta flex flex-wrap items-center justify-center gap-4 mb-14">
          <a href="#projects" onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }} className="btn-primary">
            查看项目 <FiArrowDown className="inline ml-2" size={16} />
          </a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }} className="btn-outline">联系我</a>
        </div>

        <div className="hero-social flex items-center justify-center gap-5">
          <a href="https://github.com/ZHCOOL520" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl glass-effect text-neutral-500 hover:text-indigo-500 hover:bg-indigo-500/10 transition-all duration-300">
            <FiGithub size={24} />
          </a>
          <a href="https://space.bilibili.com/1414910921" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl glass-effect text-neutral-500 hover:text-pink-500 hover:bg-pink-500/10 transition-all duration-300">
            <SiBilibili size={24} />
          </a>
          <a href="mailto:ZHCOOL520@qq.com" className="p-3 rounded-xl glass-effect text-neutral-500 hover:text-violet-500 hover:bg-violet-500/10 transition-all duration-300">
            <FiMail size={24} />
          </a>
          <a href="https://qm.qq.com/q/1125585497" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl glass-effect text-neutral-500 hover:text-indigo-500 hover:bg-indigo-500/10 transition-all duration-300" title="QQ群: 1125585497">
            <FiMessageCircle size={24} />
          </a>
        </div>

        <div className="hero-scroll absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500 tracking-widest">SCROLL</span>
          <FiArrowDown className="text-indigo-400/60" size={24} />
        </div>
      </div>
    </section>
  );
}
