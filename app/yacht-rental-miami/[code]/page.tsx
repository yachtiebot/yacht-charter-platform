'use client';

import { useEffect, useState } from 'react';
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

export default function YachtDetailPage({ params }: { params: { code: string } }) {
  const [yacht, setYacht] = useState<YachtData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchYacht = async () => {
      try {
        const response = await fetch('/api/yachts');
        const data = await response.json();
        const found = data.yachts.find((y: YachtData) => 
          y.fields['Yacht ID'].toLowerCase() === params.code.toLowerCase()
        );
        setYacht(found || null);
      } catch (error) {
        console.error('Error fetching yacht:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchYacht();
  }, [params.code]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf9f7] pt-24 flex items-center justify-center">
        <div className="text-[#6b6b6b]">Loading...</div>
      </div>
    );
  }

  if (!yacht) {
    return (
      <div className="min-h-screen bg-[#faf9f7] pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="editorial-headline mb-4">Yacht not found</h1>
          <Link href="/yacht-rental-miami" className="editorial-label hover:text-[#c4a265]">
            ← BACK TO FLEET
          </Link>
        </div>
      </div>
    );
  }

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
    <div className="bg-[#faf9f7] min-h-screen">
      {/* Header Spacer */}
      <div className="h-24" />

      {/* Back Link */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-6">
        <Link 
          href="/yacht-rental-miami" 
          className="editorial-label text-[#6b6b6b] hover:text-[#c4a265] transition-colors"
        >
          ← BACK TO FLEET
        </Link>
      </div>

      {/* Hero Section with Gallery */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Image */}
          <div className="lg:col-span-2">
            <div className="aspect-[16/10] bg-[#f0ece6] overflow-hidden">
              {gallery[selectedImage] && (
                <img 
                  src={gallery[selectedImage]}
                  alt={`${yacht.fields['Boat Name']} - ${selectedImage + 1}`}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>

          {/* Yacht Info Card */}
          <div className="bg-white p-8">
            <h1 className="editorial-headline text-3xl mb-4">{yacht.fields['Boat Name']}</h1>
            <p className="text-[#6b6b6b] mb-6">{yacht.fields['Brand']} {yacht.fields['Model']}</p>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between border-b border-[#e5e5e5] pb-3">
                <span className="text-[#6b6b6b]">Length</span>
                <span className="font-medium">{yacht.fields['Length in Feet']} ft</span>
              </div>
              <div className="flex justify-between border-b border-[#e5e5e5] pb-3">
                <span className="text-[#6b6b6b]">Capacity</span>
                <span className="font-medium">{yacht.fields['Maximum Passengers']} guests</span>
              </div>
              <div className="flex justify-between border-b border-[#e5e5e5] pb-3">
                <span className="text-[#6b6b6b]">Type</span>
                <span className="font-medium">{yacht.fields['Boat Type']}</span>
              </div>
              <div className="flex justify-between border-b border-[#e5e5e5] pb-3">
                <span className="text-[#6b6b6b]">Location</span>
                <span className="font-medium">{yacht.fields['Main Departure Location']}</span>
              </div>
              {(yacht.fields['Features: Number of Staterooms'] || 0) > 0 && (
                <div className="flex justify-between border-b border-[#e5e5e5] pb-3">
                  <span className="text-[#6b6b6b]">Staterooms</span>
                  <span className="font-medium">{yacht.fields['Features: Number of Staterooms']}</span>
                </div>
              )}
              {(yacht.fields['Features: Number of Bathrooms'] || 0) > 0 && (
                <div className="flex justify-between border-b border-[#e5e5e5] pb-3">
                  <span className="text-[#6b6b6b]">Bathrooms</span>
                  <span className="font-medium">{yacht.fields['Features: Number of Bathrooms']}</span>
                </div>
              )}
            </div>

            <Link 
              href="/contact"
              className="block w-full text-center py-4 bg-[#0f0f0f] text-white hover:bg-[#c4a265] transition-colors editorial-label"
            >
              REQUEST QUOTE
            </Link>
          </div>
        </div>

        {/* Gallery Thumbnails */}
        {gallery.length > 1 && (
          <div className="mt-6 grid grid-cols-6 md:grid-cols-12 gap-3">
            {gallery.slice(0, 12).map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`aspect-square overflow-hidden transition-opacity ${
                  selectedImage === idx ? 'ring-2 ring-[#c4a265]' : 'opacity-60 hover:opacity-100'
                }`}
              >
                <img 
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Description */}
      {yacht.fields['Full Description'] && (
        <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-12">
          <div className="max-w-3xl">
            <h2 className="editorial-headline text-2xl mb-6">About This Yacht</h2>
            <p className="text-[#6b6b6b] leading-relaxed whitespace-pre-wrap">
              {yacht.fields['Full Description']}
            </p>
          </div>
        </section>
      )}

      {/* Pricing Table */}
      {prices.length > 0 && (
        <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-12">
          <h2 className="editorial-headline text-2xl mb-8">Charter Rates</h2>
          <div className="bg-white p-8 max-w-2xl">
            <div className="space-y-4">
              {prices.map((p) => (
                <div key={p.hours} className="flex justify-between items-center border-b border-[#e5e5e5] pb-4">
                  <span className="editorial-label text-[#6b6b6b]">{p.hours} HOURS</span>
                  <span className="editorial-headline text-xl">{formatCurrency(p.price!)}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-[#6b6b6b] mt-6">
              Rates do not include captain fee, fuel, or gratuity. Sales tax applies.
            </p>
          </div>
        </section>
      )}

      {/* Features & Amenities */}
      {(yacht.fields['Sound System Type'] || (yacht.fields['Toys Available On Request']?.length || 0) > 0) && (
        <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-12">
          <h2 className="editorial-headline text-2xl mb-8">Features & Amenities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
            {yacht.fields['Sound System Type'] && (
              <div>
                <h3 className="editorial-label mb-3">SOUND SYSTEM</h3>
                <p className="text-[#6b6b6b]">{yacht.fields['Sound System Type']}</p>
              </div>
            )}
            {(yacht.fields['Toys Available On Request']?.length || 0) > 0 && (
              <div>
                <h3 className="editorial-label mb-3">WATER TOYS</h3>
                <ul className="space-y-2">
                  {yacht.fields['Toys Available On Request']!.map((toy, idx) => (
                    <li key={idx} className="text-[#6b6b6b]">• {toy}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-16">
        <div className="bg-[#0f0f0f] p-12 text-center">
          <h2 className="editorial-headline text-white text-3xl mb-4">Ready to Book?</h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto">
            Contact us to check availability and reserve {yacht.fields['Boat Name']} for your charter.
          </p>
          <Link 
            href="/contact"
            className="inline-block px-12 py-4 bg-[#c4a265] text-white hover:bg-[#d4b275] transition-colors editorial-label"
          >
            REQUEST QUOTE
          </Link>
        </div>
      </section>
    </div>
  );
}
