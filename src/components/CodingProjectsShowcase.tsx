import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Code2, ExternalLink, Github, Sparkles, CheckCircle2, Copy, Check, 
  User, Link2, ChevronLeft, ChevronRight, Eye, Globe, Star, Maximize2, ShieldCheck 
} from 'lucide-react';
import { FeaturedEcosystemItem, PortfolioItem } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { UI_TRANSLATIONS } from '../data/translations';
import { copyToClipboard, getProjectShareUrl } from '../utils/clipboard';
import { ProjectImage } from './ProjectImage';

interface CodingProjectsShowcaseProps {
  items: FeaturedEcosystemItem[];
  onSelectProject?: (item: PortfolioItem) => void;
  onOpenCreatorProfile?: () => void;
  title?: string;
  subtitle?: string;
}

export const CodingProjectsShowcase: React.FC<CodingProjectsShowcaseProps> = ({
  items,
  onSelectProject,
  onOpenCreatorProfile,
  title,
  subtitle,
}) => {
  const { language } = useLanguage();
  const t = UI_TRANSLATIONS[language];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<number>(1);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [isCopied, setIsCopied] = useState(false);

  if (!items || items.length === 0) return null;

  const currentProject = items[currentIndex];

  const githubLink = currentProject.githubUrl || 
    currentProject.links?.find(l => l.type === 'github' || l.label.toLowerCase().includes('github'))?.url || 
    'https://github.com/masum-9t9';

  const liveLink = currentProject.mainUrl || 
    currentProject.links?.find(l => l.type === 'web' || l.label.toLowerCase().includes('live'))?.url || 
    'https://9t9.pro.bd';

  const galleryImages = (currentProject.galleryImages && currentProject.galleryImages.length > 0)
    ? currentProject.galleryImages
    : [currentProject.imageUrl || "https://i.postimg.cc/rsFF9mFd/fbd8b403-9dba-42c1-a984-1293f50492cd.jpg"];

  useEffect(() => {
    setActiveImageIndex(0);
  }, [currentIndex]);

  useEffect(() => {
    if (galleryImages.length <= 1) return;

    const interval = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % galleryImages.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [galleryImages.length, currentIndex]);

  const activeImage = galleryImages[activeImageIndex] || galleryImages[0];

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleCopyLink = async () => {
    const url = getProjectShareUrl(currentProject.id, liveLink);
    const success = await copyToClipboard(url);
    if (success) {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    }
  };

  const handleOpenModal = () => {
    if (!onSelectProject) return;
    const portfolioModalItem: PortfolioItem = {
      id: currentProject.id,
      title: currentProject.title,
      category: 'custom_theme',
      categoryLabel: currentProject.category || currentProject.badge || 'Coding Project',
      imageUrl: activeImage,
      description: currentProject.description,
      longDescription: `${currentProject.description}\n\nKey Features:\n${(currentProject.keyFeatures || []).map(f => `• ${f}`).join('\n')}`,
      technologies: currentProject.techStack || currentProject.categoryBadges || ['React', 'TypeScript', 'Tailwind CSS'],
      liveUrl: liveLink,
      githubUrl: githubLink,
      completionProgress: currentProject.completionProgress || 100,
      designVersion: currentProject.designVersion || 'v1.0',
      designerName: currentProject.uiuxDesignerName || 'Masum 9T9',
    };
    onSelectProject(portfolioModalItem);
  };

  const defaultFeatures = [
    "Modern and responsive design across all devices",
    "Clean, modular, and optimized code architecture",
    "Smooth motion animations & fluid micro-interactions",
    "Fast loading performance with dynamic asset loading",
    "Interactive user interface with real-time feedback",
    "Cross browser compatible & WCAG AA accessible",
    "SEO friendly structure with OpenGraph metadata",
    "Integrated contact form and instant key mapping"
  ];

  const featuresList = (currentProject.keyFeatures && currentProject.keyFeatures.length >= 4)
    ? currentProject.keyFeatures
    : defaultFeatures;

  const techList = currentProject.techStack && currentProject.techStack.length > 0
    ? currentProject.techStack
    : ["HTML", "CSS", "JavaScript", "React", "TypeScript", "Tailwind CSS", "EmailJS", "AOS"];

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 30 : -30,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 30 : -30,
      opacity: 0,
      scale: 0.98,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1],
      },
    }),
  };

  return (
    <section id="coding-projects" className="py-8 sm:py-12 relative overflow-hidden">
      {/* Background Subtle Gradient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#C7A77D]/5 blur-[180px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10 space-y-6">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#C7A77D]/15 pb-5"
        >
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181511] border border-[#C7A77D]/30 text-[#DFC29A] text-xs font-bold uppercase tracking-wider">
              <Code2 className="w-3.5 h-3.5 text-[#C7A77D]" />
              <span>{language === 'bn' ? 'কোডিং প্রজেক্টস শোকেস' : 'CODING PROJECTS SHOWCASE'}</span>
            </div>
            
            <h2 className="text-2xl sm:text-4xl font-bold font-space text-[#F1E8DC] tracking-tight">
              <span className="text-gradient-champagne">
                {title || (language === 'bn' ? 'আমার সেরা কোডিং ও ওয়েল-ক্রাফটেড প্রজেক্টস' : 'Featured Coding Projects & Web Apps')}
              </span>
            </h2>
            
            <p className="text-xs sm:text-sm text-[#B8AA98] font-normal max-w-2xl leading-relaxed">
              {subtitle || (language === 'bn' 
                ? 'রিয়েক্ট, টাইপস্ক্রিপ্ট, টেইলউইন্ড সিএসএস ও নোড দিয়ে তৈরি আধুনিক ওয়েব অ্যাপ্লিকেশন এবং কাস্টম থিম।' 
                : 'Full-stack web applications, custom themes, and interactive web tools engineered with modern tech stacks.')}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right font-mono text-xs text-[#B8AA98] font-bold">
              <span className="text-[#DFC29A] font-bold text-base">{String(currentIndex + 1).padStart(2, '0')}</span> / {String(items.length).padStart(2, '0')}
            </div>
          </div>
        </motion.div>

        {/* Project Selector Tabs (Quick Switcher - shown only if multiple items exist) */}
        {items.length > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none snap-x -mx-1 px-1">
            {items.map((item, idx) => {
              const isSelected = idx === currentIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  className={`shrink-0 px-3.5 py-2 rounded-xl border text-xs font-bold transition-all flex items-center gap-2.5 snap-start cursor-pointer ${
                    isSelected
                      ? 'bg-[#181511] border-[#C7A77D] text-[#DFC29A] shadow-md scale-[1.02]'
                      : 'bg-[#12100D] border-[#C7A77D]/20 text-[#B8AA98] hover:text-[#F1E8DC] hover:border-[#C7A77D]/40'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-[#C7A77D]' : 'bg-[#181511]'}`} />
                  <span className="whitespace-nowrap">{item.title}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* MOBILE VIEW CARD LAYOUT */}
        <div className="sm:hidden">
          <motion.div
            key={currentProject.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-3xl bg-[#12100D] border border-[#C7A77D]/20 p-4 shadow-2xl flex flex-col justify-between space-y-4"
          >
            {/* Top Image Banner Container */}
            <div 
              onClick={handleOpenModal}
              className="relative aspect-video rounded-2xl overflow-hidden bg-[#0B0A08] border border-[#C7A77D]/20 cursor-pointer group/img"
            >
              <ProjectImage
                src={activeImage}
                alt={currentProject.title}
                aspectRatioClass="aspect-video"
                className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A08]/80 via-transparent to-transparent opacity-60" />

              {/* Category Badge Top-Left */}
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#0B0A08]/90 backdrop-blur-md border border-[#C7A77D]/30 text-[11px] font-bold text-[#DFC29A]">
                {language === 'bn' ? 'পোর্টফোলিও ওয়েবসাইট' : (currentProject.category || 'Portfolio Website')}
              </div>

              {/* Status Badge Top-Right */}
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#181511]/90 backdrop-blur-md border border-[#C7A77D]/30 text-[10px] font-bold text-[#DFC29A] flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#C7A77D]" />
                <span className="truncate max-w-[120px]">{currentProject.status || 'Production Ready'}</span>
              </div>

              {/* View Overlay Button */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity bg-[#0B0A08]/40 backdrop-blur-xs">
                <span className="px-4 py-2 rounded-full bg-[#C7A77D] text-[#0B0A08] font-bold text-xs flex items-center gap-1.5 shadow-xl">
                  <Eye className="w-4 h-4" />
                  <span>{t.portfolio.viewDetails}</span>
                </span>
              </div>
            </div>

            {/* Title & Description */}
            <div>
              <h3 
                onClick={handleOpenModal} 
                className="text-lg font-bold text-[#F1E8DC] mb-2 cursor-pointer hover:text-[#DFC29A] transition-colors leading-snug"
              >
                {currentProject.title}
              </h3>
              <p className="text-xs text-[#B8AA98] leading-relaxed font-normal mb-3">
                {currentProject.description}
              </p>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5">
                {techList.map((tech, tIdx) => (
                  <span key={tIdx} className="text-[10px] font-medium text-[#B8AA98] bg-[#0B0A08] border border-[#C7A77D]/20 px-2.5 py-1 rounded-lg">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Footer Bar */}
            <div className="pt-3 border-t border-[#C7A77D]/15 flex items-center justify-between">
              <span className="text-xs font-bold text-[#B8AA98]">
                {currentProject.developerName || currentProject.uiuxDesignerName || 'Masum 9T9'}
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-[#181511] hover:bg-[#211D17] text-[#DFC29A] hover:text-[#F1E8DC] border border-[#C7A77D]/30 text-xs font-bold transition-all flex items-center gap-1.5 shadow-md"
                >
                  <span>{language === 'bn' ? 'লাইভ দেখুন' : 'Live Demo'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={handleOpenModal}
                  className="p-2 rounded-xl bg-[#181511] text-[#B8AA98] hover:text-[#F1E8DC] transition-colors border border-[#C7A77D]/20 cursor-pointer"
                  title={t.portfolio.viewDetails}
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* DESKTOP MASTER CONTAINER */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="hidden sm:block relative rounded-[24px] sm:rounded-[32px] bg-[#12100D] border border-[#C7A77D]/25 p-4 sm:p-7 shadow-2xl backdrop-blur-2xl overflow-hidden group/master"
        >
          
          {/* Subtle Ambient Radial Wash */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C7A77D]/5 rounded-full blur-3xl pointer-events-none" />

          {/* Top Bar inside Master Container */}
          <div className="flex items-center justify-between pb-4 sm:pb-5 border-b border-[#C7A77D]/15 mb-5 sm:mb-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="px-3 py-1.5 rounded-xl bg-[#181511] border border-[#C7A77D]/30 text-[#DFC29A] text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm">
                <Code2 className="w-4 h-4 text-[#C7A77D]" />
                <span>Coding Project</span>
              </div>
            </div>

            {/* Top Right Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyLink}
                className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-[#181511] hover:bg-[#211D17] border border-[#C7A77D]/20 text-[#B8AA98] hover:text-[#F1E8DC] text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                title="Copy Share Link"
              >
                {isCopied ? <Check className="w-3.5 h-3.5 text-[#C7A77D]" /> : <Copy className="w-3.5 h-3.5 text-[#B8AA98]" />}
                <span className="hidden sm:inline">{isCopied ? 'Copied' : 'Share'}</span>
              </button>
              
              <button
                onClick={handleOpenModal}
                className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-[#C7A77D] hover:bg-[#DFC29A] border border-[#DFC29A] text-[#0B0A08] text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                title="Expand Full Preview"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Expand</span>
              </button>
            </div>
          </div>

          {/* Animated Project Content */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentProject.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="space-y-5 sm:space-y-6"
            >
              {/* TOP 3-COLUMN GRID */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-stretch">
                
                {/* COLUMN 1: CENTER SCREEN PREVIEW */}
                <div className="order-1 lg:order-2 lg:col-span-5 flex flex-col items-center justify-between p-3.5 sm:p-5 rounded-2xl bg-[#0B0A08] border border-[#C7A77D]/20 min-h-[220px] sm:min-h-[300px]">
                  
                  {/* Screen Preview Frame */}
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                    onClick={handleOpenModal}
                    className="w-full relative cursor-pointer group/screen"
                  >
                    {/* Screen Outer Display Frame */}
                    <div className="relative bg-[#12100D] border border-[#C7A77D]/25 rounded-t-xl sm:rounded-t-2xl p-2 pb-1.5 shadow-2xl">
                      
                      {/* Window Controls & URL Bar Header */}
                      <div className="h-6 bg-[#0B0A08] rounded-t-lg flex items-center justify-between px-2.5 mb-1.5 border-b border-[#C7A77D]/15">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                          <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                          <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                        </div>

                        <div className="font-mono text-[9px] text-[#B8AA98] bg-[#181511] px-2 py-0.5 rounded border border-[#C7A77D]/20 truncate max-w-[150px] sm:max-w-[180px] flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3 text-[#C7A77D] shrink-0" />
                          <span className="truncate">{liveLink}</span>
                        </div>

                        <span className="text-[9px] text-[#DFC29A] font-bold bg-[#181511] px-1.5 py-0.5 rounded border border-[#C7A77D]/20">
                          {activeImageIndex + 1}/{galleryImages.length}
                        </span>
                      </div>

                      {/* Main Image Screen */}
                      <div className="relative aspect-video rounded-lg overflow-hidden bg-[#0B0A08] border border-[#C7A77D]/15">
                        <AnimatePresence mode="wait">
                          <motion.img
                            key={activeImage}
                            initial={{ opacity: 0.3 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0.3 }}
                            transition={{ duration: 0.4 }}
                            src={activeImage}
                            alt={currentProject.title}
                            className="w-full h-full object-cover object-top brightness-95 group-hover/screen:brightness-105 transition-all"
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = "https://i.postimg.cc/rsFF9mFd/fbd8b403-9dba-42c1-a984-1293f50492cd.jpg";
                            }}
                          />
                        </AnimatePresence>

                        {/* Hover Overlay Button */}
                        <div className="absolute inset-0 bg-[#0B0A08]/40 opacity-0 group-hover/screen:opacity-100 transition-opacity flex items-center justify-center gap-2 z-20">
                          <span className="px-3.5 py-1.5 rounded-xl bg-[#C7A77D] text-[#0B0A08] font-bold text-xs flex items-center gap-1.5 shadow-xl">
                            <Eye className="w-3.5 h-3.5" /> Preview
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Display Chin Base */}
                    <div className="h-2.5 bg-[#181511] rounded-b-xl border-t border-[#C7A77D]/20 flex items-center justify-center shadow-lg">
                      <div className="w-12 h-1 bg-[#0B0A08] rounded-b" />
                    </div>
                  </motion.div>

                  {/* Gallery Pagination Dots */}
                  {galleryImages.length > 1 && (
                    <div className="flex items-center justify-center gap-2 pt-3">
                      {galleryImages.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImageIndex(idx)}
                          className={`h-2 rounded-full transition-all duration-300 ${
                            activeImageIndex === idx ? 'w-6 bg-[#C7A77D]' : 'w-2 bg-[#181511] hover:bg-[#C7A77D]/40'
                          }`}
                          title={`Image ${idx + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* COLUMN 2: LEFT INFO */}
                <div className="order-2 lg:order-1 lg:col-span-4 flex flex-col justify-between p-4 sm:p-6 rounded-2xl bg-[#0B0A08] border border-[#C7A77D]/20 space-y-4">
                  <div className="space-y-2.5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#DFC29A] block">
                      FEATURED PROJECT
                    </span>

                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#F1E8DC] tracking-tight leading-snug">
                      {currentProject.title}
                    </h3>

                    {currentProject.subtitle && (
                      <p className="text-xs sm:text-sm font-semibold text-[#DFC29A]">
                        {currentProject.subtitle}
                      </p>
                    )}

                    <div className="w-full h-[1px] bg-[#C7A77D]/15 my-2" />

                    <p className="text-xs text-[#B8AA98] leading-relaxed font-normal">
                      {currentProject.description}
                    </p>
                  </div>

                  {/* Category Tags */}
                  <div className="pt-2">
                    <div className="flex flex-wrap gap-1.5">
                      {(currentProject.categoryBadges || [currentProject.category || 'Web App']).map((badge, bIdx) => (
                        <span
                          key={bIdx}
                          className="px-2.5 py-1 rounded-lg bg-[#181511] border border-[#C7A77D]/20 text-[11px] font-medium text-[#F1E8DC] flex items-center gap-1"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C7A77D]" />
                          <span>{badge}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* COLUMN 3: RIGHT METADATA & TECH STACK */}
                <div className="order-3 lg:order-3 lg:col-span-3 flex flex-col justify-between p-4 sm:p-6 rounded-2xl bg-[#0B0A08] border border-[#C7A77D]/20 space-y-4">
                  <div className="space-y-3 text-xs">
                    {/* UI/UX Designer */}
                    <div className="flex items-center justify-between pb-2 border-b border-[#C7A77D]/15">
                      <span className="text-[#B8AA98] font-medium flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-[#C7A77D]" /> UI/UX Designer
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onOpenCreatorProfile) onOpenCreatorProfile();
                        }}
                        className="font-bold text-[#F1E8DC] hover:text-[#DFC29A] hover:underline transition-colors flex items-center gap-1 cursor-pointer group/btn"
                        title="View Creator Profile"
                      >
                        <span>{currentProject.uiuxDesignerName || 'Masum 9T9'}</span>
                        <ExternalLink className="w-3 h-3 text-[#C7A77D] opacity-70 group-hover/btn:opacity-100 transition-opacity" />
                      </button>
                    </div>

                    {/* Developer */}
                    <div className="flex items-center justify-between pb-2 border-b border-[#C7A77D]/15">
                      <span className="text-[#B8AA98] font-medium flex items-center gap-1.5">
                        <Code2 className="w-3.5 h-3.5 text-[#C7A77D]" /> Developer
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onOpenCreatorProfile) onOpenCreatorProfile();
                        }}
                        className="font-bold text-[#F1E8DC] hover:text-[#DFC29A] hover:underline transition-colors flex items-center gap-1 cursor-pointer group/btn"
                        title="View Creator Profile"
                      >
                        <span>{currentProject.developerName || 'Masum 9T9'}</span>
                        <ExternalLink className="w-3 h-3 text-[#C7A77D] opacity-70 group-hover/btn:opacity-100 transition-opacity" />
                      </button>
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="space-y-2 pt-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#B8AA98] block">
                      Tech Stack
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {techList.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 rounded-lg bg-[#181511] border border-[#C7A77D]/20 text-[11px] font-medium text-[#B8AA98] hover:border-[#C7A77D]/40 hover:text-[#F1E8DC] transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* BOTTOM ROW: KEY FEATURES & LINKS */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
                
                {/* KEY FEATURES */}
                <div className="lg:col-span-8 p-4 sm:p-6 rounded-2xl bg-[#0B0A08] border border-[#C7A77D]/20 space-y-3">
                  <div className="flex items-center gap-2 border-b border-[#C7A77D]/15 pb-2">
                    <Star className="w-4 h-4 text-[#C7A77D]" />
                    <h4 className="text-sm font-bold text-[#F1E8DC]">Key Features</h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    {featuresList.slice(0, 8).map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-[#B8AA98]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C7A77D] shrink-0 mt-0.5" />
                        <span className="leading-snug">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* LINKS */}
                <div className="lg:col-span-4 p-4 sm:p-6 rounded-2xl bg-[#0B0A08] border border-[#C7A77D]/20 flex flex-col justify-between space-y-3">
                  <div className="flex items-center gap-2 border-b border-[#C7A77D]/15 pb-2">
                    <Link2 className="w-4 h-4 text-[#C7A77D]" />
                    <h4 className="text-sm font-bold text-[#F1E8DC]">Links</h4>
                  </div>

                  <div className="space-y-2.5">
                    <a
                      href={liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 rounded-xl bg-[#C7A77D] hover:bg-[#DFC29A] text-[#0B0A08] font-bold text-xs flex items-center justify-between transition-all shadow-md group cursor-pointer"
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>

                    <a
                      href={githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 rounded-xl bg-[#181511] hover:bg-[#211D17] border border-[#C7A77D]/30 text-[#F1E8DC] font-bold text-xs flex items-center justify-between transition-all cursor-pointer"
                    >
                      <span>View Code</span>
                      <Github className="w-4 h-4 text-[#B8AA98]" />
                    </a>
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>

          {/* FOOTER NAVIGATION & PROGRESS BAR */}
          {items.length > 1 && (
            <div className="mt-5 pt-4 border-t border-[#C7A77D]/15 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-1 max-w-xs">
                <span className="font-mono text-xs font-bold text-[#DFC29A]">
                  {String(currentIndex + 1).padStart(2, '0')}
                </span>
                <div className="flex-1 h-1.5 bg-[#181511] rounded-full overflow-hidden">
                  <motion.div
                    animate={{ width: `${((currentIndex + 1) / items.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                    className="h-full bg-[#C7A77D] rounded-full"
                  />
                </div>
                <span className="font-mono text-xs font-bold text-[#B8AA98]">
                  {String(items.length).padStart(2, '0')}
                </span>
              </div>

              {/* Prev / Next Arrows */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#181511] hover:bg-[#C7A77D] hover:text-[#0B0A08] border border-[#C7A77D]/20 text-[#F1E8DC] flex items-center justify-center transition-all shadow-md cursor-pointer"
                  title="Previous Project"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#181511] hover:bg-[#C7A77D] hover:text-[#0B0A08] border border-[#C7A77D]/20 text-[#F1E8DC] flex items-center justify-center transition-all shadow-md cursor-pointer"
                  title="Next Project"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

        </motion.div>
      </div>
    </section>
  );
};
