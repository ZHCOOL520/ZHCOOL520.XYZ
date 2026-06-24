import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

export default function BackLink({ to, label = '返回', hash }) {
  const linkTo = hash ? { pathname: to, hash } : to;
  return (
    <Link 
      to={linkTo} 
      className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-white to-neutral-50/80 dark:from-neutral-800/90 dark:to-neutral-700/80 backdrop-blur-xl border border-neutral-200/60 dark:border-neutral-700/60 text-sm font-medium text-neutral-700 dark:text-neutral-200 shadow-sm hover:shadow-xl hover:shadow-indigo-100/50 dark:hover:shadow-neutral-900/50 hover:-translate-x-1.5 hover:-translate-y-0.5 transition-all duration-300 ease-out mb-8" 
      aria-label={`${label}，返回上一级页面`}
    >
      <div className="relative">
        <FiArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-2 group-hover:-translate-y-0.5 text-indigo-500" />
        <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <span className="transition-colors duration-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">{label}</span>
    </Link>
  );
}
