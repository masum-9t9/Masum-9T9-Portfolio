import React from 'react';
import { motion } from 'framer-motion';

export function NotePage() {
  return (
    <div className="min-h-screen bg-[#0D0C0A] text-[#E8E2D8] py-20 px-4 sm:px-8 max-w-4xl mx-auto font-sans">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#C7B79A] tracking-wider mb-2">
            ✦ MASUM 9T9 ✦
          </h1>
          <p className="text-[#D4C8B0] text-base sm:text-lg font-semibold italic">
            💌 A NOTE FOR DEVELOPERS AND USERS
          </p>
          <p className="text-xs sm:text-sm text-[#A9A39A] mt-2">
            Welcome & Thank You for Downloading the Masum 9T9 Portfolio System
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-[#151411] border border-[#C7B79A]/20 rounded-2xl p-6 sm:p-10 space-y-8 shadow-2xl backdrop-blur-md">
          
          {/* Welcome Message */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#D4C8B0] border-b border-[#C7B79A]/20 pb-2 flex items-center gap-2">
              <span>👋</span> Welcome Message
            </h2>
            <p className="text-[#A9A39A] leading-relaxed text-sm sm:text-base">
              Hello there! Thank you for downloading and exploring my portfolio project repository. I am truly thrilled that you are taking the time to inspect or use my codebase. It means a lot to me as a designer and developer!
            </p>
            <p className="text-[#A9A39A] leading-relaxed text-sm sm:text-base">
              I hope you find this code helpful and inspiring for your own builds!
            </p>
          </section>

          {/* Project Summary */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#D4C8B0] border-b border-[#C7B79A]/20 pb-2 flex items-center gap-2">
              <span>📌</span> Project Summary & Credits
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm pt-2">
              <div className="bg-[#0D0C0A] p-4 rounded-xl border border-[#C7B79A]/10">
                <span className="text-[#C7B79A] font-medium block text-xs">Owner & Lead Developer</span>
                <span className="text-[#E8E2D8] font-bold">Md. Masum Billah (Masum 9T9)</span>
              </div>
              <div className="bg-[#0D0C0A] p-4 rounded-xl border border-[#C7B79A]/10">
                <span className="text-[#C7B79A] font-medium block text-xs">Design System</span>
                <span className="text-[#E8E2D8] font-bold">Fiery Amber & Obsidian Dark</span>
              </div>
              <div className="bg-[#0D0C0A] p-4 rounded-xl border border-[#C7B79A]/10">
                <span className="text-[#C7B79A] font-medium block text-xs">Core Stack</span>
                <span className="text-[#E8E2D8] font-bold">React 19, TypeScript, Tailwind CSS, Vite</span>
              </div>
              <div className="bg-[#0D0C0A] p-4 rounded-xl border border-[#C7B79A]/10">
                <span className="text-[#C7B79A] font-medium block text-xs">Official Web Portal</span>
                <a href="https://9t9.pro.bd" target="_blank" rel="noreferrer" className="text-[#C7B79A] underline hover:text-[#D4C8B0] font-bold">
                  https://9t9.pro.bd
                </a>
              </div>
            </div>
          </section>

          {/* Quick Start Guide */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#D4C8B0] border-b border-[#C7B79A]/20 pb-2 flex items-center gap-2">
              <span>💡</span> Quick Start Guide
            </h2>
            <div className="space-y-3 text-sm">
              <div className="bg-[#0D0C0A] p-3 rounded-lg border border-[#C7B79A]/10">
                <p className="text-xs text-[#A9A39A] mb-1">1. Install Dependencies</p>
                <code className="text-[#C7B79A] font-mono font-bold">npm install</code>
              </div>
              <div className="bg-[#0D0C0A] p-3 rounded-lg border border-[#C7B79A]/10">
                <p className="text-xs text-[#A9A39A] mb-1">2. Launch Development Server</p>
                <code className="text-[#C7B79A] font-mono font-bold">npm run dev</code>
              </div>
              <div className="bg-[#0D0C0A] p-3 rounded-lg border border-[#C7B79A]/10">
                <p className="text-xs text-[#A9A39A] mb-1">3. Build for Production</p>
                <code className="text-[#C7B79A] font-mono font-bold">npm run build</code>
              </div>
            </div>
          </section>

          {/* Copyright & License */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#D4C8B0] border-b border-[#C7B79A]/20 pb-2 flex items-center gap-2">
              <span>⚖️</span> License & Copyright
            </h2>
            <div className="bg-[#0D0C0A] p-4 rounded-xl border border-[#C7B79A]/10 text-xs text-[#A9A39A] leading-relaxed">
              Copyright (c) 2026 Md. Masum Billah (Masum 9T9 / Nex Masum). All Rights Reserved.<br />
              The custom UI layouts, graphics, branding identity, and core codebase are built with passion and precision.
            </div>
          </section>

          {/* Contact Links */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#D4C8B0] border-b border-[#C7B79A]/20 pb-2 flex items-center gap-2">
              <span>📞</span> Contact & Connect
            </h2>
            <div className="flex flex-wrap gap-3 pt-1">
              <a href="https://9t9.pro.bd" target="_blank" rel="noreferrer" className="px-4 py-2 rounded-xl bg-[#0D0C0A] border border-[#C7B79A]/20 text-xs text-[#C7B79A] hover:bg-[#C7B79A] hover:text-[#0D0C0A] font-bold transition-all">
                🌐 Website
              </a>
              <a href="https://github.com/masum-9t9" target="_blank" rel="noreferrer" className="px-4 py-2 rounded-xl bg-[#0D0C0A] border border-[#C7B79A]/20 text-xs text-[#C7B79A] hover:bg-[#C7B79A] hover:text-[#0D0C0A] font-bold transition-all">
                🐙 GitHub
              </a>
              <a href="mailto:hello@9t9.pro.bd" className="px-4 py-2 rounded-xl bg-[#0D0C0A] border border-[#C7B79A]/20 text-xs text-[#C7B79A] hover:bg-[#C7B79A] hover:text-[#0D0C0A] font-bold transition-all">
                ✉️ Email
              </a>
              <a href="https://wa.me/8801303623838" target="_blank" rel="noreferrer" className="px-4 py-2 rounded-xl bg-[#0D0C0A] border border-[#C7B79A]/20 text-xs text-[#C7B79A] hover:bg-[#C7B79A] hover:text-[#0D0C0A] font-bold transition-all">
                💬 WhatsApp
              </a>
            </div>
          </section>

          {/* Footer Note */}
          <div className="text-center pt-6 border-t border-[#C7B79A]/20 text-xs text-[#A9A39A]">
            <p>Warm regards,</p>
            <p className="text-[#D4C8B0] font-bold text-sm mt-1">Masum 9T9</p>
            <p className="text-[#C7B79A] mt-2">✦ Built with Passion, Precision, and Fire • Masum 9T9 ✦</p>
          </div>

        </div>
      </motion.div>
    </div>
  );
}