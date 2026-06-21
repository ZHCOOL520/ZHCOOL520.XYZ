import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { FiExternalLink, FiMessageCircle, FiHeart } from 'react-icons/fi';
import { SiBilibili } from 'react-icons/si';
import { Link } from 'react-router-dom';

const socialLinks = [
  { icon: SiBilibili, label: 'B站主页', url: 'https://space.bilibili.com/25770857', color: 'hover:bg-[#FB7299]' },
  { icon: FiExternalLink, label: '直播间', url: 'https://live.bilibili.com/303427', color: 'hover:bg-[#FF6B35]' },
  { icon: FiMessageCircle, label: 'QQ群', url: 'https://qm.qq.com/q/768587905', color: 'hover:bg-[#43B9B8]' },
];

const featuredItems = [
  {
    title: '蒸汽合金炉合出创造能源？开启AE2！格雷空岛爽包Ep1',
    desc: '格雷科技空岛整合包实况，蒸汽合金炉开启创造能源，全面启动AE2自动化！',
    image: '/images/video1.webp',
    url: 'https://www.bilibili.com/video/BV1mdCTBgEjZ',
    tag: '16.0万播放',
    tagColor: 'bg-[#FB7299]',
  },
  {
    title: '模块化巅峰神包！开局送AE，做出创造飞行！新星工程EP1',
    desc: '模块化巅峰整合包实况，开局赠送AE系统，一步到位做出创造飞行！',
    image: '/images/video2.webp',
    url: 'https://www.bilibili.com/video/BV1tWVh6NEtz',
    tag: '7.7万播放',
    tagColor: 'bg-[#FF6B35]',
  },
  {
    title: '资源蜜蜂版无中生有 开局送创造马达！蜂蜂空坊Ep1',
    desc: '蜜蜂版无中生有整合包实况，开局赠送创造马达，开启蜂蜂空坊全新系列冒险！',
    image: '/images/video3.webp',
    url: 'https://www.bilibili.com/video/BV1xeSRBpEt9',
    tag: '6.1万播放',
    tagColor: 'bg-[#7CC722]',
  },
];

const downloadItems = [
  {
    icon: '💬',
    title: '催更①群',
    desc: 'Minecraft模组交流，催更讨论。',
    btnLabel: '已满',
    btnColor: 'bg-[#666] cursor-not-allowed',
    url: '#',
    disabled: true,
    code: '768587905（已满）',
  },
  {
    icon: '💬',
    title: '催更②群',
    desc: '粉丝交流②群，更多讨论空间。',
    btnLabel: '已满',
    btnColor: 'bg-[#666] cursor-not-allowed',
    url: '#',
    disabled: true,
    code: '564472763（已满）',
  },
  {
    icon: '💬',
    title: '催更③群',
    desc: '新群开放中，欢迎各位小伙伴加入！',
    btnLabel: '加入群聊',
    btnColor: 'bg-[#7CC722] hover:bg-[#5FA319]',
    url: 'https://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=o56dxRJfYHO8TN-XI5RdYip0Ofc5tP6x&authKey=hAw3ZnvNAsK51XCYi3ImJdxJtMmqzm2Lel%2BXjXekjlmshwnq8qHmMeAzyfhFUATJ&noverify=0&group_code=694474933',
    code: '694474933',
  },
  {
    icon: 'ℹ️',
    title: 'QQ频道',
    desc: '获取最新动态、直播通知和独家内容。',
    btnLabel: '加入频道',
    btnColor: 'bg-[#00B4FF] hover:bg-[#008FCC]',
    url: 'https://pd.qq.com/s/pd39356778',
    code: 'pd39356778',
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
  useEffect(() => {
    document.title = '天真SkyerNovie的个人主页';
    return () => { document.title = '天真SkyerNovie的个人主页'; };
  }, []);

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
          {/* 头像 + 标题 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row items-center sm:items-start gap-8"
          >
            {/* 头像 */}
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden flex-shrink-0 ring-4 ring-white/10 shadow-2xl">
              <img
                src="/images/avatar.webp"
                alt="天真SkyerNovie"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-center sm:text-left">
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 tracking-tight">
                天真SkyerNovie
              </h1>
              <p className="text-base sm:text-lg text-[#A8A8AB] leading-relaxed max-w-lg">
                Minecraft实况主 · 模组游戏达人 · 每晚8-10直播
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

      {/* ==================== 资源预览 Section ==================== */}
      <section className="py-16 sm:py-20 bg-[#1e1e28]">
        <div className="max-w-[950px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              天真SkyerNovie的资源下载
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-center text-[#A8A8AB] text-sm leading-relaxed max-w-lg mx-auto mb-6"
          >
            提供Minecraft整合包、汉化补丁、材质包以及主播同款配置等资源的下载，所有内容整理自直播与视频中使用的模组与资源，方便大家快速获取。
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center mt-8"
          >
            <Link
              to="/tz-resources"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] border-2 border-[#43B9B8] text-[#43B9B8] hover:bg-[#43B9B8] hover:text-white transition-all duration-300 text-sm font-medium"
            >
              资源页面
              <FiExternalLink size={15} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ==================== 特色内容 Section ==================== */}
      <section id="tz-video" className="py-20 sm:py-24 bg-[#F0EFEB] dark:bg-dark-900 transition-colors duration-300">
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
              精选视频
            </h2>
            <p className="text-light-500 dark:text-gray-500 text-sm max-w-md mx-auto">
              各种Minecraft模组实况与玩法体验，持续更新中
            </p>
          </motion.div>

          {/* 卡片网格 */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredItems.map((item, i) => (
              <motion.a
                key={i}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
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
                  <h3 className="font-bold text-light-900 dark:text-white mb-2 group-hover:text-[#43B9B8] transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-light-500 dark:text-gray-500 leading-relaxed line-clamp-2">
                    {item.desc}
                  </p>
                </div>
              </motion.a>
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
              href="https://space.bilibili.com/25770857/video"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] border-2 border-[#43B9B8] text-[#43B9B8] hover:bg-[#43B9B8] hover:text-white transition-all duration-300 text-sm font-medium"
            >
              查看更多视频
              <FiExternalLink size={15} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ==================== 资源下载 Section ==================== */}
      <section id="tz-community" className="py-20 sm:py-24 bg-[#27262E]">
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
              粉丝社区
            </h2>
            <p className="text-[#A8A8AB] text-sm max-w-md mx-auto">
              加入粉丝群，获取最新开播和更新通知
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
                    <h3 className="font-bold text-white mb-1.5">
                      {item.title}
                      {item.code && <span className="ml-2 text-xs font-mono text-[#A8A8AB]">{item.code}</span>}
                    </h3>
                    <p className="text-sm text-[#A8A8AB] leading-relaxed mb-4">{item.desc}</p>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-[8px] text-white text-xs font-medium transition-all duration-300 ${item.btnColor}`}
                      {...(item.disabled ? { onClick: (e) => e.preventDefault(), tabIndex: -1, 'aria-disabled': true } : {})}
                    >
                      <FiExternalLink size={14} />
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
            className="text-center mt-10 text-xs text-[#9DA0A4]"
          >
            {'// 每晚8-10点直播，周二周五休息 · 视频3-4天更新'}
          </motion.p>
        </div>
      </section>

      {/* ==================== 联系 Section ==================== */}
      <section id="tz-contact" className="py-20 sm:py-24 bg-[#F0EFEB] dark:bg-dark-900">
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
              直播通知 · 催更讨论 · 商务合作，欢迎通过以下方式联系
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
              href="https://live.bilibili.com/303427"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-5 rounded-[12px] bg-white dark:bg-dark-800 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-11 h-11 rounded-[10px] bg-[#FF6B35]/10 flex items-center justify-center text-[#FF6B35] group-hover:bg-[#FF6B35] group-hover:text-white transition-all duration-300">
                <FiExternalLink size={20} />
              </div>
              <div className="text-left">
                <div className="font-medium text-light-900 dark:text-white text-sm">B站直播间</div>
                <div className="text-xs text-light-500 dark:text-gray-500">每晚8-10点直播</div>
              </div>
            </a>

            <a
              href="https://space.bilibili.com/25770857"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-5 rounded-[12px] bg-white dark:bg-dark-800 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-11 h-11 rounded-[10px] bg-[#43B9B8]/10 flex items-center justify-center text-[#43B9B8] group-hover:bg-[#43B9B8] group-hover:text-white transition-all duration-300">
                <FiMessageCircle size={20} />
              </div>
              <div className="text-left">
                <div className="font-medium text-light-900 dark:text-white text-sm">B站空间</div>
                <div className="text-xs text-light-500 dark:text-gray-500">关注获取更多视频</div>
              </div>
            </a>
          </motion.div>

          {/* 版权 */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-12 text-xs text-[#9DA0A4] dark:text-gray-500"
          >
            Copyright © {new Date().getFullYear()} 天真SkyerNovie · 2.4万粉丝 · Powered by{' '}
            <Link to="/" className="hover:text-[#43B9B8] transition-colors">
              <span className="text-[#43B9B8]">ZHCOOL520 <FiHeart className="inline" size={12} /></span>
            </Link>
          </motion.p>
        </div>
      </section>
    </div>
  );
}
