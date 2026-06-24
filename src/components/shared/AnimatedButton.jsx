import { useState } from 'react';

export default function AnimatedButton({ children, className = '', onClick, ...props }) {
  const [animating, setAnimating] = useState(false);

  const handleClick = (e) => {
    setAnimating(true);
    onClick?.(e);
    setTimeout(() => setAnimating(false), 300);
  };

  return (
    <button
      onClick={handleClick}
      className={`transition-all duration-200 active:scale-95 ${animating ? 'scale-95 opacity-80' : 'hover:scale-105'} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}