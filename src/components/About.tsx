import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Target, Compass, Award, GraduationCap, Download, FileText, CheckCircle, X, Sparkles, Eye, Loader2 } from 'lucide-react';
import { AboutData, TestimonialItem } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { UI_TRANSLATIONS } from '../data/translations';
import { viewResume, downloadResume } from '../utils/resume';

interface AboutProps {
  data: AboutData;
  testimonials?: TestimonialItem[];
}

const toBengaliNumerals = (numStr: string | number): string => {
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(numStr).replace(/\d/g, (d) => bnDigits[parseInt(d, 10)]);
};

export const About: React.FC<AboutProps> = ({ data, testimonials }) => {
  const { language } = useLanguage();
  const t = UI_TRANSLATIONS[language];
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [downloadingLang, setDownloadingLang] = useState<'bn' | 'en' | null>(null);

  const handleDownload = (lang: 'bn' | 'en') => {
    setDownloadingLang(lang);
    setTimeout(() => {
      downloadResume(lang);
      setTimeout(() => {
        setDownloadingLang(null);
      }, 700);
    }, 150);
  };

  // Dynamic average rating from all reviews
  const dynamicAvgRating = React.useMemo(() => {
    if (!testimonials || testimonials.length === 0) return '5.0';
    const sum = testimonials.reduce((acc, t) => acc + (Number(t.rating) || 5), 0);
    return (sum / testimonials.length).toFixed(1);
  }, [testimonials]);

  return (
    <section id="about" className="py-16 sm:py-28 px-3.5 sm:px-6 lg:px-8 relative bg-[#0E0A07] border-t border-b border-[#FF7A18]/20">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1D140D] border border-[#FF7A18]/30 text-xs text-[#FF7A18] font-bold uppercase tracking-wider mb-3 sm:mb-4 shadow-md">
            <User className="w-3.5 h-3.5 text-[#FF7A18]" />
            <span>{data.title}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#FAF6F0] uppercase mb-3 sm:mb-4 tracking-tight">
            <span>{data.subtitle}</span>
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-[#FF7A18] mx-auto rounded-full" />
        </motion.div>

        {/* Highlights Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-6 mb-12 sm:mb-20">
          {(data?.highlights || []).map((item, idx) => {
            let displayVal = item.value;
            if (item.label === 'রেটিং' || item.label === 'Rating') {
              displayVal = language === 'bn'
                ? `${toBengaliNumerals(dynamicAvgRating)} / ৫.০`
                : `${dynamicAvgRating} / 5.0`;
            }

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="glass-card p-5 sm:p-7 rounded-2xl border border-[#FF7A18]/25 text-center relative overflow-hidden group bg-[#16100B] shadow-xl"
              >
                <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-[#FF7A18]/10 rounded-full blur-xl group-hover:bg-[#FF7A18]/20 transition-all pointer-events-none" />
                <p className="text-3xl xs:text-4xl sm:text-5xl font-black text-[#FF7A18] mb-1 truncate">
                  {displayVal}
                </p>
                <p className="text-[11px] sm:text-xs text-[#A9A39A] font-bold uppercase tracking-wider truncate">{item.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10">
          
          {/* Story & Vision (Left Column - 7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6 sm:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="glass-card p-6 sm:p-10 rounded-3xl border border-[#FF7A18]/25 bg-[#16100B] shadow-2xl"
            >
              <h3 className="text-2xl font-extrabold text-[#FAF6F0] mb-4 flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[#221710] border border-[#FF7A18]/30 text-[#FF7A18]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span>{t.about.storyHeading}</span>
              </h3>
              <p className="text-sm sm:text-base text-[#A9A39A] leading-relaxed mb-6 font-normal">
                {data.bio}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[#120D09] border border-white/10">
                  <div className="flex items-center gap-2.5 text-sm font-bold text-[#FAF6F0] mb-2">
                    <Target className="w-4 h-4 text-[#FF7A18]" />
                    <span>{language === 'bn' ? 'টার্গেট অডিয়েন্স' : 'Target Audience'}</span>
                  </div>
                  <p className="text-xs text-[#A9A39A] leading-relaxed">
                    {data.targetAudience || 'Content creators, brands, and businesses seeking high-conversion visuals and high-speed web apps.'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#120D09] border border-white/10">
                  <div className="flex items-center gap-2.5 text-sm font-bold text-[#FAF6F0] mb-2">
                    <Compass className="w-4 h-4 text-[#FF7A18]" />
                    <span>{t.about.visionHeading}</span>
                  </div>
                  <p className="text-xs text-[#A9A39A] leading-relaxed">
                    {data.creativeVision || 'Crafting authentic, eye-stopping graphics and seamless digital experiences that elevate brand authority.'}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Resume / CV Section with Fiery Amber theme */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3"
            >
              <div className="flex flex-wrap items-center justify-between sm:justify-start gap-2 bg-[#16100B] p-2 rounded-2xl border border-[#FF7A18]/30 shadow-xl w-full sm:w-auto">
                <span className="text-xs font-bold text-[#A9A39A] px-1 flex items-center gap-1.5 w-full sm:w-auto mb-1 sm:mb-0">
                  <Eye className="w-4 h-4 text-[#FF7A18]" />
                  <span>{language === 'bn' ? 'দেখুন:' : 'View:'}</span>
                </span>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => viewResume('bn')}
                    className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-[#120D09] hover:bg-[#FF7A18] hover:text-white text-[#FAF6F0] text-xs font-bold border border-white/10 transition-all text-center cursor-pointer"
                    title="View Bangla Resume in a new tab"
                  >
                    🇧🇩 বাংলা
                  </button>
                  <button
                    onClick={() => viewResume('en')}
                    className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-[#120D09] hover:bg-[#FF7A18] hover:text-white text-[#FAF6F0] text-xs font-bold border border-white/10 transition-all text-center cursor-pointer"
                    title="View English Resume in a new tab"
                  >
                    🇬🇧 English
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between sm:justify-start gap-2 bg-gradient-to-r from-[#FF7A18] to-[#E8590C] p-2 rounded-2xl shadow-lg shadow-[#FF7A18]/25 w-full sm:w-auto text-white">
                <span className="text-xs font-black text-white px-1 flex items-center gap-1.5 w-full sm:w-auto mb-1 sm:mb-0">
                  <Download className="w-4 h-4 text-white" />
                  <span>{language === 'bn' ? 'ডাউনলোড:' : 'Download:'}</span>
                </span>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => handleDownload('bn')}
                    disabled={downloadingLang === 'bn'}
                    className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-black/30 hover:bg-black/50 text-white text-xs font-bold transition-all border border-white/20 flex items-center justify-center gap-1.5 disabled:opacity-80 cursor-pointer disabled:cursor-wait"
                    title="Download Bangla Resume"
                  >
                    {downloadingLang === 'bn' ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                    ) : null}
                    <span>🇧🇩 বাংলা</span>
                  </button>
                  <button
                    onClick={() => handleDownload('en')}
                    disabled={downloadingLang === 'en'}
                    className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-black/30 hover:bg-black/50 text-white text-xs font-bold transition-all border border-white/20 flex items-center justify-center gap-1.5 disabled:opacity-80 cursor-pointer disabled:cursor-wait"
                    title="Download English Resume"
                  >
                    {downloadingLang === 'en' ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                    ) : null}
                    <span>🇬🇧 English</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Education & Certification Timeline (Right Column - 5 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-[#FF7A18]/25 h-full flex flex-col shadow-2xl relative bg-[#16100B]">
              <h3 className="text-2xl font-extrabold text-[#FAF6F0] mb-6 flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[#221710] border border-[#FF7A18]/30 text-[#FF7A18]">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <span>{t.about.educationHeading}</span>
              </h3>

              <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-[#FF7A18]/20">
                {(data?.education || []).map((edu, idx) => (
                  <div key={idx} className="relative pl-8">
                    <div className="absolute left-1.5 top-1.5 w-4 h-4 rounded-full bg-[#FF7A18] ring-4 ring-[#16100B] flex items-center justify-center shadow-[0_0_10px_#FF7A18]">
                      <div className="w-1.5 h-1.5 bg-white rounded-full" />
                    </div>
                    <span className="text-xs font-bold text-[#FF7A18] bg-[#221710] px-3 py-1 rounded-full border border-[#FF7A18]/30">
                      {edu.year}
                    </span>
                    <h4 className="text-lg font-extrabold text-[#FAF6F0] mt-2">{edu.degree}</h4>
                    <p className="text-xs font-semibold text-[#A9A39A] mb-2">{edu.institution}</p>
                    <p className="text-xs text-[#A9A39A] leading-relaxed">{edu.details}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>

      </div>

      {/* Resume Modal */}
      <AnimatePresence>
        {showResumeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#16100B] border border-[#FF7A18]/30 rounded-3xl p-6 max-w-lg w-full shadow-2xl relative"
            >
              <button
                onClick={() => setShowResumeModal(false)}
                className="absolute top-4 right-4 p-2 text-[#A9A39A] hover:text-white rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#221710] border border-[#FF7A18]/30 flex items-center justify-center text-[#FF7A18] mx-auto mb-3">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-extrabold text-[#FAF6F0]">
                  {language === 'bn' ? (
                    <><span className="font-evantic tracking-normal font-bold">Masum 9T9</span> এর অফিশিয়াল সিভি</>
                  ) : (
                    <><span className="font-evantic tracking-normal font-bold">Masum 9T9</span> Official Resume</>
                  )}
                </h3>
                <p className="text-xs text-[#A9A39A] mt-1">
                  {language === 'bn'
                    ? 'আপনার পছন্দের ভাষায় সিভি দেখুন অথবা পিডিএফ ডাউনলোড করুন।'
                    : 'View in your browser or download the complete PDF copy.'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <button
                  onClick={() => {
                    viewResume('bn');
                    setShowResumeModal(false);
                  }}
                  className="p-3.5 rounded-2xl bg-[#120D09] border border-white/10 hover:border-[#FF7A18] text-xs font-bold text-[#FAF6F0] flex flex-col items-center gap-1.5 transition-all"
                >
                  <Eye className="w-4 h-4 text-[#FF7A18]" />
                  <span>বাংলা সিভি দেখুন</span>
                </button>
                <button
                  onClick={() => {
                    viewResume('en');
                    setShowResumeModal(false);
                  }}
                  className="p-3.5 rounded-2xl bg-[#120D09] border border-white/10 hover:border-[#FF7A18] text-xs font-bold text-[#FAF6F0] flex flex-col items-center gap-1.5 transition-all"
                >
                  <Eye className="w-4 h-4 text-[#FF7A18]" />
                  <span>View English CV</span>
                </button>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    handleDownload('bn');
                    setShowResumeModal(false);
                  }}
                  className="btn-fiery-orange flex-1 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>ডাউনলোড (বাংলা)</span>
                </button>
                <button
                  onClick={() => {
                    handleDownload('en');
                    setShowResumeModal(false);
                  }}
                  className="btn-fiery-orange flex-1 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download (English)</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
