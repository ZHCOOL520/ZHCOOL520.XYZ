import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
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

  useGSAP(() => {
    const sections = bodyRef.current?.querySelectorAll('.detail-section');
    if (!sections?.length) return;
    gsap.fromTo(sections, { autoAlpha: 0, y: 15 }, { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.06, ease: 'power3.out' });
  }, { scope: bodyRef, dependencies: [projectId] });

  if (!project) return <NotFound title="项目未找到" />;

  return (
    <PageLayout>
      <BackLink to="/" label="返回首页" hash="projects" />
      <div ref={bodyRef}>
        <div className="detail-section mb-10">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl" role="img" aria-hidden="true">{project.icon}</span>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-neutral-800 dark:text-neutral-100 mb-2">{project.title}</h1>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="flex items-center gap-1 text-sm text-yellow-500"><FiStar size={14} />{project.stars}</span>
                {project.tags.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 text-xs rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 font-mono">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="detail-section mb-10">
          <h2 className="flex items-center gap-2 text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-4"><FiFileText className="text-indigo-500" /> 项目简介</h2>
          <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed text-lg">{project.fullDescription}</p>
        </div>

        <div className="detail-section mb-10">
          <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">📋 README 摘要</h2>
          <div className="glass-card p-6"><p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">{project.readmeSummary}</p></div>
        </div>

        <div className="detail-section mb-10">
          <h2 className="flex items-center gap-2 text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-4"><FiStar className="text-violet-500" /> 关键特性</h2>
          <ul className="space-y-2">
            {project.features.map((feature, i) => (
              <li key={i} className="glass-card text-neutral-600 dark:text-neutral-300 text-sm">
                <span className="text-indigo-500 mr-2">▸</span>{feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="detail-section mb-10">
          <h2 className="flex items-center gap-2 text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-4"><FiCode className="text-pink-500" /> 技术栈</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {project.techStack.map((tech, i) => (
              <div key={i} className="glass-card">
                <div className="font-medium text-neutral-800 dark:text-neutral-100 text-sm mb-1">{tech.name}</div>
                <div className="text-xs text-neutral-600 dark:text-neutral-300">{tech.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="detail-section">
          <a href={project.html_url} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold text-sm uppercase tracking-wider hover:scale-[1.02] transition-transform shadow-lg shadow-indigo-500/20">
            <FiGithub size={20} /> 在 GitHub 上查看源码 <FiExternalLink size={16} />
          </a>
        </div>
      </div>
    </PageLayout>
  );
}
