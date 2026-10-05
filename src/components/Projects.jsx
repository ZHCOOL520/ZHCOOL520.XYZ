import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link, useNavigate } from 'react-router-dom';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import SectionTitle from './shared/SectionTitle.jsx';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { title: 'AUTOcall', description: '安卓手机批量拨打电话工具，高效自动化通话任务处理，支持批量管理与快捷操作。', tags: ['Kotlin', 'Android', 'Automation'], gradient: 'from-green-500/20 to-emerald-500/20', icon: '📱', stars: 4, html_url: 'https://github.com/ZHCOOL520/AUTOcall', linkId: 'auto-call' },
  { title: 'EchoMusicPluginst', description: 'EchoMusic 的非官方插件仓库，主打神人。为音乐爱好者提供丰富的插件扩展与个性化功能。', tags: ['JavaScript', 'EchoMusic', 'Plugin'], gradient: 'from-purple-500/20 to-pink-500/20', icon: '🎵', stars: 2, html_url: 'https://github.com/ZHCOOL520/EchoMusicPluginst', linkId: 'echomusic-pluginst' },
  { title: 'GTL：天际线奇观', description: 'GTL（格雷科技休闲版）附属模组，手持奇观终端右键奇观原石，一整座 70 万方块的巨构建筑「唰」地长出来。', tags: ['Java', 'Minecraft', 'Forge', 'GTL'], gradient: 'from-indigo-500/20 to-violet-500/20', icon: '🌌', stars: 2, html_url: 'https://github.com/ZHCOOL520/GTL-Skyline-Wonders', linkId: 'gtl-skyline-wonders' },
  { title: 'skylfolk 天穹生灵', description: '把僵尸命名为「喜欢萝莉」，它会变成 1000 血、刀枪不入的飞行 Boss；唯一能击败它的是本模组的调教棒。', tags: ['Java', 'Minecraft', 'Forge', 'MIT'], gradient: 'from-pink-500/20 to-rose-500/20', icon: '🌸', stars: 1, html_url: 'https://github.com/ZHCOOL520/skylfolk', linkId: 'skylfolk' },
  { title: '2019-card', description: '健康码 & 行程卡纪念版，纯前端生成器，致敬那段难忘的岁月。', tags: ['HTML', 'JavaScript', 'Tailwind CSS'], gradient: 'from-teal-500/20 to-green-500/20', icon: '💚', stars: 1, html_url: 'https://github.com/ZHCOOL520/2019-card', linkId: '2019-card', demo_url: '/2019-card' },
  { title: 'LoliPickaxe 1.20.1 移植版', description: '把 1.12.2 的「氪金萝莉」移植到 Minecraft 1.20.1 + Forge 47+，保留无敌、范围挖掘与储藏室等全套能力。', tags: ['Java', 'Minecraft', 'Forge', 'Fork'], gradient: 'from-rose-500/20 to-pink-500/20', icon: '⛏️', stars: 1, html_url: 'https://github.com/ZHCOOL520/LoliPickaxe', linkId: 'lolipickaxe', isFork: true },
];

export default function Projects() {
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  useGSAP(() => {
    const el = sectionRef.current;
    if (!el) return;
    const cards = el.querySelectorAll('.project-card');
    const cta = el.querySelector('.project-cta');
    gsap.set(cards, { autoAlpha: 0, y: 40, scale: 0.95 });
    gsap.set(cta, { autoAlpha: 0 });
    const st1 = ScrollTrigger.create({ trigger: el, start: 'top 88%', onEnter: () => gsap.to(cards, { autoAlpha: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.12, ease: 'power3.out', clearProps: 'transform' }), once: true });
    const st2 = ScrollTrigger.create({ trigger: el, start: 'top 82%', onEnter: () => gsap.to(cta, { autoAlpha: 1, duration: 0.6, delay: 0.4, ease: 'power3.out' }), once: true });
    return () => { st1.kill(); st2.kill(); };
  }, { scope: sectionRef });

  return (
    <section id="projects" ref={sectionRef} className="relative py-32 px-6 z-10">
      <div className="max-w-7xl mx-auto">
        <SectionTitle title="项目展示" subtitle="// Featured Projects" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 卡片整体可点：用 div + navigate 代替 Link 包 a（a 里套 a 是无效 HTML，还会产生两个 Tab 停靠点） */}
          {projects.map((project, i) => (
            <div key={i} role="link" tabIndex={0}
              onClick={() => navigate(`/projects/${project.linkId}`)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate(`/projects/${project.linkId}`); } }}
              className="project-card group relative glass-card h-full flex flex-col cursor-pointer hover:scale-[1.02] transition-transform duration-300">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center text-2xl mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>{project.icon}</div>
                <h3 className="text-lg font-bold mb-3 text-neutral-800 dark:text-neutral-100 group-hover:text-indigo-500 transition-colors">{project.title}</h3>
                <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed mb-5 flex-1">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.isFork && (
                    <span className="px-2.5 py-1 text-xs rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-mono border border-amber-500/20">Fork</span>
                  )}
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 text-xs rounded-full bg-neutral-100/80 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-300 font-mono border border-white/50 dark:border-black/20">{tag}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-neutral-200/30 dark:border-white/5">
                  <div className="flex items-center gap-1 text-sm text-yellow-500">
                    <span>⭐</span><span className="font-mono text-xs">{project.stars}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {project.demo_url && (
                      <a href={project.demo_url} onClick={(e) => e.stopPropagation()} className="text-sm flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-medium hover:scale-105 transition-transform">
                        <FiExternalLink size={14} /><span>示例</span>
                      </a>
                    )}
                    <a href={project.html_url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-sm flex items-center gap-1.5 px-3 py-1.5 rounded-lg btn-primary">
                      <FiGithub size={14} /><span>源码</span>
                    </a>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-t from-indigo-500/5 to-transparent" />
              </div>
          ))}
        </div>

        <div className="project-cta text-center mt-16">
          <Link to="/projects" className="btn-outline inline-flex items-center gap-2">
            <FiGithub size={18} /> 查看更多项目
          </Link>
        </div>
      </div>
    </section>
  );
}
