import { useRef, useState, useEffect, useCallback } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiExternalLink, FiMessageCircle, FiHeart, FiUsers, FiClock, FiPlayCircle, FiStar, FiPackage, FiThumbsUp } from 'react-icons/fi';
import { SiBilibili } from 'react-icons/si';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const COUNT_NS = 'zhcool520';

function TdButton() {
  const [count, setCount] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    fetch(`https://api.countapi.xyz/get/${COUNT_NS}/tz-td`)
      .then(r => r.json())
      .then(data => data?.value !== undefined && setCount(data.value))
      .catch(() => {
        const saved = localStorage.getItem('tz_td_count');
        if (saved) setCount(parseInt(saved, 10));
      });
  }, []);

  const handleTd = useCallback(() => {
    setAnimating(true);
    setCount(c => c + 1);

    fetch(`https://api.countapi.xyz/hit/${COUNT_NS}/tz-td`)
      .then(r => r.json())
      .then(data => data?.value !== undefined && setCount(data.value))
      .catch(() => {})
      .finally(() => setTimeout(() => setAnimating(false), 600));
  }, []);

  const display = count >= 10000 ? (count / 10000).toFixed(1).replace(/\.0$/, '') + '万' : count.toLocaleString('zh-CN');

  return (
    <button onClick={handleTd}
      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 liquid-glass-light text-neutral-600 dark:text-neutral-300 hover:scale-110 hover:shadow-lg hover:text-rose-500 hover:bg-rose-500/5 active:scale-95">
      <FiThumbsUp size={15} className={`transition-all duration-300 ${animating ? 'scale-125 -rotate-12 text-rose-500' : ''}`} />
      <span>TD</span>
      <span className={`text-xs font-mono tabular-nums transition-all duration-200 ${animating ? 'text-rose-500 font-bold' : ''}`}>
        {display}
      </span>
    </button>
  );
}

const socialLinks = [
  { icon: SiBilibili, label: 'B站主页', url: 'https://space.bilibili.com/25770857', color: 'hover:bg-[#FB7299]' },
  { icon: FiExternalLink, label: '直播间', url: 'https://live.bilibili.com/303427', color: 'hover:bg-[#FF6B35]' },
  { icon: FiMessageCircle, label: 'QQ群', url: 'https://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=o56dxRJfYHO8TN-XI5RdYip0Ofc5tP6x&authKey=hAw3ZnvNAsK51XCYi3ImJdxJtMmqzm2Lel%2BXjXekjlmshwnq8qHmMeAzyfhFUATJ&noverify=0&group_code=694474933', color: 'hover:bg-[#43B9B8]' },
  { icon: FiExternalLink, label: '抖音', url: 'https://v.douyin.com/TCPDQ1sFpEA/', color: 'hover:bg-[#000000]' },
];

const featuredItems = [
  { title: '蒸汽合金炉合出创造能源？开启AE2！格雷空岛爽包Ep1', desc: '格雷科技空岛整合包实况，蒸汽合金炉开启创造能源，全面启动AE2自动化！', image: '/images/video1.webp', url: 'https://www.bilibili.com/video/BV1mdCTBgEjZ', tag: '16.0万播放', tagColor: 'bg-[#FB7299]' },
  { title: '模块化巅峰神包！开局送AE，做出创造飞行！新星工程EP1', desc: '模块化巅峰整合包实况，开局赠送AE系统，一步到位做出创造飞行！', image: '/images/video2.webp', url: 'https://www.bilibili.com/video/BV1tWVh6NEtz', tag: '7.7万播放', tagColor: 'bg-[#FF6B35]' },
  { title: '资源蜜蜂版无中生有 开局送创造马达！蜂蜂空坊Ep1', desc: '蜜蜂版无中生有整合包实况，开局赠送创造马达，开启蜂蜂空坊全新系列冒险！', image: '/images/video3.webp', url: 'https://www.bilibili.com/video/BV1xeSRBpEt9', tag: '6.1万播放', tagColor: 'bg-[#7CC722]' },
];

const downloadItems = [
  { icon: '💬', title: '催更①群', desc: 'Minecraft模组交流，催更讨论。', btnLabel: '已满', btnColor: 'bg-neutral-400 cursor-not-allowed', url: '#', disabled: true, code: '768587905', status: '已满', statusColor: 'text-neutral-400 bg-neutral-100 dark:bg-neutral-800' },
  { icon: '💬', title: '催更②群', desc: '粉丝交流②群，更多讨论空间。', btnLabel: '已满', btnColor: 'bg-neutral-400 cursor-not-allowed', url: '#', disabled: true, code: '564472763', status: '已满', statusColor: 'text-neutral-400 bg-neutral-100 dark:bg-neutral-800' },
  { icon: '💬', title: '催更③群', desc: '新群开放中，欢迎加入！', btnLabel: '加入群聊', btnColor: 'bg-emerald-500 hover:bg-emerald-600', url: 'https://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=o56dxRJfYHO8TN-XI5RdYip0Ofc5tP6x&authKey=hAw3ZnvNAsK51XCYi3ImJdxJtMmqzm2Lel%2BXjXekjlmshwnq8qHmMeAzyfhFUATJ&noverify=0&group_code=694474933', code: '694474933', status: '开放加入', statusColor: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30' },
  { icon: '📡', title: 'QQ频道', desc: '获取最新动态、直播通知和独家内容。', btnLabel: '加入频道', btnColor: 'bg-sky-500 hover:bg-sky-600', url: 'https://pd.qq.com/s/pd39356778', code: 'pd39356778', status: '官方频道', statusColor: 'text-sky-600 bg-sky-50 dark:bg-sky-900/30' },
];

export default function TzXyz() {
  const pageRef = useRef(null);

  useGSAP(() => {
    document.title = '天真SkyerNovie的个人主页';
    return () => { document.title = 'ZHCOOL520 - Personal Site'; };
  }, { scope: pageRef });

  useGSAP(() => {
    const el = pageRef.current;
    if (!el) return;
    const triggers = [];
    const hero = el.querySelector('.tz-hero');
    if (hero) {
      gsap.fromTo(hero, { autoAlpha: 0, scale: 0.8, y: 40 }, { autoAlpha: 1, scale: 1, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.5)' });
      const btns = el.querySelectorAll('.tz-hero-btn');
      gsap.set(btns, { autoAlpha: 0, scale: 0.6, rotation: -5 });
      gsap.to(btns, { autoAlpha: 1, scale: 1, rotation: 0, duration: 0.5, stagger: 0.15, delay: 0.5, ease: 'back.out(2)' });
      btns.forEach((btn, idx) => {
        const tl = gsap.timeline({ delay: 1 + idx * 0.15, repeat: -1, repeatDelay: 2 });
        tl.to(btn, { y: -4, boxShadow: '0 8px 25px rgba(99,102,241,0.25)', duration: 0.3, ease: 'power2.out' })
          .to(btn, { y: 0, boxShadow: '0 0 0 rgba(99,102,241,0)', duration: 0.5, ease: 'bounce.out' });
        triggers.push(tl);
      });
    }
    const titleTrigger = (sel, ease = 'expo.out') => {
      const e = el.querySelector(sel);
      if (!e) return;
      gsap.set(e, { autoAlpha: 0, y: 30 });
      triggers.push(ScrollTrigger.create({ trigger: e, start: 'top 92%', onEnter: () => gsap.to(e, { autoAlpha: 1, y: 0, duration: 0.6, ease }), once: true }));
    };
    const staggerCards = (sel, ease = 'expo.out', stagger = 0.2, fromY = 60) => {
      const cards = el.querySelectorAll(sel);
      if (!cards.length) return;
      gsap.set(cards, { autoAlpha: 0, scale: 0.85, y: fromY });
      triggers.push(ScrollTrigger.create({ trigger: cards[0], start: 'top 90%', onEnter: () => gsap.to(cards, { autoAlpha: 1, scale: 1, y: 0, duration: 0.6, stagger, ease, overwrite: 'auto' }), once: true }));
    };
    staggerCards('.tz-about-stat', 'elastic.out(1,0.4)', 0.15, 30);
    titleTrigger('.tz-video-title');
    staggerCards('.tz-video-card', 'expo.out', 0.15, 60);
    titleTrigger('.tz-res-title', 'elastic.out(1,0.3)');
    titleTrigger('.tz-res-desc', 'power3.out');
    titleTrigger('.tz-res-btn', 'back.out(1.5)');
    titleTrigger('.tz-com-title', 'expo.out');
    staggerCards('.tz-com-card', 'elastic.out(1,0.5)', 0.18, 40);
    titleTrigger('.tz-com-footer', 'power3.out');
    titleTrigger('.tz-contact-title', 'expo.out');
    const contactCards = el.querySelectorAll('.tz-contact-card');
    if (contactCards.length) {
      gsap.set(contactCards, { autoAlpha: 0, rotationX: 90, scale: 0.7 });
      triggers.push(ScrollTrigger.create({ trigger: contactCards[0], start: 'top 90%', onEnter: () => gsap.to(contactCards, { autoAlpha: 1, rotationX: 0, scale: 1, duration: 0.7, stagger: 0.2, ease: 'back.out(1.7)', overwrite: 'auto' }), once: true }));
    }
    titleTrigger('.tz-copyright', 'power3.out');
    return () => { triggers.forEach(st => { if (st.kill) st.kill(); if (st.scrollTrigger) st.scrollTrigger.kill(); }); };
  }, { scope: pageRef });

  return (
    <div ref={pageRef} className="min-h-screen">
      <section className="relative pt-20 sm:pt-28 pb-6 sm:pb-8 px-6">
        <div className="relative max-w-6xl mx-auto">
          <div className="tz-hero glass-card text-center sm:text-left flex flex-col sm:flex-row items-center gap-8">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-white/20 shadow-xl">
              <img src="/images/avatar.webp" alt="天真SkyerNovie" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-neutral-800 dark:text-neutral-50 mb-2">天真SkyerNovie</h1>
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-lg">Minecraft实况主 · 模组游戏达人 · 每晚8点-10点直播（特殊情况可能暂停，详见B站动态或QQ群通知）</p>
              <div className="flex items-center gap-2.5 mt-5 justify-center sm:justify-start flex-wrap">
                {socialLinks.map((link, i) => (
                  <a key={i} className="tz-hero-btn inline-flex items-center gap-1.5 px-4 py-2 rounded-xl liquid-glass-light text-sm font-medium transition-all duration-300 hover:scale-110 hover:shadow-lg hover:text-white" href={link.url} target="_blank" rel="noopener noreferrer">
                    <link.icon size={16} /><span>{link.label}</span>
                  </a>
                ))}
                <TdButton />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-6 sm:pt-10 pb-12 sm:pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="tz-about-stat glass-card mb-6">
            <div className="flex items-center gap-3 mb-4">
              <FiMessageCircle className="text-indigo-500" size={22} />
              <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-50">关于天真SkyerNovie</h2>
            </div>
            <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
              专注Minecraft模组实况与玩法探索的游戏UP主，致力于为观众带来高质量的模组整合包体验。
              从格雷科技到AE2自动化，从空岛生存到魔法冒险，每一期视频都承载着对游戏的热爱与创意。
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="tz-about-stat glass-card-sm text-center">
              <FiUsers className="mx-auto mb-1.5 text-indigo-500" size={22} />
              <div className="text-xl font-black text-neutral-800 dark:text-neutral-50">2.4万</div>
              <div className="text-[11px] text-neutral-500 dark:text-neutral-400">B站粉丝</div>
            </div>
            <div className="tz-about-stat glass-card-sm text-center">
              <FiPlayCircle className="mx-auto mb-1.5 text-emerald-500" size={22} />
              <div className="text-xl font-black text-neutral-800 dark:text-neutral-50">《格雷空岛》</div>
              <div className="text-[11px] text-neutral-500 dark:text-neutral-400">主要系列</div>
            </div>
            <div className="tz-about-stat glass-card-sm text-center">
              <FiClock className="mx-auto mb-1.5 text-amber-500" size={22} />
              <div className="text-xl font-black text-neutral-800 dark:text-neutral-50">3天一次</div>
              <div className="text-[11px] text-neutral-500 dark:text-neutral-400">更新频率</div>
            </div>
            <div className="tz-about-stat glass-card-sm text-center">
              <FiStar className="mx-auto mb-1.5 text-rose-500" size={22} />
              <div className="text-xl font-black text-neutral-800 dark:text-neutral-50">整合包实况</div>
              <div className="text-[11px] text-neutral-500 dark:text-neutral-400">核心领域</div>
            </div>
          </div>
        </div>
      </section>

      <section id="tz-video" className="pt-8 sm:pt-12 pb-16 sm:pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="tz-video-title text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-800 dark:text-neutral-50 mb-2">精选视频</h2>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm">各种Minecraft模组实况与玩法体验，持续更新中</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredItems.map((item, i) => (
              <a key={i} className="tz-video-card glass-card overflow-hidden p-0 group" href={item.url} target="_blank" rel="noopener noreferrer">
                <div className="relative overflow-hidden aspect-video">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="w-14 h-14 rounded-full liquid-glass-light flex items-center justify-center"><FiExternalLink className="text-white" size={22} /></span>
                  </div>
                  {item.tag && (<span className={`absolute top-3 left-3 px-2 py-0.5 rounded-md text-xs font-semibold text-white ${item.tagColor}`}>{item.tag}</span>)}
                </div>
                <div className="p-5"><h3 className="font-semibold text-neutral-800 dark:text-neutral-100 line-clamp-2">{item.title}</h3><p className="text-neutral-500 dark:text-neutral-400 text-sm mt-1 line-clamp-2">{item.desc}</p></div>
              </a>
            ))}
            <a className="tz-video-card glass-card flex flex-col items-center justify-center gap-4 py-12 group cursor-pointer overflow-hidden" href="https://space.bilibili.com/25770857" target="_blank" rel="noopener noreferrer">
              <div className="relative">
                <div className="absolute inset-0 w-20 h-20 rounded-full bg-indigo-500/20 blur-xl group-hover:bg-indigo-500/40 group-hover:scale-150 transition-all duration-500" />
                <div className="relative w-20 h-20 rounded-full bg-indigo-500/10 flex items-center justify-center group-hover:bg-indigo-500 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                  <FiExternalLink size={32} />
                </div>
              </div>
              <div className="text-center">
                <span className="block text-lg font-bold text-neutral-800 dark:text-neutral-100 mb-1">查看更多视频</span>
                <span className="block text-xs text-neutral-400 leading-relaxed">前往B站空间</span>
                <span className="block text-xs text-neutral-400">发现更多精彩内容</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="tz-res-title mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-800 dark:text-neutral-50 mb-2">整合包资源导航</h2>
          </div>
          <p className="tz-res-desc text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed max-w-lg mx-auto mb-8">
            由于模组授权协议原因，本站无法直接提供整合包文件。我们整理了 MC百科、CurseForge、Modrinth 等主流平台的整合包导航，方便你快速找到视频中使用的整合包。
          </p>
          <div className="tz-res-btn flex items-center justify-center gap-3 flex-wrap">
            <Link to="/tz-resources" className="btn-glass text-sm">平台导航 <FiExternalLink size={14} /></Link>
            <Link to="/resources/minecraft-pack" className="btn-glass text-sm">主页资源 <FiPackage size={14} /></Link>
          </div>
        </div>
      </section>

      <section id="tz-community" className="py-20 sm:py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="tz-com-title text-center mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-800 dark:text-neutral-50 mb-3">粉丝社区</h2>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm">加入粉丝群，获取最新开播和更新通知</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {downloadItems.map((item, i) => (
              <div key={i} className={`tz-com-card glass-card p-5 group ${item.disabled ? 'opacity-70' : ''}`}>
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl liquid-glass-strong flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">{item.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-neutral-800 dark:text-neutral-100">{item.title}</h3>
                      {item.status && <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${item.statusColor}`}>{item.status}</span>}
                    </div>
                    <p className="text-neutral-500 dark:text-neutral-400 text-xs mb-3">{item.desc}</p>
                    <div className="flex items-center gap-2">
                      {item.code && <span className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded-md">{item.code}</span>}
                      <a href={item.url} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 hover:scale-105 ${item.btnColor} text-white`} {...(item.disabled ? { onClick: (e) => e.preventDefault(), tabIndex: -1, 'aria-disabled': true } : {})}>
                        <FiExternalLink size={11} />{item.btnLabel}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="tz-com-footer text-center mt-10 text-xs text-neutral-400 dark:text-neutral-500">{'// 每晚8点-10点直播 · 特殊情况可能暂停，详见B站动态或QQ群'}</p>
        </div>
      </section>

      <section id="tz-contact" className="py-20 sm:py-24 px-6">
        <div className="max-w-xl mx-auto text-center">
          <div className="tz-contact-title mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-800 dark:text-neutral-50 mb-2">与我联系</h2>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm">直播通知 · 催更讨论 · 商务合作，欢迎通过以下方式联系</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <a className="tz-contact-card glass-card flex items-center gap-4 group transition-all hover:shadow-lg" href="https://live.bilibili.com/303427" target="_blank" rel="noopener noreferrer">
              <div className="w-11 h-11 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300"><FiExternalLink size={18} /></div>
              <div className="text-left"><div className="font-medium text-neutral-800 dark:text-neutral-100 text-sm">B站直播间</div><div className="text-xs text-neutral-500">每晚8点-10点直播 · 特殊情况可能暂停，详见B站动态</div></div>
            </a>
            <a className="tz-contact-card glass-card flex items-center gap-4 group transition-all hover:shadow-lg" href="https://space.bilibili.com/25770857" target="_blank" rel="noopener noreferrer">
              <div className="w-11 h-11 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300"><FiMessageCircle size={18} /></div>
              <div className="text-left"><div className="font-medium text-neutral-800 dark:text-neutral-100 text-sm">B站空间</div><div className="text-xs text-neutral-500">关注获取更多视频</div></div>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
