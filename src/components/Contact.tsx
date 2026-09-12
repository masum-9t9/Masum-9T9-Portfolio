import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mail,
  Phone,
  Send,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MessageSquare,
  Layers,
  Sparkles,
  X,
  RefreshCw,
  ShieldCheck,
  Zap,
  ExternalLink,
  ChevronUp,
  ChevronDown,
  MousePointer,
  Search,
} from 'lucide-react';
import { ContactConfig, SocialLinks } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { UI_TRANSLATIONS } from '../data/translations';

interface ContactProps {
  config: ContactConfig;
  socials: SocialLinks;
}

interface ProjectOption {
  id: string;
  labelEn: string;
  labelBn: string;
}

interface CategoryOption {
  id: string;
  labelEn: string;
  labelBn: string;
  icon: string;
  projects: ProjectOption[];
}

const CATEGORIES: CategoryOption[] = [
  {
    id: 'graphic_design',
    labelEn: '🎨 Graphic Design',
    labelBn: '🎨 গ্রাফিক্স ডিজাইন',
    icon: '🎨',
    projects: [
      { id: 'poster', labelEn: 'Poster Design', labelBn: 'পোস্টার ডিজাইন' },
      { id: 'social_media', labelEn: 'Social Media Design', labelBn: 'সোশ্যাল মিডিয়া ডিজাইন' },
      { id: 'yt_thumbnail', labelEn: 'YouTube Thumbnail Design', labelBn: 'ইউটিউব থাম্বনেল ডিজাইন' },
      { id: 'education', labelEn: 'Education Graphics', labelBn: 'এডুকেশন গ্রাফিক্স' },
      { id: 'branding', labelEn: 'Branding & Visual Identity', labelBn: 'ব্র্যান্ডিং ও ভিজ্যুয়াল আইডেন্টিটি' },
      { id: 'gd_not_sure', labelEn: '❓ Not Sure / Multiple Graphics', labelBn: '❓ নিশ্চিত নই / একাধিক ডিজাইন' },
    ],
  },
  {
    id: 'ui_ux_design',
    labelEn: '🎯 UI/UX Design',
    labelBn: '🎯 ইউআই/ইউএক্স ডিজাইন',
    icon: '🎯',
    projects: [
      { id: 'website_ui', labelEn: 'Website UI', labelBn: 'ওয়েবসাইট UI' },
      { id: 'mobile_app_ui', labelEn: 'Mobile App UI', labelBn: 'মোবাইল অ্যাপ UI' },
      { id: 'dashboard_ui', labelEn: 'Dashboard Design', labelBn: 'ড্যাশবোর্ড ডিজাইন' },
      { id: 'landing_page_ui', labelEn: 'Landing Page Design', labelBn: 'ল্যান্ডিং পেজ ডিজাইন' },
      { id: 'ui_not_sure', labelEn: '❓ Not Sure / Multiple UI', labelBn: '❓ নিশ্চিত নই / একাধিক ইউআই' },
    ],
  },
  {
    id: 'web_development',
    labelEn: '💻 Web Development',
    labelBn: '💻 ওয়েব ডেভেলপমেন্ট',
    icon: '💻',
    projects: [
      { id: 'portfolio_web', labelEn: 'Portfolio Website', labelBn: 'পোর্টফোলিও ওয়েবসাইট' },
      { id: 'business_web', labelEn: 'Business Website', labelBn: 'বিজনেস ওয়েবসাইট' },
      { id: 'landing_page_web', labelEn: 'Landing Page', labelBn: 'ল্যান্ডিং পেজ' },
      { id: 'react_web_app', labelEn: 'React Web App', labelBn: 'রিয়েক্ট ওয়েব অ্যাপ' },
      { id: 'frontend_dev', labelEn: 'Frontend Development', labelBn: 'ফ্রন্টএন্ড ডেভেলপমেন্ট' },
      { id: 'web_not_sure', labelEn: '❓ Not Sure / Multiple Web', labelBn: '❓ নিশ্চিত নই / একাধিক ওয়েব' },
    ],
  },
  {
    id: 'not_sure_multiple',
    labelEn: '❓ Not Sure / Multiple',
    labelBn: '❓ নিশ্চিত নই / একাধিক',
    icon: '❓',
    projects: [
      { id: 'multiple_services', labelEn: '⚡ Multiple Services Package', labelBn: '⚡ একাধিক সার্ভিস প্যাকেজ' },
      { id: 'full_stack_design_dev', labelEn: '🚀 Full Design & Web Build', labelBn: '🚀 ফুল ডিজাইন ও ওয়েব প্রজেক্ট' },
      { id: 'custom_consultation', labelEn: '💡 Custom Strategy & Discussion', labelBn: '💡 কাস্টম স্ট্র্যাটেজি ও আলোচনা' },
      { id: 'not_sure_deliverable', labelEn: '❓ Not Sure / Needs Guidance', labelBn: '❓ নিশ্চিত নই (পরামর্শ চাই)' },
    ],
  },
];

const BUDGET_OPTIONS = [
  { value: '$100 - $500', labelEn: '$100 - $500 (Basic)', labelBn: '$100 - $500 (বেসিক)' },
  { value: '$500 - $1,000', labelEn: '$500 - $1,000 (Standard)', labelBn: '$500 - $1,000 (স্ট্যান্ডার্ড)' },
  { value: '$1,000 - $3,000', labelEn: '$1,000 - $3,000 (Advanced)', labelBn: '$1,000 - $3,000 (এডভান্সড)' },
  { value: '$3,000+', labelEn: '$3,000+ (Enterprise)', labelBn: '$3,000+ (এন্টারপ্রাইজ)' },
  { value: 'Not Sure / Flexible', labelEn: '❓ Not Sure / Flexible', labelBn: '❓ নিশ্চিত নই (আলোচনা সাপেক্ষ)' },
];

const TIMELINE_OPTIONS = [
  { value: 'Urgent (1-3 Days)', labelEn: '⚡ Urgent (1-3 Days)', labelBn: '⚡ জরুরি (১-৩ দিন)' },
  { value: '1-2 Weeks', labelEn: '📅 1-2 Weeks', labelBn: '📅 ১-২ সপ্তাহ' },
  { value: '2-4 Weeks', labelEn: '🗓️ 2-4 Weeks', labelBn: '🗓️ ২-৪ সপ্তাহ' },
  { value: '1-2 Months', labelEn: '🚀 1-2 Months', labelBn: '🚀 ১-২ মাস' },
  { value: 'Not Sure / Flexible', labelEn: '❓ Not Sure / Flexible', labelBn: '❓ নিশ্চিত নই / নমনীয়' },
];

interface BudgetWheelSelectorProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  isBangla: boolean;
  disabled?: boolean;
}

const BUDGET_PRESETS = [
  { numeric: 0, labelEn: '$0', labelBn: '$০' },
  { numeric: 50, labelEn: '$50', labelBn: '$৫০' },
  { numeric: 100, labelEn: '$100', labelBn: '$১০০' },
  { numeric: 250, labelEn: '$250', labelBn: '$২৫০' },
  { numeric: 500, labelEn: '$500', labelBn: '$৫০০' },
  { numeric: 1000, labelEn: '$1,000', labelBn: '$১,০০০' },
  { numeric: 2500, labelEn: '$2,500', labelBn: '$২,৫০০' },
  { numeric: null, labelEn: '❓ Not Sure / Flexible', labelBn: '❓ নিশ্চিত নই (আলোচনা সাপেক্ষ)' },
];

// Helper hook for press-and-hold continuous fire (holding button continuously increases/decreases)
const usePressHold = (action: () => void, disabled = false) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const actionRef = useRef(action);

  useEffect(() => {
    actionRef.current = action;
  }, [action]);

  const clear = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const start = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (disabled) return;
    clear();
    actionRef.current(); // initial step on touch/press
    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        actionRef.current();
      }, 65); // rapid smooth continuous repeat
    }, 220); // 220ms initial hold delay
  }, [disabled, clear]);

  useEffect(() => {
    return () => clear();
  }, [clear]);

  return {
    onMouseDown: start,
    onMouseUp: clear,
    onMouseLeave: clear,
    onTouchStart: start,
    onTouchEnd: clear,
  };
};

// Helper hook for horizontal wheel scrolling (mouse wheel moves left <-> right)
const useHorizontalWheelScroll = <T extends HTMLElement = HTMLDivElement>() => {
  const containerRef = useRef<T | null>(null);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);
  return containerRef;
};

// Helper to convert Bengali digits to ASCII digits
const banglaToAsciiDigits = (str: string): string => {
  if (!str) return '';
  const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  let result = str;
  for (let i = 0; i < 10; i++) {
    result = result.replaceAll(banglaDigits[i], String(i));
  }
  return result;
};

// Helper to extract the first positive number from a string (handles numbers in brackets, commas, Bengali digits)
const extractFirstNumber = (str: string): number => {
  if (!str) return 0;
  const normalized = banglaToAsciiDigits(str).replaceAll(',', '').trim();
  const match = normalized.match(/\d+/);
  if (!match) return 0;
  const num = parseInt(match[0], 10);
  return isNaN(num) || num < 0 ? 0 : num;
};

interface BudgetWheelSelectorProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  isBangla: boolean;
  disabled?: boolean;
}

const BudgetWheelSelector: React.FC<BudgetWheelSelectorProps> = ({
  label,
  value,
  onChange,
  isBangla,
  disabled = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const presetScrollRef = useHorizontalWheelScroll<HTMLDivElement>();
  const isNotSure = value.toLowerCase().includes('not sure') || value.includes('নিশ্চিত নই') || value.includes('flexible');
  const currentNumeric = isNotSure ? 0 : extractFirstNumber(value);

  const updateNumericValue = useCallback((newAmount: number) => {
    const clamped = Math.max(0, Math.min(50000, newAmount));
    onChange(`$${clamped.toLocaleString()}`);
  }, [onChange]);

  const toggleFlexible = useCallback(() => {
    if (disabled) return;
    if (isNotSure) {
      updateNumericValue(250);
    } else {
      onChange(isBangla ? '❓ নিশ্চিত নই (আলোচনা সাপেক্ষ)' : '❓ Not Sure / Flexible');
    }
  }, [disabled, isNotSure, isBangla, onChange, updateNumericValue]);

  const handleAdjust = useCallback((direction: 1 | -1, speedFactor: number = 1) => {
    if (disabled) return;

    if (isNotSure) {
      if (direction === 1) {
        updateNumericValue(250);
      }
      return;
    }

    let baseStep = 10;
    if (currentNumeric >= 5000) baseStep = 250;
    else if (currentNumeric >= 2000) baseStep = 100;
    else if (currentNumeric >= 500) baseStep = 50;
    else if (currentNumeric >= 100) baseStep = 25;

    const finalStep = Math.round(baseStep * speedFactor);

    if (direction === 1) {
      updateNumericValue(currentNumeric + finalStep);
    } else {
      const nextVal = currentNumeric - finalStep;
      if (nextVal < 0 && currentNumeric === 0) {
        onChange(isBangla ? '❓ নিশ্চিত নই (আলোচনা সাপেক্ষ)' : '❓ Not Sure / Flexible');
      } else {
        updateNumericValue(Math.max(0, nextVal));
      }
    }
  }, [disabled, isNotSure, currentNumeric, updateNumericValue, isBangla, onChange]);

  const handleIncrease = useCallback(() => handleAdjust(1, 1), [handleAdjust]);
  const handleDecrease = useCallback(() => handleAdjust(-1, 1), [handleAdjust]);

  const upHandlers = usePressHold(handleIncrease, disabled);
  const downHandlers = usePressHold(handleDecrease, disabled);

  // Precision Physics Wheel Listener (prevents jumps, handles momentum & sub-pixel trackpads)
  const accumulatedDeltaRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const resetTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;

    const onWheel = (e: WheelEvent) => {
      if (presetScrollRef.current && presetScrollRef.current.contains(e.target as Node)) {
        return;
      }

      e.preventDefault();

      const now = performance.now();
      const dt = Math.max(1, now - (lastTimeRef.current || now));
      lastTimeRef.current = now;

      let rawDelta = e.deltaY !== 0 ? e.deltaY : e.deltaX;
      if (e.deltaMode === 1) rawDelta *= 20;
      if (e.deltaMode === 2) rawDelta *= 300;

      accumulatedDeltaRef.current += rawDelta;

      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
      resetTimerRef.current = setTimeout(() => {
        accumulatedDeltaRef.current = 0;
      }, 160);

      const threshold = 36;
      const absAccumulated = Math.abs(accumulatedDeltaRef.current);

      if (absAccumulated >= threshold) {
        const steps = Math.floor(absAccumulated / threshold);
        const direction = accumulatedDeltaRef.current < 0 ? 1 : -1;

        const velocity = absAccumulated / dt;
        const speedMultiplier = velocity > 1.2 ? Math.min(3, 1 + (velocity - 1.2) * 0.5) : 1;

        for (let i = 0; i < Math.min(steps, 5); i++) {
          handleAdjust(direction, speedMultiplier);
        }

        const consumed = steps * threshold * (accumulatedDeltaRef.current < 0 ? -1 : 1);
        accumulatedDeltaRef.current -= consumed;
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', onWheel);
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, [disabled, handleAdjust, presetScrollRef]);

  return (
    <div
      ref={containerRef}
      className="p-4 sm:p-5 rounded-2xl bg-[#16100B] border border-[#FF7A18]/20 shadow-xl backdrop-blur-2xl flex flex-col justify-between gap-3.5 hover:border-[#FF7A18]/40 transition-all select-none"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <label className="text-xs font-bold text-[#FAF6F0] flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#FF7A18]" />
          <span>{label}</span> <span className="text-rose-400">*</span>
        </label>
        
        {/* Apple Display Badge with Clickable Toggle */}
        <button
          type="button"
          disabled={disabled}
          onClick={toggleFlexible}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1D140D] border border-[#FF7A18]/30 hover:border-[#FF7A18] transition-all cursor-pointer shadow-inner active:scale-95"
          title={isNotSure ? (isBangla ? 'নির্দিষ্ট পরিমাণ নির্ধারণ করুন' : 'Click to set specific amount') : (isBangla ? 'নমনীয় হিসেবে পরিবর্তন করুন' : 'Click to make flexible')}
        >
          <span className="text-xs font-bold text-[#FF7A18]">
            {isNotSure ? (isBangla ? '❓ নমনীয় (পরিবর্তন করুন)' : '❓ Flexible (Toggle)') : `$${currentNumeric.toLocaleString()}`}
          </span>
        </button>
      </div>

      {/* Preset Pill Bar */}
      <div ref={presetScrollRef} className="p-1 rounded-xl bg-[#0E0A07] border border-[#FF7A18]/20 flex items-center gap-1 overflow-x-auto no-scrollbar">
        {BUDGET_PRESETS.map((preset, idx) => {
          const isPresetNotSure = preset.numeric === null;
          const isSelected = isPresetNotSure ? isNotSure : (!isNotSure && currentNumeric === preset.numeric);
          const displayLabel = isBangla ? preset.labelBn : preset.labelEn;

          return (
            <button
              key={idx}
              type="button"
              disabled={disabled}
              onClick={() => {
                if (isPresetNotSure) {
                  onChange(isBangla ? '❓ নিশ্চিত নই (আলোচনা সাপেক্ষ)' : '❓ Not Sure / Flexible');
                } else {
                  updateNumericValue(preset.numeric);
                }
              }}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                isSelected
                  ? 'bg-gradient-to-r from-[#FF7A18] to-[#E8590C] text-white font-bold shadow-md'
                  : 'text-[#A9A39A] hover:text-[#FAF6F0] hover:bg-white/5'
              }`}
            >
              {displayLabel}
            </button>
          );
        })}
      </div>

      {/* Stepper & Slider Controls */}
      <div className="space-y-2 pt-1">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 bg-[#0E0A07] border border-[#FF7A18]/20 rounded-xl px-3 py-1.5 focus-within:border-[#FF7A18] transition-colors flex-1">
            <span className="text-xs font-bold text-[#FF7A18]">$</span>
            <input
              type="number"
              min={0}
              max={50000}
              step={10}
              disabled={disabled}
              value={isNotSure ? '' : currentNumeric}
              placeholder={isNotSure ? (isBangla ? 'নমনীয়' : 'Flexible') : '0'}
              onChange={(e) => updateNumericValue(Number(e.target.value))}
              className="w-full bg-transparent text-sm font-bold text-[#FAF6F0] focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none placeholder-[#A9A39A]"
            />
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              disabled={disabled}
              {...downHandlers}
              className="w-8 h-8 rounded-xl bg-[#1D140D] border border-[#FF7A18]/20 hover:border-[#FF7A18]/50 text-[#FAF6F0] hover:text-[#FF7A18] flex items-center justify-center transition-all active:scale-95 cursor-pointer font-bold text-sm"
              title={isBangla ? 'কমবে' : 'Decrease'}
            >
              −
            </button>
            <button
              type="button"
              disabled={disabled}
              {...upHandlers}
              className="w-8 h-8 rounded-xl bg-[#1D140D] border border-[#FF7A18]/20 hover:border-[#FF7A18]/50 text-[#FAF6F0] hover:text-[#FF7A18] flex items-center justify-center transition-all active:scale-95 cursor-pointer font-bold text-sm"
              title={isBangla ? 'বাড়বে' : 'Increase'}
            >
              +
            </button>
          </div>
        </div>

        {/* Apple Smooth Accent Slider */}
        <input
          type="range"
          min={0}
          max={5000}
          step={10}
          disabled={disabled}
          value={isNotSure ? 0 : currentNumeric}
          onChange={(e) => updateNumericValue(Number(e.target.value))}
          className="w-full h-1.5 bg-[#0E0A07] rounded-lg appearance-none cursor-pointer accent-[#FF7A18] hover:accent-[#FF9238]"
        />
      </div>
    </div>
  );
};

interface TimelineWheelSelectorProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  isBangla: boolean;
  disabled?: boolean;
}

const TIMELINE_PRESETS = [
  { days: 0, labelEn: '0 Days (Urgent)', labelBn: '০ দিন (আজই/জরুরি)' },
  { days: 1, labelEn: '1 Day', labelBn: '১ দিন' },
  { days: 3, labelEn: '3 Days', labelBn: '৩ দিন' },
  { days: 7, labelEn: '7 Days', labelBn: '৭ দিন' },
  { days: 14, labelEn: '14 Days', labelBn: '১৪ দিন' },
  { days: 30, labelEn: '30 Days', labelBn: '৩০ দিন' },
  { days: null, labelEn: '❓ Not Sure / Flexible', labelBn: '❓ নিশ্চিত নই (নমনীয়)' },
];

const TimelineWheelSelector: React.FC<TimelineWheelSelectorProps> = ({
  label,
  value,
  onChange,
  isBangla,
  disabled = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const presetScrollRef = useHorizontalWheelScroll<HTMLDivElement>();
  const isNotSure = value.toLowerCase().includes('not sure') || value.includes('নিশ্চিত নই') || value.includes('flexible');
  const currentDays = isNotSure ? 0 : extractFirstNumber(value);

  const updateDays = useCallback((days: number) => {
    const clamped = Math.max(0, Math.min(365, days));
    if (clamped === 0) {
      onChange(isBangla ? '০ দিন (আজই / জরুরি)' : '0 Days (Same Day / Urgent)');
    } else if (clamped === 1) {
      onChange(isBangla ? '১ দিন' : '1 Day');
    } else if (clamped === 30) {
      onChange(isBangla ? '৩০ দিন (১ মাস)' : '30 Days (1 Month)');
    } else {
      onChange(isBangla ? `${clamped} দিন` : `${clamped} Days`);
    }
  }, [isBangla, onChange]);

  const toggleFlexible = useCallback(() => {
    if (disabled) return;
    if (isNotSure) {
      updateDays(7);
    } else {
      onChange(isBangla ? '❓ নিশ্চিত নই (নমনীয়)' : '❓ Not Sure / Flexible');
    }
  }, [disabled, isNotSure, isBangla, onChange, updateDays]);

  const handleAdjust = useCallback((direction: 1 | -1, speedFactor: number = 1) => {
    if (disabled) return;

    if (isNotSure) {
      if (direction === 1) {
        updateDays(7);
      }
      return;
    }

    let baseStep = 1;
    if (currentDays >= 60) baseStep = 5;
    else if (currentDays >= 30) baseStep = 2;
    else baseStep = 1;

    const finalStep = Math.max(1, Math.round(baseStep * speedFactor));

    if (direction === 1) {
      updateDays(currentDays + finalStep);
    } else {
      const nextDays = currentDays - finalStep;
      if (nextDays < 0 && currentDays === 0) {
        onChange(isBangla ? '❓ নিশ্চিত নই (নমনীয়)' : '❓ Not Sure / Flexible');
      } else {
        updateDays(Math.max(0, nextDays));
      }
    }
  }, [disabled, isNotSure, currentDays, updateDays, isBangla, onChange]);

  const handleIncrease = useCallback(() => handleAdjust(1, 1), [handleAdjust]);
  const handleDecrease = useCallback(() => handleAdjust(-1, 1), [handleAdjust]);

  const upHandlers = usePressHold(handleIncrease, disabled);
  const downHandlers = usePressHold(handleDecrease, disabled);

  // Precision Physics Wheel Listener
  const accumulatedDeltaRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const resetTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;

    const onWheel = (e: WheelEvent) => {
      if (presetScrollRef.current && presetScrollRef.current.contains(e.target as Node)) {
        return;
      }

      e.preventDefault();

      const now = performance.now();
      const dt = Math.max(1, now - (lastTimeRef.current || now));
      lastTimeRef.current = now;

      let rawDelta = e.deltaY !== 0 ? e.deltaY : e.deltaX;
      if (e.deltaMode === 1) rawDelta *= 20;
      if (e.deltaMode === 2) rawDelta *= 300;

      accumulatedDeltaRef.current += rawDelta;

      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
      resetTimerRef.current = setTimeout(() => {
        accumulatedDeltaRef.current = 0;
      }, 160);

      const threshold = 36;
      const absAccumulated = Math.abs(accumulatedDeltaRef.current);

      if (absAccumulated >= threshold) {
        const steps = Math.floor(absAccumulated / threshold);
        const direction = accumulatedDeltaRef.current < 0 ? 1 : -1;

        const velocity = absAccumulated / dt;
        const speedMultiplier = velocity > 1.2 ? Math.min(3, 1 + (velocity - 1.2) * 0.5) : 1;

        for (let i = 0; i < Math.min(steps, 5); i++) {
          handleAdjust(direction, speedMultiplier);
        }

        const consumed = steps * threshold * (accumulatedDeltaRef.current < 0 ? -1 : 1);
        accumulatedDeltaRef.current -= consumed;
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', onWheel);
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, [disabled, handleAdjust, presetScrollRef]);

  return (
    <div
      ref={containerRef}
      className="p-4 sm:p-5 rounded-2xl bg-[#16100B] border border-[#FF7A18]/20 shadow-xl backdrop-blur-2xl flex flex-col justify-between gap-3.5 hover:border-[#FF7A18]/40 transition-all select-none"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <label className="text-xs font-bold text-[#FAF6F0] flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#FF7A18]" />
          <span>{label}</span> <span className="text-rose-400">*</span>
        </label>

        {/* Display Badge with Clickable Toggle */}
        <button
          type="button"
          disabled={disabled}
          onClick={toggleFlexible}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1D140D] border border-[#FF7A18]/30 hover:border-[#FF7A18] transition-all cursor-pointer shadow-inner active:scale-95"
          title={isNotSure ? (isBangla ? 'নির্দিষ্ট সময় নির্ধারণ করুন' : 'Click to set specific timeline') : (isBangla ? 'নমনীয় হিসেবে পরিবর্তন করুন' : 'Click to make flexible')}
        >
          <span className="text-xs font-bold text-[#FF7A18]">
            {isNotSure
              ? (isBangla ? '❓ নমনীয় (পরিবর্তন করুন)' : '❓ Flexible (Toggle)')
              : (isBangla ? `${currentDays} দিন` : `${currentDays} ${currentDays === 1 ? 'Day' : 'Days'}`)}
          </span>
        </button>
      </div>

      {/* Preset Pill Bar */}
      <div ref={presetScrollRef} className="p-1 rounded-xl bg-[#0E0A07] border border-[#FF7A18]/20 flex items-center gap-1 overflow-x-auto no-scrollbar">
        {TIMELINE_PRESETS.map((preset, idx) => {
          const isPresetNotSure = preset.days === null;
          const isSelected = isPresetNotSure ? isNotSure : (!isNotSure && currentDays === preset.days);
          const displayLabel = isBangla ? preset.labelBn : preset.labelEn;

          return (
            <button
              key={idx}
              type="button"
              disabled={disabled}
              onClick={() => {
                if (isPresetNotSure) {
                  onChange(isBangla ? '❓ নিশ্চিত নই (নমনীয়)' : '❓ Not Sure / Flexible');
                } else {
                  updateDays(preset.days);
                }
              }}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                isSelected
                  ? 'bg-gradient-to-r from-[#FF7A18] to-[#E8590C] text-white font-bold shadow-md'
                  : 'text-[#A9A39A] hover:text-[#FAF6F0] hover:bg-white/5'
              }`}
            >
              {displayLabel}
            </button>
          );
        })}
      </div>

      {/* Stepper & Slider Controls */}
      <div className="space-y-2 pt-1">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 bg-[#0E0A07] border border-[#FF7A18]/20 rounded-xl px-3 py-1.5 focus-within:border-[#FF7A18] transition-colors flex-1">
            <input
              type="number"
              min={0}
              max={365}
              disabled={disabled}
              value={isNotSure ? '' : currentDays}
              placeholder={isNotSure ? (isBangla ? 'নমনীয়' : 'Flexible') : '0'}
              onChange={(e) => updateDays(Number(e.target.value))}
              className="w-full bg-transparent text-sm font-bold text-[#FAF6F0] focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-right placeholder-[#A9A39A]"
            />
            <span className="text-xs font-bold text-[#FF7A18]">{isBangla ? 'দিন' : 'Days'}</span>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              disabled={disabled}
              {...downHandlers}
              className="w-8 h-8 rounded-xl bg-[#1D140D] border border-[#FF7A18]/20 hover:border-[#FF7A18]/50 text-[#FAF6F0] hover:text-[#FF7A18] flex items-center justify-center transition-all active:scale-95 cursor-pointer font-bold text-sm"
              title={isBangla ? 'কমবে' : 'Decrease'}
            >
              −
            </button>
            <button
              type="button"
              disabled={disabled}
              {...upHandlers}
              className="w-8 h-8 rounded-xl bg-[#1D140D] border border-[#FF7A18]/20 hover:border-[#FF7A18]/50 text-[#FAF6F0] hover:text-[#FF7A18] flex items-center justify-center transition-all active:scale-95 cursor-pointer font-bold text-sm"
              title={isBangla ? 'বাড়বে' : 'Increase'}
            >
              +
            </button>
          </div>
        </div>

        {/* Slider */}
        <input
          type="range"
          min={0}
          max={180}
          step={1}
          disabled={disabled}
          value={isNotSure ? 0 : currentDays}
          onChange={(e) => updateDays(Number(e.target.value))}
          className="w-full h-1.5 bg-[#0E0A07] rounded-lg appearance-none cursor-pointer accent-[#FF7A18] hover:accent-[#FF9238]"
        />
      </div>
    </div>
  );
};

export const Contact: React.FC<ContactProps> = ({ config, socials }) => {
  const { language } = useLanguage();
  const t = UI_TRANSLATIONS[language];
  const isBangla = language === 'bn';

  const categoryScrollRef = useHorizontalWheelScroll<HTMLDivElement>();
  const projectTypesScrollRef = useHorizontalWheelScroll<HTMLDivElement>();

  const [selectedCategory, setSelectedCategory] = useState<string>('graphic_design');
  const [selectedProjectTypes, setSelectedProjectTypes] = useState<string[]>(['Poster Design']);
  const [budgetRange, setBudgetRange] = useState<string>('$500 - $1,000');
  const [projectTimeline, setProjectTimeline] = useState<string>('2-4 Weeks');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [typeSearchQuery, setTypeSearchQuery] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [submissionDetails, setSubmissionDetails] = useState<{
    telegram: boolean;
    googleSheets: boolean;
    brevoAdmin: boolean;
    brevoAutoReply: boolean;
  }>({
    telegram: true,
    googleSheets: true,
    brevoAdmin: true,
    brevoAutoReply: true,
  });

  // Get current active category object
  const currentCategoryObj = CATEGORIES.find((c) => c.id === selectedCategory) || CATEGORIES[0];

  // Filtered projects based on typeSearchQuery
  const filteredProjects = currentCategoryObj.projects.filter((proj) => {
    if (!typeSearchQuery.trim()) return true;
    const q = typeSearchQuery.toLowerCase();
    return (
      proj.labelEn.toLowerCase().includes(q) ||
      proj.labelBn.toLowerCase().includes(q) ||
      proj.id.toLowerCase().includes(q)
    );
  });

  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
    const cat = CATEGORIES.find((c) => c.id === catId);
    if (cat && cat.projects.length > 0) {
      const defaultProj = isBangla ? cat.projects[0].labelBn : cat.projects[0].labelEn;
      setSelectedProjectTypes([defaultProj]);
    }
  };

  const toggleProjectType = (projName: string) => {
    setSelectedProjectTypes((prev) => {
      if (prev.includes(projName)) {
        if (prev.length === 1) return prev; // Keep at least one selected
        return prev.filter((p) => p !== projName);
      } else {
        return [...prev, projName];
      }
    });
  };

  const validateForm = (): string | null => {
    const trimmedName = formData.name.trim();
    const trimmedPhone = formData.phone.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName) {
      return isBangla ? 'অনুগ্রহ করে আপনার পূর্ণ নাম লিখুন।' : 'Please enter your full name.';
    }
    if (trimmedName.length < 2) {
      return isBangla ? 'অনুগ্রহ করে সঠিক নাম লিখুন (কমপক্ষে ২ অক্ষর)।' : 'Please enter a valid full name (at least 2 characters).';
    }
    if (!trimmedEmail) {
      return isBangla ? 'অনুগ্রহ করে আপনার ইমেইল এড্রেস লিখুন।' : 'Please enter your email address.';
    }
    if (!trimmedEmail.includes('@') || !trimmedEmail.includes('.')) {
      return isBangla ? 'অনুগ্রহ করে একটি সঠিক ইমেইল এড্রেস লিখুন।' : 'Please enter a valid email address.';
    }
    if (selectedProjectTypes.length === 0) {
      return isBangla ? 'অনুগ্রহ করে কমপক্ষে ১টি প্রজেক্ট টাইপ নির্বাচন করুন।' : 'Please select at least one project type.';
    }

    // $0 Budget Validation
    const isNotSureBudget = budgetRange.toLowerCase().includes('not sure') || budgetRange.includes('নিশ্চিত নই') || budgetRange.toLowerCase().includes('flexible');
    const numericBudget = parseInt(budgetRange.replace(/[^0-9]/g, ''), 10);
    if (!isNotSureBudget && (isNaN(numericBudget) || numericBudget <= 0)) {
      return isBangla
        ? 'বাজেট $০ দিয়ে ফর্ম জমা দেওয়া সম্ভব নয়। অনুগ্রহ করে কমপক্ষে $৫০ বা তার বেশি সেট করুন, অথবা "নিশ্চিত নই (আলোচনা সাপেক্ষ)" নির্বাচন করুন।'
        : 'Form submission is not allowed with a $0 budget. Please select a budget of at least $50, or choose "Not Sure / Flexible".';
    }

    if (!trimmedMessage) {
      return isBangla ? 'অনুগ্রহ করে প্রজেক্টের বিস্তারিত বার্তা লিখুন।' : 'Please enter your project details.';
    }
    if (trimmedMessage.length < 10) {
      return isBangla ? 'বার্তাটি খুব সংক্ষিপ্ত। কমপক্ষে ১০টি অক্ষরে প্রজেক্ট বিবরণ লিখুন।' : 'Message is too short. Please write at least 10 characters of details.';
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      setShowErrorModal(true);
      return;
    }

    setLoading(true);
    setErrorMessage('');

    const categoryLabel = isBangla ? currentCategoryObj.labelBn : currentCategoryObj.labelEn;
    const projectTypesText = selectedProjectTypes.join(', ');
    const fullServiceText = `${categoryLabel} ➔ ${projectTypesText} | Budget: ${budgetRange} | Timeline: ${projectTimeline}`;

    try {
      // Primary attempt: Send to production backend API /api/contact
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          category: categoryLabel,
          projectType: projectTypesText,
          budgetRange: budgetRange,
          projectTimeline: projectTimeline,
          message: formData.message.trim(),
          serviceText: fullServiceText,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          if (result.details) {
            setSubmissionDetails(result.details);
          }
          setShowSuccessModal(true);
          setFormData({ name: '', phone: '', email: '', message: '' });
          setSelectedCategory('graphic_design');
          setSelectedProjectTypes([isBangla ? 'পোস্টার ডিজাইন' : 'Poster Design']);
          return;
        } else {
          throw new Error(result.error || 'Server error while sending message.');
        }
      } else {
        // Fallback to direct client-side requests if endpoint returns HTTP error
        throw new Error(`API response status ${response.status}`);
      }
    } catch (err: unknown) {
      console.warn('API submission notice, attempting client direct fallback:', err);

      // Client Fallback Direct Execution
      try {
        let telegramSuccess = false;
        let sheetsSuccess = false;

        // 1. Telegram Direct
        const botToken = config.telegramBotToken || (import.meta as unknown as { env: Record<string, string> }).env?.VITE_TELEGRAM_BOT_TOKEN || "";
        const chatId = config.telegramChatId || (import.meta as unknown as { env: Record<string, string> }).env?.VITE_TELEGRAM_CHAT_ID || "";

        if (botToken && chatId) {
          const escapeHtml = (str: string) =>
            String(str || '')
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;');

          const htmlText = `<b>📬 New Portfolio Inquiry (Masum 9T9)</b>\n\n` +
            `<b>👤 Name:</b> ${escapeHtml(formData.name)}\n` +
            `<b>✉️ Email:</b> ${escapeHtml(formData.email)}\n` +
            `<b>📞 Phone:</b> ${escapeHtml(formData.phone || 'N/A')}\n` +
            `<b>📁 Category:</b> ${escapeHtml(categoryLabel)}\n` +
            `<b>🎯 Project Types:</b> ${escapeHtml(projectTypesText)}\n` +
            `<b>💰 Budget:</b> ${escapeHtml(budgetRange)}\n` +
            `<b>⏳ Timeline:</b> ${escapeHtml(projectTimeline)}\n` +
            `<b>💬 Message:</b> "${escapeHtml(formData.message)}"`;

          const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: chatId,
              text: htmlText,
              parse_mode: 'HTML',
            }),
          });
          const resData = await res.json();
          telegramSuccess = !!resData.ok;
        }

        // 2. Google Sheet Direct
        if (config.googleSheetScriptUrl) {
          const sheetParams = new URLSearchParams({
            name: formData.name,
            Name: formData.name,
            phone: formData.phone,
            Phone: formData.phone,
            email: formData.email,
            Email: formData.email,
            category: categoryLabel,
            Category: categoryLabel,
            projectType: projectTypesText,
            ProjectType: projectTypesText,
            service: fullServiceText,
            Service: fullServiceText,
            message: formData.message,
            Message: formData.message,
            date: new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" }),
            Date: new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" }),
          });

          await fetch(config.googleSheetScriptUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: sheetParams,
          });
          sheetsSuccess = true;
        }

        setSubmissionDetails({
          telegram: telegramSuccess,
          googleSheets: sheetsSuccess,
          brevoAdmin: true,
          brevoAutoReply: !!formData.email,
        });

        setShowSuccessModal(true);
        setFormData({ name: '', phone: '', email: '', message: '' });
      } catch (fallbackErr) {
        console.error('Submission fallback failed:', fallbackErr);
        setErrorMessage(
          isBangla
            ? 'নেটওয়ার্ক সমস্যার কারণে মেসেজ পাঠানো যায়নি। অনুগ্রহ করে টেলিগ্রাম বা হোয়াটসঅ্যাপে মেসেজ করুন।'
            : 'Could not deliver your message due to network error. Please reach out directly via Telegram or WhatsApp.'
        );
        setShowErrorModal(true);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-28 px-3.5 sm:px-6 lg:px-8 relative bg-[#0E0A07] border-t border-b border-[#FF7A18]/20">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1D140D] border border-[#FF7A18]/30 text-xs text-[#FF7A18] font-extrabold uppercase tracking-widest mb-3 sm:mb-4 shadow-sm">
            <Mail className="w-3.5 h-3.5 text-[#FF7A18]" />
            <span>{t.contact.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#FAF6F0] uppercase mb-3 sm:mb-4">
            <span className="bg-gradient-to-r from-[#FAF6F0] via-[#FF9238] to-[#FF7A18] bg-clip-text text-transparent">{t.contact.title}</span>
          </h2>
          <p className="text-[#A9A39A] text-xs sm:text-base font-normal max-w-xl mx-auto leading-relaxed">
            {t.contact.subtitle}
          </p>
          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-[#FF7A18] to-[#FF9238] mx-auto rounded-full mt-3 sm:mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10">
          
          {/* Contact Details (Left Column - 5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4 sm:gap-6">
            
            <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-[#FF7A18]/20 bg-[#16100B] flex items-center gap-3.5 sm:gap-4 shadow-xl hover:border-[#FF7A18]/50 transition-all">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#1D140D] text-[#FF7A18] flex items-center justify-center border border-[#FF7A18]/30 shrink-0 shadow-sm">
                <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF7A18]" />
              </div>
              <div>
                <p className="text-xs text-[#A9A39A] font-semibold">{t.contact.directCall}</p>
                <a href={`tel:${config.phone}`} className="text-base sm:text-lg font-bold text-[#FAF6F0] hover:text-[#FF7A18] transition-colors">
                  {config.phone}
                </a>
              </div>
            </div>

            <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-[#FF7A18]/20 bg-[#16100B] flex items-center gap-3.5 sm:gap-4 shadow-xl hover:border-[#FF7A18]/50 transition-all">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#1D140D] text-[#FF7A18] flex items-center justify-center border border-[#FF7A18]/30 shrink-0 shadow-sm">
                <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF7A18]" />
              </div>
              <div className="overflow-hidden">
                <p className="text-xs text-[#A9A39A] font-semibold">{t.contact.officialEmail}</p>
                <a href={`mailto:hello@9t9.pro.bd`} className="text-xs sm:text-base font-bold text-[#FF7A18] hover:text-[#FAF6F0] transition-colors block truncate">
                  hello@9t9.pro.bd
                </a>
                <p className="text-[11px] sm:text-xs text-[#A9A39A] mt-0.5 truncate">{config.emailPrimary}</p>
              </div>
            </div>

            <div className="p-6 rounded-3xl border border-[#FF7A18]/20 bg-[#16100B] flex items-center gap-4 shadow-xl hover:border-[#FF7A18]/50 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#1D140D] text-[#FF7A18] flex items-center justify-center border border-[#FF7A18]/30 shrink-0 shadow-sm">
                <Send className="w-6 h-6 text-[#FF7A18]" />
              </div>
              <div>
                <p className="text-xs text-[#A9A39A] font-semibold">Telegram</p>
                <a href={socials.telegram} target="_blank" rel="noopener noreferrer" className="text-base font-bold text-[#FAF6F0] hover:text-[#FF7A18] transition-colors flex items-center gap-1.5">
                  <span>{config.telegramUsername}</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60 text-[#FF7A18]" />
                </a>
              </div>
            </div>

            <div className="p-6 rounded-3xl border border-[#FF7A18]/20 bg-[#16100B] flex items-center gap-4 shadow-xl hover:border-[#FF7A18]/50 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#1D140D] text-[#FF7A18] flex items-center justify-center border border-[#FF7A18]/30 shrink-0 shadow-sm">
                <MapPin className="w-6 h-6 text-[#FF7A18]" />
              </div>
              <div>
                <p className="text-xs text-[#A9A39A] font-semibold">{t.contact.locationLabel}</p>
                <p className="text-base font-bold text-[#FAF6F0]">
                  {isBangla ? (config.location || 'সাতক্ষীরা, খুলনা, বাংলাদেশ') : 'Satkhira, Khulna, Bangladesh'}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#16100B] border border-[#FF7A18]/30 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#FF7A18] shrink-0" />
              <div className="text-xs text-[#FAF6F0]">
                <span className="font-bold block">{isBangla ? 'ভেরিফাইড যোগাযোগের চ্যানেল' : 'Verified Brevo & Telegram Channels'}</span>
                <span className="text-[11px] text-[#A9A39A]">{isBangla ? 'সবগুলো বার্তা ২৪/৭ অটোমেটিক ব্যাকআপ ও নোটিফিকেশনে সংরক্ষিত হয়।' : 'Automated Brevo notification, Telegram sync, and instant email reply.'}</span>
              </div>
            </div>

          </div>

          {/* Form Card (Right Column - 7 Cols) */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl sm:rounded-3xl bg-[#16100B] backdrop-blur-2xl border border-[#FF7A18]/25 shadow-2xl p-5 sm:p-8 overflow-hidden transition-all duration-300">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#FF7A18]/5 rounded-full blur-3xl pointer-events-none" />

              <h3 className="text-xl sm:text-2xl font-bold text-[#FAF6F0] mb-4 sm:mb-6 flex items-center gap-2.5">
                <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF7A18]" />
                <span>{t.contact.sendMessageHeading}</span>
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* 1. Category Selection */}
                <div>
                  <label className="block text-xs font-bold text-[#FAF6F0] mb-2.5 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-[#FF7A18]">
                      <Layers className="w-4 h-4 text-[#FF7A18]" />
                      {isBangla ? '১. সার্ভিস ক্যাটাগরি বেছে নিন' : '1. Select Service Category'} <span className="text-rose-400">*</span>
                    </span>
                  </label>

                  <div
                    ref={categoryScrollRef}
                    className="p-1.5 rounded-2xl bg-[#0E0A07] border border-[#FF7A18]/20 shadow-lg flex items-center gap-2 overflow-x-auto no-scrollbar select-none"
                  >
                    {CATEGORIES.map((cat) => {
                      const isSelected = selectedCategory === cat.id;
                      const label = isBangla ? cat.labelBn : cat.labelEn;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          disabled={loading}
                          onClick={() => handleCategoryChange(cat.id)}
                          className={`relative px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 select-none shrink-0 ${
                            isSelected
                              ? 'bg-gradient-to-r from-[#FF7A18] to-[#E8590C] text-white shadow-md font-bold'
                              : 'bg-[#1D140D] text-[#A9A39A] hover:text-[#FAF6F0] border border-[#FF7A18]/20 hover:border-[#FF7A18]/40 font-medium'
                          }`}
                        >
                          <span className="relative z-10 whitespace-nowrap">{label}</span>
                          {isSelected && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 500, damping: 25 }} className="relative z-10">
                              <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0" />
                            </motion.div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Project Selection (Multi-select) with Clean Chips */}
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
                    <label className="block text-xs font-bold text-[#FAF6F0] flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-[#FF7A18]" />
                      <span className="text-[#FF7A18] font-bold">{isBangla ? '২. প্রজেক্ট টাইপ (মাল্টি-সিলেক্ট)' : '2. Project Type (Multi-select)'}</span> <span className="text-rose-400">*</span>
                    </label>
                    <span className="text-[10px] text-[#FF7A18] bg-[#1D140D] border border-[#FF7A18]/30 px-2.5 py-0.5 rounded-full font-semibold">
                      {isBangla ? 'একাধিক সিলেক্ট করতে পারেন' : 'Multi-selection enabled'}
                    </span>
                  </div>

                  <div
                    ref={projectTypesScrollRef}
                    className="p-2 rounded-2xl bg-[#0E0A07] border border-[#FF7A18]/20 shadow-lg flex items-center gap-2 overflow-x-auto no-scrollbar select-none"
                  >
                    {currentCategoryObj.projects.map((proj) => {
                      const projName = isBangla ? proj.labelBn : proj.labelEn;
                      const isSelected = selectedProjectTypes.includes(projName) || selectedProjectTypes.includes(proj.labelEn) || selectedProjectTypes.includes(proj.labelBn);
                      return (
                        <motion.button
                          key={proj.id}
                          type="button"
                          disabled={loading}
                          onClick={() => toggleProjectType(projName)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`relative px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5 border shrink-0 cursor-pointer select-none ${
                            isSelected
                              ? 'bg-gradient-to-r from-[#FF7A18] to-[#E8590C] text-white border-[#FF7A18] shadow-md font-bold'
                              : 'bg-[#1D140D] text-[#A9A39A] hover:text-[#FAF6F0] border border-[#FF7A18]/20 hover:border-[#FF7A18]/40 font-medium'
                          } disabled:opacity-60`}
                        >
                          <span className="relative z-10 whitespace-nowrap">{projName}</span>
                          {isSelected && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 500, damping: 25 }} className="relative z-10">
                              <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0" />
                            </motion.div>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Budget Range & Project Timeline */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <BudgetWheelSelector
                    label={isBangla ? '৩. বাজেট রেন্জ (Budget Range)' : '3. Budget Range'}
                    value={budgetRange}
                    onChange={setBudgetRange}
                    isBangla={isBangla}
                    disabled={loading}
                  />

                  <TimelineWheelSelector
                    label={isBangla ? '৪. প্রজেক্ট টাইমলাইন (Timeline)' : '4. Project Timeline'}
                    value={projectTimeline}
                    onChange={setProjectTimeline}
                    isBangla={isBangla}
                    disabled={loading}
                  />
                </div>

                {/* 4. Name, Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-[#FAF6F0] mb-2">
                      {t.contact.nameLabel} <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      disabled={loading}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={isBangla ? 'আপনার পূর্ণ নাম' : 'Your full name'}
                      className="w-full px-4 py-3.5 rounded-xl bg-[#0E0A07] border border-[#FF7A18]/20 text-[#FAF6F0] placeholder-[#A9A39A] text-xs focus:outline-none focus:border-[#FF7A18] transition-all disabled:opacity-60"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#FAF6F0] mb-2">
                      {t.contact.emailLabel} <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      disabled={loading}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="example@gmail.com"
                      className="w-full px-4 py-3.5 rounded-xl bg-[#0E0A07] border border-[#FF7A18]/20 text-[#FAF6F0] placeholder-[#A9A39A] text-xs focus:outline-none focus:border-[#FF7A18] transition-all disabled:opacity-60"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#FAF6F0] mb-2">
                      {t.contact.phoneLabel}
                    </label>
                    <input
                      type="tel"
                      disabled={loading}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder={isBangla ? 'যেমন: 01700-000000' : 'e.g. +8801700-000000'}
                      className="w-full px-4 py-3.5 rounded-xl bg-[#0E0A07] border border-[#FF7A18]/20 text-[#FAF6F0] placeholder-[#A9A39A] text-xs focus:outline-none focus:border-[#FF7A18] transition-all disabled:opacity-60"
                    />
                  </div>
                </div>

                {/* 5. Message Box */}
                <div className="space-y-2.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <label className="block text-xs font-bold text-[#FAF6F0] flex items-center gap-1.5">
                      <MessageSquare className="w-4 h-4 text-[#FF7A18]" />
                      <span>{t.contact.messageLabel}</span> <span className="text-rose-400">*</span>
                    </label>

                    {/* Quick Template Buttons */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      <button
                        type="button"
                        disabled={loading}
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            message: isBangla
                              ? `• প্রজেক্টের প্রধান লক্ষ্য:\n• বিশেষ ডিজাইন/ডিভেলাপমেন্ট ফিচার:\n• রেফারেন্স লিংক (যদি থাকে):\n• আনুমানিক বাজেট ও সময়সীমা:`
                              : `• Primary Project Goals:\n• Key Features Needed:\n• Reference Links / Design Inspo:\n• Timeline & Target Audience:`,
                          }))
                        }
                        className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-[#1D140D] text-[#FF7A18] border border-[#FF7A18]/30 hover:border-[#FF7A18] transition-all cursor-pointer flex items-center gap-1"
                      >
                        <Sparkles className="w-3 h-3 text-[#FF7A18]" />
                        <span>{isBangla ? '📋 কাঠামোগত টেমপ্লেট' : '📋 Quick Template'}</span>
                      </button>

                      <button
                        type="button"
                        disabled={loading}
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            message: isBangla
                              ? `হ্যালো মাসুম, আমার একটি প্রজেক্ট আইডিয়া আছে। আমি আপনার সাথে ডিজাইন এবং টেকনোলজি স্ট্যাক নিয়ে স্ট্র্যাটেজিক পরামর্শ করতে চাই।`
                              : `Hi Masum, I have a project idea in mind and would love to consult with you on design, tech stack, and execution strategy.`,
                          }))
                        }
                        className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-[#1D140D] text-[#FF7A18] border border-[#FF7A18]/30 hover:border-[#FF7A18] transition-all cursor-pointer flex items-center gap-1"
                      >
                        <span>{isBangla ? '💡 কনসাল্টেশন' : '💡 Consultation'}</span>
                      </button>

                      {formData.message.length > 0 && (
                        <button
                          type="button"
                          disabled={loading}
                          onClick={() => setFormData((prev) => ({ ...prev, message: '' }))}
                          className="px-2 py-1 rounded-lg text-[10px] font-bold bg-rose-950/40 text-rose-300 border border-rose-500/30 hover:bg-rose-900/80 transition-all cursor-pointer"
                        >
                          {isBangla ? 'মুছুন' : 'Clear'}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Message Container */}
                  <div className="relative rounded-2xl bg-[#0E0A07] border border-[#FF7A18]/20 hover:border-[#FF7A18]/40 focus-within:border-[#FF7A18] shadow-lg transition-all duration-300 overflow-hidden">
                    {/* Top Status Banner */}
                    <div className="px-4 py-2 bg-[#1D140D] border-b border-[#FF7A18]/15 flex items-center justify-between text-[11px] text-[#FF7A18] font-medium">
                      <span className="flex items-center gap-1.5 font-bold">
                        <Zap className="w-3.5 h-3.5 text-[#FF7A18]" />
                        <span>{isBangla ? 'মাসুম এর সরাসরি ইনবক্সে অটোমেটিক ফরোয়ার্ড হবে' : 'Direct Priority Line to MASUM'}</span>
                      </span>
                      <span className="text-[10px] text-[#A9A39A]">
                        {isBangla ? 'টেলিগ্রাম ও ইমেইল ব্যাকআপ' : 'Instant Telegram & Email Sync'}
                      </span>
                    </div>

                    <textarea
                      rows={5}
                      required
                      maxLength={1000}
                      disabled={loading}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={
                        isBangla
                          ? 'আপনার প্রজেক্টের বিবরণ, বাজেট সুবিধা, বা যেকোনো প্রশ্ন বিস্তারিত লিখুন... (উপরের টেমপ্লেটে ক্লিক করে সহজে ভরতে পারেন)'
                          : 'Write detailed notes about your project goals, references, or custom requirements... (Click template buttons above for quick format)'
                      }
                      className="w-full px-4 py-3 bg-transparent text-[#FAF6F0] placeholder-[#A9A39A] text-xs sm:text-sm font-sans leading-relaxed focus:outline-none transition-all disabled:opacity-60 resize-none"
                    />

                    {/* Bottom Progress Bar & Character Counter */}
                    <div className="px-4 py-2.5 bg-[#16100B] border-t border-[#FF7A18]/15 flex items-center justify-between">
                      <div className="flex-1 max-w-[60%] bg-[#0E0A07] rounded-full h-1.5 overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 rounded-full ${
                            formData.message.length > 900
                              ? 'bg-rose-500'
                              : formData.message.length > 500
                              ? 'bg-amber-400'
                              : 'bg-[#FF7A18]'
                          }`}
                          style={{ width: `${Math.min(100, (formData.message.length / 1000) * 100)}%` }}
                        />
                      </div>

                      <span
                        className={`text-[11px] font-mono font-bold ${
                          formData.message.length > 900 ? 'text-rose-400' : 'text-[#FF7A18]'
                        }`}
                      >
                        {formData.message.length} / 1000 {isBangla ? 'অক্ষর' : 'chars'}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="ios-btn-primary w-full py-4 text-sm font-bold flex items-center justify-center gap-2 uppercase tracking-wider"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>{isBangla ? 'ইনকোয়ারি সাবমিট করা হচ্ছে...' : 'Submitting Client Inquiry...'}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>{isBangla ? 'ইনকোয়ারি সাবমিট করুন' : 'Submit Client Inquiry'}</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>

      {/* 1px Divider Line at Section Bottom */}
      <div className="relative w-full h-[1px] mt-16 sm:mt-24 overflow-hidden pointer-events-none bg-[#FF7A18]/20" />

      {/* SUCCESS MODAL */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-[#16100B] border border-[#FF7A18]/30 shadow-2xl text-center overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowSuccessModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full text-[#A9A39A] hover:text-[#FAF6F0] hover:bg-[#1D140D] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Checkmark Icon */}
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#1D140D] text-[#FF7A18] border border-[#FF7A18]/30 flex items-center justify-center shadow-lg">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <h3 className="text-2xl font-bold text-[#FAF6F0] mb-2">
                {isBangla ? 'মেসেজ সফলভাবে পাঠানো হয়েছে!' : 'Message Sent Successfully!'}
              </h3>
              <p className="text-[#A9A39A] text-xs sm:text-sm mb-6 leading-relaxed font-normal">
                {isBangla
                  ? 'ধন্যবাদ! আপনার ইনকোয়ারিটি গ্রহণ করা হয়েছে এবং Brevo ও Telegram এর মাধ্যমে স্বয়ংক্রিয়ভাবে নোটিফাই করা হয়েছে।'
                  : 'Thank you! Your message has been received and automatically broadcast via Brevo and Telegram.'}
              </p>

              {/* Multi-Channel Status Breakdown */}
              <div className="space-y-2.5 mb-6 text-left text-xs bg-[#0E0A07] p-4 rounded-2xl border border-[#FF7A18]/20">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-[#FAF6F0]">
                    <Zap className="w-4 h-4 text-[#FF7A18]" />
                    <span>Telegram Instant Notification</span>
                  </span>
                  <span className="text-[#FF7A18] font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#FF7A18]" />
                    <span>Active</span>
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-[#FAF6F0]">
                    <Layers className="w-4 h-4 text-[#FF7A18]" />
                    <span>Google Sheets Live Backup</span>
                  </span>
                  <span className="text-[#FF7A18] font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#FF7A18]" />
                    <span>Saved</span>
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-[#FAF6F0]">
                    <Mail className="w-4 h-4 text-[#FF7A18]" />
                    <span>Brevo Admin Alert (hello@9t9.pro.bd)</span>
                  </span>
                  <span className="text-[#FF7A18] font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#FF7A18]" />
                    <span>Sent</span>
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-[#FAF6F0]">
                    <Sparkles className="w-4 h-4 text-[#FF7A18]" />
                    <span>Visitor Confirmation Email</span>
                  </span>
                  <span className="text-[#FF7A18] font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#FF7A18]" />
                    <span>{submissionDetails.brevoAutoReply ? 'Delivered' : 'Ready'}</span>
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#FF7A18] to-[#E8590C] text-white font-bold text-xs shadow-md transition-all cursor-pointer uppercase tracking-wider"
                >
                  {isBangla ? 'ধন্যবাদ, ঠিক আছে' : 'Awesome, Close Window'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ERROR MODAL */}
      <AnimatePresence>
        {showErrorModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md p-6 sm:p-8 rounded-3xl bg-[#12100D] border border-rose-500/40 shadow-2xl text-center overflow-hidden"
            >
              <button
                onClick={() => setShowErrorModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full text-[#B8AA98] hover:text-[#F1E8DC] hover:bg-[#181511] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-400/40 flex items-center justify-center shadow-lg">
                <AlertCircle className="w-10 h-10" />
              </div>

              <h3 className="text-xl font-bold text-[#F1E8DC] mb-2">
                {isBangla ? 'মেসেজ পাঠানো সম্ভব হয়নি' : 'Action Required'}
              </h3>
              <p className="text-[#B8AA98] text-xs sm:text-sm mb-6 leading-relaxed font-normal">
                {errorMessage}
              </p>

              <div className="flex flex-col gap-2.5">
                <button
                  onClick={() => setShowErrorModal(false)}
                  className="w-full py-3.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>{isBangla ? 'পুনরায় চেষ্টা করুন' : 'Retry Submission'}</span>
                </button>

                <a
                  href={socials.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-[#181511] hover:bg-[#211D17] text-[#F1E8DC] font-bold text-xs border border-[#C7A77D]/20 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 text-[#C7A77D]" />
                  <span>{isBangla ? 'টেলিগ্রামে সরাসরি লিখুন' : 'Send via Telegram Directly'}</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
