import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Calendar, User, CheckCircle, Maximize2, ZoomIn, Eye, Trophy, Award, Sparkles, Layers, Check, Share2 } from 'lucide-react';
import { PortfolioItem } from '../types';
import { copyToClipboard, getProjectShareUrl } from '../utils/clipboard';
import { pauseLenis, resumeLenis } from './SmoothScroll';

interface ProjectModalProps {
  project: PortfolioItem | null;
  onClose: () => void;
  onOpenCreatorProfile?: () => void;
  onNavigate?: (page: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onOpenCreatorProfile, onNavigate }) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Lock background website scroll (including html, body, and Lenis) so ONLY the modal content scrolls
  useEffect(() => {
    if (!project) return;
    
    // Completely pause smooth scroll provider to stop wheel hijacking
    pauseLenis();

    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalBodyOverflow = document.body.style.overflow;
    const originalBodyTouchAction = document.body.style.touchAction;
    const originalBodyPaddingRight = document.body.style.paddingRight;
    
    // Prevent layout shift from scrollbar disappearing
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    return () => {
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.overflow = originalBodyOverflow;
      document.body.style.touchAction = originalBodyTouchAction;
      document.body.style.paddingRight = originalBodyPaddingRight;
      resumeLenis();
    };
  }, [project]);

  if (!project) return null;

  const handleShare = async () => {
    const url = getProjectShareUrl(project.id, project.liveUrl);
    const success = await copyToClipboard(url);

    if (navigator.share && /mobile|android|iphone/i.test(navigator.userAgent)) {
      try {
        await navigator.share({
          title: project.title,
          text: project.description,
          url: url,
        });
      } catch (err) {
        // User closed native share sheet
      }
    }

    if (success) {
      setIsCopied(true);
      setShowToast(true);
      setTimeout(() => {
        setIsCopied(false);
        setShowToast(false);
      }, 3000);
    }
  };

  return (
    <motion.div 
      data-lenis-prevent
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md p-2 sm:p-4 md:p-6 flex items-center justify-center overflow-hidden"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => {
        if (e.target === e.currentTarget) e.preventDefault();
      }}
    >
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[80] px-5 py-3 rounded-2xl bg-[#C7A77D] text-[#0B0A08] font-bold text-xs sm:text-sm shadow-2xl flex items-center gap-2.5 border border-[#DFC29A]"
          >
            <CheckCircle className="w-5 h-5 text-[#0B0A08] shrink-0" />
            <span>Copied! Direct project share link copied to clipboard</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        data-lenis-prevent
        initial={{ opacity: 0, scale: 0.94, y: 22 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="bg-[#12100D] border border-[#C7A77D]/25 rounded-3xl max-w-4xl w-full my-auto shadow-2xl relative text-[#F1E8DC] overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[90vh]"
      >
          {/* Top Sticky Header with Project Badge & Action Buttons */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-[#C7A77D]/15 bg-[#12100D]/95 backdrop-blur-md z-30 shrink-0">
            <div className="flex items-center gap-2.5 truncate max-w-[70%]">
              <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#181511] text-[#DFC29A] text-xs font-bold border border-[#C7A77D]/30 shrink-0">
                {project.categoryLabel}
              </span>
              <span className="text-sm font-bold text-[#F1E8DC] truncate hidden xs:inline" title={project.title}>
                {project.title}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleShare}
                className={`ios-icon-btn w-9 h-9 ${
                  isCopied
                    ? '!border-[#C7B79A] !text-[#DFC29A]'
                    : ''
                }`}
                title={isCopied ? 'Copied!' : 'Share Project'}
              >
                {isCopied ? <Check className="w-4 h-4 text-[#C7B79A]" /> : <Share2 className="w-4 h-4 text-[#C7B79A]" />}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="ios-icon-btn w-9 h-9"
                title="বন্ধ করুন"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Dedicated Smooth Scrollable Body */}
          <div 
            data-lenis-prevent
            tabIndex={0}
            className="overflow-y-auto overscroll-contain flex-1 p-0 scroll-smooth focus:outline-none"
            style={{ 
              WebkitOverflowScrolling: 'touch',
              overscrollBehavior: 'contain',
              touchAction: 'pan-y',
            }}
            onWheel={(e) => {
              e.stopPropagation();
            }}
            onTouchMove={(e) => {
              e.stopPropagation();
            }}
          >
            {/* Project Image Container */}
            <div className="relative bg-[#0B0A08] flex flex-col items-center justify-center p-3 sm:p-5 border-b border-[#C7A77D]/15 group">
              <div className="relative max-h-[55vh] sm:max-h-[60vh] w-full flex items-center justify-center overflow-hidden rounded-xl">
                <img
                  src={project.imageUrl || 'https://i.postimg.cc/rsFF9mFd/fbd8b403-9dba-42c1-a984-1293f50492cd.jpg'}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "https://i.postimg.cc/rsFF9mFd/fbd8b403-9dba-42c1-a984-1293f50492cd.jpg";
                  }}
                  className="max-h-[55vh] sm:max-h-[60vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
                />
                
                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(true)}
                  className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-[#0B0A08]/80 hover:bg-[#181511] text-[#F1E8DC] border border-[#C7A77D]/30 text-xs font-bold flex items-center gap-1.5 backdrop-blur-md transition-all shadow-lg hover:scale-105 cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-[#C7A77D]" />
                  <span>ফুল পোস্টার ভিউ</span>
                </button>
              </div>
            </div>

            {/* Details Content */}
            <div className="p-5 sm:p-7 space-y-6">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={onOpenCreatorProfile}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#181511] border border-[#C7A77D]/30 text-[#B8AA98] hover:text-[#F1E8DC] text-xs font-bold transition-all cursor-pointer group"
                    >
                      <User className="w-3.5 h-3.5 text-[#C7A77D]" />
                      <span>Designer: <strong className="text-[#DFC29A] underline">{project.designerName || "Masum 9T9"}</strong></span>
                    </button>
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => setIsLightboxOpen(true)}
                    className="text-xs text-[#DFC29A] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <ZoomIn className="w-3.5 h-3.5 text-[#C7A77D]" />
                    <span>সম্পূর্ণ ইমেজ জুম করে দেখুন</span>
                  </button>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-[#F1E8DC] mb-3">{project.title}</h3>
                
                <div className="bg-[#0B0A08] p-4 rounded-2xl border border-[#C7A77D]/20 mb-4">
                  <h4 className="text-xs font-bold text-[#DFC29A] mb-2 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#C7A77D]" />
                    <span>প্রজেক্ট ওভারভিউ ও বিস্তারিত</span>
                  </h4>
                  <p className="text-[#B8AA98] text-sm leading-relaxed whitespace-pre-line font-normal">
                    {project.longDescription || project.description}
                  </p>
                </div>
              </div>

              {(project.viewsCount || project.achievement) && (
                <div className="p-4 rounded-2xl bg-[#0B0A08] border border-[#C7A77D]/25 text-xs space-y-2">
                  <h4 className="text-xs font-bold text-[#DFC29A] uppercase tracking-wider flex items-center gap-1.5">
                    <Trophy className="w-4 h-4 text-[#C7A77D] shrink-0" />
                    <span>অর্জন, ভিউজ ও পারফরম্যান্স</span>
                  </h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {project.viewsCount && (
                      <div className="p-3 rounded-xl bg-[#12100D] border border-[#C7A77D]/20 flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-[#181511] text-[#DFC29A]">
                          <Eye className="w-5 h-5 text-[#C7A77D]" />
                        </div>
                        <div>
                          <p className="text-[#B8AA98] text-[11px]">মোট ভিউজ / রিচ</p>
                          <p className="text-base font-bold text-[#F1E8DC]">{project.viewsCount}</p>
                        </div>
                      </div>
                    )}

                    {project.achievement && (
                      <div className="p-3 rounded-xl bg-[#12100D] border border-[#C7A77D]/20 flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-[#181511] text-[#DFC29A]">
                          <Award className="w-5 h-5 text-[#C7A77D]" />
                        </div>
                        <div>
                          <p className="text-[#B8AA98] text-[11px]">প্রধান অর্জন / রেকর্ড</p>
                          <p className="text-sm font-bold text-[#DFC29A]">{project.achievement}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-[#0B0A08] border border-[#C7A77D]/20 text-xs">
                {project.clientName && (
                  <div>
                    <p className="text-[#B8AA98] font-medium mb-1">ক্লায়েন্ট / চ্যানেল</p>
                    <p className="font-bold text-[#F1E8DC] flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#C7A77D]" />
                      <span>{project.clientName}</span>
                    </p>
                  </div>
                )}

                {project.year && (
                  <div>
                    <p className="text-[#B8AA98] font-medium mb-1">প্রজেক্ট সাল</p>
                    <p className="font-bold text-[#F1E8DC] flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#C7A77D]" />
                      <span>{project.year}</span>
                    </p>
                  </div>
                )}

                {project.designVersion && (
                  <div>
                    <p className="text-[#B8AA98] font-medium mb-1">ডিজাইন ভার্সন</p>
                    <p className="font-bold text-[#DFC29A] flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-[#C7A77D]" />
                      <span>{project.designVersion}</span>
                    </p>
                  </div>
                )}

                <div>
                  <p className="text-[#B8AA98] font-medium mb-1">স্ট্যাটাস</p>
                  <p className="font-bold text-[#DFC29A] flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-[#C7A77D]" />
                    <span>সম্পন্ন (Completed)</span>
                  </p>
                </div>
              </div>

              {project.technologies && project.technologies.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-[#B8AA98] mb-2 uppercase tracking-wider">ব্যবহৃত সফটওয়্যার ও প্রযুক্তি</h4>
                  <div className="flex flex-wrap gap-2">
                    {(project.technologies || []).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-lg bg-[#0B0A08] text-[#B8AA98] text-xs font-medium border border-[#C7A77D]/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Bottom Actions inside the scrollable view with generous padding */}
              <div className="pt-5 pb-4 border-t border-[#C7A77D]/15 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsLightboxOpen(true)}
                    className="ios-btn-secondary px-4 py-2 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Eye className="w-4 h-4 text-[#C7A77D]" />
                    <span>ফুল সাইজ দেখুন</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleShare}
                    className="ios-btn-secondary px-4 py-2 text-xs font-semibold flex items-center gap-2 cursor-pointer"
                    title="Share project & copy direct link"
                  >
                    <Share2 className="w-4 h-4 text-[#C7A77D]" />
                    <span>Share</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="ios-btn-secondary px-5 py-2.5 text-xs font-semibold cursor-pointer"
                  >
                    বন্ধ করুন
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      if (onNavigate) onNavigate('contact');
                      else window.location.pathname = '/contact';
                    }}
                    className="ios-btn-primary px-6 py-2.5 text-xs font-bold flex items-center gap-2 cursor-pointer uppercase tracking-wider"
                  >
                    <span>এই ধরণের প্রজেক্ট অর্ডার করুন</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </motion.div>

        {/* Full Image HD Lightbox */}
        <AnimatePresence>
          {isLightboxOpen && (
            <motion.div 
              data-lenis-prevent
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-between p-3 sm:p-5 overflow-hidden"
              onClick={(e) => {
                if (e.target === e.currentTarget) setIsLightboxOpen(false);
              }}
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => {
                if (e.target === e.currentTarget) e.preventDefault();
              }}
            >
              <div className="w-full max-w-6xl flex items-center justify-between py-2.5 px-4 bg-[#12100D] border border-[#C7A77D]/30 rounded-2xl mb-3 shrink-0">
                <h4 className="text-sm font-bold text-[#F1E8DC] truncate max-w-md">{project.title} — এইচডি পোস্টার ভিউ</h4>
                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(false)}
                  className="p-2 rounded-xl bg-[#181511] hover:bg-[#211D17] text-[#F1E8DC] text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                  <span>বন্ধ করুন</span>
                </button>
              </div>

              <div 
                data-lenis-prevent
                className="flex-1 w-full max-w-5xl flex items-center justify-center p-2 overflow-y-auto overscroll-contain my-auto"
                style={{ overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch' }}
                onWheel={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
              >
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="max-h-[82vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl border border-[#C7A77D]/20"
                />
              </div>

              <div className="mt-3 text-center text-xs text-[#B8AA98] shrink-0">
                পোস্টারের সম্পূর্ণ ডিজাইন দেখতে ওপর-নিচে স্ক্রোল করুন
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
};
