import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'bn' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // 1. Check if user already manually selected language previously
    const saved = localStorage.getItem('masum9t9_lang');
    if (saved === 'bn' || saved === 'en') return saved;

    // 2. Browser Timezone check (Asia/Dhaka) -> Default Bengali
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz && (tz.toLowerCase().includes('dhaka') || tz.toLowerCase().includes('dacca'))) {
        return 'bn';
      }
    } catch (e) {
      console.error(e);
    }

    // 3. Browser Language check (bn, bn-BD)
    if (typeof navigator !== 'undefined') {
      const navLangs = navigator.languages || [navigator.language];
      for (const l of navLangs) {
        if (l && l.toLowerCase().startsWith('bn')) {
          return 'bn';
        }
      }
    }

    // Default for rest of the world: English ('en')
    return 'en';
  });

  // Sync document.documentElement.lang whenever language changes
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  // On initial mount, also try async IP geolocation as a fallback to confirm country
  useEffect(() => {
    const saved = localStorage.getItem('masum9t9_lang');
    if (!saved) {
      fetch('https://ipapi.co/json/')
        .then((res) => res.json())
        .then((data) => {
          if (data && data.country_code === 'BD') {
            setLanguageState('bn');
          } else if (data && data.country_code && data.country_code !== 'BD') {
            setLanguageState('en');
          }
        })
        .catch(() => {
          // Ignore if API fails or is blocked
        });
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('masum9t9_lang', lang);
  };

  const toggleLanguage = () => {
    const nextLang = language === 'bn' ? 'en' : 'bn';
    setLanguage(nextLang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
