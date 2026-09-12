import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Sliders, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface BeforeAfterItem {
  id: string;
  titleBn: string;
  titleEn: string;
  categoryBn: string;
  categoryEn: string;
  descriptionBn: string;
  descriptionEn: string;
  beforeImage: string;
  afterImage: string;
  beforeLabelBn: string;
  beforeLabelEn: string;
  afterLabelBn: string;
  afterLabelEn: string;
  statBadgeBn: string;
  statBadgeEn: string;
}

const COMPARISONS: BeforeAfterItem[] = [
  {
    id: 'yt-viral-thumb',
    titleBn: 'নাটক ও ইউটিউব ভাইরাল থাম্বনেইল ম্যানিপুলেশন',
    titleEn: 'Viral Drama & YouTube Thumbnail Manipulation',
    categoryBn: 'ফটো রিটাচ ও কালার গ্রেডিং',
    categoryEn: 'Photo Retouching & Color Grading',
    descriptionBn: 'সাধারণ কাঁচা ছবি থেকে অ্যাডভান্সড লাইটিং, হাইপার-রিয়েলিস্টিক স্কিন রিটাচিং এবং হাই-কন্ট্রাস্ট ভিজ্যুয়াল আর্টের মাধ্যমে ড্রামাটিক ও হাই-সিটিআর থাম্বনেইল তৈরি।',
    descriptionEn: 'Transforming raw low-contrast photos with high-impact color grading, intense rim lighting, and viral composition.',
    beforeImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1000&auto=format&fit=crop&q=70',
    afterImage: 'https://i.postimg.cc/mDskk6Fk/3.png',
    beforeLabelBn: 'কাঁচা ছবি (RAW Photo)',
    beforeLabelEn: 'RAW Unedited Image',
    afterLabelBn: 'ফাইনাল আর্টওয়ার্ক (Masum 9T9)',
    afterLabelEn: 'Final Visual (Masum 9T9)',
    statBadgeBn: '+৪৫% CTR বৃদ্ধি',
    statBadgeEn: '+45% CTR Growth'
  },
  {
    id: 'poster-cinematic',
    titleBn: 'সিনেমাটিক মুভি ও মিউজিক পোস্টার কনসেপ্ট',
    titleEn: 'Cinematic Movie & Music Poster Concept',
    categoryBn: 'কম্পোজিটিং ও ড্রামাটিক ব্যাকগ্রাউন্ড',
    categoryEn: 'Compositing & Lighting',
    descriptionBn: 'মাল্টিপল স্টক ইমেজ ব্লেঞ্চিং, ব্যাকগ্রাউন্ড রিপ্লেসমেন্ট এবং সিনেমাটিক গ্লো এফেক্ট দিয়ে পোস্টার ডিজাইনিং।',
    descriptionEn: 'Expert subject isolation, atmospheric depth, custom shadows, and dramatic rim light creation.',
    beforeImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1000&auto=format&fit=crop&q=70',
    afterImage: 'https://i.postimg.cc/y8X6P13T/4.png',
    beforeLabelBn: 'স্টুডিও শট (Studio Shot)',
    beforeLabelEn: 'Studio Shot',
    afterLabelBn: 'সিনেমাটিক পোস্টার (Final Poster)',
    afterLabelEn: 'Cinematic Poster',
    statBadgeBn: '১০০% ইউনিক ব্র্যান্ডিং',
    statBadgeEn: '100% Unique Branding'
  }
];

export const BeforeAfterShowcase: React.FC = () => {
  const { language } = useLanguage();
  const isBn = language === 'bn';
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeItem = COMPARISONS[selectedIdx];

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <div className="w-full relative py-8 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#18120C] border border-[#FF7A18]/30 text-[#FF7A18] text-xs font-bold uppercase tracking-wider">
              <Sliders className="w-3.5 h-3.5 text-[#FF7A18]" />
              <span>{isBn ? 'ইন্টারেক্টিভ বিফোর ও আফটার স্লাইডার' : 'Interactive Before vs After'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#FAF6F0] tracking-tight">
              {isBn ? 'সাধারণ ছবিকে অসাধারণ ভিজ্যুয়ালে রূপান্তর' : 'Transforming Raw Assets into Iconic Visuals'}
            </h2>
            <p className="text-xs sm:text-sm text-[#A9A39A] max-w-xl">
              {isBn 
                ? 'স্লাইডারটি ডানে-বামে টেনে সরাসরি কাঁচা ছবি ও ফাইনাল কালার গ্রেডেড আর্টওয়ার্কের পার্থক্য দেখুন।'
                : 'Drag the slider horizontally to compare raw unprocessed footage with Masum 9T9’s final high-impact render.'}
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center gap-2 bg-[#18120C] p-1.5 rounded-2xl border border-[#FF7A18]/25 self-start md:self-auto">
            {COMPARISONS.map((comp, idx) => (
              <button
                key={comp.id}
                onClick={() => {
                  setSelectedIdx(idx);
                  setSliderPosition(50);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedIdx === idx
                    ? 'bg-[#FF7A18] text-white shadow-[0_0_15px_rgba(255,122,24,0.4)]'
                    : 'text-[#A9A39A] hover:text-[#FAF6F0]'
                }`}
              >
                {isBn ? (idx === 0 ? 'থাম্বনেইল রিটাচ' : 'সিনেমাটিক পোস্টার') : (idx === 0 ? 'Thumbnail Retouch' : 'Poster Art')}
              </button>
            ))}
          </div>
        </div>

        {/* The Interactive Before / After Split Slider Card */}
        <div className="relative rounded-3xl overflow-hidden border border-[#FF7A18]/30 bg-[#15100C] shadow-2xl shadow-black/80">
          
          <div
            ref={containerRef}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className="relative w-full h-[320px] sm:h-[460px] md:h-[540px] cursor-ew-resize overflow-hidden"
          >
            {/* After Image (Full Background) */}
            <img
              src={activeItem.afterImage}
              alt={activeItem.titleEn}
              className="absolute inset-0 w-full h-full object-cover object-center"
              draggable={false}
            />

            {/* Before Image (Clipped with ClipPath) */}
            <div
              className="absolute inset-0 w-full h-full overflow-hidden"
              style={{
                clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`
              }}
            >
              <img
                src={activeItem.beforeImage}
                alt="Before"
                className="absolute inset-0 w-full h-full object-cover object-center grayscale contrast-75 brightness-90"
                draggable={false}
              />

              {/* Before Floating Label Badge */}
              <div className="absolute top-4 left-4 z-20 px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                <span>{isBn ? activeItem.beforeLabelBn : activeItem.beforeLabelEn}</span>
              </div>
            </div>

            {/* After Floating Label Badge */}
            <div className="absolute top-4 right-4 z-20 px-3.5 py-1.5 rounded-full bg-[#FF7A18]/90 backdrop-blur-md border border-white/30 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-green-400" />
              <span>{isBn ? activeItem.afterLabelBn : activeItem.afterLabelEn}</span>
            </div>

            {/* Growth Stat Badge */}
            <div className="absolute bottom-4 right-4 z-20 px-3.5 py-2 rounded-2xl bg-black/85 backdrop-blur-xl border border-[#FF7A18]/40 text-[#FF7A18] text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-2xl">
              <Sparkles className="w-4 h-4 text-[#FF7A18]" />
              <span>{isBn ? activeItem.statBadgeBn : activeItem.statBadgeEn}</span>
            </div>

            {/* Draggable Divider Line */}
            <div
              className="absolute top-0 bottom-0 z-30 w-1 bg-white shadow-[0_0_15px_rgba(255,122,24,0.9)]"
              style={{ left: `${sliderPosition}%` }}
            >
              {/* Central Drag Button Handle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#FF7A18] border-2 border-white text-white flex items-center justify-center shadow-[0_0_20px_rgba(255,122,24,0.8)] cursor-ew-resize hover:scale-110 active:scale-95 transition-transform">
                <div className="flex items-center gap-0.5 font-bold text-xs">
                  <span>◀</span>
                  <span>▶</span>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Info Bar inside Card */}
          <div className="p-4 sm:p-6 bg-[#18120C] border-t border-[#FF7A18]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="text-[#FF7A18] text-xs font-bold uppercase tracking-wider">
                {isBn ? activeItem.categoryBn : activeItem.categoryEn}
              </div>
              <div className="text-base sm:text-lg font-bold text-[#FAF6F0] mt-0.5">
                {isBn ? activeItem.titleBn : activeItem.titleEn}
              </div>
            </div>

            <div className="text-xs text-[#A9A39A] font-medium flex items-center gap-1.5">
              <span>{isBn ? '💡 ড্র্যাগ করে রিয়েল ডিফারেন্স দেখুন' : '💡 Slide across to reveal full retouching details'}</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
