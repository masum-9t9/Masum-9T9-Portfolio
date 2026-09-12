import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Briefcase, Palette, Code2, CheckCircle2, ArrowRight, Sparkles, MessageSquare } from 'lucide-react';
import { FAQ } from '../components/FAQ';
import { SEO } from '../components/SEO';
import { FramerButton } from '../components/FramerButton';
import { ScrollReveal } from '../components/ScrollReveal';
import { ProjectCalculator } from '../components/ProjectCalculator';
import { PortfolioConfig, ServiceItem } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { UI_TRANSLATIONS } from '../data/translations';
import { ServiceCardSkeleton } from '../components/Skeleton';

interface ServicesPageProps {
  config: PortfolioConfig;
  onNavigate: (page: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ config, onNavigate }) => {
  const { language } = useLanguage();
  const t = UI_TRANSLATIONS[language];
  const [activeCategory, setActiveCategory] = useState<'all' | 'design' | 'development'>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  const handleCategoryChange = (cat: 'all' | 'design' | 'development') => {
    if (cat === activeCategory) return;
    setIsLoading(true);
    setActiveCategory(cat);
    setTimeout(() => setIsLoading(false), 150);
  };

  const services = config.services || [];

  const designServices = services.filter((s) => s.id !== 'custom_theme_service');
  const devServices = services.filter((s) => s.id === 'custom_theme_service');

  const allDevServices: ServiceItem[] = [
    ...(devServices.length > 0 ? devServices : []),
    {
      id: 'dev_portfolio_web',
      title: language === 'bn' ? 'পোর্টফোলিও ওয়েব প্ল্যাটফর্ম' : 'Portfolio Web Platform',
      shortDesc: language === 'bn' ? 'হাই-স্পিড, রেসপন্সিভ এবং রিয়েল-টাইম ইন্টারেক্টিভ পোর্টফোলিও ওয়েবসাইট।' : 'Ultra-fast, responsive, and interactive personal brand portfolio websites.',
      iconName: 'Code2',
      features: [
        language === 'bn' ? 'ফাস্ট লোডিং ও রিয়েল-টাইম অ্যানিমেশন' : 'Fast loading & real-time animations',
        language === 'bn' ? 'বাইলিঙ্গুয়াল সাপোর্ট (বাংলা ও English)' : 'Bilingual support (English & Bangla)',
        language === 'bn' ? 'টেলিগ্রাম ও গুগল শিট কন্টাক্ট ফর্ম' : 'Telegram & Google Sheets form integration',
        language === 'bn' ? '১০০% এসইও ও মোবাইল ফ্রেন্ডলি' : '100% SEO & Mobile Friendly',
      ],
      deliverables: 'React/TS Code, Vercel Deployment',
      turnaroundTime: '3-5 Days',
    },
    {
      id: 'dev_landing_page',
      title: language === 'bn' ? 'হাই-কনভার্টিং ল্যান্ডিং পেজ' : 'High-Converting Landing Page',
      shortDesc: language === 'bn' ? 'প্রোডাক্ট, সেলস ও কোর্সের জন্য প্রিমিয়াম রেসপন্সিভ ল্যান্ডিং পেজ।' : 'High-converting sales, course, and product landing pages.',
      iconName: 'Sparkles',
      features: [
        language === 'bn' ? 'আই-ক্যাচিং ইউআই ও সেলস কপি লেআউট' : 'Eye-catching UI & sales copy structure',
        language === 'bn' ? 'কাস্টম ফর্ম ও লিড কালেকশন ইন্টিগ্রেশন' : 'Custom lead capture form integration',
        language === 'bn' ? 'মোবাইল অপটিমাইজড রেসপন্সিভ লেআউট' : 'Mobile optimized responsive layouts',
      ],
      deliverables: 'HTML5/Tailwind/React Code',
      turnaroundTime: '2-3 Days',
    },
  ];

  const workflowSteps = language === 'bn' ? [
    { num: '০১', title: 'আলোচনা ও ব্রিফিং', desc: 'প্রজেক্টের মূল লক্ষ্য, ডিজাইন আইডিয়া ও পছন্দনীয় কালার নির্বাচন।' },
    { num: '০২', title: 'রিসার্চ ও ব্রেইনস্টর্মিং', desc: 'অডিয়েন্স পছন্দ, ট্রেন্ড ও কম্পিটিটর অ্যানালাইসিস করে কনসেপ্ট ফাইনাল।' },
    { num: '০৩', title: 'ডিজাইন ও ইউআই ড্রাফট', desc: 'হাই-কোয়ালিটি ফটো ম্যানিপুলেশন, টাইপোগ্রাফি ও শেডো ইফেক্ট তৈরি।' },
    { num: '০৪', title: 'ডেভেলপমেন্ট ও কোডিং', desc: 'ওয়েব সার্ভিস প্রজেক্টের ক্ষেত্রে ক্লিন ও ফাস্ট কোডিং সল্যুশন।' },
    { num: '০৫', title: 'রিভিউ ও ফিডব্যাক', desc: 'ক্লায়েন্টের মতামত অনুযায়ী আনলিমিটেড রিভিশন ও ফাইনাল টাচ।' },
    { num: '০৬', title: 'ডেলিভারি ও ফাইল হ্যান্ডওভার', desc: 'হাই-রেজোলিউশন ৪কে ফাইল এবং সোর্স কোড দ্রুত হ্যান্ডওভার।' },
  ] : [
    { num: '01', title: 'Briefing & Discovery', desc: 'Deep dive into your project vision, target audience, and visual style preferences.' },
    { num: '02', title: 'Concept Research', desc: 'Market analysis and competitive trend evaluation to ensure maximum visual impact.' },
    { num: '03', title: 'Creative Execution', desc: 'High-end photo manipulation, custom typography, cinematic lighting, and sharp UI design.' },
    { num: '04', title: 'Modern Development', desc: 'Pixel-perfect, performance-optimized code implementation for web projects.' },
    { num: '05', title: 'Refinement & Feedback', desc: 'Collaborative feedback cycles and fine-tuning until 100% satisfied.' },
    { num: '06', title: 'Final Handover', desc: 'Ultra-HD export files, organized assets, and deploy-ready codebases delivered on time.' },
  ];

  const displayedServices = activeCategory === 'design'
    ? designServices
    : activeCategory === 'development'
    ? allDevServices
    : [...designServices, ...allDevServices];

  return (
    <div className="pt-24 sm:pt-28 pb-16 px-3.5 sm:px-6 lg:px-8 bg-[#0E0A07] text-[#FAF6F0]">
      <SEO
        title="Services | High-CTR Graphic Design & Web Development by Masum 9T9"
        description="Explore specialized design and web development services by Masum 9T9: YouTube viral thumbnails, drama posters, social media kits, UI/UX, and React web apps."
        canonicalUrl="https://9t9.pro.bd/services"
        keywords="Masum 9T9 Services, YouTube Thumbnail Design, Poster Design Bangladesh, UI/UX Design, Web Development Bangladesh"
        breadcrumbs={[
          { name: 'Home', item: 'https://9t9.pro.bd/' },
          { name: 'Services', item: 'https://9t9.pro.bd/services' },
        ]}
      />

      {/* Page Header */}
      <div className="max-w-7xl mx-auto text-center mb-12 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1D140D] border border-[#FF7A18]/30 text-xs sm:text-sm text-[#FF7A18] font-bold uppercase tracking-wider mb-4"
        >
          <Briefcase className="w-4 h-4 text-[#FF7A18]" />
          <span className={language === 'bn' ? 'font-bn' : ''}>{language === 'bn' ? 'সেবা ও সার্ভিসসমূহ' : 'Expert Services'}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`text-3xl sm:text-6xl font-extrabold text-[#FAF6F0] tracking-tight mb-4 ${language === 'bn' ? 'font-bn' : ''}`}
        >
          <span>
            {language === 'bn' ? 'আপনার ব্র্যান্ডের জন্য হাই-ইমপ্যাক্ট সার্ভিস' : 'Tailored Services for Maximum Growth'}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-[#A9A39A] text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed font-normal"
        >
          {language === 'bn'
            ? 'ইউটিউব থাম্বনেল, মুভি পোস্টার, সোশ্যাল মিডিয়া ব্র্যান্ডিং এবং আধুনিক ওয়েব ডেভেলপমেন্ট সার্ভিস।'
            : 'From viral click-through rate thumbnails to full-stack web applications, built to captivate.'}
        </motion.p>

        {/* Filter Category Tabs */}
        <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
          <button
            onClick={() => handleCategoryChange('all')}
            className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
              activeCategory === 'all'
                ? 'bg-[#FF7A18] text-white shadow-lg shadow-[#FF7A18]/30'
                : 'bg-[#16100B] border border-white/10 text-[#A9A39A] hover:border-white/20'
            }`}
          >
            {language === 'bn' ? 'সকল সার্ভিস' : 'All Services'}
          </button>
          <button
            onClick={() => handleCategoryChange('design')}
            className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
              activeCategory === 'design'
                ? 'bg-[#FF7A18] text-white shadow-lg shadow-[#FF7A18]/30'
                : 'bg-[#16100B] border border-white/10 text-[#A9A39A] hover:border-white/20'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'গ্রাফিক্স ও ইউআই ডিজাইন' : 'Graphics & UI'}</span>
          </button>
          <button
            onClick={() => handleCategoryChange('development')}
            className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
              activeCategory === 'development'
                ? 'bg-[#FF7A18] text-white shadow-lg shadow-[#FF7A18]/30'
                : 'bg-[#16100B] border border-white/10 text-[#A9A39A] hover:border-white/20'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'ওয়েব ডেভেলপমেন্ট' : 'Web Development'}</span>
          </button>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto mb-16 sm:mb-24">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <ServiceCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedServices.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="glass-card p-6 sm:p-8 rounded-3xl border border-[#FF7A18]/25 bg-[#16100B] flex flex-col justify-between hover:border-[#FF7A18]/45 transition-all shadow-xl hover:-translate-y-1"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#221710] border border-[#FF7A18]/30 flex items-center justify-center text-[#FF7A18]">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className={`text-xl font-bold text-[#FAF6F0] ${language === 'bn' ? 'font-bn' : ''}`}>
                    {service.title}
                  </h3>
                  <p className={`text-xs sm:text-sm text-[#A9A39A] leading-relaxed ${language === 'bn' ? 'font-bn' : ''}`}>
                    {service.shortDesc || service.description}
                  </p>

                  {service.features && service.features.length > 0 && (
                    <div className="space-y-2 pt-2 border-t border-white/10">
                      <div className="text-[11px] font-bold text-[#FF7A18] uppercase tracking-wider">
                        {language === 'bn' ? 'মূল বৈশিষ্ট্যসমূহ:' : 'Key Inclusions:'}
                      </div>
                      <ul className="space-y-1.5">
                        {service.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2 text-xs text-[#FAF6F0]/90">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#FF7A18] shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="pt-6 border-t border-white/10 mt-6 flex items-center justify-between">
                  <div className="text-xs text-[#A9A39A]">
                    <span>{language === 'bn' ? 'ডেলিভারি সময়:' : 'Turnaround:'} </span>
                    <strong className="text-[#FF7A18] font-bold">{service.turnaroundTime || '1-3 Days'}</strong>
                  </div>
                  <button
                    onClick={() => onNavigate('contact')}
                    className="btn-fiery-orange px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5"
                  >
                    <span>{language === 'bn' ? 'অর্ডার করুন' : 'Order Now'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Project Cost & Turnaround Calculator */}
      <div className="max-w-7xl mx-auto mb-16 sm:mb-24">
        <ProjectCalculator socials={config.socials} />
      </div>

      {/* Workflow Process Steps */}
      <ScrollReveal className="max-w-7xl mx-auto mb-16 sm:mb-24">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1D140D] border border-[#FF7A18]/30 text-xs text-[#FF7A18] font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#FF7A18]" />
            <span className={language === 'bn' ? 'font-bn' : ''}>{language === 'bn' ? 'কাজের প্রক্রিয়া' : 'Design Workflow'}</span>
          </div>
          <h2 className={`text-2xl sm:text-4xl font-extrabold text-[#FAF6F0] ${language === 'bn' ? 'font-bn' : ''}`}>
            {language === 'bn' ? 'যেভাবে আপনার প্রজেক্ট সফলভাবে সম্পন্ন করি' : 'Step-by-Step Production Process'}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {workflowSteps.map((st, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="p-6 rounded-3xl bg-[#16100B] border border-[#FF7A18]/20 hover:border-[#FF7A18]/45 transition-colors shadow-xl group"
            >
              <div className="text-3xl font-black text-[#FF7A18] mb-3 group-hover:scale-105 transition-transform inline-block">
                {st.num}
              </div>
              <h3 className={`text-lg font-bold text-[#FAF6F0] mb-2 ${language === 'bn' ? 'font-bn' : ''}`}>
                {st.title}
              </h3>
              <p className={`text-xs sm:text-sm text-[#A9A39A] leading-relaxed ${language === 'bn' ? 'font-bn' : ''}`}>
                {st.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </ScrollReveal>

      {/* FAQ Section */}
      <div className="max-w-7xl mx-auto">
        <FAQ faqs={config.faqs} />
      </div>

    </div>
  );
};
