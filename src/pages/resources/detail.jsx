import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useParams, Link } from 'react-router-dom';
import { FiDownload, FiHardDrive, FiAlertCircle, FiArrowLeft } from 'react-icons/fi';
import { getResource, categoryMeta } from './data/index.js';
import DownloadButton from './components/DownloadButton.jsx';
import PageLayout from '../../components/shared/PageLayout.jsx';
import BackLink from '../../components/shared/BackLink.jsx';
import NotFound from '../../components/shared/NotFound.jsx';

export default function ResourceDetail() {
  const { resourceId } = useParams();
  const item = getResource(resourceId);
  const bodyRef = useRef(null);

  useGSAP(() => {
    const sections = bodyRef.current?.querySelectorAll('.detail-section');
    if (!sections?.length) return;
    gsap.fromTo(sections, { autoAlpha: 0, y: 15 }, { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.06, ease: 'power3.out' });
  }, { scope: bodyRef, dependencies: [resourceId] });

  if (!item) return <NotFound title="资源未找到" />;

  const meta = categoryMeta[item.category];
  const IconComp = item.icon;

  return (
    <PageLayout maxWidth="max-w-3xl">
      <div className="flex items-center gap-3 mb-8 flex-wrap">
        <BackLink to="/resources" label="返回资源列表" />
      </div>

      <div ref={bodyRef}>
        <div className="detail-section mb-8">
          <div className={`glass-card p-6 sm:p-8 ${meta.border}`}>
            <div className="flex items-start gap-5 mb-6">
              <div className={`w-16 h-16 rounded-2xl ${meta.iconBg} flex items-center justify-center flex-shrink-0 shadow-lg text-white`}>
                <IconComp size={28} />
              </div>
              <div className="min-w-0 flex-1 pt-1">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-black text-neutral-800 dark:text-neutral-100">{item.title}</h1>
                  <span className={`text-[11px] px-2.5 py-1 rounded-full ${meta.accentBg} ${meta.accent} font-mono`}>{meta.label}</span>
                </div>
                <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {item.version && (
                <div className="liquid-glass-light rounded-xl px-4 py-3">
                  <div className="text-[10px] font-mono text-neutral-400 mb-1">版本</div>
                  <div className="text-sm font-semibold text-neutral-800 dark:text-neutral-100">{item.version}</div>
                </div>
              )}
              {item.size && (
                <div className="liquid-glass-light rounded-xl px-4 py-3">
                  <div className="text-[10px] font-mono text-neutral-400 mb-1">大小</div>
                  <div className="text-sm font-semibold text-neutral-800 dark:text-neutral-100">{item.size}</div>
                </div>
              )}
              {item.updated && (
                <div className="liquid-glass-light rounded-xl px-4 py-3">
                  <div className="text-[10px] font-mono text-neutral-400 mb-1">更新</div>
                  <div className="text-sm font-semibold text-neutral-800 dark:text-neutral-100">{item.updated}</div>
                </div>
              )}
              <div className="liquid-glass-light rounded-xl px-4 py-3">
                <div className="text-[10px] font-mono text-neutral-400 mb-1">标签</div>
                <div className="flex flex-wrap gap-1">
                  {item.tags.slice(0, 2).map((t, j) => (
                    <span key={j} className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 font-mono">{t}</span>
                  ))}
                </div>
              </div>
            </div>

            {item.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-6">
                {item.tags.map((t, j) => (
                  <span key={j} className={`text-[11px] px-2.5 py-1 rounded-full ${meta.accentBg} ${meta.accent} font-mono`}>{t}</span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="detail-section mb-8">
          <h2 className="flex items-center gap-2 text-lg font-bold text-neutral-800 dark:text-neutral-100 mb-4">
            <FiAlertCircle className="text-indigo-500" size={18} /> 详细介绍
          </h2>
          <div className="glass-card text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed whitespace-pre-line">
            {item.detail}
          </div>
        </div>

        {item.requirements && (
          <div className="detail-section mb-8">
            <h2 className="flex items-center gap-2 text-lg font-bold text-neutral-800 dark:text-neutral-100 mb-4">
              <FiHardDrive className="text-indigo-500" size={18} /> 系统要求
            </h2>
            <div className="liquid-glass-light rounded-2xl px-5 py-4 text-sm text-neutral-600 dark:text-neutral-300">
              {item.requirements}
            </div>
          </div>
        )}

        <div className="detail-section mb-8">
          <h2 className="flex items-center gap-2 text-lg font-bold text-neutral-800 dark:text-neutral-100 mb-4">
            <FiDownload className="text-indigo-500" size={18} /> 下载地址
          </h2>
          <nav className="space-y-3">
            {item.links.map((link, j) => (
              <DownloadButton key={j} link={link} meta={meta} />
            ))}
          </nav>
        </div>

        <div className="detail-section mb-8">
          <Link to="/resources"
            className="inline-flex items-center gap-2 liquid-glass-light rounded-xl px-5 py-3 text-sm text-neutral-600 dark:text-neutral-300 hover:text-indigo-500 transition-all duration-300">
            <FiArrowLeft size={15} /> 返回资源列表
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}
