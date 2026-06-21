import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiExternalLink, FiCode, FiTarget, FiStar } from 'react-icons/fi';
import { skillsData } from './skillsData.js';
import PageLayout from '../components/shared/PageLayout.jsx';
import BackLink from '../components/shared/BackLink.jsx';
import NotFound from '../components/shared/NotFound.jsx';
import { staggerFadeUp } from '../utils/animation.js';

const pNames = {
  'auto-call': 'AUTOcall', 'echomusic-pluginst': 'EchoMusicPluginst',
  'mccraft-launcher': 'HarmonyOS-McCraftLaucher', 'harmonyos-autocall': 'HarmonyOS-AUTOcall',
  'lolipickaxe': 'LoliPickaxe-1.20.1AI',
};

const s = (i) => ({ variants: staggerFadeUp, initial: 'hidden', animate: 'visible', custom: i });

export default function SkillDetail() {
  const { skillId } = useParams();
  const skill = skillsData[skillId];

  if (!skill) return <NotFound title="技能未找到" />;

  return (
    <PageLayout>
      <BackLink to="/" label="返回首页" />

      <motion.header {...s(0)} className="mb-10">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-5xl" role="img" aria-hidden="true">{skill.icon}</span>
          <div>
            <h1 className="text-4xl font-bold text-light-900 dark:text-white">{skill.title}</h1>
            <span className="text-sm text-light-700 dark:text-gray-400 font-mono">{skill.category} · 掌握度 {skill.level}%</span>
          </div>
        </div>
        <div className="skill-bar max-w-md" role="progressbar" aria-valuenow={skill.level} aria-valuemin={0} aria-valuemax={100}>
          <div className="skill-bar-fill" style={{ width: `${skill.level}%` }} />
        </div>
      </motion.header>

      <motion.section {...s(1)} className="mb-10">
        <h2 className="flex items-center gap-2 text-xl font-bold text-light-900 dark:text-white mb-4"><FiCode className="text-neon-cyan" aria-hidden="true" /> 技术简介</h2>
        <p className="text-light-700 dark:text-gray-400 leading-relaxed text-lg">{skill.description}</p>
      </motion.section>

      <motion.section {...s(2)} className="mb-10">
        <h2 className="flex items-center gap-2 text-xl font-bold text-light-900 dark:text-white mb-4"><FiStar className="text-neon-purple" aria-hidden="true" /> 核心特性</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {skill.features.map((f, i) => (
            <div key={i} className="glass rounded-xl p-4 text-light-700 dark:text-gray-400 text-sm neon-border">
              <span className="text-neon-cyan mr-2" aria-hidden="true">▸</span>{f}
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section {...s(3)} className="mb-10">
        <h2 className="flex items-center gap-2 text-xl font-bold text-light-900 dark:text-white mb-4"><FiTarget className="text-neon-pink" aria-hidden="true" /> 应用场景</h2>
        <ol className="space-y-2 list-decimal list-inside text-light-700 dark:text-gray-400 marker:text-neon-cyan">
          {skill.scenarios.map((sc, i) => <li key={i}>{sc}</li>)}
        </ol>
      </motion.section>

      <motion.section {...s(4)} className="mb-10">
        <h2 className="flex items-center gap-2 text-xl font-bold text-light-900 dark:text-white mb-4"><FiExternalLink className="text-neon-cyan" aria-hidden="true" /> 官方资源</h2>
        <nav className="space-y-3" aria-label="官方资源链接">
          {skill.links.map((l, i) => (
            <a key={i} href={l.url} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 glass rounded-xl p-4 neon-border hover:border-neon-cyan/40 transition-all group"
              aria-label={`打开 ${l.name}`}>
              <FiExternalLink size={18} className="text-neon-cyan group-hover:scale-110 transition-transform" aria-hidden="true" />
              <span className="text-light-900 dark:text-white text-sm font-medium">{l.name}</span>
            </a>
          ))}
        </nav>
      </motion.section>

      {skill.relatedProjects?.length > 0 && (
        <motion.section {...s(5)}>
          <h2 className="text-xl font-bold text-light-900 dark:text-white mb-4">🔗 相关项目</h2>
          <nav className="space-y-2" aria-label="相关项目">
            {skill.relatedProjects.map((pId) => (
              <Link key={pId} to={`/projects/${pId}`} className="block glass rounded-xl p-4 neon-border hover:border-neon-cyan/40 transition-all">
                <span className="text-neon-cyan text-sm font-medium">{pNames[pId] || pId}</span>
              </Link>
            ))}
          </nav>
        </motion.section>
      )}
    </PageLayout>
  );
}
