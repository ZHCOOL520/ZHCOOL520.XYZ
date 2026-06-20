import { useState, useEffect, useCallback } from 'react';

export function Typewriter({ texts, className = '', speed = 80, deleteSpeed = 40, pauseTime = 2000 }) {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const tick = useCallback(() => {
    const currentText = texts[textIndex];

    if (!isDeleting) {
      if (charIndex < currentText.length) {
        setDisplayText(currentText.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
        return speed;
      } else {
        setIsDeleting(true);
        return pauseTime;
      }
    } else {
      if (charIndex > 0) {
        setDisplayText(currentText.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
        return deleteSpeed;
      } else {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % texts.length);
        return speed;
      }
    }
  }, [charIndex, isDeleting, textIndex, texts, speed, deleteSpeed, pauseTime]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const delay = tick();
      // trigger re-render
    }, tick());
    return () => clearTimeout(timeout);
  }, [tick, displayText]);

  // Use a ref-based approach for smoother animation
  useEffect(() => {
    let timeout;
    const animate = () => {
      const currentText = texts[textIndex];
      if (!isDeleting) {
        if (charIndex < currentText.length) {
          setDisplayText(currentText.substring(0, charIndex + 1));
          setCharIndex((prev) => prev + 1);
          timeout = setTimeout(animate, speed);
        } else {
          timeout = setTimeout(() => {
            setIsDeleting(true);
            animateNext();
          }, pauseTime);
        }
      }
    };

    const animateDelete = () => {
      const currentText = texts[textIndex];
      if (charIndex > 0) {
        setDisplayText(currentText.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
        timeout = setTimeout(animateDelete, deleteSpeed);
      } else {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % texts.length);
        timeout = setTimeout(animateNext, speed);
      }
    };

    const animateNext = () => {
      if (isDeleting) {
        animateDelete();
      } else {
        animate();
      }
    };

    timeout = setTimeout(animateNext, 500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <span className={className}>
      {displayText}
      <span className="inline-block w-0.5 h-[1em] bg-neon-cyan ml-1 align-middle animate-pulse" />
    </span>
  );
}
