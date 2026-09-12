import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Eye, FolderKanban, ArrowRight, TrendingUp, Sparkles } from 'lucide-react';
import { PortfolioItem } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { UI_TRANSLATIONS } from '../data/translations';

interface ProjectCarouselShowcaseProps {
  items: PortfolioItem[];
  onSelectProject: (item: PortfolioItem) => void;
  onOpenCreatorProfile?: () => void;
  onNavigateToProjects?: () => void;
  title?: string;
  subtitle?: string;
  autoPlayInterval?: number; // In ms, default 4500ms
  showCategoryTabs?: boolean;
}

// Helper to compute circular offset relative to activeIndex
function getCircularOffset(itemIndex: number, activeIndex: number, totalCount: number): number {
  if (totalCount <= 1) return 0;
  let diff = itemIndex - activeIndex;
  while (diff > totalCount / 2) diff -= totalCount;
  while (diff < -totalCount / 2) diff += totalCount;
  return diff;
}

export const ProjectCarouselShowcase: React.FC<ProjectCarouselShowcaseProps> = ({
  items,
  onSelectProject,
  onOpenCreatorProfile,
  onNavigateToProjects,
  title,
  subtitle,
  autoPlayInterval = 4500,
  showCategoryTabs = true,
}) => {
  const { language } = useLanguage();
  const t = UI_TRANSLATIONS[language];

  // Category filter tabs
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [progressPercent, setProgressPercent] = useState<number>(0);

  // Filter items based on activeCategory
  const filteredItems = React.useMemo(() => {
    if (!items || items.length === 0) return [];
    if (activeCategory === 'all') return items;

    return items.filter((item) => {
      const cat = (item.category || '').toLowerCase();
      const label = (item.categoryLabel || '').toLowerCase();

      if (activeCategory === 'design') {
        return (
          cat.includes('poster') ||
          cat.includes('thumbnail') ||
          cat.includes('natok') ||
          label.includes('পোস্টার') ||
          label.includes('ডিজাইন')
        );
      }
      if (activeCategory === 'uiux') {
        return cat.includes('ui') || cat.includes('ux') || label.includes('ui') || label.includes('ux');
      }
      if (activeCategory === 'coding') {
        return (
          cat.includes('custom_theme') ||
          cat.includes('coding') ||
          cat.includes('web') ||
          (item.technologies &&
            item.technologies.some((t) =>
              ['React', 'TypeScript', 'Tailwind', 'HTML5'].some((tech) => t.toLowerCase().includes(tech.toLowerCase()))
            ))
        );
      }
      if (activeCategory === 'content') {
        return cat.includes('education') || cat.includes('content') || label.includes('কন্টেন্ট');
      }
      return item.category === activeCategory;
    });
  }, [items, activeCategory]);

  const currentCount = filteredItems.length;

  useEffect(() => {
    setActiveIndex(0);
    setProgressPercent(0);
  }, [activeCategory]);

  const handleNext = useCallback(() => {
    if (currentCount <= 1) return;
    setActiveIndex((prev) => (prev + 1) % currentCount);
    setProgressPercent(0);
  }, [currentCount]);

  const handlePrev = useCallback(() => {
    if (currentCount <= 1) return;
    setActiveIndex((prev) => (prev - 1 + currentCount) % currentCount);
    setProgressPercent(0);
  }, [currentCount]);

  // Sub-pixel smooth progress bar animation using RAF
  const startTimeRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (isPaused || currentCount <= 1) {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      return;
    }

    startTimeRef.current = performance.now();

    const loop = (now: number) => {
      if (!startTimeRef.current) startTimeRef.current = now;
      const elapsed = now - startTimeRef.current;
      const pct = Math.min(100, (elapsed / autoPlayInterval) * 100);
      setProgressPercent(pct);

      if (elapsed >= autoPlayInterval) {
        handleNext();
        startTimeRef.current = performance.now();
      } else {
        animationFrameRef.current = requestAnimationFrame(loop);
      }
    };

    animationFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isPaused, currentCount, autoPlayInterval, handleNext, activeIndex]);

  // Touch Swipe Gesture Handling
  const touchStartXRef = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (diff > 45) {
      handleNext();
    } else if (diff < -45) {
      handlePrev();
    }
    touchStartXRef.current = null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="w-full relative py-6 sm:py-10 select-none"
    >
      {/* Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1D140D] border border-[#FF7A18]/30 text-xs text-[#FF7A18] font-bold uppercase tracking-wider mb-2">
            <FolderKanban className="w-3.5 h-3.5 text-[#FF7A18]" />
            <span>{title || (language === 'bn' ? 'প্রজেক্টস শোকেস' : 'Projects Showcase')}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#FAF6F0] tracking-tight">
            {subtitle || (language === 'bn' ? 'সেরা ডিজাইন ও ডিজিটাল প্রজেক্ট গ্যালারি' : 'Selected Works & Creative Showcase')}
          </h2>
        </div>

        {/* Optional Category Filter Pills */}
        {showCategoryTabs && (
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-[#16100B] border border-[#FF7A18]/20 self-start md:self-auto">
            {[
              { id: 'all', labelBn: 'সকল', labelEn: 'All' },
              { id: 'design', labelBn: 'ডিজাইন', labelEn: 'Graphics' },
              { id: 'uiux', labelBn: 'ইউআই/ইউএক্স', labelEn: 'UI/UX' },
              { id: 'coding', labelBn: 'ওয়েব কোডিং', labelEn: 'Web/Code' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeCategory === cat.id
                    ? 'bg-[#FF7A18] text-white shadow-md shadow-[#FF7A18]/30'
                    : 'text-[#A9A39A] hover:text-white hover:bg-white/5'
                }`}
              >
                {language === 'bn' ? cat.labelBn : cat.labelEn}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 3D Carousel Container */}
      {filteredItems.length > 0 ? (
        <div
          className="relative max-w-6xl mx-auto px-2 sm:px-4 flex flex-col items-center justify-center overflow-hidden py-2"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Main Cards Stage */}
          <div className="relative w-full max-w-4xl h-[330px] sm:h-[420px] flex items-center justify-center my-2">
            {filteredItems.map((item, itemIdx) => {
              const offset = getCircularOffset(itemIdx, activeIndex, currentCount);

              if (Math.abs(offset) > 2 && currentCount > 5) {
                return null;
              }

              const isActive = offset === 0;
              const isPoster =
                (item.category || '').toLowerCase().includes('poster') ||
                (item.categoryLabel || '').toLowerCase().includes('পোস্টার');

              let xPos = '0%';
              if (offset === -1) xPos = '-50%';
              else if (offset === 1) xPos = '50%';
              else if (offset <= -2) xPos = '-115%';
              else if (offset >= 2) xPos = '115%';

              let scale = isActive ? 1 : Math.abs(offset) === 1 ? 0.84 : 0.68;
              let zIndex = isActive ? 30 : Math.abs(offset) === 1 ? 20 : 10;
              let opacity = isActive ? 1 : Math.abs(offset) === 1 ? 0.6 : 0;
              let filter = isActive
                ? 'brightness(1)'
                : Math.abs(offset) === 1
                ? 'brightness(0.65) blur(0.5px)'
                : 'brightness(0.2) blur(3px)';

              // Performance Metric (CTR / Views)
              const ctrMetric = item.metrics?.ctr || '+42% High CTR';

              return (
                <motion.div
                  key={item.id}
                  initial={false}
                  animate={{
                    x: xPos,
                    scale: scale,
                    opacity: opacity,
                    zIndex: zIndex,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 280,
                    damping: 28,
                    mass: 0.7,
                  }}
                  onClick={() => {
                    if (isActive) {
                      onSelectProject(item);
                    } else if (offset < 0) {
                      handlePrev();
                    } else if (offset > 0) {
                      handleNext();
                    }
                  }}
                  style={{
                    filter,
                    willChange: 'transform, opacity, filter',
                  }}
                  className={`absolute w-[86vw] max-w-[320px] sm:max-w-[620px] rounded-2xl sm:rounded-3xl bg-[#16100B] border border-[#FF7A18]/25 overflow-hidden cursor-pointer shadow-2xl transition-shadow duration-300 group ${
                    isActive
                      ? 'hover:scale-[1.02] hover:border-[#FF7A18]/60 hover:shadow-[0_20px_50px_rgba(0,0,0,0.9)]'
                      : ''
                  }`}
                >
                  {/* Card Image Banner */}
                  <div className="relative aspect-[16/10] bg-[#0E0A07] overflow-hidden">
                    {isPoster ? (
                      <>
                        <img
                          src={item.imageUrl}
                          alt=""
                          aria-hidden="true"
                          className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-30 scale-125 pointer-events-none"
                        />
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          loading="lazy"
                          decoding="async"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src =
                              'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800';
                          }}
                          className="relative z-10 h-full w-auto max-w-full mx-auto object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-2xl"
                        />
                      </>
                    ) : (
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src =
                            'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800';
                        }}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E0A07] via-[#0E0A07]/50 to-transparent" />

                    {/* Category & Performance CTR Badges */}
                    <div className="absolute top-3 left-3 z-20 flex items-center gap-2">
                      <div className="px-3 py-1 rounded-full bg-[#0E0A07]/90 backdrop-blur-md border border-[#FF7A18]/30 text-[11px] font-extrabold text-[#FF7A18] uppercase tracking-wider">
                        {item.categoryLabel || item.category}
                      </div>

                      {/* Performance Metric Pill */}
                      <div className="px-2.5 py-1 rounded-full bg-[#FF7A18]/20 backdrop-blur-md border border-[#FF7A18]/40 text-[10px] font-bold text-white flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 text-[#FF7A18]" />
                        <span>{ctrMetric}</span>
                      </div>
                    </div>

                    {item.year && (
                      <div className="absolute top-3 right-3 z-20 px-2.5 py-1 rounded-full bg-[#0E0A07]/90 backdrop-blur-md border border-white/10 text-[10px] font-bold text-[#A9A39A]">
                        {item.year}
                      </div>
                    )}

                    {/* Card Details Overlay */}
                    <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 z-20 flex flex-col justify-end space-y-1.5 sm:space-y-2">
                      <h3 className="text-base sm:text-2xl font-extrabold text-[#FAF6F0] leading-snug group-hover:text-[#FF7A18] transition-colors line-clamp-1">
                        {item.title}
                      </h3>

                      <p className="text-[11px] sm:text-sm text-[#A9A39A] line-clamp-2 leading-relaxed font-normal">
                        {item.description}
                      </p>

                      {/* Tech Tags & View Button */}
                      <div className="flex items-center justify-between gap-2 pt-1.5 sm:pt-2">
                        <div className="flex flex-wrap gap-1 sm:gap-1.5">
                          {(item.technologies || []).slice(0, 3).map((tech, tIdx) => (
                            <span
                              key={tIdx}
                              className="text-[9px] sm:text-[11px] font-semibold text-[#A9A39A] bg-[#221710] border border-[#FF7A18]/20 px-2 py-0.5 rounded-md"
                            >
                              #{tech}
                            </span>
                          ))}
                        </div>

                        {isActive && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectProject(item);
                            }}
                            className="btn-fiery-orange px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg transition-transform active:scale-95 shrink-0"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>{language === 'bn' ? 'প্রজেক্ট দেখুন' : 'View Project'}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Navigation Controls & Smooth RAF Progress Bar */}
          <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-3.5 mt-2 sm:mt-4 z-40">
            {/* Smooth Progress Bar */}
            <div className="w-full h-1 bg-[#16100B] rounded-full overflow-hidden relative border border-[#FF7A18]/20">
              {currentCount > 1 && (
                <div
                  className="h-full bg-gradient-to-r from-[#FF7A18] to-[#E8590C] rounded-full transition-all duration-75 ease-linear"
                  style={{ width: `${progressPercent}%` }}
                />
              )}
            </div>

            {/* Pagination Dots & Prev/Next Buttons */}
            <div className="flex items-center justify-between w-full px-2">
              <button
                onClick={handlePrev}
                disabled={currentCount <= 1}
                className="p-2.5 sm:p-3 rounded-full bg-[#16100B] border border-[#FF7A18]/30 text-[#FAF6F0] hover:bg-[#FF7A18] hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all active:scale-90"
                aria-label="Previous project"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Pagination Dots */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                {filteredItems.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveIndex(idx);
                      setProgressPercent(0);
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === activeIndex
                        ? 'w-6 sm:w-8 bg-[#FF7A18] shadow-[0_0_10px_#FF7A18]'
                        : 'w-2 bg-white/20 hover:bg-white/40'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                disabled={currentCount <= 1}
                className="p-2.5 sm:p-3 rounded-full bg-[#16100B] border border-[#FF7A18]/30 text-[#FAF6F0] hover:bg-[#FF7A18] hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all active:scale-90"
                aria-label="Next project"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 text-sm text-[#A9A39A]">
          {language === 'bn' ? 'এই ক্যাটাগরিতে কোনো প্রজেক্ট পাওয়া যায়নি।' : 'No projects found in this category.'}
        </div>
      )}
    </motion.div>
  );
};
