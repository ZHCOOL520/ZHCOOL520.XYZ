import { useState, useEffect, useRef } from 'react';

export default function LazyLoadSection({ children, threshold = 0.1, rootMargin = '100px', placeholder = null }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  /*
   * 内容一挂载就重算一次滚动触发器。
   * 占位块换成真实内容会改变文档总高度，不 refresh 的话，后面（以及同屏其它）区块的
   * 进场动画会在错误的滚动位置触发，甚至一直停在透明状态——这里保证"内容一定会出现"。
   * 用动态 import 拿 ScrollTrigger，避免把 44KB 的插件拉进入口包。
   */
  useEffect(() => {
    if (!isVisible) return;
    let cancelled = false;
    const id = requestAnimationFrame(() => {
      import('gsap/ScrollTrigger')
        .then(({ ScrollTrigger }) => { if (!cancelled) ScrollTrigger.refresh(); })
        .catch(() => {});
    });
    return () => { cancelled = true; cancelAnimationFrame(id); };
  }, [isVisible]);

  return (
    <div ref={sectionRef} className="min-h-[240px]">
      {isVisible ? (
        <div className="animate-fade-in">
          {children}
        </div>
      ) : (
        placeholder || (
          <div className="w-full h-64 bg-gradient-to-r from-slate-200/30 via-slate-100/30 to-slate-200/30 dark:from-slate-800/30 dark:via-slate-700/30 dark:to-slate-800/30 rounded-xl animate-pulse" />
        )
      )}
    </div>
  );
}
