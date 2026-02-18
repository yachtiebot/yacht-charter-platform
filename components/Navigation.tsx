'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navigation() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Pages with dark hero images that need transparent nav
  const darkHeroPages = ['/', '/yacht-rental-miami', '/about', '/contact'];
  const hasDarkHero = darkHeroPages.includes(pathname);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const isTransparent = hasDarkHero && !isScrolled;
  
  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        isTransparent 
          ? 'bg-transparent' 
          : 'bg-[#faf9f7] border-b border-black/10'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-20 md:h-24 flex items-center justify-between">
        {/* Logo - Plain Text */}
        <Link 
          href="/" 
          className={`text-sm md:text-base font-normal transition-colors duration-700 ${
            isTransparent ? 'text-white' : 'text-[#0f0f0f]'
          }`}
        >
          Miami Yachting Company
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-10">
          <Link
            href="/yacht-rental-miami"
            className={`editorial-label transition-colors duration-700 ${
              isTransparent 
                ? 'text-white hover:text-[#c4a265]' 
                : 'text-[#0f0f0f] hover:text-[#4e7483]'
            }`}
          >
            Fleet
          </Link>
          <Link
            href="/locations"
            className={`editorial-label transition-colors duration-700 ${
              isTransparent 
                ? 'text-white hover:text-[#c4a265]' 
                : 'text-[#0f0f0f] hover:text-[#4e7483]'
            }`}
          >
            Locations
          </Link>
          <Link
            href="/about"
            className={`editorial-label transition-colors duration-700 ${
              isTransparent 
                ? 'text-white hover:text-[#c4a265]' 
                : 'text-[#0f0f0f] hover:text-[#4e7483]'
            }`}
          >
            About
          </Link>
          
          <LanguageSwitcher isTransparent={isTransparent} />
          
          <div className="hidden xl:flex items-center gap-6">
            <a
              href="https://wa.me/message/T7LESNSS34RWJ1"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-xl transition-colors duration-700 ${
                isTransparent ? 'text-white hover:text-[#c4a265]' : 'text-[#0f0f0f] hover:text-[#25D366]'
              }`}
              aria-label="WhatsApp"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </a>
            <div className={`editorial-label transition-colors duration-700 ${
              isTransparent ? 'text-white' : 'text-[#6b6b6b]'
            }`}>
              1 800 747 9585
            </div>
          </div>
          
          <Link
            href="/contact"
            className={`editorial-label border px-6 py-2.5 transition-all duration-500 ${
              isTransparent
                ? 'border-white text-white bg-transparent hover:bg-white hover:text-[#0f0f0f]'
                : 'border-[#0f0f0f] text-[#0f0f0f] bg-transparent hover:bg-[#0f0f0f] hover:text-white'
            }`}
          >
            Book Now
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className={`lg:hidden flex flex-col gap-1.5 transition-colors duration-700`}
          aria-label="Menu"
        >
          <span className={`w-6 h-[1.5px] transition-colors duration-700 ${
            isTransparent ? 'bg-white' : 'bg-[#0f0f0f]'
          }`} />
          <span className={`w-6 h-[1.5px] transition-colors duration-700 ${
            isTransparent ? 'bg-white' : 'bg-[#0f0f0f]'
          }`} />
        </button>
      </div>
    </nav>
  );
}
