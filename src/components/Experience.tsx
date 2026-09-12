import React from 'react';
import { motion } from 'motion/react';
import { History, Calendar, MapPin, Briefcase } from 'lucide-react';
import { ExperienceItem } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { UI_TRANSLATIONS } from '../data/translations';

interface ExperienceProps {
  experiences: ExperienceItem[];
}

export const Experience: React.FC<ExperienceProps> = ({ experiences }) => {
  const { language } = useLanguage();
  const t = UI_TRANSLATIONS[language];

  return (
    <section id="experience" className="py-16 sm:py-28 px-3.5 sm:px-6 lg:px-8 relative bg-[#0E0A07] border-t border-b border-[#FF7A18]/20">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1D140D] border border-[#FF7A18]/30 text-xs text-[#FF7A18] font-extrabold uppercase tracking-widest mb-3 sm:mb-4 shadow-sm">
            <History className="w-3.5 h-3.5 text-[#FF7A18]" />
            <span>{t.experience.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#FAF6F0] uppercase mb-3 sm:mb-4">
            <span className="bg-gradient-to-r from-[#FAF6F0] via-[#FF9238] to-[#FF7A18] bg-clip-text text-transparent">{t.experience.title}</span>
          </h2>
          <p className="text-[#A9A39A] text-xs sm:text-base font-normal max-w-xl mx-auto">
            {t.experience.subtitle}
          </p>
          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-[#FF7A18] to-[#E8590C] mx-auto rounded-full mt-3 sm:mt-4" />
        </div>

        {/* Timeline Container */}
        <div className="max-w-4xl mx-auto relative before:absolute before:inset-0 before:left-3.5 sm:before:left-1/2 sm:before:-translate-x-1/2 before:w-0.5 before:bg-gradient-to-b before:from-[#FF7A18] before:via-[#FF7A18]/50 before:to-[#FF7A18]/10">
          {experiences.map((exp, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className={`relative mb-8 sm:mb-12 flex flex-col sm:flex-row items-start ${
                  isEven ? 'sm:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Node Point */}
                <div className="absolute left-3.5 sm:left-1/2 -translate-x-1/2 top-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#FF7A18] to-[#E8590C] border-4 border-[#0E0A07] text-white flex items-center justify-center z-10 shadow-[0_0_20px_rgba(255,122,24,0.4)]">
                  <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>

                {/* Content Box */}
                <div className="ml-9 sm:ml-0 sm:w-1/2 sm:px-8 w-full">
                  <div className="p-4.5 xs:p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#FF7A18]/25 bg-[#16100B] shadow-2xl relative overflow-hidden group hover:border-[#FF7A18]/50 transition-all duration-300">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF7A18]/5 rounded-full blur-2xl group-hover:bg-[#FF7A18]/10 transition-all pointer-events-none" />

                    {/* Year badge */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1D140D] border border-[#FF7A18]/30 text-[11px] sm:text-xs text-[#FF7A18] font-extrabold uppercase tracking-wider mb-3 sm:mb-4 shadow-sm">
                      <Calendar className="w-3.5 h-3.5 text-[#FF7A18]" />
                      <span>{exp.year}</span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-[#FAF6F0] mb-1 group-hover:text-[#FF7A18] transition-colors">
                      {exp.role}
                    </h3>
                    <p className="text-xs sm:text-sm font-bold text-[#FF7A18] mb-2">{exp.company}</p>

                    <div className="flex items-center gap-1.5 text-xs text-[#A9A39A] mb-3 sm:mb-4">
                      <MapPin className="w-3.5 h-3.5 text-[#FF7A18] shrink-0" />
                      <span>{exp.location}</span>
                    </div>

                    <p className="text-xs text-[#A9A39A] leading-relaxed mb-4 sm:mb-5 font-normal">{exp.description}</p>

                    {/* Key Highlights */}
                    <div className="flex flex-wrap gap-1.5 pt-3 sm:pt-4 border-t border-[#FF7A18]/15">
                      {(exp.keyProjects || []).map((proj, pIdx) => (
                        <span
                          key={pIdx}
                          className="text-[10px] sm:text-[11px] font-semibold text-[#A9A39A] bg-[#120D09] px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-lg border border-[#FF7A18]/20"
                        >
                          ✓ {proj}
                        </span>
                      ))}
                    </div>

                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

