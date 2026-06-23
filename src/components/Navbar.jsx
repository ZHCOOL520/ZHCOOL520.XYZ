import { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { FiSun, FiMoon, FiMonitor, FiMousePointer, FiSettings } from 'react-icons/fi';
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

function SettingsPopover({ isOpen, onClose }) {
  const { theme, setTheme, mouseGlow, toggleMouseGlow } = useTheme();
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose(); };
    if (isOpen) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div ref={ref} className="absolute right-0 top-full mt-2 w-56 p-3 rounded-2xl liquid-glass-strong shadow-2xl z-50 animate-[fadeIn_0.15s_ease-out]">
      <div className="text-[11px] font-mono text-neutral-400 mb-3 px-1">显示设置</div>

      <div className="space-y-1 mb-3">
        {[
          { id: 'light', icon: FiSun, label: '浅色' },
          { id: 'dark', icon: FiMoon, label: '深色' },
          { id: 'system', icon: FiMonitor, label: '跟随系统' },
        ].map(mode => (
          <button key={mode.id} onClick={() => setTheme(mode.id)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all duration-200 ${
              theme === mode.id
                ? 'liquid-glass-light text-indigo-500 font-medium'
                : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-white/30 dark:hover:bg-white/5'
            }`}>
            <mode.icon size={15} />
            <span>{mode.label}</span>
          </button>
        ))}
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-neutral-200/50 dark:via-white/10 to-transparent mb-3" />

      <button onClick={toggleMouseGlow}
        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all duration-200 ${
          mouseGlow
            ? 'text-indigo-500 font-medium'
            : 'text-neutral-500 dark:text-neutral-400'
        } hover:bg-white/30 dark:hover:bg-white/5`}>
        <div className="flex items-center gap-3">
          <FiMousePointer size={15} />
          <span>鼠标光效</span>
        </div>
        <div className={`w-9 h-5 rounded-full transition-colors duration-300 ${mouseGlow ? 'bg-indigo-500' : 'bg-neutral-300 dark:bg-neutral-600'}`}>
          <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300 mt-0.5 ${mouseGlow ? 'translate-x-[18px]' : 'translate-x-[2px]'}`} />
        </div>
      </button>
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { theme, resolvedTheme, setTheme, toggleTheme, mouseGlow, toggleMouseGlow } = useTheme();
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
    const doScroll = () => {
      const el = document.querySelector(href);
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    };
    if (!isHome && !isTzArea) {
      navigate('/');
      requestAnimationFrame(() => requestAnimationFrame(doScroll));
    } else {
      doScroll();
    }
  };

  const handleNav = (href) => {
    setMobileOpen(false);
    if (href.startsWith('/')) { navigate(href); }
    else { scrollTo(href); }
  };

  const toggleSettings = useCallback(() => setSettingsOpen(v => !v), []);
  const closeSettings = useCallback(() => setSettingsOpen(false), []);

  const linkClass = (active) =>
    `btn-glass text-sm font-medium ${active ? 'text-indigo-500 bg-indigo-500/10' : ''}`;

  return (
    <nav ref={navRef} className={`nav-glass ${scrolled ? 'scrolled' : ''}`}>
      <div className="max-w-6xl mx-auto px-6 py-3.5 flex items-center justify-between">
        {isTzArea ? (
          <div className="flex items-center gap-3">
            <button onClick={() => { if (location.pathname === '/tz') window.scrollTo({ top: 0, behavior: 'smooth' }); else navigate('/tz'); }} className="btn-glass text-sm font-medium">主页</button>
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
          <div className="relative">
            <button onClick={toggleSettings} className="p-2 rounded-lg text-neutral-400 hover:text-indigo-500 transition-colors" title="显示设置">
              <FiSettings size={16} />
            </button>
            <SettingsPopover isOpen={settingsOpen} onClose={closeSettings} />
          </div>
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
            <div className="mx-3 h-px bg-gradient-to-r from-transparent via-neutral-200/50 dark:via-white/5 to-transparent" />
            <div className="px-4 py-2">
              <div className="text-[10px] font-mono text-neutral-400 mb-2">显示设置</div>
              <div className="flex gap-2 mb-2">
                {[
                  { id: 'light', icon: FiSun, label: '浅' },
                  { id: 'dark', icon: FiMoon, label: '深' },
                  { id: 'system', icon: FiMonitor, label: '自动' },
                ].map(mode => (
                  <button key={mode.id} onClick={() => setTheme(mode.id)}
                    className={`flex-1 px-2 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                      theme === mode.id
                        ? 'text-indigo-500 bg-indigo-500/10'
                        : 'text-neutral-500 dark:text-neutral-400 bg-white/30 dark:bg-white/5 hover:text-indigo-500'
                    }`}>
                    {mode.label}
                  </button>
                ))}
              </div>
              <button onClick={toggleMouseGlow}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors ${
                  mouseGlow ? 'text-indigo-500' : 'text-neutral-500 dark:text-neutral-400'
                } bg-white/30 dark:bg-white/5 hover:text-indigo-500`}>
                <span>鼠标光效</span>
                <div className={`w-7 h-4 rounded-full transition-colors duration-300 ${mouseGlow ? 'bg-indigo-500' : 'bg-neutral-300 dark:bg-neutral-600'}`}>
                  <div className={`w-3 h-3 rounded-full bg-white shadow-sm transition-transform duration-300 mt-0.5 ${mouseGlow ? 'translate-x-[14px]' : 'translate-x-[2px]'}`} />
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
