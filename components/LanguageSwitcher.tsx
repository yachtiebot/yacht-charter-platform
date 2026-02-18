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
  const [widgetReady, setWidgetReady] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('language') || 'en';
    setCurrentLang(saved);
    
    // Initialize Google Translate
    if (!document.getElementById('google-translate-script')) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      
      window.googleTranslateElementInit = () => {
        if (window.google?.translate) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: 'en',
              includedLanguages: 'en,es,fr,de,it,pt,ru,zh-CN,ja,ar',
              layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            },
            'google_translate_element'
          );
          setWidgetReady(true);
          
          // Auto-apply saved language
          if (saved !== 'en') {
            setTimeout(() => changeLanguage(saved), 1000);
          }
        }
      };
      
      document.body.appendChild(script);
    }
  }, []);

  const changeLanguage = (langCode: string) => {
    // Try to find and trigger the Google Translate select
    const frame = document.querySelector('.goog-te-menu-frame') as HTMLIFrameElement;
    if (frame) {
      try {
        const doc = frame.contentDocument || frame.contentWindow?.document;
        if (doc) {
          const links = doc.querySelectorAll('.goog-te-menu2-item span.text');
          links.forEach((link: any) => {
            if (link.textContent && languages.find(l => l.name === link.textContent && l.code === langCode)) {
              link.click();
            }
          });
        }
      } catch (e) {
        console.log('Could not access iframe:', e);
      }
    }
    
    // Fallback: manipulate the select element
    setTimeout(() => {
      const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
      if (select) {
        select.value = langCode;
        select.dispatchEvent(new Event('change'));
      }
    }, 100);
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
        select.dispatchEvent(new Event('change'));
      }
    } else {
      changeLanguage(langCode);
    }
  };

  if (!mounted) return null;

  const currentLanguage = languages.find(l => l.code === currentLang) || languages[0];

  return (
    <>
      {/* Hidden Google Translate Element */}
      <div id="google_translate_element" style={{ position: 'absolute', left: '-9999px', top: '-9999px' }} />
      
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
