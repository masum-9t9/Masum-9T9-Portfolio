import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, Maximize2, PlayCircle, BookOpen, Share2, Code2, Check, Clock, PackageCheck, Sparkles } from 'lucide-react';
import { ServiceItem } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { UI_TRANSLATIONS } from '../data/translations';
import { ServiceCardSkeleton } from './Skeleton';

interface ServicesProps {
  services: ServiceItem[];
  isLoading?: boolean;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Maximize2,
  PlayCircle,
  BookOpen,
  Share2,
  Code2
};

export const Services: React.FC<ServicesProps> = ({ services, isLoading = false }) => {
  const { language } = useLanguage();
  const t = UI_TRANSLATIONS[language];

  return (
    <section id="services" className="py-16 sm:py-28 px-3.5 sm:px-6 lg:px-8 relative bg-[#0E0A07] border-t border-b border-[#FF7A18]/20">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1D140D] border border-[#FF7A18]/30 text-xs text-[#FF7A18] font-extrabold uppercase tracking-widest mb-3 sm:mb-4 shadow-md">
            <Briefcase className="w-3.5 h-3.5 text-[#FF7A18]" />
            <span>{t.services.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#FAF6F0] uppercase mb-3 sm:mb-4">
            <span className="bg-gradient-to-r from-[#FAF6F0] via-[#FF9238] to-[#FF7A18] bg-clip-text text-transparent">{t.services.title}</span>
          </h2>
          <p className="text-[#A9A39A] text-xs sm:text-base font-normal max-w-xl mx-auto">
            {t.services.subtitle}
          </p>
          <div className="w-20 sm:w-24 h-1 bg-[#FF7A18] mx-auto rounded-full mt-3 sm:mt-4" />
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, idx) => (
              <ServiceCardSkeleton key={idx} />
            ))
          ) : (
            services.map((service, index) => {
            const IconComponent = ICON_MAP[service.iconName] || Briefcase;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-card glass-card-hover p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#FF7A18]/25 bg-[#16100B] flex flex-col justify-between relative overflow-hidden group shadow-2xl"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF7A18]/10 rounded-full blur-2xl group-hover:bg-[#FF7A18]/20 transition-all pointer-events-none" />

                <div>
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#221710] border border-[#FF7A18]/30 flex items-center justify-center text-[#FF7A18] mb-5 sm:mb-6 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(255,122,24,0.15)]">
                    <IconComponent className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-[#FAF6F0] mb-2 sm:mb-3 tracking-tight group-hover:text-[#FF7A18] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-xs text-[#A9A39A] leading-relaxed mb-4 sm:mb-6 font-normal">
                    {service.shortDesc}
                  </p>

                  {/* Features List */}
                  <div className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8 border-t border-b border-[#FF7A18]/15 py-4 sm:py-5">
                    {(service.features || []).map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-[#A9A39A] font-medium">
                        <div className="p-0.5 rounded-full bg-[#FF7A18]/20 text-[#FF7A18] mt-0.5 shrink-0">
                          <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        </div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  {/* Service Meta info */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#A9A39A] mb-4 sm:mb-6 bg-[#120D09] p-3 sm:p-3.5 rounded-2xl border border-[#FF7A18]/20 backdrop-blur-md">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#FF7A18] shrink-0" />
                      <span className="font-semibold text-[11px] sm:text-xs text-[#FAF6F0]">{service.turnaroundTime}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <PackageCheck className="w-3.5 h-3.5 text-[#FF7A18] shrink-0" />
                      <span className="font-semibold text-[11px] sm:text-xs text-[#FAF6F0]">{service.deliverables}</span>
                    </div>
                  </div>

                  {/* Action CTA */}
                  <a
                    href={`#contact?service=${encodeURIComponent(service.title)}`}
                    className="ios-btn-primary w-full py-3.5 text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{t.services.orderButton}</span>
                  </a>
                </div>
              </motion.div>
            );
          })
          )}
        </div>

      </div>
    </section>
  );
};

