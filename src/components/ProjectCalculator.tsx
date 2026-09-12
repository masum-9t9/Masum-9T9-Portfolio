import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calculator, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  MessageSquare, 
  X, 
  ArrowRight,
  Palette,
  Layout,
  Code2,
  Calendar,
  Layers,
  HelpCircle
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SocialLinks } from '../types';

interface ProjectCalculatorProps {
  socials: SocialLinks;
  isModal?: boolean;
  onClose?: () => void;
}

interface ServiceCategory {
  id: 'graphics' | 'ui_ux' | 'frontend';
  labelBn: string;
  labelEn: string;
  icon: React.FC<{ className?: string }>;
  subcategories: {
    id: string;
    labelBn: string;
    labelEn: string;
    descBn: string;
    descEn: string;
    basePriceBdt: number;
    basePriceUsd: number;
    baseDays: number;
  }[];
}

const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'graphics',
    labelBn: 'গ্রাফিক্স ডিজাইন',
    labelEn: 'Graphic Design',
    icon: Palette,
    subcategories: [
      {
        id: 'yt_thumb',
        labelBn: 'ইউটিউব ভাইরাল থাম্বনেইল',
        labelEn: 'YouTube Viral Thumbnail',
        descBn: 'হাই-সিটিআর ক্লিকযোগ্য থাম্বনেইল, কালার গ্রেডিং ও টাইপোগ্রাফি',
        descEn: 'High-CTR clickable thumbnails with vibrant color grading',
        basePriceBdt: 1200,
        basePriceUsd: 15,
        baseDays: 1,
      },
      {
        id: 'poster',
        labelBn: 'মুভি / নাটক / কনসার্ট পোস্টার',
        labelEn: 'Movie / Drama / Event Poster',
        descBn: 'সিনেমাটিক ফটো ম্যানিপুলেশন, লাইটিং এবং টাইটেল আর্ট',
        descEn: 'Cinematic photo manipulation, mood lighting & key visuals',
        basePriceBdt: 3500,
        basePriceUsd: 35,
        baseDays: 2,
      },
      {
        id: 'social_banner',
        labelBn: 'সোশ্যাল মিডিয়া ব্যানার ও পোস্ট',
        labelEn: 'Social Media Ad / Banner Pack',
        descBn: 'ফেসবুক/ইনস্টাগ্রাম প্রমোশনাল অ্যাড ডিজাইন',
        descEn: 'Facebook & Instagram creative social ads & banners',
        basePriceBdt: 2000,
        basePriceUsd: 25,
        baseDays: 2,
      },
      {
        id: 'branding_kit',
        labelBn: 'লোগো ও ব্র্যান্ড ভিজ্যুয়াল আইডেন্টিটি',
        labelEn: 'Logo & Visual Brand Identity',
        descBn: 'ভেক্টর লোগো, ব্র্যান্ড কালার প্যালেট ও সোশ্যাল কিট',
        descEn: 'Vector logo, custom brand style guide & social assets',
        basePriceBdt: 6000,
        basePriceUsd: 65,
        baseDays: 3,
      },
    ],
  },
  {
    id: 'ui_ux',
    labelBn: 'ইউআই/ইউএক্স ডিজাইন (Figma)',
    labelEn: 'UI/UX Design (Figma)',
    icon: Layout,
    subcategories: [
      {
        id: 'landing_ui',
        labelBn: 'হাই-কনভার্টিং ল্যান্ডিং পেজ UI',
        labelEn: 'High-Converting Landing Page UI',
        descBn: 'মডার্ন ফিগমা লেআউট, অটো-লেআউট এবং মোবাইল ভিউ',
        descEn: 'Modern Figma hero-to-footer wireframe & UI mockup',
        basePriceBdt: 7500,
        basePriceUsd: 80,
        baseDays: 3,
      },
      {
        id: 'website_full_ui',
        labelBn: 'কমপ্লিট মাল্টি-পেজ ওয়েবসাইট UI',
        labelEn: 'Full Multi-Page Website UI',
        descBn: '৫-৭ পেজের রেসপনসিভ ফিগমা ডিজাইন সিস্টেম ও কম্পোনেন্ট',
        descEn: '5-7 pages responsive Figma design system & components',
        basePriceBdt: 16000,
        basePriceUsd: 160,
        baseDays: 5,
      },
      {
        id: 'app_ui',
        labelBn: 'মোবাইল অ্যাপ UI স্ক্রিনস (iOS/Android)',
        labelEn: 'Mobile App UI Screens',
        descBn: 'ইউজার ফ্লো, ইন্টারেক্টিভ প্রোটোটাইপ ও আধুনিক ডার্ক/লাইট মোড',
        descEn: 'User flows, clean app screens & interactive Figma prototype',
        basePriceBdt: 18000,
        basePriceUsd: 180,
        baseDays: 6,
      },
      {
        id: 'dashboard_ui',
        labelBn: 'SaaS ড্যাশবোর্ড ও অ্যাডমিন প্যানেল UI',
        labelEn: 'SaaS Dashboard & Admin UI',
        descBn: 'ডাটা চার্ট, টেবিল, ইউজার অ্যাকশন ও স্টেট ডিজাইন',
        descEn: 'Analytics charts, modern dark UI & interactive controls',
        basePriceBdt: 20000,
        basePriceUsd: 200,
        baseDays: 7,
      },
    ],
  },
  {
    id: 'frontend',
    labelBn: 'ফ্রন্টএন্ড ওয়েব ডেভেলপমেন্ট',
    labelEn: 'Front-End Web Development',
    icon: Code2,
    subcategories: [
      {
        id: 'portfolio_dev',
        labelBn: 'ব্যক্তিগত পোর্টফোলিও ওয়েবসাইট',
        labelEn: 'Modern Portfolio Website',
        descBn: 'React 18 + Tailwind CSS + Framer Motion অ্যানিমেশন',
        descEn: 'Ultra-smooth React + Tailwind interactive developer portfolio',
        basePriceBdt: 12000,
        basePriceUsd: 130,
        baseDays: 4,
      },
      {
        id: 'business_landing_dev',
        labelBn: 'বিজনেস ল্যান্ডিং পেজ ডেভেলপমেন্ট',
        labelEn: 'Business Landing Page Dev',
        descBn: 'হাই-স্পিড SEO ফ্রেন্ডলি পেজ ও কন্টাক্ট ইন্টিগ্রেশন',
        descEn: 'Fast loading landing page with lead capture form & SEO',
        basePriceBdt: 15000,
        basePriceUsd: 150,
        baseDays: 4,
      },
      {
        id: 'full_web_app',
        labelBn: 'ফুল-স্ট্যাক রিয়্যাক্ট / এক্সপ্রেস ওয়েব অ্যাপ',
        labelEn: 'React + Express Web Application',
        descBn: 'এপিআই ইন্টিগ্রেশন, ডাইনামিক স্টেট ও রেসপন্সিভ আর্কিটেকচার',
        descEn: 'Interactive client dashboard with backend API integrations',
        basePriceBdt: 28000,
        basePriceUsd: 280,
        baseDays: 8,
      },
    ],
  },
];

interface QuantityOption {
  id: string;
  labelBn: string;
  labelEn: string;
  multiplier: number;
  addedDays: number;
}

const QUANTITY_OPTIONS: QuantityOption[] = [
  { id: 'single', labelBn: '১টি একক কাজ (Single Task)', labelEn: '1 Single Project', multiplier: 1, addedDays: 0 },
  { id: 'pack3', labelBn: '৩টি কাজের প্যাক (১০% ডিসকাউন্ট)', labelEn: 'Pack of 3 (10% Discount)', multiplier: 2.7, addedDays: 1 },
  { id: 'pack5', labelBn: '৫টি কাজের মেগা প্যাক (২০% ছাড়)', labelEn: 'Pack of 5 (20% Off)', multiplier: 4.0, addedDays: 2 },
  { id: 'retainer', labelBn: 'মাসিক পার্টনারশিপ / সাপোর্ট', labelEn: 'Monthly Retainer Partnership', multiplier: 7.5, addedDays: 15 },
];

export const ProjectCalculator: React.FC<ProjectCalculatorProps> = ({ 
  socials,
  isModal = false,
  onClose
}) => {
  const { language } = useLanguage();
  const isBn = language === 'bn';

  const [selectedCatId, setSelectedCatId] = useState<'graphics' | 'ui_ux' | 'frontend'>('graphics');
  const [selectedSubId, setSelectedSubId] = useState<string>('yt_thumb');
  const [selectedQuantity, setSelectedQuantity] = useState<string>('single');
  const [isUrgent, setIsUrgent] = useState<boolean>(false);
  const [currency, setCurrency] = useState<'BDT' | 'USD'>('BDT');

  const currentCategory = useMemo(() => {
    return SERVICE_CATEGORIES.find((c) => c.id === selectedCatId) || SERVICE_CATEGORIES[0];
  }, [selectedCatId]);

  const currentSub = useMemo(() => {
    const found = currentCategory.subcategories.find((s) => s.id === selectedSubId);
    return found || currentCategory.subcategories[0];
  }, [currentCategory, selectedSubId]);

  const currentQty = useMemo(() => {
    return QUANTITY_OPTIONS.find((q) => q.id === selectedQuantity) || QUANTITY_OPTIONS[0];
  }, [selectedQuantity]);

  // When category changes, auto-select first subcategory
  const handleCategoryChange = (catId: 'graphics' | 'ui_ux' | 'frontend') => {
    setSelectedCatId(catId);
    const cat = SERVICE_CATEGORIES.find((c) => c.id === catId);
    if (cat && cat.subcategories.length > 0) {
      setSelectedSubId(cat.subcategories[0].id);
    }
  };

  // Price & Timeline calculation with 30% Discount
  const DISCOUNT_PERCENT = 30;

  const originalPrice = useMemo(() => {
    const base = currency === 'BDT' ? currentSub.basePriceBdt : currentSub.basePriceUsd;
    const priceWithQty = base * currentQty.multiplier;
    const finalPrice = isUrgent ? priceWithQty * 1.3 : priceWithQty;
    return Math.round(finalPrice);
  }, [currentSub, currentQty, isUrgent, currency]);

  const calculatedPrice = useMemo(() => {
    return Math.round(originalPrice * (1 - DISCOUNT_PERCENT / 100));
  }, [originalPrice]);

  const savingsAmount = useMemo(() => {
    return originalPrice - calculatedPrice;
  }, [originalPrice, calculatedPrice]);

  const calculatedDays = useMemo(() => {
    let days = currentSub.baseDays + currentQty.addedDays;
    if (isUrgent && days > 1) {
      days = Math.max(1, Math.round(days * 0.65));
    }
    return Math.max(1, days);
  }, [currentSub, currentQty, isUrgent]);

  const cleanPhone = socials.whatsapp ? socials.whatsapp.replace(/[^0-9]/g, '') : '8801303623838';

  const whatsappMessage = encodeURIComponent(
    `Hello Masum 9T9! I estimated a project quote with your 30% Discount Offer:\n` +
    `📁 Category: ${currentCategory.labelEn}\n` +
    `🎯 Scope: ${currentSub.labelEn}\n` +
    `📦 Volume: ${currentQty.labelEn}\n` +
    `⚡ Express Delivery: ${isUrgent ? 'Yes (Urgent)' : 'Standard'}\n` +
    `🏷️ Regular Budget: ${currency === 'BDT' ? '৳' : '$'}${originalPrice.toLocaleString()}\n` +
    `🔥 Discounted Budget (30% OFF): ${currency === 'BDT' ? '৳' : '$'}${calculatedPrice.toLocaleString()} (Saved: ${currency === 'BDT' ? '৳' : '$'}${savingsAmount.toLocaleString()})\n` +
    `⏱️ Estimated Turnaround: ${calculatedDays} Day(s)\n\n` +
    `Let's discuss and get started!`
  );

  return (
    <div className={`w-full relative select-none ${isModal ? 'p-0' : 'py-6 sm:py-10'}`}>
      <div className={`${isModal ? 'w-full' : 'max-w-7xl mx-auto px-3 sm:px-6 lg:px-8'}`}>
        
        <div className="relative rounded-3xl p-5 sm:p-8 lg:p-10 border border-[#FF7A18]/30 bg-[#16100B] shadow-2xl overflow-hidden">
          
          {/* Subtle Ambient Warm Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF7A18]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FF7A18]/5 rounded-full blur-3xl pointer-events-none" />

          {/* Close button if in modal mode */}
          {isModal && onClose && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-[#1D140D] border border-white/10 hover:border-[#FF7A18] text-[#A9A39A] hover:text-[#FAF6F0] transition-colors z-30 cursor-pointer"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          {/* Header Title & Badge */}
          <div className="relative z-10 mb-6 sm:mb-8 text-left">
            <div className="flex flex-wrap items-center gap-2 mb-2.5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1D140D] border border-[#FF7A18]/30 text-[#FF7A18] text-xs font-bold uppercase tracking-wider">
                <Calculator className="w-3.5 h-3.5 text-[#FF7A18]" />
                <span className={isBn ? 'font-bn' : ''}>
                  {isBn ? 'প্রজেক্ট বাজেট ও সময় আন্দাজ করুন' : 'Instant Cost & Timeline Estimator'}
                </span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#22C55E]/15 border border-[#22C55E]/40 text-[#22C55E] text-xs font-bold animate-pulse">
                <span>🔥</span>
                <span className={isBn ? 'font-bn' : ''}>
                  {isBn ? '৩০% বিশেষ ছাড় চলছে!' : '30% Limited Discount Live!'}
                </span>
              </div>
            </div>
            <h2 className={`text-xl sm:text-3xl font-extrabold text-[#FAF6F0] tracking-tight ${isBn ? 'font-bn' : ''}`}>
              {isBn ? 'ক্যাটাগরি ও সাব-ক্যাটাগরি সিলেক্ট করে বাজেট ও সময় জানুন' : 'Select Category & Scope to Estimate Your Budget'}
            </h2>
            <p className={`text-xs sm:text-sm text-[#A9A39A] mt-1 ${isBn ? 'font-bn' : ''}`}>
              {isBn 
                ? 'স্বচ্ছ ও নিরপেক্ষ বাজেট নির্ধারণ — বর্তমানে প্রতিটি সার্ভিসে ৩০% স্পেশাল ছাড় কার্যকর রয়েছে।'
                : 'Interactive pricing structure tailored to exact deliverables with an active 30% special promotional discount.'}
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            
            {/* LEFT COLUMN: 3-TIER CONFIGURATOR */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* LEVEL 1: MAIN CATEGORY SELECTOR (3 Cards/Tabs) */}
              <div className="space-y-2">
                <label className={`text-xs font-bold text-[#FF7A18] uppercase tracking-wider flex items-center gap-1.5 ${isBn ? 'font-bn' : ''}`}>
                  <span className="w-5 h-5 rounded-full bg-[#FF7A18]/20 text-[#FF7A18] flex items-center justify-center text-[10px] font-bold">1</span>
                  <span>{isBn ? 'ক্যাটাগরি সিলেক্ট করুন (Main Domain):' : 'Step 1: Select Main Category:'}</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {SERVICE_CATEGORIES.map((cat) => {
                    const IconComp = cat.icon;
                    const isSelected = selectedCatId === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => handleCategoryChange(cat.id)}
                        className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                          isSelected
                            ? 'bg-[#24170F] border-[#FF7A18] text-[#FAF6F0] shadow-[0_0_16px_rgba(255,122,24,0.25)] ring-1 ring-[#FF7A18]'
                            : 'bg-[#18120C] border-white/10 text-[#A9A39A] hover:border-white/25 hover:text-[#FAF6F0]'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${isSelected ? 'bg-[#FF7A18] text-white' : 'bg-[#1D140D] text-[#FF7A18]'}`}>
                            <IconComp className="w-4 h-4" />
                          </div>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-[#FF7A18]" />}
                        </div>
                        <span className={`text-xs sm:text-sm font-bold leading-tight ${isBn ? 'font-bn' : ''}`}>
                          {isBn ? cat.labelBn : cat.labelEn}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* LEVEL 2: SUB-CATEGORY SELECTOR */}
              <div className="space-y-2.5">
                <label className={`text-xs font-bold text-[#FF7A18] uppercase tracking-wider flex items-center gap-1.5 ${isBn ? 'font-bn' : ''}`}>
                  <span className="w-5 h-5 rounded-full bg-[#FF7A18]/20 text-[#FF7A18] flex items-center justify-center text-[10px] font-bold">2</span>
                  <span>{isBn ? 'সাব-ক্যাটাগরি বা কাজের ধরন (Specific Deliverable):' : 'Step 2: Choose Deliverable Type:'}</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentCategory.subcategories.map((sub) => {
                    const isSelected = selectedSubId === sub.id;
                    return (
                      <button
                        key={sub.id}
                        type="button"
                        onClick={() => setSelectedSubId(sub.id)}
                        className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-[#24170F] border-[#FF7A18] text-white shadow-md shadow-[#FF7A18]/20 ring-1 ring-[#FF7A18]'
                            : 'bg-[#18120C] border-white/10 text-[#A9A39A] hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <span className={`text-xs font-bold text-[#FAF6F0] leading-snug ${isBn ? 'font-bn' : ''}`}>
                            {isBn ? sub.labelBn : sub.labelEn}
                          </span>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-[#FF7A18] shrink-0 mt-0.5" />}
                        </div>

                        <p className={`text-[11px] text-[#A9A39A] line-clamp-2 leading-relaxed ${isBn ? 'font-bn' : ''}`}>
                          {isBn ? sub.descBn : sub.descEn}
                        </p>

                        <div className="pt-2 mt-2 border-t border-white/5 flex items-center justify-between text-[11px]">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[#22C55E] font-bold">
                              {currency === 'BDT'
                                ? `৳${Math.round(sub.basePriceBdt * 0.7).toLocaleString()}`
                                : `$${Math.round(sub.basePriceUsd * 0.7)}`}
                            </span>
                            <span className="line-through text-[#8E877D] text-[10px]">
                              {currency === 'BDT' ? `৳${sub.basePriceBdt.toLocaleString()}` : `$${sub.basePriceUsd}`}
                            </span>
                            <span className="text-[9px] font-bold text-[#FF7A18] bg-[#FF7A18]/15 px-1 py-0.5 rounded">
                              -30%
                            </span>
                          </div>
                          <span className="text-[#A9A39A] flex items-center gap-1 font-medium shrink-0">
                            <Clock className="w-3 h-3 text-[#FF7A18]" />
                            <span>{sub.baseDays} {isBn ? 'দিন' : 'Day(s)'}</span>
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* LEVEL 3: QUANTITY / SCOPE SELECTOR */}
              <div className="space-y-2">
                <label className={`text-xs font-bold text-[#FF7A18] uppercase tracking-wider flex items-center gap-1.5 ${isBn ? 'font-bn' : ''}`}>
                  <span className="w-5 h-5 rounded-full bg-[#FF7A18]/20 text-[#FF7A18] flex items-center justify-center text-[10px] font-bold">3</span>
                  <span>{isBn ? 'পরিমাণ / কাজের ভলিউম (Volume / Scope):' : 'Step 3: Project Volume:'}</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {QUANTITY_OPTIONS.map((qty) => {
                    const isSelected = selectedQuantity === qty.id;
                    return (
                      <button
                        key={qty.id}
                        type="button"
                        onClick={() => setSelectedQuantity(qty.id)}
                        className={`p-3 rounded-xl border text-left transition-all text-xs font-semibold flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-[#24170F] border-[#FF7A18] text-white shadow-sm'
                            : 'bg-[#18120C] border-white/10 text-[#A9A39A] hover:border-white/20'
                        }`}
                      >
                        <span className={isBn ? 'font-bn' : ''}>{isBn ? qty.labelBn : qty.labelEn}</span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-[#FF7A18] shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* LEVEL 4: URGENT / EXPRESS TOGGLE */}
              <div className="p-3.5 rounded-2xl bg-[#18120C] border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#1D140D] border border-[#FF7A18]/30 flex items-center justify-center text-[#FF7A18]">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className={`text-xs font-bold text-[#FAF6F0] ${isBn ? 'font-bn' : ''}`}>
                      {isBn ? 'সুপার ফাস্ট / এক্সপ্রেস ডেলিভারি প্রয়োজন?' : 'Need Express Turnaround?'}
                    </div>
                    <div className="text-[10px] text-[#A9A39A]">
                      {isBn ? 'জরুরি ডেলিভারিতে সময় কম লাগবে (+৩০% ফি প্রযোজ্য)' : 'Faster turnaround with priority queue (+30% surcharge)'}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsUrgent(!isUrgent)}
                  className={`w-12 h-6 rounded-full transition-colors p-0.5 flex items-center cursor-pointer ${
                    isUrgent ? 'bg-[#FF7A18] justify-end' : 'bg-[#2B231D] justify-start'
                  }`}
                >
                  <span className="w-5 h-5 rounded-full bg-white shadow-md block" />
                </button>
              </div>

            </div>

            {/* RIGHT COLUMN: LIVE ESTIMATE CARD & DIRECT START */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="p-6 sm:p-8 rounded-3xl bg-[#1D140D] border border-[#FF7A18]/40 shadow-2xl space-y-6 text-center relative overflow-hidden">
                
                {/* Currency Switcher */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <span className={`text-xs text-[#A9A39A] font-semibold flex items-center gap-1 ${isBn ? 'font-bn' : ''}`}>
                    <Sparkles className="w-3.5 h-3.5 text-[#FF7A18]" />
                    <span>{isBn ? 'মুদ্রা (Currency):' : 'Currency:'}</span>
                  </span>

                  <div className="inline-flex rounded-full bg-[#120D09] p-1 border border-white/10">
                    <button
                      type="button"
                      onClick={() => setCurrency('BDT')}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                        currency === 'BDT' ? 'bg-[#FF7A18] text-white shadow-sm' : 'text-[#A9A39A] hover:text-white'
                      }`}
                    >
                      BDT (৳)
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrency('USD')}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                        currency === 'USD' ? 'bg-[#FF7A18] text-white shadow-sm' : 'text-[#A9A39A] hover:text-white'
                      }`}
                    >
                      USD ($)
                    </button>
                  </div>
                </div>

                {/* Scope Summary Pill */}
                <div className="text-left p-3.5 rounded-2xl bg-[#15100C] border border-white/10 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-[#A9A39A]">
                    <span>{isBn ? 'নির্বাচিত ক্যাটাগরি:' : 'Category:'}</span>
                    <span className="text-[#FF7A18] font-bold">{isBn ? currentCategory.labelBn : currentCategory.labelEn}</span>
                  </div>
                  <div className="flex items-center justify-between text-[#A9A39A]">
                    <span>{isBn ? 'কাজের ধরন:' : 'Deliverable:'}</span>
                    <span className="text-[#FAF6F0] font-semibold truncate max-w-[180px] text-right">{isBn ? currentSub.labelBn : currentSub.labelEn}</span>
                  </div>
                  <div className="flex items-center justify-between text-[#A9A39A]">
                    <span>{isBn ? 'ডেলিভারি মোড:' : 'Speed:'}</span>
                    <span className={`font-semibold ${isUrgent ? 'text-[#FF7A18]' : 'text-[#22C55E]'}`}>
                      {isUrgent ? (isBn ? 'এক্সপ্রেস ডেলিভারি ⚡' : 'Express (Fast) ⚡') : (isBn ? 'স্ট্যান্ডার্ড' : 'Standard')}
                    </span>
                  </div>
                </div>

                {/* Price Display with 30% Discount Badge */}
                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#22C55E]/15 border border-[#22C55E]/30 text-[#22C55E] text-[11px] font-bold">
                    <Sparkles className="w-3.5 h-3.5 text-[#22C55E]" />
                    <span className={isBn ? 'font-bn' : ''}>
                      {isBn ? '🔥 ৩০% বিশেষ ছাড় প্রযোজ্য হয়েছে!' : '🔥 30% Special Discount Applied!'}
                    </span>
                  </div>

                  <div className={`text-xs text-[#A9A39A] font-semibold tracking-wide ${isBn ? 'font-bn' : ''}`}>
                    {isBn ? 'ডিসকাউন্টেড বাজেট (বর্তমান অফার মূল্য):' : 'Offer Budget (After 30% Discount):'}
                  </div>

                  <div className="flex items-baseline justify-center gap-3">
                    <div className="text-4xl sm:text-5xl font-black text-[#FAF6F0] tracking-tight font-sans">
                      {currency === 'BDT' ? `৳${calculatedPrice.toLocaleString()}` : `$${calculatedPrice.toLocaleString()}`}
                    </div>
                    <div className="text-lg sm:text-xl font-semibold text-[#8E877D] line-through font-sans">
                      {currency === 'BDT' ? `৳${originalPrice.toLocaleString()}` : `$${originalPrice.toLocaleString()}`}
                    </div>
                  </div>

                  <div className={`text-xs font-semibold text-[#22C55E] ${isBn ? 'font-bn' : ''}`}>
                    {isBn 
                      ? `🎉 আপনার মোট সাশ্রয় হচ্ছে: ${currency === 'BDT' ? '৳' : '$'}${savingsAmount.toLocaleString()}`
                      : `🎉 You Save: ${currency === 'BDT' ? '৳' : '$'}${savingsAmount.toLocaleString()} (Flat 30% OFF)`}
                  </div>
                </div>

                {/* Timeline Box */}
                <div className="py-3 px-4 rounded-2xl bg-[#15100C] border border-white/10 flex items-center justify-between text-xs font-semibold">
                  <div className="flex items-center gap-2 text-[#A9A39A]">
                    <Clock className="w-4 h-4 text-[#FF7A18]" />
                    <span className={isBn ? 'font-bn' : ''}>{isBn ? 'কয় দিন লাগবে (সময়সীমা):' : 'Estimated Turnaround:'}</span>
                  </div>
                  <span className={`text-[#FAF6F0] font-bold text-sm px-2.5 py-0.5 rounded-lg bg-[#20150E] border border-[#FF7A18]/30 ${isBn ? 'font-bn' : ''}`}>
                    {isBn ? `${calculatedDays} দিন` : `${calculatedDays} Business Day(s)`}
                  </span>
                </div>

                {/* Direct WhatsApp Call to Action with 30% discount mention */}
                <a
                  href={`https://wa.me/${cleanPhone}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-fiery-orange w-full py-4 px-6 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#FF7A18]/30 uppercase tracking-wider"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span className={isBn ? 'font-bn' : ''}>
                    {isBn ? '🔥 ৩০% ছাড়ে হোয়াটসঅ্যাপে শুরু করুন' : '🔥 Claim 30% Off on WhatsApp'}
                  </span>
                </a>

                <p className={`text-[11px] text-[#A9A39A] leading-relaxed ${isBn ? 'font-bn' : ''}`}>
                  {isBn 
                    ? '💡 নোটিশ: জটিলতা ও কাস্টম রিকোয়ারমেন্টের উপর ভিত্তি করে চূড়ান্ত বাজেট আলোচনা সাপেক্ষে পরিবর্তন হতে পারে।'
                    : '💡 Note: Final budget can be tailored based on detailed project requirements and revisions.'}
                </p>

              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
