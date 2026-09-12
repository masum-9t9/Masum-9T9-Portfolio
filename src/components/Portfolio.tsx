import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'motion/react';
import { FolderKanban, ExternalLink, Eye, Github, Info, Trophy, Layers, Code2, Sparkles, CheckCircle2, Copy, Check, Link2, User, LayoutGrid, GalleryHorizontalEnd, Wrench, Calendar, ShieldCheck } from 'lucide-react';
import { PortfolioItem } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { UI_TRANSLATIONS } from '../data/translations';
import { copyToClipboard, getProjectShareUrl } from '../utils/clipboard';
import { ProjectCardSkeleton } from './Skeleton';
import { ProjectCarouselShowcase } from './ProjectCarouselShowcase';
import { ProjectImage } from './ProjectImage';

interface PortfolioProps {
  items: PortfolioItem[];
  onSelectProject: (item: PortfolioItem) => void;
  onOpenCreatorProfile?: () => void;
  isLoading?: boolean;
}

interface TiltCardProps {
  item: PortfolioItem;
  index: number;
  onSelectProject: (item: PortfolioItem) => void;
  onOpenCreatorProfile?: () => void;
}

const cardContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const cardItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 36,
    scale: 0.96,
  },
  visible: (customIndex: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      delay: (customIndex % 3) * 0.1,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const TiltCard: React.FC<TiltCardProps> = ({ item, index, onSelectProject, onOpenCreatorProfile }) => {
  const { language } = useLanguage();
  const t = UI_TRANSLATIONS[language];
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyLink = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = getProjectShareUrl(item.id, item.liveUrl);
    const success = await copyToClipboard(url);
    if (success) {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Disable heavy 3D calculations on touch/mobile screens to guarantee 60 FPS
    if (window.innerWidth < 768 || ('ontouchstart' in window && window.innerWidth < 1024)) return;
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const rY = ((mouseX - width / 2) / (width / 2)) * 12; // max 12deg tilt
    const rX = -((mouseY - height / 2) / (height / 2)) * 12;

    setRotateX(rX);
    setRotateY(rY);

    const glareX = (mouseX / width) * 100;
    const glareY = (mouseY / height) * 100;
    setGlarePos({ x: glareX, y: glareY, opacity: 0.2 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <motion.div
      variants={cardItemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px 0px' }}
      custom={index}
      className="perspective-1000 group will-change-transform h-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: rotateX || rotateY
            ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1)`
            : isHovered
            ? 'scale3d(1.02, 1.02, 1)'
            : 'none',
          transition: isHovered
            ? 'transform 0.1s ease-out, box-shadow 0.25s ease-out'
            : 'transform 0.4s ease-out, box-shadow 0.4s ease-out',
        }}
        onClick={() => onSelectProject(item)}
        className={`relative h-full rounded-3xl bg-[#16100B] border border-[#FF7A18]/25 overflow-hidden flex flex-col justify-between transition-all duration-300 cursor-pointer ${
          isHovered
            ? 'shadow-[0_16px_36px_rgba(255,122,24,0.15)] border-[#FF7A18]/50 -translate-y-1.5'
            : 'shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
        }`}
      >
        {/* Dynamic Glare & Gentle Glow Effect */}
        {glarePos.opacity > 0 && (
          <div
            className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-200"
            style={{
              background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 122, 24, ${glarePos.opacity}), transparent 60%)`,
            }}
          />
        )}

        {/* Card Header Image Container - Enforces 16:9 ratio via dynamic-aspect-ratio */}
        <div className="relative group/img">
          <ProjectImage
            src={item.imageUrl}
            alt={item.title}
            aspectRatioClass="dynamic-aspect-ratio"
            className="relative z-10 w-full h-full object-cover object-center transform group-hover/img:scale-[1.04] transition-transform duration-500 ease-out drop-shadow-2xl"
          />

          {/* Category Badge Top-Left Overlay */}
          <div className="absolute top-3 left-3 z-20 px-3 py-1 rounded-full bg-[#0E0A07]/85 backdrop-blur-md border border-[#FF7A18]/30 text-[11px] font-extrabold text-[#FF7A18] pointer-events-none shadow-md uppercase tracking-wider">
            {item.categoryLabel}
          </div>

          {/* Top-Right Badge */}
          <div className="absolute top-3 right-3 z-20 px-2.5 py-1 rounded-lg bg-[#FF7A18] text-white text-[10px] font-extrabold shadow-lg pointer-events-none flex items-center gap-1 uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-white" />
            <span>{item.achievement || item.designVersion || (language === 'bn' ? 'প্রিমিয়াম' : 'Featured')}</span>
          </div>

              {/* Hover View Overlay */}
              <div
                className={`absolute inset-0 bg-[#0E0A07]/80 backdrop-blur-[3px] transition-all duration-300 flex items-center justify-center p-4 z-20 ${
                  isHovered ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
              >
                <div className="flex items-center gap-2 transform translate-y-2 group-hover/img:translate-y-0 transition-transform duration-300">
                  {item.liveUrl ? (
                    <a
                      href={item.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ios-btn-primary px-4 py-2 text-xs font-bold flex items-center gap-1.5 uppercase tracking-wider"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>{t.portfolio.livePreview}</span>
                    </a>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProject(item);
                      }}
                      className="ios-btn-primary px-4 py-2 text-xs font-bold flex items-center gap-1.5 uppercase tracking-wider"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{t.portfolio.viewDetails}</span>
                    </button>
                  )}

                  <button
                    onClick={handleCopyLink}
                    className={`ios-icon-btn p-2.5 !rounded-xl ${
                      isCopied
                        ? '!border-[#FF7A18] !text-[#FF7A18]'
                        : ''
                    }`}
                    title={isCopied ? (language === 'bn' ? 'কপি হয়েছে!' : 'Copied!') : (language === 'bn' ? 'লিংক কপি করুন' : 'Copy Link')}
                  >
                    {isCopied ? (
                      <Check className="w-4 h-4 text-[#FF7A18]" />
                    ) : (
                      <Copy className="w-4 h-4 text-[#A9A39A]" />
                    )}
                  </button>
                </div>
              </div>
            </div>

        {/* Card Body Details */}
        <div className="p-5 sm:p-6 flex flex-col justify-between flex-grow">
          <div className="flex flex-col flex-grow">
            {/* Title - Fixed height alignment for 2 lines */}
            <h3 className="text-base sm:text-lg font-bold text-[#FAF6F0] group-hover:text-[#FF7A18] transition-colors leading-snug mb-2 min-h-[2.75rem] flex items-center">
              {item.title}
            </h3>

            {/* Subtitle / Enrolled Meta */}
            <div className="flex items-center gap-2 text-xs text-[#A9A39A] font-medium mb-2">
              <User className="w-3.5 h-3.5 text-[#FF7A18] shrink-0" />
              <span>{item.viewsCount || '350+'} {language === 'bn' ? 'জন ভিউয়ার' : 'Views'} • {item.clientName || item.designerName || 'Masum 9T9'}</span>
            </div>

            {/* Description */}
            <p className="text-xs text-[#A9A39A] leading-relaxed font-normal mb-3 line-clamp-2 min-h-[2.25rem]">
              🚀 {item.description}
            </p>

            {/* Compact Project Metadata Section */}
            <div className="mb-3.5 p-2.5 rounded-xl bg-[#120D09] border border-[#FF7A18]/20 backdrop-blur-md flex flex-col gap-2 text-[11px]">
              {/* Row 1: Tools & Software Glass Chips */}
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-1.5 text-[#A9A39A] font-semibold text-[10px]">
                  <Wrench className="w-3 h-3 text-[#FF7A18] shrink-0" />
                  <span>{language === 'bn' ? 'সফটওয়্যার:' : 'Tools:'}</span>
                </div>
                <div className="flex items-center gap-1 flex-wrap">
                  {(item.technologies && item.technologies.length > 0 ? item.technologies : ['Pixellab', 'Photoshop']).slice(0, 3).map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded-md bg-[#FF7A18]/15 border border-[#FF7A18]/30 text-[10px] font-extrabold text-[#FF7A18] shadow-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Row 2: Completion Year & Client / Status */}
              <div className="flex items-center justify-between text-[10px] font-medium text-[#A9A39A] pt-1.5 border-t border-[#FF7A18]/15">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3 h-3 text-[#FF7A18] shrink-0" />
                  <span className="text-[#FAF6F0] font-semibold">{item.year || '২০২৫'}</span>
                  <span className="text-[#FF7A18] font-bold bg-[#FF7A18]/15 px-1.5 py-0.2 rounded border border-[#FF7A18]/30 ml-1">
                    {language === 'bn' ? 'কমপ্লিট' : 'Completed'}
                  </span>
                </div>
                <div className="flex items-center gap-1 font-semibold text-[#FAF6F0]">
                  <ShieldCheck className="w-3 h-3 text-[#FF7A18] shrink-0" />
                  <span className="truncate max-w-[110px]" title={item.clientName || 'Masum 9T9'}>
                    {item.clientName || 'Masum 9T9'}
                  </span>
                </div>
              </div>
            </div>

            {/* 2-Column Features Checklist */}
            <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-[#120D09] border border-[#FF7A18]/15 mb-4 mt-auto text-[11px] font-medium text-[#A9A39A]">
              <div className="flex items-center gap-1.5 truncate">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#FF7A18] shrink-0" />
                <span className="truncate">{language === 'bn' ? 'হাই-রেজ সোর্স ফাইল' : 'High-Res File'}</span>
              </div>
              <div className="flex items-center gap-1.5 truncate">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#FF7A18] shrink-0" />
                <span className="truncate">{language === 'bn' ? '১০০% অরিজিনাল আর্ট' : 'Custom Artwork'}</span>
              </div>
              <div className="flex items-center gap-1.5 truncate">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#FF7A18] shrink-0" />
                <span className="truncate">{language === 'bn' ? 'সোশ্যাল মিডিয়া রেডী' : 'Social Ready'}</span>
              </div>
              <div className="flex items-center gap-1.5 truncate">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#FF7A18] shrink-0" />
                <span className="truncate">{language === 'bn' ? 'অনডিম্যান্ড রিভিশন' : 'Full Support'}</span>
              </div>
            </div>
          </div>

          {/* Bottom Footer Bar */}
          <div className="pt-3.5 border-t border-[#FF7A18]/20 flex items-center justify-between gap-3 mt-auto">
            <div>
              <span className="text-[10px] text-[#A9A39A] block font-semibold">
                {language === 'bn' ? 'প্রজেক্ট ক্যাটাগরি' : 'Project Category'}
              </span>
              <span className="text-xs sm:text-sm font-black text-[#FAF6F0]">
                {item.categoryLabel || 'ডিজাইন'}
              </span>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelectProject(item);
              }}
              className="ios-btn-primary px-4 py-2 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
            >
              <span>{language === 'bn' ? 'ডিটেইলস দেখুন' : 'View Details'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const Portfolio: React.FC<PortfolioProps> = ({ items, onSelectProject, onOpenCreatorProfile, isLoading = false }) => {
  const { language } = useLanguage();
  const t = UI_TRANSLATIONS[language];
  const [activeTab, setActiveTab] = useState<string>('all');
  const [tabLoading, setTabLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');

  const categories = React.useMemo(() => {
    const defaultCats = [
      { id: 'all', label: t.portfolio.filterAll },
      { id: 'graphics', label: language === 'bn' ? 'গ্রাফিক্স ডিজাইন' : 'Graphics Design' },
      { id: 'ui_ux', label: language === 'bn' ? 'ইউআই/ইউএক্স ডিজাইন' : 'UI/UX Design' },
      { id: 'frontend', label: language === 'bn' ? 'ফ্রন্টএন্ড ডেভেলপমেন্ট' : 'Front End Development' },
      { id: 'natok_poster', label: t.portfolio.filterPoster },
      { id: 'natok_thumbnail', label: t.portfolio.filterYtThumbnail },
      { id: 'education', label: t.portfolio.filterEducation },
    ];
    
    const catMap = new Map<string, string>();
    defaultCats.forEach(c => catMap.set(c.id, c.label));

    items.forEach(item => {
      if (item.category && !catMap.has(item.category)) {
        catMap.set(item.category, item.categoryLabel || item.category);
      }
    });

    return Array.from(catMap.entries()).map(([id, label]) => ({ id, label }));
  }, [items, t, language]);

  const handleTabChange = (catId: string) => {
    if (catId === activeTab) return;
    setTabLoading(true);
    setActiveTab(catId);
    setTimeout(() => setTabLoading(false), 200);
  };

  const filteredItems = items.filter((item) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'graphics') {
      return item.category === 'graphics' || item.category === 'natok_poster' || item.category === 'natok_thumbnail' || item.category === 'education';
    }
    if (activeTab === 'ui_ux') {
      return item.category === 'ui_ux' || (item.categoryLabel || '').toLowerCase().includes('ui');
    }
    if (activeTab === 'frontend') {
      return item.category === 'frontend' || item.category === 'custom_theme' || (item.technologies || []).some(t => ['HTML5', 'React', 'TypeScript', 'Tailwind'].includes(t));
    }
    return item.category === activeTab;
  });

  const showSkeleton = isLoading || tabLoading;

  return (
    <section id="portfolio" className="py-16 sm:py-28 px-3.5 sm:px-6 lg:px-8 relative overflow-hidden bg-[#0E0A07] border-t border-b border-[#FF7A18]/20">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-[#FF7A18]/5 blur-[100px] sm:blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header & View Switcher */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 sm:mb-12"
        >
          <div className="text-center sm:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1D140D] border border-[#FF7A18]/30 text-xs text-[#FF7A18] font-extrabold uppercase tracking-widest mb-3 shadow-sm">
              <FolderKanban className="w-3.5 h-3.5 text-[#FF7A18]" />
              <span>{t.portfolio.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#FAF6F0] uppercase">
              <span className="bg-gradient-to-r from-[#FAF6F0] via-[#FF9238] to-[#FF7A18] bg-clip-text text-transparent">{t.portfolio.title}</span>
            </h2>
            <p className="text-[#A9A39A] text-xs sm:text-sm font-normal mt-1">
              {t.portfolio.subtitle}
            </p>
          </div>

          {/* View Mode Switcher Pills */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#16100B] border border-[#FF7A18]/30 shadow-lg">
            <button
              onClick={() => setViewMode('carousel')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all uppercase tracking-wider cursor-pointer ${
                viewMode === 'carousel'
                  ? 'bg-gradient-to-r from-[#FF7A18] to-[#E8590C] text-white font-black shadow-md'
                  : 'text-[#A9A39A] hover:text-[#FAF6F0]'
              }`}
            >
              <GalleryHorizontalEnd className="w-4 h-4" />
              <span>{language === 'bn' ? '৩ডি শোকেস' : '3D Showcase'}</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all uppercase tracking-wider cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-gradient-to-r from-[#FF7A18] to-[#E8590C] text-white font-black shadow-md'
                  : 'text-[#A9A39A] hover:text-[#FAF6F0]'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>{language === 'bn' ? 'গ্রিড ভিউ' : 'Grid View'}</span>
            </button>
          </div>
        </motion.div>

        {/* View Mode Render */}
        {viewMode === 'carousel' ? (
          <ProjectCarouselShowcase
            items={items}
            onSelectProject={onSelectProject}
            onOpenCreatorProfile={onOpenCreatorProfile}
          />
        ) : (
          <>
            {/* Filter Navigation Tabs */}
            <div className="flex justify-center mb-8 sm:mb-12">
              <div className="p-1.5 rounded-full bg-[#16100B] border border-[#FF7A18]/20 shadow-2xl inline-flex items-center gap-1 overflow-x-auto max-w-full no-scrollbar">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleTabChange(cat.id)}
                    className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-extrabold transition-all duration-300 shrink-0 whitespace-nowrap uppercase tracking-wider cursor-pointer ${
                      activeTab === cat.id
                        ? 'bg-gradient-to-r from-[#FF7A18] to-[#E8590C] text-white shadow-[0_0_18px_rgba(255,122,24,0.4)] scale-105'
                        : 'text-[#A9A39A] hover:text-[#FAF6F0] hover:bg-white/5'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Projects Grid with Skeleton loading support */}
            {showSkeleton ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
                {Array.from({ length: 6 }).map((_, i) => (
                  <ProjectCardSkeleton key={i} />
                ))}
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8 items-stretch"
                >
                  {filteredItems.map((item, index) => (
                    <TiltCard
                      key={item.id}
                      item={item}
                      index={index}
                      onSelectProject={onSelectProject}
                      onOpenCreatorProfile={onOpenCreatorProfile}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            )}
          </>
        )}
      </div>
    </section>
  );
};
