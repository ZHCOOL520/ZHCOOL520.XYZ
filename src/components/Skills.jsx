import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { SiKotlin, SiTypescript, SiJavascript, SiCplusplus, SiAndroid, SiGit, SiGradle, SiIntellijidea } from 'react-icons/si';
import { FiCode, FiBox, FiTerminal } from 'react-icons/fi';
import SectionTitle from './shared/SectionTitle.jsx';

gsap.registerPlugin(ScrollTrigger);

const allSkills = [
  { name: 'Kotlin', id: 'kotlin', icon: SiKotlin, color: '#7F52FF' },
  { name: 'Java', id: 'java', icon: FiCode, color: '#ED8B00' },
  { name: 'C++', id: 'cpp', icon: SiCplusplus, color: '#00599C' },
  { name: 'TypeScript', id: 'typescript', icon: SiTypescript, color: '#3178C6' },
  { name: 'JavaScript', id: 'javascript', icon: SiJavascript, color: '#F7DF1E' },
  { name: 'Android', id: 'android', icon: SiAndroid, color: '#34A853' },
  { name: 'HarmonyOS', id: 'harmonyos', icon: FiBox, color: '#FF6B35' },
  { name: 'Minecraft Forge', id: 'minecraft-forge', icon: FiTerminal, color: '#8B4513' },
  { name: 'Minecraft Mod', id: 'minecraft-mod', icon: FiTerminal, color: '#8B4513' },
  { name: 'Minecraft Plugin', id: 'minecraft-plugin', icon: FiBox, color: '#D4A574' },
  { name: 'Git', id: 'git', icon: SiGit, color: '#F05032' },
  { name: 'Gradle', id: 'gradle', icon: SiGradle, color: '#02303A' },
  { name: 'Android Studio', id: 'android-studio', icon: SiIntellijidea, color: '#3DDC84' },
];

export default function Skills() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const el = sectionRef.current;
    if (!el) return;
    const triggers = [];
    const skillButtons = el.querySelectorAll('.skill-btn');
    gsap.set(skillButtons, { autoAlpha: 0, y: 25 });
    triggers.push(ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      onEnter: () => gsap.to(skillButtons, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'power3.out' }),
      once: true,
    }));
    return () => { triggers.forEach(st => st.kill()); };
  }, { scope: sectionRef });

  return (
    <section id="skills" ref={sectionRef} className="relative py-32 px-6 z-10">
      <div className="max-w-6xl mx-auto">
        <SectionTitle title="技术栈" subtitle="// Tech Stack" />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {allSkills.map((skill) => (
            <Link
              key={skill.id}
              to={`/skills/${skill.id}`}
              className="skill-btn group relative liquid-glass rounded-2xl p-4 flex flex-col items-center gap-3 text-center transition-all duration-500 hover:-translate-y-2 hover:scale-[1.05] hover:shadow-xl"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                style={{ background: `${skill.color}20` }} />
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg transition-all duration-400 group-hover:scale-110 group-hover:rotate-6"
                style={{ background: `linear-gradient(135deg, ${skill.color}, ${skill.color}80)` }}
              >
                <skill.icon size={24} className="text-white" />
              </div>
              <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-200 group-hover:text-indigo-500 transition-colors">
                {skill.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}