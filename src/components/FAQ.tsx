import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown, Search } from 'lucide-react';
import { FAQItem } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { UI_TRANSLATIONS } from '../data/translations';

interface FAQProps {
  faqs: FAQItem[];
}

export const FAQ: React.FC<FAQProps> = ({ faqs }) => {
  const { language } = useLanguage();
  const t = UI_TRANSLATIONS[language];

  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="faq" className="py-16 sm:py-28 px-4 sm:px-6 lg:px-8 relative bg-[#0B0A08] border-t border-b border-[#C7A77D]/15">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#181511] border border-[#C7A77D]/30 text-xs text-[#DFC29A] font-extrabold uppercase tracking-widest mb-3 shadow-sm">
            <HelpCircle className="w-3.5 h-3.5 text-[#C7A77D]" />
            <span>{t.faq.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bebas tracking-wide text-[#F1E8DC] uppercase mb-4">
            <span className="bg-gradient-to-r from-[#F1E8DC] via-[#DFC29A] to-[#C7A77D] bg-clip-text text-transparent">{t.faq.title}</span>
          </h2>
          <p className="text-[#B8AA98] text-sm sm:text-base font-normal">
            {t.faq.subtitle}
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-[#C7A77D] to-[#DFC29A] mx-auto rounded-full mt-4" />
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B8AA98]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.faq.searchPlaceholder}
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#12100D] border border-[#C7A77D]/20 text-[#F1E8DC] placeholder-[#B8AA98]/50 text-xs focus:outline-none focus:border-[#C7A77D] transition-colors shadow-inner"
          />
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className="glass-card rounded-2xl border border-[#C7A77D]/20 bg-[#12100D] overflow-hidden transition-colors hover:border-[#C7A77D]/40"
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                >
                  <span className="text-base sm:text-lg font-bold text-[#F1E8DC] flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#C7A77D] shrink-0" />
                    <span>{faq.question}</span>
                  </span>
                  <div className={`p-2 rounded-lg bg-[#181511] border border-[#C7A77D]/30 text-[#DFC29A] transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#C7A77D]' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 pt-2 text-xs sm:text-sm text-[#B8AA98] leading-relaxed border-t border-[#C7A77D]/15">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div className="text-center py-12 text-[#B8AA98] text-sm">
              {language === 'bn' ? 'কোনো প্রশ্ন পাওয়া যায়নি। সরাসরি ইমেইল বা হোয়াটসঅ্যাপে যোগাযোগ করুন।' : 'No matching questions found. Contact directly via email or WhatsApp.'}
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
