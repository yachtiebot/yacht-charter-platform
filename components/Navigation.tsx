'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();
  
  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/98 backdrop-blur-sm border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link href="/" className="text-base tracking-tight text-slate-900 hover:text-slate-600 transition-colors">
          Miami Yachting Company
        </Link>
        
        <div className="hidden md:flex items-center gap-12">
          <Link
            href="/fleet"
            className={`text-sm tracking-wider uppercase transition-colors ${
              isActive('/fleet') ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Fleet
          </Link>
          <Link
            href="/locations"
            className={`text-sm tracking-wider uppercase transition-colors ${
              isActive('/locations') ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Locations
          </Link>
          <Link
            href="/about"
            className={`text-sm tracking-wider uppercase transition-colors ${
              isActive('/about') ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            About
          </Link>
          <Link
            href="/contact"
            className="px-8 py-3 bg-slate-900 text-white text-xs tracking-[0.1em] uppercase hover:bg-slate-800 transition-colors"
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
