import React, { useState, useEffect, ReactNode, ErrorInfo, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { loadPortfolioConfig, savePortfolioConfig, getLocalizedPortfolioConfig, INITIAL_PORTFOLIO_CONFIG } from './data/config';
import { PortfolioConfig, PortfolioItem } from './types';
import { LanguageProvider, useLanguage } from './context/LanguageContext';

import { NavigationDock, PageId } from './components/NavigationDock';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { CreatorProfileModal } from './components/CreatorProfileModal';
import { KeyboardShortcutsModal } from './components/KeyboardShortcutsModal';
import { AnimatedVectorBG } from './components/AnimatedVectorBG';
import { DesktopContactButton } from './components/DesktopContactButton';
import { FloatingWhatsAppButton } from './components/FloatingWhatsAppButton';
import { GlobalScrollProgress } from './components/GlobalScrollProgress';
import { SmoothScrollProvider, smoothScrollToTop } from './components/SmoothScroll';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { ContactPage } from './pages/ContactPage';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public props: ErrorBoundaryProps;
  public state: ErrorBoundaryState;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.props = props;
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught rendering error:", error, errorInfo);
  }

  private handleReset = () => {
    try {
      localStorage.clear();
    } catch (e) {
      console.error("Failed to clear localStorage:", e);
    }
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0D0C0A] text-[#E8E2D8] flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md bg-[#151411] border border-[#C7B79A]/20 p-8 rounded-2xl shadow-xl">
            <h1 className="text-2xl font-bold text-[#D4C8B0] mb-3">App Recovery Mode</h1>
            <p className="text-sm text-[#A9A39A] mb-6">
              A temporary issue occurred while displaying the application. Click below to clear stored cache and load fresh data.
            </p>
            {this.state.error && (
              <pre className="text-xs bg-[#0D0C0A] p-3 rounded text-red-300 overflow-x-auto mb-6 text-left max-h-32 border border-red-500/20">
                {this.state.error.toString()}
              </pre>
            )}
            <button
              onClick={this.handleReset}
              className="px-6 py-2.5 rounded-xl bg-[#C7B79A] hover:bg-[#D4C8B0] font-bold text-[#0D0C0A] transition-all shadow-md active:scale-95 cursor-pointer"
            >
              Clear Cache & Reload
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Helper to resolve a portfolio project or featured ecosystem item by its ID from config
 */
function resolveProjectFromConfig(
  projectId: string | null,
  config: PortfolioConfig | null
): PortfolioItem | null {
  if (!projectId || !config) return null;

  const match = config.portfolio?.find((item) => item.id === projectId);
  if (match) return match;

  const ecoMatch = config.featuredEcosystem?.find((item) => item.id === projectId);
  if (ecoMatch) {
    return {
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
      designerName: ecoMatch.uiuxDesignerName || 'Masum 9T9',
    };
  }

  return null;
}

function MainContent() {
  const { language } = useLanguage();
  const [baseConfig, setBaseConfig] = useState<PortfolioConfig>(() => {
    try {
      return loadPortfolioConfig();
    } catch (e) {
      console.error("Error initial load:", e);
      return INITIAL_PORTFOLIO_CONFIG;
    }
  });

  // Client-side Page Routing with Clean Path Sync (/page-name)
  const [activePage, setActivePage] = useState<PageId>(() => {
    const validPages: PageId[] = ['home', 'about', 'services', 'projects', 'reviews', 'contact'];
    
    // Check clean pathname (e.g. "/about" -> "about")
    const pathname = window.location.pathname.replace(/^\//, '').split('/')[0];
    if (validPages.includes(pathname as PageId)) {
      return pathname as PageId;
    }

    // Fallback/Legacy hash migration (e.g. "/#/about")
    const hash = window.location.hash.replace('#/', '').replace('#', '').split('/')[0];
    if (validPages.includes(hash as PageId)) {
      return hash as PageId;
    }

    return 'home';
  });

  // Initialize selected project immediately on mount from URL query parameters (?project=...)
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(() => {
    if (typeof window === 'undefined') return null;
    try {
      const params = new URLSearchParams(window.location.search);
      const projectId = params.get('project');
      if (!projectId) return null;

      const initialConfig = loadPortfolioConfig() || INITIAL_PORTFOLIO_CONFIG;
      const savedLang = (localStorage.getItem('preferred_language') as 'en' | 'bn') || 'bn';
      const localized = getLocalizedPortfolioConfig(initialConfig, savedLang);
      return resolveProjectFromConfig(projectId, localized);
    } catch (e) {
      console.warn("Failed to initialize selected project from URL query on mount:", e);
      return null;
    }
  });
  const [projectsFilter, setProjectsFilter] = useState<'all' | 'ui_ux' | 'graphics' | 'frontend'>('all');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCreatorModalOpen, setIsCreatorModalOpen] = useState(false);
  const [isKeymappingOpen, setIsKeymappingOpen] = useState(false);

  // Dynamically get English or Bengali config safely (memoized to avoid recalculating on re-renders)
  const activeConfig = useMemo(() => {
    return getLocalizedPortfolioConfig(baseConfig || INITIAL_PORTFOLIO_CONFIG, language || 'bn');
  }, [baseConfig, language]);

  // Handle Clean Path & Popstate / Legacy Hash Navigation
  useEffect(() => {
    const handlePopState = () => {
      const validPages: PageId[] = ['home', 'about', 'services', 'projects', 'reviews', 'contact'];
      const pathname = window.location.pathname.replace(/^\//, '').split('/')[0];
      const hash = window.location.hash.replace('#/', '').replace('#', '').split('/')[0];

      let targetPage: PageId = 'home';
      if (validPages.includes(pathname as PageId)) {
        targetPage = pathname as PageId;
      } else if (validPages.includes(hash as PageId)) {
        targetPage = hash as PageId;
      }

      setActivePage(targetPage);

      // Synchronize project details popup from URL parameter on browser back/forward
      const params = new URLSearchParams(window.location.search);
      const projectId = params.get('project');
      if (!projectId) {
        setSelectedProject(null);
      } else if (activeConfig) {
        const match = resolveProjectFromConfig(projectId, activeConfig);
        setSelectedProject(match);
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
      smoothScrollToTop(0.6);
    };

    // Auto-migrate legacy hash URLs (e.g., /#/about) to clean path (/about)
    if (window.location.hash) {
      const hash = window.location.hash.replace('#/', '').replace('#', '').split('/')[0];
      const validPages: PageId[] = ['home', 'about', 'services', 'projects', 'reviews', 'contact'];
      if (validPages.includes(hash as PageId)) {
        const cleanPath = hash === 'home' ? '/' : `/${hash}`;
        window.history.replaceState({}, '', cleanPath + window.location.search);
      }
    }

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, [activeConfig]);

  const navigateToPage = (pageId: PageId, filter?: 'all' | 'ui_ux' | 'graphics' | 'frontend') => {
    setActivePage(pageId);
    if (filter) {
      setProjectsFilter(filter);
    }
    const targetPath = pageId === 'home' ? '/' : `/${pageId}`;
    if (window.location.pathname !== targetPath || window.location.hash) {
      window.history.pushState({}, '', targetPath + window.location.search);
    }
    smoothScrollToTop(0.75);
  };

  // Helper to open project and automatically update the direct project link in the browser URL
  const handleSelectProject = (project: PortfolioItem | null) => {
    setSelectedProject(project);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (project) {
        url.searchParams.set('project', project.id);
        const currentParam = new URLSearchParams(window.location.search).get('project');
        if (currentParam !== project.id) {
          window.history.pushState({ projectId: project.id }, '', url.pathname + url.search);
        }
      } else {
        if (url.searchParams.has('project')) {
          url.searchParams.delete('project');
          const cleanSearch = url.searchParams.toString();
          const cleanUrl = url.pathname + (cleanSearch ? `?${cleanSearch}` : '');
          window.history.pushState({}, '', cleanUrl);
        }
      }
    }
  };

  // Synchronize or update active project when URL or activeConfig changes
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('project');
    if (projectId && activeConfig) {
      const match = resolveProjectFromConfig(projectId, activeConfig);
      if (match) {
        setSelectedProject(match);
      }
    }
  }, [activeConfig]);

  // Global Keyboard Shortcuts (Keymapping across entire website)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts if user is typing inside an input, textarea, or contentEditable element
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable)
      ) {
        return;
      }

      // Search Modal Shortcut: Cmd+K / Ctrl+K or /
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
        return;
      }

      if (e.key === '/') {
        e.preventDefault();
        setIsSearchOpen(true);
        return;
      }

      if (e.key === '?') {
        e.preventDefault();
        setIsKeymappingOpen((prev) => !prev);
        return;
      }

      // Escape to close modals
      if (e.key === 'Escape') {
        if (isSearchOpen) setIsSearchOpen(false);
        if (isKeymappingOpen) setIsKeymappingOpen(false);
        if (isCreatorModalOpen) setIsCreatorModalOpen(false);
        if (selectedProject) handleSelectProject(null);
        return;
      }

      // Quick Page Navigation Keybindings (1-6 or single letters H, P, S, R, A, C)
      const key = e.key.toLowerCase();
      if (key === '1' || key === 'h') {
        navigateToPage('home');
      } else if (key === '2' || key === 'p') {
        navigateToPage('projects');
      } else if (key === '3' || key === 's') {
        navigateToPage('services');
      } else if (key === '4' || key === 'r') {
        navigateToPage('reviews');
      } else if (key === '5' || key === 'a') {
        navigateToPage('about');
      } else if (key === '6' || key === 'c') {
        navigateToPage('contact');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, isCreatorModalOpen, selectedProject]);

  const handleAddTestimonial = (newTestimonial: any) => {
    const currentTestimonials = baseConfig?.testimonials || INITIAL_PORTFOLIO_CONFIG.testimonials || [];
    const updatedConfig = {
      ...baseConfig,
      testimonials: [newTestimonial, ...currentTestimonials],
    };
    setBaseConfig(updatedConfig);
    savePortfolioConfig(updatedConfig);
  };

  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const pageVariants = {
    initial: prefersReducedMotion 
      ? { opacity: 0 } 
      : { opacity: 0, y: 22, scale: 0.988, filter: 'blur(8px)' },
    animate: prefersReducedMotion 
      ? { opacity: 1 } 
      : { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
    exit: prefersReducedMotion 
      ? { opacity: 0 } 
      : { opacity: 0, y: -16, scale: 0.99, filter: 'blur(6px)' },
  };

  const pageTransition = {
    duration: prefersReducedMotion ? 0.15 : 0.42,
    ease: [0.22, 1, 0.36, 1], // Studio-grade cubic bezier for silky smooth entrance
  };

  return (
    <div className={`min-h-screen text-[#E8E2D8] font-['Manrope','Hind_Siliguri',sans-serif] selection:bg-[#C7B79A] selection:text-[#0D0C0A] relative overflow-x-hidden transition-colors duration-500 ${isCreatorModalOpen ? 'bg-black' : 'bg-[#0D0C0A]'}`}>
      
      {/* Global Framer Motion Scroll Progress & Jump-To-Top Control */}
      <GlobalScrollProgress />

      {/* High-Performance Animated Vector Background */}
      <AnimatedVectorBG />

      {/* Floating Apple macOS Dock Navigation */}
      <NavigationDock
        activePage={activePage}
        onNavigate={navigateToPage}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Animated Multi-Page Render */}
      <main className="min-h-[80vh] relative z-10">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activePage}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
            className="w-full"
          >
            {activePage === 'home' && (
              <HomePage
                config={activeConfig}
                onSelectProject={handleSelectProject}
                onOpenCreatorProfile={() => setIsCreatorModalOpen(true)}
                onAddTestimonial={handleAddTestimonial}
                onNavigate={navigateToPage}
                onOpenKeymapping={() => setIsKeymappingOpen(true)}
              />
            )}

            {activePage === 'about' && (
              <AboutPage
                config={activeConfig}
                onNavigate={navigateToPage}
              />
            )}

            {activePage === 'services' && (
              <ServicesPage
                config={activeConfig}
                onNavigate={navigateToPage}
              />
            )}

            {activePage === 'projects' && (
              <ProjectsPage
                config={activeConfig}
                onSelectProject={handleSelectProject}
                onOpenCreatorProfile={() => setIsCreatorModalOpen(true)}
                initialFilter={projectsFilter}
              />
            )}

            {activePage === 'reviews' && (
              <ReviewsPage
                config={activeConfig}
                onAddTestimonial={handleAddTestimonial}
                onNavigate={navigateToPage}
              />
            )}

            {activePage === 'contact' && (
              <ContactPage
                config={activeConfig}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating Quick Action Contacts */}
      <DesktopContactButton
        whatsappNumber={activeConfig.contact?.whatsappNumber || '8801303623838'}
        facebookUrl={activeConfig.socials?.facebook || 'https://www.facebook.com/masum.9t9.official'}
        telegramUrl={activeConfig.socials?.telegram || 'https://t.me/masum_9t9_official'}
        phone={activeConfig.contact?.phone || activeConfig.socials?.phone || '+880 1303-623838'}
        onNavigateToContact={() => navigateToPage('contact')}
      />
      <FloatingWhatsAppButton
        whatsappNumber={activeConfig.contact?.whatsappNumber || '8801303623838'}
      />

      {/* Footer */}
      <Footer 
        socials={activeConfig.socials} 
        profileImage={activeConfig.hero?.profileImage || "https://i.postimg.cc/xCX1vY0H/Profile-pic.png"}
        onNavigate={navigateToPage}
      />

      {/* Portfolio Item Detail Lightbox Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            key={selectedProject.id}
            project={selectedProject}
            onClose={() => handleSelectProject(null)}
            onOpenCreatorProfile={() => setIsCreatorModalOpen(true)}
            onNavigate={navigateToPage}
          />
        )}
      </AnimatePresence>

      {/* Creator Contact & Social Links Modal (Black BG) */}
      {isCreatorModalOpen && (
        <CreatorProfileModal
          isOpen={isCreatorModalOpen}
          onClose={() => setIsCreatorModalOpen(false)}
          socials={activeConfig.socials}
          contact={activeConfig.contact}
          creatorRole={activeConfig.hero?.role}
          onNavigate={navigateToPage}
        />
      )}

      {/* Global Project & Code Search Modal */}
      {isSearchOpen && (
        <GlobalSearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          portfolioItems={activeConfig.portfolio}
          ecosystemItems={activeConfig.featuredEcosystem}
          servicesItems={activeConfig.services}
          skillsItems={activeConfig.skills}
          onSelectProject={(item) => {
            handleSelectProject(item);
            setIsSearchOpen(false);
          }}
        />
      )}

      {/* Keyboard Shortcuts Keymapping Modal */}
      {isKeymappingOpen && (
        <KeyboardShortcutsModal
          isOpen={isKeymappingOpen}
          onClose={() => setIsKeymappingOpen(false)}
        />
      )}

    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <SmoothScrollProvider>
          <MainContent />
        </SmoothScrollProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}
