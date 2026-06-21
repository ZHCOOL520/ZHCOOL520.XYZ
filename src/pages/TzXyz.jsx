import { motion } from 'framer-motion';
import { FiExternalLink, FiDownload, FiMail, FiMessageCircle, FiHeart } from 'react-icons/fi';
import { SiBilibili, SiGithub } from 'react-icons/si';
import { Link } from 'react-router-dom';
import { HiArrowLeft } from 'react-icons/hi';

const socialLinks = [
  { icon: SiBilibili, label: 'Bilibili', url: 'https://space.bilibili.com/', color: 'hover:bg-[#FB7299]' },
  { icon: SiGithub, label: 'GitHub', url: 'https://github.com/', color: 'hover:bg-[#333]' },
  { icon: FiMail, label: '邮箱', url: 'mailto:example@qq.com', color: 'hover:bg-[#43B9B8]' },
];

const featuredItems = [
  {
    title: '示例作品一',
    desc: '项目简介描述，介绍这个作品的特点和亮点。',
    image: 'https://placehold.co/600x340/27262E/43B9B8?text=Project+1',
    tag: '推荐',
    tagColor: 'bg-[#43B9B8]',
  },
  {
    title: '示例作品二',
    desc: '项目简介描述，介绍这个作品的特点和亮点。',
    image: 'https://placehold.co/600x340/27262E/FF6B35?text=Project+2',
    tag: '热门',
    tagColor: 'bg-[#FF6B35]',
  },
  {
    title: '示例作品三',
    desc: '项目简介描述，介绍这个作品的特点和亮点。',
    image: 'https://placehold.co/600x340/27262E/7CC722?text=Project+3',
    tag: '新作',
    tagColor: 'bg-[#7CC722]',
  },
];

const downloadItems = [
  {
    icon: '📦',
    title: '资源包一',
    desc: '精选资源合集，包含多种实用工具和素材。',
    btnLabel: '立即下载',
    btnColor: 'bg-[#7CC722] hover:bg-[#5FA319]',
    url: '#',
  },
  {
    icon: '🎵',
    title: '资源包二',
    desc: '高质量音频资源，适用于多种场景。',
    btnLabel: '立即下载',
    btnColor: 'bg-[#00B4FF] hover:bg-[#008FCC]',
    url: '#',
  },
  {
    icon: '🎮',
    title: '资源包三',
    desc: '游戏相关资源与工具集合。',
    btnLabel: '立即下载',
    btnColor: 'bg-[#FF6B35] hover:bg-[#D9552B]',
    url: '#',
  },
  {
    icon: '🛠️',
    title: '资源包四',
    desc: '开发工具与环境配置一键包。',
    btnLabel: '立即下载',
    btnColor: 'bg-[#43B9B8] hover:bg-[#359998]',
    url: '#',
  },
];

const stagger = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' },
  }),
};

export default function TzXyz() {
  return (
    <div className="min-h-screen bg-[#F0EFEB] dark:bg-dark-900 transition-colors duration-300">
      {/* ==================== Hero Section ==================== */}
      <section className="relative bg-[#27262E] overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute inset-0 opacity-10 dark:opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#43B9B8] rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#FF6B35] rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-[950px] mx-auto px-6 py-20 sm:py-28">
          {/* 返回链接 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-10"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-[#A8A8AB] hover:text-[#43B9B8] transition-colors text-sm"
            >
              <HiArrowLeft aria-hidden="true" />
              <span>返回主站</span>
            </Link>
          </motion.div>

          {/* 头像 + 标题 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row items-center sm:items-start gap-8"
          >
            {/* 头像 */}
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-[#43B9B8] to-[#2D8B8A] flex items-center justify-center text-5xl flex-shrink-0 ring-4 ring-white/10 shadow-2xl">
              🧑‍💻
            </div>

            <div className="text-center sm:text-left">
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 tracking-tight">
                关于 TZ
              </h1>
              <p className="text-base sm:text-lg text-[#A8A8AB] leading-relaxed max-w-lg">
                原创内容创作者 · 技术爱好者 · 分享有趣的事物
              </p>

              {/* 社交按钮 */}
              <div className="flex items-center gap-3 mt-6 justify-center sm:justify-start flex-wrap">
                {socialLinks.map((link, i) => (
                  <motion.a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-[10px] border-2 border-[#3A3A42] text-white text-sm font-medium transition-all duration-300 ${link.color} hover:border-transparent hover:text-white hover:scale-105`}
                  >
                    <link.icon size={18} />
                    <span>{link.label}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* 底部过渡 */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-[#FF8C42]/10 pointer-events-none" />
      </section>

      {/* ==================== 特色内容 Section ==================== */}
      <section className="py-20 sm:py-24" style={{ background: 'linear-gradient(180deg, rgba(255,140,66,0.12) 0%, rgba(255,140,66,0.04) 40%, transparent 100%)' }}>
        <div className="max-w-[950px] mx-auto px-6">
          {/* 标题 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-light-900 dark:text-white mb-3">
              精选内容
            </h2>
            <p className="text-light-500 dark:text-gray-500 text-sm max-w-md mx-auto">
              各种有趣的内容和项目，持续更新中
            </p>
          </motion.div>

          {/* 卡片网格 */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredItems.map((item, i) => (
              <motion.article
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={stagger}
                className="group relative rounded-[12px] overflow-hidden bg-white dark:bg-dark-800 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                {/* 图片区域 */}
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* hover 遮罩 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="w-14 h-14 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                      <FiExternalLink className="text-white" size={22} />
                    </span>
                  </div>
                  {/* 标签 */}
                  {item.tag && (
                    <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-[6px] text-xs font-medium text-white ${item.tagColor}`}>
                      {item.tag}
                    </span>
                  )}
                </div>

                {/* 文字区域 */}
                <div className="p-5">
                  <h3 className="font-bold text-light-900 dark:text-white mb-2 group-hover:text-[#43B9B8] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-light-500 dark:text-gray-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>

          {/* 更多按钮 */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center mt-10"
          >
            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] border-2 border-[#43B9B8] text-[#43B9B8] hover:bg-[#43B9B8] hover:text-white transition-all duration-300 text-sm font-medium"
            >
              查看更多
              <FiExternalLink size={15} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ==================== 资源下载 Section ==================== */}
      <section className="py-20 sm:py-24 bg-[#27262E]">
        <div className="max-w-[950px] mx-auto px-6">
          {/* 标题 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              资源下载
            </h2>
            <p className="text-[#A8A8AB] text-sm max-w-md mx-auto">
              精选资源合集，持续更新中
            </p>
          </motion.div>

          {/* 下载卡片 */}
          <div className="grid sm:grid-cols-2 gap-5">
            {downloadItems.map((item, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={stagger}
                className="group relative rounded-[12px] bg-white/[0.06] hover:bg-white/[0.10] transition-all duration-300 p-6 border border-white/[0.06] hover:border-white/[0.12]"
              >
                <div className="flex items-start gap-4">
                  {/* 图标 */}
                  <div className="w-12 h-12 rounded-[10px] bg-white/10 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-white mb-1.5">{item.title}</h3>
                    <p className="text-sm text-[#A8A8AB] leading-relaxed mb-4">{item.desc}</p>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-[8px] text-white text-xs font-medium transition-all duration-300 ${item.btnColor}`}
                    >
                      <FiDownload size={14} />
                      {item.btnLabel}
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 底部说明 */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center mt-10 text-xs text-[#666]"
          >
            {'// 所有资源来自网络，仅供学习交流，请于下载后 24 小时内删除'}
          </motion.p>
        </div>
      </section>

      {/* ==================== 联系 Section ==================== */}
      <section className="py-20 sm:py-24 bg-[#F0EFEB] dark:bg-dark-900">
        <div className="max-w-[600px] mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-light-900 dark:text-white mb-3">
              与我联系
            </h2>
            <p className="text-light-500 dark:text-gray-500 text-sm mb-10 leading-relaxed">
              有任何问题或合作意向，欢迎通过以下方式联系我
            </p>
          </motion.div>

          {/* 联系卡片 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="grid sm:grid-cols-2 gap-4"
          >
            <a
              href="mailto:example@qq.com"
              className="group flex items-center gap-4 p-5 rounded-[12px] bg-white dark:bg-dark-800 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-11 h-11 rounded-[10px] bg-[#43B9B8]/10 flex items-center justify-center text-[#43B9B8] group-hover:bg-[#43B9B8] group-hover:text-white transition-all duration-300">
                <FiMail size={20} />
              </div>
              <div className="text-left">
                <div className="font-medium text-light-900 dark:text-white text-sm">发送邮件</div>
                <div className="text-xs text-light-500 dark:text-gray-500">example@qq.com</div>
              </div>
            </a>

            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-5 rounded-[12px] bg-white dark:bg-dark-800 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-11 h-11 rounded-[10px] bg-[#FF6B35]/10 flex items-center justify-center text-[#FF6B35] group-hover:bg-[#FF6B35] group-hover:text-white transition-all duration-300">
                <FiMessageCircle size={20} />
              </div>
              <div className="text-left">
                <div className="font-medium text-light-900 dark:text-white text-sm">加入群聊</div>
                <div className="text-xs text-light-500 dark:text-gray-500">QQ群：123456789</div>
              </div>
            </a>
          </motion.div>

          {/* 版权 */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-12 text-xs text-[#9DA0A4] dark:text-gray-600"
          >
            Copyright © {new Date().getFullYear()} TZ · Powered by{' '}
            <span className="text-[#43B9B8]"><FiHeart className="inline" size={12} /></span>
          </motion.p>
        </div>
      </section>
    </div>
  );
}
