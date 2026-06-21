import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiDownload, FiMonitor, FiPackage, FiMusic, FiArrowRight } from 'react-icons/fi';

const previewItems = [
  { icon: FiMonitor, label: 'Windows 镜像', accent: 'text-cyan-400' },
  { icon: FiPackage, label: 'MC 整合包', accent: 'text-purple-400' },
  { icon: FiMusic, label: '音乐转码', accent: 'text-pink-400' },
];

export default function ResourcePreview() {
  return (
    <section id="resources" className="relative py-20 px-6 z-10">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <div className="group relative rounded-3xl overflow-hidden">
            {/* Animated border */}
            <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-br from-cyan-400 via-purple-400 to-pink-400 opacity-40 group-hover:opacity-70 transition-opacity duration-500">
              <div className="h-full w-full rounded-3xl bg-light-100 dark:bg-dark-900" />
            </div>

            {/* Content */}
            <div className="relative rounded-3xl bg-light-100/70 dark:bg-dark-900/70 backdrop-blur-xl p-8 sm:p-10">
              {/* Header */}
              <div className="flex items-start justify-between gap-6 mb-8">
                <div>
                  <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-neon-cyan/5 border border-neon-cyan/10">
                    <FiDownload className="text-neon-cyan" size={14} />
                    <span className="text-[10px] font-mono text-neon-cyan tracking-widest uppercase">Downloads</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-light-900 dark:text-white mb-2">
                    <span className="gradient-text">资源下载</span>
                  </h2>
                  <p className="text-light-600 dark:text-gray-400 text-sm max-w-md">
                    Windows 系统镜像 · Minecraft 整合包 · 音乐转码工具
                  </p>
                </div>

                <Link
                  to="/resources"
                  className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-purple text-light-50 dark:text-dark-900 font-semibold text-xs uppercase tracking-wider hover:scale-105 transition-transform shadow-lg shadow-neon-cyan/10"
                >
                  查看全部
                  <FiArrowRight size={14} />
                </Link>
              </div>

              {/* Mini cards */}
              <div className="grid grid-cols-3 gap-4">
                {previewItems.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.2 + i * 0.08, ease: 'easeOut' }}
                    viewport={{ once: true }}
                    className="glass rounded-2xl p-4 text-center neon-border hover:border-neon-cyan/30 transition-all"
                  >
                    <div className={`w-10 h-10 mx-auto mb-2 rounded-xl bg-gradient-to-br ${item.accent.replace('text-', 'from-').replace('-400', '-500/20')} flex items-center justify-center`}>
                      <item.icon className={item.accent} size={20} />
                    </div>
                    <span className="text-xs text-light-700 dark:text-gray-400 font-medium">{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
