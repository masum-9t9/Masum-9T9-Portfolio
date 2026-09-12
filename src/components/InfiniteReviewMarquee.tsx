import React, { useRef, useState, useEffect, useCallback, useImperativeHandle, forwardRef } from 'react';
import { Star, Quote, CheckCircle2, ImageIcon } from 'lucide-react';
import { TestimonialItem } from '../types';
import { useLanguage } from '../context/LanguageContext';

export interface InfiniteReviewMarqueeRef {
  scroll: (direction: 'left' | 'right') => void;
}

interface InfiniteReviewMarqueeProps {
  items: TestimonialItem[];
  speed?: number;
  direction?: 'left-to-right' | 'right-to-left';
  onCardClick?: (item: TestimonialItem) => void;
  className?: string;
}

export const InfiniteReviewMarquee = forwardRef<InfiniteReviewMarqueeRef, InfiniteReviewMarqueeProps>(({
  items,
  speed = 0.6,
  direction = 'left-to-right',
  onCardClick,
  className = '',
}, ref) => {
  const { language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const animFrameRef = useRef<number | null>(null);
  const positionXRef = useRef<number>(0);
  const isPausedRef = useRef<boolean>(false);
  const isDraggingRef = useRef<boolean>(false);
  const dragStartXRef = useRef<number>(0);
  const dragStartPosXRef = useRef<number>(0);
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);

  const [focusedId, setFocusedId] = useState<string | null>(null);
  const [singleWidth, setSingleWidth] = useState<number>(0);

  const displayItems = React.useMemo(() => {
    if (!items || items.length === 0) return [];
    let list = [...items];
    while (list.length < 12) {
      list = [...list, ...items];
    }
    return list;
  }, [items]);

  const updateSingleWidth = useCallback(() => {
    if (!trackRef.current || displayItems.length === 0) return;
    const totalWidth = trackRef.current.scrollWidth;
    const setWidth = totalWidth / 3;
    setSingleWidth(setWidth);
    if (positionXRef.current === 0 && direction === 'left-to-right') {
      positionXRef.current = -setWidth;
    }
  }, [displayItems.length, direction]);

  useEffect(() => {
    updateSingleWidth();
    window.addEventListener('resize', updateSingleWidth);
    return () => window.removeEventListener('resize', updateSingleWidth);
  }, [updateSingleWidth]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      isPausedRef.current = true;
    }
  }, []);

  const checkCenterFocus = useCallback(() => {
    if (!containerRef.current || !trackRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;

    const cards = Array.from(trackRef.current.children) as HTMLElement[];
    let closestId: string | null = null;
    let minDistance = Infinity;

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const distance = Math.abs(cardCenter - containerCenter);

      if (cardRect.right > containerRect.left && cardRect.left < containerRect.right) {
        if (distance < minDistance) {
          minDistance = distance;
          closestId = card.getAttribute('data-review-id');
        }
      }
    }

    if (closestId !== focusedId) {
      setFocusedId(closestId);
    }
  }, [focusedId]);

  const scheduleResume = useCallback(() => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        isPausedRef.current = false;
      }
    }, 2500);
  }, []);

  useImperativeHandle(ref, () => ({
    scroll: (direction: 'left' | 'right') => {
      isPausedRef.current = true;
      const stepAmount = 340;
      if (direction === 'left') {
        positionXRef.current += stepAmount;
      } else {
        positionXRef.current -= stepAmount;
      }

      if (singleWidth > 0) {
        while (positionXRef.current <= -singleWidth * 2) positionXRef.current += singleWidth;
        while (positionXRef.current > 0) positionXRef.current -= singleWidth;
      }

      if (trackRef.current) {
        trackRef.current.style.transition = 'transform 0.4s ease-out';
        trackRef.current.style.transform = `translate3d(${positionXRef.current}px, 0, 0)`;
        setTimeout(() => {
          if (trackRef.current) {
            trackRef.current.style.transition = 'none';
          }
        }, 400);
      }

      checkCenterFocus();
      scheduleResume();
    }
  }), [singleWidth, checkCenterFocus, scheduleResume]);

  const step = useCallback(() => {
    if (!isPausedRef.current && !isDraggingRef.current) {
      if (direction === 'left-to-right') {
        positionXRef.current += speed;
        if (singleWidth > 0 && positionXRef.current >= 0) {
          positionXRef.current -= singleWidth;
        }
      } else {
        positionXRef.current -= speed;
        if (singleWidth > 0 && positionXRef.current <= -singleWidth) {
          positionXRef.current += singleWidth;
        }
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${positionXRef.current}px, 0, 0)`;
      }

      checkCenterFocus();
    }

    animFrameRef.current = requestAnimationFrame(step);
  }, [speed, direction, singleWidth, checkCenterFocus]);

  useEffect(() => {
    animFrameRef.current = requestAnimationFrame(step);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [step]);

  const handlePointerDown = (e: React.PointerEvent) => {
    isPausedRef.current = true;
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartPosXRef.current = positionXRef.current;
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - dragStartXRef.current;
    let newX = dragStartPosXRef.current + deltaX;

    if (singleWidth > 0) {
      while (newX <= -singleWidth * 2) newX += singleWidth;
      while (newX > 0) newX -= singleWidth;
    }

    positionXRef.current = newX;
    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${newX}px, 0, 0)`;
    }
    checkCenterFocus();
  };

  const handlePointerUpOrLeave = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      scheduleResume();
    }
  };

  const handleMouseEnter = () => {
    isPausedRef.current = true;
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
  };

  const handleMouseLeave = () => {
    if (!isDraggingRef.current) {
      scheduleResume();
    }
  };

  if (!displayItems || displayItems.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden select-none touch-pan-x cursor-grab active:cursor-grabbing ${className}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUpOrLeave}
      onPointerLeave={handlePointerUpOrLeave}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex gap-4 sm:gap-6 py-6 w-max will-change-transform" style={{ transform: 'translate3d(0,0,0)' }} ref={trackRef}>
        {displayItems.map((item, index) => {
          const ratingNum = Number(item.rating) || 5;
          const isFocused = focusedId === `${item.id}-${index}`;

          return (
            <div
              key={`${item.id}-${index}`}
              data-review-id={`${item.id}-${index}`}
              onClick={() => onCardClick?.(item)}
              className={`w-[270px] xs:w-[310px] sm:w-[360px] p-5 sm:p-6 rounded-3xl bg-[#181714] border flex flex-col justify-between shrink-0 shadow-sm transition-all duration-300 relative group overflow-hidden cursor-pointer ${
                isFocused
                  ? 'scale-102 border-[#C7B79A] -translate-y-1 z-10'
                  : 'border-[#C7B79A]/15 hover:-translate-y-1 hover:border-[#C7B79A]/30'
              }`}
            >
              <Quote className="absolute top-4 right-4 w-7 h-7 text-[#C7B79A]/8 pointer-events-none" />

              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(ratingNum)
                            ? 'fill-[#C7B79A] text-[#C7B79A]'
                            : 'fill-neutral-800 text-neutral-700'
                        }`}
                      />
                    ))}
                    <span className="text-xs text-[#D4C8B0] font-semibold ml-1 bg-[#1E1C18] px-2 py-0.5 rounded-full border border-[#C7B79A]/20">
                      {ratingNum.toFixed(1)}
                    </span>
                  </div>

                  <span className={`text-[10px] font-semibold text-[#D4C8B0] bg-[#1E1C18] px-2.5 py-1 rounded-full border border-[#C7B79A]/20 truncate max-w-[130px] ${language === 'bn' ? 'font-bn' : ''}`}>
                    {item.projectType}
                  </span>
                </div>

                <p className={`text-xs sm:text-sm text-[#A39E96] leading-relaxed font-normal mb-4 line-clamp-4 ${language === 'bn' ? 'font-bn' : ''}`}>
                  "{item.comment}"
                </p>

                {item.designImageUrl ? (
                  <div className="mb-4 rounded-xl overflow-hidden border border-[#C7B79A]/15 bg-[#121110] p-1.5">
                    <p className={`text-[10px] text-[#D4C8B0] font-medium mb-1 flex items-center gap-1 ${language === 'bn' ? 'font-bn' : ''}`}>
                      <ImageIcon className="w-3 h-3 text-[#C7B79A]" />
                      <span>{language === 'bn' ? 'ডিজাইন কভার:' : 'Design Attachment:'}</span>
                    </p>
                    <div className="relative aspect-video rounded-lg overflow-hidden bg-[#1E1C18] border border-[#C7B79A]/15">
                      <img
                        src={item.designImageUrl}
                        alt="Client Project Design"
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.currentTarget.parentElement as HTMLElement).style.display = 'none';
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="flex items-center gap-3 pt-3.5 border-t border-[#C7B79A]/12 mt-auto">
                <div className="relative shrink-0">
                  <img
                    src={item.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(item.name)}`}
                    alt={item.name}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(item.name)}`;
                    }}
                    className="w-10 h-10 rounded-full object-cover border border-[#C7B79A]/30 shadow-sm bg-[#121110]"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-[#C7B79A] rounded-full p-0.5 shadow-sm border border-[#121110]">
                    <CheckCircle2 className="w-3 h-3 text-[#121110]" />
                  </div>
                </div>

                <div className="overflow-hidden">
                  <div className="flex items-center gap-1.5">
                    <h4 className={`text-xs sm:text-sm font-bold text-[#E8E2D8] truncate ${language === 'bn' ? 'font-bn' : ''}`}>
                      {item.name}
                    </h4>
                  </div>
                  <p className={`text-[10px] sm:text-xs text-[#A39E96] font-normal truncate ${language === 'bn' ? 'font-bn' : ''}`}>
                    {item.role} {item.company ? `• ${item.company}` : ''}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

InfiniteReviewMarquee.displayName = 'InfiniteReviewMarquee';
