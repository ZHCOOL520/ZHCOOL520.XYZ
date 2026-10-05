import { useEffect, useRef } from 'react';

export function Typewriter({ texts, className = '', speed = 80, deleteSpeed = 40, pauseTime = 2000 }) {
  const ref = useRef(null);
  const stateRef = useRef({ textIndex: 0, charIndex: 0, isDeleting: false });

  // texts 数组引用/长度变化时重置索引，避免越界访问
  useEffect(() => {
    stateRef.current.textIndex = 0;
    stateRef.current.charIndex = 0;
    stateRef.current.isDeleting = false;
  }, [texts]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const state = stateRef.current;
    let startTimer = null;
    let loopTimer = null;

    const type = () => {
      const list = Array.isArray(texts) ? texts : [];
      if (list.length === 0) return;
      if (state.textIndex >= list.length) {
        state.textIndex = 0;
        state.charIndex = 0;
        state.isDeleting = false;
      }
      const currentText = list[state.textIndex] ?? '';
      if (!state.isDeleting) {
        if (state.charIndex < currentText.length) {
          state.charIndex++;
          el.textContent = currentText.substring(0, state.charIndex);
          loopTimer = setTimeout(type, speed);
        } else {
          loopTimer = setTimeout(() => { state.isDeleting = true; type(); }, pauseTime);
        }
      } else {
        if (state.charIndex > 0) {
          state.charIndex--;
          el.textContent = currentText.substring(0, state.charIndex);
          loopTimer = setTimeout(type, deleteSpeed);
        } else {
          state.isDeleting = false;
          state.textIndex = (state.textIndex + 1) % list.length;
          loopTimer = setTimeout(type, speed);
        }
      }
    };

    startTimer = setTimeout(type, 500);
    return () => {
      clearTimeout(startTimer);
      clearTimeout(loopTimer);
    };
  }, []);

  return (
    <span className={className}>
      <span ref={ref} />
      <span className="inline-block w-0.5 h-[1em] bg-indigo-500 ml-1 align-middle animate-pulse" />
    </span>
  );
}
