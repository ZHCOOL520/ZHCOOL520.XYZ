import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext.jsx';

const navLinks = [
  { name: '首页', href: '#hero' },
  { name: '关于', href: '#about' },
  { name: '技能', href: '#skills' },
  { name: '项目', href: '#projects' },
  { name: '联系', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { resolvedTheme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = document.querySelectorAll('section[id]');
      sections.forEach((section) => {
        const top = section.offsetTop - 200;
        if (window.scrollY >= top) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 will-change-transform ${
        scrolled ? 'glass shadow-lg shadow-neon-cyan/5' : ''
      }}`}
      style={{
        background: scrolled ? undefined : 'transparent',
        backdropFilter: scrolled ? undefined : 'none',
        WebkitBackdropFilter: scrolled ? undefined : 'none',
        transform: 'translateZ(0)',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          className="text-xl font-bold font-mono gradient-text"
        >
          {'<ZHCOOL520 />'}
        </a>

        {/* Right side controls */}
        <div className="hidden md:flex items-center gap-4">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-neon-cyan dark:hover:text-neon-cyan hover:bg-light-200 dark:hover:bg-dark-700 transition-all"
            title={resolvedTheme === 'dark' ? '切换到亮色模式' : '切换到暗色模式'}
          >
            {resolvedTheme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`relative text-sm font-medium transition-colors duration-300 ${
                activeSection === link.href.slice(1)
                  ? 'text-neon-cyan'
                  : 'text-light-700 dark:text-gray-400 hover:text-light-900 dark:hover:text-white'
              }`}
            >
              {link.name}
              {activeSection === link.href.slice(1) && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-neon-cyan to-neon-purple rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
        </div>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-lg text-light-700 dark:text-gray-300 hover:text-neon-cyan transition-colors"
          >
            {resolvedTheme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-light-700 dark:text-gray-300 hover:text-neon-cyan transition-colors z-50"
          >
            {mobileOpen ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-black/5 dark:border-white/5"
          >
            <div className="flex flex-col py-4 px-6 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-sm font-medium transition-colors ${
                    activeSection === link.href.slice(1)
                      ? 'text-neon-cyan'
                      : 'text-light-700 dark:text-gray-400'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
