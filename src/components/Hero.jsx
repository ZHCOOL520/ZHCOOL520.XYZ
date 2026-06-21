import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { FiArrowDown, FiGithub, FiMail, FiMessageCircle } from 'react-icons/fi';
import { SiBilibili } from 'react-icons/si';
import { Typewriter } from './Typewriter';

export default function Hero() {
  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const typewriterRef = useRef(null);
  const ctaRef = useRef(null);
  const socialRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
    tl.fromTo(badgeRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 })
      .fromTo(headingRef.current, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.5 }, '+=0.05')
      .fromTo(typewriterRef.current, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.5 }, '+=0.1')
      .fromTo(ctaRef.current, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.5 }, '+=0.1')
      .fromTo(socialRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 }, '+=0.1');
    gsap.fromTo(scrollRef.current, { opacity: 0 }, { opacity: 0.45, duration: 0.5, delay: 0.8, ease: 'power2.out' });
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 z-10">
      <div className="text-center max-w-4xl">
        <div ref={badgeRef} className="inline-flex items-center gap-3 mb-6 px-4 py-2 rounded-full border border-neon-cyan/20 bg-neon-cyan/5">
          <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
          <span className="text-xs font-mono text-neon-cyan tracking-widest uppercase">
            Developer & Creator
          </span>
        </div>

        <h1 ref={headingRef} className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
          <span className="text-neutral-800 dark:text-neutral-100">你好，我是</span>
          <br />
          <span className="gradient-text">ZHCOOL520</span>
        </h1>

        <div ref={typewriterRef} className="mb-10">
          {Typewriter ? (
            <Typewriter
              texts={[
                '用代码构建未来 ✨',
                '热爱开源与技术创新',
                'HarmonyOS & Android 开发者',
                'Minecraft Mod & Plugin 创作者',
              ]}
              className="text-lg sm:text-xl md:text-2xl text-neutral-700 dark:text-neutral-200 font-mono"
            />
          ) : (
            <p className="text-lg sm:text-xl md:text-2xl text-neutral-700 dark:text-neutral-200 font-mono">
              用代码构建未来 ✨
            </p>
          )}
        </div>

        <div ref={ctaRef} className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#projects"
            onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="btn-primary rounded-xl"
          >
            查看项目
            <FiArrowDown className="inline ml-2 group-hover:animate-bounce" />
          </a>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="btn-glass"
          >
            联系我
          </a>
        </div>

        <div ref={socialRef} className="flex items-center justify-center gap-6 mt-12">
          <a href="https://github.com/ZHCOOL520" target="_blank" rel="noopener noreferrer" className="text-neutral-700/50 dark:text-neutral-200/40 hover:text-neon-cyan transition-colors"><FiGithub size={22} /></a>
          <a href="https://space.bilibili.com/1414910921" target="_blank" rel="noopener noreferrer" className="text-neutral-700/50 dark:text-neutral-200/40 hover:text-neon-pink transition-colors"><SiBilibili size={22} /></a>
          <a href="mailto:ZHCOOL520@qq.com" className="text-neutral-700/50 dark:text-neutral-200/40 hover:text-neon-purple transition-colors"><FiMail size={22} /></a>
          <a href="https://qm.qq.com/q/1125585497" target="_blank" rel="noopener noreferrer" className="text-neutral-700/50 dark:text-neutral-200/40 hover:text-neon-cyan transition-colors" title="QQ群: 1125585497"><FiMessageCircle size={22} /></a>
        </div>

        <div ref={scrollRef} className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <FiArrowDown className="text-neon-cyan/50" size={24} />
        </div>
      </div>
    </section>
  );
}
