import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { SiKotlin, SiTypescript, SiJavascript, SiCplusplus, SiAndroid, SiGit, SiGradle } from 'react-icons/si';
import { FiCode, FiBox, FiTerminal } from 'react-icons/fi';
import SectionTitle from './shared/SectionTitle.jsx';

gsap.registerPlugin(ScrollTrigger);

const skillNameToId = {
  'Kotlin': 'kotlin', 'Java': 'java', 'C++': 'cpp',
  'TypeScript': 'typescript', 'JavaScript': 'javascript',
  'Android': 'android', 'HarmonyOS': 'harmonyos',
  'Minecraft Forge': 'minecraft-forge', 'Minecraft Mod': 'minecraft-mod',
  'Minecraft Plugin': 'minecraft-plugin',
};

const progLangs = [
  { name: 'Kotlin', icon: SiKotlin, color: '#7F52FF', level: 88 },
  { name: 'Java', icon: FiCode, color: '#ED8B00', level: 82 },
  { name: 'C++', icon: SiCplusplus, color: '#00599C', level: 78 },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6', level: 80 },
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E', level: 85 },
];

const otherCategories = [
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

function SkillCard({ skill }) {
  const sid = skillNameToId[skill.name];
  return (
    <div className="glass-card-sm">
      <div className="flex items-center gap-3 mb-3">
        <skill.icon size={22} style={{ color: skill.color }} />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            {sid ? (
              <Link to={`/skills/${sid}`} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-neutral-800 dark:text-neutral-100 hover:text-indigo-500 transition-colors">{skill.name}</Link>
            ) : (
              <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-100">{skill.name}</span>
            )}
            <span className="text-xs text-neutral-500 dark:text-neutral-400 font-mono skill-count" data-count={skill.level}>0%</span>
          </div>
          <div className="skill-bar-container">
            <div className="skill-bar-fill" style={{ width: '0%' }} data-bar={skill.level} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const el = sectionRef.current;
    if (!el) return;
    const triggers = [];
    const progCards = el.querySelectorAll('.skill-prog');
    const otherCats = el.querySelectorAll('.skill-cat');
    const radar = el.querySelector('.skill-radar');
    gsap.set(progCards, { autoAlpha: 0, y: 25 });
    gsap.set(otherCats, { autoAlpha: 0, y: 30 });
    gsap.set(radar, { autoAlpha: 0 });
    triggers.push(ScrollTrigger.create({ trigger: el, start: 'top 88%', onEnter: () => gsap.to(progCards, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out' }), once: true }));
    triggers.push(ScrollTrigger.create({ trigger: el, start: 'top 85%', onEnter: () => gsap.to(otherCats, { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.12, ease: 'power3.out' }), once: true }));
    triggers.push(ScrollTrigger.create({ trigger: el, start: 'top 82%', onEnter: () => gsap.to(radar, { autoAlpha: 1, duration: 0.7, delay: 0.2, ease: 'power3.out' }), once: true }));
    el.querySelectorAll('[data-bar]').forEach((bar) => {
      const w = bar.getAttribute('data-bar');
      triggers.push(ScrollTrigger.create({ trigger: bar, start: 'top 92%', onEnter: () => gsap.to(bar, { width: `${w}%`, duration: 1.5, ease: 'power3.out' }), once: true }));
    });
    el.querySelectorAll('.skill-count').forEach((span) => {
      const target = parseInt(span.getAttribute('data-count')) || 0;
      const obj = { val: 0 };
      triggers.push(ScrollTrigger.create({ trigger: span, start: 'top 92%', onEnter: () => gsap.to(obj, { val: target, duration: 1.5, ease: 'power3.out', onUpdate: () => { span.textContent = Math.round(obj.val) + '%'; } }), once: true }));
    });
    return () => { triggers.forEach(st => st.kill()); };
  }, { scope: sectionRef });

  return (
    <section id="skills" ref={sectionRef} className="relative py-32 px-6 z-10">
      <div className="max-w-7xl mx-auto">
        <SectionTitle title="技术栈" subtitle="// Tech Stack" />

        <div className="mb-16">
          <h3 className="text-lg font-bold mb-6 text-neutral-500 dark:text-neutral-400 font-mono">{'// 编程语言'}</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {progLangs.map((skill) => (
              <div key={skill.name} className="skill-prog"><SkillCard skill={skill} /></div>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {otherCategories.map((category, ci) => (
            <div key={ci} className="skill-cat glass-card">
              <h3 className="text-lg font-bold mb-6 text-neutral-500 dark:text-neutral-400 font-mono text-sm uppercase tracking-wide">{category.title}</h3>
              <div className="space-y-6">
                {category.skills.map((skill) => {
                  const sid = skillNameToId[skill.name];
                  return (
                    <div key={skill.name}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <skill.icon size={18} style={{ color: skill.color }} />
                          {sid ? (
                            <Link to={`/skills/${sid}`} target="_blank" rel="noopener noreferrer" className="text-sm text-neutral-800 dark:text-neutral-100 font-medium hover:text-indigo-500 transition-colors">{skill.name}</Link>
                          ) : (
                            <span className="text-sm text-neutral-800 dark:text-neutral-100 font-medium">{skill.name}</span>
                          )}
                        </div>
                        <span className="text-xs text-neutral-500 dark:text-neutral-400 font-mono skill-count" data-count={skill.level}>0%</span>
                      </div>
                      <div className="skill-bar-container">
                        <div className="skill-bar-fill" style={{ width: '0%' }} data-bar={skill.level} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="skill-radar p-8 glass-card">
          <h3 className="text-lg font-bold mb-8 text-center text-neutral-500 dark:text-neutral-400 font-mono">{'// 技能雷达'}</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[...progLangs, ...otherCategories.flatMap(c => c.skills)].map((skill) => {
              const skillId = skillNameToId[skill.name];
              return skillId ? (
                <Link key={skill.name} to={`/skills/${skillId}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 p-4 rounded-xl glass-effect hover:scale-110 transition-all cursor-pointer">
                  <skill.icon size={36} style={{ color: skill.color }} />
                  <span className="text-xs text-neutral-600 dark:text-neutral-300">{skill.name}</span>
                </Link>
              ) : (
                <div key={skill.name} className="flex flex-col items-center gap-2 p-4 rounded-xl glass-effect cursor-default">
                  <skill.icon size={36} style={{ color: skill.color }} />
                  <span className="text-xs text-neutral-600 dark:text-neutral-300">{skill.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
