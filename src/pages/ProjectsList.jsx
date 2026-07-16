import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { FiGithub, FiExternalLink, FiArrowRight } from 'react-icons/fi';
import { projectsData } from './projectsData.js';
import PageLayout from '../components/shared/PageLayout.jsx';
import BackLink from '../components/shared/BackLink.jsx';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsList() {
  const pageRef = useRef(null);

  useGSAP(() => {
    const el = pageRef.current;
    if (!el) return;
    const header = el.querySelector('.pl-header');
    const cards = el.querySelectorAll('.pl-card');
    
    if (header) gsap.fromTo(header, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out' });
    
    if (cards.length) {
      gsap.set(cards, { autoAlpha: 0, y: 30 });
      gsap.to(cards, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out', delay: 0.2 });
    }
  }, { scope: pageRef });

  const projects = Object.values(projectsData);

  return (
    <PageLayout>
      <div ref={pageRef}>
        <BackLink to="/" label="返回首页" hash="projects" />
        
        <div className="pl-header mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-800 dark:text-neutral-50 mb-4">
            <span className="gradient-text">我的项目</span>
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm sm:text-base max-w-xl">
            开源项目合集，涵盖 Android、HarmonyOS、Minecraft 模组、前端工具等多个领域。
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Link 
              key={project.id} 
              to={`/projects/${project.id}`} 
              className="pl-card group relative glass-card h-full flex flex-col cursor-pointer hover:scale-[1.02] transition-transform duration-300"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center text-2xl mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                {project.icon}
              </div>
              <h3 className="text-lg font-bold mb-3 text-neutral-800 dark:text-neutral-100 group-hover:text-indigo-500 transition-colors">
                {project.title}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed mb-5 flex-1">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-5">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 text-xs rounded-full bg-neutral-100/80 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-300 font-mono border border-white/50 dark:border-black/20">
                    {tag}
                  </span>
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
            </Link>
          ))}
        </div>

        <div className="mt-16 p-6 glass-card rounded-2xl text-center">
          <p className="text-neutral-500 dark:text-neutral-400 mb-4">更多项目持续更新中</p>
          <a href="https://github.com/ZHCOOL520" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-indigo-500 hover:text-indigo-600 font-medium transition-colors">
            <FiGithub size={18} /> 在 GitHub 上查看全部仓库 <FiArrowRight size={14} />
          </a>
        </div>
      </div>
    </PageLayout>
  );
}