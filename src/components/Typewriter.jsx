import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export function Typewriter({ texts, className = '', speed = 80, deleteSpeed = 40, pauseTime = 2000 }) {
  const ref = useRef(null);
  const stateRef = useRef({ textIndex: 0, charIndex: 0, isDeleting: false });

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    const state = stateRef.current;
    let timeout;

    const type = () => {
      const currentText = texts[state.textIndex];
      if (!state.isDeleting) {
        if (state.charIndex < currentText.length) {
          state.charIndex++;
          el.textContent = currentText.substring(0, state.charIndex);
          timeout = setTimeout(type, speed);
        } else {
          timeout = setTimeout(() => { state.isDeleting = true; type(); }, pauseTime);
        }
      } else {
        if (state.charIndex > 0) {
          state.charIndex--;
          el.textContent = currentText.substring(0, state.charIndex);
          timeout = setTimeout(type, deleteSpeed);
        } else {
          state.isDeleting = false;
          state.textIndex = (state.textIndex + 1) % texts.length;
          timeout = setTimeout(type, speed);
        }
      }
    };

    timeout = setTimeout(type, 500);
    return () => clearTimeout(timeout);
  }, { scope: ref });

  return (
    <span className={className}>
      <span ref={ref} />
      <span className="inline-block w-0.5 h-[1em] bg-indigo-500 ml-1 align-middle animate-pulse" />
    </span>
  );
}
