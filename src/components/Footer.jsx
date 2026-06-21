import { Link } from 'react-router-dom';
import { FiGithub, FiHeart } from 'react-icons/fi';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-7 px-6 z-10 border-t border-black/5 dark:border-white/5 glass-light">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
        <div className="flex items-center gap-3">
          <span className="font-mono text-gradient font-bold text-xs">ZHCOOL520</span>
          <span className="text-[11px] text-neutral-400 dark:text-neutral-500">
            &copy; {currentYear} · Made with <FiHeart className="inline text-rose-400" size={10} />
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/" className="btn-glass text-[11px] py-1.5 px-3 font-medium">主站</Link>
          <a href="https://github.com/ZHCOOL520" target="_blank" rel="noopener noreferrer" className="text-neutral-400 dark:text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors">
            <FiGithub size={15} />
          </a>
        </div>
      </div>
    </footer>
  );
}
