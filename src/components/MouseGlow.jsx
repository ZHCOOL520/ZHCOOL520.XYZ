import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function MouseGlow() {
  const glowRef = useRef(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    const xTo = gsap.quickTo(glow, 'x', { duration: 0.6, ease: 'power2' });
    const yTo = gsap.quickTo(glow, 'y', { duration: 0.6, ease: 'power2' });

    const onMove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
      gsap.to(glow, { opacity: 1, duration: 0.3, overwrite: 'auto' });
    };

    const onLeave = () => {
      gsap.to(glow, { opacity: 0, duration: 0.3 });
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return <div ref={glowRef} className="mouse-glow" />
}
