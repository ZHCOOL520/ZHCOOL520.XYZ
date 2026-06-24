import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { FiGithub } from 'react-icons/fi';
import SectionTitle from './shared/SectionTitle.jsx';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { title: 'EchoMusicPluginst', description: 'EchoMusic 的非官方插件仓库，主打神人。为音乐爱好者提供丰富的插件扩展与个性化功能。', tags: ['JavaScript', 'EchoMusic', 'Plugin'], gradient: 'from-purple-500/20 to-pink-500/20', icon: '🎵', stars: 1, html_url: 'https://github.com/ZHCOOL520/EchoMusicPluginst', linkId: 'echomusic-pluginst' },
  { title: 'AUTOcall', description: '安卓手机批量拨打电话工具，高效自动化通话任务处理，支持批量管理与快捷操作。', tags: ['Kotlin', 'Android', 'Automation'], gradient: 'from-green-500/20 to-emerald-500/20', icon: '📱', stars: 3, html_url: 'https://github.com/ZHCOOL520/AUTOcall', linkId: 'auto-call' },
  { title: 'HarmonyOS-McCraftLaucher', description: '基于 HarmonyOS 的 Minecraft 启动器，为鸿蒙生态打造的原生游戏启动与管理工具。', tags: ['C++', 'HarmonyOS', 'Minecraft'], gradient: 'from-orange-500/20 to-red-500/20', icon: '🎮', stars: 2, html_url: 'https://github.com/ZHCOOL520/HarmonyOS-McCraftLaucher', linkId: 'mccraft-launcher' },
  { title: 'HarmonyOS-AUTOcall', description: 'AUTOcall 的 HarmonyOS 移植版，将批量拨号功能带到鸿蒙平台，MIT 开源协议。', tags: ['TypeScript', 'HarmonyOS', 'MIT'], gradient: 'from-blue-500/20 to-cyan-500/20', icon: '📲', stars: 1, html_url: 'https://github.com/ZHCOOL520/HarmonyOS-AUTOcall', linkId: 'harmonyos-autocall' },
  { title: 'LoliPickaxe-1.20.1AI', description: 'Minecraft 1.20.1 版本的 AI 增强模组，为游戏带来智能化的新玩法与交互体验。', tags: ['Java', 'Minecraft', 'AI', 'Mod'], gradient: 'from-rose-500/20 to-pink-500/20', icon: '⛏️', stars: 2, html_url: 'https://github.com/ZHCOOL520/LoliPickaxe-1.20.1AI', linkId: 'lolipickaxe' },
];

export default function Projects() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const el = sectionRef.current;
    if (!el) return;
    const cards = el.querySelectorAll('.project-card');
    const cta = el.querySelector('.project-cta');
    gsap.set(cards, { autoAlpha: 0, y: 40, scale: 0.95 });
    gsap.set(cta, { autoAlpha: 0 });
    const st1 = ScrollTrigger.create({ trigger: el, start: 'top 88%', onEnter: () => gsap.to(cards, { autoAlpha: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.12, ease: 'power3.out' }), once: true });
    const st2 = ScrollTrigger.create({ trigger: el, start: 'top 82%', onEnter: () => gsap.to(cta, { autoAlpha: 1, duration: 0.6, delay: 0.4, ease: 'power3.out' }), once: true });
    return () => { st1.kill(); st2.kill(); };
  }, { scope: sectionRef });

  return (
    <section id="projects" ref={sectionRef} className="relative py-32 px-6 z-10">
      <div className="max-w-7xl mx-auto">
        <SectionTitle title="项目展示" subtitle="// Featured Projects" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <Link key={i} to={`/projects/${project.linkId}`} className="project-card group relative glass-card h-full flex flex-col cursor-pointer hover:scale-[1.02] transition-transform duration-300">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center text-2xl mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>{project.icon}</div>
                <h3 className="text-lg font-bold mb-3 text-neutral-800 dark:text-neutral-100 group-hover:text-indigo-500 transition-colors">{project.title}</h3>
                <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed mb-5 flex-1">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 text-xs rounded-full bg-neutral-100/80 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-300 font-mono border border-white/50 dark:border-black/20">{tag}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-neutral-200/30 dark:border-white/5">
                  <div className="flex items-center gap-1 text-sm text-yellow-500">
                    <span>⭐</span><span className="font-mono text-xs">{project.stars}</span>
                  </div>
                  <a href={project.html_url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="btn-primary text-sm flex items-center gap-1.5">
                    <FiGithub size={16} /><span>源码</span>
                  </a>
                </div>
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-t from-indigo-500/5 to-transparent" />
              </Link>
          ))}
        </div>

        <div className="project-cta text-center mt-16">
          <a href="https://github.com/ZHCOOL520" target="_blank" rel="noopener noreferrer" className="btn-outline inline-flex items-center gap-2">
            <FiGithub size={18} /> 在 GitHub 上查看更多
          </a>
        </div>
      </div>
    </section>
  );
}
