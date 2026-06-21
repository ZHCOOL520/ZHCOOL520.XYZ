import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useParams, Link } from 'react-router-dom';
import { FiExternalLink, FiCode, FiTarget, FiStar } from 'react-icons/fi';
import { skillsData } from './skillsData.js';
import PageLayout from '../components/shared/PageLayout.jsx';
import BackLink from '../components/shared/BackLink.jsx';
import NotFound from '../components/shared/NotFound.jsx';

const pNames = {
  'auto-call': 'AUTOcall', 'echomusic-pluginst': 'EchoMusicPluginst',
  'mccraft-launcher': 'HarmonyOS-McCraftLaucher', 'harmonyos-autocall': 'HarmonyOS-AUTOcall',
  'lolipickaxe': 'LoliPickaxe-1.20.1AI',
};

export default function SkillDetail() {
  const { skillId } = useParams();
  const skill = skillsData[skillId];
  const bodyRef = useRef(null);

  useEffect(() => {
    const sections = bodyRef.current?.querySelectorAll('[data-anim="section"]');
    if (!sections?.length) return;
    gsap.fromTo(sections, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.35, stagger: 0.06, ease: 'power2.out' });
  }, [skillId]);

  if (!skill) return <NotFound title="技能未找到" />;

  return (
    <PageLayout>
      <BackLink to="/" label="返回首页" />
      <div ref={bodyRef}>
        <div data-anim="section" className="mb-10">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl" role="img" aria-hidden="true">{skill.icon}</span>
            <div>
              <h1 className="text-4xl font-bold text-neutral-800 dark:text-neutral-100">{skill.title}</h1>
              <span className="text-sm text-neutral-700 dark:text-neutral-200 font-mono">{skill.category} · 掌握度 {skill.level}%</span>
            </div>
          </div>
          <div className="skill-bar max-w-md" role="progressbar" aria-valuenow={skill.level} aria-valuemin={0} aria-valuemax={100}>
            <div className="skill-bar-fill" style={{ width: `${skill.level}%` }} />
          </div>
        </div>

        <div data-anim="section" className="mb-10">
          <h2 className="flex items-center gap-2 text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-4"><FiCode className="text-neon-cyan" aria-hidden="true" /> 技术简介</h2>
          <p className="text-neutral-700 dark:text-neutral-200 leading-relaxed text-lg">{skill.description}</p>
        </div>

        <div data-anim="section" className="mb-10">
          <h2 className="flex items-center gap-2 text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-4"><FiStar className="text-neon-purple" aria-hidden="true" /> 核心特性</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {skill.features.map((f, i) => (
              <div key={i} className="glass-card text-neutral-700 dark:text-neutral-200 text-sm neon-border">
                <span className="text-neon-cyan mr-2" aria-hidden="true">▸</span>{f}
              </div>
            ))}
          </div>
        </div>

        <div data-anim="section" className="mb-10">
          <h2 className="flex items-center gap-2 text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-4"><FiTarget className="text-neon-pink" aria-hidden="true" /> 应用场景</h2>
          <ol className="space-y-2 list-decimal list-inside text-neutral-700 dark:text-neutral-200 marker:text-neon-cyan">
            {skill.scenarios.map((sc, i) => <li key={i}>{sc}</li>)}
          </ol>
        </div>

        <div data-anim="section" className="mb-10">
          <h2 className="flex items-center gap-2 text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-4"><FiExternalLink className="text-neon-cyan" aria-hidden="true" /> 官方资源</h2>
          <nav className="space-y-3" aria-label="官方资源链接">
            {skill.links.map((l, i) => (
              <a key={i} href={l.url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 glass-sm rounded-xl p-4 neon-border hover:border-neon-cyan/40 transition-all group"
                aria-label={`打开 ${l.name}`}>
                <FiExternalLink size={18} className="text-neon-cyan group-hover:scale-110 transition-transform" aria-hidden="true" />
                <span className="text-neutral-800 dark:text-neutral-100 text-sm font-medium">{l.name}</span>
              </a>
            ))}
          </nav>
        </div>

        {skill.relatedProjects?.length > 0 && (
          <div data-anim="section">
            <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">🔗 相关项目</h2>
            <nav className="space-y-2" aria-label="相关项目">
              {skill.relatedProjects.map((pId) => (
                <Link key={pId} to={`/projects/${pId}`} className="block glass-card neon-border hover:border-neon-cyan/40 transition-all">
                  <span className="text-neon-cyan text-sm font-medium">{pNames[pId] || pId}</span>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
