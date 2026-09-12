import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Layers, Link2, Globe, Smartphone, Sparkles, Code2, Copy, Check, User } from 'lucide-react';
import { FeaturedEcosystemItem } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { UI_TRANSLATIONS } from '../data/translations';
import { copyToClipboard, getProjectShareUrl } from '../utils/clipboard';

interface FeaturedEcosystemProps {
  items?: FeaturedEcosystemItem[];
  onOpenCreatorProfile?: () => void;
  hideHeader?: boolean;
}

interface EcosystemCardProps {
  item: FeaturedEcosystemItem;
  isReversed?: boolean;
  onOpenCreatorProfile?: () => void;
}

const EcosystemCard: React.FC<EcosystemCardProps> = ({ item, isReversed = false, onOpenCreatorProfile }) => {
  const { language } = useLanguage();
  const t = UI_TRANSLATIONS[language];
  const [isCopied, setIsCopied] = useState(false);

  const gallery = item.galleryImages && item.galleryImages.length > 0
    ? item.galleryImages
    : ["https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200"];

  const [activeImage, setActiveImage] = useState<string>(gallery[0]);

  const handleCopyLink = async () => {
    const url = getProjectShareUrl(item.id, item.mainUrl);
    const success = await copyToClipboard(url);
    if (success) {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4 }}
      className="bg-[#12100D] border border-[#C7A77D]/20 rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden group hover:border-[#C7A77D]/40 transition-all duration-300"
    >
      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
        
        {/* Gallery Screenshot Viewer Box */}
        <div className={`lg:col-span-6 space-y-4 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
          <div className="relative mx-auto w-full group/macbook select-none">
            
            {/* Frame Container */}
            <div className="relative bg-[#181511] border border-[#C7A77D]/30 rounded-t-[20px] sm:rounded-t-[26px] p-2 sm:p-3 pb-1.5 sm:pb-2.5 shadow-2xl">
              
              <div className="relative aspect-[16/10] rounded-lg sm:rounded-xl overflow-hidden bg-[#0B0A08] border border-[#C7A77D]/20 shadow-2xl group/screen">
                
                {/* Top Notch Bar */}
                <div className="absolute top-0 inset-x-0 h-5 sm:h-6 bg-[#0B0A08]/90 backdrop-blur-md z-20 flex items-center justify-between px-2.5 sm:px-3 border-b border-[#C7A77D]/15 text-[9px] sm:text-[10px] text-[#B8AA98] font-medium">
                  <div className="flex items-center gap-1.5 sm:gap-2 z-30">
                    <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-[#C7A77D]/40" />
                    <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-[#C7A77D]/30" />
                    <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-[#C7A77D]/20" />
                  </div>

                  <div className="flex items-center gap-1.5 font-mono text-[9px] sm:text-[10px] text-[#DFC29A] bg-[#181511] px-2 py-0.5 rounded-full border border-[#C7A77D]/20">
                    <span className="text-[#F1E8DC] truncate max-w-[120px] sm:max-w-[200px]">{item.mainUrl || 'https://www.9t9.pro.bd'}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-[8px] sm:text-[9px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C7A77D] animate-pulse" />
                    <span className="hidden sm:inline text-[#DFC29A] font-semibold">Live</span>
                  </div>
                </div>

                {/* Screenshot Image */}
                <motion.img
                  key={activeImage}
                  initial={{ opacity: 0.85, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  src={activeImage}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200";
                  }}
                  className="w-full h-full object-cover object-top pt-5 sm:pt-6 group-hover/screen:scale-[1.02] transition-transform duration-500 ease-out"
                />
              </div>

              <div className="mt-1 flex items-center justify-center">
                <span className="text-[8px] sm:text-[9.5px] font-bold tracking-[0.25em] uppercase text-[#B8AA98]/60 select-none">
                  MASUM 9T9 ECOSYSTEM
                </span>
              </div>
            </div>

            <div className="relative h-3 sm:h-4 bg-[#181511] rounded-b-[12px] sm:rounded-b-[16px] border-t border-[#C7A77D]/30 shadow-md flex items-center justify-center" />
          </div>

          {/* Thumbnail Strip */}
          {gallery.length > 1 && (
            <div className="flex items-center justify-center gap-3 pt-1">
              {gallery.map((imgUrl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImage(imgUrl)}
                  className={`relative w-20 sm:w-24 aspect-video rounded-xl overflow-hidden border-2 transition-all duration-200 bg-[#0B0A08] cursor-pointer ${
                    activeImage === imgUrl
                      ? 'border-[#C7A77D] scale-105 shadow-md'
                      : 'border-[#C7A77D]/20 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`Thumbnail ${idx + 1}`}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content Details Box */}
        <div className={`lg:col-span-6 space-y-6 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#181511] border border-[#C7A77D]/30 text-[11px] font-bold tracking-wider text-[#DFC29A] uppercase">
                {item.badge}
              </span>
              {item.designVersion && (
                <span className="px-2.5 py-0.5 rounded-full bg-[#181511] border border-[#C7A77D]/25 text-[10px] font-bold text-[#DFC29A] flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#C7A77D]" />
                  <span>{item.designVersion}</span>
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyLink}
                className={`p-2.5 rounded-full border transition-all shadow-md flex items-center justify-center cursor-pointer ${
                  isCopied
                    ? 'bg-[#181511] border-[#C7A77D] text-[#DFC29A]'
                    : 'bg-[#181511] hover:bg-[#211D17] text-[#B8AA98] hover:text-[#F1E8DC] border-[#C7A77D]/20'
                }`}
                title={isCopied ? (language === 'bn' ? 'কপি হয়েছে!' : 'Copied!') : (language === 'bn' ? 'প্রজেক্ট লিংক কপি করুন' : 'Copy Project Link')}
              >
                {isCopied ? <Check className="w-4 h-4 text-[#C7A77D]" /> : <Copy className="w-4 h-4 text-[#C7A77D]" />}
              </button>

              {item.mainUrl && (
                <a
                  href={item.mainUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-[#181511] hover:bg-[#211D17] text-[#B8AA98] hover:text-[#F1E8DC] border border-[#C7A77D]/20 hover:border-[#C7A77D]/50 transition-all shadow-md"
                  title={t.ecosystem.visitWebsite}
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              type="button"
              onClick={onOpenCreatorProfile}
              className="px-3 py-1 rounded-xl bg-[#181511] border border-[#C7A77D]/25 text-[11px] font-semibold text-[#B8AA98] hover:text-[#F1E8DC] transition-all flex items-center gap-1.5 shadow-sm group cursor-pointer"
            >
              <User className="w-3.5 h-3.5 text-[#C7A77D]" />
              <span>UI-UX Designer:</span>
              <strong className="text-[#DFC29A] font-bold">{item.uiuxDesignerName || 'Masum 9T9'}</strong>
            </button>

            <button
              type="button"
              onClick={onOpenCreatorProfile}
              className="px-3 py-1 rounded-xl bg-[#181511] border border-[#C7A77D]/25 text-[11px] font-semibold text-[#B8AA98] hover:text-[#F1E8DC] transition-all flex items-center gap-1.5 shadow-sm group cursor-pointer"
            >
              <Code2 className="w-3.5 h-3.5 text-[#C7A77D]" />
              <span>Developer:</span>
              <strong className="text-[#DFC29A] font-bold">{item.developerName || 'Masum 9T9'}</strong>
            </button>
          </div>

          <div className="p-3 rounded-2xl bg-[#181511] border border-[#C7A77D]/20">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-[10px] font-bold tracking-wider uppercase text-[#DFC29A] flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-[#C7A77D]" />
                <span>{language === 'bn' ? 'কমপ্লিশন প্রগ্রেস' : 'Completion Progress'}</span>
              </span>
              <span className="text-xs font-bold text-[#DFC29A] font-mono flex items-center gap-1">
                <span>{item.completionProgress || 100}%</span>
              </span>
            </div>
            <div className="w-full h-2 bg-[#0B0A08] rounded-full overflow-hidden p-[1px] border border-[#C7A77D]/15">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${item.completionProgress || 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full rounded-full bg-[#C7A77D]"
              />
            </div>
          </div>

          <h3 className="text-2xl sm:text-4xl font-bold text-[#F1E8DC] tracking-tight leading-snug">
            {item.title}
          </h3>

          {item.stats && item.stats.length > 0 && (
            <div className="flex flex-wrap items-center gap-3">
              {item.stats.map((st, sIdx) => (
                <div
                  key={sIdx}
                  className="bg-[#181511] border border-[#C7A77D]/20 rounded-2xl px-4 py-2.5 flex-1 min-w-[120px] max-w-[200px]"
                >
                  <p className="text-[10px] font-bold tracking-wider text-[#B8AA98] uppercase mb-0.5">
                    {st.label}
                  </p>
                  <p className="text-base sm:text-lg font-bold text-[#F1E8DC] tracking-tight">
                    {st.value}
                  </p>
                </div>
              ))}
            </div>
          )}

          <p className="text-[#B8AA98] text-sm leading-relaxed font-normal">
            {item.description}
          </p>

          {item.keyFeatures && item.keyFeatures.length > 0 && (
            <div className="bg-[#181511] border border-[#C7A77D]/20 rounded-2xl p-4 sm:p-5 space-y-3">
              <h4 className="text-xs font-bold text-[#DFC29A] uppercase tracking-wider flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#C7A77D]" />
                <span>KEY FEATURES</span>
              </h4>

              <ul className="space-y-2 text-xs sm:text-sm text-[#F1E8DC]">
                {item.keyFeatures.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-2 leading-snug">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C7A77D] shrink-0 mt-1.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {item.links && item.links.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-xs font-bold text-[#B8AA98] uppercase tracking-wider mr-2 flex items-center gap-1">
                <Link2 className="w-3.5 h-3.5 text-[#C7A77D]" />
                <span>LINKS:</span>
              </span>

              {item.links.map((link, lIdx) => (
                <a
                  key={lIdx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#181511] hover:bg-[#211D17] text-[#B8AA98] hover:text-[#F1E8DC] border border-[#C7A77D]/20 hover:border-[#C7A77D]/40 text-xs font-bold transition-all"
                >
                  {link.type === 'android' || link.type === 'playstore' ? (
                    <Smartphone className="w-3.5 h-3.5 text-[#C7A77D]" />
                  ) : (
                    <Globe className="w-3.5 h-3.5 text-[#C7A77D]" />
                  )}
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          )}

        </div>

      </div>
    </motion.div>
  );
};

export const FeaturedEcosystem: React.FC<FeaturedEcosystemProps> = ({ items, onOpenCreatorProfile, hideHeader = false }) => {
  const { language } = useLanguage();
  const t = UI_TRANSLATIONS[language];

  if (!items || items.length === 0) return null;

  return (
    <section id="ecosystem" className={hideHeader ? "relative py-4" : "py-14 sm:py-24 px-3.5 sm:px-6 lg:px-8 relative overflow-hidden bg-[#0B0A08]"}>
      <div className={hideHeader ? "space-y-6" : "max-w-7xl mx-auto relative z-10 space-y-8 sm:space-y-12"}>
        {!hideHeader && (
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181511] border border-[#C7A77D]/30 text-xs text-[#DFC29A] font-bold mb-3 sm:mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#C7A77D]" />
              <span>{t.ecosystem.badge}</span>
            </div>
            <h2 className="text-2xl sm:text-5xl font-bold text-[#F1E8DC] tracking-tight mb-3 sm:mb-4">
              <span className="text-gradient-champagne">{t.ecosystem.title}</span>
            </h2>
            <p className="text-[#B8AA98] text-xs sm:text-base font-normal max-w-xl mx-auto">
              {t.ecosystem.subtitle}
            </p>
          </div>
        )}

        <div className="space-y-6 sm:space-y-10">
          {items.map((item, index) => (
            <EcosystemCard key={item.id} item={item} isReversed={index % 2 !== 0} onOpenCreatorProfile={onOpenCreatorProfile} />
          ))}
        </div>
      </div>
    </section>
  );
};
