import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext.jsx';

const navLinks = [
  { name: '首页', href: '#hero' },
  { name: '资源', href: '#resources' },
  { name: '关于', href: '#about' },
  { name: '编程', href: '#skills' },
  { name: '项目', href: '#projects' },
  { name: '联系', href: '#contact' },
];

const tzNavLinks = [
  { name: '视频', href: '#tz-video' },
  { name: '社区', href: '#tz-community' },
  { name: '联系', href: '#tz-contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { resolvedTheme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const isTzArea = location.pathname.startsWith('/tz');
  const links = isTzArea ? tzNavLinks : navLinks;
  const navRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(navRef.current, { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' });
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href) => {
    if (!isHome || isTzArea) {
      const target = isTzArea ? '/tz' : '/';
      navigate(target);
      setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }), 100);
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const linkClass = (active) =>
    `btn-glass text-sm font-medium ${active ? 'text-primary bg-primary/5' : ''}`;

  return (
    <nav ref={navRef} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'nav-glass' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-6 py-3.5 flex items-center justify-between">
        {isTzArea ? (
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/tz')} className="btn-glass text-sm font-medium">主页</button>
            <button onClick={() => navigate('/tz-resources')} className="btn-glass text-sm font-medium">资源</button>
          </div>
        ) : (
          <button onClick={() => scrollTo('#hero')} className="text-lg font-bold font-mono text-gradient tracking-tight">ZHCOOL520</button>
        )}

        <div className="hidden md:flex items-center gap-6">
          {links.map((link) =>
            link.href.startsWith('/') ? (
              <button key={link.href} onClick={() => navigate(link.href)} className={linkClass(location.pathname === link.href)}>{link.name}</button>
            ) : (
              <button key={link.href} onClick={() => scrollTo(link.href)} className={linkClass(false)}>{link.name}</button>
            )
          )}
          <button onClick={toggleTheme} className="p-2 rounded-lg text-neutral-700/40 dark:text-neutral-200/40 hover:text-primary transition-colors" title="主题">
            {resolvedTheme === 'dark' ? <FiSun size={16} /> : <FiMoon size={16} />}
          </button>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <button onClick={toggleTheme} className="p-1.5 text-neutral-700/40 dark:text-neutral-200/40 hover:text-primary transition-colors">
            {resolvedTheme === 'dark' ? <FiSun size={16} /> : <FiMoon size={16} />}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="p-1.5 text-neutral-700/60 dark:text-neutral-200/60 hover:text-primary transition-colors">
            {mobileOpen ? <HiX size={22} /> : <HiMenuAlt3 size={22} />}
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div className="md:hidden nav-glass border-t border-black/5 dark:border-white/5">
          <div className="flex flex-col py-3 px-6 gap-2.5">
            {links.map((link) =>
              link.href.startsWith('/') ? (
                <button key={link.href} onClick={() => { setMobileOpen(false); navigate(link.href); }} className={linkClass(location.pathname === link.href) + ' w-full py-1.5'}>{link.name}</button>
              ) : (
                <button key={link.href} onClick={() => { setMobileOpen(false); scrollTo(link.href); }} className={linkClass(false) + ' w-full py-1.5'}>{link.name}</button>
              )
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
