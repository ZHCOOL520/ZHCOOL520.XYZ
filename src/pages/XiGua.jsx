import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { FiExternalLink, FiPlay, FiVideo, FiUsers, FiHeart, FiArrowRight, FiDownload, FiBookOpen, FiStar } from 'react-icons/fi';
import BackLink from '../components/shared/BackLink.jsx';

gsap.registerPlugin(ScrollTrigger);

export default function XiGua() {
  const pageRef = useRef(null);

  useGSAP(() => {
    const el = pageRef.current;
    if (!el) return;
    const triggers = [];
    
    const header = el.querySelector('.xg-header');
    if (header) gsap.fromTo(header, { autoAlpha: 0, scale: 0.9, y: 30 }, { autoAlpha: 1, scale: 1, y: 0, duration: 0.7, ease: 'power3.out' });
    
    const stats = el.querySelectorAll('.xg-stat-item');
    if (stats.length) { 
      gsap.set(stats, { autoAlpha: 0, y: 20 }); 
      triggers.push(ScrollTrigger.create({ 
        trigger: stats[0], start: 'top 90%', 
        onEnter: () => gsap.to(stats, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out' }), 
        once: true 
      })); 
    }
    
    const intro = el.querySelector('.xg-intro');
    if (intro) { 
      gsap.set(intro, { autoAlpha: 0, y: 25 }); 
      triggers.push(ScrollTrigger.create({ 
        trigger: intro, start: 'top 90%', 
        onEnter: () => gsap.to(intro, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out' }), 
        once: true 
      })); 
    }
    
    const cards = el.querySelectorAll('.xg-card');
    if (cards.length) { 
      gsap.set(cards, { autoAlpha: 0, scale: 0.9, y: 40 }); 
      triggers.push(ScrollTrigger.create({ 
        trigger: cards[0], start: 'top 90%', 
        onEnter: () => gsap.to(cards, { autoAlpha: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.15, ease: 'back.out(1.5)' }), 
        once: true 
      })); 
    }
    
    const resourceSection = el.querySelector('.xg-resource');
    if (resourceSection) { 
      gsap.set(resourceSection, { autoAlpha: 0, y: 30 }); 
      triggers.push(ScrollTrigger.create({ 
        trigger: resourceSection, start: 'top 90%', 
        onEnter: () => gsap.to(resourceSection, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out' }), 
        once: true 
      })); 
    }
    
    return () => { triggers.forEach(st => st.kill()); };
  }, { scope: pageRef });

  return (
    <div ref={pageRef} className="min-h-screen page-backdrop">
      <section className="relative py-20 sm:py-28 px-6">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-4s' }} />
        </div>
        
        <div className="relative max-w-3xl mx-auto">
          <div className="mb-6">
            <BackLink to="/" label="返回首页" />
          </div>
          <div className="xg-header liquid-glass rounded-3xl p-8 sm:p-10 text-center">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-xl">
              <span className="text-4xl">🍉</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-800 dark:text-neutral-50 mb-2">
              西瓜
            </h1>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm sm:text-base max-w-md mx-auto mb-6">
              Bilibili 游戏主播 · Minecraft 内容创作者
            </p>
            <a 
              href="https://space.bilibili.com/42893943?spm_id_from=333.1369.opus.module_author_avatar.click" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 liquid-glass-light rounded-xl px-6 py-3 text-sm font-semibold text-neutral-700 dark:text-neutral-200 hover:text-red-500 transition-all duration-300"
            >
              <FiExternalLink size={14} />
              <span>访问 Bilibili 空间</span>
            </a>
          </div>
        </div>
      </section>

      <section className="py-8 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="grid grid-cols-3 gap-4">
            <div className="xg-stat-item liquid-glass rounded-2xl p-3 sm:p-5 text-center">
              <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-red-500/10 flex items-center justify-center">
                <FiVideo className="text-red-500" size={18} />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-neutral-800 dark:text-neutral-100">--</div>
              <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">视频数</div>
            </div>
            <div className="xg-stat-item liquid-glass rounded-2xl p-3 sm:p-5 text-center">
              <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-orange-500/10 flex items-center justify-center">
                <FiUsers className="text-orange-500" size={18} />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-neutral-800 dark:text-neutral-100">--</div>
              <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">粉丝数</div>
            </div>
            <div className="xg-stat-item liquid-glass rounded-2xl p-3 sm:p-5 text-center">
              <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-pink-500/10 flex items-center justify-center">
                <FiHeart className="text-pink-500" size={18} />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-neutral-800 dark:text-neutral-100">--</div>
              <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">获赞数</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="xg-intro liquid-glass rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                <FiPlay className="text-red-500" size={18} />
              </div>
              <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-100">关于主播</h2>
            </div>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
              西瓜是一位热爱 Minecraft 的 Bilibili 游戏主播，专注于分享各类 Minecraft 游戏玩法、整合包体验和模组介绍视频。
            </p>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
              无论是科技向的工业模组，还是魔法向的神秘时代，亦或是休闲的生活类整合包，西瓜都能为你带来精彩的游戏体验分享。
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-800 dark:text-neutral-50 mb-3">视频内容</h2>
            <p className="text-sm sm:text-base text-neutral-500 dark:text-neutral-400">主播主要分享的内容类型</p>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="xg-card group relative liquid-glass rounded-2xl p-6 sm:p-8 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 opacity-5 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" />
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-lg text-white mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <FiStar size={24} />
                </div>
                <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-100 mb-2">Minecraft 整合包体验</h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed mb-4">各类热门整合包的深度体验与解说，带你探索不同的 Minecraft 世界。</p>
                <a 
                  href="https://space.bilibili.com/42893943/video" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-semibold text-red-500 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 translate-x-[-4px] group-hover:translate-x-0"
                >
                  <span>观看视频</span>
                  <FiExternalLink size={14} />
                </a>
              </div>
            </div>
            
            <div className="xg-card group relative liquid-glass rounded-2xl p-6 sm:p-8 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 opacity-5 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" />
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg text-white mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <FiBookOpen size={24} />
                </div>
                <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-100 mb-2">模组介绍与教程</h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed mb-4">详细的模组介绍和使用教程，帮助你更好地了解和使用各类 Minecraft 模组。</p>
                <a 
                  href="https://space.bilibili.com/42893943/video" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-semibold text-purple-500 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 translate-x-[-4px] group-hover:translate-x-0"
                >
                  <span>观看视频</span>
                  <FiExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="xg-resource liquid-glass rounded-3xl p-8 sm:p-10 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-xl">
              <FiDownload className="text-white" size={32} />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-800 dark:text-neutral-50 mb-3">资源下载</h2>
            <p className="text-sm sm:text-base text-neutral-500 dark:text-neutral-400 mb-8 max-w-md mx-auto">
              想要体验主播视频中的整合包？点击下方链接前往资源下载页面，获取精选的 Minecraft 整合包资源。
            </p>
            <Link 
              to="/resources/minecraft-pack"
              className="inline-flex items-center gap-2 liquid-glass-light rounded-xl px-8 py-4 text-base font-bold text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-300"
            >
              <FiDownload size={18} />
              <span>前往整合包下载</span>
              <FiArrowRight size={18} />
            </Link>
            <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-4">
              资源由本站搜集整理 · 与主播无关 · 仅供学习交流
            </p>
          </div>
        </div>
      </section>

      <section className="py-8 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="liquid-glass-light rounded-2xl p-6 text-center">
            <p className="text-xs text-neutral-400 dark:text-neutral-500">
              <span className="font-semibold text-neutral-600 dark:text-neutral-300">西瓜</span> 的 Bilibili 空间：
              <a href="https://space.bilibili.com/42893943" target="_blank" rel="noopener noreferrer" className="text-red-500 hover:underline ml-1">
                space.bilibili.com/42893943
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}