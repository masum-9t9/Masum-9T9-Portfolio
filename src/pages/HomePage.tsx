import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, Sparkles, User, Briefcase, 
  CheckCircle2, Mail, MessageSquareQuote
} from 'lucide-react';
import { Hero } from '../components/Hero';
import { SEO } from '../components/SEO';
import { ProjectCarouselShowcase } from '../components/ProjectCarouselShowcase';
import { ProjectCalculator } from '../components/ProjectCalculator';
import { InfiniteReviewMarquee } from '../components/InfiniteReviewMarquee';
import { Review3DCarousel } from '../components/Review3DCarousel';
import { FramerButton } from '../components/FramerButton';
import { ScrollReveal, StaggerContainer } from '../components/ScrollReveal';
import { SectionDivider } from '../components/SectionDivider';
import { PortfolioConfig, PortfolioItem } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { UI_TRANSLATIONS } from '../data/translations';

interface HomePageProps {
  config: PortfolioConfig;
  onSelectProject: (project: PortfolioItem) => void;
  onOpenCreatorProfile: () => void;
  onAddTestimonial: (testimonial: any) => void;
  onNavigate: (page: string) => void;
  onOpenKeymapping?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  config,
  onSelectProject,
  onOpenCreatorProfile,
  onAddTestimonial,
  onNavigate,
  onOpenKeymapping,
}) => {
  const { language } = useLanguage();
  const t = UI_TRANSLATIONS[language];

  const featuredServices = (config.services || []).slice(0, 3);
  const allReviews = config.testimonials || [];

  return (
    <div className="space-y-16 sm:space-y-24 pb-12 bg-[#0E0A07] text-[#FAF6F0]">
      <SEO
        title="Masum 9T9 | Senior Graphic Designer & Web Developer in Bangladesh"
        description="Official portfolio of Masum 9T9 (Md. Masum Billah). Senior Graphic Designer, UI/UX Designer & Web Developer specializing in high-CTR YouTube thumbnails, posters, social media graphics, and responsive websites."
        canonicalUrl="https://9t9.pro.bd/"
        keywords="Masum 9T9, Nex Masum, Masum 9T9 Official Website, Graphic Designer Bangladesh, YouTube Thumbnail Designer Bangladesh, Poster Designer Bangladesh, Web Developer Bangladesh, UI UX Designer Bangladesh, 9t9.pro.bd"
        breadcrumbs={[
          { name: 'Home', item: 'https://9t9.pro.bd/' }
        ]}
      />

      {/* 1. Hero Section */}
      <Hero data={config.hero} socials={config.socials} onOpenKeymapping={onOpenKeymapping} onNavigate={onNavigate} />

      {/* Section Divider */}
      <SectionDivider />

      {/* 2. Quick About Preview with Luxury Card */}
      <ScrollReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card p-6 sm:p-10 rounded-3xl border border-[#FF7A18]/25 bg-[#16100B] relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF7A18]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#20150E] border border-[#FF7A18]/30 text-[#FF7A18] text-xs font-bold uppercase tracking-wider">
                <User className="w-3.5 h-3.5 text-[#FF7A18]" />
                <span className={language === 'bn' ? 'font-bn' : ''}>{language === 'bn' ? 'সংক্ষিপ্ত পরিচয়' : 'About Highlights'}</span>
              </div>
              
              <h2 className={`text-2xl sm:text-4xl font-extrabold text-[#FAF6F0] tracking-tight ${language === 'bn' ? 'font-bn' : ''}`}>
                {language === 'bn' ? 'ডিজাইন ও প্রযুক্তি দিয়ে হাই-কনভার্টিং সমাধান তৈরি' : 'Crafting High-Converting Visuals & Modern Web Solutions'}
              </h2>
              
              <p className={`text-sm sm:text-base text-[#A9A39A] leading-relaxed font-normal ${language === 'bn' ? 'font-bn' : ''}`}>
                {config.about?.bio || 'Passionate designer and developer with experience in creating high-converting YouTube thumbnails, viral posters, branding elements, and modern web applications.'}
              </p>

              {/* Quick Stats Grid */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <motion.div
                  whileHover={{ scale: 1.03, y: -2 }}
                  className="p-3.5 rounded-2xl bg-[#1C140E] border border-[#FF7A18]/20 text-center cursor-default transition-colors hover:border-[#FF7A18]/40"
                >
                  <div className="text-xl sm:text-2xl font-black text-[#FF7A18]">100+</div>
                  <div className={`text-[10px] sm:text-xs text-[#A9A39A] ${language === 'bn' ? 'font-bn' : ''}`}>
                    {language === 'bn' ? 'সম্পূর্ণ প্রজেক্ট' : 'Completed Work'}
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.03, y: -2 }}
                  className="p-3.5 rounded-2xl bg-[#1C140E] border border-[#FF7A18]/20 text-center cursor-default transition-colors hover:border-[#FF7A18]/40"
                >
                  <div className="text-xl sm:text-2xl font-black text-[#FF7A18]">50+</div>
                  <div className={`text-[10px] sm:text-xs text-[#A9A39A] ${language === 'bn' ? 'font-bn' : ''}`}>
                    {language === 'bn' ? 'সন্তুষ্ট ক্লায়েন্ট' : 'Happy Clients'}
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.03, y: -2 }}
                  className="p-3.5 rounded-2xl bg-[#1C140E] border border-[#FF7A18]/20 text-center cursor-default transition-colors hover:border-[#FF7A18]/40"
                >
                  <div className="text-xl sm:text-2xl font-black text-[#FF7A18]">5.0★</div>
                  <div className={`text-[10px] sm:text-xs text-[#A9A39A] ${language === 'bn' ? 'font-bn' : ''}`}>
                    {language === 'bn' ? 'গড় রেটিং' : 'Average Rating'}
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-center items-start lg:items-end gap-4 border-t lg:border-t-0 lg:border-l border-[#FF7A18]/20 pt-6 lg:pt-0 lg:pl-8">
              <p className={`text-xs text-[#A9A39A] text-left lg:text-right leading-relaxed ${language === 'bn' ? 'font-bn' : ''}`}>
                {language === 'bn' 
                  ? 'আমার ক্যারিয়ার জার্নি, অভিজ্ঞতা ও এডুকেশন সম্পর্কে বিস্তারিত জানুন।' 
                  : 'Discover full career milestones, technical skillsets, and background.'}
              </p>
              <FramerButton
                variant="primary"
                size="md"
                onClick={() => onNavigate('about')}
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
                className="w-full sm:w-auto"
              >
                <span className={language === 'bn' ? 'font-bn' : ''}>{language === 'bn' ? 'সম্পূর্ণ প্রোফাইল দেখুন' : 'Explore About Page'}</span>
              </FramerButton>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Section Divider */}
      <SectionDivider />

      {/* 3. Featured Projects Carousel Showcase */}
      <ScrollReveal className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <ProjectCarouselShowcase
          items={config.portfolio || []}
          onSelectProject={onSelectProject}
          onOpenCreatorProfile={onOpenCreatorProfile}
          onNavigateToProjects={() => onNavigate('projects')}
          showCategoryTabs={false}
          title={language === 'bn' ? 'প্রজেক্টস শোকেস' : 'Projects Showcase'}
          subtitle={language === 'bn' ? 'সেরা ডিজাইন ও ডিজিটাল প্রজেক্ট গ্যালারি' : 'Selected Works & Creative Showcase'}
        />
      </ScrollReveal>

      {/* Section Divider */}
      <SectionDivider />

      {/* 4. Services Overview */}
      <ScrollReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#20150E] border border-[#FF7A18]/30 text-[#FF7A18] text-xs font-bold uppercase tracking-wider mb-2">
              <Briefcase className="w-3.5 h-3.5 text-[#FF7A18]" />
              <span className={language === 'bn' ? 'font-bn' : ''}>{language === 'bn' ? 'সার্ভিসসমূহ' : 'Specialized Services'}</span>
            </div>
            <h2 className={`text-2xl sm:text-3xl font-extrabold text-[#FAF6F0] ${language === 'bn' ? 'font-bn' : ''}`}>
              {language === 'bn' ? 'আপনার ব্র্যান্ড ও কনটেন্টের জন্য সেবাসমূহ' : 'Services Designed for High Impact'}
            </h2>
          </div>

          <FramerButton
            variant="glass"
            size="sm"
            onClick={() => onNavigate('services')}
            icon={<ArrowRight className="w-4 h-4" />}
            iconPosition="right"
          >
            <span className={language === 'bn' ? 'font-bn' : ''}>{language === 'bn' ? 'সকল সার্ভিস দেখুন' : 'View All Services'}</span>
          </FramerButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredServices.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="glass-card p-6 rounded-3xl border border-[#FF7A18]/25 bg-[#16100B] flex flex-col justify-between hover:border-[#FF7A18]/45 transition-colors shadow-xl"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#221710] border border-[#FF7A18]/30 flex items-center justify-center text-[#FF7A18]">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className={`text-lg font-bold text-[#FAF6F0] ${language === 'bn' ? 'font-bn' : ''}`}>{service.title}</h3>
                <p className={`text-xs text-[#A9A39A] leading-relaxed line-clamp-3 ${language === 'bn' ? 'font-bn' : ''}`}>
                  {service.shortDesc || service.description}
                </p>

                <ul className={`space-y-2 text-xs text-[#A9A39A] pt-2 ${language === 'bn' ? 'font-bn' : ''}`}>
                  {(service.features || []).slice(0, 3).map((feat, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FF7A18] shrink-0" />
                      <span className="truncate">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-medium">
                <span className={`text-[#FF7A18] font-bold ${language === 'bn' ? 'font-bn' : ''}`}>{service.turnaroundTime || '1-3 Days'}</span>
                <FramerButton
                  variant="secondary"
                  size="sm"
                  onClick={() => onNavigate('services')}
                >
                  <span className={language === 'bn' ? 'font-bn' : ''}>{language === 'bn' ? 'বিস্তারিত' : 'Learn More'}</span>
                </FramerButton>
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollReveal>

      {/* Section Divider */}
      <SectionDivider />

      {/* 6. Instant Project Budget & Turnaround Calculator (Desktop & Tablet only: hidden on mobile screens) */}
      <div className="hidden md:block">
        <ScrollReveal className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <ProjectCalculator socials={config.socials} />
        </ScrollReveal>
        <SectionDivider />
      </div>

      {/* 7. Client Reviews Section with 3D Carousel */}
      <ScrollReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#20150E] border border-[#FF7A18]/30 text-[#FF7A18] text-xs font-bold uppercase tracking-wider mb-2">
              <MessageSquareQuote className="w-3.5 h-3.5 text-[#FF7A18]" />
              <span className={language === 'bn' ? 'font-bn' : ''}>{language === 'bn' ? 'ক্লায়েন্ট রিভিউ' : 'Client Testimonials'}</span>
            </div>
            <h2 className={`text-2xl sm:text-3xl font-extrabold text-[#FAF6F0] ${language === 'bn' ? 'font-bn' : ''}`}>
              {language === 'bn' ? 'ক্লায়েন্টদের স্বতঃস্ফূর্ত মন্তব্য ও রেটিং' : 'Trusted Reviews & Real Feedback'}
            </h2>
          </div>

          <div className="flex items-center gap-2.5">
            <FramerButton
              variant="secondary"
              size="sm"
              onClick={() => onNavigate('reviews')}
            >
              <span className={language === 'bn' ? 'font-bn' : ''}>{language === 'bn' ? 'সকল রিভিউ পেজ' : 'All Reviews Page'}</span>
            </FramerButton>
          </div>
        </div>

        {/* 3D Cylindrical Interactive Carousel */}
        <Review3DCarousel
          items={allReviews}
          onNavigate={onNavigate}
        />
      </ScrollReveal>

      {/* Section Divider */}
      <SectionDivider />

      {/* 8. Quick CTA Banner */}
      <ScrollReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card p-8 sm:p-12 rounded-3xl border border-[#FF7A18]/30 bg-[#16100B] text-center space-y-6 relative overflow-hidden shadow-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#20150E] border border-[#FF7A18]/35 text-[#FF7A18] text-xs font-bold uppercase tracking-wider">
            <Mail className="w-3.5 h-3.5 text-[#FF7A18]" />
            <span className={language === 'bn' ? 'font-bn' : ''}>{language === 'bn' ? 'যোগাযোগ করুন' : 'Let\'s Collaborate'}</span>
          </div>

          <h2 className={`text-2xl sm:text-4xl font-extrabold text-[#FAF6F0] max-w-2xl mx-auto tracking-tight ${language === 'bn' ? 'font-bn' : ''}`}>
            {language === 'bn' 
              ? 'আপনার পরবর্তী ডিজাইন বা ওয়েব প্রজেক্ট শুরু করতে প্রস্তুত?' 
              : 'Ready to Start Your Next Graphic Design or Web Project?'}
          </h2>

          <p className={`text-xs sm:text-sm text-[#A9A39A] max-w-xl mx-auto leading-relaxed ${language === 'bn' ? 'font-bn' : ''}`}>
            {language === 'bn'
              ? 'আমাকে সরাসরি মেসেজ পাঠান অথবা ইমেইল করুন। খুব দ্রুত উত্তর দেওয়া হবে।'
              : 'Send a message or reach out on social platforms. Fast response guaranteed!'}
          </p>

          <div className="pt-2">
            <FramerButton
              variant="primary"
              size="lg"
              onClick={() => onNavigate('contact')}
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
            >
              <span className={language === 'bn' ? 'font-bn' : ''}>{language === 'bn' ? 'যোগাযোগ পেজে যান' : 'Go To Contact Page'}</span>
            </FramerButton>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
};
