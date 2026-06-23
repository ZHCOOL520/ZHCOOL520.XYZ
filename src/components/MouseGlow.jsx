import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useTheme } from '../context/ThemeContext.jsx';

export default function MouseGlow() {
  const glowRef = useRef(null);
  const posRef = useRef({ x: -999, y: -999 });
  const { mouseGlow } = useTheme();
  const enabledRef = useRef(mouseGlow);

  useEffect(() => { enabledRef.current = mouseGlow; }, [mouseGlow]);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (!enabledRef.current) return;
      gsap.set(glow, { x: e.clientX, y: e.clientY, opacity: 1 });
    };

    const onLeave = () => {
      gsap.to(glow, { opacity: 0, duration: 0.15 });
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;
    if (mouseGlow) {
      const { x, y } = posRef.current;
      if (x > -900) gsap.set(glow, { x, y, opacity: 1 });
    } else {
      gsap.to(glow, { opacity: 0, duration: 0.15 });
    }
  }, [mouseGlow]);

  return <div ref={glowRef} className="mouse-glow" style={{ opacity: 0 }} />
}
