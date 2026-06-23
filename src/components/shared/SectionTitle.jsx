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
    gsap.set(el, { autoAlpha: 0, y: 20 });
    const st = ScrollTrigger.create({
      trigger: el, start: 'top 92%',
      onEnter: () => gsap.to(el, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out' }),
      once: true,
    });
    return () => st.kill();
  }, { scope: ref });
  return (
    <div ref={ref} className="text-center mb-12">
      <h2 className={`text-2xl sm:text-3xl font-bold mb-3 ${light ? 'text-white' : 'text-neutral-800 dark:text-white'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-sm font-mono ${light ? 'text-gray-500' : 'text-neutral-500 dark:text-gray-500'} tracking-wide`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
