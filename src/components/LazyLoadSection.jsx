import { useState, useEffect, useRef } from 'react';

export default function LazyLoadSection({ children, threshold = 0.1, rootMargin = '100px', placeholder = null }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
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

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setIsLoaded(true), 100);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <div ref={sectionRef} className="min-h-[200px]">
      {isLoaded ? (
        <div className="animate-fade-in">
          {children}
        </div>
      ) : (
        placeholder || (
          <div className="w-full h-64 bg-gradient-to-r from-slate-200/50 via-slate-100/50 to-slate-200/50 dark:from-slate-800/50 dark:via-slate-700/50 dark:to-slate-800/50 rounded-xl animate-pulse" />
        )
      )}
    </div>
  );
}
