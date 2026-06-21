import { motion } from 'framer-motion';
import { FiUser, FiMapPin, FiCode, FiGitBranch } from 'react-icons/fi';
import SectionTitle from './shared/SectionTitle.jsx';

const stats = [
  { icon: FiCode, label: '年经验', value: '4+' },
  { icon: FiGitBranch, label: '开源仓库', value: '5' },
  { icon: FiMapPin, label: '所在地', value: '中国' },
  { icon: FiUser, label: 'GitHub', value: '@cool520' },
];

const highlights = [
  'HarmonyOS 与 Android 跨平台开发，专注 Kotlin / C++ / TypeScript',
  'Minecraft Mod & Plugin 创作者，深耕 Java 游戏扩展开发',
  'EchoMusic 非官方插件维护者，活跃于音乐工具生态',
  '热爱开源社区，所有项目公开托管于 GitHub',
  '哔哩哔哩 UP 主，分享开发日常与技术踩坑经验',
];

export default function About() {
  return (
    <section id="about" className="relative py-24 px-6 z-10">
      <div className="max-w-6xl mx-auto">
        <SectionTitle title="关于我" subtitle="// About Me" />

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Avatar/Visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-2xl gradient-border overflow-hidden">
                <div className="w-full h-full bg-light-100 dark:bg-dark-700 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-6xl font-bold gradient-text font-mono">
                      {'{ }'}
                    </span>
                    <p className="text-light-700 dark:text-gray-500 mt-4 text-sm font-mono">ZHCOOL520</p>
                  </div>
                </div>
              </div>
              {/* Decorative rings */}
              <div className="absolute -inset-4 rounded-3xl border border-neon-cyan/10 animate-pulse" />
              <div className="absolute -inset-8 rounded-[32px] border border-neon-purple/5" />
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6 text-light-900 dark:text-white">
              <span className="gradient-text">多平台开发者</span>
            </h3>

            <ul className="space-y-3 mb-8">
              {highlights.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: 0.08 + i * 0.06, ease: 'easeOut' }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3 text-light-700 dark:text-gray-400"
                >
                  <span className="text-neon-cyan mt-1 flex-shrink-0">{'>'}</span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.25 + i * 0.08, ease: 'easeOut' }}
                  viewport={{ once: true }}
                  className="glass rounded-xl p-4 text-center neon-border"
                >
                  <stat.icon className="mx-auto mb-2 text-neon-cyan" size={20} />
                  <div className="text-xl font-bold text-light-900 dark:text-white">{stat.value}</div>
                  <div className="text-xs text-light-700 dark:text-gray-500">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
