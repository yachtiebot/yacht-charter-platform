'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';

// Static yacht data with Supabase Storage URLs
const yachts = {
  '37-axopar': {
    name: '37 ft Axopar',
    make: 'Axopar',
    model: '37 Sun-Top',
    guests: 13,
    images: Array.from({length: 13}, (_, i) => 
      `https://wojjcivzlxsbinbmblhy.supabase.co/storage/v1/object/public/yacht-images/yachts/37-axopar/Miami_Yachting_Company_37_Axopar_${String(i+1).padStart(2, '0')}.webp`
    )
  },
  '27-regal': {
    name: '27 ft Regal',
    make: 'Regal',
    model: '27 Bowrider',
    guests: 10,
    images: Array.from({length: 18}, (_, i) => 
      `https://wojjcivzlxsbinbmblhy.supabase.co/storage/v1/object/public/yacht-images/yachts/27-regal/Miami_Yachting_Company_27_Regal_${String(i+1).padStart(2, '0')}.webp`
    )
  },
  '116-pershing': {
    name: '116 ft Pershing',
    make: 'Pershing',
    model: '116',
    guests: 12,
    images: Array.from({length: 49}, (_, i) => 
      `https://wojjcivzlxsbinbmblhy.supabase.co/storage/v1/object/public/yacht-images/yachts/116-pershing/Miami_Yachting_Company_116_Pershing_${String(i+1).padStart(2, '0')}.webp`
    )
  }
};

export default function YachtPage() {
  const params = useParams();
  const code = params.code as string;
  const yacht = yachts[code as keyof typeof yachts];
  const [selectedImage, setSelectedImage] = useState(0);

  if (!yacht) {
    return (
      <div className="min-h-screen bg-[#faf9f7] pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="editorial-headline mb-4">Yacht not found</h1>
          <Link href="/yacht-rental-miami" className="editorial-label hover:text-[#c4a265]">
            ← Back to Fleet
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f7] pt-24">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-12">
        {/* Back Link */}
        <Link href="/yacht-rental-miami" className="editorial-label text-[#6b6b6b] hover:text-[#c4a265] inline-block mb-8">
          ← BACK TO FLEET
        </Link>

        {/* Yacht Name */}
        <h1 className="editorial-headline mb-12">{yacht.name}</h1>

        {/* Image Gallery */}
        <div className="mb-12">
          {/* Main Image */}
          <div className="mb-4 bg-[#f0ece6] aspect-[16/9] relative overflow-hidden">
            <img 
              src={yacht.images[selectedImage]}
              alt={`${yacht.name} - Image ${selectedImage + 1}`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
            {yacht.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`aspect-square bg-[#f0ece6] overflow-hidden ${
                  selectedImage === idx ? 'ring-2 ring-[#c4a265]' : ''
                }`}
              >
                <img 
                  src={img}
                  alt={`${yacht.name} thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Yacht Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="mb-8">
              <div className="editorial-label text-[#6b6b6b] mb-2">CAPACITY</div>
              <div className="editorial-spec-value">{yacht.guests} Guests</div>
            </div>
            
            <div className="mb-8">
              <div className="editorial-label text-[#6b6b6b] mb-2">VESSEL</div>
              <div className="editorial-spec-value">{yacht.make} {yacht.model}</div>
            </div>

            <div className="editorial-body text-[#6b6b6b]">
              <p>This {yacht.name} is available for charter in Miami. Contact us for pricing and availability.</p>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-8 border border-[#0f0f0f]/10">
              <h3 className="editorial-subhead mb-6">Book This Yacht</h3>
              <Link 
                href="/contact"
                className="block w-full editorial-label text-center py-3 bg-[#0f0f0f] text-white hover:bg-[#c4a265] transition-colors"
              >
                CONTACT US
              </Link>
              <div className="mt-6 text-center">
                <a href="tel:+18007479585" className="editorial-label text-[#6b6b6b] hover:text-[#c4a265]">
                  1 800 747 9585
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
