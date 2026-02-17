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
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
];

export default function LanguageSwitcher({ isTransparent }: { isTransparent: boolean }) {
  const [currentLang, setCurrentLang] = useState('en');
  const [isOpen, setIsOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Load saved language preference
    const saved = localStorage.getItem('language') || 'en';
    setCurrentLang(saved);
    
    // Initialize Google Translate
    initGoogleTranslate(saved);
  }, []);

  const initGoogleTranslate = (langCode: string) => {
    if (typeof window === 'undefined') return;

    // Add Google Translate script
    (window as any).googleTranslateElementInit = function() {
      new (window as any).google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: languages.map(l => l.code).join(','),
        layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false
      }, 'google_translate_element');
      
      setIsReady(true);
      
      // Auto-apply saved language
      if (langCode !== 'en') {
        setTimeout(() => triggerTranslation(langCode), 1500);
      }
    };
    
    if (!document.querySelector('script[src*="translate.google.com"]')) {
      const script = document.createElement('script');
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.head.appendChild(script);
    }
  };

  const triggerTranslation = (langCode: string) => {
    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event('change', { bubbles: true }));
    }
  };

  const handleLanguageChange = (langCode: string) => {
    setCurrentLang(langCode);
    localStorage.setItem('language', langCode);
    setIsOpen(false);
    
    if (langCode === 'en') {
      // Reset to English
      const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
      if (select) {
        select.value = '';
        select.dispatchEvent(new Event('change', { bubbles: true }));
      }
    } else {
      // Translate to selected language
      if (isReady) {
        triggerTranslation(langCode);
      } else {
        // Wait for widget to load
        setTimeout(() => triggerTranslation(langCode), 2000);
      }
    }
  };

  const currentLanguage = languages.find(l => l.code === currentLang) || languages[0];

  return (
    <div className="relative">
      {/* Hidden Google Translate Element */}
      <div id="google_translate_element" className="hidden" />
      
      {/* Custom Language Selector */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`editorial-label flex items-center gap-2 transition-colors duration-700 ${
          isTransparent
            ? 'text-white hover:text-[#c4a265]'
            : 'text-[#0f0f0f] hover:text-[#4e7483]'
        }`}
      >
        <span>{currentLanguage.flag}</span>
        <span className="hidden md:inline">{currentLanguage.code.toUpperCase()}</span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 bg-white border border-black/10 shadow-lg z-50 min-w-[200px]">
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
