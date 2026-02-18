'use client';

import { useState, useEffect } from 'react';

// Supported languages
const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'zh-CN', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
];

export default function LanguageSwitcher({ isTransparent }: { isTransparent: boolean }) {
  const [currentLang, setCurrentLang] = useState('en');
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('language') || 'en';
    setCurrentLang(saved);
  }, []);

  const handleLanguageChange = (langCode: string) => {
    localStorage.setItem('language', langCode);
    setCurrentLang(langCode);
    setIsOpen(false);
    
    if (langCode === 'en') {
      // Return to original site
      window.location.href = window.location.origin + window.location.pathname;
    } else {
      // Redirect to Google Translate URL
      const currentUrl = window.location.origin + window.location.pathname;
      const translateUrl = `https://translate.google.com/translate?sl=en&tl=${langCode}&u=${encodeURIComponent(currentUrl)}`;
      window.location.href = translateUrl;
    }
  };

  if (!mounted) return null;

  const currentLanguage = languages.find(l => l.code === currentLang) || languages[0];

  return (
    <div className="relative">
      {/* Custom Language Selector */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`editorial-label flex items-center gap-2 transition-colors duration-700 ${
          isTransparent
            ? 'text-white hover:text-[#c4a265]'
            : 'text-[#0f0f0f] hover:text-[#4e7483]'
        }`}
        aria-label="Select language"
      >
        <span className="text-base">{currentLanguage.flag}</span>
        <span className="hidden lg:inline">{currentLanguage.code.split('-')[0].toUpperCase()}</span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 bg-white border border-black/10 shadow-lg z-50 min-w-[200px] max-h-[400px] overflow-y-auto">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-[#f0ece6] transition-colors text-left font-light ${
                  lang.code === currentLang ? 'bg-[#faf9f7]' : ''
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="text-sm text-[#0f0f0f]">{lang.name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
