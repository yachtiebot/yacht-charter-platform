'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();
  
  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-light tracking-tight text-slate-900">
          Miami Yachting Company
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link
            href="/fleet"
            className={`text-sm font-light transition-colors ${
              isActive('/fleet') ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Fleet
          </Link>
          <Link
            href="/locations"
            className={`text-sm font-light transition-colors ${
              isActive('/locations') ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Locations
          </Link>
          <Link
            href="/about"
            className={`text-sm font-light transition-colors ${
              isActive('/about') ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            About
          </Link>
          <Link
            href="/contact"
            className="px-6 py-2 bg-slate-900 text-white text-sm font-light hover:bg-slate-800 transition-colors"
          >
            Book Now
          </Link>
        </div>
      </div>
    </nav>
  );
}
