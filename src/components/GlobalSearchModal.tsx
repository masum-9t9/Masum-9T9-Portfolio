import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, Sparkles, FolderKanban, Laptop, Code2, Briefcase, ArrowRight, CornerDownLeft, Command, Hash, Filter } from 'lucide-react';
import { PortfolioItem, FeaturedEcosystemItem, ServiceItem, SkillItem } from '../types';
import { useLanguage } from '../context/LanguageContext';

export interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  portfolioItems: PortfolioItem[];
  ecosystemItems?: FeaturedEcosystemItem[];
  servicesItems?: ServiceItem[];
  skillsItems?: SkillItem[];
  onSelectProject?: (project: PortfolioItem) => void;
}

type FilterCategory = 'all' | 'design' | 'coding' | 'services' | 'skills';

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  portfolioItems = [],
  ecosystemItems = [],
  servicesItems = [],
  skillsItems = [],
  onSelectProject,
}) => {
  const { language } = useLanguage();
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Global Keyboard listener for shortcut (Cmd+K / Ctrl+K or pressing 'F')
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName.toLowerCase();
      const isInput = activeTag === 'input' || activeTag === 'textarea' || (document.activeElement as HTMLElement)?.isContentEditable;

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          const searchBtn = document.getElementById('global-search-trigger');
          if (searchBtn) searchBtn.click();
        }
      } else if (e.key.toLowerCase() === 'f' && !e.metaKey && !e.ctrlKey && !e.altKey && !isInput) {
        if (!isOpen) {
          e.preventDefault();
          const searchBtn = document.getElementById('global-search-trigger');
          if (searchBtn) searchBtn.click();
        }
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Build unified searchable list
  const searchResults = React.useMemo(() => {
    const q = query.trim().toLowerCase();

    const matchedDesign = (portfolioItems || []).map((item) => {
      const matchScore =
        !q ? 1 :
        (item.title?.toLowerCase().includes(q) ? 10 : 0) +
        (item.categoryLabel?.toLowerCase().includes(q) ? 5 : 0) +
        (item.category?.toLowerCase().includes(q) ? 5 : 0) +
        (item.description?.toLowerCase().includes(q) ? 3 : 0) +
        ((item.technologies || []).some((t) => t.toLowerCase().includes(q)) ? 4 : 0) +
        (item.clientName?.toLowerCase().includes(q) ? 4 : 0);

      return {
        type: 'design' as const,
        id: item.id,
        title: item.title,
        subtitle: item.categoryLabel || item.category,
        description: item.description,
        image: item.imageUrl,
        tags: item.technologies || [],
        rawItem: item,
        score: matchScore,
      };
    }).filter((item) => item.score > 0);

    const matchedCoding = (ecosystemItems || []).map((item) => {
      const matchScore =
        !q ? 1 :
        (item.title?.toLowerCase().includes(q) ? 10 : 0) +
        (item.badge?.toLowerCase().includes(q) ? 5 : 0) +
        (item.description?.toLowerCase().includes(q) ? 3 : 0) +
        ((item.keyFeatures || []).some((f) => f.toLowerCase().includes(q)) ? 4 : 0);

      return {
        type: 'coding' as const,
        id: item.id,
        title: item.title,
        subtitle: item.badge || (language === 'bn' ? 'ওয়েব প্ল্যাটফর্ম' : 'Web Platform'),
        description: item.description,
        image: item.galleryImages?.[0],
        tags: item.keyFeatures?.slice(0, 3) || [],
        rawItem: item,
        score: matchScore,
      };
    }).filter((item) => item.score > 0);

    const matchedServices = (servicesItems || []).map((item) => {
      const matchScore =
        !q ? 1 :
        (item.title?.toLowerCase().includes(q) ? 10 : 0) +
        (item.shortDesc?.toLowerCase().includes(q) ? 4 : 0) +
        ((item.features || []).some((f) => f.toLowerCase().includes(q)) ? 3 : 0);

      return {
        type: 'services' as const,
        id: item.id,
        title: item.title,
        subtitle: language === 'bn' ? 'সার্ভিস প্যাকেজ' : 'Service Package',
        description: item.shortDesc,
        image: undefined,
        tags: item.features?.slice(0, 3) || [],
        rawItem: item,
        score: matchScore,
      };
    }).filter((item) => item.score > 0);

    const matchedSkills = (skillsItems || []).map((item) => {
      const matchScore =
        !q ? 1 :
        (item.name?.toLowerCase().includes(q) ? 10 : 0) +
        (item.description?.toLowerCase().includes(q) ? 4 : 0) +
        ((item.tags || []).some((t) => t.toLowerCase().includes(q)) ? 3 : 0);

      return {
        type: 'skills' as const,
        id: item.id,
        title: item.name,
        subtitle: `${item.proficiency}% Proficiency`,
        description: item.description,
        image: item.iconName?.startsWith('http') ? item.iconName : undefined,
        tags: item.tags || [],
        rawItem: item,
        score: matchScore,
      };
    }).filter((item) => item.score > 0);

    let combined = [
      ...matchedDesign,
      ...matchedCoding,
      ...matchedServices,
      ...matchedSkills,
    ];

    if (q) {
      combined.sort((a, b) => b.score - a.score);
    }

    if (activeFilter !== 'all') {
      combined = combined.filter((item) => item.type === activeFilter);
    }

    return combined;
  }, [query, activeFilter, portfolioItems, ecosystemItems, servicesItems, skillsItems, language]);

  // Keyboard navigation within list
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < searchResults.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : searchResults.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (searchResults[selectedIndex]) {
        handleSelectItem(searchResults[selectedIndex]);
      }
    }
  };

  const handleSelectItem = (resultItem: typeof searchResults[0]) => {
    onClose();
    if (resultItem.type === 'design') {
      if (onSelectProject) {
        onSelectProject(resultItem.rawItem as PortfolioItem);
      }
      const el = document.getElementById('portfolio');
      if (el) {
        const yOffset = -80;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    } else if (resultItem.type === 'coding') {
      if (onSelectProject) {
        const ecoMatch = resultItem.rawItem as FeaturedEcosystemItem;
        const converted: PortfolioItem = {
          id: ecoMatch.id,
          title: ecoMatch.title,
          category: 'custom_theme',
          categoryLabel: ecoMatch.badge || 'Portfolio Website',
          imageUrl: ecoMatch.imageUrl || ecoMatch.galleryImages?.[0] || 'https://i.postimg.cc/rsFF9mFd/fbd8b403-9dba-42c1-a984-1293f50492cd.jpg',
          description: ecoMatch.description,
          longDescription: ecoMatch.description + '\n\n' + (ecoMatch.keyFeatures ? 'Key Features:\n• ' + ecoMatch.keyFeatures.join('\n• ') : ''),
          viewsCount: ecoMatch.stats?.[0] ? `${ecoMatch.stats[0].label}: ${ecoMatch.stats[0].value}` : undefined,
          achievement: ecoMatch.stats?.[1] ? `${ecoMatch.stats[1].label}: ${ecoMatch.stats[1].value}` : undefined,
          technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
          clientName: 'Masum 9T9',
          year: '2026',
          liveUrl: ecoMatch.mainUrl,
          designVersion: ecoMatch.designVersion || 'v4.5',
          designerName: ecoMatch.uiuxDesignerName || 'Masum 9T9'
        };
        onSelectProject(converted);
      }
      const el = document.getElementById('ecosystem');
      if (el) {
        const yOffset = -80;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    } else if (resultItem.type === 'services') {
      const el = document.getElementById('services');
      if (el) {
        const yOffset = -80;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    } else if (resultItem.type === 'skills') {
      const el = document.getElementById('skills');
      if (el) {
        const yOffset = -80;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-start justify-center pt-16 sm:pt-24 px-4 sm:px-6">
        
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-neutral-950/85 backdrop-blur-2xl transition-opacity"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: -20 }}
          transition={{ type: 'spring', stiffness: 450, damping: 30 }}
          className="relative w-full max-w-2xl bg-[#12100D] border border-[#C7A77D]/25 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[80vh]"
          onKeyDown={handleKeyDown}
        >
          {/* Top Search Input Row */}
          <div className="relative flex items-center px-5 py-4 border-b border-[#C7A77D]/15 bg-[#181511]">
            <Search className="w-5 h-5 text-[#C7A77D] shrink-0 mr-3" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              placeholder={
                language === 'bn'
                  ? 'প্রজেক্ট, থাম্বনেল, কোডিং টুলস বা স্কিল দিয়ে সার্চ করুন...'
                  : 'Search design projects, thumbnails, web tools, or skills...'
              }
              className="w-full bg-transparent text-[#F1E8DC] text-sm sm:text-base placeholder-[#B8AA98] focus:outline-none font-medium pr-10"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 text-[#B8AA98] hover:text-[#F1E8DC] rounded-lg hover:bg-[#211D17] mr-2 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-[#0B0A08] hover:bg-[#211D17] text-[#B8AA98] hover:text-[#F1E8DC] transition-colors text-xs font-bold border border-[#C7A77D]/20 flex items-center gap-1 shrink-0 cursor-pointer"
            >
              <span>ESC</span>
            </button>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 px-5 py-3 border-b border-[#C7A77D]/15 bg-[#0B0A08] overflow-x-auto no-scrollbar shrink-0">
            <span className="text-[11px] font-bold text-[#DFC29A] uppercase tracking-wider flex items-center gap-1 shrink-0 mr-1">
              <Filter className="w-3 h-3 text-[#C7A77D]" />
              <span>{language === 'bn' ? 'ফিল্টার:' : 'Filter:'}</span>
            </span>

            {[
              { id: 'all', label: language === 'bn' ? 'সব ফলাফল' : 'All Results', count: portfolioItems.length + ecosystemItems.length + servicesItems.length + skillsItems.length },
              { id: 'design', label: language === 'bn' ? '🎨 ডিজাইন প্রজেক্ট' : '🎨 Design Projects', count: portfolioItems.length },
              { id: 'coding', label: language === 'bn' ? '💻 কোডিং প্ল্যাটফর্ম' : '💻 Coding Projects', count: ecosystemItems.length },
              { id: 'services', label: language === 'bn' ? '⚡ সার্ভিস' : '⚡ Services', count: servicesItems.length },
              { id: 'skills', label: language === 'bn' ? '🛠️ দক্ষতা' : '🛠️ Skills', count: skillsItems.length },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => {
                  setActiveFilter(f.id as FilterCategory);
                  setSelectedIndex(0);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
                  activeFilter === f.id
                    ? 'bg-[#C7A77D] text-[#0B0A08] shadow-md'
                    : 'bg-[#181511] text-[#B8AA98] hover:text-[#F1E8DC] border border-[#C7A77D]/20'
                }`}
              >
                <span>{f.label}</span>
                <span className="text-[10px] opacity-75 bg-[#0B0A08]/60 px-1.5 py-0.5 rounded-full">
                  {f.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search Results List */}
          <div className="overflow-y-auto p-3 space-y-2 flex-1 no-scrollbar">
            {searchResults.length > 0 ? (
              searchResults.map((item, index) => {
                const isSelected = index === selectedIndex;

                let BadgeIcon = FolderKanban;
                let badgeColor = 'text-[#C7A77D] bg-[#181511] border-[#C7A77D]/30';
                let badgeText = language === 'bn' ? 'ডিজাইন প্রজেক্ট' : 'Design Project';

                if (item.type === 'coding') {
                  BadgeIcon = Laptop;
                  badgeColor = 'text-[#DFC29A] bg-[#181511] border-[#C7A77D]/30';
                  badgeText = language === 'bn' ? 'কোডিং প্ল্যাটফর্ম' : 'Coding Platform';
                } else if (item.type === 'services') {
                  BadgeIcon = Briefcase;
                  badgeColor = 'text-[#C7A77D] bg-[#181511] border-[#C7A77D]/30';
                  badgeText = language === 'bn' ? 'সার্ভিস paquetes' : 'Service';
                } else if (item.type === 'skills') {
                  BadgeIcon = Code2;
                  badgeColor = 'text-[#DFC29A] bg-[#181511] border-[#C7A77D]/30';
                  badgeText = language === 'bn' ? 'দক্ষতা' : 'Skill';
                }

                return (
                  <div
                    key={`${item.type}-${item.id}-${index}`}
                    onClick={() => handleSelectItem(item)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                      isSelected
                        ? 'bg-[#181511] border-[#C7A77D]/50'
                        : 'bg-[#12100D]/50 border-white/5 hover:border-[#C7A77D]/20'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0 flex-1">
                      {/* Image Thumbnail or Icon */}
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-14 h-14 rounded-xl object-cover border border-[#C7A77D]/20 shrink-0 bg-[#0B0A08]"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center border shrink-0 ${badgeColor}`}>
                          <BadgeIcon className="w-5 h-5" />
                        </div>
                      )}

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${badgeColor}`}>
                            {badgeText}
                          </span>
                          {item.subtitle && (
                            <span className="text-[11px] font-bold text-[#B8AA98] truncate">
                              • {item.subtitle}
                            </span>
                          )}
                        </div>

                        <h4 className="text-sm font-bold text-[#F1E8DC] truncate">
                          {item.title}
                        </h4>

                        <p className="text-xs text-[#B8AA98] truncate font-normal mt-0.5">
                          {item.description}
                        </p>

                        {/* Tags */}
                        {item.tags && item.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1.5">
                            {(item.tags || []).slice(0, 3).map((tag, tIdx) => (
                              <span
                                key={tIdx}
                                className="text-[10px] font-semibold text-[#B8AA98] bg-[#0B0A08] px-2 py-0.5 rounded-md border border-[#C7A77D]/15"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      <span className="text-xs text-[#DFC29A] font-bold hidden sm:inline">
                        {language === 'bn' ? 'দেখুন' : 'View'}
                      </span>
                      <div className="w-8 h-8 rounded-xl bg-[#C7A77D]/15 text-[#C7A77D] flex items-center justify-center border border-[#C7A77D]/30">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-10 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-2xl bg-[#12100D] border border-[#C7A77D]/20 flex items-center justify-center text-[#B8AA98] mb-4">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-[#F1E8DC] mb-1">
                  {language === 'bn' ? 'কোন ফলাফল পাওয়া যায়নি' : 'No matching results found'}
                </h3>
                <p className="text-xs text-[#B8AA98] max-w-sm mb-6">
                  {language === 'bn'
                    ? 'অন্য কোন কীওয়ার্ড যেমন "Poster", "Thumbnail", "Photoshop" বা "React" দিয়ে ট্রাই করে দেখুন।'
                    : 'Try searching with keywords like "Poster", "Thumbnail", "Photoshop" or "React".'}
                </p>

                {/* Popular Keywords suggestion pills */}
                <div className="flex flex-wrap items-center justify-center gap-2 max-w-md">
                  <span className="text-xs text-[#B8AA98] font-semibold mr-1">
                    {language === 'bn' ? 'জনপ্রিয় সার্চ:' : 'Suggestions:'}
                  </span>
                  {['Poster', 'Thumbnail', 'Pixellab', 'React', 'YouTube', 'Bangla'].map((kw) => (
                    <button
                      key={kw}
                      onClick={() => setQuery(kw)}
                      className="px-2.5 py-1 rounded-lg bg-[#12100D] border border-[#C7A77D]/20 text-xs font-bold text-[#DFC29A] hover:bg-[#181511] transition-all cursor-pointer"
                    >
                      {kw}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Navigation Hints */}
          <div className="px-5 py-3 border-t border-[#C7A77D]/15 bg-[#0B0A08] text-[#B8AA98] text-xs flex items-center justify-between shrink-0 font-medium">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-[#181511] text-[#F1E8DC] text-[10px] font-mono border border-[#C7A77D]/20">↑↓</kbd>
                <span>{language === 'bn' ? 'সরে যান' : 'Navigate'}</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-[#181511] text-[#F1E8DC] text-[10px] font-mono border border-[#C7A77D]/20">↵</kbd>
                <span>{language === 'bn' ? 'সিলেক্ট করুন' : 'Select'}</span>
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-[#DFC29A] font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Masum 9T9 Global Search</span>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
