import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiGithub } from 'react-icons/fi';
import SectionTitle from './shared/SectionTitle.jsx';

const projects = [
  {
    title: 'EchoMusicPluginst',
    description: 'EchoMusic 的非官方插件仓库，主打神人。为音乐爱好者提供丰富的插件扩展与个性化功能。',
    tags: ['JavaScript', 'EchoMusic', 'Plugin'],
    gradient: 'from-purple-500/20 to-pink-500/20',
    icon: '🎵',
    stars: 1,
    html_url: 'https://github.com/ZHCOOL520/EchoMusicPluginst',
    linkId: 'echomusic-pluginst',
  },
  {
    title: 'AUTOcall',
    description: '安卓手机批量拨打电话工具，高效自动化通话任务处理，支持批量管理与快捷操作。',
    tags: ['Kotlin', 'Android', 'Automation'],
    gradient: 'from-green-500/20 to-emerald-500/20',
    icon: '📱',
    stars: 3,
    html_url: 'https://github.com/ZHCOOL520/AUTOcall',
    linkId: 'auto-call',
  },
  {
    title: 'HarmonyOS-McCraftLaucher',
    description: '基于 HarmonyOS 的 Minecraft 启动器，为鸿蒙生态打造的原生游戏启动与管理工具。',
    tags: ['C++', 'HarmonyOS', 'Minecraft'],
    gradient: 'from-orange-500/20 to-red-500/20',
    icon: '🎮',
    stars: 2,
    html_url: 'https://github.com/ZHCOOL520/HarmonyOS-McCraftLaucher',
    linkId: 'mccraft-launcher',
  },
  {
    title: 'HarmonyOS-AUTOcall',
    description: 'AUTOcall 的 HarmonyOS 移植版，将批量拨号功能带到鸿蒙平台，MIT 开源协议。',
    tags: ['TypeScript', 'HarmonyOS', 'MIT'],
    gradient: 'from-blue-500/20 to-cyan-500/20',
    icon: '📲',
    stars: 1,
    html_url: 'https://github.com/ZHCOOL520/HarmonyOS-AUTOcall',
    linkId: 'harmonyos-autocall',
  },
  {
    title: 'LoliPickaxe-1.20.1AI',
    description: 'Minecraft 1.20.1 版本的 AI 增强模组，为游戏带来智能化的新玩法与交互体验。',
    tags: ['Java', 'Minecraft', 'AI', 'Mod'],
    gradient: 'from-rose-500/20 to-pink-500/20',
    icon: '⛏️',
    stars: 2,
    html_url: 'https://github.com/ZHCOOL520/LoliPickaxe-1.20.1AI',
    linkId: 'lolipickaxe',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 px-6 z-10">
      <div className="max-w-6xl mx-auto">
        <SectionTitle title="项目展示" subtitle="// Featured Projects" />

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <Link
                to={`/projects/${project.linkId}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`card-hover glass rounded-2xl p-6 h-full flex flex-col border border-black/5 dark:border-white/5 hover:border-neon-cyan/30 block`}
              >
                {/* Project Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform`}>
                  {project.icon}
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold mb-3 text-light-900 dark:text-white group-hover:text-neon-cyan transition-colors">
                  {project.title}
                </h3>
                <p className="text-light-700 dark:text-gray-400 text-sm leading-relaxed mb-5 flex-1">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs rounded-full bg-light-200 dark:bg-dark-600 text-light-700 dark:text-gray-400 border border-black/5 dark:border-white/5 font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Stars & Links */}
                <div className="flex items-center justify-between pt-4 border-t border-black/5 dark:border-white/5">
                  <div className="flex items-center gap-1 text-sm text-yellow-400">
                    <span>⭐</span>
                    <span className="font-mono text-xs">{project.stars}</span>
                  </div>
                  <a
                    href={project.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg bg-neon-purple/10 hover:bg-neon-purple/20 text-neon-purple border border-neon-purple/25 transition-all"
                  >
                    <FiGithub size={16} />
                    <span>源码</span>
                  </a>
                </div>
              </Link>

              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-t from-neon-cyan/5 to-transparent" />
            </motion.div>
          ))}
        </div>

        {/* More projects CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/ZHCOOL520"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-neon-purple/30 text-neon-purple font-medium text-sm hover:bg-neon-purple/10 transition-all"
          >
            <FiGithub size={18} />
            在 GitHub 上查看更多
          </a>
        </motion.div>
      </div>
    </section>
  );
}
