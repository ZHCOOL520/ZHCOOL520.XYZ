import { useState, useCallback } from 'react';
import { FiDownload, FiExternalLink, FiCheck } from 'react-icons/fi';

export default function DownloadButton({ link, meta }) {
  const [copied, setCopied] = useState(false);

  const handleClick = useCallback(async (e) => {
    if (link.code) {
      e.preventDefault();
      try { await navigator.clipboard.writeText(link.code); } catch {
        const ta = document.createElement('textarea');
        ta.value = link.code; ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select();
        document.execCommand('copy'); document.body.removeChild(ta);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      window.open(link.url, '_blank', 'noopener noreferrer');
    }
  }, [link.code, link.url]);

  const { accent, accentBg } = meta;

  return (
    <a href={link.url} target="_blank" rel="noopener noreferrer" onClick={handleClick}
      className={`flex items-center justify-between px-5 py-4 rounded-xl transition-all duration-300 group ${meta.glow} ${copied ? 'liquid-glass-strong' : 'liquid-glass-light'}`}>
      <div className="flex items-center gap-3">
        <div className={`w-11 h-11 rounded-xl ${accentBg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
          {copied ? <FiCheck className={accent} size={18} /> : <FiDownload className={accent} size={18} />}
        </div>
        <div>
          <div className="font-semibold text-sm text-neutral-800 dark:text-neutral-100">{link.label}</div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className={`text-[11px] font-mono ${copied ? 'text-emerald-500' : 'text-neutral-500 dark:text-neutral-400'}`}>
              {copied ? '提取码已复制 ✓' : link.note}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 font-mono">{link.type}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
        <span className="text-[11px] text-indigo-500">立即下载</span>
        <FiExternalLink className="text-indigo-400" size={14} />
      </div>
    </a>
  );
}
