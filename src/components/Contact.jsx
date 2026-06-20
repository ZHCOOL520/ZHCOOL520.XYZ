import { motion } from 'framer-motion';
import { FiGithub, FiMail, FiSend, FiMessageCircle } from 'react-icons/fi';
import { SiBilibili } from 'react-icons/si';

const socialLinks = [
  {
    icon: FiGithub,
    label: 'GitHub',
    href: 'https://github.com/ZHCOOL520',
    color: 'hover:text-neon-cyan',
    desc: '查看我的开源项目',
  },
  {
    icon: SiBilibili,
    label: '哔哩哔哩',
    href: 'https://space.bilibili.com/1414910921?spm_id_from=333.1007.0.0',
    color: 'hover:text-neon-pink',
    desc: '关注我的B站动态',
  },
  {
    icon: FiMail,
    label: 'QQ邮箱',
    href: 'mailto:ZHCOOL520@qq.com',
    color: 'hover:text-neon-purple',
    desc: 'ZHCOOL520@qq.com',
  },
  {
    icon: FiMail,
    label: 'Foxmail',
    href: 'mailto:ZHCOOL520@foxmail.com',
    color: 'hover:text-neon-blue',
    desc: 'ZHCOOL520@foxmail.com',
  },
  {
    icon: FiMessageCircle,
    label: 'QQ群',
    href: 'https://qm.qq.com/q/1125585497',
    color: 'hover:text-neon-cyan',
    desc: 'QQ群: 1125585497',
  },
];

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 px-6 z-10">
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="gradient-text">联系我</span>
          </h2>
          <p className="text-light-700 dark:text-gray-500 font-mono text-sm">{'// Get In Touch'}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-4 text-light-900 dark:text-white">
              一起<span className="gradient-text">创造</span>吧
            </h3>
            <p className="text-light-700 dark:text-gray-400 leading-relaxed mb-8">
              如果你有有趣的项目想法，或者想聊聊技术、开源，欢迎随时联系我！
              我始终对新技术和合作机会保持开放态度。
            </p>

            {/* Social Links */}
            <div className="space-y-4">
              {socialLinks.map((link, i) => (
                <motion.a
                  key={i}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                  viewport={{ once: true }}
                  className={`flex items-center gap-4 p-4 rounded-xl glass neon-border ${link.color} transition-all group`}
                >
                  <div className="w-10 h-10 rounded-lg bg-light-100 dark:bg-dark-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <link.icon size={20} />
                  </div>
                  <div>
                    <div className="font-medium text-light-900 dark:text-white text-sm">{link.label}</div>
                    <div className="text-xs text-light-700 dark:text-gray-500">{link.desc}</div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-6 sm:p-8 neon-border"
          >
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm text-light-700 dark:text-gray-400 mb-2 font-mono">{'> 姓名'}</label>
                <input
                  type="text"
                  placeholder="你的名字"
                  className="w-full px-4 py-3 rounded-lg bg-light-100 dark:bg-dark-700 border border-black/10 dark:border-white/10 text-light-900 dark:text-white placeholder-light-400 dark:placeholder-gray-600 focus:outline-none focus:border-neon-cyan/50 transition-colors text-sm"
                />
              </div>
              <div>
                <label className="block text-sm text-light-700 dark:text-gray-400 mb-2 font-mono">{'> 邮箱'}</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-lg bg-light-100 dark:bg-dark-700 border border-black/10 dark:border-white/10 text-light-900 dark:text-white placeholder-light-400 dark:placeholder-gray-600 focus:outline-none focus:border-neon-cyan/50 transition-colors text-sm"
                />
              </div>
              <div>
                <label className="block text-sm text-light-700 dark:text-gray-400 mb-2 font-mono">{'> 消息'}</label>
                <textarea
                  rows={4}
                  placeholder="你想说点什么..."
                  className="w-full px-4 py-3 rounded-lg bg-light-100 dark:bg-dark-700 border border-black/10 dark:border-white/10 text-light-900 dark:text-white placeholder-light-400 dark:placeholder-gray-600 focus:outline-none focus:border-neon-cyan/50 transition-colors text-sm resize-none"
                />
              </div>
              <button
                type="submit"
                className="glow-btn w-full py-3 rounded-lg bg-gradient-to-r from-neon-cyan to-neon-purple text-light-50 dark:text-dark-900 font-semibold text-sm uppercase tracking-wider hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
              >
                <FiSend size={16} />
                发送消息
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
