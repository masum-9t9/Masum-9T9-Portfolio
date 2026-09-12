import React, { useEffect } from 'react';
import Lenis from 'lenis';

let globalLenisInstance: Lenis | null = null;

export const pauseLenis = () => {
  if (globalLenisInstance) {
    globalLenisInstance.stop();
  }
};

export const resumeLenis = () => {
  if (globalLenisInstance) {
    globalLenisInstance.start();
  }
};

export const smoothScrollToTop = (duration = 0.75) => {
  if (globalLenisInstance) {
    globalLenisInstance.scrollTo(0, { 
      immediate: false, 
      duration,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  } else if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

export const smoothScrollToElement = (target: HTMLElement | string, offset = -70, duration = 0.85) => {
  if (globalLenisInstance) {
    globalLenisInstance.scrollTo(target, {
      offset,
      duration,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  } else if (typeof window !== 'undefined') {
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset + offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }
};

export const SmoothScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    // Respect reduced motion user preferences
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    // On mobile touch devices, native hardware compositor scrolling is instantaneous (120Hz)
    const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
    if (isTouchDevice && window.innerWidth < 768) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential smooth easing
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.06,
      syncTouch: false,
      infinite: false,
    });

    globalLenisInstance = lenis;
    if (typeof window !== 'undefined') {
      (window as any).__lenis = lenis;
    }

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Global listener for anchor links or scroll events
    const handlePopState = () => {
      lenis.scrollTo(0, { immediate: false, duration: 0.6 });
    };
    window.addEventListener('popstate', handlePopState);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('popstate', handlePopState);
      lenis.destroy();
      globalLenisInstance = null;
      if (typeof window !== 'undefined') {
        delete (window as any).__lenis;
      }
    };
  }, []);

  return <>{children}</>;
};
