import { motion } from 'framer-motion';
import { FiArrowDown, FiGithub, FiMail } from 'react-icons/fi';
import { SiBilibili } from 'react-icons/si';
import { Typewriter } from './Typewriter';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-6 z-10"
    >
      <div className="text-center max-w-4xl">
        {/* Glitch-style decorative line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-3 mb-6 px-4 py-2 rounded-full border border-neon-cyan/20 bg-neon-cyan/5"
        >
          <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
          <span className="text-xs font-mono text-neon-cyan tracking-widest uppercase">
            Developer & Creator
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
        >
          <span className="text-white">你好，我是</span>
          <br />
          <span className="gradient-text">ZHCOOL520</span>
        </motion.h1>

        {/* Typewriter subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-10"
        >
          <Typewriter
            texts={[
              '用代码构建未来 ✨',
              '热爱开源与技术创新',
              'HarmonyOS & Android 开发者',
              'Minecraft Mod & Plugin 创作者',
            ]}
            className="text-lg sm:text-xl md:text-2xl text-gray-400 font-mono"
          />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="glow-btn group px-8 py-3 rounded-lg bg-gradient-to-r from-neon-cyan to-neon-purple text-dark-900 font-semibold text-sm uppercase tracking-wider hover:scale-105 transition-transform"
          >
            查看项目
            <FiArrowDown className="inline ml-2 group-hover:animate-bounce" />
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-3 rounded-lg border border-neon-cyan/30 text-neon-cyan font-semibold text-sm uppercase tracking-wider hover:bg-neon-cyan/10 transition-all"
          >
            联系我
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex items-center justify-center gap-6 mt-12"
        >
          <a
            href="https://github.com/ZHCOOL520"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-neon-cyan transition-colors"
          >
            <FiGithub size={22} />
          </a>
          <a
            href="https://space.bilibili.com/1414910921?spm_id_from=333.1007.0.0"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-neon-pink transition-colors"
          >
            <SiBilibili size={22} />
          </a>
          <a
            href="mailto:ZHCOOL520@qq.com"
            className="text-gray-500 hover:text-neon-purple transition-colors"
          >
            <FiMail size={22} />
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5, y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <FiArrowDown className="text-neon-cyan/50" size={24} />
        </motion.div>
      </div>
    </section>
  );
}
