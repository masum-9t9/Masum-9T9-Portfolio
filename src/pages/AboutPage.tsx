import React from 'react';
import { motion } from 'motion/react';
import { User, Cpu, Rocket, ArrowRight, Download, FileText, Sparkles } from 'lucide-react';
import { About } from '../components/About';
import { Experience } from '../components/Experience';
import { Skills } from '../components/Skills';
import { SEO } from '../components/SEO';
import { FramerButton } from '../components/FramerButton';
import { ScrollReveal } from '../components/ScrollReveal';
import { PortfolioConfig } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { UI_TRANSLATIONS } from '../data/translations';

interface AboutPageProps {
  config: PortfolioConfig;
  onNavigate: (page: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ config, onNavigate }) => {
  const { language } = useLanguage();
  const t = UI_TRANSLATIONS[language];

  const toolsList = [
    { name: 'Adobe Photoshop', category: 'Desktop Graphics', icon: 'https://i.postimg.cc/7Z3fjNN9/photoshop.png', level: '95%' },
    { name: 'Adobe Illustrator', category: 'Vector Artwork', icon: 'https://i.postimg.cc/BnTXRCCB/illustrator.png', level: '85%' },
    { name: 'Ibis Paint X', category: 'Mobile Painting', icon: 'https://i.postimg.cc/9QdrsBBP/ibispaint.jpg', level: '98%' },
    { name: 'Pixellab 3D', category: 'Bangla Typography', icon: 'https://i.postimg.cc/cLRrPccF/pixellab.png', level: '98%' },
    { name: 'Photoshop CC 2019', category: 'Color Grading', icon: 'https://i.postimg.cc/bwxs4RRV/pstouch.avif', level: '90%' },
  ];

  const roadmapSteps = language === 'bn' ? [
    { year: '২০২৪ - ২০২৫', title: 'হাই-সিটিআর থাম্বনেল সাইকোলজি মাস্টারি', desc: 'নাটক ও ইউটিউব ক্রিয়েটরদের জন্য আল্ট্রা-কনভার্টিং কাস্টম আর্ট তৈরি' },
    { year: '২০২৬', title: 'গ্লোবাল ব্র্যান্ডিং ও প্রিমিয়াম থিম ডেভেলপমেন্ট', desc: 'আন্তর্জাতিক প্ল্যাটফর্ম এবং হাই-পারফরম্যান্স ওয়েব ইউআই সল্যুশন' },
    { year: '২০২৭+', title: 'এআই-পাওয়ার্ড ক্রিয়েটিভ ডিজাইন স্টুডিও', desc: 'ভিজ্যুয়াল কন্টেন্ট অটোমেশন এবং প্রফেশনাল মিডিয়া ল্যাব প্রতিষ্ঠা' },
  ] : [
    { year: '2024 - 2025', title: 'High-CTR Thumbnail Psychology Mastery', desc: 'Crafting ultra-converting custom thumbnail artwork for top creators' },
    { year: '2026', title: 'Global Branding & Custom Theme Architecture', desc: 'Delivering international brand identities and lightning-fast web UIs' },
    { year: '2027+', title: 'AI-Powered Creative Design Studio Launch', desc: 'Scaling automated visual media workflows & professional design labs' },
  ];

  const profilePageSchema = [
    {
      '@type': 'ProfilePage',
      '@id': 'https://9t9.pro.bd/about#profile',
      url: 'https://9t9.pro.bd/about',
      name: 'About Masum 9T9 (Md. Masum Billah)',
      description: 'Professional background, skillsets, tools, and experience profile of Masum 9T9 — Senior Graphic Designer & Web Developer in Bangladesh.',
      mainEntity: { '@id': 'https://9t9.pro.bd/#masum9t9' },
    },
  ];

  return (
    <div className="pt-24 sm:pt-28 pb-16 px-3.5 sm:px-6 lg:px-8 bg-[#0E0A07] text-[#FAF6F0]">
      <SEO
        title="About Masum 9T9 — Senior Graphic Designer & Web Developer Profile"
        description="Learn more about Masum 9T9 (Md. Masum Billah / Nex Masum): Graphic designer, UI/UX creator, and React web developer based in Bangladesh."
        canonicalUrl="https://9t9.pro.bd/about"
        keywords="About Masum 9T9, Md. Masum Billah, Nex Masum, Graphic Designer Profile Bangladesh, Web Developer Bangladesh, 9t9.pro.bd about"
        pageType="profile"
        breadcrumbs={[
          { name: 'Home', item: 'https://9t9.pro.bd/' },
          { name: 'About', item: 'https://9t9.pro.bd/about' },
        ]}
        customSchema={profilePageSchema}
      />

      {/* Page Header */}
      <div className="max-w-7xl mx-auto text-center mb-12 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1D140D] border border-[#FF7A18]/30 text-xs sm:text-sm text-[#FF7A18] font-bold uppercase tracking-wider mb-4"
        >
          <User className="w-4 h-4 text-[#FF7A18]" />
          <span className={language === 'bn' ? 'font-bn' : ''}>{language === 'bn' ? 'আমার গল্প ও প্রোফাইল' : 'My Story & Profile'}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`text-3xl sm:text-6xl font-extrabold text-[#FAF6F0] tracking-tight mb-4 ${language === 'bn' ? 'font-bn' : ''}`}
        >
          <span>
            {language === 'bn' ? (
              <><span className="font-evantic tracking-normal font-bold">Masum 9T9</span> এর ক্রিয়েটিভ যাত্রা</>
            ) : (
              <>The Creative World of <span className="font-evantic tracking-normal font-bold">Masum 9T9</span></>
            )}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-[#A9A39A] text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed font-normal"
        >
          {config.about?.subtitle || 'Passionate Visual Storyteller & Senior Graphic Designer'}
        </motion.p>
      </div>

      {/* Main About Component */}
      <ScrollReveal>
        <About data={config.about} testimonials={config.testimonials} />
      </ScrollReveal>

      {/* Experience & Career Timeline */}
      <ScrollReveal className="mt-12">
        <Experience experiences={config.experiences} />
      </ScrollReveal>

      {/* Skills Overview */}
      <ScrollReveal className="mt-12">
        <Skills skills={config.skills} />
      </ScrollReveal>

      {/* Tools I Use Section */}
      <ScrollReveal className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1D140D] border border-[#FF7A18]/30 text-xs text-[#FF7A18] font-bold uppercase tracking-wider mb-3">
            <Cpu className="w-3.5 h-3.5 text-[#FF7A18]" />
            <span className={language === 'bn' ? 'font-bn' : ''}>{language === 'bn' ? 'সফটওয়্যার টুলস' : 'Software Stack'}</span>
          </div>
          <h2 className={`text-2xl sm:text-4xl font-extrabold text-[#FAF6F0] ${language === 'bn' ? 'font-bn' : ''}`}>
            {language === 'bn' ? 'যেসব টুলস দিয়ে কাজ করি' : 'Tools & Software I Master'}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {toolsList.map((tool, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="p-5 rounded-2xl bg-[#16100B] border border-[#FF7A18]/20 hover:border-[#FF7A18]/45 transition-colors group flex flex-col items-center text-center shadow-xl"
            >
              <img
                src={tool.icon}
                alt={tool.name}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.style.display = 'none';
                }}
                className="w-12 h-12 rounded-xl object-contain mb-3 group-hover:scale-105 transition-transform shadow-sm"
              />
              <h4 className="text-sm font-bold text-[#FAF6F0] mb-1 group-hover:text-[#FF7A18] transition-colors">{tool.name}</h4>
              <p className="text-[11px] text-[#A9A39A] mb-2">{tool.category}</p>
              <span className="text-xs font-mono font-bold text-[#FF7A18] bg-[#221710] px-2.5 py-0.5 rounded-full border border-[#FF7A18]/30">
                {tool.level}
              </span>
            </motion.div>
          ))}
        </div>
      </ScrollReveal>

      {/* Future Roadmap Section */}
      <ScrollReveal className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1D140D] border border-[#FF7A18]/30 text-xs text-[#FF7A18] font-bold uppercase tracking-wider mb-3">
            <Rocket className="w-3.5 h-3.5 text-[#FF7A18]" />
            <span className={language === 'bn' ? 'font-bn' : ''}>{language === 'bn' ? 'ভবিষ্যৎ রোডম্যাপ' : 'Future Roadmap'}</span>
          </div>
          <h2 className={`text-2xl sm:text-4xl font-extrabold text-[#FAF6F0] ${language === 'bn' ? 'font-bn' : ''}`}>
            {language === 'bn' ? 'আগামীর উদ্ভাবনী পরিকল্পনা' : 'Strategic Vision & Future Goals'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roadmapSteps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="p-6 rounded-3xl bg-[#16100B] border border-[#FF7A18]/20 hover:border-[#FF7A18]/45 transition-colors relative overflow-hidden group shadow-xl"
            >
              <div className="w-10 h-10 rounded-2xl bg-[#221710] text-[#FF7A18] border border-[#FF7A18]/30 flex items-center justify-center font-bold text-sm mb-4">
                0{idx + 1}
              </div>
              <span className={`text-xs font-semibold text-[#FF7A18] bg-[#221710] px-3 py-1 rounded-full border border-[#FF7A18]/30 ${language === 'bn' ? 'font-bn' : ''}`}>
                {step.year}
              </span>
              <h3 className={`text-lg font-bold text-[#FAF6F0] mt-3 mb-2 group-hover:text-[#FF7A18] transition-colors ${language === 'bn' ? 'font-bn' : ''}`}>
                {step.title}
              </h3>
              <p className={`text-xs sm:text-sm text-[#A9A39A] leading-relaxed font-normal ${language === 'bn' ? 'font-bn' : ''}`}>
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </ScrollReveal>

      {/* Call to Action Banner */}
      <ScrollReveal className="max-w-5xl mx-auto mt-12">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#16100B] border border-[#FF7A18]/30 shadow-2xl text-center relative overflow-hidden">
          <h3 className={`text-2xl sm:text-4xl font-extrabold text-[#FAF6F0] mb-3 ${language === 'bn' ? 'font-bn' : ''}`}>
            {language === 'bn' ? 'আসুন আপনার প্রজেক্টকে প্রিমিয়াম লুক দিই' : 'Ready to Transform Your Visual Brand?'}
          </h3>
          <p className={`text-[#A9A39A] text-sm sm:text-base max-w-xl mx-auto mb-6 ${language === 'bn' ? 'font-bn' : ''}`}>
            {language === 'bn' ? 'উচ্চ মানের পোস্টার, থাম্বনেল বা কাস্টম ওয়েব ডিজাইনের জন্য মেসেজ দিন' : 'Get in touch for high-CTR thumbnails, posters, or custom responsive web designs.'}
          </p>
          <FramerButton
            variant="primary"
            size="lg"
            onClick={() => onNavigate('contact')}
            icon={<ArrowRight className="w-4 h-4" />}
            iconPosition="right"
          >
            <span className={language === 'bn' ? 'font-bn' : ''}>{language === 'bn' ? 'যোগাযোগ করুন' : 'Get in Touch Now'}</span>
          </FramerButton>
        </div>
      </ScrollReveal>

    </div>
  );
};
