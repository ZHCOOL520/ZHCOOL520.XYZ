import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext.jsx';

const navLinks = [
  { name: '首页', href: '#hero' },
  { name: '资源', href: '#resources' },
  { name: '关于', href: '#about' },
  { name: '技能', href: '#skills' },
  { name: '项目', href: '#projects' },
  { name: '联系', href: '#contact' },
];

const linkBase = 'text-sm font-medium transition-colors';
const linkActive = 'text-neon-cyan border-b-2 border-neon-cyan';
const linkInactive = 'text-light-700 dark:text-gray-400 hover:text-light-900 dark:hover:text-white border-b-2 border-transparent';

function NavItem({ link, isActive, onClick, compact }) {
  const cls = `${linkBase} ${compact ? '' : 'pb-1'} ${isActive ? linkActive : linkInactive}`;
  return (
    <button onClick={onClick} className={`${cls} bg-transparent border-none cursor-pointer`}>
      {link.name}
    </button>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { resolvedTheme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      document.querySelectorAll('section[id]').forEach((s) => {
        if (window.scrollY >= s.offsetTop - 200) setActiveSection(s.id);
      });
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const isActive = (link) => activeSection === link.href.slice(1);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 will-change-transform ${scrolled ? 'glass shadow-lg shadow-neon-cyan/5' : ''}`}
      style={{ background: scrolled ? undefined : 'transparent', backdropFilter: scrolled ? undefined : 'none', WebkitBackdropFilter: scrolled ? undefined : 'none', transform: 'translateZ(0)' }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <button onClick={() => handleNav('#hero')} className="text-xl font-bold font-mono gradient-text bg-transparent border-none cursor-pointer">
          {'ZHCOOL520'}
        </button>

        <div className="hidden md:flex items-center gap-4">
          <button onClick={toggleTheme}
            className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-neon-cyan hover:bg-light-200 dark:hover:bg-dark-700 transition-all"
            title={resolvedTheme === 'dark' ? '切换到亮色模式' : '切换到暗色模式'}>
            {resolvedTheme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>
          {navLinks.map((link) => (
            <NavItem key={link.href} link={link} isActive={isActive(link)} onClick={() => handleNav(link.href)} />
          ))}
        </div>

        <div className="md:hidden flex items-center gap-3">
          <button onClick={toggleTheme} className="p-1.5 rounded-lg text-light-700 dark:text-gray-300 hover:text-neon-cyan transition-colors">
            {resolvedTheme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="text-light-700 dark:text-gray-300 hover:text-neon-cyan transition-colors z-50">
            {mobileOpen ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="md:hidden glass border-t border-black/5 dark:border-white/5">
            <div className="flex flex-col py-4 px-6 gap-4">
              {navLinks.map((link) => (
                <NavItem key={link.href} link={link} isActive={isActive(link)} onClick={() => handleNav(link.href)} compact />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
