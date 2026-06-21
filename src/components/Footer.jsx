import { FiGithub, FiHeart } from 'react-icons/fi';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-10 px-6 border-t border-black/5 dark:border-white/5 z-10">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Logo & Copyright */}
        <div className="text-center sm:text-left">
          <span className="text-sm font-mono gradient-text font-bold">
            {'ZHCOOL520'}
          </span>
          <p className="text-xs text-light-500 dark:text-gray-600 mt-1">
            &copy; {currentYear} All rights reserved.
          </p>
        </div>

        {/* Center - Made with */}
        <div className="flex items-center gap-1.5 text-xs text-light-500 dark:text-gray-600">
          <span>Made with</span>
          <FiHeart className="text-neon-pink" size={14} />
          <span>by ZHCOOL520</span>
        </div>

        {/* Right - Links */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/ZHCOOL520"
            target="_blank"
            rel="noopener noreferrer"
            className="text-light-500 dark:text-gray-500 hover:text-neon-cyan transition-colors"
          >
            <FiGithub size={18} />
          </a>
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#hero')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-xs text-light-500 dark:text-gray-600 hover:text-neon-cyan transition-colors font-mono"
          >
            {'// Back to top ↑'}
          </a>
        </div>
      </div>
    </footer>
  );
}
