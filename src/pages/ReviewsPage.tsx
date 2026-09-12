import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Star,
  Plus,
  Quote,
  CheckCircle2,
  X,
  Sparkles,
  ImageIcon,
  MessageSquareQuote,
  Filter
} from 'lucide-react';
import { Testimonials3D } from '../components/Testimonials3D';
import { SEO } from '../components/SEO';
import { PortfolioConfig, TestimonialItem } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { UI_TRANSLATIONS } from '../data/translations';

interface ReviewsPageProps {
  config: PortfolioConfig;
  onAddTestimonial: (testimonial: TestimonialItem) => void;
  onNavigate: (page: string) => void;
}

export const ReviewsPage: React.FC<ReviewsPageProps> = ({ config, onAddTestimonial, onNavigate }) => {
  const { language } = useLanguage();
  const t = UI_TRANSLATIONS[language];

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    comment: '',
    rating: 5,
    projectType: 'Poster / Thumbnail Design',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const testimonials = config.testimonials || [];

  const categories = useMemo(() => {
    const cats = Array.from(new Set(testimonials.map(t => t.projectType).filter(Boolean)));
    return ['all', ...cats];
  }, [testimonials]);

  const filteredTestimonials = useMemo(() => {
    if (activeCategory === 'all') return testimonials;
    return testimonials.filter(item => item.projectType === activeCategory);
  }, [testimonials, activeCategory]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.comment) return;

    setIsSubmitting(true);

    const newTestimonial: TestimonialItem = {
      id: `rev_${Date.now()}`,
      name: formData.name,
      role: formData.role || 'Client',
      company: formData.company || 'Content Creator',
      comment: formData.comment,
      rating: formData.rating,
      projectType: formData.projectType,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    };

    setTimeout(() => {
      onAddTestimonial(newTestimonial);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        setShowAddModal(false);
        setFormData({
          name: '',
          role: '',
          company: '',
          comment: '',
          rating: 5,
          projectType: 'Poster / Thumbnail Design',
        });
      }, 1200);
    }, 400);
  };

  const reviewsSchemaGraph = [
    {
      '@type': 'ItemPage',
      '@id': 'https://9t9.pro.bd/reviews#page',
      url: 'https://9t9.pro.bd/reviews',
      name: 'Client Reviews & Testimonials — Masum 9T9',
      description: 'Authentic 5-star client ratings and feedback for YouTube thumbnails, drama posters, UI/UX designs, and web development projects by Masum 9T9.',
      mainEntity: {
        '@type': 'AggregateRating',
        itemReviewed: { '@id': 'https://9t9.pro.bd/#masum9t9' },
        ratingValue: '5.0',
        bestRating: '5',
        worstRating: '1',
        ratingCount: `${testimonials.length}`,
        reviewCount: `${testimonials.length}`,
      },
    },
  ];

  return (
    <div className="pt-24 sm:pt-28 pb-16 px-3.5 sm:px-6 lg:px-8 bg-[#0E0A07] text-[#FAF6F0]">
      <SEO
        title="Client Reviews & Testimonials — 5-Star Rated Design Services | Masum 9T9"
        description="Read authentic client feedback and testimonials for graphic design, high-CTR YouTube thumbnails, and web applications delivered by Masum 9T9."
        canonicalUrl="https://9t9.pro.bd/reviews"
        keywords="Masum 9T9 Reviews, Client Feedback, Graphic Designer Rating Bangladesh, 9t9.pro.bd testimonials"
        breadcrumbs={[
          { name: 'Home', item: 'https://9t9.pro.bd/' },
          { name: 'Reviews', item: 'https://9t9.pro.bd/reviews' },
        ]}
        customSchema={reviewsSchemaGraph}
      />

      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-10 sm:mb-14">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1D140D] border border-[#FF7A18]/30 text-xs sm:text-sm text-[#FF7A18] font-bold uppercase tracking-wider mb-3"
        >
          <Sparkles className="w-4 h-4 text-[#FF7A18]" />
          <span className={language === 'bn' ? 'font-bn' : ''}>{language === 'bn' ? 'বিশ্বস্ত মতামত ও রিভিউ' : 'CLIENT EXPERIENCES'}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`text-3xl sm:text-6xl font-extrabold text-[#FAF6F0] tracking-tight mb-3 ${language === 'bn' ? 'font-bn' : ''}`}
        >
          <span>
            {language === 'bn' ? 'ক্লায়েন্টদের সন্তুষ্টিই আমার কাজের মূল পরিচয়' : 'Real Feedback from Real Creators'}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-[#A9A39A] text-xs sm:text-base max-w-xl mx-auto leading-relaxed mb-6 font-normal"
        >
          {language === 'bn'
            ? 'ইউটিউবার, নাটক ডিরেক্টর এবং উদ্যোক্তাদের দেওয়া মতামত ও রেটিং।'
            : 'Explore verified testimonials from YouTubers, drama directors, and brands worldwide.'}
        </motion.p>

        {/* Add Review Trigger */}
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-fiery-orange px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold inline-flex items-center gap-2 shadow-lg cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span className={language === 'bn' ? 'font-bn' : ''}>{language === 'bn' ? 'রিভিউ বা মতামত লিখুন' : 'Submit a Review'}</span>
        </button>
      </div>

      {/* Interactive 3D Showcase */}
      <Testimonials3D
        testimonials={testimonials}
        onAddTestimonial={onAddTestimonial}
        contactConfig={config.contact}
      />

      {/* Staggered Review Grid */}
      <section className="max-w-7xl mx-auto mt-16 sm:mt-24 pt-12 border-t border-white/10">
        
        {/* Grid Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1D140D] border border-[#FF7A18]/25 text-[#FF7A18] text-xs font-bold mb-2">
              <MessageSquareQuote className="w-3.5 h-3.5 text-[#FF7A18]" />
              <span className={language === 'bn' ? 'font-bn' : ''}>{language === 'bn' ? 'সকল ক্লায়েন্ট রিভিউ গ্যালারি' : 'All Reviews Collection'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#FAF6F0]">
              <span className={language === 'bn' ? 'font-bn' : ''}>{language === 'bn' ? 'ক্যাটাগরি অনুযায়ী ফিল্টার করুন' : 'Explore Detailed Reviews'}</span>
            </h2>
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 max-w-full">
            <Filter className="w-4 h-4 text-[#FF7A18] shrink-0 mr-1" />
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#FF7A18] text-white shadow-md shadow-[#FF7A18]/30'
                    : 'bg-[#16100B] border border-white/10 text-[#A9A39A] hover:text-white hover:border-white/20'
                }`}
              >
                {cat === 'all'
                  ? (language === 'bn' ? <span className="font-bn">সব রিভিউ</span> : 'All Reviews')
                  : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredTestimonials.map((item, index) => {
            const ratingNum = Number(item.rating) || 5;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.3,
                  delay: (index % 6) * 0.04,
                }}
                className="glass-card p-6 sm:p-7 rounded-3xl border border-[#FF7A18]/20 flex flex-col justify-between shadow-xl bg-[#16100B] relative group overflow-hidden hover:border-[#FF7A18]/45 transition-all"
              >
                <Quote className="absolute top-5 right-5 w-8 h-8 text-[#FF7A18]/10 pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(ratingNum)
                              ? 'fill-[#FF7A18] text-[#FF7A18]'
                              : 'fill-[#120D09] text-white/10'
                          }`}
                        />
                      ))}
                      <span className="text-xs text-[#FF7A18] font-bold ml-1 bg-[#221710] px-2 py-0.5 rounded-full border border-[#FF7A18]/25">
                        {ratingNum.toFixed(1)}
                      </span>
                    </div>

                    <span className="text-[10px] font-bold text-[#FF7A18] bg-[#221710] px-3 py-1 rounded-full border border-[#FF7A18]/30 shrink-0 truncate max-w-[140px]">
                      {item.projectType}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#FAF6F0] leading-relaxed font-normal mb-4">
                    "{item.comment}"
                  </p>

                  {item.designImageUrl ? (
                    <div className="mb-4 rounded-2xl overflow-hidden border border-white/10 bg-[#0E0A07] p-2">
                      <p className="text-[10px] text-[#A9A39A] font-bold mb-1.5 flex items-center gap-1">
                        <ImageIcon className="w-3 h-3 text-[#FF7A18]" />
                        <span className={language === 'bn' ? 'font-bn' : ''}>{language === 'bn' ? 'আমার করা প্রজেক্ট ডিজাইন:' : 'Completed Project Work:'}</span>
                      </p>
                      <div className="relative aspect-video rounded-xl overflow-hidden bg-[#16100B] border border-white/10">
                        <img
                          src={item.designImageUrl}
                          alt="Client Project Design"
                          loading="lazy"
                          decoding="async"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </div>
                  ) : null}
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <img
                    src={item.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'}
                    alt={item.name}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover border border-[#FF7A18]/40 shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm font-bold text-[#FAF6F0] truncate">{item.name}</h4>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FF7A18] shrink-0" title="Verified Client" />
                    </div>
                    <p className="text-[11px] text-[#A9A39A] truncate">{item.role} • {item.company}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Add Testimonial Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#16100B] border border-[#FF7A18]/30 rounded-3xl p-6 max-w-lg w-full shadow-2xl relative"
            >
              <button
                onClick={() => setShowAddModal(false)}
                className="absolute top-4 right-4 p-2 text-[#A9A39A] hover:text-white rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-xl font-extrabold text-[#FAF6F0] mb-1">
                {language === 'bn' ? 'আপনার অভিজ্ঞতা ও রিভিউ জানান' : 'Leave a Client Review'}
              </h3>
              <p className="text-xs text-[#A9A39A] mb-4">
                {language === 'bn' ? 'Masum 9T9 এর সাথে কাজ করার অভিজ্ঞতা শেয়ার করুন।' : 'Share your thoughts and feedback on projects completed together.'}
              </p>

              {submitSuccess ? (
                <div className="text-center py-8">
                  <div className="w-12 h-12 rounded-full bg-[#FF7A18]/20 border border-[#FF7A18] flex items-center justify-center text-[#FF7A18] mx-auto mb-3">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-[#FAF6F0]">
                    {language === 'bn' ? 'রিভিউ সফলভাবে জমা হয়েছে!' : 'Review Submitted Successfully!'}
                  </h4>
                  <p className="text-xs text-[#A9A39A] mt-1">
                    {language === 'bn' ? 'ধন্যবাদ আপনার মূল্যবান মতামতের জন্য।' : 'Thank you for your valuable feedback.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold text-[#A9A39A] mb-1">
                      {language === 'bn' ? 'আপনার নাম *' : 'Your Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Tanvir Ahmed"
                      className="w-full px-3.5 py-2 rounded-xl bg-[#120D09] border border-white/10 text-xs text-[#FAF6F0] focus:border-[#FF7A18] outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#A9A39A] mb-1">
                        {language === 'bn' ? 'পদবী / পেশা' : 'Role / Title'}
                      </label>
                      <input
                        type="text"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        placeholder="e.g. YouTuber / Founder"
                        className="w-full px-3.5 py-2 rounded-xl bg-[#120D09] border border-white/10 text-xs text-[#FAF6F0] focus:border-[#FF7A18] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#A9A39A] mb-1">
                        {language === 'bn' ? 'চ্যানেল / প্রতিষ্ঠান' : 'Brand / Channel'}
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g. Visual Media"
                        className="w-full px-3.5 py-2 rounded-xl bg-[#120D09] border border-white/10 text-xs text-[#FAF6F0] focus:border-[#FF7A18] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#A9A39A] mb-1">
                      {language === 'bn' ? 'প্রজেক্টের ধরন' : 'Project Type'}
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#120D09] border border-white/10 text-xs text-[#FAF6F0] focus:border-[#FF7A18] outline-none"
                    >
                      <option value="YouTube Thumbnail Design">YouTube Thumbnail Design</option>
                      <option value="Poster / Drama Art">Poster / Drama Art</option>
                      <option value="Social Media Kit">Social Media Kit</option>
                      <option value="UI/UX & Web Development">UI/UX & Web Development</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#A9A39A] mb-1">
                      {language === 'bn' ? 'রেটিং (১ থেকে ৫ স্টার)' : 'Rating'}
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormData({ ...formData, rating: star })}
                          className="p-1 hover:scale-110 transition-transform cursor-pointer"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= formData.rating
                                ? 'fill-[#FF7A18] text-[#FF7A18]'
                                : 'fill-[#120D09] text-white/20'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#A9A39A] mb-1">
                      {language === 'bn' ? 'আপনার মূল্যবান মতামত *' : 'Your Review *'}
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formData.comment}
                      onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                      placeholder={language === 'bn' ? 'কাজের কোয়ালিটি এবং ডেলিভারি নিয়ে কিছু লিখুন...' : 'Share your project experience with Masum 9T9...'}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#120D09] border border-white/10 text-xs text-[#FAF6F0] focus:border-[#FF7A18] outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-fiery-orange w-full py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                  >
                    <span>{isSubmitting ? (language === 'bn' ? 'জমা হচ্ছে...' : 'Submitting...') : (language === 'bn' ? 'রিভিউ পাবলিশ করুন' : 'Publish Review')}</span>
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
