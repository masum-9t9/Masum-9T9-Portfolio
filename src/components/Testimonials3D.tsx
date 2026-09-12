/**
 * @file Testimonials3D.tsx
 * @description Professional 25°–30° Angled Side-by-Side Dual-Lane Marquee Testimonial Section
 * Crafted for high-performance 60 FPS scrolling, custom angle selection, and live client feedback submission.
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageSquareQuote,
  Star,
  Quote,
  PlusCircle,
  X,
  Send,
  Zap,
  SlidersHorizontal,
  Upload,
  Image as ImageIcon,
  CheckCircle2
} from 'lucide-react';
import { TestimonialItem, ContactConfig } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { UI_TRANSLATIONS } from '../data/translations';

interface Testimonials3DProps {
  testimonials: TestimonialItem[];
  onAddTestimonial?: (newTestimonial: TestimonialItem) => void;
  contactConfig?: ContactConfig;
}

type TiltAngle = '25deg' | '30deg' | '15deg' | 'flat';
type ScrollSpeed = 'fast' | 'normal' | 'slow';

const SPEED_MAP: Record<ScrollSpeed, string> = {
  fast: '20s',
  normal: '35s',
  slow: '50s',
};

const toBengaliNumerals = (numStr: string | number): string => {
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(numStr).replace(/\d/g, (d) => bnDigits[parseInt(d, 10)]);
};

/**
 * Modular Testimonial Card Component
 */
const TestimonialCardItem: React.FC<{ item: TestimonialItem }> = ({ item }) => {
  const { language } = useLanguage();
  const ratingNum = Number(item.rating) || 5;

  return (
    <div className="w-[155px] xs:w-[185px] sm:w-[420px] h-full min-h-[160px] sm:min-h-[270px] p-2.5 xs:p-3.5 sm:p-7 rounded-xl sm:rounded-3xl border border-[#FF7A18]/20 bg-[#16100B]/95 flex flex-col justify-between shrink-0 transition-all duration-300 shadow-sm relative group overflow-hidden hover:-translate-y-1.5 hover:border-[#FF7A18]/50">
      {/* Background Subtle Watermark Quote */}
      <Quote className="absolute top-2 right-2 sm:top-5 sm:right-5 w-4 h-4 sm:w-8 sm:h-8 text-[#FF7A18]/10 pointer-events-none group-hover:text-[#FF7A18]/20 transition-colors duration-300" />
      <div className="absolute top-0 right-0 w-16 sm:w-28 h-16 sm:h-28 bg-[#FF7A18]/5 rounded-full blur-xl pointer-events-none" />

      <div>
        {/* Rating Stars & Badge */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-0 mb-2 sm:mb-4">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-2.5 h-2.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:scale-105 ${
                  i < Math.floor(ratingNum)
                    ? 'fill-[#FF7A18] text-[#FF7A18]'
                    : i < ratingNum
                    ? 'fill-[#FF7A18]/50 text-[#FF7A18]'
                    : 'fill-[#120D09] text-[#A9A39A]/30'
                }`}
              />
            ))}
            <span className="text-[9px] sm:text-xs text-[#FAF6F0] font-semibold ml-1 bg-[#120D09] px-1.5 py-0.2 sm:px-2 sm:py-0.5 rounded-full border border-[#FF7A18]/20">
              {ratingNum.toFixed(1)}
            </span>
          </div>

          <span className={`text-[8px] sm:text-[10px] font-bold text-[#FF7A18] bg-[#1D140D] px-1.5 py-0.5 sm:px-3 sm:py-1 rounded-full border border-[#FF7A18]/30 shrink-0 truncate max-w-[140px] ${language === 'bn' ? 'font-bn' : ''}`}>
            {item.projectType}
          </span>
        </div>

        {/* Client Feedback Text */}
        <p className={`text-[10px] sm:text-sm text-[#FAF6F0] leading-snug sm:leading-relaxed font-normal mb-2 sm:mb-4 line-clamp-4 sm:line-clamp-none ${language === 'bn' ? 'font-bn' : ''}`}>
          "{item.comment}"
        </p>

        {/* Designed Project Image Attachment if provided */}
        {item.designImageUrl ? (
          <div className="mb-2 sm:mb-4 rounded-lg sm:rounded-2xl overflow-hidden border border-[#FF7A18]/20 bg-[#120D09] p-1 sm:p-2">
            <p className="text-[8px] sm:text-[10px] text-[#A9A39A] font-medium mb-0.5 sm:mb-1.5 flex items-center gap-1">
              <ImageIcon className="w-2.5 h-2.5 text-[#FF7A18]" />
              <span className={`hidden sm:inline ${language === 'bn' ? 'font-bn' : ''}`}>{language === 'bn' ? 'আমার করা প্রজেক্ট ডিজাইন:' : 'Completed Project Work:'}</span>
            </p>
            <div className="relative aspect-video rounded sm:rounded-xl overflow-hidden bg-[#0E0A07] border border-[#FF7A18]/20">
              <img
                src={item.designImageUrl}
                alt="Client Designed Project"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.currentTarget.parentElement as HTMLElement).style.display = 'none';
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        ) : null}
      </div>

      {/* Client Profile Info */}
      <div className="flex items-center gap-2 sm:gap-3 pt-2 sm:pt-4 border-t border-[#FF7A18]/15 mt-auto">
        <div className="relative shrink-0">
          <img
            src={item.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(item.name)}`}
            alt={item.name}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(item.name)}`;
            }}
            className="w-7 h-7 sm:w-11 sm:h-11 rounded-full object-cover border border-[#FF7A18]/30 shadow-sm bg-[#0E0A07]"
          />
          <div className="absolute -bottom-1 -right-1 bg-[#120D09] rounded-full p-0.5 border border-[#FF7A18]/30">
            <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#FF7A18]" />
          </div>
        </div>
        <div className="overflow-hidden">
          <h4 className={`text-[10px] sm:text-sm font-semibold text-[#FAF6F0] group-hover:text-[#FF7A18] transition-colors truncate ${language === 'bn' ? 'font-bn' : ''}`}>
            {item.name}
          </h4>
          <p className={`text-[8px] sm:text-[11px] text-[#A9A39A] font-normal truncate ${language === 'bn' ? 'font-bn' : ''}`}>
            {item.role} {item.company ? `• ${item.company}` : ''}
          </p>
        </div>
      </div>
    </div>
  );
};

export const Testimonials3D: React.FC<Testimonials3DProps> = ({
  testimonials: initialTestimonials,
  onAddTestimonial,
  contactConfig
}) => {
  const { language } = useLanguage();
  const t = UI_TRANSLATIONS[language];

  const [localTestimonials, setLocalTestimonials] = useState<TestimonialItem[]>(initialTestimonials);
  const [selectedAngle, setSelectedAngle] = useState<TiltAngle>('25deg');
  const [selectedSpeed, setSelectedSpeed] = useState<ScrollSpeed>('normal');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);

  // Sync with prop when updated
  React.useEffect(() => {
    setLocalTestimonials(initialTestimonials);
  }, [initialTestimonials]);

  // New review form state
  const [newReview, setNewReview] = useState({
    name: '',
    role: '',
    company: '',
    comment: '',
    rating: 4.9,
    projectType: language === 'bn' ? 'পোস্টার ডিজাইন' : 'Poster Design',
    avatarUrl: '',
    designImageUrl: '',
  });

  // Calculate dynamic average rating across all reviews
  const currentList = localTestimonials.length > 0 ? localTestimonials : initialTestimonials;
  const totalReviewsCount = currentList.length;
  const avgRatingNum = totalReviewsCount > 0
    ? (currentList.reduce((sum, item) => sum + (Number(item.rating) || 5), 0) / totalReviewsCount)
    : 5.0;
  const formattedAvgRating = avgRatingNum.toFixed(1);

  // Duplicate items for infinite continuous marquee loop
  const lane1 = [...currentList, ...currentList, ...currentList, ...currentList];
  const revList = [...currentList].reverse();
  const lane2 = [...revList, ...revList, ...revList, ...revList];

  // Helper for image upload file reader
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'avatarUrl' | 'designImageUrl') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewReview((prev) => ({ ...prev, [field]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) return;

    setIsSubmitting(true);

    const createdItem: TestimonialItem = {
      id: `test-custom-${Date.now()}`,
      name: newReview.name,
      role: newReview.role || (language === 'bn' ? 'ক্লায়েন্ট' : 'Client'),
      company: newReview.company || '',
      comment: newReview.comment,
      rating: Number(newReview.rating) || 5.0,
      avatarUrl: newReview.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(newReview.name)}`,
      projectType: newReview.projectType,
      designImageUrl: newReview.designImageUrl || undefined,
    };

    setLocalTestimonials((prev) => [createdItem, ...prev.filter(i => i.id !== createdItem.id)]);
    if (onAddTestimonial) {
      onAddTestimonial(createdItem);
    }

    // Telegram Bot notification
    const botToken = contactConfig?.telegramBotToken || "8833148612:AAGSPsGtv4dApiRQ3r-ad7mKxFZUj0MdTc0";
    const chatId = contactConfig?.telegramChatId || "8634088852";

    if (botToken && chatId) {
      try {
        const timeString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' });

        const escapeHtml = (str: string) =>
          String(str || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');

        const sanitizeForJson = (url?: string) => {
          if (!url) return undefined;
          if (url.startsWith('data:') || url.startsWith('blob:')) {
            return `[Uploaded Image - ${url.substring(0, 30)}...]`;
          }
          return url;
        };

        const jsonFormatted = JSON.stringify({
          id: `test_${Date.now()}`,
          name: createdItem.name,
          role: createdItem.role,
          company: createdItem.company,
          avatarUrl: sanitizeForJson(createdItem.avatarUrl),
          rating: createdItem.rating,
          comment: createdItem.comment,
          projectType: createdItem.projectType,
          designImageUrl: sanitizeForJson(createdItem.designImageUrl)
        }, null, 2);

        let htmlCaption =
          `<b>🌟 New Client Review Submitted! (Masum 9T9)</b>\n\n` +
          `<b>👤 Name:</b> ${escapeHtml(createdItem.name)}\n` +
          `<b>💼 Role:</b> ${escapeHtml(createdItem.role)} ${createdItem.company ? `(${escapeHtml(createdItem.company)})` : ''}\n` +
          `<b>⭐ Rating:</b> ${createdItem.rating} / 5.0\n` +
          `<b>🎨 Project:</b> ${escapeHtml(createdItem.projectType)}\n` +
          `<b>💬 Comment:</b> "${escapeHtml(createdItem.comment)}"\n` +
          `<b>📅 Time:</b> ${escapeHtml(timeString)}\n\n` +
          `<b>📌 JSON snippet:</b>\n<pre>${escapeHtml(jsonFormatted)}</pre>`;

        if (htmlCaption.length > 950) {
          htmlCaption = htmlCaption.substring(0, 920) + '\n...</pre>';
        }

        let photoSent = false;

        const sendTelegramPhoto = async (photoDataOrUrl: string, captionHtml: string, filename: string) => {
          try {
            const safeCaption = captionHtml.length > 950 ? captionHtml.substring(0, 920) + '...' : captionHtml;

            if (photoDataOrUrl.startsWith('data:image/') || photoDataOrUrl.startsWith('blob:')) {
              const blobRes = await fetch(photoDataOrUrl);
              const blob = await blobRes.blob();

              const formData = new FormData();
              formData.append('chat_id', chatId);
              formData.append('photo', blob, filename);
              formData.append('caption', safeCaption);
              formData.append('parse_mode', 'HTML');

              const res = await fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
                method: 'POST',
                body: formData,
              });
              const resData = await res.json();
              return resData.ok === true;
            } else if (photoDataOrUrl.startsWith('http://') || photoDataOrUrl.startsWith('https://')) {
              const res = await fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  chat_id: chatId,
                  photo: photoDataOrUrl,
                  caption: safeCaption,
                  parse_mode: 'HTML',
                })
              });
              const resData = await res.json();
              return resData.ok === true;
            }
            return false;
          } catch (pErr) {
            console.error('Error sending photo to Telegram:', pErr);
            return false;
          }
        };

        if (createdItem.designImageUrl) {
          const ok = await sendTelegramPhoto(
            createdItem.designImageUrl,
            `<b>🖼️ Project Design Image:</b> ${escapeHtml(createdItem.name)}\n\n` + htmlCaption,
            `design_${Date.now()}.jpg`
          );
          if (ok) photoSent = true;
        }

        if (createdItem.avatarUrl && !createdItem.avatarUrl.includes('dicebear.com')) {
          const avatarCaption = photoSent
            ? `<b>👤 Client Avatar:</b> ${escapeHtml(createdItem.name)}`
            : `<b>👤 Client Avatar with Review:</b> ${escapeHtml(createdItem.name)}\n\n` + htmlCaption;

          const ok = await sendTelegramPhoto(
            createdItem.avatarUrl,
            avatarCaption,
            `avatar_${Date.now()}.jpg`
          );
          if (ok) photoSent = true;
        }

        if (!photoSent) {
          await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: chatId,
              text: htmlCaption,
              parse_mode: 'HTML',
            })
          });
        }
      } catch (err) {
        console.error('Telegram review alert failed:', err);
      }
    }

    setIsSubmitting(false);
    setShowSuccessMsg(true);

    setTimeout(() => {
      setShowSuccessMsg(false);
      setIsModalOpen(false);
      setNewReview({
        name: '',
        role: '',
        company: '',
        comment: '',
        rating: 4.9,
        projectType: language === 'bn' ? 'পোস্টার ডিজাইন' : 'Poster Design',
        avatarUrl: '',
        designImageUrl: '',
      });
    }, 1500);
  };

  const getTiltClass = () => {
    switch (selectedAngle) {
      case '25deg':
        return 'tilt-25deg my-8 sm:my-12';
      case '30deg':
        return 'tilt-30deg my-10 sm:my-14';
      case '15deg':
        return 'tilt-15deg my-6 sm:my-8';
      case 'flat':
      default:
        return 'my-4';
    }
  };

  return (
    <section id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-[#0E0A07] border-t border-b border-[#FF7A18]/20 content-visibility-auto">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF7A18]/5 blur-[180px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto mb-10 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1D140D] border border-[#FF7A18]/30 text-xs text-[#FF7A18] font-extrabold uppercase tracking-widest mb-4 shadow-sm">
            <MessageSquareQuote className="w-3.5 h-3.5 text-[#FF7A18]" />
            <span>{t.testimonials.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#FAF6F0] uppercase mb-3">
            <span className="bg-gradient-to-r from-[#FAF6F0] via-[#FF9238] to-[#FF7A18] bg-clip-text text-transparent">{t.testimonials.title}</span>
          </h2>

          {/* Dynamic Calculated Rating Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-[#16100B] border border-[#FF7A18]/30 text-[#FF7A18] font-bold text-xs sm:text-sm mb-4 shadow-xl backdrop-blur-md">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(avgRatingNum)
                      ? 'fill-[#FF7A18] text-[#FF7A18]'
                      : 'fill-[#FF7A18]/30 text-[#FF7A18]/50'
                  }`}
                />
              ))}
            </div>
            <span>
              {language === 'bn'
                ? `গড় রেটিং: ${toBengaliNumerals(formattedAvgRating)} / ৫.০`
                : `Avg Rating: ${formattedAvgRating} / 5.0`}
            </span>
            <span className="text-[#A9A39A] font-normal">
              ({language === 'bn' ? `${toBengaliNumerals(totalReviewsCount)} টি রিভিউ` : `${totalReviewsCount} Reviews`})
            </span>
          </div>

          <p className="text-[#A9A39A] text-sm sm:text-base font-normal max-w-xl mx-auto mb-6">
            {t.testimonials.subtitle}
          </p>

          {/* Toolbar: Angle & Speed & Add Review Button */}
          <div className="flex flex-wrap items-center justify-center gap-3 p-3 rounded-2xl bg-[#16100B] border border-[#FF7A18]/20 backdrop-blur-md max-w-2xl mx-auto mb-4 shadow-2xl">
            
            {/* Angle Selector Controls */}
            <div className="flex items-center gap-1.5 bg-[#0E0A07] p-1.5 rounded-xl border border-[#FF7A18]/20">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#FF7A18] ml-2" />
              <span className="text-[11px] font-bold text-[#A9A39A] mr-1 hidden sm:inline">
                {language === 'bn' ? 'এঙ্গেল:' : 'Angle:'}
              </span>
              
              {(['25deg', '30deg', '15deg', 'flat'] as TiltAngle[]).map((angle) => (
                <button
                  key={angle}
                  onClick={() => setSelectedAngle(angle)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    selectedAngle === angle
                      ? 'bg-gradient-to-r from-[#FF7A18] to-[#E8590C] text-white shadow-md'
                      : 'text-[#A9A39A] hover:text-[#FAF6F0]'
                  }`}
                >
                  {angle === '25deg' && (language === 'bn' ? '২৫° এঙ্গেল' : '25° Tilt')}
                  {angle === '30deg' && (language === 'bn' ? '৩০° এঙ্গেল' : '30° Tilt')}
                  {angle === '15deg' && (language === 'bn' ? '১৫° এঙ্গেল' : '15° Tilt')}
                  {angle === 'flat' && (language === 'bn' ? 'ফ্ল্যাট' : 'Flat')}
                </button>
              ))}
            </div>

            {/* Scroll Speed Controls */}
            <div className="flex items-center gap-1 bg-[#0E0A07] p-1.5 rounded-xl border border-[#FF7A18]/20">
              <Zap className="w-3.5 h-3.5 text-[#FF7A18] ml-2" />
              {(['fast', 'normal', 'slow'] as ScrollSpeed[]).map((spd) => (
                <button
                  key={spd}
                  onClick={() => setSelectedSpeed(spd)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    selectedSpeed === spd
                      ? 'bg-[#1D140D] text-[#FAF6F0] border border-[#FF7A18]/30'
                      : 'text-[#A9A39A] hover:text-[#FAF6F0]'
                  }`}
                >
                  {spd === 'fast' && (language === 'bn' ? 'দ্রুত' : 'Fast')}
                  {spd === 'normal' && (language === 'bn' ? 'স্বাভাবিক' : 'Normal')}
                  {spd === 'slow' && (language === 'bn' ? 'ধীর' : 'Slow')}
                </button>
              ))}
            </div>

            {/* Add Review Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF7A18] to-[#E8590C] text-white text-xs font-bold flex items-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>{t.testimonials.addReviewBtn}</span>
            </button>
          </div>

          <div className="w-20 h-1 bg-[#FF7A18] mx-auto rounded-full mt-4" />
        </div>

      </div>

      {/* 25°–30° Angled Side-by-Side Scrolling Container */}
      <div
        className="relative w-full py-8 overflow-hidden marquee-container perspective-container"
        style={{ '--marquee-duration': SPEED_MAP[selectedSpeed] } as React.CSSProperties}
      >
        {/* Soft Side Gradient Fades */}
        <div className="absolute top-0 bottom-0 left-0 w-24 sm:w-60 bg-gradient-to-r from-[#0E0A07] via-[#0E0A07]/90 to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-24 sm:w-60 bg-gradient-to-l from-[#0E0A07] via-[#0E0A07]/90 to-transparent z-20 pointer-events-none" />

        <div className={`transition-all duration-700 ease-out origin-center ${getTiltClass()}`}>
          
          {/* Lane 1 */}
          <div className="flex gap-6 w-max animate-marquee-left mb-8">
            {lane1.map((item, index) => (
              <TestimonialCardItem key={`lane1-${item.id}-${index}`} item={item} />
            ))}
          </div>

          {/* Lane 2 */}
          <div className="flex gap-6 w-max animate-marquee-right">
            {lane2.map((item, index) => (
              <TestimonialCardItem key={`lane2-${item.id}-${index}`} item={item} />
            ))}
          </div>

        </div>
      </div>

      {/* Add Review Lightbox Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#16100B] border border-[#FF7A18]/30 rounded-3xl max-w-lg w-full p-6 sm:p-7 relative shadow-2xl my-8 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-[#120D09] text-[#A9A39A] hover:text-[#FAF6F0] border border-[#FF7A18]/20 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-1">
                <MessageSquareQuote className="w-5 h-5 text-[#FF7A18]" />
                <h3 className="text-xl font-bold text-[#FAF6F0]">
                  {language === 'bn' ? 'নতুন ক্লায়েন্ট মতামত যোগ করুন' : 'Add New Client Review'}
                </h3>
              </div>
              <p className="text-xs text-[#A9A39A] mb-5">
                {language === 'bn'
                  ? 'আপনার রিভিউটি সরাসরি সাইটে লাইভ থাকবে এবং সেকশনে যুক্ত হবে।'
                  : 'Your review will be instantly added to the live section.'}
              </p>

              {showSuccessMsg ? (
                <div className="py-12 text-center flex flex-col items-center justify-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-[#FF7A18] animate-bounce" />
                  <h4 className="text-lg font-bold text-[#FAF6F0]">
                    {language === 'bn' ? 'ধন্যবাদ! আপনার মতামত পাঠানো হয়েছে।' : 'Thank you! Your review has been submitted.'}
                  </h4>
                </div>
              ) : (
                <form onSubmit={handleAddSubmit} className="space-y-4">
                  
                  {/* Name & Profession */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#FAF6F0] mb-1">
                        {language === 'bn' ? 'আপনার নাম *' : 'Your Name *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={newReview.name}
                        onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                        placeholder={language === 'bn' ? 'যেমন: তানভীর আহমেদ' : 'e.g. Tanvir Ahmed'}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0E0A07] border border-[#FF7A18]/20 text-[#FAF6F0] text-xs focus:outline-none focus:border-[#FF7A18]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#FAF6F0] mb-1">
                        {language === 'bn' ? 'আপনি কি করেন? (পেশা / রোল) *' : 'Your Role / Title *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={newReview.role}
                        onChange={(e) => setNewReview({ ...newReview, role: e.target.value })}
                        placeholder={language === 'bn' ? 'যেমন: কনটেন্ট ক্রিয়েটর' : 'e.g. Content Creator'}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0E0A07] border border-[#FF7A18]/20 text-[#FAF6F0] text-xs focus:outline-none focus:border-[#FF7A18]"
                      />
                    </div>
                  </div>

                  {/* Brand / Company & Category */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#FAF6F0] mb-1">
                        {language === 'bn' ? 'চ্যানেল / ব্র্যান্ডের নাম' : 'Channel / Brand Name'}
                      </label>
                      <input
                        type="text"
                        value={newReview.company}
                        onChange={(e) => setNewReview({ ...newReview, company: e.target.value })}
                        placeholder={language === 'bn' ? 'যেমন: Tech Bangla' : 'e.g. Tech Media'}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0E0A07] border border-[#FF7A18]/20 text-[#FAF6F0] text-xs focus:outline-none focus:border-[#FF7A18]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#FAF6F0] mb-1">
                        {language === 'bn' ? 'প্রজেক্ট ক্যাটাগরি *' : 'Project Category *'}
                      </label>
                      <select
                        value={newReview.projectType}
                        onChange={(e) => setNewReview({ ...newReview, projectType: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0E0A07] border border-[#FF7A18]/20 text-[#FAF6F0] text-xs focus:outline-none focus:border-[#FF7A18]"
                      >
                        <option value={language === 'bn' ? 'পোস্টার ডিজাইন' : 'Poster Design'}>
                          {language === 'bn' ? 'পোস্টার ডিজাইন' : 'Poster Design'}
                        </option>
                        <option value={language === 'bn' ? 'ইউটিউব থাম্বনেল' : 'YouTube Thumbnail'}>
                          {language === 'bn' ? 'ইউটিউব থাম্বনেল' : 'YouTube Thumbnail'}
                        </option>
                        <option value={language === 'bn' ? 'এডুকেশন থাম্বনেল' : 'Educational Graphics'}>
                          {language === 'bn' ? 'এডুকেশন থাম্বনেল' : 'Educational Graphics'}
                        </option>
                        <option value={language === 'bn' ? 'ব্র্যান্ডিং প্যাকেজ' : 'Branding Package'}>
                          {language === 'bn' ? 'ব্র্যান্ডিং প্যাকেজ' : 'Branding Package'}
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Client Photo Upload */}
                  <div>
                    <label className="block text-xs font-bold text-[#FAF6F0] mb-1">
                      {language === 'bn' ? 'আপনার ছবি (Client Picture)' : 'Your Profile Picture'}
                    </label>
                    <div className="flex items-center gap-3">
                      {newReview.avatarUrl ? (
                        <img
                          src={newReview.avatarUrl}
                          alt="Avatar Preview"
                          className="w-10 h-10 rounded-full object-cover border border-[#FF7A18]/30 bg-[#0E0A07] shrink-0"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-[#0E0A07] border border-[#FF7A18]/20 flex items-center justify-center text-[#A9A39A] shrink-0">
                          <ImageIcon className="w-4 h-4" />
                        </div>
                      )}
                      <div className="flex-1 flex gap-2">
                        <label className="px-3 py-2 rounded-xl bg-[#120D09] hover:bg-[#1D140D] text-[#FAF6F0] text-xs font-semibold cursor-pointer flex items-center gap-1.5 shrink-0 border border-[#FF7A18]/20">
                          <Upload className="w-3.5 h-3.5 text-[#FF7A18]" />
                          <span>{language === 'bn' ? 'ছবি আপলোড' : 'Upload Image'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, 'avatarUrl')}
                            className="hidden"
                          />
                        </label>
                        <input
                          type="text"
                          value={newReview.avatarUrl}
                          onChange={(e) => setNewReview({ ...newReview, avatarUrl: e.target.value })}
                          placeholder={language === 'bn' ? 'বা ছবির URL লিংক দিন...' : 'or image URL...'}
                          className="flex-1 px-3 py-2 rounded-xl bg-[#0E0A07] border border-[#FF7A18]/20 text-[#FAF6F0] text-[11px] focus:outline-none focus:border-[#FF7A18]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Designed Project Image Upload */}
                  <div>
                    <label className="block text-xs font-bold text-[#FAF6F0] mb-1">
                      {language === 'bn' ? 'আপনার জন্য করা ডিজাইন (Project Design Image)' : 'Designed Project Image'}
                    </label>
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <label className="px-3 py-2 rounded-xl bg-[#120D09] hover:bg-[#1D140D] text-[#FAF6F0] text-xs font-semibold cursor-pointer flex items-center gap-1.5 shrink-0 border border-[#FF7A18]/20">
                          <Upload className="w-3.5 h-3.5 text-[#FF7A18]" />
                          <span>{language === 'bn' ? 'ডিজাইন আপলোড' : 'Upload Design'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, 'designImageUrl')}
                            className="hidden"
                          />
                        </label>
                        <input
                          type="text"
                          value={newReview.designImageUrl}
                          onChange={(e) => setNewReview({ ...newReview, designImageUrl: e.target.value })}
                          placeholder={language === 'bn' ? 'বা ডিজাইনের ছবির URL...' : 'or design image URL...'}
                          className="flex-1 px-3 py-2 rounded-xl bg-[#0E0A07] border border-[#FF7A18]/20 text-[#FAF6F0] text-[11px] focus:outline-none focus:border-[#FF7A18]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Rating Slider */}
                  <div className="bg-[#0E0A07] p-3.5 rounded-xl border border-[#FF7A18]/20">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-bold text-[#FAF6F0] flex items-center gap-1.5">
                        <Star className="w-4 h-4 fill-[#FF7A18] text-[#FF7A18]" />
                        <span>{language === 'bn' ? 'রেটিং নির্বাচন করুন:' : 'Select Rating:'}</span>
                      </label>
                      <span className="text-sm font-extrabold text-[#FF7A18] bg-[#FF7A18]/10 px-2.5 py-0.5 rounded-md border border-[#FF7A18]/20">
                        {language === 'bn' ? `${toBengaliNumerals(Number(newReview.rating).toFixed(1))} / ৫.০` : `${Number(newReview.rating).toFixed(1)} / 5.0`}
                      </span>
                    </div>

                    <input
                      type="range"
                      min="1.0"
                      max="5.0"
                      step="0.1"
                      value={newReview.rating}
                      onChange={(e) => setNewReview({ ...newReview, rating: parseFloat(e.target.value) })}
                      className="w-full h-2 bg-[#120D09] rounded-lg appearance-none cursor-pointer accent-[#FF7A18]"
                    />
                  </div>

                  {/* Comment Area */}
                  <div>
                    <label className="block text-xs font-bold text-[#FAF6F0] mb-1">
                      {language === 'bn' ? 'আপনার মতামত / কমেন্ট *' : 'Your Comment *'}
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={newReview.comment}
                      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                      placeholder={language === 'bn' ? 'ডিজাইনের মান ও অভিজ্ঞতা শেয়ার করুন...' : 'Share your design and delivery experience...'}
                      className="w-full p-3 rounded-xl bg-[#0E0A07] border border-[#FF7A18]/20 text-[#FAF6F0] text-xs focus:outline-none focus:border-[#FF7A18] resize-none"
                    />
                  </div>

                  {/* Buttons */}
                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 rounded-xl bg-[#120D09] text-[#A9A39A] text-xs font-semibold hover:bg-[#1D140D] cursor-pointer"
                    >
                      {language === 'bn' ? 'বাতিল' : 'Cancel'}
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FF7A18] to-[#E8590C] text-white text-xs font-bold flex items-center gap-1.5 shadow-md disabled:opacity-50 cursor-pointer uppercase tracking-wider"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{isSubmitting ? (language === 'bn' ? 'সাবমিট হচ্ছে...' : 'Submitting...') : (language === 'bn' ? 'সাবমিট করুন' : 'Submit Review')}</span>
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
