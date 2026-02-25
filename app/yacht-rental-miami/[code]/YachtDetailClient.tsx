'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatCurrency } from '@/lib/utils';

interface YachtData {
  id: string;
  fields: {
    'Yacht ID': string;
    'Boat Name': string;
    'Boat Type': string;
    'Brand': string;
    'Model': string;
    'Length in Feet': number;
    'Maximum Passengers': number;
    'Main Departure Location': string;
    'Short Description'?: string;
    'Full Description'?: string;
    '2-Hour Price'?: number;
    '3-Hour Price'?: number;
    '4-Hour Price'?: number;
    '5-Hour Price'?: number;
    '6-Hour Price'?: number;
    '7-Hour Price'?: number;
    '8-Hour Price'?: number;
    'Photo Attachments'?: Array<{ url: string }>;
    'Supabase Gallery URLs'?: string[];
    'Features: Number of Staterooms'?: number;
    'Features: Number of Bathrooms'?: number;
    'Sound System Type'?: string;
    'Toys Available On Request'?: string[];
    'Instant Booking Enabled'?: boolean;
  };
}

export default function YachtDetailClient({ yacht }: { yacht: YachtData }) {
  const [selectedImage, setSelectedImage] = useState(0);

  const gallery = yacht.fields['Supabase Gallery URLs'] || [];
  const prices = [
    { hours: 2, price: yacht.fields['2-Hour Price'] },
    { hours: 3, price: yacht.fields['3-Hour Price'] },
    { hours: 4, price: yacht.fields['4-Hour Price'] },
    { hours: 5, price: yacht.fields['5-Hour Price'] },
    { hours: 6, price: yacht.fields['6-Hour Price'] },
    { hours: 7, price: yacht.fields['7-Hour Price'] },
    { hours: 8, price: yacht.fields['8-Hour Price'] },
  ].filter(p => p.price);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Image - Full bleed, immersive */}
      <section className="relative h-screen min-h-[600px] max-h-[900px]">
        {gallery[selectedImage] && (
          <img 
            src={gallery[selectedImage]}
            alt={`${yacht.fields['Boat Name']}`}
            className="w-full h-full object-cover"
          />
        )}
        
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Back button - top left */}
        <div className="absolute top-8 left-8 z-10">
          <Link 
            href="/yacht-rental-miami" 
            className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="editorial-label text-sm tracking-wider">BACK TO FLEET</span>
          </Link>
        </div>
        
        {/* Yacht info overlay - bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="max-w-[1600px] mx-auto">
            <div className="rule-gold w-16 mb-6" />
            <h1 className="editorial-display text-white mb-4" style={{ fontSize: '64px', fontWeight: 300, lineHeight: 1.1 }}>
              {yacht.fields['Boat Name']}
            </h1>
            <p className="text-white/80 text-lg tracking-wide">
              {yacht.fields['Brand']} {yacht.fields['Model']} • {yacht.fields['Length in Feet']} Feet • {yacht.fields['Boat Type']}
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Thumbnails - Full width stripe */}
      {gallery.length > 1 && (
        <section className="bg-[#0f0f0f] py-6">
          <div className="max-w-[1600px] mx-auto px-8">
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`flex-shrink-0 w-24 h-24 overflow-hidden transition-all ${
                    selectedImage === idx 
                      ? 'ring-2 ring-[#c4a265] opacity-100 scale-105' 
                      : 'opacity-40 hover:opacity-70'
                  }`}
                >
                  <img 
                    src={img}
                    alt={`View ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="max-w-[1600px] mx-auto px-8 md:px-16 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Column - Description */}
          <div className="lg:col-span-7">
            {yacht.fields['Full Description'] && (
              <>
                <div className="rule-gold w-12 mb-8" />
                <h2 className="editorial-headline text-4xl mb-8" style={{ fontWeight: 300 }}>
                  Experience
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-[#4a4a4a] leading-relaxed text-lg whitespace-pre-wrap font-light">
                    {yacht.fields['Full Description']}
                  </p>
                </div>
              </>
            )}

            {/* Features Grid */}
            {(yacht.fields['Sound System Type'] || (yacht.fields['Toys Available On Request']?.length || 0) > 0) && (
              <div className="mt-16 grid grid-cols-2 gap-12">
                {yacht.fields['Sound System Type'] && (
                  <div>
                    <h3 className="editorial-label text-xs mb-4 text-[#c4a265]">SOUND SYSTEM</h3>
                    <p className="text-[#4a4a4a] font-light">{yacht.fields['Sound System Type']}</p>
                  </div>
                )}
                {(yacht.fields['Toys Available On Request']?.length || 0) > 0 && (
                  <div>
                    <h3 className="editorial-label text-xs mb-4 text-[#c4a265]">WATER TOYS</h3>
                    <ul className="space-y-2">
                      {yacht.fields['Toys Available On Request']!.map((toy, idx) => (
                        <li key={idx} className="text-[#4a4a4a] font-light flex items-start">
                          <span className="text-[#c4a265] mr-2">—</span>
                          {toy}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column - Specs & Pricing */}
          <div className="lg:col-span-5">
            
            {/* Specifications Card */}
            <div className="bg-[#faf9f7] p-10 mb-8">
              <h3 className="editorial-label text-xs mb-8 text-[#c4a265]">SPECIFICATIONS</h3>
              <div className="space-y-5">
                <div className="flex justify-between items-baseline pb-4 border-b border-[#e5e5e5]">
                  <span className="text-[#6b6b6b] text-sm tracking-wide">Length</span>
                  <span className="editorial-headline text-xl font-light">{yacht.fields['Length in Feet']} ft</span>
                </div>
                <div className="flex justify-between items-baseline pb-4 border-b border-[#e5e5e5]">
                  <span className="text-[#6b6b6b] text-sm tracking-wide">Capacity</span>
                  <span className="editorial-headline text-xl font-light">{yacht.fields['Maximum Passengers']} guests</span>
                </div>
                <div className="flex justify-between items-baseline pb-4 border-b border-[#e5e5e5]">
                  <span className="text-[#6b6b6b] text-sm tracking-wide">Type</span>
                  <span className="editorial-headline text-xl font-light">{yacht.fields['Boat Type']}</span>
                </div>
                <div className="flex justify-between items-baseline pb-4 border-b border-[#e5e5e5]">
                  <span className="text-[#6b6b6b] text-sm tracking-wide">Location</span>
                  <span className="editorial-headline text-xl font-light">{yacht.fields['Main Departure Location']}</span>
                </div>
                {(yacht.fields['Features: Number of Staterooms'] || 0) > 0 && (
                  <div className="flex justify-between items-baseline pb-4 border-b border-[#e5e5e5]">
                    <span className="text-[#6b6b6b] text-sm tracking-wide">Staterooms</span>
                    <span className="editorial-headline text-xl font-light">{yacht.fields['Features: Number of Staterooms']}</span>
                  </div>
                )}
                {(yacht.fields['Features: Number of Bathrooms'] || 0) > 0 && (
                  <div className="flex justify-between items-baseline pb-4 border-b border-[#e5e5e5]">
                    <span className="text-[#6b6b6b] text-sm tracking-wide">Bathrooms</span>
                    <span className="editorial-headline text-xl font-light">{yacht.fields['Features: Number of Bathrooms']}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Pricing Card */}
            {prices.length > 0 && (
              <div className="bg-[#0f0f0f] p-10 text-white">
                <h3 className="editorial-label text-xs mb-8 text-[#c4a265]">CHARTER RATES</h3>
                <div className="space-y-5">
                  {prices.map((p) => (
                    <div key={p.hours} className="flex justify-between items-baseline pb-5 border-b border-white/10">
                      <span className="text-white/70 text-sm tracking-wide">{p.hours} Hours</span>
                      <span className="editorial-headline text-2xl font-light">{formatCurrency(p.price!)}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-white/50 mt-6 leading-relaxed">
                  Rates exclude captain fee, fuel, and gratuity. Sales tax applies. Prices subject to availability.
                </p>
              </div>
            )}

            {/* CTA Button */}
            <Link 
              href="/contact"
              className="block w-full text-center py-5 mt-8 bg-[#c4a265] text-white hover:bg-[#d4b275] transition-all duration-300 editorial-label text-sm tracking-widest"
            >
              REQUEST AVAILABILITY
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-[#faf9f7] py-32">
        <div className="max-w-[800px] mx-auto text-center px-8">
          <div className="rule-gold w-16 mx-auto mb-8" />
          <h2 className="editorial-headline text-4xl mb-6" style={{ fontWeight: 300 }}>
            Ready to Charter?
          </h2>
          <p className="text-[#6b6b6b] text-lg mb-12 font-light leading-relaxed">
            Our charter specialists are available to discuss availability, 
            customize your experience, and answer any questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact"
              className="inline-block px-12 py-4 bg-[#0f0f0f] text-white hover:bg-[#c4a265] transition-all duration-300 editorial-label text-sm tracking-widest"
            >
              CONTACT US
            </Link>
            <Link 
              href="tel:+18007479585"
              className="inline-block px-12 py-4 border-2 border-[#0f0f0f] text-[#0f0f0f] hover:bg-[#0f0f0f] hover:text-white transition-all duration-300 editorial-label text-sm tracking-widest"
            >
              1 800 747 9585
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
