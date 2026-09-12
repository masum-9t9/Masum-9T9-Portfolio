import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Copy, ExternalLink, Sparkles, UserCheck, MessageSquare } from 'lucide-react';
import { SocialLinks, ContactConfig } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { copyToClipboard } from '../utils/clipboard';

interface CreatorProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  creatorName?: string;
  creatorRole?: string;
  socials?: Partial<SocialLinks>;
  contact?: Partial<ContactConfig>;
  profileImage?: string;
  onNavigate?: (page: string) => void;
}

export const CreatorProfileModal: React.FC<CreatorProfileModalProps> = ({
  isOpen,
  onClose,
  creatorName = "Masum 9T9",
  creatorRole,
  socials = {},
  contact = {},
  profileImage = "https://i.postimg.cc/bYQL7Lvj/Profile-pic-(3).png",
  onNavigate,
}) => {
  const { language } = useLanguage();
  const [isCopied, setIsCopied] = useState(false);

  if (!isOpen) return null;

  const defaultRole = language === 'bn' 
    ? "ডেভেলপার, কন্টেন্ট ক্রিয়েটর ও ডিজাইনার" 
    : "Designer & Web Developer";

  const displayRole = (creatorRole && creatorRole !== "Graphics Designer & Full-Stack Developer") 
    ? creatorRole 
    : defaultRole;

  const handleCopyProfileLink = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const success = await copyToClipboard(url);
    if (success) {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    }
  };

  const safeSocials: Partial<SocialLinks> = socials || {};
  const safeContact: Partial<ContactConfig> = contact || {};

  const channelList = [
    {
      id: 'github',
      name: 'GitHub',
      handle: '@masum-9t9',
      url: safeSocials.github || 'https://github.com/masum-9t9/',
      iconClass: 'fa-brands fa-github text-[#F1E8DC]',
    },
    {
      id: 'facebook',
      name: 'Facebook',
      handle: 'masum.9t9.official',
      url: safeSocials.facebook || 'https://facebook.com/masum.9t9.official',
      iconClass: 'fa-brands fa-facebook text-[#C7A77D]',
    },
    {
      id: 'fiverr',
      name: 'Fiverr',
      handle: 'masum9t9',
      url: safeSocials.fiverr || 'https://www.fiverr.com/sellers/masum9t9/',
      iconClass: 'fa-solid fa-briefcase text-[#C7A77D]',
    },
    {
      id: 'behance',
      name: 'Behance',
      handle: 'masum_9t9_official',
      url: safeSocials.behance || 'https://www.behance.net/masum_9t9_official',
      iconClass: 'fa-brands fa-behance text-[#C7A77D]',
    },
    {
      id: 'youtube',
      name: 'YouTube',
      handle: '@ParahinAcademy',
      url: safeSocials.youtube || 'https://youtube.com/@ParahinAcademy',
      iconClass: 'fa-brands fa-youtube text-red-400',
    },
    {
      id: 'gmail',
      name: 'Gmail / Email',
      handle: safeSocials.email || 'masum.9t9.gd@gmail.com',
      url: `mailto:${safeSocials.email || 'masum.9t9.gd@gmail.com'}`,
      iconClass: 'fa-solid fa-envelope text-[#C7A77D]',
    },
    {
      id: 'phone',
      name: 'Phone / WhatsApp',
      handle: safeSocials.phone || safeContact.phone || '01303-623838',
      url: safeSocials.whatsapp || `https://wa.me/8801303623838`,
      iconClass: 'fa-brands fa-whatsapp text-[#C7A77D]',
    },
    {
      id: 'telegram',
      name: 'Telegram',
      handle: safeContact.telegramUsername || '@masum_9t9_official',
      url: safeSocials.telegram || 'https://t.me/masum_9t9_official',
      iconClass: 'fa-brands fa-telegram text-[#C7A77D]',
    },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/95 backdrop-blur-xl"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          className="relative w-full max-w-2xl bg-[#12100D] border border-[#C7A77D]/25 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 overflow-hidden text-[#F1E8DC]"
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 p-2.5 rounded-full bg-[#181511] border border-[#C7A77D]/30 text-[#B8AA98] hover:text-[#F1E8DC] transition-all shadow-md z-20 cursor-pointer"
            title="বন্ধ করুন"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 pb-6 border-b border-[#C7A77D]/15 relative z-10">
            <div className="relative group">
              <img
                src={profileImage}
                alt={creatorName}
                referrerPolicy="no-referrer"
                className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-[#C7A77D]/40 shadow-2xl bg-[#0B0A08]"
              />
              <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#C7A77D] border-2 border-[#0B0A08] flex items-center justify-center text-[#0B0A08] text-[10px] shadow-lg">
                <UserCheck className="w-3.5 h-3.5" />
              </span>
            </div>

            <div className="text-center sm:text-left space-y-1.5 flex-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#181511] border border-[#C7A77D]/30 text-[#DFC29A] text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-[#C7A77D]" />
                <span>অফিসিয়াল ক্রিয়েটর প্রোফাইল</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-[#F1E8DC] tracking-tight">
                {creatorName}
              </h3>

              <p className="text-sm font-bold text-[#DFC29A]">
                {displayRole}
              </p>

              <p className="text-xs text-[#B8AA98] max-w-md pt-1 font-normal">
                নিচের যে কোনো সোশ্যাল চ্যানেল, মার্কেটপ্লেস বা ডাইরেক্ট ইমেইল/হোয়াটসঅ্যাপে যোগাযোগ করুন।
              </p>
            </div>
          </div>

          <div className="py-6 space-y-3 relative z-10">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#B8AA98] flex items-center justify-between">
              <span>সংযোগ মাধ্যম (SOCIALS & CONTACTS)</span>
              <span className="text-[10px] text-[#DFC29A] font-mono">8 Channels</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {channelList.map((ch) => (
                <a
                  key={ch.id}
                  href={ch.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-[#0B0A08] border border-[#C7A77D]/20 hover:border-[#C7A77D]/40 transition-all duration-200 flex items-center justify-between group shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#181511] border border-[#C7A77D]/20 flex items-center justify-center text-base shrink-0">
                      <i className={ch.iconClass} />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-[#F1E8DC] tracking-wide">
                        {ch.name}
                      </p>
                      <p className="text-[11px] font-mono text-[#B8AA98] truncate max-w-[140px] sm:max-w-[150px]">
                        {ch.handle}
                      </p>
                    </div>
                  </div>

                  <ExternalLink className="w-4 h-4 text-[#B8AA98] group-hover:text-[#F1E8DC] transition-all" />
                </a>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-[#C7A77D]/15 flex flex-wrap items-center justify-between gap-3 relative z-10">
            <button
              type="button"
              onClick={handleCopyProfileLink}
              className="px-4 py-2.5 rounded-xl border border-[#C7A77D]/20 bg-[#181511] text-[#B8AA98] hover:text-[#F1E8DC] text-xs font-bold flex items-center gap-2 transition-all cursor-pointer"
            >
              {isCopied ? (
                <>
                  <Check className="w-4 h-4 text-[#C7A77D]" />
                  <span>প্রোফাইল লিংক কপি হয়েছে!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#C7A77D]" />
                  <span>প্রোফাইল লিংক কপি করুন</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                if (onNavigate) onNavigate('contact');
                else window.location.pathname = '/contact';
              }}
              className="px-6 py-2.5 rounded-xl bg-[#C7A77D] hover:bg-[#DFC29A] text-[#0B0A08] text-xs font-bold shadow-md flex items-center gap-2 cursor-pointer uppercase tracking-wider"
            >
              <MessageSquare className="w-4 h-4" />
              <span>বার্তা পাঠান</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
