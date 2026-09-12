import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, Variants } from 'motion/react';
import { Cpu, Image, PenTool, Smartphone, Layout, Layers, Palette, Youtube, GraduationCap, Sparkles } from 'lucide-react';
import { SkillItem } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { UI_TRANSLATIONS } from '../data/translations';

interface SkillsProps {
  skills: SkillItem[];
}

const ICON_MAP: Record<string, React.ElementType> = {
  Image,
  PenTool,
  Smartphone,
  Layout,
  Layers,
  Palette,
  Youtube,
  GraduationCap
};

// Framer Motion Variants for Skills Section Header
const headerVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Framer Motion Variants for Category Tabs
const tabsVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.15,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Framer Motion Variants for Individual Skill Cards
const skillCardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 35,
    scale: 0.95,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      delay: (i % 4) * 0.08,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

// Subtle count-up animation for skill percentage triggered when card scrolls into view
const AnimatedProficiency: React.FC<{ target: number }> = ({ target }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px 0px' });

  useEffect(() => {
    if (!isInView) return;

    const duration = 1200; // 1.2s matching the ring stroke duration
    const startTime = performance.now();

    const updateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Smooth cubic-out easing curve
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.round(easeProgress * target);
      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    const animFrame = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(animFrame);
  }, [isInView, target]);

  return <span ref={ref}>{count}%</span>;
};

// Single Skill Card with scroll entrance & animated circle progress
const SkillCard: React.FC<{ skill: SkillItem; index: number }> = ({ skill, index }) => {
  const IconComponent = ICON_MAP[skill.iconName] || Cpu;
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (skill.proficiency / 100) * circumference;

  return (
    <motion.div
      variants={skillCardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px 0px' }}
      custom={index}
      className="p-6 rounded-3xl border border-[#FF7A18]/25 flex flex-col items-center text-center group shadow-xl relative overflow-hidden bg-[#16100B] hover:border-[#FF7A18]/50 transition-all duration-300"
    >
      {/* Circular Progress Ring with Center Icon */}
      <div className="relative w-28 h-28 my-2 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background Circle Track */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            className="text-[#120D09] stroke-current"
            strokeWidth="8"
            fill="transparent"
          />
          {/* Animated Circular Progress Stroke */}
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            className="text-[#FF7A18] stroke-current"
            strokeWidth="8"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset }}
            viewport={{ once: true, margin: '-40px 0px' }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: (index % 4) * 0.08 + 0.1 }}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        {/* Center Icon & Glow Container */}
        <div className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-[#0E0A07] border border-[#FF7A18]/30 flex items-center justify-center text-[#FF7A18] shadow-md group-hover:scale-110 group-hover:border-[#FF7A18]/60 transition-all duration-300">
          {skill.iconName && skill.iconName.startsWith('http') ? (
            <img 
              src={skill.iconName} 
              alt={skill.name} 
              className="w-8 h-8 object-contain rounded-md" 
              referrerPolicy="no-referrer"
            />
          ) : (
            <IconComponent className="w-8 h-8 text-[#FF7A18]" />
          )}
        </div>

        {/* Floating Percentage Badge with Animated Counter */}
        <span className="absolute -bottom-1 px-2.5 py-0.5 rounded-full bg-[#1D140D] border border-[#FF7A18]/40 text-[#FF7A18] font-mono font-bold text-[11px] shadow-md backdrop-blur-md">
          <AnimatedProficiency target={skill.proficiency} />
        </span>
      </div>

      {/* Skill Name */}
      <h3 className="text-lg font-bold text-[#FAF6F0] mt-3 mb-1 group-hover:text-[#FF7A18] transition-colors">
        {skill.name}
      </h3>

      {/* Skill Description */}
      <p className="text-xs text-[#A9A39A] leading-relaxed font-normal mb-4 line-clamp-2">
        {skill.description}
      </p>

      {/* Skill Tags */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 mt-auto">
        {(skill.tags || []).map((tag, idx) => (
          <span
            key={idx}
            className="text-[10px] font-semibold text-[#A9A39A] bg-[#120D09] px-2 py-0.5 rounded-md border border-[#FF7A18]/15"
          >
            #{tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export const Skills: React.FC<SkillsProps> = ({ skills }) => {
  const { language } = useLanguage();
  const t = UI_TRANSLATIONS[language];
  const [activeCategory, setActiveCategory] = useState<'all' | 'design' | 'development' | 'content'>('all');

  const filteredSkills = skills.filter((skill) => {
    if (activeCategory === 'all') return true;
    return skill.category === activeCategory;
  });

  return (
    <section id="skills" className="py-14 sm:py-24 px-3.5 sm:px-6 lg:px-8 relative bg-[#0E0A07] border-t border-b border-[#FF7A18]/20">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header with Scroll Entrance Trigger */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px 0px' }}
          className="text-center max-w-3xl mx-auto mb-8 sm:mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1D140D] border border-[#FF7A18]/30 text-xs text-[#FF7A18] font-bold uppercase tracking-wider mb-3 sm:mb-4 shadow-sm">
            <Cpu className="w-3.5 h-3.5 text-[#FF7A18]" />
            <span>{t.skills.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-5xl font-extrabold text-[#FAF6F0] tracking-tight mb-3 sm:mb-4">
            <span>{t.skills.title}</span>
          </h2>
          <p className="text-[#A9A39A] text-xs sm:text-base font-normal max-w-xl mx-auto">
            {t.skills.subtitle}
          </p>
          <div className="w-16 sm:w-20 h-1 bg-[#FF7A18] mx-auto rounded-full mt-3 sm:mt-4" />
        </motion.div>

        {/* Category Filter Tabs with Staggered Scroll Entrance */}
        <motion.div
          variants={tabsVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px 0px' }}
          className="flex sm:flex-wrap justify-start sm:justify-center gap-2 sm:gap-2.5 mb-8 sm:mb-12 overflow-x-auto no-scrollbar pb-2 px-1 max-w-full"
        >
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs font-bold transition-all duration-300 shrink-0 whitespace-nowrap cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-gradient-to-r from-[#FF7A18] to-[#E8590C] text-white shadow-md scale-105'
                : 'bg-[#16100B] text-[#A9A39A] hover:text-[#FAF6F0] border border-[#FF7A18]/20 hover:border-[#FF7A18]/40'
            }`}
          >
            {language === 'bn' ? `সব দক্ষতা (${skills.length})` : `All Skills (${skills.length})`}
          </button>
          <button
            onClick={() => setActiveCategory('design')}
            className={`px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs font-bold transition-all duration-300 shrink-0 whitespace-nowrap cursor-pointer ${
              activeCategory === 'design'
                ? 'bg-gradient-to-r from-[#FF7A18] to-[#E8590C] text-white shadow-md scale-105'
                : 'bg-[#16100B] text-[#A9A39A] hover:text-[#FAF6F0] border border-[#FF7A18]/20 hover:border-[#FF7A18]/40'
            }`}
          >
            🎨 {language === 'bn' ? 'ডিজাইন (Design)' : 'Design'}
          </button>
          <button
            onClick={() => setActiveCategory('development')}
            className={`px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs font-bold transition-all duration-300 shrink-0 whitespace-nowrap cursor-pointer ${
              activeCategory === 'development'
                ? 'bg-gradient-to-r from-[#FF7A18] to-[#E8590C] text-white shadow-md scale-105'
                : 'bg-[#16100B] text-[#A9A39A] hover:text-[#FAF6F0] border border-[#FF7A18]/20 hover:border-[#FF7A18]/40'
            }`}
          >
            💻 {language === 'bn' ? 'ডেভেলপমেন্ট (Development)' : 'Development'}
          </button>
          <button
            onClick={() => setActiveCategory('content')}
            className={`px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs font-bold transition-all duration-300 shrink-0 whitespace-nowrap cursor-pointer ${
              activeCategory === 'content'
                ? 'bg-gradient-to-r from-[#FF7A18] to-[#E8590C] text-white shadow-md scale-105'
                : 'bg-[#16100B] text-[#A9A39A] hover:text-[#FAF6F0] border border-[#FF7A18]/20 hover:border-[#FF7A18]/40'
            }`}
          >
            📝 {language === 'bn' ? 'কন্টেন্ট ক্রিয়েশন (Content)' : 'Content Creation'}
          </button>
        </motion.div>

        {/* Skills Cards Grid with Scroll-Triggered Entrance Animations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {filteredSkills.map((skill, index) => (
            <SkillCard key={skill.id} skill={skill} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};


