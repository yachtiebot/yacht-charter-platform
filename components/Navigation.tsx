'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Navigation() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Pages with dark hero images that need transparent nav
  const darkHeroPages = ['/', '/fleet', '/about', '/contact'];
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
            href="/fleet"
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
          
          <div className={`editorial-label hidden xl:block transition-colors duration-700 ${
            isTransparent ? 'text-white' : 'text-[#6b6b6b]'
          }`}>
            1 800 747 9585
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
