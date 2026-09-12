import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight,
  ArrowDown,
  Palette,
  Code2,
  Sparkles,
  MapPin,
  Clock,
  CheckCircle2,
  Send,
  Mail,
  Facebook,
  Phone,
  Youtube,
  Github,
  Keyboard,
  Layers,
  Briefcase,
  User,
  Video
} from 'lucide-react';
import { HeroData, SocialLinks } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { UI_TRANSLATIONS } from '../data/translations';
import { FramerButton } from './FramerButton';
import { LiquidEmberMotionBackground } from './LiquidEmberMotionBackground';

interface HeroProps {
  data: HeroData;
  socials: SocialLinks;
  onOpenKeymapping?: () => void;
  onNavigate?: (page: string) => void;
}

// Introduction phrases for typewriter animation
const INTRO_PHRASES_EN = [
  "Hi, I am Md. Masum Billah",
  "Welcome to my creative universe",
  "Crafting high-impact visuals & code",
  "Turning ideas into digital reality"
];

const INTRO_PHRASES_BN = [
  "হ্যালো, আমি মো. মাসুম বিল্লাহ",
  "আমার ক্রিয়েটিভ পোর্টফোলিওতে স্বাগতম",
  "ডিজাইন ও কোডিংয়ের নান্দনিক মেলবন্ধন",
  "আইডিয়াকে বাস্তবে রূপ দেওয়াই আমার কাজ"
];

export const Hero: React.FC<HeroProps> = ({ data, socials, onOpenKeymapping, onNavigate }) => {
  const { language } = useLanguage();
  const isBn = language === 'bn';
  const t = UI_TRANSLATIONS[language];

  // =========================================================================
  // 1. TYPING ANIMATION FOR INTRODUCTION (Smooth Vanilla JS timer cycle)
  // =========================================================================
  const [introText, setIntroText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrases = isBn ? INTRO_PHRASES_BN : INTRO_PHRASES_EN;
    const targetPhrase = currentPhrases[phraseIndex % currentPhrases.length];
    let timer: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      // Typing forward
      if (introText.length < targetPhrase.length) {
        timer = setTimeout(() => {
          setIntroText(targetPhrase.slice(0, introText.length + 1));
        }, 65 + Math.random() * 25);
      } else {
        // Pause when fully typed
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      // Deleting backwards
      if (introText.length > 0) {
        timer = setTimeout(() => {
          setIntroText(targetPhrase.slice(0, introText.length - 1));
        }, 30);
      } else {
        // Move to next phrase
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % currentPhrases.length);
      }
    }

    return () => clearTimeout(timer);
  }, [introText, isDeleting, phraseIndex, isBn]);

  // Reset text on language change
  useEffect(() => {
    setIntroText('');
    setIsDeleting(false);
    setPhraseIndex(0);
  }, [language]);

  // =========================================================================
  // 2. ROTATING TEXT FOR KEYWORDS ('Graphics Designer', 'Content Creator', etc.)
  // =========================================================================
  const keywords = useMemo(() => {
    if (isBn) {
      return [
        { text: 'গ্রাফিক্স ডিজাইনার', icon: <Palette className="w-4 h-4 text-[#FF7A18]" /> },
        { text: 'কনটেন্ট ক্রিয়েটর', icon: <Video className="w-4 h-4 text-[#FF7A18]" /> },
        { text: 'UI/UX ডিজাইনার', icon: <Layers className="w-4 h-4 text-[#FF7A18]" /> },
        { text: 'ফুল-স্ট্যাক ডেভেলপার', icon: <Code2 className="w-4 h-4 text-[#FF7A18]" /> },
        { text: 'এআই ক্রিয়েটিভ স্পেশালিস্ট', icon: <Sparkles className="w-4 h-4 text-[#FF7A18]" /> }
      ];
    }
    return [
      { text: 'Graphics Designer', icon: <Palette className="w-4 h-4 text-[#FF7A18]" /> },
      { text: 'Content Creator', icon: <Video className="w-4 h-4 text-[#FF7A18]" /> },
      { text: 'UI/UX Visualizer', icon: <Layers className="w-4 h-4 text-[#FF7A18]" /> },
      { text: 'Full-Stack Developer', icon: <Code2 className="w-4 h-4 text-[#FF7A18]" /> },
      { text: 'AI Creative Specialist', icon: <Sparkles className="w-4 h-4 text-[#FF7A18]" /> }
    ];
  }, [isBn]);

  const [keywordIndex, setKeywordIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setKeywordIndex((prev) => (prev + 1) % keywords.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [keywords.length]);

  const currentKeyword = keywords[keywordIndex % keywords.length];

  const handleExploreProjects = () => {
    if (onNavigate) {
      onNavigate('projects');
    } else {
      window.location.pathname = '/projects';
    }
  };

  const handleAboutMe = () => {
    if (onNavigate) {
      onNavigate('about');
    } else {
      window.location.pathname = '/about';
    }
  };

  const handleContact = () => {
    if (onNavigate) {
      onNavigate('contact');
    } else {
      window.location.pathname = '/contact';
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-[92vh] sm:min-h-screen w-full flex flex-col justify-between items-center pt-12 xs:pt-14 sm:pt-28 pb-4 sm:pb-8 px-2.5 xs:px-3 sm:px-6 lg:px-12 overflow-hidden bg-[#0E0A07]"
    >
      {/* Atmospheric Warm Radial Glow & Subtle Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-fiery-amber-spotlight opacity-80" />
        <div className="fiery-ambient-glow opacity-60" />
        <div className="absolute inset-0 grid-bg-overlay opacity-25" />
        <LiquidEmberMotionBackground opacity={0.42} />
      </div>

      {/* ========================================================================= */}
      {/* 📱 MOBILE HERO LAYOUT (Full Screenfill & Massive Prominent Portrait)       */}
      {/* ========================================================================= */}
      <div className="md:hidden w-full max-w-lg mx-auto flex flex-col items-center relative z-10 space-y-2 xs:space-y-2.5 pt-0 pb-2">
        
        {/* Mobile Header Row: Typed Introduction Badge + Live Availability Status (Floating Higher Up) */}
        <div className="w-full flex items-center justify-between gap-2 px-1 z-20 -mb-3 xs:-mb-5">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1D140D]/95 border border-[#FF7A18]/35 text-[11px] font-semibold text-[#FAF6F0] shadow-sm backdrop-blur-md min-w-0 max-w-[70%]"
          >
            <Sparkles className="w-3 h-3 text-[#FF7A18] shrink-0 animate-pulse" />
            <span className={`truncate ${isBn ? 'font-bn' : ''}`}>
              {introText || (isBn ? "হ্যালো, আমি মাসুম ৯টি৯" : "Hi, I'm Masum 9T9")}
            </span>
            <span className="hero-typing-cursor shrink-0" />
          </motion.div>

          {/* Status Availability Tag */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#16100B]/95 border border-[#22C55E]/30 text-[11px] font-medium text-[#22C55E] shadow-sm shrink-0 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]" />
            </span>
            <span className={isBn ? 'font-bn' : ''}>{isBn ? 'অ্যাভেইলেবল' : 'Available'}</span>
          </motion.div>
        </div>

        {/* Mobile Centerpiece: Massive Screen-Filling Portrait Cutout Positioned Higher Up */}
        <div className="relative w-full flex flex-col items-center justify-center pt-0 pb-0 select-none overflow-visible">
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="relative z-10 flex flex-col items-center justify-center w-full"
          >
            {/* Rich Ambient Glow behind portrait filling background aura */}
            <div className="absolute w-80 xs:w-96 sm:w-[460px] h-80 xs:h-96 sm:h-[460px] rounded-full bg-[#FF7A18]/30 blur-[75px] pointer-events-none" />

            <div className="relative w-full max-w-[480px] h-[390px] xs:h-[440px] sm:h-[490px] flex items-end justify-center overflow-visible">
              <img
                src={data.profileImage || "https://i.postimg.cc/bYQL7Lvj/Profile-pic-(3).png"}
                alt="Md. Masum Billah (Masum 9T9)"
                referrerPolicy="no-referrer"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "https://i.postimg.cc/bYQL7Lvj/Profile-pic-(3).png";
                }}
                className="relative z-10 w-full h-full object-contain object-bottom contrast-[1.06] brightness-[1.03] portrait-mask-fade drop-shadow-[0_16px_40px_rgba(255,122,24,0.32)] scale-115 xs:scale-120 sm:scale-125 origin-bottom will-change-transform"
              />
            </div>
          </motion.div>
        </div>

        {/* Dynamic Rotating Role Capsule */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full flex items-center justify-center -mt-2 xs:-mt-3 z-20"
        >
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#18120C]/95 border border-[#FF7A18]/35 shadow-lg backdrop-blur-md">
            <Sparkles className="w-3 h-3 text-[#FF7A18] shrink-0" />
            <span className="text-[10px] text-[#A9A39A] uppercase tracking-wider font-semibold">
              {isBn ? 'ভূমিকা:' : 'Role:'}
            </span>
            <div className="h-4.5 xs:h-5 overflow-hidden flex items-center min-w-[130px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={keywordIndex}
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -12, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-center gap-1.5 text-[11px] font-bold text-[#FF7A18] whitespace-nowrap"
                >
                  {currentKeyword.icon}
                  <span className={isBn ? 'font-bn' : ''}>{currentKeyword.text}</span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Mobile Name & Bio Tagline */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="text-center px-2 space-y-1"
        >
          <h2 className="text-base xs:text-lg font-bold text-[#FAF6F0] tracking-tight font-display">
            {isBn ? 'মো. মাসুম বিল্লাহ' : 'Md. Masum Billah'}
          </h2>
          <p className={`text-[11px] xs:text-xs text-[#FAF6F0] leading-relaxed font-medium ${isBn ? 'font-bn' : ''}`}>
            {isBn ? (
              <>
                <span className="text-[#FAF6F0]">আইডিয়াকে বাস্তবে রূপ দিই — </span>
                <span className="text-[#FF9238] font-semibold">ডিজাইন, ওয়েব ও AI প্রযুক্তির মাধ্যমে।</span>
              </>
            ) : (
              <>
                <span className="text-[#FAF6F0]">Transforming Ideas into Reality — </span>
                <span className="text-[#FF9238] font-semibold">Through Design, Web & AI Innovation.</span>
              </>
            )}
          </p>
        </motion.div>

        {/* Mobile Connect Section: "Connect: [FB] [WA] [TG] [YT] [GH]" */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="w-full flex items-center justify-between py-2 px-3 bg-[#16100B]/95 border border-white/10 rounded-2xl shadow-lg backdrop-blur-md"
        >
          <span className="text-[11px] font-bold text-[#FF7A18] uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#FF7A18]" />
            <span className={isBn ? 'font-bn' : ''}>{isBn ? 'কানেক্ট:' : 'Connect:'}</span>
          </span>
          
          <div className="flex items-center gap-1.5">
            <a 
              href={socials.facebook} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-8.5 h-8.5 rounded-xl bg-[#1D140D] border border-white/10 text-[#1877F2] flex items-center justify-center active:scale-90 transition-transform"
              title="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a 
              href={socials.whatsapp ? socials.whatsapp : `tel:${socials.phone}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-8.5 h-8.5 rounded-xl bg-[#1D140D] border border-white/10 text-[#25D366] flex items-center justify-center active:scale-90 transition-transform"
              title="WhatsApp"
            >
              <Phone className="w-4 h-4" />
            </a>
            <a 
              href={socials.youtube} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-8.5 h-8.5 rounded-xl bg-[#1D140D] border border-white/10 text-[#FF0000] flex items-center justify-center active:scale-90 transition-transform"
              title="YouTube"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a 
              href={socials.telegram} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-8.5 h-8.5 rounded-xl bg-[#1D140D] border border-white/10 text-[#229ED9] flex items-center justify-center active:scale-90 transition-transform"
              title="Telegram"
            >
              <Send className="w-4 h-4" />
            </a>
            <a 
              href={socials.github || "https://github.com/masum-9t9"} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-8.5 h-8.5 rounded-xl bg-[#1D140D] border border-white/10 text-white flex items-center justify-center active:scale-90 transition-transform"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </motion.div>

        {/* Mobile 2 Primary Action Cards - Side-by-side compact pills */}
        <div className="w-full grid grid-cols-2 gap-2 mt-4 pt-1 max-w-sm mx-auto">
          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.02 }}
            onClick={handleExploreProjects}
            className="py-2.5 px-3 rounded-full bg-gradient-to-r from-[#FFA053] via-[#FF852E] to-[#F76707] hover:brightness-110 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-[0_4px_16px_rgba(255,122,24,0.3)] hover:shadow-[0_6px_22px_rgba(255,122,24,0.45)] cursor-pointer active:scale-95 transition-all"
          >
            <Briefcase className="w-3.5 h-3.5 shrink-0" />
            <span className={`truncate leading-tight font-semibold ${isBn ? 'font-bn text-xs' : ''}`}>
              {isBn ? 'প্রজেক্ট দেখুন' : 'Explore Projects'}
            </span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
          </motion.button>

          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.02 }}
            onClick={handleAboutMe}
            className="py-2.5 px-3 rounded-full bg-[#16100B] border border-[#FF852E]/35 hover:border-[#FFA053] text-[#FAF6F0] font-semibold text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer active:scale-95 transition-all hover:bg-[#1E140E]"
          >
            <User className="w-3.5 h-3.5 text-[#FF9238] shrink-0" />
            <span className={`truncate leading-tight font-semibold ${isBn ? 'font-bn text-xs' : ''}`}>
              {isBn ? 'আমার সম্পর্কে' : 'About Me'}
            </span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0 text-[#FF9238]" />
          </motion.button>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 💻 DESKTOP & TABLET HERO LAYOUT (>= md screens)                            */}
      {/* ========================================================================= */}
      <div className="hidden md:flex w-full max-w-7xl mx-auto flex-1 flex-col items-center justify-center relative my-auto py-4 sm:py-6 md:py-8 z-10">
        
        {/* Background Name Typography ("MASUM 9T9") with Interactive Depth Parallax */}
        <div className="w-full relative flex flex-col items-center justify-center z-0 select-none">
          
          {/* Dynamic Typing Introduction Tag above the top-left start of "MASUM 9T9" */}
          <div className="w-full max-w-6xl flex justify-start pl-2 sm:pl-4 md:pl-6 lg:pl-10 xl:pl-12 -mb-2 sm:-mb-3 md:-mb-4 z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1D140D]/90 border border-[#FF7A18]/30 text-[11px] sm:text-xs font-semibold tracking-normal text-[#FAF6F0]/95 shadow-[0_4px_16px_rgba(0,0,0,0.4)] backdrop-blur-md">
              <Sparkles className="w-3 h-3 text-[#FF7A18] shrink-0 animate-pulse" />
              <span className={isBn ? 'font-bn' : ''}>
                {introText || (isBn ? 'হ্যালো, আমি মো. মাসুম বিল্লাহ' : 'Hi, I am Md. Masum Billah')}
              </span>
              <span className="hero-typing-cursor" />
            </span>
          </div>

          {/* Background Name Typography ("MASUM 9T9") */}
          <div
            className="w-full flex items-center justify-center pointer-events-none select-none overflow-hidden px-1 sm:px-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-[17vw] xs:text-[18vw] sm:text-[18vw] md:text-[18vw] lg:text-[190px] xl:text-[235px] 2xl:text-[270px] font-evantic tracking-tight sm:tracking-normal md:tracking-[0.02em] uppercase leading-[0.82] font-bold text-white text-center whitespace-nowrap opacity-[0.14]">
                MASUM 9T9
              </h1>
            </motion.div>
          </div>
        </div>

        {/* Foreground Cutout: High-Resolution Portrait */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[52%] sm:-translate-y-[52%] md:-translate-y-[52%] lg:-translate-y-[54%] xl:-translate-y-[56%] z-10 flex items-center justify-center pointer-events-auto select-none"
        >
          {/* Gentle Radial Ambient Warm Glow Behind Head & Shoulders */}
          <div 
            className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-80 md:w-[500px] lg:w-[560px] h-64 sm:h-80 md:h-[500px] lg:h-[560px] rounded-full bg-[#FF7A18]/25 blur-[60px] md:blur-[80px] pointer-events-none" 
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-[340px] xs:w-[400px] sm:w-[460px] md:w-[540px] lg:w-[680px] xl:w-[760px] 2xl:w-[840px] max-w-[96vw] aspect-[3.7/4.6] flex items-end justify-center"
          >
            <img
              src={data.profileImage || "https://i.postimg.cc/bYQL7Lvj/Profile-pic-(3).png"}
              alt="Md. Masum Billah (Masum 9T9)"
              referrerPolicy="no-referrer"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "https://i.postimg.cc/bYQL7Lvj/Profile-pic-(3).png";
              }}
              className="relative z-10 w-full h-full object-contain object-bottom contrast-[1.05] brightness-[1.02] portrait-mask-fade drop-shadow-[0_12px_28px_rgba(255,122,24,0.15)]"
            />
          </motion.div>
        </div>

        {/* Desktop Bottom Composition: Headline & CTAs (Left) + Status Card (Right) */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-7 lg:gap-8 items-end relative z-20 mt-10 sm:mt-12 md:mt-14">
          
          {/* Left Content Area */}
          <div
            className="lg:col-span-7 xl:col-span-7 flex flex-col items-start text-left space-y-3.5 lg:space-y-4"
          >
            {/* Dynamic Rotating Keywords Capsule ('Graphics Designer', 'Content Creator', etc.) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-2.5 sm:px-3 lg:px-3.5 py-1 sm:py-1.5 rounded-full bg-[#16100B]/95 border border-[#FF7A18]/30 shadow-sm backdrop-blur-md"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A18] animate-ping" />
              <span className={`text-[10.5px] sm:text-xs lg:text-[12px] font-medium text-[#A9A39A] ${isBn ? 'font-bn' : ''}`}>
                {isBn ? 'আমি একজন' : "I am a"}
              </span>

              {/* Seamless Animated Keyword Rotation */}
              <div className="relative h-5 sm:h-5.5 lg:h-6 overflow-hidden flex items-center min-w-[130px] sm:min-w-[155px] lg:min-w-[175px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={keywordIndex}
                    initial={{ y: 12, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -12, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center gap-1.5 text-xs sm:text-[12.5px] lg:text-[13px] font-bold text-[#FF7A18] whitespace-nowrap"
                  >
                    {currentKeyword.icon}
                    <span className={isBn ? 'font-bn' : ''}>{currentKeyword.text}</span>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Main Specified Headline - Refined, balanced, slightly reduced on desktop */}
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className={`text-base sm:text-lg md:text-xl lg:text-[22px] xl:text-[25px] 2xl:text-[27px] font-bold text-[#FAF6F0] leading-snug lg:leading-[1.3] tracking-tight max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl ${isBn ? 'font-bn' : ''}`}
            >
              {isBn ? (
                <>
                  <span className="block text-[#FAF6F0]">আইডিয়াকে বাস্তবে রূপ দিই —</span>
                  <span className="text-[#FF9238] font-bold">ডিজাইন, ওয়েব ও AI প্রযুক্তির মাধ্যমে।</span>
                </>
              ) : (
                <>
                  <span className="block text-[#FAF6F0]">Bringing Ideas to Life —</span>
                  <span className="text-[#FF9238] font-bold">Through Design, Web & AI Innovation.</span>
                </>
              )}
            </motion.h2>

            {/* Action Buttons: Perfectly sized & proportioned */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex items-center gap-2.5 sm:gap-3 mt-3.5 sm:mt-4 lg:mt-5 w-auto flex-nowrap"
            >
              <FramerButton
                variant="primary"
                size="sm"
                onClick={handleExploreProjects}
                icon={<ArrowRight className="w-3.5 h-3.5 lg:w-4 lg:h-4" />}
                iconPosition="right"
                className="!rounded-full !px-3.5 sm:!px-4.5 lg:!px-5 !py-2 sm:!py-2.5 !text-xs sm:!text-[13px] lg:!text-sm font-semibold shadow-[0_4px_18px_rgba(255,122,24,0.3)] hover:shadow-[0_6px_22px_rgba(255,122,24,0.45)] whitespace-nowrap shrink-0 transition-all cursor-pointer"
              >
                <span className={isBn ? 'font-bn' : ''}>
                  {isBn ? 'প্রজেক্ট দেখুন' : 'Explore Projects'}
                </span>
              </FramerButton>

              <FramerButton
                variant="secondary"
                size="sm"
                onClick={handleAboutMe}
                icon={<ArrowRight className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-[#FF9238]" />}
                iconPosition="right"
                className="!rounded-full !px-3.5 sm:!px-4.5 lg:!px-5 !py-2 sm:!py-2.5 !text-xs sm:!text-[13px] lg:!text-sm font-semibold whitespace-nowrap shrink-0 hover:border-[#FFA053] hover:bg-[#1E140E] transition-all cursor-pointer"
              >
                <span className={isBn ? 'font-bn' : ''}>
                  {isBn ? 'আমার সম্পর্কে' : 'About Me'}
                </span>
              </FramerButton>
            </motion.div>
          </div>

          {/* Right Content Area: Status Card */}
          <div
            className="hidden lg:flex lg:col-span-5 xl:col-span-5 justify-end w-full max-w-sm sm:max-w-md lg:max-w-none lg:pl-6 xl:pl-12"
          >
            <motion.div 
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ y: -3, boxShadow: '0 4px 20px rgba(255, 102, 0, 0.15)' }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card p-5 sm:p-6 rounded-3xl w-full max-w-sm sm:max-w-md lg:max-w-[340px] xl:max-w-sm relative overflow-hidden bg-[#16100B] border border-[#FF7A18]/25 shadow-xl group hover:border-[#FF7A18]/50 transition-all duration-300 lg:ml-auto cursor-default hover:-translate-y-[3px] hover:shadow-[0_4px_20px_rgba(255,102,0,0.15)]"
            >
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-40 h-16 bg-[#FF7A18]/20 blur-xl pointer-events-none" />

              <div className="flex items-center justify-between gap-2 pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#22C55E]" />
                  </span>
                  <span className={`text-xs font-bold text-[#FAF6F0] ${isBn ? 'font-bn' : ''}`}>
                    {isBn ? 'বর্তমানে কাজ করছি' : 'Currently Building'}
                  </span>
                </div>

                <span className="text-[10px] font-bold text-[#FF7A18] px-2.5 py-0.5 rounded-full bg-[#1D140D] border border-[#FF7A18]/30">
                  Web • Design • AI
                </span>
              </div>

              <div className="py-3.5 space-y-2.5">
                <div className="flex items-center justify-between text-xs text-[#A9A39A]">
                  <span className="flex items-center gap-1.5 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#FF7A18] shrink-0" />
                    <span className={isBn ? 'font-bn' : ''}>{isBn ? 'অবস্থান:' : 'Base:'}</span>
                  </span>
                  <span className={`text-[#FAF6F0] font-semibold ${isBn ? 'font-bn' : ''}`}>
                    {isBn ? 'ঢাকা, বাংলাদেশ' : 'Dhaka, Bangladesh'}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-[#A9A39A]">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#FF7A18] shrink-0" />
                    <span className={isBn ? 'font-bn' : ''}>{isBn ? 'স্ট্যাটাস:' : 'Availability:'}</span>
                  </span>
                  <span className={`text-[#22C55E] font-semibold flex items-center gap-1 ${isBn ? 'font-bn' : ''}`}>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" />
                    <span>{isBn ? 'নতুন প্রজেক্টের জন্য উন্মুক্ত' : 'Available for Work'}</span>
                  </span>
                </div>

                <div className="pt-1 flex flex-wrap gap-1.5">
                  <span className="px-2.5 py-1 rounded-lg bg-[#120D09] hover:bg-[#1E140E] border border-white/10 hover:border-[#FFA053]/50 text-[11px] font-medium text-[#FAF6F0] hover:text-white flex items-center gap-1.5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_2px_12px_rgba(255,122,24,0.22)] cursor-default select-none group/tag">
                    <Palette className="w-3 h-3 text-[#FF7A18] group-hover/tag:text-[#FFA053] group-hover/tag:scale-110 transition-transform" />
                    <span>Graphic Art</span>
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-[#120D09] hover:bg-[#1E140E] border border-white/10 hover:border-[#FFA053]/50 text-[11px] font-medium text-[#FAF6F0] hover:text-white flex items-center gap-1.5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_2px_12px_rgba(255,122,24,0.22)] cursor-default select-none group/tag">
                    <Code2 className="w-3 h-3 text-[#FF7A18] group-hover/tag:text-[#FFA053] group-hover/tag:scale-110 transition-transform" />
                    <span>Full-Stack Web</span>
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-[#120D09] hover:bg-[#1E140E] border border-white/10 hover:border-[#FFA053]/50 text-[11px] font-medium text-[#FAF6F0] hover:text-white flex items-center gap-1.5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_2px_12px_rgba(255,122,24,0.22)] cursor-default select-none group/tag">
                    <Sparkles className="w-3 h-3 text-[#FF7A18] group-hover/tag:text-[#FFA053] group-hover/tag:scale-110 transition-transform" />
                    <span>AI Engineering</span>
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 grid grid-cols-2 gap-2">
                {/* High-contrast primary orange CTA: "যোগাযোগ" / "Contact" */}
                <button
                  type="button"
                  onClick={handleContact}
                  className="w-full py-2 px-2.5 rounded-xl bg-gradient-to-r from-[#FFA053] via-[#FF852E] to-[#F76707] hover:brightness-110 text-white text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer shadow-[0_4px_14px_rgba(255,122,24,0.35)] hover:shadow-[0_6px_20px_rgba(255,122,24,0.5)] active:scale-95 border border-white/30 hover:-translate-y-0.5"
                >
                  <Mail className="w-3.5 h-3.5 shrink-0" />
                  <span className={`truncate ${isBn ? 'font-bn' : ''}`}>{isBn ? 'যোগাযোগ' : 'Contact'}</span>
                </button>

                {/* Transparent ghost button with subtle border: "মেসেজ পাঠান" / "Send Message" */}
                <button
                  type="button"
                  onClick={() => {
                    const cleanNumber = (socials.whatsapp || '8801303623838').replace(/[^0-9]/g, '');
                    const msg = encodeURIComponent(isBn ? 'হ্যালো Masum 9T9! আমি আপনার সাথে একটি প্রজেক্ট নিয়ে কথা বলতে চাই।' : 'Hello Masum 9T9! I would like to discuss a project with you.');
                    window.open(`https://wa.me/${cleanNumber}?text=${msg}`, '_blank');
                  }}
                  className="w-full py-2 px-2.5 rounded-xl bg-transparent hover:bg-white/[0.06] border border-white/20 hover:border-white/40 text-[#FAF6F0] hover:text-white text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 hover:-translate-y-0.5"
                >
                  <Send className="w-3.5 h-3.5 text-[#FF9238] shrink-0" />
                  <span className={`truncate ${isBn ? 'font-bn' : ''}`}>{isBn ? 'মেসেজ পাঠান' : 'Send Message'}</span>
                </button>
              </div>

            </motion.div>
          </div>

        </div>

      </div>

      {/* Desktop Social Links & Shortcuts Bar */}
      <div className="hidden md:flex w-full max-w-7xl mx-auto relative z-20 pt-4 border-t border-white/10 flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A9A39A]">
        {/* Social Links */}
        <div className="flex items-center flex-wrap gap-2 sm:gap-2.5">
          <span className="uppercase tracking-wider text-[11px] text-[#A9A39A] font-semibold flex items-center gap-1.5 mr-1">
            <Sparkles className="w-3 h-3 text-[#FF7A18]" />
            <span className={isBn ? 'font-bn' : ''}>{isBn ? 'কানেক্ট:' : 'Connect:'}</span>
          </span>
          
          {/* Facebook */}
          <a 
            href={socials.facebook} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#16100B] hover:bg-[#1877F2]/20 border border-white/10 hover:border-[#1877F2]/50 text-[#FAF6F0] transition-all duration-200 hover:-translate-y-0.5 shadow-sm" 
            title="Facebook"
          >
            <Facebook className="w-3.5 h-3.5 text-[#1877F2]" />
            <span className="text-[11px] font-medium hidden xs:inline">Facebook</span>
          </a>

          {/* WhatsApp */}
          <a 
            href={socials.whatsapp ? socials.whatsapp : `tel:${socials.phone}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#16100B] hover:bg-[#25D366]/20 border border-white/10 hover:border-[#25D366]/50 text-[#FAF6F0] transition-all duration-200 hover:-translate-y-0.5 shadow-sm" 
            title="WhatsApp"
          >
            <Phone className="w-3.5 h-3.5 text-[#25D366]" />
            <span className="text-[11px] font-medium hidden xs:inline">WhatsApp</span>
          </a>

          {/* Telegram */}
          <a 
            href={socials.telegram} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#16100B] hover:bg-[#229ED9]/20 border border-white/10 hover:border-[#229ED9]/50 text-[#FAF6F0] transition-all duration-200 hover:-translate-y-0.5 shadow-sm" 
            title="Telegram"
          >
            <Send className="w-3.5 h-3.5 text-[#229ED9]" />
            <span className="text-[11px] font-medium hidden xs:inline">Telegram</span>
          </a>

          {/* YouTube */}
          <a 
            href={socials.youtube} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#16100B] hover:bg-[#FF0000]/20 border border-white/10 hover:border-[#FF0000]/50 text-[#FAF6F0] transition-all duration-200 hover:-translate-y-0.5 shadow-sm" 
            title="YouTube"
          >
            <Youtube className="w-3.5 h-3.5 text-[#FF0000]" />
            <span className="text-[11px] font-medium hidden xs:inline">YouTube</span>
          </a>

          {/* GitHub */}
          <a 
            href={socials.github || "https://github.com/masum-9t9/"} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#16100B] hover:bg-white/20 border border-white/10 hover:border-white/50 text-[#FAF6F0] transition-all duration-200 hover:-translate-y-0.5 shadow-sm" 
            title="GitHub"
          >
            <Github className="w-3.5 h-3.5 text-white" />
            <span className="text-[11px] font-medium hidden xs:inline">GitHub</span>
          </a>
        </div>

        {/* Keyboard Shortcuts Trigger */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenKeymapping}
            className="hover:text-[#FAF6F0] flex items-center gap-1.5 transition-colors cursor-pointer px-3 py-1.5 rounded-full bg-[#16100B] hover:bg-[#1D140D] border border-white/10 hover:border-[#FF7A18]/30"
          >
            <Keyboard className="w-3.5 h-3.5 text-[#FF7A18]" />
            <span className="text-[11px]">Shortcuts</span>
            <span className="font-mono text-[9px] bg-white/10 px-1 py-0.5 rounded border border-white/10 font-bold">?</span>
          </button>
        </div>
      </div>

    </section>
  );
};



