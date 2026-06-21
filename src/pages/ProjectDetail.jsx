import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useParams } from 'react-router-dom';
import { FiGithub, FiExternalLink, FiStar, FiCode, FiFileText } from 'react-icons/fi';
import { projectsData } from './projectsData.js';
import PageLayout from '../components/shared/PageLayout.jsx';
import BackLink from '../components/shared/BackLink.jsx';
import NotFound from '../components/shared/NotFound.jsx';

export default function ProjectDetail() {
  const { projectId } = useParams();
  const project = projectsData[projectId];
  const bodyRef = useRef(null);

  useEffect(() => {
    const sections = bodyRef.current?.querySelectorAll('[data-anim="section"]');
    if (!sections?.length) return;
    gsap.fromTo(sections, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.35, stagger: 0.06, ease: 'power2.out' });
  }, [projectId]);

  if (!project) return <NotFound title="项目未找到" />;

  return (
    <PageLayout>
      <BackLink to="/" label="返回首页" />
      <div ref={bodyRef}>
        <div data-anim="section" className="mb-10">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl" role="img" aria-hidden="true">{project.icon}</span>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-neutral-800 dark:text-neutral-100 mb-2">{project.title}</h1>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="flex items-center gap-1 text-sm text-yellow-500"><FiStar size={14} aria-hidden="true" />{project.stars}</span>
                {project.tags.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 text-xs rounded-full bg-light-200 dark:bg-dark-600 text-neutral-700 dark:text-neutral-200 border border-black/5 dark:border-white/5 font-mono">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div data-anim="section" className="mb-10">
          <h2 className="flex items-center gap-2 text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-4"><FiFileText className="text-neon-cyan" aria-hidden="true" /> 项目简介</h2>
          <p className="text-neutral-700 dark:text-neutral-200 leading-relaxed text-lg">{project.fullDescription}</p>
        </div>

        <div data-anim="section" className="mb-10">
          <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">📋 README 摘要</h2>
          <div className="glass-card p-6 neon-border"><p className="text-neutral-700 dark:text-neutral-200 leading-relaxed">{project.readmeSummary}</p></div>
        </div>

        <div data-anim="section" className="mb-10">
          <h2 className="flex items-center gap-2 text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-4"><FiStar className="text-neon-purple" aria-hidden="true" /> 关键特性</h2>
          <ul className="space-y-2">
            {project.features.map((feature, i) => (
              <li key={i} className="glass-card text-neutral-700 dark:text-neutral-200 text-sm neon-border">
                <span className="text-neon-cyan mr-2" aria-hidden="true">▸</span>{feature}
              </li>
            ))}
          </ul>
        </div>

        <div data-anim="section" className="mb-10">
          <h2 className="flex items-center gap-2 text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-4"><FiCode className="text-neon-pink" aria-hidden="true" /> 技术栈</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {project.techStack.map((tech, i) => (
              <div key={i} className="glass-card neon-border">
                <div className="font-medium text-neutral-800 dark:text-neutral-100 text-sm mb-1">{tech.name}</div>
                <div className="text-xs text-neutral-700 dark:text-neutral-200">{tech.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div data-anim="section">
          <a href={project.html_url} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-purple text-light-50 dark:text-dark-900 font-semibold text-sm uppercase tracking-wider hover:scale-[1.02] transition-transform shadow-lg shadow-neon-cyan/20">
            <FiGithub size={20} aria-hidden="true" /> 在 GitHub 上查看源码
            <FiExternalLink size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </PageLayout>
  );
}
