import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'motion/react';
import { Palette, Code2, Search, Eye, Sparkles, Layers, CheckCircle2, ArrowUpRight, Layout, Wrench, Calendar, ShieldCheck, TrendingUp, Calculator } from 'lucide-react';
import { SEO } from '../components/SEO';
import { CodingProjectsShowcase } from '../components/CodingProjectsShowcase';
import { FramerButton } from '../components/FramerButton';
import { ScrollReveal } from '../components/ScrollReveal';
import { PortfolioConfig, PortfolioItem } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { UI_TRANSLATIONS } from '../data/translations';
import { ProjectCardSkeleton } from '../components/Skeleton';
import { ProjectImage } from '../components/ProjectImage';
import { ProjectCalculator } from '../components/ProjectCalculator';

interface ProjectsPageProps {
  config: PortfolioConfig;
  onSelectProject: (project: PortfolioItem) => void;
  onOpenCreatorProfile: () => void;
  initialFilter?: 'all' | 'ui_ux' | 'graphics' | 'frontend';
}

interface CategoryDef {
  id: 'all' | 'ui_ux' | 'graphics' | 'frontend';
  labelEn: string;
  labelBn: string;
  icon: React.FC<{ className?: string }>;
  types: { id: string; labelEn: string; labelBn: string }[];
}

const CATEGORY_DEFS: CategoryDef[] = [
  {
    id: 'all',
    labelEn: 'All Projects',
    labelBn: 'সব প্রজেক্ট',
    icon: Layers,
    types: [
      { id: 'all', labelEn: 'All Types', labelBn: 'সব ধরন' },
      { id: 'poster', labelEn: 'Posters', labelBn: 'পোস্টার' },
      { id: 'thumbnail', labelEn: 'Thumbnails', labelBn: 'থাম্বনেল' },
      { id: 'ui', labelEn: 'UI/UX Design', labelBn: 'ইউআই/ইউএক্স' },
      { id: 'web', labelEn: 'Web & Coding', labelBn: 'ওয়েব ও কোডিং' },
      { id: 'education', labelEn: 'Educational', labelBn: 'এডুকেশন' },
    ],
  },
  {
    id: 'graphics',
    labelEn: 'Graphics Design',
    labelBn: 'গ্রাফিক্স ডিজাইন',
    icon: Palette,
    types: [
      { id: 'all', labelEn: 'All Types', labelBn: 'সব ধরন' },
      { id: 'poster', labelEn: 'Poster Design', labelBn: 'পোস্টার ডিজাইন' },
      { id: 'social_media', labelEn: 'Social Media Design', labelBn: 'সোশ্যাল মিডিয়া ডিজাইন' },
      { id: 'yt_thumbnail', labelEn: 'YouTube Thumbnail Design', labelBn: 'ইউটিউব থাম্বনেল ডিজাইন' },
      { id: 'education', labelEn: 'Education Graphics', labelBn: 'এডুকেশন গ্রাফিক্স' },
      { id: 'branding', labelEn: 'Branding & Visual Identity', labelBn: 'ব্র্যান্ডিং ও ভিজ্যুয়াল আইডেন্টিটি' },
    ],
  },
  {
    id: 'ui_ux',
    labelEn: 'UI-UX Design',
    labelBn: 'ইউআই/ইউএক্স ডিজাইন',
    icon: Layout,
    types: [
      { id: 'all', labelEn: 'All Types', labelBn: 'সব ধরন' },
      { id: 'website_ui', labelEn: 'Website UI', labelBn: 'ওয়েবসাইট UI' },
      { id: 'mobile_app_ui', labelEn: 'Mobile App UI', labelBn: 'মোবাইল অ্যাপ UI' },
      { id: 'dashboard_ui', labelEn: 'Dashboard Design', labelBn: 'ড্যাশবোর্ড ডিজাইন' },
      { id: 'landing_page_ui', labelEn: 'Landing Page Design', labelBn: 'ল্যান্ডিং পেজ ডিজাইন' },
    ],
  },
  {
    id: 'frontend',
    labelEn: 'Front End Development',
    labelBn: 'ফ্রন্টএন্ড ডেভেলপমেন্ট',
    icon: Code2,
    types: [
      { id: 'all', labelEn: 'All Types', labelBn: 'সব ধরন' },
      { id: 'portfolio_web', labelEn: 'Portfolio Website', labelBn: 'পোর্টফোলিও ওয়েবসাইট' },
      { id: 'business_web', labelEn: 'Business Website', labelBn: 'বিজনেস ওয়েবসাইট' },
      { id: 'landing_page_web', labelEn: 'Landing Page', labelBn: 'ল্যান্ডিং পেজ' },
      { id: 'react_web_app', labelEn: 'React Web App', labelBn: 'রিয়েক্ট ওয়েব অ্যাপ' },
      { id: 'frontend_dev', labelEn: 'Frontend Development', labelBn: 'ফ্রন্টএন্ড ডেভেলপমেন্ট' },
    ],
  },
];

const projectCardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 35,
    scale: 0.96,
  },
  visible: (idx: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      delay: (idx % 3) * 0.1,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  config,
  onSelectProject,
  onOpenCreatorProfile,
  initialFilter = 'all',
}) => {
  const { language } = useLanguage();
  const t = UI_TRANSLATIONS[language];
  const isBn = language === 'bn';

  const [activeCategory, setActiveCategory] = useState<'all' | 'ui_ux' | 'graphics' | 'frontend'>(
    initialFilter || 'all'
  );
  const [activeType, setActiveType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  useEffect(() => {
    if (initialFilter) {
      setActiveCategory(initialFilter);
    }
  }, [initialFilter]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  const handleCategoryChange = (catId: 'all' | 'ui_ux' | 'graphics' | 'frontend') => {
    if (catId === activeCategory) return;
    setIsLoading(true);
    setActiveCategory(catId);
    setActiveType('all');
    setTimeout(() => setIsLoading(false), 150);
  };

  const handleTypeChange = (typeId: string) => {
    if (typeId === activeType) return;
    setIsLoading(true);
    setActiveType(typeId);
    setTimeout(() => setIsLoading(false), 150);
  };

  const designItems = useMemo(() => {
    return (config.portfolio && config.portfolio.length > 0)
      ? config.portfolio
      : ((config as any).portfolioItems && (config as any).portfolioItems.length > 0)
        ? (config as any).portfolioItems
        : [];
  }, [config.portfolio, (config as any).portfolioItems]);

  const ecosystemItems = useMemo(() => {
    return (config.featuredEcosystem && config.featuredEcosystem.length > 0)
      ? config.featuredEcosystem
      : ((config as any).ecosystemProjects && (config as any).ecosystemProjects.length > 0)
        ? (config as any).ecosystemProjects
        : [];
  }, [config.featuredEcosystem, (config as any).ecosystemProjects]);

  const currentCategoryDef = useMemo(() => {
    return CATEGORY_DEFS.find((c) => c.id === activeCategory) || CATEGORY_DEFS[0];
  }, [activeCategory]);

  const filteredDesignProjects = useMemo(() => {
    return designItems.filter((item) => {
      const cat = (item.category || '').toLowerCase();
      const catLabel = (item.categoryLabel || '').toLowerCase();

      let matchCategory = false;
      if (activeCategory === 'all') {
        matchCategory = true;
      } else if (activeCategory === 'ui_ux') {
        matchCategory =
          cat.includes('ui') ||
          cat.includes('ux') ||
          catLabel.includes('ui') ||
          catLabel.includes('ux') ||
          (item.technologies || []).some((t) => ['figma', 'ui', 'ux', 'adobe xd', 'prototyping'].some((k) => t.toLowerCase().includes(k))) ||
          item.title.toLowerCase().includes('ui') ||
          item.title.toLowerCase().includes('ux');
      } else if (activeCategory === 'graphics') {
        matchCategory =
          cat.includes('poster') ||
          cat.includes('thumbnail') ||
          cat.includes('natok') ||
          cat.includes('social') ||
          cat.includes('education') ||
          cat.includes('graphic') ||
          catLabel.includes('পোস্টার') ||
          catLabel.includes('থাম্বনেল') ||
          catLabel.includes('গ্রাফিক্স') ||
          catLabel.includes('ডিজাইন');
      } else if (activeCategory === 'frontend') {
        matchCategory =
          cat.includes('coding') ||
          cat.includes('web') ||
          cat.includes('custom_theme') ||
          cat.includes('frontend') ||
          catLabel.includes('কোডিং') ||
          catLabel.includes('ওয়েব') ||
          (item.technologies || []).some((t) =>
            ['react', 'typescript', 'tailwind', 'html', 'css', 'javascript', 'next'].some((k) => t.toLowerCase().includes(k))
          );
      }

      if (!matchCategory) return false;

      if (activeType !== 'all') {
        const itemType = (item.type || '').toLowerCase();
        const itemTags = (item.technologies || []).map((t) => t.toLowerCase());
        const itemCat = cat.toLowerCase();
        const itemTitle = item.title.toLowerCase();
        const targetType = activeType.toLowerCase();

        const matchType =
          itemType.includes(targetType) ||
          itemCat.includes(targetType) ||
          itemTags.some((t) => t.includes(targetType)) ||
          itemTitle.includes(targetType) ||
          (targetType === 'poster' && (itemCat.includes('poster') || itemTitle.includes('পোস্টার'))) ||
          (targetType === 'thumbnail' && (itemCat.includes('thumbnail') || itemTitle.includes('থাম্বনেল'))) ||
          (targetType === 'education' && (itemCat.includes('education') || itemTitle.includes('এডুকেশন'))) ||
          (targetType === 'ui' && (itemCat.includes('ui') || itemTitle.includes('ui') || itemTags.includes('figma'))) ||
          (targetType === 'web' && (itemCat.includes('web') || itemCat.includes('custom_theme') || itemTags.some((t) => ['react', 'tailwind', 'html5'].includes(t))));

        if (!matchType) return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchDesc = item.description?.toLowerCase().includes(q);
        const matchCat = item.categoryLabel?.toLowerCase().includes(q);
        const matchTech = item.technologies?.some((t) => t.toLowerCase().includes(q));
        return matchTitle || matchDesc || matchCat || matchTech;
      }

      return true;
    });
  }, [designItems, activeCategory, activeType, searchQuery]);

  const projectsSchemaGraph = [
    {
      '@type': 'CollectionPage',
      '@id': 'https://9t9.pro.bd/projects#page',
      url: 'https://9t9.pro.bd/projects',
      name: 'Portfolio Projects & Selected Works — Masum 9T9',
      description: 'Gallery of UI/UX Design, Photo Manipulation Posters, High-CTR YouTube Thumbnails, and Front-End Web Development projects by Masum 9T9.',
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: filteredDesignProjects.slice(0, 10).map((item, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: item.title,
          description: item.description,
          url: `https://9t9.pro.bd/projects?project=${item.id}`,
        })),
      },
    },
  ];

  return (
    <div className="pt-24 sm:pt-28 pb-16 px-3.5 sm:px-6 lg:px-8 bg-[#0E0A07] text-[#FAF6F0]">
      <SEO
        title="Projects & Showcase — Graphic Design, UI/UX & Web Apps | Masum 9T9"
        description="Browse selected graphic design posters, YouTube thumbnails, UI/UX prototypes, and full-stack React web projects created by Masum 9T9."
        canonicalUrl="https://9t9.pro.bd/projects"
        keywords="Masum 9T9 Projects, Graphic Design Portfolio, YouTube Thumbnail Portfolio, UI UX Case Studies, Web Development Showcase, 9t9.pro.bd projects"
        breadcrumbs={[
          { name: 'Home', item: 'https://9t9.pro.bd/' },
          { name: 'Projects', item: 'https://9t9.pro.bd/projects' },
        ]}
        customSchema={projectsSchemaGraph}
      />

      {/* Page Header */}
      <div className="max-w-7xl mx-auto text-center mb-8 sm:mb-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1D140D] border border-[#FF7A18]/30 text-xs sm:text-sm text-[#FF7A18] font-bold uppercase tracking-wider mb-3"
        >
          <Sparkles className="w-4 h-4 text-[#FF7A18]" />
          <span className={isBn ? 'font-bn' : ''}>{isBn ? 'প্রজেক্ট গ্যালারি' : 'PROJECT SHOWCASE'}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`text-3xl sm:text-6xl font-extrabold text-[#FAF6F0] tracking-tight mb-3 ${isBn ? 'font-bn' : ''}`}
        >
          <span>
            {isBn ? 'আমার ক্রিয়েটিভ ও ডিজিটাল কাজসমূহ' : 'Selected Works & Digital Creation'}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className={`text-[#A9A39A] text-xs sm:text-base max-w-xl mx-auto leading-relaxed mb-4 font-normal ${isBn ? 'font-bn' : ''}`}
        >
          {isBn
            ? 'ক্যাটাগরি ও ধরন অনুযায়ী ফিল্টার করে আমার সেরা ডিজাইন ও ডেভেলপমেন্ট প্রজেক্টগুলো দেখুন।'
            : 'Filter by category and type to explore my design portfolios and front-end coding projects.'}
        </motion.p>

        {/* High-Impact Eye-Catching Button: "Price আন্দাজ করুন / Estimate Project Cost" */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <button
            type="button"
            onClick={() => setIsCalculatorOpen(true)}
            className="group relative inline-flex items-center gap-2.5 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-[#FF7A18] to-[#E8590C] text-white font-bold text-xs sm:text-sm tracking-wide shadow-[0_4px_25px_rgba(255,122,24,0.45)] hover:shadow-[0_6px_32px_rgba(255,122,24,0.65)] hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer ring-2 ring-white/20"
          >
            {/* Glowing Accent */}
            <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-[#FF7A18] to-[#FF9E4A] opacity-75 blur-sm group-hover:opacity-100 transition duration-300 pointer-events-none" />
            
            <span className="relative z-10 w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-white">
              <Calculator className="w-4 h-4 animate-bounce" />
            </span>
            <span className={`relative z-10 ${isBn ? 'font-bn text-sm sm:text-base' : ''}`}>
              {isBn ? '💰 Price আন্দাজ করুন (বাজেট ক্যালকুলেটর)' : '💰 Estimate Project Price & Timeline'}
            </span>
            <span className="relative z-10 px-2 py-0.5 rounded-full bg-black/25 text-[10px] uppercase font-mono tracking-wider font-bold">
              {isBn ? 'ইনস্ট্যান্ট' : 'Instant'}
            </span>
          </button>
        </motion.div>

        {/* TOP LEVEL: 3 CATEGORIES */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <div className={`text-xs font-bold text-[#FF7A18] uppercase tracking-wider text-center ${isBn ? 'font-bn' : ''}`}>
            {isBn ? '১. ক্যাটাগরি সিলেক্ট করুন (Category)' : '1. SELECT CATEGORY'}
          </div>

          <div className="flex justify-center">
            <div className="p-1.5 rounded-full bg-[#16100B] border border-[#FF7A18]/25 shadow-lg inline-flex items-center gap-1.5 overflow-x-auto max-w-full no-scrollbar">
              {CATEGORY_DEFS.map((cat) => {
                const IconComp = cat.icon;
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'bg-[#FF7A18] text-white shadow-md shadow-[#FF7A18]/30'
                        : 'text-[#A9A39A] hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <IconComp className="w-4 h-4" />
                    <span className={isBn ? 'font-bn' : ''}>{isBn ? cat.labelBn : cat.labelEn}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* SECOND LEVEL: SUB-TYPES & SEARCH */}
        <div className="mt-6 space-y-4 max-w-5xl mx-auto">
          <div className={`text-xs font-bold text-[#A9A39A] uppercase tracking-wider text-center ${isBn ? 'font-bn' : ''}`}>
            {isBn ? '২. সাব-ক্যাটাগরি বা ধরন নির্বাচন করুন (Type)' : '2. FILTER BY TYPE'}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {currentCategoryDef.types.map((type) => {
              const isTypeActive = activeType === type.id;
              return (
                <button
                  key={type.id}
                  onClick={() => handleTypeChange(type.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                    isTypeActive
                      ? 'bg-[#FF7A18] text-white border-[#FF7A18] shadow-md shadow-[#FF7A18]/25'
                      : 'bg-[#16100B] text-[#A9A39A] border-white/10 hover:border-white/20'
                  }`}
                >
                  <span className={isBn ? 'font-bn' : ''}>{isBn ? type.labelBn : type.labelEn}</span>
                </button>
              );
            })}
          </div>

          {/* Search Input Bar */}
          <div className="max-w-md mx-auto relative pt-2">
            <Search className="w-4 h-4 text-[#A9A39A] absolute left-3.5 top-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isBn ? 'প্রজেক্ট খুঁজুন...' : 'Search projects...'}
              className="w-full pl-10 pr-4 py-2 rounded-2xl bg-[#16100B] border border-white/10 text-xs text-[#FAF6F0] placeholder-[#A9A39A]/60 focus:outline-none focus:border-[#FF7A18] transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <ProjectCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredDesignProjects.length === 0 ? (
          <div className="text-center py-16 bg-[#16100B] rounded-3xl border border-[#FF7A18]/20 p-8">
            <h3 className="text-lg font-bold text-[#FAF6F0] mb-1">
              {isBn ? 'কোন ডিজাইন প্রজেক্ট পাওয়া যায়নি' : 'No Design Projects Found'}
            </h3>
            <p className="text-xs text-[#A9A39A] mb-4">
              {isBn ? 'অন্য কোনো টাইপ বা ফিল্টার ট্রাই করুন' : 'Try selecting all types or clearing search query'}
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveType('all');
                setSearchQuery('');
              }}
              className="btn-fiery-orange px-4 py-2 rounded-xl text-xs font-bold"
            >
              {isBn ? 'টাইপ রিসেট করুন' : 'Reset Type Filter'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {filteredDesignProjects.map((item, idx) => (
              <motion.article
                key={item.id}
                variants={projectCardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px 0px' }}
                custom={idx}
                className="h-full rounded-3xl bg-[#16100B] border border-[#FF7A18]/25 p-5 sm:p-6 shadow-xl flex flex-col justify-between hover:border-[#FF7A18]/50 transition-all duration-300 group overflow-hidden"
              >
                <div className="flex flex-col flex-grow">
                  <div
                    onClick={() => onSelectProject(item)}
                    tabIndex={0}
                    role="button"
                    aria-label={`View details for ${item.title}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onSelectProject(item);
                      }
                    }}
                    className="relative rounded-2xl mb-4 cursor-pointer group/img bg-[#0E0A07] border border-[#FF7A18]/20 overflow-hidden"
                  >
                    <ProjectImage
                      src={item.imageUrl}
                      alt={item.title}
                      aspectRatioClass="dynamic-aspect-ratio"
                      className="relative z-10 w-full h-full object-cover object-center group-hover/img:scale-[1.03] transition-transform duration-300"
                    />
                    
                    {/* Top-Left Category & CTR Badges */}
                    <div className="absolute top-3 left-3 z-20 flex items-center gap-2">
                      <div className="px-3 py-1 rounded-full bg-[#0E0A07]/90 backdrop-blur-md border border-[#FF7A18]/30 text-[11px] font-bold text-[#FF7A18] pointer-events-none shadow-md">
                        {item.categoryLabel}
                      </div>

                      {/* Performance CTR Metric */}
                      <div className="px-2 py-1 rounded-full bg-[#FF7A18]/20 backdrop-blur-md border border-[#FF7A18]/40 text-[10px] font-bold text-white flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 text-[#FF7A18]" />
                        <span>{item.metrics?.ctr || '+45% CTR'}</span>
                      </div>
                    </div>

                    {/* Top-Right Achievement Badge */}
                    <div className="absolute top-3 right-3 z-20 px-2.5 py-1 rounded-lg bg-[#221710] text-[#FF7A18] border border-[#FF7A18]/30 text-[10px] font-bold shadow-lg pointer-events-none flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#FF7A18]" />
                      <span>{item.achievement || item.designVersion || (isBn ? 'প্রিমিয়াম' : 'Featured')}</span>
                    </div>

                    {/* Overlay Action Button on Hover */}
                    <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 bg-black/60 backdrop-blur-[2px]">
                      <span className="btn-fiery-orange px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md">
                        <Eye className="w-4 h-4" />
                        <span>{t.portfolio.viewDetails}</span>
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    onClick={() => onSelectProject(item)}
                    className="text-base sm:text-lg font-bold text-[#FAF6F0] mb-2 group-hover:text-[#FF7A18] transition-colors cursor-pointer line-clamp-2 leading-snug min-h-[2.75rem] flex items-center"
                  >
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-[#A9A39A] leading-relaxed line-clamp-2 mb-3 font-normal min-h-[2.25rem]">
                    {item.description}
                  </p>

                  {/* Compact Metadata */}
                  <div className="mb-3.5 p-2.5 rounded-xl bg-[#120D09] border border-white/10 flex flex-col gap-2 text-[11px]">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-1.5 text-[#A9A39A] font-semibold text-[10px]">
                        <Wrench className="w-3 h-3 text-[#FF7A18] shrink-0" />
                        <span>{isBn ? 'সফটওয়্যার:' : 'Tools:'}</span>
                      </div>
                      <div className="flex items-center gap-1 flex-wrap">
                        {(item.technologies && item.technologies.length > 0 ? item.technologies : ['Pixellab', 'Photoshop']).slice(0, 3).map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 rounded-md bg-[#16100B] border border-[#FF7A18]/20 text-[10px] font-bold text-[#FF7A18]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-medium text-[#A9A39A] pt-1.5 border-t border-white/10">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3 text-[#FF7A18] shrink-0" />
                        <span className="text-[#FAF6F0] font-semibold">{item.year || '2026'}</span>
                      </div>
                      <div className="flex items-center gap-1 font-semibold text-[#FAF6F0]">
                        <ShieldCheck className="w-3 h-3 text-[#FF7A18] shrink-0" />
                        <span className="truncate max-w-[110px]" title={item.clientName || 'Masum 9T9'}>
                          {item.clientName || 'Masum 9T9'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Features Checklist */}
                  <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-[#120D09] border border-white/10 mb-4 mt-auto text-[11px] font-medium text-[#A9A39A]">
                    <div className="flex items-center gap-1.5 truncate">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FF7A18] shrink-0" />
                      <span className="truncate">{isBn ? 'হাই-রেজ ফাইল' : 'High-Res File'}</span>
                    </div>
                    <div className="flex items-center gap-1.5 truncate">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FF7A18] shrink-0" />
                      <span className="truncate">{isBn ? 'অরিজিনাল আর্ট' : 'Custom Artwork'}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Bar */}
                <div className="pt-3.5 border-t border-white/10 flex items-center justify-between gap-3 mt-auto">
                  <div>
                    <span className="text-[10px] text-[#A9A39A] block font-semibold">
                      {isBn ? 'প্রজেক্ট ক্যাটাগরি' : 'Category'}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[#FAF6F0]">
                      {item.categoryLabel || 'ডিজাইন'}
                    </span>
                  </div>

                  <FramerButton
                    variant="secondary"
                    size="sm"
                    onClick={() => onSelectProject(item)}
                    icon={<ArrowUpRight className="w-3.5 h-3.5" />}
                    iconPosition="right"
                  >
                    <span>{isBn ? 'ডিটেইলস' : 'Details'}</span>
                  </FramerButton>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* Featured Ecosystem & Full-Stack Projects */}
        {ecosystemItems && ecosystemItems.length > 0 && (
          <div className="mt-16">
            <div className="text-center mb-8">
              <span className="text-xs font-bold text-[#FF7A18] uppercase tracking-wider">
                {isBn ? '🚀 ইকোসিস্টেম ও পূর্ণাঙ্গ ওয়েব প্ল্যাটফর্ম' : '🚀 Web Apps & Ecosystem Projects'}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#FAF6F0] mt-1">
                {isBn ? 'পূর্ণাঙ্গ ওয়েব অ্যাপ্লিকেশন ও কোডিং প্রজেক্টস' : 'Full-Stack Web & Coding Projects'}
              </h2>
            </div>
            <CodingProjectsShowcase
              projects={ecosystemItems}
              onOpenCreatorProfile={onOpenCreatorProfile}
            />
          </div>
        )}
      </div>

      {/* Interactive Project Price Calculator Modal */}
      <AnimatePresence>
        {isCalculatorOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-5xl my-auto max-h-[92vh] overflow-y-auto rounded-3xl"
            >
              <ProjectCalculator
                socials={config.socials}
                isModal={true}
                onClose={() => setIsCalculatorOpen(false)}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
