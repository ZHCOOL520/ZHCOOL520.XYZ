import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Enhanced page enter with scale + fade
export function useGsapPageEnter() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(el, { opacity: 0, scale: 0.96, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 0.55, ease: 'power3.out' });
  }, []);
  return ref;
}

// Navbar slide in with bounce
export function useGsapSlideDown() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(el, { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' });
  }, []);
  return ref;
}

// Mobile menu with elastic
export function useGsapMobileMenu(open) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open) {
      gsap.fromTo(el, { opacity: 0, y: -20, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'back.out(1.4)' });
    } else {
      gsap.to(el, { opacity: 0, y: -10, duration: 0.2, ease: 'power2.in' });
    }
  }, [open]);
  return ref;
}

// Scroll trigger with variety: fade + scale + slide
export function useGsapInView(delay = 0, duration = 0.5, y = 25) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.set(el, { opacity: 0, scale: 0.92, y });
    const st = ScrollTrigger.create({
      trigger: el, start: 'top 92%',
      onEnter: () => gsap.to(el, { opacity: 1, scale: 1, y: 0, duration, delay, ease: 'power2.out' }),
      once: true,
    });
    return () => st.kill();
  }, [delay, duration, y]);
  return ref;
}

// Stagger with longer delays and elastic variation
export function useGsapStaggerInView(stagger = 0.1, duration = 0.45, y = 30) {
  const containerRef = useRef(null);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const children = el.children;
    if (!children.length) return;
    gsap.set(children, { opacity: 0, scale: 0.9, y });
    const st = ScrollTrigger.create({
      trigger: el, start: 'top 90%',
      onEnter: () => gsap.to(children, { opacity: 1, scale: 1, y: 0, duration, stagger, ease: 'power2.out', overwrite: 'auto' }),
      once: true,
    });
    return () => st.kill();
  }, [stagger, duration, y]);
  return containerRef;
}

// Skill bar with count-up number animation
export function useGsapSkillBar(width) {
  const barRef = useRef(null);
  const numRef = useRef(null);
  useEffect(() => {
    const bar = barRef.current;
    const num = numRef.current;
    if (!bar) return;
    gsap.set(bar, { width: '0%' });
    const obj = { val: 0 };
    const st = ScrollTrigger.create({
      trigger: bar, start: 'top 92%',
      onEnter: () => {
        gsap.to(bar, { width: `${width}%`, duration: 1.5, ease: 'power3.out' });
        if (num) gsap.to(obj, { val: width, duration: 1.5, ease: 'power3.out', onUpdate: () => { num.textContent = Math.round(obj.val) + '%'; } });
      },
      once: true,
    });
    return () => st.kill();
  }, [width]);
  return { barRef, numRef };
}

// Pulse animation for icons
export function useGsapPulse() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const tween = gsap.to(el, { scale: 1.05, duration: 1.8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    return () => tween.kill();
  }, []);
  return ref;
}

// Cleanup helper
export function gsapCleanup(ctx) {
  return () => { if (ctx && typeof ctx.revert === 'function') ctx.revert(); };
}
