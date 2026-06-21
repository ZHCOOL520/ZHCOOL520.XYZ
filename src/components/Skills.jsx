import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  SiKotlin, SiTypescript, SiJavascript, SiCplusplus,
  SiAndroid, SiGit, SiGradle,
} from 'react-icons/si';
import { FiCode, FiBox, FiTerminal } from 'react-icons/fi';
import SectionTitle from './shared/SectionTitle.jsx';

const skillNameToId = {
  'Kotlin': 'kotlin',
  'Java': 'java',
  'C++': 'cpp',
  'TypeScript': 'typescript',
  'JavaScript': 'javascript',
  'Android': 'android',
  'HarmonyOS': 'harmonyos',
  'Minecraft Forge': 'minecraft-forge',
  'Minecraft Mod': 'minecraft-mod',
  'Minecraft Plugin': 'minecraft-plugin',
};

const skillCategories = [
  {
    title: '编程语言',
    skills: [
      { name: 'Kotlin', icon: SiKotlin, color: '#7F52FF', level: 88 },
      { name: 'Java', icon: FiCode, color: '#ED8B00', level: 82 },
      { name: 'C++', icon: SiCplusplus, color: '#00599C', level: 78 },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6', level: 80 },
      { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E', level: 85 },
    ],
  },
  {
    title: '平台 & 生态',
    skills: [
      { name: 'Android', icon: SiAndroid, color: '#34A853', level: 90 },
      { name: 'HarmonyOS', icon: FiBox, color: '#FF6B35', level: 80 },
      { name: 'Minecraft Forge', icon: FiTerminal, color: '#8B4513', level: 78 },
    ],
  },
  {
    title: '开发工具',
    skills: [
      { name: 'Git', icon: SiGit, color: '#F05032', level: 88 },
      { name: 'Gradle', icon: SiGradle, color: '#02303A', level: 82 },
      { name: 'Android Studio', icon: SiAndroid, color: '#3DDC84', level: 85 },
    ],
  },
  {
    title: '创作领域',
    skills: [
      { name: 'Minecraft Mod', icon: FiTerminal, color: '#8B4513', level: 80 },
      { name: 'Minecraft Plugin', icon: FiBox, color: '#D4A574', level: 75 },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 px-6 z-10">
      <div className="max-w-6xl mx-auto">
        <SectionTitle title="技术栈" subtitle="// Tech Stack" />

        {/* Skills Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, ci) => (
            <motion.div
              key={ci}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: ci * 0.1 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-6 neon-border"
            >
              <h3 className="text-lg font-bold mb-6 text-neon-cyan font-mono">
                {category.title}
              </h3>
              <div className="space-y-5">
                {category.skills.map((skill, si) => {
                  const sid = skillNameToId[skill.name];
                  return (
                  <motion.div
                    key={si}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: ci * 0.1 + si * 0.08 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <skill.icon
                          size={18}
                          style={{ color: skill.color }}
                        />
                        {sid ? (
                          <Link
                            to={`/skills/${sid}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-light-800 dark:text-gray-300 font-medium hover:text-neon-cyan transition-colors"
                          >
                            {skill.name}
                          </Link>
                        ) : (
                          <span className="text-sm text-light-800 dark:text-gray-300 font-medium">
                            {skill.name}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-light-700 dark:text-gray-500 font-mono">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="skill-bar">
                      <motion.div
                        className="skill-bar-fill"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{
                          duration: 1.2,
                          delay: 0.3 + ci * 0.1 + si * 0.1,
                          ease: 'easeOut',
                        }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Skill Dots Visualization */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 p-8 glass rounded-2xl neon-border"
        >
          <h3 className="text-lg font-bold mb-8 text-center text-neon-purple font-mono">
            {'// 技能雷达'}
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {skillCategories.flatMap((cat) =>
              cat.skills.map((skill) => {
                const skillId = skillNameToId[skill.name];
                const content = (
                  <div className="flex flex-col items-center gap-2">
                    <skill.icon size={36} style={{ color: skill.color }} />
                    <span className="text-xs text-light-700 dark:text-gray-400">{skill.name}</span>
                  </div>
                );

                return skillId ? (
                  <Link
                    key={skill.name}
                    to={`/skills/${skillId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 p-4 rounded-xl glass-hover transition-all cursor-pointer hover:scale-115"
                  >
                    <skill.icon size={36} style={{ color: skill.color }} />
                    <span className="text-xs text-light-700 dark:text-gray-400">{skill.name}</span>
                  </Link>
                ) : (
                  <motion.div
                    key={skill.name}
                    whileHover={{ scale: 1.15 }}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl glass-hover transition-all cursor-default"
                  >
                    <skill.icon size={36} style={{ color: skill.color }} />
                    <span className="text-xs text-light-700 dark:text-gray-400">{skill.name}</span>
                  </motion.div>
                );
              })
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
