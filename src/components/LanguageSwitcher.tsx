import React from 'react';
import { motion } from 'motion/react';
import { Globe, Languages, Check } from 'lucide-react';
import { useLanguage, Language } from '../context/LanguageContext';
import { UI_TRANSLATIONS } from '../data/translations';

interface LanguageSwitcherProps {
  variant?: 'dock' | 'pill' | 'dropdown' | 'compact';
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = 'dock',
  className = '',
}) => {
  const { language, setLanguage, toggleLanguage } = useLanguage();
  const t = UI_TRANSLATIONS[language];
  const [isOpen, setIsOpen] = React.useState(false);

  const isBn = language === 'bn';

  if (variant === 'dropdown') {
    return (
      <div className={`relative inline-block text-left ${className}`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#181511] hover:bg-[#211D17] border border-[#C7A77D]/30 hover:border-[#C7A77D] text-xs font-bold text-[#F1E8DC] transition-all shadow-sm active:scale-95"
          aria-expanded={isOpen}
          aria-label="Select Language"
        >
          <Languages className="w-3.5 h-3.5 text-[#C7A77D]" />
          <span>{isBn ? 'BD বাংলা' : 'US English'}</span>
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-36 rounded-xl bg-[#12100D] border border-[#C7A77D]/30 shadow-2xl py-1 z-50 overflow-hidden backdrop-blur-xl">
            <button
              onClick={() => {
                setLanguage('bn');
                setIsOpen(false);
              }}
              className={`w-full text-left px-3.5 py-2 text-xs font-bold flex items-center justify-between transition-colors ${
                isBn ? 'bg-[#C7A77D]/15 text-[#DFC29A]' : 'text-[#B8AA98] hover:bg-[#181511] hover:text-[#F1E8DC]'
              }`}
            >
              <span className="flex items-center gap-2">🇧🇩 বাংলা</span>
              {isBn && <Check className="w-3.5 h-3.5 text-[#C7A77D]" />}
            </button>
            <button
              onClick={() => {
                setLanguage('en');
                setIsOpen(false);
              }}
              className={`w-full text-left px-3.5 py-2 text-xs font-bold flex items-center justify-between transition-colors ${
                !isBn ? 'bg-[#C7A77D]/15 text-[#DFC29A]' : 'text-[#B8AA98] hover:bg-[#181511] hover:text-[#F1E8DC]'
              }`}
            >
              <span className="flex items-center gap-2">🇺🇸 English</span>
              {!isBn && <Check className="w-3.5 h-3.5 text-[#C7A77D]" />}
            </button>
          </div>
        )}
      </div>
    );
  }

  // 'dock' & 'pill' & 'compact' variants
  return (
    <div className={`relative group shrink-0 ${className}`}>
      <motion.button
        onClick={toggleLanguage}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`relative flex items-center gap-1 xs:gap-1.5 px-2.5 xs:px-3 py-1 xs:py-1.5 rounded-full text-xs font-extrabold transition-all duration-200 select-none shadow-md ${
          isBn
            ? 'bg-[#181511] border border-[#C7A77D]/40 text-[#DFC29A] hover:border-[#DFC29A] hover:text-white'
            : 'bg-[#181511] border border-[#C7A77D]/30 text-[#B8AA98] hover:border-[#C7A77D] hover:text-white'
        }`}
        aria-label={t.switchLanguageTooltip}
        title={t.switchLanguageTooltip}
      >
        <Globe className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-45 text-[#C7A77D]" />
        
        <div className="flex items-center gap-1">
          <span className="text-[10px] xs:text-[11px] font-black uppercase tracking-wider">
            <span className="inline sm:hidden">{isBn ? 'BD' : 'EN'}</span>
            <span className="hidden sm:inline">{isBn ? '🇧🇩 বাংলা' : '🇺🇸 EN'}</span>
          </span>
        </div>

        {/* Subtle glowing pill indicator */}
        <span
          className="w-1.5 h-1.5 rounded-full animate-pulse ml-0.5 bg-[#C7A77D] shadow-[0_0_8px_#C7A77D]"
        />
      </motion.button>

      {/* Floating Tooltip */}
      <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-[#181511]/95 border border-[#C7A77D]/30 text-[#F1E8DC] text-[11px] font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-50 shadow-xl backdrop-blur-md">
        {t.switchLanguageTooltip}
      </div>
    </div>
  );
};
