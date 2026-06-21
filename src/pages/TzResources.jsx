import { motion } from 'framer-motion';
import { FiTool } from 'react-icons/fi';

const categories = [
  { icon: '📦', label: '整合包', desc: 'Minecraft 模组整合包' },
  { icon: '🎨', label: '材质包', desc: '精美材质资源' },
  { icon: '💾', label: '存档', desc: '游戏存档分享' },
  { icon: '📝', label: '汉化补丁', desc: '优质模组汉化' },
  { icon: '✨', label: '光影', desc: '光影着色器包' },
];

const stagger = {
  hidden: { opacity: 0, y: 25 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.08, ease: 'easeOut' },
  }),
};

export default function TzResources() {
  return (
    <div className="min-h-screen bg-[#F0EFEB] dark:bg-dark-900 transition-colors duration-300">
      {/* ==================== Header ==================== */}
      <section className="relative bg-[#27262E] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-10 w-80 h-80 bg-[#43B9B8] rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-64 h-64 bg-[#FF6B35] rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-[950px] mx-auto px-6 py-16 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              资源下载
            </h1>
            <p className="text-[#A8A8AB] text-sm max-w-md mx-auto leading-relaxed">
              Minecraft 整合包、材质包、存档、汉化补丁、光影等资源
            </p>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-b from-transparent to-[#1e1e28]/50 pointer-events-none" />
      </section>

      {/* ==================== 施工中提示 ==================== */}
      <section className="py-12 bg-[#1e1e28]">
        <div className="max-w-[950px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-white/[0.04] border border-white/[0.06] max-w-sm mx-auto"
          >
            <div className="w-10 h-10 rounded-xl bg-[#43B9B8]/10 flex items-center justify-center flex-shrink-0">
              <FiTool className="text-[#43B9B8]" size={20} />
            </div>
            <div>
              <div className="font-bold text-white text-sm">施工中</div>
              <div className="text-xs text-[#A8A8AB]">资源内容即将上线，敬请期待</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== 分类占位 ==================== */}
      <section className="py-16 sm:py-20 bg-[#F0EFEB] dark:bg-dark-900 transition-colors duration-300">
        <div className="max-w-[950px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl font-bold text-light-900 dark:text-white mb-2">
              资源分类
            </h2>
            <p className="text-light-500 dark:text-gray-500 text-sm">
              以下分类将在上线后提供对应资源
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((cat, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={stagger}
                className="group rounded-2xl bg-white dark:bg-dark-800 shadow-sm hover:shadow-md transition-all duration-300 p-6 border border-black/5 dark:border-white/5 hover:-translate-y-0.5"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#43B9B8]/10 flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    {cat.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-light-900 dark:text-white mb-1 group-hover:text-[#43B9B8] transition-colors">
                      {cat.label}
                    </h3>
                    <p className="text-xs text-light-500 dark:text-gray-500">{cat.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
