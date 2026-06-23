import { useRef, useState, useMemo, useCallback } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { FiSearch, FiGrid } from 'react-icons/fi';
import { resourceList, categories } from './data/index.js';
import ResourceCard from './components/ResourceCard.jsx';
import PageLayout from '../../components/shared/PageLayout.jsx';
import BackLink from '../../components/shared/BackLink.jsx';

export default function Resources() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const headerRef = useRef(null);
  const filterRef = useRef(null);
  const gridRef = useRef(null);
  const footerRef = useRef(null);

  const filtered = useMemo(() => {
    return resourceList.filter(item => {
      const matchCategory = activeCategory === 'all' || item.category === activeCategory;
      const q = searchQuery.toLowerCase();
      const matchSearch = !q || item.title.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q) || item.tags.some(t => t.toLowerCase().includes(q));
      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  useGSAP(() => {
    gsap.set(headerRef.current, { autoAlpha: 0, y: 30 });
    gsap.set(filterRef.current, { autoAlpha: 0, y: 20 });
    const cards = gridRef.current?.children;
    if (cards?.length) gsap.set(cards, { autoAlpha: 0, y: 30, scale: 0.9 });
    gsap.set(footerRef.current, { autoAlpha: 0 });

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.to(headerRef.current, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'back.out(1.7)' })
      .to(filterRef.current, { autoAlpha: 1, y: 0, duration: 0.4, ease: 'back.out(1.5)' }, '-=0.1')
      .to(cards, { autoAlpha: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, ease: 'elastic.out(1, 0.3)' }, '-=0.1')
      .to(footerRef.current, { autoAlpha: 1, duration: 0.4 }, '-=0.1');
  }, { scope: headerRef });

  const handleCategoryChange = useCallback((id) => {
    setActiveCategory(id);
    gsap.fromTo(gridRef.current?.children || [], { autoAlpha: 0, y: 15, scale: 0.95 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.35, stagger: 0.06, ease: 'back.out(1.7)' });
  }, []);

  return (
    <PageLayout maxWidth="max-w-3xl">
      <BackLink to="/" label="返回首页" hash="resources" />

      <div ref={headerRef} className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-black mb-4 tracking-tight text-gradient">资源下载</h1>
        <p className="text-neutral-500 dark:text-neutral-400 text-sm max-w-lg mx-auto">{'// 精选工具与资源合集 · 持续更新中'}</p>
      </div>

      <div ref={filterRef} className="space-y-4 mb-8">
        <div className="relative">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
          <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
            placeholder="搜索资源名称、描述或标签..."
            className="w-full liquid-glass-light rounded-2xl pl-11 pr-4 py-3 text-sm text-neutral-800 dark:text-neutral-100 placeholder-neutral-400 outline-none transition-all duration-300 focus:bg-white/50 dark:focus:bg-white/5 focus:shadow-[0_0_0_2px_rgba(99,102,241,0.15)]" />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map(cat => {
            const isActive = activeCategory === cat.id;
            return (
              <button key={cat.id} onClick={() => handleCategoryChange(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-mono transition-all duration-300 ${
                  isActive
                    ? 'liquid-glass-strong text-indigo-600 dark:text-indigo-400 shadow-sm'
                    : 'liquid-glass-light text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200'
                }`}>
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      <div ref={gridRef} className="space-y-5">
        {filtered.length > 0 ? filtered.map(item => (
          <ResourceCard key={item.id} item={item} />
        )) : (
          <div className="glass-card py-16 text-center">
            <FiGrid className="mx-auto text-neutral-300 dark:text-neutral-600 mb-3" size={32} />
            <p className="text-sm text-neutral-400 dark:text-neutral-500">没有找到匹配的资源</p>
          </div>
        )}
      </div>

      <div ref={footerRef} className="mt-12 text-center">
        <p className="text-xs text-neutral-400 dark:text-neutral-500">{'// 所有资源来自网络，仅供学习交流'}</p>
      </div>
    </PageLayout>
  );
}
