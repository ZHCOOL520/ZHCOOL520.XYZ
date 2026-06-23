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

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  useEffect(() => {
    gsap.fromTo(navRef.current, { y: -80, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, ease: 'power3.out' });
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href) => {
    if (isTzArea || isHome) {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      requestAnimationFrame(() => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }));
    }
  };

  const handleNav = (href) => {
    setMobileOpen(false);
    if (href.startsWith('/')) { navigate(href); }
    else { scrollTo(href); }
  };

  const linkClass = (active) =>
    `btn-glass text-sm font-medium ${active ? 'text-indigo-500 bg-indigo-500/10' : ''}`;

  return (
    <nav ref={navRef} className={`nav-glass ${scrolled ? 'scrolled' : ''}`}>
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
          <button onClick={toggleTheme} className="p-2 rounded-lg text-neutral-400 hover:text-indigo-500 transition-colors" title="主题">
            {resolvedTheme === 'dark' ? <FiSun size={16} /> : <FiMoon size={16} />}
          </button>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <button onClick={toggleTheme} className="p-1.5 text-neutral-400 hover:text-indigo-500 transition-colors">
            {resolvedTheme === 'dark' ? <FiSun size={16} /> : <FiMoon size={16} />}
          </button>
          <button onClick={() => setMobileOpen((v) => !v)} className="p-1.5 text-neutral-500 hover:text-indigo-500 transition-colors">
            {mobileOpen ? <HiX size={22} /> : <HiMenuAlt3 size={22} />}
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div className="md:hidden nav-mobile animate-[fadeIn_0.2s_ease-out]">
          <div className="flex flex-col px-4 py-3 gap-1">
            {links.map((link, i) => (
              <div key={link.href}>
                {i > 0 && <div className="mx-3 h-px bg-gradient-to-r from-transparent via-neutral-200/50 dark:via-white/5 to-transparent" />}
                <button onClick={() => handleNav(link.href)} className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:bg-white/40 dark:hover:bg-white/5 transition-all duration-200">
                  {link.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
