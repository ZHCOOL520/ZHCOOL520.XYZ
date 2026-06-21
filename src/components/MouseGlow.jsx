import { useEffect, useRef } from 'react';

export default function MouseGlow() {
  const glowRef = useRef(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    let leaving = false;

    const snap = (x, y) => {
      glow.style.transform = `translate(${x}px, ${y}px)`;
      glow.style.opacity = '0';
    };

    const onMove = (e) => {
      leaving = false;
      glow.style.opacity = '1';
      glow.style.transform = `translate(${e.clientX - 150}px, ${e.clientY - 150}px)`;
    };

    const onLeave = () => {
      leaving = true;
      snap(-300, -300);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return <div ref={glowRef} className="mouse-glow" style={{ opacity: 0 }} />;
}
