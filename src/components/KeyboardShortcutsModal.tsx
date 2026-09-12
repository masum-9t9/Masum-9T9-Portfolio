import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Keyboard, X, Sparkles, Navigation, Command, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  const isBn = language === 'bn';

  if (!isOpen) return null;

  const shortcutsNav = [
    { keys: ['1', 'H'], labelBn: 'হোম পেজ', labelEn: 'Home Page' },
    { keys: ['2', 'P'], labelBn: 'প্রজেক্টস পেজ', labelEn: 'Projects Page' },
    { keys: ['3', 'S'], labelBn: 'সার্ভিসেস পেজ', labelEn: 'Services Page' },
    { keys: ['4', 'R'], labelBn: 'রিভিউস পেজ', labelEn: 'Reviews Page' },
    { keys: ['5', 'A'], labelBn: 'এবাউট পেজ', labelEn: 'About Page' },
    { keys: ['6', 'C'], labelBn: 'যোগাযোগ পেজ', labelEn: 'Contact Page' },
  ];

  const shortcutsActions = [
    { keys: ['⌘K', '/', 'F'], labelBn: 'গ্লোবাল সার্চ খোলা', labelEn: 'Open Global Search' },
    { keys: ['?'], labelBn: 'শর্টকাট গাইড দেখা', labelEn: 'Show Keyboard Shortcuts' },
    { keys: ['Esc'], labelBn: 'যেকোনো মোডাল বন্ধ করা', labelEn: 'Close active modal' },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 15 }}
          transition={{ type: 'spring', stiffness: 380, damping: 28 }}
          className="relative w-full max-w-lg bg-[#12100D] border border-[#C7A77D]/25 rounded-3xl p-5 sm:p-7 shadow-2xl backdrop-blur-2xl overflow-hidden z-10"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#C7A77D]/5 rounded-full blur-3xl pointer-events-none" />

          {/* Modal Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#C7A77D]/15 mb-5 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#181511] border border-[#C7A77D]/30 flex items-center justify-center text-[#C7A77D] shadow-lg">
                <Keyboard className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#F1E8DC] flex items-center gap-2">
                  <span>{isBn ? 'কিবোর্ড শর্টকাট গাইড' : 'Keyboard Shortcuts Guide'}</span>
                </h3>
                <p className="text-xs text-[#B8AA98] font-normal">
                  {isBn ? 'দ্রুত ওয়েবসাইট নেভিগেট ও কন্ট্রোল করার শর্টকাট' : 'Quick keybindings for effortless site navigation'}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-[#181511] hover:bg-[#211D17] text-[#B8AA98] hover:text-[#F1E8DC] border border-[#C7A77D]/20 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="space-y-5 relative z-10">
            {/* Category 1: Navigation */}
            <div className="space-y-2.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#DFC29A] flex items-center gap-1.5">
                <Navigation className="w-3 h-3 text-[#C7A77D]" />
                <span>{isBn ? 'পেজ নেভিগেশন শর্টকাট' : 'Page Navigation'}</span>
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {shortcutsNav.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-[#0B0A08] border border-[#C7A77D]/15"
                  >
                    <span className="text-xs font-medium text-[#F1E8DC]">
                      {isBn ? item.labelBn : item.labelEn}
                    </span>
                    <div className="flex items-center gap-1">
                      {item.keys.map((k, kIdx) => (
                        <span
                          key={kIdx}
                          className="px-2 py-0.5 rounded-md bg-[#181511] border border-[#C7A77D]/25 font-mono text-[11px] font-bold text-[#DFC29A] shadow-sm"
                        >
                          {k}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category 2: Quick Actions */}
            <div className="space-y-2.5 pt-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#DFC29A] flex items-center gap-1.5">
                <Command className="w-3 h-3 text-[#C7A77D]" />
                <span>{isBn ? 'কুইক অ্যাকশন ও সার্চ' : 'Quick Actions & Search'}</span>
              </span>

              <div className="space-y-2">
                {shortcutsActions.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-[#0B0A08] border border-[#C7A77D]/15"
                  >
                    <span className="text-xs font-medium text-[#F1E8DC]">
                      {isBn ? item.labelBn : item.labelEn}
                    </span>
                    <div className="flex items-center gap-1">
                      {item.keys.map((k, kIdx) => (
                        <span
                          key={kIdx}
                          className="px-2 py-0.5 rounded-md bg-[#181511] border border-[#C7A77D]/25 font-mono text-[11px] font-bold text-[#DFC29A] shadow-sm"
                        >
                          {k}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="mt-6 pt-4 border-t border-[#C7A77D]/15 flex items-center justify-end relative z-10">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-[#C7A77D] hover:bg-[#DFC29A] text-[#0B0A08] font-bold text-xs transition-colors shadow-md cursor-pointer uppercase tracking-wider"
            >
              {isBn ? 'বুঝেছি (Got It)' : 'Got It'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
