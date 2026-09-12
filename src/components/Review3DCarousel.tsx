import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  Star,
  Quote,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  RotateCw
} from 'lucide-react';
import { TestimonialItem } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface Review3DCarouselProps {
  items: TestimonialItem[];
  onNavigate?: (page: string) => void;
  title?: string;
  subtitle?: string;
}

export const Review3DCarousel: React.FC<Review3DCarouselProps> = ({
  items,
}) => {
  const { language } = useLanguage();
  const isBn = language === 'bn';

  // Ensure minimum items for circular cylinder (minimum 6 for pleasant 3D look)
  const carouselItems = useMemo(() => {
    if (!items || items.length === 0) return [];
    let list = [...items];
    if (list.length < 6) {
      list = [...list, ...items, ...items];
    }
    return list.slice(0, 8); // Optimal 6-8 cards for highest performance & aesthetics
  }, [items]);

  const count = carouselItems.length;
  const anglePerItem = count > 0 ? 360 / count : 45;

  // Responsive Radius and card sizing based on screen width
  const [radius, setRadius] = useState<number>(360);
  const [cardWidth, setCardWidth] = useState<number>(290);
  const [cardHeight, setCardHeight] = useState<number>(340);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window === 'undefined') return;
      const w = window.innerWidth;
      if (w < 480) {
        setRadius(200);
        setCardWidth(220);
        setCardHeight(290);
      } else if (w < 768) {
        setRadius(260);
        setCardWidth(250);
        setCardHeight(310);
      } else if (w < 1024) {
        setRadius(320);
        setCardWidth(275);
        setCardHeight(330);
      } else {
        setRadius(380);
        setCardWidth(300);
        setCardHeight(340);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 3D Rotation State
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [targetAngle, setTargetAngle] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);

  // Drag interaction refs
  const dragStartXRef = useRef<number>(0);
  const dragStartAngleRef = useRef<number>(0);
  const lastDragTimeRef = useRef<number>(0);
  const lastDragXRef = useRef<number>(0);
  const dragVelocityRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Smooth interpolation loop for targetAngle -> rotationAngle (60fps hardware lerp with idle auto-pause)
  useEffect(() => {
    let animId: number;

    const animate = () => {
      setRotationAngle((prev) => {
        const diff = targetAngle - prev;
        if (Math.abs(diff) < 0.04) {
          return targetAngle;
        }
        // Only keep animating while moving towards target
        animId = requestAnimationFrame(animate);
        return prev + diff * 0.12;
      });
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [targetAngle]);

  // Subtle continuous automatic rotation when idle & not dragging
  useEffect(() => {
    if (!autoRotate || isDragging || isHovered) return;

    const interval = setInterval(() => {
      setTargetAngle((prev) => prev - anglePerItem);
    }, 4500);

    return () => clearInterval(interval);
  }, [autoRotate, isDragging, isHovered, anglePerItem]);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [anglePerItem]);

  // Handle Drag / Touch Start
  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    dragStartXRef.current = clientX;
    dragStartAngleRef.current = targetAngle;
    lastDragXRef.current = clientX;
    lastDragTimeRef.current = performance.now();
    dragVelocityRef.current = 0;
  };

  // Handle Drag / Touch Move
  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    const deltaX = clientX - dragStartXRef.current;
    const sensitivity = 0.32;
    const newAngle = dragStartAngleRef.current + deltaX * sensitivity;
    setTargetAngle(newAngle);

    const now = performance.now();
    const dt = now - lastDragTimeRef.current;
    if (dt > 8) {
      dragVelocityRef.current = (clientX - lastDragXRef.current) / dt;
      lastDragXRef.current = clientX;
      lastDragTimeRef.current = now;
    }
  };

  // Handle Drag / Touch End with smooth inertia snap
  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    let finalAngle = targetAngle + dragVelocityRef.current * 70;
    const snappedIndex = Math.round(finalAngle / anglePerItem);
    setTargetAngle(snappedIndex * anglePerItem);
  };

  // Navigate next / prev
  const handlePrev = useCallback(() => {
    setTargetAngle((prev) => {
      const currentSnap = Math.round(prev / anglePerItem);
      return (currentSnap + 1) * anglePerItem;
    });
  }, [anglePerItem]);

  const handleNext = useCallback(() => {
    setTargetAngle((prev) => {
      const currentSnap = Math.round(prev / anglePerItem);
      return (currentSnap - 1) * anglePerItem;
    });
  }, [anglePerItem]);

  // Current active front index for indicator dots
  const activeFrontIndex = useMemo(() => {
    if (count === 0) return 0;
    const normalized = ((-Math.round(targetAngle / anglePerItem) % count) + count) % count;
    return normalized;
  }, [targetAngle, anglePerItem, count]);

  return (
    <div className="w-full relative select-none py-2 sm:py-6 overflow-hidden">
      {/* Apple-style Interactive Controls Header Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4 px-2 sm:px-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181613] border border-[#C7B79A]/20 text-[#D4C8B0] text-xs font-semibold uppercase tracking-wider mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#C7B79A]" />
            <span className={isBn ? 'font-bn' : ''}>
              {isBn ? '৩ডি ইন্টারঅ্যাক্টিভ শোকেস' : '3D Rotating Showcase'}
            </span>
          </div>
          <h3 className={`text-lg sm:text-xl font-bold text-[#E8E2D8] ${isBn ? 'font-bn' : ''}`}>
            {isBn ? 'স্বয়ংক্রিয় ও স্পর্শে ঘূর্ণনশীল রিভিউ সিলিন্ডার' : 'Fluid 3D Rotating Testimonial Cylinder'}
          </h3>
        </div>

        {/* Carousel Navigation Buttons & Auto-play toggle */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <button
            type="button"
            onClick={() => setAutoRotate(!autoRotate)}
            className={`ios-pill-badge text-xs font-medium cursor-pointer transition-all ${
              autoRotate ? 'text-[#DFC29A] border-[#C7B79A]/40' : 'text-[#A9A39A]'
            }`}
            title={autoRotate ? (isBn ? 'অটো-ঘূর্ণন বন্ধ করুন' : 'Pause Auto-Spin') : (isBn ? 'অটো-ঘূর্ণন চালু করুন' : 'Resume Auto-Spin')}
          >
            <RotateCw className={`w-3 h-3 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
            <span className="hidden xs:inline">{autoRotate ? (isBn ? 'অটো প্লে' : 'Auto-Spin') : (isBn ? 'পজ' : 'Paused')}</span>
          </button>

          <button
            type="button"
            onClick={handlePrev}
            className="ios-icon-btn w-8 h-8 sm:w-9 sm:h-9 !rounded-full"
            aria-label="Previous Review"
          >
            <ChevronLeft className="w-4 h-4 text-[#D4C8B0]" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="ios-icon-btn w-8 h-8 sm:w-9 sm:h-9 !rounded-full"
            aria-label="Next Review"
          >
            <ChevronRight className="w-4 h-4 text-[#D4C8B0]" />
          </button>
        </div>
      </div>

      {/* 3D Stage Container */}
      <div
        ref={containerRef}
        className="relative w-full h-[400px] sm:h-[450px] md:h-[480px] flex items-center justify-center overflow-visible cursor-grab active:cursor-grabbing touch-pan-y"
        style={{
          perspective: '1200px',
          perspectiveOrigin: '50% 50%',
          contain: 'layout paint',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          if (isDragging) handleDragEnd();
        }}
        onMouseDown={(e) => handleDragStart(e.clientX)}
        onMouseMove={(e) => handleDragMove(e.clientX)}
        onMouseUp={handleDragEnd}
        onTouchStart={(e) => {
          if (e.touches.length === 1) handleDragStart(e.touches[0].clientX);
        }}
        onTouchMove={(e) => {
          if (e.touches.length === 1) handleDragMove(e.touches[0].clientX);
        }}
        onTouchEnd={handleDragEnd}
      >
        {/* Soft Eye-Safe Center Glow */}
        <div 
          className="absolute w-64 sm:w-80 h-64 sm:h-80 rounded-full blur-3xl pointer-events-none opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(199, 183, 154, 0.35) 0%, transparent 70%)',
            transform: 'translateZ(-120px)'
          }}
        />

        {/* 3D Rotating Cylinder Axis */}
        <div
          className="relative w-full h-full flex items-center justify-center will-change-transform"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateY(${rotationAngle}deg)`,
            transition: isDragging ? 'none' : 'transform 0.05s linear',
          }}
        >
          {carouselItems.map((item, index) => {
            const cardAngle = index * anglePerItem;
            // Angle of this card relative to viewer
            const currentItemAngle = ((cardAngle + rotationAngle) % 360 + 360) % 360;
            const isFront = currentItemAngle < 35 || currentItemAngle > 325;
            const isBack = currentItemAngle > 90 && currentItemAngle < 270;
            
            // Calculate depth factor
            const rad = (currentItemAngle * Math.PI) / 180;
            const cosVal = Math.cos(rad); // 1 at front, -1 at back
            const depthScale = 0.82 + 0.18 * Math.max(0, cosVal);
            const opacity = isBack ? 0.3 : 0.65 + 0.35 * Math.max(0, cosVal);

            const ratingNum = Number(item.rating) || 5;

            return (
              <div
                key={`${item.id}-${index}`}
                className="absolute top-1/2 left-1/2 pointer-events-none transition-shadow duration-300 select-none"
                style={{
                  width: `${cardWidth}px`,
                  height: `${cardHeight}px`,
                  marginLeft: `-${cardWidth / 2}px`,
                  marginTop: `-${cardHeight / 2}px`,
                  transformStyle: 'preserve-3d',
                  transform: `rotateY(${cardAngle}deg) translateZ(${radius}px) scale(${depthScale})`,
                  opacity: opacity,
                  filter: isBack ? 'blur(0.5px)' : 'none',
                  zIndex: Math.round((cosVal + 1) * 100),
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                }}
              >
                {/* Apple VisionOS Frosted Titanium Glass Shell (Non-clickable, pure smooth 3D display) */}
                <div 
                  className={`w-full h-full rounded-2xl sm:rounded-3xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 relative overflow-hidden ${
                    isFront 
                      ? 'bg-[#181613]/96 border border-[#C7B79A]/45 shadow-[0_16px_36px_rgba(0,0,0,0.8),0_0_22px_rgba(199,183,154,0.15)] ring-1 ring-[#C7B79A]/25' 
                      : 'bg-[#14120F]/88 border border-[#C7B79A]/15 shadow-lg'
                  }`}
                  style={{
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                  }}
                >
                  {/* Top Edge Specular Hairline */}
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C7B79A]/35 to-transparent" />

                  {/* Watermark Quote Icon */}
                  <Quote className="absolute top-3.5 right-3.5 w-6 h-6 text-[#C7B79A]/10 pointer-events-none" />

                  {/* Card Header: Rating Stars & Project Type Badge */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(ratingNum)
                                ? 'fill-[#C7B79A] text-[#C7B79A]'
                                : i < ratingNum
                                ? 'fill-[#C7B79A]/50 text-[#C7B79A]'
                                : 'fill-[#221F1A] text-[#A9A39A]/20'
                            }`}
                          />
                        ))}
                        <span className="text-[10px] font-bold text-[#D4C8B0] bg-[#12110E] px-1.5 py-0.5 rounded-full border border-[#C7B79A]/20 ml-1">
                          {ratingNum.toFixed(1)}
                        </span>
                      </div>

                      <span className="text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-[#12110E] text-[#DFC29A] border border-[#C7B79A]/20 truncate max-w-[110px]">
                        {item.projectType || 'Verified'}
                      </span>
                    </div>

                    {/* Review Text Body */}
                    <div className="relative my-2">
                      <p className={`text-xs sm:text-[13px] text-[#E8E2D8] leading-relaxed line-clamp-4 font-normal ${isBn ? 'font-bn' : ''}`}>
                        "{item.comment}"
                      </p>
                    </div>

                    {/* Project Design Attachment Thumb if present */}
                    {item.designImageUrl && (
                      <div className="mt-2 rounded-lg overflow-hidden bg-[#0D0C0A] border border-[#C7B79A]/15 p-1 relative">
                        <div className="aspect-[16/9] w-full rounded-md overflow-hidden relative">
                          <img
                            src={item.designImageUrl}
                            alt="Design Sample"
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Footer: Client Credentials */}
                  <div className="pt-2.5 border-t border-[#C7B79A]/15 flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <div className="relative shrink-0">
                        <img
                          src={item.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(item.name)}`}
                          alt={item.name}
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          className="w-7 h-7 rounded-full object-cover border border-[#C7B79A]/30 bg-[#0D0C0A]"
                        />
                        <div className="absolute -bottom-0.5 -right-0.5 bg-[#1A1814] rounded-full p-0.5 border border-[#C7B79A]/30">
                          <CheckCircle2 className="w-2 h-2 text-[#C7B79A]" />
                        </div>
                      </div>
                      <div className="overflow-hidden">
                        <h4 className={`text-xs font-bold text-[#E8E2D8] truncate ${isBn ? 'font-bn' : ''}`}>
                          {item.name}
                        </h4>
                        <p className={`text-[10px] text-[#A9A39A] truncate ${isBn ? 'font-bn' : ''}`}>
                          {item.role || 'Verified Client'} {item.company ? `• ${item.company}` : ''}
                        </p>
                      </div>
                    </div>

                    <div className="px-2 py-0.5 rounded-full bg-[#12110E] border border-[#C7B79A]/15 text-[9px] font-semibold text-[#C7B79A]">
                      {isBn ? 'ভেরিফাইড' : 'Verified'}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Indicator Dots & Drag Guide */}
      <div className="flex flex-col items-center justify-center gap-2 mt-2">
        <div className="flex items-center gap-1.5 bg-[#181613] px-3 py-1 rounded-full border border-[#C7B79A]/20">
          {carouselItems.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                const currentRot = targetAngle;
                const targetSteps = -i;
                let diff = (targetSteps * anglePerItem) - currentRot;
                while (diff > 180) diff -= 360;
                while (diff < -180) diff += 360;
                setTargetAngle(currentRot + diff);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                i === activeFrontIndex
                  ? 'w-5 bg-[#C7B79A]'
                  : 'w-1.5 bg-[#C7B79A]/25 hover:bg-[#C7B79A]/50'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <p className={`text-[11px] text-[#A9A39A] text-center flex items-center gap-1.5 ${isBn ? 'font-bn' : ''}`}>
          <Sparkles className="w-3 h-3 text-[#C7B79A]" />
          <span>
            {isBn
              ? 'মাউস বা স্পর্শ টেনে ডানে-বামে ৩ডি তে স্মুথলি ঘোরান'
              : 'Drag or swipe to smoothly rotate in 3D'}
          </span>
        </p>
      </div>
    </div>
  );
};
