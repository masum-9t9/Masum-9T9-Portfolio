import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import { ChevronUp, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const GlobalScrollProgress: React.FC = () => {
  const { language } = useLanguage();
  const isBn = language === 'bn';
  const { scrollYProgress, scrollY } = useScroll();

  // Smooth Spring Damping for Scroll Progress (Apple-fluid physics)
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    let lastPct = 0;
    const unsubscribeScroll = scrollY.on('change', (latest) => {
      const shouldShow = latest > 260;
      setShowScrollTop((prev) => (prev !== shouldShow ? shouldShow : prev));
    });

    const unsubscribeProgress = scrollYProgress.on('change', (latest) => {
      const pct = Math.round(latest * 100);
      if (pct !== lastPct) {
        lastPct = pct;
        setScrollPercentage(pct);
      }
    });

    return () => {
      unsubscribeScroll();
      unsubscribeProgress();
    };
  }, [scrollY, scrollYProgress]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {/* 1. Ultra-Sleek Top Viewport Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[3.5px] sm:h-[4px] z-[100] pointer-events-none bg-transparent overflow-hidden">
        <motion.div
          className="h-full origin-left bg-gradient-to-r from-[#FF7A18] via-[#FF9238] to-[#FFF4E5] relative"
          style={{
            scaleX,
            boxShadow: '0 0 16px rgba(255, 122, 24, 0.85), 0 0 6px rgba(255, 255, 255, 0.9)',
          }}
        >
          {/* Leading Sparkling Tip */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#FFF4E5] rounded-full blur-[2px] opacity-90 shadow-[0_0_10px_#FF7A18]" />
        </motion.div>
      </div>

      {/* 2. Floating Circular Scroll Progress & Jump-To-Top Control (Framer Motion) */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 20 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="fixed bottom-6 left-6 z-[80] flex items-center gap-2"
          >
            <motion.button
              type="button"
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.92 }}
              className="relative group p-2.5 sm:p-3 rounded-full bg-[#18120C]/95 border border-[#FF7A18]/35 text-[#FAF6F0] shadow-[0_12px_32px_rgba(0,0,0,0.8),0_0_16px_rgba(255,122,24,0.25)] backdrop-blur-xl flex items-center justify-center cursor-pointer transition-colors hover:border-[#FF7A18]/70"
              title={isBn ? 'উপরে স্ক্রোল করুন' : 'Scroll to top'}
              aria-label="Scroll to top"
            >
              {/* Circular SVG Progress Ring */}
              <svg className="w-8 h-8 sm:w-9 sm:h-9 -rotate-90 pointer-events-none" viewBox="0 0 36 36">
                {/* Background Ring Track */}
                <path
                  className="text-[#FF7A18]/15"
                  strokeWidth="2.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                {/* Dynamic Animated Ring Progress */}
                <path
                  className="text-[#FF7A18]"
                  strokeDasharray={`${scrollPercentage}, 100`}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  style={{
                    transition: 'stroke-dasharray 0.15s ease-out',
                    filter: 'drop-shadow(0 0 3px rgba(255, 122, 24, 0.7))',
                  }}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>

              {/* Center Chevron Icon / Percentage on Hover */}
              <div className="absolute inset-0 flex items-center justify-center">
                <ChevronUp className="w-4 h-4 text-[#FF7A18] group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </motion.button>

            {/* Percentage Label Tag (Hidden on narrow mobile, visible on sm+) */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#18120C]/90 border border-[#FF7A18]/25 backdrop-blur-md text-[10px] font-bold text-[#FF9238] shadow-sm select-none"
            >
              <span>{scrollPercentage}%</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
