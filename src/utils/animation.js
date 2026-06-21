export const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export const staggerFadeUp = {
  hidden: { opacity: 0, y: 15 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.35, delay: 0.08 + i * 0.04, ease: 'easeOut' },
  }),
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.4, delay, ease: 'easeOut' },
  }),
};

export const slideLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export const slideRight = {
  hidden: { opacity: 0, x: 40 },
  visible: (delay = 0.1) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.5, delay, ease: 'easeOut' },
  }),
};
