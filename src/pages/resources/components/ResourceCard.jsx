import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import { categoryMeta } from '../data/index.js';

export default function ResourceCard({ item }) {
  const meta = categoryMeta[item.category];
  return (
    <Link to={`/resources/${item.id}`}
      className={`block liquid-glass rounded-2xl p-5 sm:p-6 transition-all duration-400 ${meta.border} hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:shadow-indigo-500/15 hover:bg-white/60 dark:hover:bg-[rgba(28,28,56,0.55)]`}>
      <div className="flex items-start gap-4 mb-3">
        <div className={`w-12 h-12 rounded-2xl ${meta.iconBg} flex items-center justify-center flex-shrink-0 shadow-lg text-white transition-transform duration-400 group-hover:scale-110`}>
          <item.icon size={22} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-base font-bold text-neutral-800 dark:text-neutral-100">{item.title}</h3>
            {item.version && <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500 font-mono">{item.version}</span>}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {item.tags.slice(0, 4).map((t, j) => (
              <span key={j} className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 font-mono">{t}</span>
            ))}
            {item.tags.length > 4 && <span className="text-[10px] px-2 py-0.5 text-neutral-400 font-mono">+{item.tags.length - 4}</span>}
          </div>
        </div>
        <span className={`text-[10px] px-2 py-1 rounded-full ${meta.accentBg} ${meta.accent} font-mono flex-shrink-0`}>{meta.label}</span>
      </div>
      <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed line-clamp-2">{item.desc}</p>
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-neutral-100 dark:border-white/5">
        <div className="flex items-center gap-3 text-[11px] text-neutral-400 font-mono">
          {item.size && <span>{item.size}</span>}
          {item.updated && <span>更新于 {item.updated}</span>}
        </div>
        <span className="flex items-center gap-1 text-xs font-medium text-indigo-500">
          查看详情 <FiChevronRight size={13} />
        </span>
      </div>
    </Link>
  );
}
