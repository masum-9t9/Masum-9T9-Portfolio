import React from 'react';
import { ArrowUp, Facebook, Youtube, Send, MessageSquare, Heart, Sparkles, Mail, Phone, Github, ExternalLink, ShieldCheck, Zap, Code2, Palette } from 'lucide-react';
import { SocialLinks } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { UI_TRANSLATIONS } from '../data/translations';

import { PageId } from './NavigationDock';

interface FooterProps {
  socials: SocialLinks;
  profileImage?: string;
  onNavigate?: (page: PageId, filter?: 'ui_ux' | 'graphics' | 'frontend') => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  socials,
  profileImage = "https://i.postimg.cc/bYQL7Lvj/Profile-pic-(3).png",
  onNavigate
}) => {
  const { language } = useLanguage();
  const t = UI_TRANSLATIONS[language];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const behanceUrl = socials.behance || "https://www.behance.net/masum_9t9_official";
  const fiverrUrl = socials.fiverr || "https://www.fiverr.com/sellers/masum9t9/";

  return (
    <footer className="relative bg-[#0E0A07] border-t border-[#FF7A18]/20 pt-12 sm:pt-20 pb-8 sm:pb-10 px-3.5 sm:px-6 lg:px-8 overflow-hidden z-10">
      
      {/* Decorative Ambient Light */}
      <div className="absolute -top-32 left-1/4 w-96 h-96 bg-[#FF7A18]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top Call To Action Vector Card */}
        <div className="relative mb-10 sm:mb-16 p-5 sm:p-10 rounded-2xl sm:rounded-3xl bg-[#16100B] border border-[#FF7A18]/30 shadow-2xl overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
          
          <div className="space-y-2.5 sm:space-y-3 text-center md:text-left relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#20150E] border border-[#FF7A18]/35 text-[#FF7A18] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5 text-[#FF7A18]" />
              <span>{language === 'bn' ? 'নতুন প্রজেক্ট বা ক্লায়েন্ট ডিল?' : 'Let\'s Create Something Iconic'}</span>
            </div>
            
            <h3 className="text-xl sm:text-3xl font-bold text-[#FAF6F0] tracking-tight">
              {language === 'bn' ? 'আপনার ব্র্যান্ড ও ওয়েবসাইটকে প্রফেশনাল লেভেলে নিয়ে যান' : 'Ready to Elevate Your Brand & Digital Web Product?'}
            </h3>

            <p className="text-xs sm:text-sm text-[#A9A39A] max-w-xl font-normal">
              {language === 'bn'
                ? 'গ্রাফিক ডিজাইন, ইউটিউব থাম্বনেইল, ব্র্যান্ডিং কিংবা আধুনিক ফুল-স্ট্যাক ওয়েবসাইট তৈরি করতে আজই সরাসরি যোগাযোগ করুন।'
                : 'Available for freelance graphic design projects, YouTube thumbnails, logo branding, and full-stack web applications.'}
            </p>
          </div>

          <div className="flex flex-col xs:flex-row items-center justify-center gap-3 relative z-10 w-full md:w-auto shrink-0">
            <button
              type="button"
              onClick={() => onNavigate ? onNavigate('contact') : (window.location.pathname = '/contact')}
              className="btn-fiery-orange w-full xs:w-auto px-6 py-3.5 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 text-center uppercase tracking-wider rounded-full"
            >
              <Sparkles className="w-4 h-4" />
              <span>{language === 'bn' ? 'মেসেজ পাঠান' : 'Start a Project'}</span>
            </button>

            <a
              href={`https://wa.me/${socials.whatsapp ? socials.whatsapp.replace(/[^0-9]/g, '') : '8801303623838'}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ios-glass-btn w-full xs:w-auto px-5 py-3.5 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 text-center rounded-full border border-[#FF7A18]/30 text-[#FAF6F0] hover:border-[#FF7A18]/60"
            >
              <MessageSquare className="w-4 h-4 text-[#FF7A18]" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

        {/* 4-Column Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Column 1: Brand & Profile */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative group shrink-0">
                <img 
                  src={profileImage || "https://i.postimg.cc/bYQL7Lvj/Profile-pic-(3).png"} 
                  alt="Masum 9T9 Profile"
                  referrerPolicy="no-referrer"
                  className="relative w-12 h-12 rounded-2xl object-cover border border-[#FF7A18]/30 bg-[#16100B]"
                />
              </div>
              <div>
                <span className="text-2xl font-evantic font-bold text-[#FAF6F0] tracking-tight block">Masum 9T9</span>
                <span className="text-xs text-[#FF7A18] font-bold flex items-center gap-2 mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#FF7A18]" />
                  <span>{language === 'bn' ? 'ডিজাইনার, ডেভেলপার ও ক্রিয়েটর' : 'Designer, Developer & Creator'}</span>
                </span>
              </div>
            </div>

            <p className="text-xs text-[#A9A39A] leading-relaxed font-normal pr-4">
              {t.footer.brandBio}
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <div className="px-3 py-1.5 rounded-xl bg-[#1D140D] border border-[#FF7A18]/20 text-[#A9A39A] text-[11px] font-medium flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#FF7A18]" />
                <span>{t.footer.availableForProjects}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Design Services */}
          <div className="hidden md:block lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-[#FF7A18] uppercase tracking-widest flex items-center gap-2">
              <Palette className="w-3.5 h-3.5 text-[#FF7A18]" />
              <span>{language === 'bn' ? 'ডিজাইন এক্সপার্টিজ' : 'Design Services'}</span>
            </h4>
            <ul className="space-y-2 text-xs font-medium text-[#A9A39A]">
              <li className="flex items-center gap-2 hover:text-[#FAF6F0] transition-colors">
                <span className="text-[#FF7A18] font-bold">•</span>
                <span>YouTube Thumbnails (Pixellab/PS)</span>
              </li>
              <li className="flex items-center gap-2 hover:text-[#FAF6F0] transition-colors">
                <span className="text-[#FF7A18] font-bold">•</span>
                <span>Social Media Posters & Banners</span>
              </li>
              <li className="flex items-center gap-2 hover:text-[#FAF6F0] transition-colors">
                <span className="text-[#FF7A18] font-bold">•</span>
                <span>Logo & Brand Identity Design</span>
              </li>
              <li className="flex items-center gap-2 hover:text-[#FAF6F0] transition-colors">
                <span className="text-[#FF7A18] font-bold">•</span>
                <span>Manipulations & Photo Editing</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Tech & Engineering */}
          <div className="hidden md:block lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-[#FF7A18] uppercase tracking-widest flex items-center gap-2">
              <Code2 className="w-3.5 h-3.5 text-[#FF7A18]" />
              <span>{language === 'bn' ? 'প্রগ্রামিং ও ওয়েব' : 'Tech Stack & Engineering'}</span>
            </h4>
            <ul className="space-y-2 text-xs font-medium text-[#A9A39A]">
              <li className="flex items-center gap-2 hover:text-[#FAF6F0] transition-colors">
                <span className="text-[#FF7A18] font-bold">•</span>
                <span>React 18 & Vite Web Apps</span>
              </li>
              <li className="flex items-center gap-2 hover:text-[#FAF6F0] transition-colors">
                <span className="text-[#FF7A18] font-bold">•</span>
                <span>TypeScript & Express API Routes</span>
              </li>
              <li className="flex items-center gap-2 hover:text-[#FAF6F0] transition-colors">
                <span className="text-[#FF7A18] font-bold">•</span>
                <span>Tailwind CSS Cyber UI</span>
              </li>
              <li className="flex items-center gap-2 hover:text-[#FAF6F0] transition-colors">
                <span className="text-[#FF7A18] font-bold">•</span>
                <span>Full-Stack App Architecture</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Quick Navigation */}
          <div className="hidden md:block lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-[#FF7A18] uppercase tracking-widest flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-[#FF7A18]" />
              <span>{language === 'bn' ? 'কুইক লিংক' : 'Quick Nav'}</span>
            </h4>
            <div className="flex flex-col gap-1.5 text-xs font-medium text-[#A9A39A]">
              <button onClick={() => onNavigate ? onNavigate('home') : (window.location.pathname = '/')} className="hover:text-[#FAF6F0] hover:translate-x-1 transition-all text-left cursor-pointer">🏠 {t.nav.home}</button>
              <button onClick={() => onNavigate ? onNavigate('about') : (window.location.pathname = '/about')} className="hover:text-[#FAF6F0] hover:translate-x-1 transition-all text-left cursor-pointer">👨‍💻 {t.nav.about}</button>
              <button onClick={() => onNavigate ? onNavigate('projects', 'graphics') : (window.location.pathname = '/projects')} className="hover:text-[#FAF6F0] hover:translate-x-1 transition-all text-left cursor-pointer">🎨 {t.nav.designProjects}</button>
              <button onClick={() => onNavigate ? onNavigate('projects', 'frontend') : (window.location.pathname = '/projects')} className="hover:text-[#FAF6F0] hover:translate-x-1 transition-all text-left cursor-pointer">💻 {t.nav.codingProjects}</button>
              <button onClick={() => onNavigate ? onNavigate('services') : (window.location.pathname = '/services')} className="hover:text-[#FAF6F0] hover:translate-x-1 transition-all text-left cursor-pointer">⚡ {t.nav.services}</button>
              <button onClick={() => onNavigate ? onNavigate('contact') : (window.location.pathname = '/contact')} className="hover:text-[#FAF6F0] hover:translate-x-1 transition-all text-left cursor-pointer">📩 {t.nav.contact}</button>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Social Icons Row */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#A9A39A]">
          
          {/* Copyright Info */}
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
            <span>© {new Date().getFullYear()} <strong className="text-[#FAF6F0] font-evantic font-bold">Masum 9T9</strong>. {t.footer.rightsReserved}</span>
            <span className="hidden sm:inline text-[#FF7A18]/30">•</span>
            <span className="flex items-center gap-1.5 text-[#A9A39A]">
              crafted with <Heart className="w-3.5 h-3.5 text-[#FF7A18] fill-[#FF7A18]" /> for Design & Code Excellence
            </span>
          </div>

          {/* Social Media Pills & Scroll to top */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <a 
              href={socials.facebook} 
              target="_blank" 
              rel="me noopener noreferrer" 
              className="p-2.5 rounded-xl bg-[#1D140D] border border-[#FF7A18]/20 text-[#A9A39A] hover:text-[#FAF6F0] hover:border-[#FF7A18]/50 transition-all hover:scale-105 group relative shadow-md"
              title="Facebook Profile"
            >
              <Facebook className="w-4 h-4" />
            </a>

            <a 
              href={socials.youtube} 
              target="_blank" 
              rel="me noopener noreferrer" 
              className="p-2.5 rounded-xl bg-[#1D140D] border border-[#FF7A18]/20 text-[#A9A39A] hover:text-[#FAF6F0] hover:border-[#FF7A18]/50 transition-all hover:scale-105 group relative shadow-md"
              title="YouTube Channel"
            >
              <Youtube className="w-4 h-4" />
            </a>

            <a 
              href={socials.telegram} 
              target="_blank" 
              rel="me noopener noreferrer" 
              className="p-2.5 rounded-xl bg-[#1D140D] border border-[#FF7A18]/20 text-[#A9A39A] hover:text-[#FAF6F0] hover:border-[#FF7A18]/50 transition-all hover:scale-105 group relative shadow-md"
              title="Telegram"
            >
              <Send className="w-4 h-4" />
            </a>

            <a 
              href={socials.whatsapp} 
              target="_blank" 
              rel="me noopener noreferrer" 
              className="p-2.5 rounded-xl bg-[#1D140D] border border-[#FF7A18]/20 text-[#A9A39A] hover:text-[#FAF6F0] hover:border-[#FF7A18]/50 transition-all hover:scale-105 group relative shadow-md"
              title="WhatsApp"
            >
              <MessageSquare className="w-4 h-4" />
            </a>

            <a 
              href={behanceUrl} 
              target="_blank" 
              rel="me noopener noreferrer" 
              className="p-2.5 rounded-xl bg-[#1D140D] border border-[#FF7A18]/20 text-[#A9A39A] hover:text-[#FAF6F0] hover:border-[#FF7A18]/50 transition-all hover:scale-105 group relative shadow-md"
              title="Behance Portfolio"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426h-3.033c-.085-.814-.808-1.571-2.177-1.571-1.394 0-2.383.967-2.383 2.68 0 1.776.97 2.755 2.456 2.755 1.341 0 2.18-.84 2.298-1.695h2.663zm-14.726-8.6h-5v3.13h4.63c.63 0 1.25-.23 1.25-.97 0-.79-.58-1.16-1.14-1.16zm.4 4.88h-5.4v3.72h5.4c.73 0 1.48-.28 1.48-1.19 0-.96-.75-1.28-1.48-1.28zm-8.4-7.28h8.841c2.147 0 3.823.824 3.823 2.784 0 1.15-.688 2.037-1.802 2.522 1.483.435 2.338 1.547 2.338 3.037 0 2.261-1.921 3.257-4.148 3.257h-9.052v-11.6zm0 0"/>
              </svg>
            </a>

            <a 
              href={fiverrUrl} 
              target="_blank" 
              rel="me noopener noreferrer" 
              className="p-2.5 rounded-xl bg-[#1D140D] border border-[#FF7A18]/20 text-[#A9A39A] hover:text-[#FAF6F0] hover:border-[#FF7A18]/50 transition-all hover:scale-105 group relative flex items-center justify-center shadow-md"
              title="Fiverr Profile"
            >
              <span className="font-bold text-xs tracking-tighter leading-none text-[#FF7A18]">
                fi
              </span>
            </a>

            <a 
              href={socials.github || "https://github.com/masum-9t9/"} 
              target="_blank" 
              rel="me noopener noreferrer" 
              className="p-2.5 rounded-xl bg-[#1D140D] border border-[#FF7A18]/20 text-[#A9A39A] hover:text-[#FAF6F0] hover:border-[#FF7A18]/50 transition-all hover:scale-105 group relative flex items-center justify-center"
              title="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>

            {/* Scroll to Top Button */}
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#1D140D] border border-[#FF7A18]/30 hover:border-[#FF7A18] text-[#FF7A18] hover:text-[#FAF6F0] transition-all shadow-md active:scale-95 ml-2 cursor-pointer"
              title={t.footer.scrollTop}
            >
              <span className="text-xs font-bold">{t.footer.scrollTop}</span>
              <div className="w-5 h-5 rounded-lg bg-[#FF7A18]/20 group-hover:bg-[#FF7A18] text-[#FF7A18] group-hover:text-black flex items-center justify-center transition-colors">
                <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
              </div>
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
};
