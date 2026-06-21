import gsap from 'gsap';

// Fade up animation
export const fadeUp = (el, delay = 0, duration = 0.5, y = 15) => {
  gsap.fromTo(el, { opacity: 0, y }, { opacity: 1, y: 0, duration, delay, ease: 'power2.out' });
};

// Stagger fade up animation
export const staggerFadeUp = (els, stagger = 0.04, duration = 0.35, y = 15) => {
  gsap.fromTo(els, { opacity: 0, y }, { opacity: 1, y: 0, duration, stagger, ease: 'power2.out' });
};

// Fade in animation
export const fadeIn = (el, delay = 0, duration = 0.4) => {
  gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration, delay, ease: 'power2.out' });
};

// Slide left animation
export const slideLeft = (el, delay = 0) => {
  gsap.fromTo(el, { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.5, delay, ease: 'power2.out' });
};

// Slide right animation
export const slideRight = (el, delay = 0) => {
  gsap.fromTo(el, { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.5, delay, ease: 'power2.out' });
};
