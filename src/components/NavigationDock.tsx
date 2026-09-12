import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { UI_TRANSLATIONS } from '../data/translations';
import { LanguageSwitcher } from './LanguageSwitcher';
import { 
  X, 
  Palette, 
  Code2, 
  Sparkles, 
  Search, 
  House, 
  User, 
  Briefcase, 
  FolderOpen, 
  MessageSquareQuote, 
  Mail, 
  Send, 
  Keyboard, 
  Layout, 
  FileText, 
  Download,
  ChevronDown,
  ArrowRight
} from 'lucide-react';
import { downloadResume } from '../utils/resume';

export type PageId = 'home' | 'about' | 'services' | 'projects' | 'reviews' | 'contact';

interface NavItem {
  id: PageId;
  icon: React.ComponentType<{ className?: string }>;
  labelKey: keyof typeof UI_TRANSLATIONS.bn.nav;
  isProjectsToggle?: boolean;
}

interface NavigationDockProps {
  activePage: PageId;
  onNavigate: (page: PageId, filter?: 'ui_ux' | 'graphics' | 'frontend') => void;
  onOpenSearch?: () => void;
  onOpenKeymapping?: () => void;
}

// Complete items list for Desktop Dock with Pure Lucide Icons
const DESKTOP_NAV_ITEMS: NavItem[] = [
  { id: 'home', icon: House, labelKey: 'home' },
  { id: 'about', icon: User, labelKey: 'about' },
  { id: 'services', icon: Briefcase, labelKey: 'services' },
  { id: 'projects', icon: FolderOpen, labelKey: 'projects' },
  { id: 'reviews', icon: MessageSquareQuote, labelKey: 'testimonials' },
  { id: 'contact', icon: Mail, labelKey: 'contact' },
];

// Clean items list for Mobile Dock Redesign
const MOBILE_NAV_ITEMS: NavItem[] = [
  { id: 'home', icon: House, labelKey: 'home' },
  { id: 'about', icon: User, labelKey: 'about' },
  { id: 'services', icon: Briefcase, labelKey: 'services' },
  { id: 'projects', icon: FolderOpen, labelKey: 'projects', isProjectsToggle: true },
  { id: 'reviews', icon: MessageSquareQuote, labelKey: 'testimonials' },
  { id: 'contact', icon: Mail, labelKey: 'contact' },
];

export const NavigationDock: React.FC<NavigationDockProps> = ({ activePage, onNavigate, onOpenSearch, onOpenKeymapping }) => {
  const { language } = useLanguage();
  const t = UI_TRANSLATIONS[language];
  const isBn = language === 'bn';

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavHidden, setIsNavHidden] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isProjectsBottomSheetOpen, setIsProjectsBottomSheetOpen] = useState(false);

  // Check window width for mobile responsiveness
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scroll spy & auto-hide handling with requestAnimationFrame throttling
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          setIsScrolled(currentScrollY > 30);

          // On mobile view, NEVER hide the dock!
          if (window.innerWidth < 640) {
            setIsNavHidden(false);
          } else {
            // Scroll Direction Detection for Desktop/Tablet
            if (currentScrollY > lastScrollY && currentScrollY > 150) {
              setIsNavHidden(true);
            } else if (currentScrollY < lastScrollY - 8 || currentScrollY <= 80) {
              setIsNavHidden(false);
            }
          }

          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reveal dock on mouse near top
  useEffect(() => {
    let mouseTicking = false;
    const handleMouseMove = (e: MouseEvent) => {
      if (!mouseTicking) {
        requestAnimationFrame(() => {
          if (e.clientY < 80) {
            setIsNavHidden(false);
          }
          mouseTicking = false;
        });
        mouseTicking = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const getScale = (index: number) => {
    if (hoveredIndex === null) return 1;
    const distance = Math.abs(hoveredIndex - index);
    if (distance === 0) return 1.2;
    if (distance === 1) return 1.1;
    if (distance === 2) return 1.04;
    return 1;
  };

  const isCollapsed = !isMobile && isNavHidden && !isHovered;
  const currentNavItems = isMobile ? MOBILE_NAV_ITEMS : DESKTOP_NAV_ITEMS;

  const activeItemObj = DESKTOP_NAV_ITEMS.find((item) => item.id === activePage) || DESKTOP_NAV_ITEMS[0];
  const ActiveIcon = activeItemObj.icon;
  const activeLabel = t.nav[activeItemObj.labelKey] || activeItemObj.id;

  return (
    <>
      {/* Header Dock Container */}
      <header className="fixed top-3.5 sm:top-6 left-0 right-0 z-[100] flex justify-center pointer-events-none px-2 xs:px-3 sm:px-4 pt-[env(safe-area-inset-top,0px)]">
        <motion.div
          onMouseEnter={() => {
            setIsHovered(true);
            if (!isMobile) setIsNavHidden(false);
          }}
          onMouseLeave={() => {
            setIsHovered(false);
            setHoveredIndex(null);
          }}
          animate={{
            y: isCollapsed ? -8 : 0,
            scale: isCollapsed ? 0.94 : 1,
            opacity: 1,
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
          className="pointer-events-auto flex items-center justify-center max-w-full"
        >
          {isCollapsed ? (
            /* Desktop Collapsed Pill */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={() => setIsNavHidden(false)}
              className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#18120C]/95 border border-[#FF7A18]/25 text-[#FAF6F0] shadow-lg backdrop-blur-2xl cursor-pointer hover:border-[#FF7A18]/45 hover:bg-[#201710] transition-all group"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF7A18] animate-pulse shadow-sm" />
                <ActiveIcon className="w-4 h-4 text-[#FF7A18]" />
                <span className={`text-xs font-semibold tracking-wide text-[#FAF6F0] ${isBn ? 'font-bn' : ''}`}>
                  {activeLabel}
                </span>
              </div>

              <div className="w-[1px] h-3.5 bg-white/15" />

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate('contact');
                }}
                className="px-2.5 py-0.5 rounded-full bg-[#FF7A18]/20 hover:bg-[#FF7A18]/35 text-white transition-all flex items-center gap-1 text-[11px] font-semibold"
                title={isBn ? 'যোগাযোগ করুন' : 'Contact Me'}
              >
                <Send className="w-3.5 h-3.5 text-[#FF7A18]" />
                <span className={isBn ? 'font-bn' : ''}>{isBn ? 'যোগাযোগ' : 'Contact'}</span>
              </button>

              <div className="w-[1px] h-3.5 bg-white/15" />

              <span className="text-[10px] text-[#A9A39A] font-semibold group-hover:text-white flex items-center gap-1">
                <span>Menu</span>
                <ChevronDown className="w-3 h-3 group-hover:translate-y-0.5 transition-transform" />
              </span>
            </motion.div>
          ) : (
            /* Full Floating Apple macOS-Style Dock with Gentle Continuous Ambient Animation */
            <motion.nav
              initial={{ y: -60, opacity: 0 }}
              animate={{ 
                y: [0, -3, 0],
                opacity: 1,
              }}
              transition={{ 
                y: {
                  repeat: Infinity,
                  duration: 4.5,
                  ease: 'easeInOut',
                },
                opacity: { duration: 0.3 }
              }}
              className={`glass-dock flex items-center gap-0.5 xs:gap-1 sm:gap-1.5 px-1.5 xs:px-2 sm:px-3.5 py-1.5 xs:py-2 rounded-full backdrop-blur-2xl border transition-colors duration-300 max-w-[98vw] sm:max-w-max relative overflow-hidden ${
                isScrolled
                  ? 'bg-[#18120C]/95 border-[#FF7A18]/25 shadow-[0_16px_40px_rgba(0,0,0,0.85)]'
                  : 'bg-[#18120C]/85 border-[#FF7A18]/20 shadow-[0_10px_30px_rgba(0,0,0,0.7)]'
              }`}
              role="navigation"
              aria-label="Navigation Dock"
            >
              {/* Subtle continuous ambient light sweep */}
              <motion.div
                aria-hidden="true"
                className="absolute inset-0 rounded-full pointer-events-none -z-10 overflow-hidden"
              >
                <motion.div
                  animate={{
                    x: ['-120%', '220%'],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 5.5,
                    ease: 'easeInOut',
                    repeatDelay: 2,
                  }}
                  className="w-1/3 h-full bg-gradient-to-r from-transparent via-[#FF7A18]/10 to-transparent -skew-x-12 pointer-events-none"
                />
              </motion.div>
              {currentNavItems.map((item, index) => {
                const isActive = activePage === item.id;
                const scale = isMobile ? 1 : getScale(index);
                const label = t.nav[item.labelKey] || item.id;
                const ItemIcon = item.icon;

                return (
                  <div key={item.id} className="relative group shrink-0">
                    <motion.button
                      onClick={() => {
                        if (item.isProjectsToggle) {
                          setIsProjectsBottomSheetOpen(true);
                        } else {
                          onNavigate(item.id);
                        }
                      }}
                      onMouseEnter={() => setHoveredIndex(index)}
                      animate={{
                        scale,
                        y: isActive ? -1 : 0,
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 450,
                        damping: 28,
                        mass: 0.6,
                      }}
                      className={`relative flex items-center justify-center gap-1 xs:gap-1.5 p-2 xs:p-2.5 sm:p-2.5 lg:px-3.5 lg:py-1.5 xl:px-4 xl:py-2 rounded-full text-xs sm:text-sm font-semibold select-none shrink-0 transition-colors ${
                        isActive
                          ? 'text-[#FAF6F0] font-bold'
                          : 'text-[#A9A39A] hover:text-[#FAF6F0] hover:bg-white/5'
                      }`}
                      title={label}
                    >
                      {/* Active Background Pill */}
                      {isActive && (
                        <motion.div
                          layoutId="activeDockPill"
                          className="absolute inset-0 bg-[#251A12] border border-[#FF7A18]/30 rounded-full shadow-[0_0_15px_rgba(255,122,24,0.15)] -z-10"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}

                      {/* Pure Lucide Icon */}
                      <ItemIcon
                        className={`w-4 h-4 xs:w-4.5 xs:h-4.5 relative z-10 transition-transform duration-200 ${
                          isActive ? 'scale-105 text-[#FF7A18]' : 'group-hover:scale-105'
                        }`}
                        aria-hidden="true"
                      />

                      {/* Localized Label - Desktop only (lg+) */}
                      <span className={`hidden lg:inline whitespace-nowrap text-xs xl:text-sm font-semibold tracking-wide relative z-10 ${isBn ? 'font-bn' : ''}`}>
                        {label}
                      </span>

                      {/* Active Dot */}
                      {isActive && (
                        <motion.span
                          layoutId="activeDockDot"
                          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 xs:w-1.5 h-1 xs:h-1.5 rounded-full bg-[#FF7A18]"
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                      )}
                    </motion.button>

                    {/* Tooltip for desktop non-lg views */}
                    <div className="absolute top-full mt-2.5 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-[#16100B]/95 border border-[#FF7A18]/25 text-[#FAF6F0] text-[11px] font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none lg:hidden whitespace-nowrap z-50 shadow-xl backdrop-blur-xl">
                      <span className={isBn ? 'font-bn' : ''}>{label}</span>
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#16100B] border-t border-l border-[#FF7A18]/25 rotate-45" />
                    </div>
                  </div>
                );
              })}

              {/* Global Search Button — Desktop only */}
              {!isMobile && (
                <div className="hidden sm:flex items-center gap-1">
                  <div className="w-[1px] h-4 xs:h-5 bg-white/12 mx-1 shrink-0" />
                  <button
                    id="global-search-trigger"
                    onClick={onOpenSearch}
                    className="relative flex items-center gap-1.5 px-2.5 xs:px-3 py-1 xs:py-1.5 rounded-full bg-[#FF7A18]/12 hover:bg-[#FF7A18]/25 border border-[#FF7A18]/25 text-[#FAF6F0] hover:text-white text-xs font-medium transition-all shrink-0 active:scale-95 group ml-0.5"
                    title={isBn ? 'সার্চ করুন (F / ⌘K)' : 'Search (F / ⌘K)'}
                  >
                    <Search className="w-3.5 h-3.5 text-[#FF7A18] group-hover:scale-105 transition-transform" />
                    <span className={`whitespace-nowrap text-xs font-medium ${isBn ? 'font-bn' : ''}`}>
                      {isBn ? 'সার্চ' : 'Search'}
                    </span>
                    <span className="inline-flex items-center text-[10px] bg-[#0E0A07]/90 text-[#FAF6F0] font-mono px-1.5 py-0.5 rounded border border-[#FF7A18]/25 font-bold">
                      F
                    </span>
                  </button>

                  {/* One-click CV Download Button */}
                  <button
                    id="global-cv-download-trigger"
                    onClick={() => downloadResume(isBn ? 'bn' : 'en')}
                    className="relative flex items-center gap-1.5 px-2.5 xs:px-3 py-1 xs:py-1.5 rounded-full bg-gradient-to-r from-[#FFA053] to-[#FF852E] hover:from-[#FF852E] hover:to-[#FFA053] text-white text-xs font-bold transition-all shrink-0 active:scale-95 shadow-md shadow-[#FFA053]/25 group ml-0.5 cursor-pointer"
                    title={isBn ? 'সিভি ডাউনলোড করুন' : 'Download CV / Resume'}
                  >
                    <Download className="w-3.5 h-3.5 text-white group-hover:translate-y-0.5 transition-transform" />
                    <span className={`whitespace-nowrap text-xs font-bold ${isBn ? 'font-bn' : ''}`}>
                      {isBn ? 'সিভি' : 'CV'}
                    </span>
                  </button>
                </div>
              )}

              {/* Language Switcher */}
              <LanguageSwitcher variant="dock" />

            </motion.nav>
          )}
        </motion.div>
      </header>

      {/* Mobile Floating Action Buttons */}
      <AnimatePresence>
        {isMobile && (
          <div className="fixed bottom-7 right-4 z-[90] sm:hidden flex flex-col gap-3.5 items-center pb-[env(safe-area-inset-bottom,0px)]">
            
            {/* Top Button: Contact Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => onNavigate('contact')}
              className="ios-btn-primary w-12 h-12 !rounded-2xl flex items-center justify-center transition-all group relative font-bold"
              title={isBn ? 'যোগাযোগ করুন' : 'Contact Me'}
            >
              <Send className="w-5 h-5 text-white group-hover:scale-105 transition-transform" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF7A18] opacity-80" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FF7A18]" />
              </span>
            </motion.button>

            {/* Bottom Button: Search Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileTap={{ scale: 0.92 }}
              onClick={onOpenSearch}
              className="ios-icon-btn w-12 h-12 !rounded-2xl"
              title={isBn ? 'সার্চ করুন' : 'Search'}
            >
              <Search className="w-5 h-5 text-[#FAF6F0] group-hover:scale-110 transition-transform" />
            </motion.button>

          </div>
        )}
      </AnimatePresence>

      {/* Projects Mobile Bottom Sheet Modal */}
      <AnimatePresence>
        {isProjectsBottomSheetOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsProjectsBottomSheetOpen(false)}
              className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-md"
            />

            {/* Bottom Sheet Panel */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              className="fixed bottom-0 left-0 right-0 z-[120] p-5 pb-8 bg-[#16100B] border-t border-[#FF7A18]/25 rounded-t-3xl shadow-2xl backdrop-blur-2xl max-w-lg mx-auto"
            >
              {/* Handle Bar */}
              <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto mb-5" />

              {/* Sheet Header */}
              <div className="flex items-center justify-between mb-5 px-1">
                <div>
                  <h3 className="text-lg font-bold text-[#FAF6F0] flex items-center gap-2">
                    <FolderOpen className="w-5 h-5 text-[#FF7A18]" />
                    <span className={isBn ? 'font-bn' : ''}>{isBn ? 'প্রজেক্ট বিভাগ নির্বাচন করুন' : 'Select Project Category'}</span>
                  </h3>
                  <p className={`text-xs text-[#A9A39A] font-normal mt-0.5 ${isBn ? 'font-bn' : ''}`}>
                    {isBn ? 'আপনার পছন্দের প্রজেক্ট টাইপে যান' : 'Navigate to your desired projects section'}
                  </p>
                </div>
                <button
                  onClick={() => setIsProjectsBottomSheetOpen(false)}
                  className="p-2 rounded-full bg-[#1F1610] hover:bg-[#2A1E16] text-[#A9A39A] hover:text-[#FAF6F0] transition-colors border border-[#FF7A18]/20 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Options Grid */}
              <div className="flex flex-col gap-3">
                {/* 1. UI-UX Design */}
                <button
                  onClick={() => {
                    setIsProjectsBottomSheetOpen(false);
                    onNavigate('projects', 'ui_ux');
                  }}
                  className="w-full p-4 rounded-2xl bg-[#1D140D] hover:bg-[#251A12] border border-[#FF7A18]/20 flex items-center justify-between group transition-all text-left shadow-sm cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-[#16100B] border border-[#FF7A18]/25 flex items-center justify-center text-[#FF7A18] group-hover:scale-105 transition-transform shrink-0">
                      <Layout className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className={`text-sm font-bold text-[#FAF6F0] group-hover:text-[#FF7A18] transition-colors ${isBn ? 'font-bn' : ''}`}>
                        {isBn ? 'ইউআই-ইউএক্স ডিজাইন' : 'UI-UX Design'}
                      </h4>
                      <p className={`text-xs text-[#A9A39A] ${isBn ? 'font-bn' : ''}`}>
                        {isBn ? 'ওয়েবসাইট UI, মোবাইল অ্যাপ ও ল্যান্ডিং পেজ' : 'Website UI, mobile apps & landing pages'}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#FF7A18] group-hover:translate-x-1 transition-transform" />
                </button>

                {/* 2. Frontend Development */}
                <button
                  onClick={() => {
                    setIsProjectsBottomSheetOpen(false);
                    onNavigate('projects', 'frontend');
                  }}
                  className="w-full p-4 rounded-2xl bg-[#1D140D] hover:bg-[#251A12] border border-[#FF7A18]/20 flex items-center justify-between group transition-all text-left shadow-sm cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-[#16100B] border border-[#FF7A18]/25 flex items-center justify-center text-[#FF7A18] group-hover:scale-105 transition-transform shrink-0">
                      <Code2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className={`text-sm font-bold text-[#FAF6F0] group-hover:text-[#FF7A18] transition-colors ${isBn ? 'font-bn' : ''}`}>
                        {isBn ? 'ফ্রন্টএন্ড ডেভেলপমেন্ট' : 'Frontend Development'}
                      </h4>
                      <p className={`text-xs text-[#A9A39A] ${isBn ? 'font-bn' : ''}`}>
                        {isBn ? 'ওয়েব প্ল্যাটফর্ম, রিয়েক্ট অ্যাপ ও ইকোসিস্টেম' : 'Web platforms, React apps & ecosystem'}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#FF7A18] group-hover:translate-x-1 transition-transform" />
                </button>

                {/* 3. Graphics Design */}
                <button
                  onClick={() => {
                    setIsProjectsBottomSheetOpen(false);
                    onNavigate('projects', 'graphics');
                  }}
                  className="w-full p-4 rounded-2xl bg-[#1D140D] hover:bg-[#251A12] border border-[#FF7A18]/20 flex items-center justify-between group transition-all text-left shadow-sm cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-[#16100B] border border-[#FF7A18]/25 flex items-center justify-center text-[#FF7A18] group-hover:scale-105 transition-transform shrink-0">
                      <Palette className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className={`text-sm font-bold text-[#FAF6F0] group-hover:text-[#FF7A18] transition-colors ${isBn ? 'font-bn' : ''}`}>
                        {isBn ? 'গ্রাফিক্স ডিজাইন' : 'Graphics Design'}
                      </h4>
                      <p className={`text-xs text-[#A9A39A] ${isBn ? 'font-bn' : ''}`}>
                        {isBn ? 'নাটক পোস্টার, থাম্বনেল ও গ্রাফিক্স' : 'Natok poster, YouTube thumbnails & graphics'}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#FF7A18] group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
