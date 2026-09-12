import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageCircleMore, 
  Sparkles, 
  SendHorizontal, 
  PhoneCall, 
  X, 
  ArrowUpRight, 
  Radio, 
  ChevronRight,
  Clock
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface DesktopContactButtonProps {
  whatsappNumber?: string;
  facebookUrl?: string;
  telegramUrl?: string;
  phone?: string;
  onNavigateToContact?: () => void;
}

const containerVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 16, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 380,
      damping: 24,
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.94,
    y: 12,
    filter: 'blur(6px)',
    transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 14, y: 4 },
  visible: { 
    opacity: 1, 
    x: 0, 
    y: 0, 
    transition: { type: 'spring', stiffness: 450, damping: 26 } 
  },
  exit: { opacity: 0, x: 10, transition: { duration: 0.15 } },
};

export const DesktopContactButton: React.FC<DesktopContactButtonProps> = ({
  whatsappNumber = '8801303623838',
  facebookUrl = 'https://www.facebook.com/masum.9t9.official',
  telegramUrl = 'https://t.me/masum_9t9_official',
  phone = '+880 1303-623838',
  onNavigateToContact,
}) => {
  const { language } = useLanguage();
  const isBn = language === 'bn';
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const cleanWhatsapp = whatsappNumber.replace(/[^0-9]/g, '');

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    // 220ms grace delay so moving cursor between button and popup feels smooth without accidental closing
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 220);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, [isOpen]);

  const handleOpenContact = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    setIsOpen(false);
    if (onNavigateToContact) {
      onNavigateToContact();
    } else {
      const element = document.getElementById('contact');
      if (element) {
        const yOffset = -70;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  const handleToggleClick = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="hidden lg:flex fixed bottom-7 right-7 z-[90] flex-col items-end pointer-events-auto"
    >
      {/* Minimal Popout Quick Connect Hub */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="mb-2 p-3.5 rounded-2xl bg-[#150F0B]/98 border border-white/10 shadow-xl backdrop-blur-xl flex flex-col gap-2.5 min-w-[270px] sm:min-w-[300px] relative"
          >
            {/* Header: Profile status & Close button */}
            <div className="flex items-center justify-between pb-2.5 border-b border-white/10 relative z-10">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-8.5 h-8.5 rounded-full overflow-hidden border border-white/15 bg-[#1D140D] p-0.5">
                    <img
                      src="https://i.postimg.cc/bYQL7Lvj/Profile-pic-(3).png"
                      alt="Masum 9T9"
                      className="w-full h-full object-cover object-top rounded-full"
                    />
                  </div>
                  {/* Clean green status dot */}
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#22C55E] border-2 border-[#150F0B]" />
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-[#FAF6F0] tracking-tight">Masum 9T9</span>
                    <span className="px-1.5 py-0.2 rounded-full bg-white/5 border border-white/10 text-[9px] font-medium text-[#A9A39A]">PRO</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-[#22C55E] font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                    <span className={isBn ? 'font-bn' : ''}>{isBn ? 'অনলাইনে সক্রিয়' : 'Available for Projects'}</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-6 h-6 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[#A9A39A] hover:text-[#FAF6F0] flex items-center justify-center transition-all cursor-pointer"
                title={isBn ? 'বন্ধ করুন' : 'Close'}
              >
                <X className="w-3 h-3" />
              </button>
            </div>

            {/* Quick Response Notice */}
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.03] border border-white/5 text-[10.5px] text-[#A9A39A] relative z-10">
              <Clock className="w-3 h-3 text-[#FF7A18] shrink-0" />
              <span className={isBn ? 'font-bn' : ''}>
                {isBn ? 'গড় রেসপন্স টাইম: ১০-১৫ মিনিট' : 'Typically replies within 15 minutes'}
              </span>
            </div>

            {/* Channels List */}
            <div className="flex flex-col gap-1.5 relative z-10">
              {/* WhatsApp Option */}
              <motion.a
                variants={itemVariants}
                href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(isBn ? 'হ্যালো মাসুম ভাই, আমি আপনার ওয়েবসাইট থেকে নক দিয়েছি।' : 'Hi Masum, I reached out from your portfolio website.')}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="group flex items-center justify-between p-2 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-[#25D366]/40 transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#25D366]/10 border border-[#25D366]/20 flex items-center justify-center text-[#25D366]">
                    <i className="fa-brands fa-whatsapp text-base" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-[#FAF6F0] group-hover:text-[#25D366] transition-colors">
                      WhatsApp Chat
                    </span>
                    <span className={`text-[9.5px] text-[#8E877D] ${isBn ? 'font-bn' : ''}`}>
                      {isBn ? 'দ্রুত চ্যাট ও তাৎক্ষণিক কোটেশন' : 'Fastest response & direct quote'}
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#A9A39A] group-hover:text-[#25D366] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.a>

              {/* Telegram Option */}
              <motion.a
                variants={itemVariants}
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="group flex items-center justify-between p-2 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-[#229ED9]/40 transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#229ED9]/10 border border-[#229ED9]/20 flex items-center justify-center text-[#229ED9]">
                    <i className="fa-brands fa-telegram text-base" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-[#FAF6F0] group-hover:text-[#229ED9] transition-colors">
                      Telegram
                    </span>
                    <span className={`text-[9.5px] text-[#8E877D] ${isBn ? 'font-bn' : ''}`}>
                      {isBn ? 'সরাসরি মেসেজ ও বড় ফাইল' : 'Direct discussion & files'}
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#A9A39A] group-hover:text-[#229ED9] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.a>

              {/* Direct Inquiry / Form */}
              <motion.button
                variants={itemVariants}
                type="button"
                onClick={handleOpenContact}
                className="group flex items-center justify-between p-2 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-[#FF7A18]/40 transition-all cursor-pointer text-left"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#FF7A18]/10 border border-[#FF7A18]/20 flex items-center justify-center text-[#FF7A18]">
                    <SendHorizontal className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-[#FAF6F0] group-hover:text-[#FFA053] transition-colors flex items-center gap-1">
                      <span className={isBn ? 'font-bn' : ''}>{isBn ? 'কনসাল্টেশন ফরম' : 'Project Inquiry Form'}</span>
                    </span>
                    <span className={`text-[9.5px] text-[#8E877D] ${isBn ? 'font-bn' : ''}`}>
                      {isBn ? 'প্রজেক্টের বিবরণ জমা দিন' : 'Send project details & brief'}
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-[#A9A39A] group-hover:text-[#FF7A18] group-hover:translate-x-0.5 transition-transform" />
              </motion.button>
            </div>

            {/* Direct Phone Call Footer */}
            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10.5px] text-[#8E877D] px-1 relative z-10">
              <span className="flex items-center gap-1.5">
                <PhoneCall className="w-3 h-3 text-[#FF7A18]" />
                <span className={isBn ? 'font-bn' : ''}>{isBn ? 'কল:' : 'Call:'}</span>
              </span>
              <a
                href={`tel:${phone}`}
                className="text-[#FAF6F0] font-medium hover:text-[#FFA053] transition-colors"
              >
                {phone}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Minimal, Sleek Trigger Button with NO Glow */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className="relative cursor-pointer select-none"
      >
        <button
          type="button"
          onClick={handleToggleClick}
          className={`relative flex items-center gap-2.5 px-3.5 py-2 rounded-full backdrop-blur-xl transition-all duration-200 border cursor-pointer ${
            isOpen
              ? 'bg-[#1C140E] border-[#FF7A18]/50 text-white shadow-md'
              : 'bg-[#140E0A]/95 hover:bg-[#1A120C] border-white/10 hover:border-[#FF7A18]/30 text-[#FAF6F0] shadow-md'
          }`}
          title={isBn ? 'যোগাযোগ করুন' : 'Contact Options'}
        >
          {/* Minimal Icon Badge */}
          <div className="relative flex items-center justify-center">
            <div className="w-6.5 h-6.5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#FF7A18]">
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="w-3.5 h-3.5 text-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="msg"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <MessageCircleMore className="w-3.5 h-3.5 text-[#FF7A18]" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Tiny green presence dot (no ping) */}
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#22C55E] border border-[#140E0A]" />
          </div>

          {/* Clean Text Label */}
          <span className={`text-[12px] font-semibold text-[#FAF6F0] tracking-tight ${isBn ? 'font-bn' : ''}`}>
            {isBn ? 'যোগাযোগ করুন' : 'Contact'}
          </span>
        </button>
      </motion.div>
    </div>
  );
};
export default DesktopContactButton;
