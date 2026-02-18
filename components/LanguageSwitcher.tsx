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

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
  }
}

export default function LanguageSwitcher({ isTransparent }: { isTransparent: boolean }) {
  const [currentLang, setCurrentLang] = useState('en');
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check for saved language or current translation
    const saved = localStorage.getItem('googtrans') || '/en/en';
    const langCode = saved.split('/')[2] || 'en';
    setCurrentLang(langCode);
    
    // Load Google Translate script
    if (!document.getElementById('google-translate-script')) {
      window.googleTranslateElementInit = () => {
        if (window.google?.translate) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: 'en',
              includedLanguages: languages.map(l => l.code).join(','),
              autoDisplay: false,
            },
            'google_translate_element'
          );
        }
      };

      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handleLanguageChange = (langCode: string) => {
    setCurrentLang(langCode);
    setIsOpen(false);

    // Set Google Translate cookies
    const domain = window.location.hostname;
    const cookieValue = langCode === 'en' ? '' : `/en/${langCode}`;
    
    // Set cookies for Google Translate
    document.cookie = `googtrans=${cookieValue}; path=/; domain=${domain}`;
    document.cookie = `googtrans=${cookieValue}; path=/`;
    
    // Store in localStorage
    localStorage.setItem('googtrans', cookieValue || '/en/en');
    
    // Reload page to apply translation
    window.location.reload();
  };

  if (!mounted) return null;

  const currentLanguage = languages.find(l => l.code === currentLang) || languages[0];

  return (
    <>
      {/* Hidden Google Translate Element */}
      <div 
        id="google_translate_element" 
        style={{ 
          position: 'absolute', 
          left: '-9999px',
          visibility: 'hidden',
          width: 0,
          height: 0
        }} 
      />
      
      <div className="relative">
        {/* Language Button */}
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
                  className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-[#f0ece6] transition-colors text-left ${
                    lang.code === currentLang ? 'bg-[#faf9f7]' : ''
                  }`}
                >
                  <span className="text-lg">{lang.flag}</span>
                  <span className="text-sm text-[#0f0f0f] font-normal">{lang.name}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
# Language switcher enabled
