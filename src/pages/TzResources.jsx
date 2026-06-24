import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { FiExternalLink, FiAlertTriangle, FiBookOpen, FiGlobe, FiGrid, FiPackage, FiArrowRight, FiArrowLeft, FiInfo, FiDatabase, FiUsers } from 'react-icons/fi';
import BackLink from '../components/shared/BackLink.jsx';

gsap.registerPlugin(ScrollTrigger);

const platforms = [
  {
    icon: FiBookOpen, title: 'MC百科整合包',
    desc: '国内最全面的 Minecraft 模组百科，收录海量整合包信息与下载指引。',
    url: 'https://www.mcmod.cn/modpack.html',
    color: 'from-emerald-500 to-teal-500',
    tag: '推荐',
    tagColor: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 dark:text-emerald-400',
  },
  {
    icon: FiGlobe, title: 'CurseForge',
    desc: '全球最大的 Minecraft 模组与整合包平台，拥有海量社区作品。',
    url: 'https://www.curseforge.com/minecraft/modpacks',
    color: 'from-orange-500 to-red-500',
    tag: '全球最大',
    tagColor: 'text-orange-600 bg-orange-50 dark:bg-orange-900/30 dark:text-orange-400',
  },
  {
    icon: FiGrid, title: 'Modrinth',
    desc: '新一代开源 Minecraft 模组平台，整合包管理简洁高效。',
    url: 'https://modrinth.com/modpacks',
    color: 'from-lime-500 to-green-500',
    tag: '开源',
    tagColor: 'text-green-600 bg-green-50 dark:bg-green-900/30 dark:text-green-400',
  },
];

export default function TzResources() {
  const pageRef = useRef(null);

  useGSAP(() => {
    const el = pageRef.current;
    if (!el) return;
    const triggers = [];
    
    const header = el.querySelector('.tzr-header');
    if (header) gsap.fromTo(header, { autoAlpha: 0, scale: 0.9, y: 30 }, { autoAlpha: 1, scale: 1, y: 0, duration: 0.7, ease: 'power3.out' });
    
    const notice = el.querySelector('.tzr-notice');
    if (notice) { 
      gsap.set(notice, { autoAlpha: 0, y: 20 }); 
      triggers.push(ScrollTrigger.create({ 
        trigger: notice, start: 'top 92%', 
        onEnter: () => gsap.to(notice, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out' }), 
        once: true 
      })); 
    }
    
    const diffCard = el.querySelector('.tzr-diff-card');
    if (diffCard) { 
      gsap.set(diffCard, { autoAlpha: 0, y: 25 }); 
      triggers.push(ScrollTrigger.create({ 
        trigger: diffCard, start: 'top 90%', 
        onEnter: () => gsap.to(diffCard, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out' }), 
        once: true 
      })); 
    }
    
    const cards = el.querySelectorAll('.tzr-card');
    if (cards.length) { 
      gsap.set(cards, { autoAlpha: 0, scale: 0.9, y: 40 }); 
      triggers.push(ScrollTrigger.create({ 
        trigger: cards[0], start: 'top 90%', 
        onEnter: () => gsap.to(cards, { autoAlpha: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.15, ease: 'back.out(1.5)' }), 
        once: true 
      })); 
    }
    
    const linkSection = el.querySelector('.tzr-link');
    if (linkSection) { 
      gsap.set(linkSection, { autoAlpha: 0, y: 20 }); 
      triggers.push(ScrollTrigger.create({ 
        trigger: linkSection, start: 'top 92%', 
        onEnter: () => gsap.to(linkSection, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power3.out' }), 
        once: true 
      })); 
    }
    
    return () => { triggers.forEach(st => st.kill()); };
  }, { scope: pageRef });

  return (
    <div ref={pageRef} className="min-h-screen">
      <section className="relative py-20 sm:py-28 px-6">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-4s' }} />
        </div>
        
        <div className="relative max-w-3xl mx-auto">
          <div className="mb-6">
            <BackLink to="/tz" label="返回天真SkyerNovie主页" />
          </div>
          <div className="tzr-header liquid-glass rounded-3xl p-8 sm:p-10 text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-800 dark:text-neutral-50 mb-3">
              <span className="gradient-text">资源下载</span>
            </h1>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm sm:text-base max-w-md mx-auto">
              Minecraft 整合包资源导航 · 主播推荐平台
            </p>
          </div>
        </div>
      </section>

      <section className="pb-8 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="tzr-notice liquid-glass-light rounded-2xl p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                <FiAlertTriangle className="text-amber-500" size={20} />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-neutral-800 dark:text-neutral-100 mb-3">关于整合包下载</h2>
                <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed mb-3">
                  由于模组授权协议及版权原因，本站无法直接提供整合包文件下载。整合包中包含的大量模组各有其独立的许可证和分发条款，直接分发可能侵犯模组作者的权益。
                </p>
                <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  因此我们整理了以下主流整合包平台，你可以在这些平台上找到视频中使用的整合包及相关资源：
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 资源区别说明 */}
      <section className="py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="tzr-diff-card liquid-glass rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                <FiInfo className="text-indigo-500" size={18} />
              </div>
              <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-100">资源来源说明</h2>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="liquid-glass-light rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                    <FiUsers className="text-emerald-500" size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-800 dark:text-neutral-100">主播相关资源</h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">天真SkyerNovie 推荐</p>
                  </div>
                </div>
                <ul className="text-sm text-neutral-600 dark:text-neutral-300 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500">•</span>
                    <span>直播中使用的整合包</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500">•</span>
                    <span>视频系列对应的模组资源</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500">•</span>
                    <span>主播推荐的游戏平台</span>
                  </li>
                </ul>
              </div>
              
              <div className="liquid-glass-light rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                    <FiDatabase className="text-indigo-500" size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-800 dark:text-neutral-100">本站资源</h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">站长搜集整理</p>
                  </div>
                </div>
                <ul className="text-sm text-neutral-600 dark:text-neutral-300 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-500">•</span>
                    <span>各类软件工具下载</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-500">•</span>
                    <span>Minecraft 资源合集</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-500">•</span>
                    <span>与主播无关，仅供学习交流</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 pt-5 border-t border-neutral-100/80 dark:border-white/8">
              <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center">
                <span className="font-semibold text-neutral-700 dark:text-neutral-200">重要提示：</span>
                本站主页资源由站长独立搜集整理，与天真SkyerNovie 等内容创作者无关，资源仅供学习交流，请支持正版软件。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-800 dark:text-neutral-50 mb-3">整合包平台导航</h2>
            <p className="text-sm sm:text-base text-neutral-500 dark:text-neutral-400">点击前往对应平台浏览和下载整合包</p>
          </div>
          
          <div className="grid sm:grid-cols-3 gap-6">
            {platforms.map((p, i) => (
              <a 
                key={i} 
                href={p.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="tzr-card group relative liquid-glass rounded-2xl p-6 sm:p-8 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl"
              >
                {/* 渐变背景动画 */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${p.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`} />
                
                <div className="relative">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${p.color} flex items-center justify-center shadow-lg text-white mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-400`}>
                    <p.icon size={28} />
                  </div>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <h3 className="text-lg sm:text-xl font-bold text-neutral-800 dark:text-neutral-100">{p.title}</h3>
                    {p.tag && <span className={`text-[10px] px-2.5 py-1 rounded-full font-mono font-semibold ${p.tagColor}`}>{p.tag}</span>}
                  </div>
                  
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed mb-5">{p.desc}</p>
                  
                  <div className="flex items-center gap-2 text-sm font-semibold text-indigo-500 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-4px] group-hover:translate-x-0">
                    <span>前往平台</span>
                    <FiExternalLink size={14} />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="tzr-link max-w-3xl mx-auto">
          <div className="liquid-glass rounded-2xl p-8 sm:p-12 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-6 shadow-lg text-white">
              <FiPackage size={28} />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-800 dark:text-neutral-100 mb-3">更多 Minecraft 资源</h2>
            <p className="text-sm sm:text-base text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-lg mx-auto mb-6">
              本站主页也收录了 Minecraft 相关资源，包括整合包推荐、实用工具等，由站长搜集整理，持续更新中。
            </p>
            <Link to="/resources/minecraft-pack"
              className="inline-flex items-center gap-2 btn-primary text-sm sm:text-base">
              <span>查看 Minecraft 资源</span>
              <FiArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-8 px-6 text-center">
        <p className="text-xs text-neutral-400 dark:text-neutral-500">
          每晚8点-10点直播 · 特殊情况可能暂停，详见B站动态或QQ群
        </p>
      </section>
    </div>
  );
}
