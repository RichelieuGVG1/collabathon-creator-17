
import { useEffect } from 'react';

// Utility for staggered animations
export const staggeredAnimation = (
  selector: string, 
  animationClass: string, 
  staggerMs: number = 100,
  delay: number = 0
) => {
  const elements = document.querySelectorAll<HTMLElement>(selector);
  
  elements.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add(animationClass);
    }, delay + index * staggerMs);
  });
};

// Hook for adding animation classes on component mount
export const useAnimateOnMount = (
  selector: string, 
  animationClass: string, 
  staggerMs: number = 100,
  delay: number = 0
) => {
  useEffect(() => {
    staggeredAnimation(selector, animationClass, staggerMs, delay);
  }, [selector, animationClass, staggerMs, delay]);
};

// Animation for page transitions
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0 },
  transition: { 
    duration: 0.4, 
    ease: [0.25, 0.1, 0.25, 1.0] 
  }
};
