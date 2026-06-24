import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SectionTitle({ title, subtitle, light = false }) {
  const ref = useRef(null);
  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    const titleEl = el.querySelector('.section-title-text');
    const subtitleEl = el.querySelector('.section-subtitle');
    gsap.set([titleEl, subtitleEl], { autoAlpha: 0, y: 25 });
    const st = ScrollTrigger.create({
      trigger: el, start: 'top 90%',
      onEnter: () => {
        const tl = gsap.timeline();
        tl.to(titleEl, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out' })
          .to(subtitleEl, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.3');
      },
      once: true,
    });
    return () => st.kill();
  }, { scope: ref });
  return (
    <div ref={ref} className="text-center mb-16">
      <h2 className={`section-title-text text-2xl sm:text-3xl md:text-4xl font-bold mb-4 ${light ? 'text-white' : 'text-neutral-800 dark:text-white'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className="section-subtitle text-sm font-mono text-neutral-500 dark:text-gray-400 tracking-widest">
          {subtitle}
        </p>
      )}
      <div className="w-24 h-px mx-auto mt-6 bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
    </div>
  );
}
